import AvatarCharacter from '@/components/AvatarCharacter';
import headerLogo from '@/assets/header-logo.png';
import { Button } from '@/components/ui/button';
import { Check, SignalHigh, Wifi, BatteryFull } from 'lucide-react';

const ThankYouScreen = () => {
  const policyNumber = 'ALI000000921212';

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

      <main className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-start px-6 pt-6 pb-28">
        <h1 className="text-xl font-bold text-[#0b2645] text-center">
          Pre-Issuance Verification Submitted!
        </h1>

        <div className="relative max-w-sm w-full">
          <div className="bg-white border border-[#dbe6f3] rounded-2xl p-4 text-sm text-[#0b2645] shadow-sm">
            Thank you for your time and trust in Bandhan Life.
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#dbe6f3]" />
        </div>

        <AvatarCharacter />

        <h2 className="text-2xl font-bold text-[#0b2645] mt-2 mb-2">Thank You</h2>

        <div className="w-full max-w-sm bg-white border border-[#dbe6f3] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#d64545]">Explore iAssist</h3>
          </div>
          <p className="text-sm text-[#475569] mb-4">Your Customer Service Portal</p>

          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-[#0b2645]">Check your policy status</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-[#0b2645]">Update your contact details</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-[#0b2645]">Download policy documents</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-[#0b2645]">Access all policy-related information</p>
            </div>
          </div>

          <Button className="w-full h-11 rounded-full bg-[#0b2645] text-white hover:bg-[#0b2645]/90">
            Visit iAssist
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ThankYouScreen;
