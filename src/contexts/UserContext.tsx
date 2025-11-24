import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  selectedLanguage: string;
  setUserName: (name: string) => void;
  setSelectedLanguage: (language: string) => void;
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

  return (
    <UserContext.Provider
      value={{
        userName,
        selectedLanguage,
        setUserName,
        setSelectedLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
