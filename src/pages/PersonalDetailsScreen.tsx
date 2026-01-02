import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveCamera from '@/components/LiveCamera';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { copy, LanguageCode } from '@/config/copy';

const PersonalDetailsScreen = () => {
  const navigate = useNavigate();
  const { selectedLanguage } = useUser();
  const language = useMemo<LanguageCode>(() => (selectedLanguage as LanguageCode) ?? 'english', [selectedLanguage]);
  const [faceDetected, setFaceDetected] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const policyNumber = 'ALI000000123456';

  // Start audio when face is detected
  useEffect(() => {
    if (faceDetected && !audioStarted) {
      const timer = setTimeout(() => {
        setAudioStarted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [faceDetected, audioStarted]);

  const handleFaceDetectionChange = (detected: boolean) => {
    setFaceDetected(detected);
  };

  const handleItsRight = () => {
    navigate('/confirmation');
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

      {/* Progress Bar */}
      <div className="px-6 mb-2">
        <div className="max-w-[480px] mx-auto w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div className="bg-gradient-to-b from-[#1b75bb] to-[#3cacfc] transition-all" style={{ width: '84%' }} />
            <div className="bg-[#D0D0D0]" style={{ width: '16%' }} />
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 pb-16 flex flex-col overflow-hidden min-h-0">
        {/* Camera */}
        <div className="flex justify-center mb-2 flex-shrink-0">
          <LiveCamera
            variant="circle"
            className="w-[140px] h-[140px]"
            enableFaceDetection
            onFaceDetectionChange={handleFaceDetectionChange}
          />
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-center text-foreground mb-2 flex-shrink-0">
          {copy.personalDetails.title[language]}
        </h2>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto min-h-0 -mx-6 px-6">
          {/* Personal Details - Scrollable Section */}
          <div className="space-y-2.5 pb-4">
          <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
            <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.lifeAssuredName[language]}</p>
            <p className="text-xs font-semibold text-[#002B47]">Ashok Kumar</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
              <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.dateOfBirth[language]}</p>
              <p className="text-xs font-semibold text-[#002B47]">01-Apr-1984</p>
            </div>
            <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
              <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.gender[language]}</p>
              <p className="text-xs font-semibold text-[#002B47]">Male</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
              <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.education[language]}</p>
              <p className="text-xs font-semibold text-[#002B47]">Graduate</p>
            </div>
            <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
              <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.mobileNumber[language]}</p>
              <p className="text-xs font-semibold text-[#002B47]">+91 98765 43210</p>
            </div>
          </div>

          <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
            <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.emailAddress[language]}</p>
            <p className="text-xs font-semibold text-[#002B47]">ashok.kumar@email.com</p>
          </div>

          <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
            <p className="text-[10px] text-[#094771]/70 mb-0.5">
              {copy.personalDetails.address[language]} <span className="text-[9px] text-[#094771]/60">{copy.personalDetails.policyBondDelivery[language]}</span>
            </p>
            <p className="text-xs font-semibold text-[#002B47] leading-snug">
              41 0 26/1B, plot D, canal bank road, Kasthuribai nagar, Adyar, Chennai, Tamilnadu.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
              <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.nomineeName[language]}</p>
              <p className="text-xs font-semibold text-[#002B47]">Rohini Kumar</p>
            </div>
            <div className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-2.5">
              <p className="text-[10px] text-[#094771]/70 mb-0.5">{copy.personalDetails.nomineeRelation[language]}</p>
              <p className="text-xs font-semibold text-[#002B47]">Spouse</p>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#094771]/70 mb-2 mt-4">
            To view more details, please download the below file
          </p>

          <button className="w-full bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Download className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-xs font-medium text-slate-700">{copy.personalDetails.downloadProposal[language]}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          </div>
        </div>
      </main>

      {/* Fixed Footer with Buttons */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
        <div className="w-full max-w-[480px] mx-auto p-2.5">
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="flex-1 h-10 rounded-xl border-2 border-[#004880] bg-white text-[#004880] font-medium hover:bg-slate-50 text-sm"
              onClick={() => window.history.back()}
            >
              {copy.personalDetails.needHelp[language]}
            </Button>
            <Button
              className="flex-1 h-10 rounded-xl bg-[#004880] text-white hover:bg-[#003366] font-medium text-sm"
              onClick={handleItsRight}
            >
              {copy.personalDetails.itsRight[language]}
            </Button>
          </div>
        </div>
      </footer>

      <Footer />

      {audioStarted && (
        <AudioPlayer
          audioKey="personal-details"
          autoPlay
        />
      )}
    </motion.div>
  );
};

export default PersonalDetailsScreen;
