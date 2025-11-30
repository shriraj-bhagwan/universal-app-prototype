import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  selectedLanguage: string;
  audioPermissionGranted: boolean;
  setUserName: (name: string) => void;
  setSelectedLanguage: (language: string) => void;
  setAudioPermissionGranted: (granted: boolean) => void;
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
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [audioPermissionGranted, setAudioPermissionGrantedState] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('audioPermissionGranted') === 'true';
  });

  const setAudioPermissionGranted = (granted: boolean) => {
    setAudioPermissionGrantedState(granted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('audioPermissionGranted', granted ? 'true' : 'false');
    }
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        selectedLanguage,
        audioPermissionGranted,
        setUserName,
        setSelectedLanguage,
        setAudioPermissionGranted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
