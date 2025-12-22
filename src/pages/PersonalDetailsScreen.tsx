import { useNavigate } from 'react-router-dom';
import LiveCamera from '@/components/LiveCamera';
import headerLogo from '@/assets/header-logo.png';
import { Button } from '@/components/ui/button';
import { Download, SignalHigh, Wifi, BatteryFull } from 'lucide-react';

const PersonalDetailsScreen = () => {
  const navigate = useNavigate();
  const policyNumber = 'ALI000000921212';

  const handleItsRight = () => {
    navigate('/confirmation');
  };

  return (
    <div className="h-[100vh] flex flex-col bg-[#f1f4f8]">
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

      <main className="flex-1 px-5 pt-4 pb-26 overflow-y-auto">
        <div className="max-w-[400px] mx-auto flex flex-col items-center gap-2.5">
          <div className="flex justify-center">
            <LiveCamera
              variant="circle"
              className="mb-1 drop-shadow-[0_10px_18px_rgba(16,62,112,0.16)]"
            />
          </div>

          <h2 className="text-lg font-semibold text-center text-[#0b2645] mb-1.5">Personal Details</h2>

          <div className="w-full space-y-2.5">
            <div className="rounded-[16px] border border-[#0b2645] bg-white shadow-[0_8px_16px_rgba(11,38,69,0.12)] px-3.5 py-2.5 text-[15px] flex flex-wrap gap-1">
              <span className="text-[#0b2645]/80">Life Assured Name</span>
              <strong className="ml-auto">Ashok Kumar</strong>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[16px] border border-[#0b2645] bg-white shadow-[0_8px_16px_rgba(11,38,69,0.12)] px-3.5 py-2.5 text-[15px] flex flex-wrap gap-1">
                <span className="text-[#0b2645]/80">Date of Birth</span>
                <strong className="ml-auto">01-Apr-1984</strong>
              </div>
              <div className="rounded-[16px] border border-[#0b2645] bg-white shadow-[0_8px_16px_rgba(11,38,69,0.12)] px-3.5 py-2.5 text-[15px] flex flex-wrap gap-1">
                <span className="text-[#0b2645]/80">Gender</span>
                <strong className="ml-auto">Male</strong>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#0b2645] bg-white shadow-[0_8px_16px_rgba(11,38,69,0.12)] px-3.5 py-2.5 text-[15px] flex flex-wrap gap-1">
              <span className="text-[#0b2645]/80">PAN Number</span>
              <strong className="ml-auto">DYIPB1234E</strong>
            </div>

            <div className="rounded-[16px] border border-[#0b2645] bg-white shadow-[0_8px_16px_rgba(11,38,69,0.12)] px-3.5 py-2.5 text-[15px] flex flex-col gap-1">
              <span className="text-[#0b2645]/80">Address</span>
              <strong className="font-semibold">
                41 0 26/1B, plot D, canal bank road, Kasthuribai nagar, Adyar, Chennai, Tamilnadu.
              </strong>
            </div>

            <div className="rounded-[16px] border border-[#0b2645] bg-white shadow-[0_8px_16px_rgba(11,38,69,0.12)] px-3.5 py-2.5 text-[15px] flex flex-wrap gap-1">
              <span className="text-[#0b2645]/80">Nominee</span>
              <strong className="ml-auto">Rohini Kumar</strong>
            </div>
          </div>

          <div className="w-full mt-3">
            <button className="w-full rounded-[18px] border border-[#0b2645]/35 bg-white shadow-[0_12px_22px_rgba(11,38,69,0.16)] px-4 py-3 flex items-center justify-between text-sm font-semibold text-[#0b2645]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#d7e3f2] flex items-center justify-center shadow-[0_6px_12px_rgba(11,38,69,0.08)]">
                  <Download className="w-5 h-5 text-[#0b2645]" />
                </div>
                <span>Proposal Form</span>
              </div>
              <Download className="w-5 h-5 text-[#0b2645]" />
            </button>
          </div>

          
        </div>
        
      </main>
      <div className="pb-4">
            <div className="bg-white rounded-[18px] border border-[#dbe6f3] shadow-[0_-4px_16px_rgba(11,38,69,0.12)]">
              <div className="max-w-md mx-auto flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-full border-[1.4px] border-[#d6deea] text-[#0b2645] bg-white font-semibold text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white"
                  onClick={() => window.history.back()}
                >
                  Need Help
                </Button>
                <Button
                  className="flex-1 h-11 rounded-full bg-[#0b2645] text-white hover:bg-[#0b2645]/90 font-semibold text-[15px]"
                  onClick={handleItsRight}
                >
                  It's Right
                </Button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default PersonalDetailsScreen;
