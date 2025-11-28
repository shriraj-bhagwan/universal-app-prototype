import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const AvatarCharacter = () => {
  const [animationData, setAnimationData] = useState(null);

  // Load the Lottie JSON (extracted from the .lottie bundle)
  useEffect(() => {
    fetch('/avatar-animation.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Error loading animation:', err));
  }, []);

  if (!animationData) {
    return (
      <div className="relative flex justify-center items-center mb-6">
        <div className="w-32 h-32 bg-secondary/20 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center mb-6">
      <div className="w-32 h-32">
        <Lottie 
          animationData={animationData} 
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default AvatarCharacter;
