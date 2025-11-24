import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveCamera from '@/components/LiveCamera';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ConsentScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    startRecording();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus',
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Recording Error',
        description: 'Unable to start recording. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopRecordingAndDownload = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `consent-recording-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Stop all tracks
        if (mediaRecorderRef.current?.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }

        toast({
          title: 'Recording Saved',
          description: 'Your consent video has been downloaded.',
        });

        navigate('/thank-you');
      };

      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-6 pt-4 pb-32 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <LiveCamera />

          <h2 className="text-lg font-semibold text-center text-foreground mb-6">
            Consent
          </h2>

          <div className="space-y-4 mb-8">
            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-sm text-foreground">
                I confirm all information shared by me is accurate.
              </p>
            </div>

            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-sm text-foreground">
                I understand this is a life insurance policy and not a fixed deposit, loan or a bank-linked product.
              </p>
            </div>
          </div>

          {isRecording && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6 flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <span className="text-sm font-medium text-destructive">Recording in progress...</span>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-6 py-4 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            Need Help
          </Button>
          <Button
            className="flex-1"
            onClick={stopRecordingAndDownload}
          >
            I Agree
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsentScreen;
