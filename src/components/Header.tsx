import { ReactNode } from 'react';
import headerLogo from '@/assets/logo.svg';

type HeaderProps = {
  rightContent?: ReactNode;
};

const Header = ({ rightContent }: HeaderProps) => (
  <header className="h-12 px-4 flex items-center">
    <div className="w-full max-w-md mx-auto flex items-center justify-between gap-4">
      <img src={headerLogo} alt="BandhanLife" className="h-8 w-auto" />
      {rightContent}
    </div>
  </header>
);

export default Header;
