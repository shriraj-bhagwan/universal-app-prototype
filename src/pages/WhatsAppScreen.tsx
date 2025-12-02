import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  Link2,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Play,
  Smile,
  Video,
} from "lucide-react";
import { Play, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bandhanLifeLogo from "@/assets/header-logo.png";
import pivvVideo from "@/assets/pivv2.mp4";
import pivvThumbnail from "@/assets/pivv-thumbnail.png";
import { useUser } from "@/contexts/UserContext";
import { copy } from "@/config/copy";

const WhatsAppScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const { setAudioPermissionGranted } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>(pivvThumbnail);
  const pipSupported = useMemo(() => typeof document !== "undefined" && "pictureInPictureEnabled" in document, []);

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

    video.addEventListener("leavepictureinpicture", handleLeavePiP);
    return () => {
      video.removeEventListener("leavepictureinpicture", handleLeavePiP);
    };
  }, []);

  const handleProceed = () => {
    setAudioPermissionGranted(true);
    //navigate('/language-selection');
    navigate("/policy-intro");
  };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] rounded-[32px] border border-[#c8c1b3] bg-[#e5ddd5] shadow-[0_20px_45px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Header */}
        <div className="bg-[#f7f7f7] px-4 py-3 flex items-center justify-between border-b border-[#dad5cc]">
          <div className="flex items-center gap-4">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
              <img src={bandhanLifeLogo} alt="Bandhan Life" className="w-8 h-8 object-contain" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-slate-900">{copy.whatsapp.brandName}</span>
                <BadgeCheck className="w-4 h-4 text-[#1a8cdf]" />
              </div>
              <p className="text-xs text-slate-500">{copy.whatsapp.statusText}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-700">
            <Phone className="w-5 h-5" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>

        {/* Chat body */}
        <div className="px-3 pb-4 pt-2 space-y-4">
          <div className="mt-2 bg-white rounded-2xl shadow-sm border border-[#e0d8c8] overflow-hidden">
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
            <div className="divide-y divide-slate-200 border-t border-slate-200">
              <button
                onClick={handleProceed}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[#1a8cdf] font-semibold hover:bg-slate-50 transition-colors"
              >
                <Link2 className="w-4 h-4" />
                {copy.whatsapp.cta}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-full shadow-sm border border-[#d8cfc0]">
            <Smile className="w-5 h-5 text-slate-500" />
            <input
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              placeholder="Type a message"
            />
            <Paperclip className="w-5 h-5 text-slate-500" />
            <Camera className="w-5 h-5 text-slate-500" />
            <button className="w-10 h-10 rounded-full bg-[#00bfa5] flex items-center justify-center text-white shadow-md">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppScreen;
