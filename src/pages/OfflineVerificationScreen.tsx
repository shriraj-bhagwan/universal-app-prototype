import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import samplePoseImage from '@/assets/sample_pose.png';

const OfflineVerificationScreen = () => {
  const navigate = useNavigate();

  // Generate a random 4-digit verification code
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const handleContinue = () => {
    // Navigate back to the index/home page
    navigate('/');
  };

  const handleGotIt = () => {
    // You can customize this - for now it shows a confirmation
    alert('Instructions noted. Please follow the steps and share the video with our representative.');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Header />

      <main className="flex-1 w-full max-w-md mx-auto px-6 py-4 overflow-y-auto pb-40">
        {/* Title */}
        <div className="text-center mb-3">
          <h1 className="text-lg font-bold text-[#002B47]">
            Offline Video Verification
          </h1>
        </div>

        {/* Introduction Text */}
        <div className="mb-4">
          <p className="text-xs text-[#094771] leading-snug text-center">
            To help complete verification with slow internet, please follow the steps below.
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-[#002B47] mb-2">
            Instructions:
          </h2>

          <div className="space-y-2">
            {/* Step 1 */}
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1b75bb] text-white flex items-center justify-center font-semibold text-xs">
                1
              </div>
              <p className="text-xs text-[#002B47] leading-snug pt-0.5">
                Write this code clearly on a blank piece of paper.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1b75bb] text-white flex items-center justify-center font-semibold text-xs">
                2
              </div>
              <p className="text-xs text-[#002B47] leading-snug pt-0.5">
                Hold the paper in front of the camera so that your face and the code are both clearly visible.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1b75bb] text-white flex items-center justify-center font-semibold text-xs">
                3
              </div>
              <p className="text-xs text-[#002B47] leading-snug pt-0.5">
                Record a video as instructed and share it with our representative.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Code */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-[#002B47] mb-2 text-center">
            Your Verification Code
          </h2>
          <div className="bg-slate-100 border-2 border-dashed border-slate-400 rounded-xl p-4">
            <p className="text-center text-3xl font-bold text-[#002B47] tracking-widest font-mono">
              {verificationCode}
            </p>
          </div>
          <p className="text-xs text-[#094771] text-center mt-1.5">
            This code will also be sent to you via SMS
          </p>
        </div>

        {/* Sample Image */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#002B47] mb-2 text-center">
            Sample Pose
          </h2>
          <div className="rounded-xl overflow-hidden border-2 border-[#1b75bb] shadow-md h-[150px] flex items-center justify-center">
            <img
              src={samplePoseImage}
              alt="Sample pose showing face and verification code"
              className="w-auto h-full object-contain"
            />
          </div>
          <p className="text-xs text-[#094771] text-center mt-1.5">
            Make sure both your face and the code are clearly visible
          </p>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-200 shadow-lg z-20">
        <div className="w-full max-w-md mx-auto px-6 py-4">
          <div className="space-y-2.5">
            {/* Primary Button */}
            <Button
              onClick={handleGotIt}
              className="w-full h-11 text-sm bg-[#004880] hover:bg-[#003366] text-white font-medium rounded-xl"
            >
              Ok, Got it
            </Button>

            {/* Link */}
            <button
              onClick={handleContinue}
              className="w-full text-xs text-[#1b75bb] hover:text-[#004880] font-medium underline"
            >
              Continue with PIVV
            </button>
          </div>
        </div>
      </footer>

      <Footer />
    </motion.div>
  );
};

export default OfflineVerificationScreen;
