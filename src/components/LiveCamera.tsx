import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import * as faceapi from 'face-api.js';

type LiveCameraProps = {
  variant?: 'rectangle' | 'circle';
  className?: string;
  enableFaceDetection?: boolean;
  onFaceDetectionChange?: (faceDetected: boolean) => void;
};

const LiveCamera = ({
  variant = 'rectangle',
  className,
  enableFaceDetection = false,
  onFaceDetectionChange
}: LiveCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const detectionIntervalRef = useRef<number | null>(null);

  // Load face detection models
  useEffect(() => {
    const loadModels = async () => {
      if (!enableFaceDetection) return;

      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        setModelsLoaded(true);
        console.log('Face detection models loaded');
      } catch (err) {
        console.error('Error loading face detection models:', err);
      }
    };

    loadModels();
  }, [enableFaceDetection]);

  // Start camera
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
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  // Face detection logic
  useEffect(() => {
    if (!enableFaceDetection || !modelsLoaded || !videoRef.current) return;

    const detectFace = async () => {
      if (!videoRef.current) return;

      try {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
        );

        const detected = !!detection;
        setFaceDetected(detected);
        onFaceDetectionChange?.(detected);
      } catch (err) {
        console.error('Face detection error:', err);
      }
    };

    // Run face detection every 500ms
    detectionIntervalRef.current = window.setInterval(detectFace, 500);

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [enableFaceDetection, modelsLoaded, onFaceDetectionChange]);

  const isCircle = variant === 'circle';

  // Determine border color based on face detection
  const getBorderColor = () => {
    if (!enableFaceDetection) {
      return isCircle ? 'border-[#1b75bb]' : 'border-primary/60';
    }
    return faceDetected ? 'border-[#1b75bb]' : 'border-red-500';
  };

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
