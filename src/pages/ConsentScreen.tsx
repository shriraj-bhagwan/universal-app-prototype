import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveCamera from '@/components/LiveCamera';
import headerLogo from '@/assets/header-logo.png';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SignalHigh, Wifi, BatteryFull } from 'lucide-react';

const ConsentScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const policyNumber = 'ALI000000921212';

  useEffect(() => {
    startRecording();

    return () => {
      if (mediaRecorderRef.current?.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
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
    <div className="min-h-[100dvh] flex flex-col bg-[#f1f4f8]">
      <header className="px-0 pt-3">
        <div className="w-full bg-white rounded-[28px] border border-[#dbe6f3] shadow-[0_10px_26px_rgba(12,35,72,0.08)] px-5 py-3">
          <div className="flex items-center justify-between text-[#3c5675] text-[11px] mb-2">
            <SignalHigh className="w-4 h-4" strokeWidth={1.5} />
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" strokeWidth={1.5} />
              <BatteryFull className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={headerLogo}
                alt="Bandhan Life"
                className="h-10 w-auto object-contain min-w-[140px]"
              />
            </div>
            <div className="bg-white border border-[#d7e3f7] rounded-2xl px-3 py-2 text-right shadow-[0_8px_18px_rgba(14,51,102,0.09)] min-w-[168px] flex-shrink-0">
              <p className="text-[11px] text-[#456089] font-medium leading-tight">Proposal Number</p>
              <p className="text-sm font-semibold text-[#0b2645] leading-tight tracking-tight whitespace-nowrap">
                {policyNumber}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 mt-3">
        <div className="w-full h-[12px] bg-white rounded-full border border-[#dbe6f3] shadow-sm overflow-hidden">
          <div className="flex h-full w-full">
            <div className="bg-[#1b75bb]" style={{ width: '68%' }} />
            <div className="bg-[#e44a4a]" style={{ width: '32%' }} />
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 pt-4 pb-28 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center">
            <LiveCamera
              variant="circle"
              className="mb-4 max-w-[232px] sm:max-w-[240px] drop-shadow-[0_12px_24px_rgba(16,62,112,0.18)]"
            />
          </div>

          <h2 className="text-lg font-semibold text-center text-foreground mb-6">Consent</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-[#dbe6f3] rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-sm text-foreground">
                I confirm all information shared by me is accurate.
              </p>
            </div>

            <div className="bg-white border border-[#dbe6f3] rounded-2xl px-4 py-3 shadow-sm">
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
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-4 pt-2 bg-[#f1f4f8]/95 backdrop-blur-sm z-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-[18px] border border-[#dbe6f3] shadow-[0_-4px_16px_rgba(11,38,69,0.12)] px-4 py-3">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-full border-[1.4px] border-[#d6deea] text-[#0b2645] bg-white font-semibold text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white"
                onClick={() => window.history.back()}
              >
                Need Help
              </Button>
              <Button
                className="flex-1 h-11 rounded-full bg-[#0b2645] text-white hover:bg-[#0b2645]/90 font-semibold text-[15px]"
                onClick={stopRecordingAndDownload}
              >
                I Agree
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
