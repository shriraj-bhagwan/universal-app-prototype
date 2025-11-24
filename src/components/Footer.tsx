import leafFooter from '@/assets/leaf-footer.png';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none">
      <img 
        src={leafFooter} 
        alt="" 
        className="w-full h-full object-contain"
      />
    </footer>
  );
};

export default Footer;
