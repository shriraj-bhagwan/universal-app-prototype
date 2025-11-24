const AvatarCharacter = () => {
  return (
    <div className="relative flex justify-center items-center mb-6">
      {/* Avatar container */}
      <div className="relative w-32 h-32">
        {/* Head */}
        <div className="absolute inset-0 bg-secondary rounded-full overflow-hidden">
          {/* Hair */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-[#1a1a1a] rounded-t-full" />
          
          {/* Face */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-24 bg-[#d4a574] rounded-full">
            {/* Glasses */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-7 h-7 rounded-full border-4 border-[#333] bg-white/30" />
              <div className="w-7 h-7 rounded-full border-4 border-[#333] bg-white/30" />
            </div>
            
            {/* Nose */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-2 h-3 bg-[#c89563] rounded-full" />
          </div>
          
          {/* Earrings */}
          <div className="absolute top-16 left-2 w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-500" />
          <div className="absolute top-16 right-2 w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-500" />
        </div>
        
        {/* Body/Shirt */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-primary rounded-t-3xl" />
      </div>
    </div>
  );
};

export default AvatarCharacter;
