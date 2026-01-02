import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import * as faceapi from 'face-api.js';

type LivenessCheckProps = {
  className?: string;
  onLivenessComplete?: () => void;
  hideSegmentsAfterComplete?: boolean;
  onStreamReady?: (stream: MediaStream) => void;
};

const TOTAL_SEGMENTS = 12;
const REQUIRED_SEGMENTS = 6; // Complete when 6 out of 12 are filled
const SEGMENT_ANGLE = 360 / TOTAL_SEGMENTS;

const LivenessCheck = ({ className, onLivenessComplete, hideSegmentsAfterComplete = false, onStreamReady }: LivenessCheckProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [completedSegments, setCompletedSegments] = useState<Set<number>>(new Set());
  const detectionIntervalRef = useRef<number | null>(null);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Load face detection models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
        ]);
        setModelsLoaded(true);
        console.log('Liveness check models loaded');
      } catch (err) {
        console.error('Error loading models:', err);
      }
    };

    loadModels();
  }, []);

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
        // Notify parent component that stream is ready
        onStreamReady?.(mediaStream);
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

  // Face detection and head pose tracking
  useEffect(() => {
    if (!modelsLoaded || !videoRef.current) return;

    const video = videoRef.current;

    const detectFaceAndPose = async () => {
      if (!video || video.readyState !== 4) return; // Wait for video to be ready

      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
          .withFaceLandmarks(true);

        if (detection) {
          setFaceDetected(true);

          // Calculate head pose based on landmarks
          const landmarks = detection.landmarks;
          const nose = landmarks.getNose();

          // Calculate center of face
          const noseTip = nose[3]; // Nose tip landmark
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Only proceed if video dimensions are valid
          if (videoWidth === 0 || videoHeight === 0) return;

          // Normalize coordinates (-1 to 1)
          const normalizedX = (noseTip.x / videoWidth - 0.5) * 2;
          const normalizedY = (noseTip.y / videoHeight - 0.5) * 2;

          // Calculate angle based on nose position (in degrees, 0-360)
          let angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);
          angle = (angle + 360 + 90) % 360; // Adjust so 0 degrees is at top

          // Determine which segment this angle falls into
          const segmentIndex = Math.floor(angle / SEGMENT_ANGLE);

          // Mark segment as completed
          setCompletedSegments((prev) => {
            const newSet = new Set(prev);
            newSet.add(segmentIndex);
            return newSet;
          });
        } else {
          setFaceDetected(false);
        }
      } catch (err) {
        console.error('Face detection error:', err);
      }
    };

    // Wait for video to be ready before starting detection
    const handleLoadedData = () => {
      console.log('Video loaded, starting face detection');
      // Run face detection every 200ms for smoother tracking
      detectionIntervalRef.current = window.setInterval(detectFaceAndPose, 200);
    };

    if (video.readyState >= 2) {
      // Video is already loaded
      handleLoadedData();
    } else {
      // Wait for video to load
      video.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [modelsLoaded]);

  // Check if liveness is complete
  useEffect(() => {
    if (completedSegments.size >= REQUIRED_SEGMENTS && !isComplete) {
      setIsComplete(true);
      onLivenessComplete?.();
    }
  }, [completedSegments, onLivenessComplete, isComplete]);

  const renderSegments = () => {
    const segments = [];
    const innerRadius = 75;
    const outerRadiusDefault = 85;
    const outerRadiusActive = 95;

    for (let i = 0; i < TOTAL_SEGMENTS; i++) {
      const isCompleted = completedSegments.has(i);
      const startAngle = i * SEGMENT_ANGLE - 90; // Start from top
      const endAngle = startAngle + SEGMENT_ANGLE;
      const outerRadius = isCompleted ? outerRadiusActive : outerRadiusDefault;

      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      // Calculate arc path
      const x1 = 100 + innerRadius * Math.cos(startRad);
      const y1 = 100 + innerRadius * Math.sin(startRad);
      const x2 = 100 + outerRadius * Math.cos(startRad);
      const y2 = 100 + outerRadius * Math.sin(startRad);
      const x3 = 100 + outerRadius * Math.cos(endRad);
      const y3 = 100 + outerRadius * Math.sin(endRad);
      const x4 = 100 + innerRadius * Math.cos(endRad);
      const y4 = 100 + innerRadius * Math.sin(endRad);

      const pathData = `
        M ${x1} ${y1}
        L ${x2} ${y2}
        A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
        L ${x4} ${y4}
        A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
        Z
      `;

      segments.push(
        <path
          key={i}
          d={pathData}
          fill={isCompleted ? '#22c55e' : '#94a3b8'}
          stroke="white"
          strokeWidth="1"
          className="transition-all duration-300"
        />
      );
    }

    return segments;
  };

  const shouldShowSegments = !hideSegmentsAfterComplete || !isComplete;

  return (
    <div className={cn('relative', className)}>
      {/* SVG Overlay with segments */}
      {shouldShowSegments && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 200"
          style={{ transform: 'scale(1)' }}
        >
          {renderSegments()}
        </svg>
      )}

      {/* Camera in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'relative overflow-hidden border-2 shadow-lg bg-black rounded-full transition-colors duration-300',
            faceDetected ? 'border-[#1b75bb]' : 'border-red-500'
          )}
          style={{ width: '150px', height: '150px' }}
        >
          {error ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-[8px] text-muted-foreground text-center px-1">{error}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-full"
              />
              {!faceDetected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                  <p className="text-xs font-semibold text-white bg-red-500/80 px-3 py-1.5 rounded-full">
                    Face not detected
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivenessCheck;
