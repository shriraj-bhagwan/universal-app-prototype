import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // milliseconds between characters
  className?: string;
}

const TypewriterText = ({ text, speed = 25, className }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
};

export default TypewriterText;
