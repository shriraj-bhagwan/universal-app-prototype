import headerLogo from '@/assets/header-logo.png';

const Header = () => {
  return (
    <header className="bg-background py-4 px-6 border-b border-border">
      <img 
        src={headerLogo} 
        alt="BandhanLife" 
        className="h-8 w-auto"
      />
    </header>
  );
};

export default Header;
