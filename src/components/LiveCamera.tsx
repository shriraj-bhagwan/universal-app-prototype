import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type LiveCameraProps = {
  variant?: 'rectangle' | 'circle';
  className?: string;
};

const LiveCamera = ({ variant = 'rectangle', className }: LiveCameraProps) => {
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

  const isCircle = variant === 'circle';

  return (
    <div className={cn('relative mx-auto', isCircle ? 'w-[232px] h-[232px] sm:w-[240px] sm:h-[240px]' : 'w-full max-w-md', className)}>
      <div
        className={cn(
          'relative overflow-hidden border shadow-lg bg-black',
          isCircle
            ? 'rounded-full w-full h-full border-[4px] border-[#1b75bb]'
            : 'rounded-xl aspect-video border-primary/60'
        )}
      >
        {error ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[8px] text-muted-foreground text-center px-1">{error}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn('w-full h-full object-cover', isCircle && 'rounded-full')}
          />
        )}
      </div>
    </div>
  );
};

export default LiveCamera;
