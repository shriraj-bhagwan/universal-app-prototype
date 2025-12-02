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
    <div
      className={cn(
        'relative w-full mx-auto mb-4',
        isCircle ? 'max-w-[240px]' : 'max-w-md',
        className
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden border shadow-lg bg-black',
          isCircle
            ? 'rounded-full w-56 h-56 mx-auto border-4 border-[#1b75bb]'
            : 'rounded-xl aspect-video border-primary/60'
        )}
      >
        {error ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xs text-muted-foreground text-center px-4">{error}</p>
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
        <div className={cn(
          'absolute text-destructive-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1 bg-destructive',
          isCircle ? 'top-3 right-3' : 'top-3 right-3'
        )}>
          <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse" />
          Live
        </div>
      </div>
    </div>
  );
};

export default LiveCamera;
