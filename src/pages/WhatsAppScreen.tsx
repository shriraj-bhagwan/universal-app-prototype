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
} from 'lucide-react';
import bandhanLifeLogo from '@/assets/header-logo.png';

const WhatsAppScreen = () => {
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
                <span className="font-semibold text-slate-900">Bandhan Life</span>
                <BadgeCheck className="w-4 h-4 text-[#1a8cdf]" />
              </div>
              <p className="text-xs text-slate-500">online</p>
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
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.04),transparent_40%)]" />
                <div className="relative flex flex-col items-center gap-2 py-6 px-4 text-center">
                  <img src={bandhanLifeLogo} alt="Bandhan Life logo" className="w-14 h-14 object-contain drop-shadow-sm" />
                  <p className="text-sm font-semibold text-slate-800">
                    Bharat Ki Udaan,
                    <br />
                    Bandhan Se.
                  </p>
                  <button className="mt-3 inline-flex items-center justify-center rounded-full bg-black/70 text-white px-4 py-2 gap-2 text-sm font-medium shadow-lg">
                    <Play className="w-4 h-4" />
                    Watch video
                  </button>
                  <div className="absolute left-3 bottom-3 text-white text-xs bg-black/60 rounded-full px-2 py-1 inline-flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    1:00
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-3 text-[15px] leading-relaxed text-slate-900 space-y-1">
              <p>Hi Ashok,</p>
              <p>
                💰 You’re almost there to start receiving ₹1,20,000 after 5 years from your Bandhan Life policy with proposal
                no. ALI000000123456.
              </p>
              <p>Watch this video to understand your policy better.</p>
              <p>
                Please click on the below link to give your consent or if you want to know more details about your policy.
              </p>
              <div className="flex justify-end text-[11px] text-slate-500 font-medium pt-2">11.14 AM</div>
            </div>

            <div className="divide-y divide-slate-200 border-t border-slate-200">
              <button className="w-full flex items-center gap-2 px-4 py-3 text-[#1a8cdf] font-semibold hover:bg-slate-50 transition-colors">
                <Link2 className="w-4 h-4" />
                Click here to proceed
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
