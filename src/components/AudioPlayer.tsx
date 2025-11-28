import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

// Cache audio URLs per key to avoid repeated network calls
const audioCache: Record<string, string> = {};

interface AudioPlayerProps {
  audioKey: string;
  autoPlay?: boolean;
}

const AudioPlayer = ({ audioKey, autoPlay = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { userName, selectedLanguage, audioPermissionGranted } = useUser();
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const translations: Record<
          string,
          { english: string; hindi: string; malayalam: string; tamil: string }
        > = {
          greeting: {
            english: `Hi ${userName}. This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.`,
            hindi: `नमस्ते ${userName}। यह छोटा सा चरण आपको अपनी पॉलिसी बेहतर तरीके से समझने में मदद करेगा—फायदे, शर्तें और जरूरी बातें। इसमें केवल दो मिनट लगेंगे।`,
            malayalam: `ഹായ് ${userName}. നിങ്ങളുടെ പോളിസിയെ കുറിച്ച് കൂടുതൽ അറിയാൻ ഈ ചുരുങ്ങിയ ഘട്ടം സഹായിക്കും. ആനുകൂല്യങ്ങളും നിബന്ധനകളും പ്രധാന കാര്യങ്ങളും നിങ്ങൾക്ക് വ്യക്തമായി മനസ്സിലാകും. രണ്ട് മിനിറ്റിൽ പൂർത്തിയാകും.`,
            tamil: `வணக்கம் ${userName}. உங்கள் பாலிசியைப் பற்றி தெளிவாக அறிய இந்தச் சிறிய கட்டம் உதவும். பலன்கள், நிபந்தனைகள் மற்றும் முக்கிய அம்சங்களை இரண்டு நிமிடத்தில் சொல்கிறோம்.`,
          },
          'policy-intro': {
            english: 'Great, let us go through your policy together. I will explain everything in simple words, so that you are clear about your policy.',
            hindi: 'बहुत बढ़िया, चलिए आपकी पॉलिसी को साथ में देखते हैं। मैं सब कुछ आसान शब्दों में समझाऊँगा ताकि आपको पूरी तरह स्पष्ट हो जाए।',
            malayalam: 'ശരി, നമുക്ക് നിങ്ങളുടെ പോളിസി ഒരുമിച്ച് നോക്കാം. എല്ലാം ലളിതമായ വാക്കുകളിൽ ഞാൻ വിശദീകരിക്കും, നിങ്ങള്ക്ക് വ്യക്തമായി മനസ്സിലാക്കാൻ.',
            tamil: 'சரி, உங்கள் பாலிசியை சேர்ந்து பார்க்கலாம். எளிய வார்த்தைகளில் அனைத்தையும் விளக்குகிறேன், தெளிவாகப் புரிய.',
          },
          'policy-details': {
            english: 'Here are the key details of your Bandhan Life Income Wealth plan. Listen carefully to understand benefits, payouts, and tax advantages.',
            hindi: 'यहाँ आपके बंधन लाइफ इनकम वेल्थ प्लान की मुख्य जानकारी है। लाभ, भुगतान और टैक्स फायदे समझने के लिए ध्यान से सुनें।',
            malayalam: 'ഇവയാണ് നിങ്ങളുടെ ബന്ദൻ ലൈഫ് ഇൻകം വെൽത്ത് പദ്ധതിയുടെ പ്രധാന വിവരങ്ങൾ. ആനുകൂല്യങ്ങളും പെയ്ഔട്ടുകളും നികുതി നേട്ടങ്ങളും മനസ്സിലാക്കാൻ ശ്രദ്ധിച്ച് കേൾക്കൂ.',
            tamil: 'இதோ உங்கள் பந்தன் லைஃப் இன்கம் வெல்த் திட்டத்தின் முக்கிய தகவல்கள். பலன், பணப்பரிவர்த்தனை மற்றும் வரி நன்மைகளை புரிந்துகொள்ள கவனமாக கேளுங்கள்.',
          },
          confirmation: {
            english: 'Hope this helped you understand your policy better. Now one last step, we need a quick confirmation from you.',
            hindi: 'उम्मीद है इससे आपको अपनी पॉलिसी बेहतर समझ आई होगी। अब अंतिम चरण में हमें आपसे एक त्वरित पुष्टि चाहिए।',
            malayalam: 'ഇതിലൂടെ നിങ്ങളുടെ പോളിസിയെ കുറിച്ച് കൂടുതൽ വ്യക്തത ലഭിച്ചതായി പ്രതീക്ഷിക്കുന്നു. ഇനി അവസാന ഘട്ടത്തിൽ, ഒരു ലഘു സ്ഥിരീകരണം ആവശ്യമാണ്.',
            tamil: 'இது உங்கள் பாலிசியைப் பற்றி தெளிவாகியிருக்க வேண்டும். கடைசியாக, உங்களிடம் இருந்து ஒரு விரைவான உறுதிப்படுத்தல் தேவை.',
          },
        };

        const text = translations[audioKey]?.[selectedLanguage] ?? translations[audioKey]?.english;
        if (!text) {
          console.warn(`No script configured for audioKey "${audioKey}"`);
          return;
        }

        if (audioCache[audioKey]) {
          setAudioUrl(audioCache[audioKey]);
          return;
        }

        const voiceByLanguage: Record<string, string> = {
          // Studio-quality English (USA) voice; fallback for all
          english: 'en-US-Studio-O',
        };

        const { data, error } = await supabase.functions.invoke('text-to-speech', {
          body: {
            text,
            voice: voiceByLanguage[selectedLanguage] ?? voiceByLanguage.english,
          },
        });

        if (error) {
          console.error('Error fetching audio:', error);
          return;
        }

        if (data?.audioContent) {
          // Convert base64 audio to blob URL and cache it
          const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
          audioCache[audioKey] = url;
          setAudioUrl(url);
        }
      } catch (err) {
        console.error('Error in fetchAudio:', err);
      }
    };

    if (audioKey && selectedLanguage && userName) {
      fetchAudio();
    }
  }, [audioKey, selectedLanguage, userName, autoPlay]);

  // Attempt to play whenever we have a URL and either autoplay is on with permission or user interaction is required
  useEffect(() => {
    const tryPlay = () => {
      if (!audioRef.current || !audioUrl) return;
      audioRef.current.play().then(() => setNeedsInteraction(false)).catch((err) => {
        console.error('Audio playback failed:', err);
        setNeedsInteraction(true);
      });
    };

    if (autoPlay && audioUrl) {
      // Only attempt autoplay if the user explicitly granted permission via the WhatsApp button
      if (audioPermissionGranted) {
        tryPlay();
      } else {
        setNeedsInteraction(true);
      }
    }
  }, [audioUrl, autoPlay, audioPermissionGranted]);

  useEffect(() => {
    if (!needsInteraction) return;

    const handleUserGesture = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setNeedsInteraction(false))
          .catch((err) => console.error('Audio playback still blocked:', err));
      }
    };

    document.addEventListener('pointerdown', handleUserGesture, { once: true });
    document.addEventListener('keydown', handleUserGesture, { once: true });

    return () => {
      document.removeEventListener('pointerdown', handleUserGesture);
      document.removeEventListener('keydown', handleUserGesture);
    };
  }, [needsInteraction]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        controls={false}
      />
      {needsInteraction && (
        <button
          type="button"
          onClick={() => audioRef.current?.play().then(() => setNeedsInteraction(false)).catch((err) => console.error('Audio playback failed on click:', err))}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground px-4 py-2 shadow-lg"
        >
          Tap to play audio
        </button>
      )}
    </>
  );
};

export default AudioPlayer;
