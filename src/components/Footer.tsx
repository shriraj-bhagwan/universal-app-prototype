import leafFooter from '@/assets/leaf-footer.png';

const Footer = () => {
  return (
    <footer
      className="absolute pointer-events-none -z-10"
      style={{
        width: '122.29px',
        height: '160.22px',
        top: '640px',
        left: '255px',
        opacity: 1
      }}
    >
      <img 
        src={leafFooter} 
        alt="" 
        className="w-full h-full object-contain"
      />
    </footer>
  );
};

export default Footer;
