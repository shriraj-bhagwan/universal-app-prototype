export type LanguageCode = 'english' | 'hindi' | 'malayalam' | 'tamil';

type WhatsAppContext = {
  customerName: string;
  payoutAmount: string;
  policyNumber: string;
  time: string;
};

const whatsappDefaultContext: WhatsAppContext = {
  customerName: 'Ashok',
  payoutAmount: '₹1,216 every month',
  policyNumber: 'ALI000000123456',
  time: '11.14 AM',
};

export const copy = {
  whatsapp: {
    brandName: 'Bandhan Life',
    statusText: 'online',
    cta: 'Click here to Proceed',
    videoDuration: '1:00',
    defaultContext: whatsappDefaultContext,
    message: (ctx: WhatsAppContext) => ({
      salutation: `Hi ${ctx.customerName},`,
      body1: `💰 You’re almost there to start receiving ${ctx.payoutAmount} from your Bandhan Life policy with proposal no. ${ctx.policyNumber}.`,
      body2: 'Watch this video to understand your policy better.',
      body3: 'Please click on the below link to know more details about your policy.',
      time: ctx.time,
    }),
  },
  languageSelection: {
    title: (brand: string) => `Greetings from ${brand}!`,
    subtitle: 'Pre-Issuance Verification',
    description: 'Select your preferred language to proceed.',
    languages: [
      { code: 'english', label: 'English' },
      { code: 'hindi', label: 'हिंदी' },
      { code: 'malayalam', label: 'മലയാളം' },
      { code: 'tamil', label: 'தமிழ்' },
    ] as { code: LanguageCode; label: string }[],
    greetingText: (language: LanguageCode, name: string) => {
      const greeting = {
        english: `Hi ${name}. This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.`,
        hindi: `नमस्ते ${name}। यह छोटा सा चरण आपको अपनी पॉलिसी बेहतर तरीके से समझने में मदद करेगा—फायदे, शर्तें और जरूरी बातें। इसमें केवल दो मिनट लगेंगे।`,
        malayalam: `ഹായ് ${name}. നിങ്ങളുടെ പോളിസിയെ കുറിച്ച് കൂടുതൽ അറിയാൻ ഈ ചുരുങ്ങിയ ഘട്ടം സഹായിക്കും. ആനുകൂല്യങ്ങളും നിബന്ധനകളും പ്രധാന കാര്യങ്ങളും നിങ്ങൾക്ക് വ്യക്തമായി മനസ്സിലാകും. രണ്ട് മിനിറ്റിൽ പൂർത്തിയാകും.`,
        tamil: `வணக்கம் ${name}. உங்கள் பாலிசியைப் பற்றி தெளிவாக அறிய இந்தச் சிறிய கட்டம் உதவும். பலன்கள், நிபந்தனைகள் மற்றும் முக்கிய அம்சங்களை இரண்டு நிமிடத்தில் சொல்கிறோம்.`,
      } as Record<LanguageCode, string>;

      return greeting[language] ?? greeting.english;
    },
  },
  audio: {
    preRecorded: {
      permissions: {
        english:
          'UklGRmQGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUAGAACAjZmip6ejmo6Bc2deWFhcZHB9i5ehpqeknJGDdmlfWVhbYm16iJWfpqelnpOGeGthWlhaYWt4hpOepaemn5WIem1iW1hZX2l2g5GcpKemoZeLfXBkXFhYXmdzgY6ao6enopmNf3JmXVhYXGVxfoyYoaeno5uPgnRoXllYW2NufImWoKanpJ2ShXdqYFlYWmFseYeUnqWopZ6Uh3lsYVpYWWBqd4WSnaSnpqCWiXxuY1tYWV5odIKPm6Onp6GYjH5xZVxYWF1mcoCNmaKnp6OajoFzZ15YWFxkcH2Ll6Gmp6SckYN2aV9ZWFtibXqIlZ+mp6Wek4Z4a2FaWFpha3iGk56lp6aflYh6bWJbWFlfaXaDkZykp6ahl4t9cGRcWFheZ3OBjpqjp6eimY2AcmZdWFhcZXF+jJihp6ejm4+CdGheWVhbY258iZagpqeknZKFd2pgWVhaYWx5h5SepailnpSHeWxhWlhZYGp3hZKdpKemoJaJfG5jW1hZXmh0go+bo6enoZiMfnFlXFhYXWZygI2Zoqeno5qOgXNnXlhYXGRwfYuXoaanpJyRg3ZpX1lYW2JteoiVn6anpZ6ThnhrYVpYWmFreIaTnqWnpp+ViHptYltYWV9pdoORnKSnpqGXi31wZFxYWF5nc4GOmqOnp6KZjX9yZl1YWFxlcX6MmKGnp6Obj4J0aF5ZWFtjbnyJlqCmp6SdkoV3amBZWFphbHmHlJ6lqKWelId5bGFaWFlganeFkp2kp6aglol8bmNbWFleaHSCj5ujp6ehmIx+cWVcWFhdZnJ/jZmip6ejmo6Bc2deWFhcZHB9i5ehpqeknJGDdmlfWVhbYm16iJWfpqelnpOGeGthWlhaYWt4hpOepaemn5WIem1iW1hZX2l2g5GcpKemoZeLfXBkXFhYXmdzgY6ao6enopmNf3JmXVhYXGVxfoyYoaeno5uPgnRoXllYW2NufImWoKanpJ2ShXdqYFlYWmFseYeUnqWopZ6Uh3lsYVpYWWBqd4WSnaSnpqCWiXxuY1tYWV5odIKPm6Onp6GYjH5xZVxYWF1mcoCNmaKnp6OajoFzZ15YWFxkcH2Ll6Gmp6SckYN2aV9ZWFtibXqIlZ+mp6Wek4Z4a2FaWFpha3iGk56lp6aflYh6bWJbWFlfaXaDkZykp6ahl4t9cGRcWFheZ3OBjpqjp6eimY1/cmZdWFhcZXF+jJihp6ejm4+CdGheWVhbY258iZagpqeknZKFd2pgWVhaYWx5h5SepailnpSHeWxhWlhZYGp3hZKdpKemoJaJfG5jW1hZXmh0go+bo6enoZiMfnFlXFhYXWZygI2Zoqeno5qOgXNnXlhYXGRwfYuXoaanpJyRg3ZpX1lYW2JteoiVn6anpZ6ThnhrYVpYWmFreIaTnqWnpp+ViHptYltYWV9pdoORnKSnpqGXi31wZFxYWF5nc4GOmqOnp6KZjX9yZl1YWFxlcX6MmKGnp6Obj4J0aF5ZWFtjbnyJlqCmp6SdkoV3amBZWFphbHmHlJ6lqKWelId5bGFaWFlganeFkp2kp6aglol8bmNbWFleaHSCj5ujp6ehmIx+cWVcWFhdZnJ/jZmip6ejmo6Bc2deWFhcZHB9i5ehpqeknJGDdmlfWVhbYm16iJWfpqelnpOGeGthWlhaYWt4hpOepaemn5WIem1iW1hZX2l2g5GcpKemoZeLfXBkXFhYXmdzgY6ao6enopmNgHJmXVhYXGVxfoyYoaeno5uPgnRoXllYW2NufImWoKanpJ2ShXdqYFlYWmFseYeUnqWopZ6Uh3lsYVpYWWBqd4WSnaSnpqCWiXxuY1tYWV5odIKPm6Onp6GYjH5xZVxYWF1mcoCNmaKnp6OajoFzZ15YWFxkcH2Ll6Gmp6SckYN2aV9ZWFtibXqIlZ+mp6Wek4Z4a2FaWFpha3iGk56lp6aflYh6bWJbWFlfaXaDkZykp6ahl4t9cGRcWFheZ3OBjpqjp6eimY1/cmZdWFhcZXF+jJihp6ejm4+CdGheWVhbY258iZagpqeknZKFd2pgWVhaYWx5h5SepailnpSHeWxhWlhZYGp3hZKdpKemoJaJfG5jW1hZXmh0go+bo6enoZiMfnFlXFhYXWZy',
      },
    },
    scripts: (
      key: 'greeting' | 'policy-intro' | 'policy-details' | 'confirmation' | 'permissions',
      language: LanguageCode,
      name: string
    ) => {
      const texts: Record<
        typeof key,
        Record<LanguageCode, string>
      > = {
        greeting: {
          english: `Hi ${name}. This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.`,
          hindi: `नमस्ते ${name}। यह छोटा सा चरण आपको अपनी पॉलिसी बेहतर तरीके से समझने में मदद करेगा—फायदे, शर्तें और जरूरी बातें। इसमें केवल दो मिनट लगेंगे।`,
          malayalam: `ഹായ് ${name}. നിങ്ങളുടെ പോളിസിയെ കുറിച്ച് കൂടുതൽ അറിയാൻ ഈ ചുരുങ്ങിയ ഘട്ടം സഹായിക്കും. ആനുകൂല്യങ്ങളും നിബന്ധനകളും പ്രധാന കാര്യങ്ങളും നിങ്ങൾക്ക് വ്യക്തമായി മനസ്സിലാകും. രണ്ട് മിനിറ്റിൽ പൂർത്തിയാകും.`,
          tamil: `வணக்கம் ${name}. உங்கள் பாலிசியைப் பற்றி தெளிவாக அறிய இந்தச் சிறிய கட்டம் உதவும். பலன்கள், நிபந்தனைகள் மற்றும் முக்கிய அம்சங்களை இரண்டு நிமிடத்தில் சொல்கிறோம்.`,
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
        permissions: {
          english: 'Please allow access to your camera, microphone, and location so we can verify your identity securely.',
          hindi: 'कृपया अपना कैमरा, माइक्रोफोन और लोकेशन एक्सेस दें ताकि हम आपकी पहचान सुरक्षित रूप से सत्यापित कर सकें।',
          malayalam: 'ദയവായി ക്യാമറ, മൈക്രോഫോൺ, ലൊക്കേഷൻ ആക്സസ് അനുവദിക്കുക, ώστε ഞങ്ങൾ നിങ്ങളുടെ തിരിച്ചറിയൽ സുരക്ഷിതമായി ഉറപ്പാക്കാൻ കഴിയൂ.',
          tamil: 'தயவு செய்து கேமரா, மைக்ரோஃபோன், இருப்பிட அணுகலை அனுமதிக்கவும்; உங்கள் அடையாளத்தை பாதுகாப்பாக உறுதிப்படுத்த இது தேவையாகிறது.',
        },
      };

      return texts[key]?.[language] ?? texts[key]?.english ?? '';
    },
  },
};
