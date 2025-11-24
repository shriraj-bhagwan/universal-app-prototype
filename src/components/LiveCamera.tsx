import { useEffect, useRef, useState } from 'react';

const LiveCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto mb-4">
      <div className="relative rounded-full overflow-hidden w-48 h-48 mx-auto border-4 border-primary shadow-lg">
        {error ? (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-xs text-muted-foreground text-center px-4">{error}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
        <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse" />
          Live
        </div>
      </div>
    </div>
  );
};

export default LiveCamera;
