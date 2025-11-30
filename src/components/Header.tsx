import { ReactNode } from 'react';
import headerLogo from '@/assets/header-logo.png';

type HeaderProps = {
  rightContent?: ReactNode;
};

const Header = ({ rightContent }: HeaderProps) => (
  <header className="bg-background py-4 px-6 border-b border-border">
    <div className="flex items-center justify-between gap-4">
      <img src={headerLogo} alt="BandhanLife" className="h-8 w-auto" />
      {rightContent}
    </div>
  </header>
);

export default Header;
