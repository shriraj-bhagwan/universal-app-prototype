import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  selectedLanguage: string;
  audioPermissionGranted: boolean;
  audioContextUnlocked: boolean;
  globalAudioContext: AudioContext | null;
  setUserName: (name: string) => void;
  setSelectedLanguage: (language: string) => void;
  setAudioPermissionGranted: (granted: boolean) => void;
  unlockAudioContext: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState('Ashok');
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'english';
    return localStorage.getItem('selectedLanguage') || 'english';
  });
  const [audioPermissionGranted, setAudioPermissionGrantedState] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('audioPermissionGranted') === 'true';
  });
  const [audioContextUnlocked, setAudioContextUnlocked] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [, forceUpdate] = useState({});

  const setSelectedLanguage = (language: string) => {
    setSelectedLanguageState(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', language);
    }
  };

  const setAudioPermissionGranted = (granted: boolean) => {
    setAudioPermissionGrantedState(granted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('audioPermissionGranted', granted ? 'true' : 'false');
    }
  };

  const unlockAudioContext = async () => {
    console.log('🔓 [UserContext] unlockAudioContext called', {
      alreadyUnlocked: audioContextUnlocked,
      contextExists: !!audioContextRef.current,
    });

    // Only unlock once
    if (audioContextUnlocked) {
      console.log('✅ [UserContext] AudioContext already unlocked, skipping');
      return;
    }

    try {
      // Create or reuse AudioContext
      if (!audioContextRef.current) {
        console.log('🆕 [UserContext] Creating new AudioContext');
        audioContextRef.current = new AudioContext();
        forceUpdate({}); // Force re-render to update context value
        console.log('✅ [UserContext] AudioContext created', {
          state: audioContextRef.current.state,
          sampleRate: audioContextRef.current.sampleRate,
        });
      }

      const audioContext = audioContextRef.current;

      // Resume AudioContext if suspended
      if (audioContext.state === 'suspended') {
        console.log('▶️ [UserContext] Resuming suspended AudioContext');
        await audioContext.resume();
        console.log('✅ [UserContext] AudioContext resumed', { state: audioContext.state });
      }

      // Create a very short silent buffer (0.001 seconds)
      console.log('🔇 [UserContext] Playing silent audio to unlock');
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.001, audioContext.sampleRate);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);

      setAudioContextUnlocked(true);
      console.log('✅✅✅ [UserContext] AudioContext UNLOCKED successfully', {
        state: audioContext.state,
        contextId: audioContext.toString(),
      });
    } catch (error) {
      console.error('❌ [UserContext] Failed to unlock AudioContext:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        selectedLanguage,
        audioPermissionGranted,
        audioContextUnlocked,
        globalAudioContext: audioContextRef.current,
        setUserName,
        setSelectedLanguage,
        setAudioPermissionGranted,
        unlockAudioContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
