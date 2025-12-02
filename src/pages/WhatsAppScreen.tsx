import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bandhanLifeLogo from '@/assets/header-logo.png';
import pivvVideo from '@/assets/pivv2.mp4';
import pivvThumbnail from '@/assets/pivv-thumbnail.png';
import { useUser } from '@/contexts/UserContext';
import { copy } from '@/config/copy';

const WhatsAppScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const { setAudioPermissionGranted } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>(pivvThumbnail);
  const pipSupported = useMemo(
    () => typeof document !== 'undefined' && 'pictureInPictureEnabled' in document,
    []
  );

  const messageCopy = copy.whatsapp.message(copy.whatsapp.defaultContext);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.controls = false;
      await video.play();
      setIsPlaying(true);
      if (pipSupported && !document.pictureInPictureElement && video.requestPictureInPicture) {
        await video.requestPictureInPicture();
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.controls = false;
    video.currentTime = 0;
    setIsPlaying(false);
    if (document.pictureInPictureElement) {
      void document.exitPictureInPicture();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLeavePiP = () => {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    };

    video.addEventListener('leavepictureinpicture', handleLeavePiP);
    return () => {
      video.removeEventListener('leavepictureinpicture', handleLeavePiP);
    };
  }, []);

  const handleProceed = () => {
    setAudioPermissionGranted(true);
    //navigate('/language-selection');
    navigate('/policy-intro');
  };

  const policyNumber = 'ALI000000921212';

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f1f4f8]">
      {/* Header */}
      <header className="px-4 pt-3">
        <div className="max-w-[480px] mx-auto w-full bg-white rounded-[28px] border border-[#dbe6f3] shadow-[0_10px_26px_rgba(12,35,72,0.08)] px-5 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={bandhanLifeLogo}
                alt="Bandhan Life"
                className="h-10 w-auto object-contain min-w-[140px]"
              />
            </div>
            <div className="bg-white border border-[#d7e3f7] rounded-2xl px-3 py-2 text-right shadow-[0_8px_18px_rgba(14,51,102,0.09)] min-w-[130px] flex-shrink-0">
              <p className="text-[11px] text-[#456089] font-medium leading-tight">Proposal Number</p>
              <p className="text-sm font-semibold text-[#0b2645] leading-tight tracking-tight whitespace-nowrap">
                {policyNumber}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 mt-3">
        <div className="max-w-[480px] mx-auto w-full h-[12px] bg-white rounded-full border border-[#dbe6f3] shadow-sm overflow-hidden">
          <div className="flex h-full w-full">
            <div className="bg-[#1b75bb]" style={{ width: '68%' }} />
            <div className="bg-[#e44a4a]" style={{ width: '32%' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-0 px-4 pt-4 pb-32 overflow-y-auto">
        <div className="max-w-[420px] mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e0d8c8] overflow-hidden">
            <div className="p-3">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black shadow-inner">
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={pivvVideo}
                    playsInline
                    className="w-full h-full rounded-xl bg-black"
                    poster={previewSrc}
                    onEnded={handleEnded}
                  />
                  {!isPlaying && previewSrc && (
                    <img
                      src={previewSrc}
                      alt="Video preview"
                      className="pointer-events-none absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  )}
                  {!isPlaying && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/35 rounded-xl" />
                  )}
                  {!isPlaying && (
                    <button
                      onClick={handlePlay}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-black/80 text-white px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                  )}
                </div>
                <div className="pointer-events-none absolute left-3 bottom-3 text-white text-xs bg-black/70 rounded-full px-2 py-1 inline-flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  {copy.whatsapp.videoDuration}
                </div>
              </div>
            </div>

            <div className="px-4 pb-3 text-[15px] leading-relaxed text-slate-900 space-y-1">
              <p>{messageCopy.salutation}</p>
              <p>{messageCopy.body1}</p>
              <p>{messageCopy.body2}</p>
              <p>{messageCopy.body3}</p>
              <div className="flex justify-end text-[11px] text-slate-500 font-medium pt-2">{messageCopy.time}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 px-5 pb-5 pt-1 z-30 pointer-events-none">
        <div className="max-w-[480px] mx-auto w-full">
          <div className="bg-white rounded-[22px] border border-[#dbe6f3] shadow-[0_-8px_26px_rgba(13,31,67,0.14)] px-4 py-4 pointer-events-auto">
            <div className="flex gap-3 items-center">
              <button
                className="flex-1 h-14 rounded-full border-[1.4px] border-[#d6deea] text-[#0b2645] bg-white font-semibold text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-slate-50 transition-colors"
                onClick={() => window.history.back()}
              >
                Need Help
              </button>
              <button
                className="flex-1 h-14 rounded-full bg-[#0b2645] text-white hover:bg-[#0b2645]/90 font-semibold text-[15px] transition-colors"
                onClick={handleProceed}
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhatsAppScreen;
