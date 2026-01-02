import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LivenessCheck from '@/components/LivenessCheck';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { copy, LanguageCode } from '@/config/copy';

const ConsentScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedLanguage } = useUser();
  const language = useMemo<LanguageCode>(() => (selectedLanguage as LanguageCode) ?? 'english', [selectedLanguage]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const audioSourcesRef = useRef<MediaElementAudioSourceNode[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [livenessCompleted, setLivenessCompleted] = useState(false);
  const [showConsentForm, setShowConsentForm] = useState(false);
  const [showRecordingIndicator, setShowRecordingIndicator] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [userResponse, setUserResponse] = useState<'agree' | 'disagree' | null>(null);
  const policyNumber = 'ALI000000123456';

  // Don't start recording immediately - wait for liveness to complete
  // Recording will start in handleLivenessComplete

  const handleVideoStreamReady = (stream: MediaStream) => {
    videoStreamRef.current = stream;
  };

  const startRecording = async () => {
    try {
      if (!videoStreamRef.current) {
        console.error('Video stream not ready');
        return;
      }

      console.log('Starting recording setup...');
      console.log('Video stream tracks:', videoStreamRef.current.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState })));

      // Create audio context for mixing
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create a destination for mixed audio
      const destination = audioContext.createMediaStreamDestination();
      audioDestinationRef.current = destination;

      // Get video track from the existing stream
      const videoTrack = videoStreamRef.current.getVideoTracks()[0];

      if (!videoTrack) {
        console.error('No video track found!');
        return;
      }

      console.log('Video track state:', { enabled: videoTrack.enabled, readyState: videoTrack.readyState });

      // Create a combined stream with video and the audio destination
      const combinedStream = new MediaStream([videoTrack, ...destination.stream.getAudioTracks()]);

      console.log('Combined stream tracks:', combinedStream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState })));

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp8,opus',
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('ondataavailable fired, size:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          console.log('✅ Data chunk received:', event.data.size, 'bytes, total chunks:', chunksRef.current.length + 1);
          chunksRef.current.push(event.data);
        } else {
          console.warn('⚠️ Data chunk was 0 bytes!');
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
      };

      mediaRecorder.onstart = () => {
        console.log('✅ MediaRecorder started event fired');
      };

      // Start recording with 1 second timeslice to ensure data is collected
      mediaRecorder.start(1000);
      setIsRecording(true);
      console.log('✅ Recording started with audio mixing capability', {
        state: mediaRecorder.state,
        mimeType: mediaRecorder.mimeType,
        streamActive: combinedStream.active,
        videoTracksCount: combinedStream.getVideoTracks().length,
        audioTracksCount: combinedStream.getAudioTracks().length,
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Recording Error',
        description: 'Unable to start recording. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const mixAudioIntoRecording = (audioElement: HTMLAudioElement) => {
    if (!audioContextRef.current || !audioDestinationRef.current) {
      console.log('Audio context not ready yet');
      return;
    }

    try {
      const audioContext = audioContextRef.current;
      const destination = audioDestinationRef.current;

      // Create media element source from the audio element
      const source = audioContext.createMediaElementSource(audioElement);

      // Connect audio to destination (for recording)
      source.connect(destination);

      // Also connect to speakers so user can hear it
      source.connect(audioContext.destination);

      // Store reference to disconnect later if needed
      audioSourcesRef.current.push(source);

      console.log('Audio mixed into recording');
    } catch (error) {
      console.error('Error mixing audio:', error);
    }
  };

  const handleLivenessComplete = () => {
    setLivenessCompleted(true);

    // After 1-2 second delay, start recording and show consent form
    setTimeout(() => {
      setShowConsentForm(true);

      // Start recording slightly after showing form
      setTimeout(() => {
        startRecording();
        // Show recording indicator and play audio after 1 second
        setTimeout(() => {
          setShowRecordingIndicator(true);
        }, 1000);
      }, 500);
    }, 1500);
  };

  const handleAudioEnded = () => {
    setAudioEnded(true);
  };

  const handleAgree = () => {
    setUserResponse('agree');
  };

  const handleDisagree = () => {
    setUserResponse('disagree');
  };

  const handleResponseAudioEnded = () => {
    // Stop recording a few milliseconds after response audio ends
    setTimeout(() => {
      stopRecordingAndDownload();
    }, 500);
  };

  const stopRecordingAndDownload = () => {
    if (mediaRecorderRef.current && isRecording) {
      const recorder = mediaRecorderRef.current;

      recorder.onstop = () => {
        console.log('Recording stopped. Chunks collected:', chunksRef.current.length);
        console.log('Total size:', chunksRef.current.reduce((acc, chunk) => acc + chunk.size, 0), 'bytes');

        if (chunksRef.current.length === 0) {
          console.error('No chunks recorded!');
          // Don't show error to user, just log and navigate
          navigate('/thank-you');
          return;
        }

        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        console.log('Created blob with size:', blob.size, 'bytes');

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `consent-recording-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Stop all tracks
        if (recorder.stream) {
          recorder.stream.getTracks().forEach(track => track.stop());
        }

        // Clean up audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }

        // Clear audio sources
        audioSourcesRef.current = [];

        // Silently proceed without showing toast
        navigate('/thank-you');
      };

      // Stop recording - this will automatically fire ondataavailable with remaining data
      console.log('Stopping recording. Current state:', recorder.state);
      recorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <motion.div
      className="min-h-[100dvh] flex flex-col overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Header
        rightContent={
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">{copy.policyDetails.proposalNumber[language]}</p>
            <p className="text-xs font-semibold text-foreground">{policyNumber}</p>
          </div>
        }
      />

      {/* Progress Bar - 100% complete */}
      <div className="px-6 mb-2">
        <div className="max-w-[480px] mx-auto w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div className="bg-gradient-to-b from-[#1b75bb] to-[#3cacfc] transition-all" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 pb-16 flex flex-col overflow-hidden min-h-0">
        {/* Camera - positioned at top */}
        <div className="flex justify-center mb-2 flex-shrink-0">
          <LivenessCheck
            className="w-[200px] h-[200px]"
            onLivenessComplete={handleLivenessComplete}
            hideSegmentsAfterComplete={true}
            onStreamReady={handleVideoStreamReady}
          />
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-center text-foreground mb-2 flex-shrink-0">
          {copy.consent.title[language]}
        </h2>

        {/* Instruction - Only show before liveness completes */}
        {!livenessCompleted && (
          <p className="text-sm text-center text-[#094771] px-4 mb-3 flex-shrink-0">
            {copy.consent.livenessInstruction[language]}
          </p>
        )}

        {/* Consent Form Section - shown after liveness complete */}
        {showConsentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 overflow-y-auto min-h-0 -mx-6 px-6"
          >
            <div className="space-y-3 pb-4">
              {/* Recording Indicator - show above statements */}
              {showRecordingIndicator && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-center gap-2"
                >
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-red-700">{copy.consent.recordingInProgress[language]}</span>
                </motion.div>
              )}

              {/* Statement 1 */}
              <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-3">
                <p className="text-xs text-[#002B47] leading-relaxed">
                  {copy.consent.statement1[language]}
                </p>
              </div>

              {/* Statement 2 */}
              <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-3">
                <p className="text-xs text-[#002B47] leading-relaxed">
                  {copy.consent.statement2[language]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Fixed Footer with Buttons */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
        <div className="w-full max-w-[480px] mx-auto p-2.5">
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="flex-1 h-10 rounded-xl border-2 border-[#004880] bg-white text-[#004880] font-medium hover:bg-slate-50 text-sm disabled:opacity-50"
              onClick={handleDisagree}
              disabled={!audioEnded || userResponse !== null}
            >
              {copy.consent.iDisagree[language]}
            </Button>
            <Button
              className="flex-1 h-10 rounded-xl bg-[#004880] text-white hover:bg-[#003366] font-medium text-sm disabled:opacity-50"
              onClick={handleAgree}
              disabled={!audioEnded || userResponse !== null}
            >
              {copy.consent.iAgree[language]}
            </Button>
          </div>
        </div>
      </footer>

      <Footer />

      {/* Audio player for consent instructions - starts 1 second after recording begins */}
      {showRecordingIndicator && !userResponse && (
        <AudioPlayer
          audioKey="full-consent"
          autoPlay
          onEnded={handleAudioEnded}
          onAudioElementReady={mixAudioIntoRecording}
        />
      )}

      {/* Audio player for user response - plays when user clicks agree/disagree */}
      {userResponse === 'agree' && (
        <AudioPlayer
          audioKey="i-agree"
          autoPlay
          onEnded={handleResponseAudioEnded}
          onAudioElementReady={mixAudioIntoRecording}
        />
      )}
      {userResponse === 'disagree' && (
        <AudioPlayer
          audioKey="i-disagree"
          autoPlay
          onEnded={handleResponseAudioEnded}
          onAudioElementReady={mixAudioIntoRecording}
        />
      )}
    </motion.div>
  );
};

export default ConsentScreen;
