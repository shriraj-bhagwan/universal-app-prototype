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
    title: (brand: string) => `Greetings from ${brand}`,
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
      key: 'greeting' | 'policy-intro' | 'policy-details' | 'confirmation' | 'permissions' | 'personal-details',
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
          english: 'Let’s go through your policy together. I’ll explain your benefits and key details in simple words.',
          hindi: 'चलिए, आपकी पॉलिसी को साथ में समझते हैं। मैं आपको इसके फायदे और ज़रूरी शर्तें आसान शब्दों में बताऊँगी।',
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
          hindi: 'हमें उम्मीद है कि इससे आपकी पॉलिसी को समझने में मदद मिली होगी। अब बस एक आख़िरी कदम, हमें आपसे एक छोटी-सी पुष्टि चाहिए।',
          malayalam: 'ഇതിലൂടെ നിങ്ങളുടെ പോളിസിയെ കുറിച്ച് കൂടുതൽ വ്യക്തത ലഭിച്ചതായി പ്രതീക്ഷിക്കുന്നു. ഇനി അവസാന ഘട്ടത്തിൽ, ഒരു ലഘു സ്ഥിരീകരണം ആവശ്യമാണ്.',
          tamil: 'இது உங்கள் பாலிசியைப் பற்றி தெளிவாகியிருக்க வேண்டும். கடைசியாக, உங்களிடம் இருந்து ஒரு விரைவான உறுதிப்படுத்தல் தேவை.',
        },
        permissions: {
          english: 'We\'ll need your camera, microphone and location to begin. We\'ll show your face on screen during the process. This helps us confirm that you\'re personally reviewing your policy.',
          hindi: 'आगे बढ़ने के लिए हमें कैमरा, माइक्रोफोन और लोकेशन की अनुमति चाहिए। आपकी तस्वीर स्क्रीन पर दिखेगी, ताकि हम पुष्टि कर सकें कि आप खुद पॉलिसी देख रहे हैं।',
          malayalam: 'ദയവായി ക്യാമറ, മൈക്രോഫോൺ, ലൊക്കേഷൻ ആക്സസ് അനുവദിക്കുക, ώστে ഞങ്ങൾ നിങ്ങളുടെ തിരിച്ചറിയൽ സുരക്ഷിതമായി ഉറപ്പാക്കാൻ കഴിയൂ.',
          tamil: 'தயவு செய்து கேமரா, மைக்ரோஃபோன், இருப்பிட அணுகலை அனுமதிக்கவும்; உங்கள் அடையாளத்தை பாதுகாப்பாக உறுதிப்படுத்த இது தேவையாகிறது.',
        },
        'personal-details': {
          english: 'Please verify your personal details carefully. Make sure everything is correct before proceeding.',
          hindi: 'कृपया अपने व्यक्तिगत विवरण ध्यान से सत्यापित करें। आगे बढ़ने से पहले सुनिश्चित करें कि सब कुछ सही है।',
          malayalam: 'ദയവായി നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ ശ്രദ്ധാപൂർവം പരിശോധിക്കുക. തുടരുന്നതിന് മുമ്പ് എല്ലാം ശരിയാണെന്ന് ഉറപ്പാക്കുക.',
          tamil: 'உங்கள் தனிப்பட்ட விவரங்களை கவனமாக சரிபார்க்கவும். தொடருவதற்கு முன் அனைத்தும் சரியாக உள்ளதா என்பதை உறுதிப்படுத்தவும்.',
        },
      };

      return texts[key]?.[language] ?? texts[key]?.english ?? '';
    },
  },
  permissions: {
    title: {
      english: 'Pre-Issuance Verification',
      hindi: 'प्री-इश्यूअन्स वेरिफिकेशन',
      malayalam: 'പ്രീ-ഇഷ്വൻസ് വെരിഫിക്കേഷൻ',
      tamil: 'முன் வழங்கும் சரிபார்ப்பு',
    },
    subtitle: {
      english: 'Allow access to Camera, Microphone and Location',
      hindi: 'कैमरा, माइक्रोफोन और लोकेशन की अनुमति दें',
      malayalam: 'ക്യാമറ, മൈക്രോഫോൺ, ലൊക്കേഷൻ ആക്സസ് അനുവദിക്കുക',
      tamil: 'கேமரா, மைக்ரோஃபோன் மற்றும் இருப்பிட அணுகல் அனுமதிக்கவும்',
    },
    button: {
      english: 'Allow Access',
      hindi: 'अनुमति दें',
      malayalam: 'ആക്സസ് അനുവദിക്കുക',
      tamil: 'அணுகல் அனுமதிக்கவும்',
    },
    trouble: {
      english: 'Having Trouble?',
      hindi: 'समस्या हो रही है?',
      malayalam: 'പ്രശ്നമുണ്ടോ?',
      tamil: 'சிக்கல் இருக்கிறதா?',
    },
    clickHere: {
      english: 'Click here',
      hindi: 'यहाँ क्लिक करें',
      malayalam: 'ഇവിടെ ക്ലിക്ക് ചെയ്യുക',
      tamil: 'இங்கே கிளிக் செய்யவும்',
    },
  },
  policyDetails: {
    proposalNumber: {
      english: 'Proposal Number',
      hindi: 'प्रस्ताव संख्या',
      malayalam: 'Proposal Number?',
      tamil: 'Proposal Number?',
    },
    planLabel: {
      english: 'Plan: ',
      hindi: 'योजना: ',
      malayalam: 'Plan: ?',
      tamil: 'Plan: ?',
    },
    policyBenefits: {
      english: 'Policy Benefits',
      hindi: 'पॉलिसी लाभ',
      malayalam: 'Policy Benefits?',
      tamil: 'Policy Benefits?',
    },
    benefitIllustration: {
      english: 'Benefit Illustration',
      hindi: 'लाभ विवरण',
      malayalam: 'Benefit Illustration?',
      tamil: 'Benefit Illustration?',
    },
    needHelp: {
      english: 'Need Help',
      hindi: 'मदद चाहिए',
      malayalam: 'Need Help?',
      tamil: 'Need Help?',
    },
    understood: {
      english: 'Understood',
      hindi: 'आगे बढ़ें',
      malayalam: 'Understood?',
      tamil: 'Understood?',
    },
    tapHere: {
      english: 'TAP HERE',
      hindi: 'यहाँ टैप करें',
      malayalam: 'TAP HERE?',
      tamil: 'TAP HERE?',
    },
    listening: {
      english: 'LISTENING...',
      hindi: 'सुन रहे हैं...',
      malayalam: 'LISTENING...?',
      tamil: 'LISTENING...?',
    },
    cards: {
      planName: {
        title: {
          english: 'Plan Name',
          hindi: 'योजना का नाम',
          malayalam: 'Plan Name?',
          tamil: 'Plan Name?',
        },
        highlight: {
          english: 'Bandhan Life iIncome Wealth',
          hindi: 'Bandhan Life iIncome Wealth',
          malayalam: 'Bandhan Life Income Wealth?',
          tamil: 'Bandhan Life Income Wealth?',
        },
        description: {
          english: "It's a savings plan. Simple, secure, and not linked to the stock market fluctuations",
          hindi: 'यह एक बचत योजना है। सरल, सुरक्षित, और शेयर बाजार के उतार-चढ़ाव से जुड़ी नहीं',
          malayalam: "It's a savings plan. Simple, secure, and not linked to the stock market fluctuations?",
          tamil: "It's a savings plan. Simple, secure, and not linked to the stock market fluctuations?",
        },
      },
      policyTerm: {
        title: {
          english: 'Policy Term',
          hindi: 'पॉलिसी अवधि',
          malayalam: 'Policy Term?',
          tamil: 'Policy Term?',
        },
        subtitle: {
          english: '2025-2068',
          hindi: '2025-2068',
          malayalam: '2025-2068?',
          tamil: '2025-2068?',
        },
        highlight: {
          english: '43 years',
          hindi: '43 साल',
          malayalam: '43 years?',
          tamil: '43 years?',
        },
        highlightLabel: {
          english: 'till you reach the age of 85',
          hindi: 'जब तक आप 85 वर्ष की आयु तक नहीं पहुंच जाते',
          malayalam: 'till you reach the age of 85?',
          tamil: 'till you reach the age of 85?',
        },
      },
      income: {
        title: {
          english: 'Guaranteed Income',
          hindi: 'गारंटीड रकम',
          malayalam: 'Guaranteed Income?',
          tamil: 'Guaranteed Income?',
        },
        subtitle: {
          english: '2025-2068',
          hindi: '2025-2068',
          malayalam: '2025-2068?',
          tamil: '2025-2068?',
        },
        highlightLabel: {
          english: 'per month till your age of 84',
          hindi: 'प्रति माह 84 साल की उम्र तक पक्की गारंटीड रकम मिलती रहेगी',
          malayalam: 'per month till your age of 84?',
          tamil: 'per month till your age of 84?',
        },
        bonus: {
          english: '+ ₹1,824 bonus/month',
          hindi: '+ ₹1,824 बोनस/माह',
          malayalam: '+ ₹1,824 bonus/month?',
          tamil: '+ ₹1,824 bonus/month?',
        },
        note: {
          english: 'If declared, assuming 8% p.a.',
          hindi: 'यदि घोषित हो, 8% प्रति वर्ष मानते हुए',
          malayalam: 'If declared, assuming 8% p.a.?',
          tamil: 'If declared, assuming 8% p.a.?',
        },
      },
      maturity: {
        title: {
          english: 'Maturity Benefit',
          hindi: 'मैच्योरिटी बेनिफिट',
          malayalam: 'Maturity Benefit?',
          tamil: 'Maturity Benefit?',
        },
        subtitle: {
          english: 'Year 2083',
          hindi: 'वर्ष 2083',
          malayalam: 'Year 2083?',
          tamil: 'Year 2083?',
        },
        highlightLabel: {
          english: 'tax-free lumpsum',
          hindi: 'आपकी पॉलिसी पूरी होने पर, 85 साल की उम्र में यह रकम आपको एक साथ मिलेगी',
          malayalam: 'tax-free lumpsum?',
          tamil: 'tax-free lumpsum?',
        },
        note: {
          english: '8% p.a. assumed rate of return',
          hindi: '8% की अनुमानित सालाना ब्याज दर',
          malayalam: '8% p.a. assumed rate of return?',
          tamil: '8% p.a. assumed rate of return?',
        },
      },
      lifeCover: {
        title: {
          english: 'Life Cover',
          hindi: 'जीवन बीमा',
          malayalam: 'Life Cover?',
          tamil: 'Life Cover?',
        },
        subtitle: {
          english: 'Till 2083',
          hindi: '2083 तक',
          malayalam: 'Till 2083?',
          tamil: 'Till 2083?',
        },
        highlightLabel: {
          english: 'nominee receives',
          hindi: 'आपके नॉमिनी को यह राशि मिलेगी',
          malayalam: 'nominee receives?',
          tamil: 'nominee receives?',
        },
        note: {
          english: 'In case of unfortunate event',
          hindi: 'दुर्भाग्यपूर्ण घटना की स्थिति में',
          malayalam: 'In case of unfortunate event?',
          tamil: 'In case of unfortunate event?',
        },
      },
      premium: {
        title: {
          english: 'Premium Payment',
          hindi: 'प्रीमियम भुगतान',
          malayalam: 'Premium Payment?',
          tamil: 'Premium Payment?',
        },
        subtitle: {
          english: 'Till 2036',
          hindi: '2036 तक',
          malayalam: 'Till 2034?',
          tamil: 'Till 2034?',
        },
        highlightLabel: {
          english: 'per year for 12 years',
          hindi: '12 साल के लिए प्रति वर्ष',
          malayalam: 'per year for 10 years?',
          tamil: 'per year for 10 years?',
        },
        note: {
          english: 'To enjoy all benefits',
          hindi: 'प्रीमियम जमा न करने पर, पॉलिसी निष्क्रिय हो जाएगी और कोई लाभ नहीं मिलेगा',
          malayalam: 'To enjoy all benefits?',
          tamil: 'To enjoy all benefits?',
        },
      },
    },
    playAgain: {
      english: 'Play Again',
      hindi: 'फिर से सुनें',
      malayalam: 'Play Again?',
      tamil: 'Play Again?',
    },
    downloadBenefits: {
      english: 'Download Benefits',
      hindi: 'लाभ डाउनलोड करें',
      malayalam: 'Download Benefits?',
      tamil: 'Download Benefits?',
    },
  },
  personalDetails: {
    title: {
      english: 'Personal Details',
      hindi: 'व्यक्तिगत विवरण',
      malayalam: 'വ്യക്തിഗത വിവരങ്ങൾ',
      tamil: 'தனிப்பட்ட விவரங்கள்',
    },
    lifeAssuredName: {
      english: 'Life Assured Name',
      hindi: 'बीमित व्यक्ति का नाम',
      malayalam: 'ലൈഫ് അഷ്വേർഡ് നാമം',
      tamil: 'காப்பீட்டாளர் பெயர்',
    },
    dateOfBirth: {
      english: 'Date of Birth',
      hindi: 'जन्म तिथि',
      malayalam: 'ജനനതീയതി',
      tamil: 'பிறந்த தேதி',
    },
    gender: {
      english: 'Gender',
      hindi: 'लिंग',
      malayalam: 'ലിംഗം',
      tamil: 'பாலினம்',
    },
    education: {
      english: 'Education',
      hindi: 'शिक्षा',
      malayalam: 'വിദ്യാഭ്യാസം',
      tamil: 'கல்வி',
    },
    mobileNumber: {
      english: 'Mobile Number',
      hindi: 'मोबाइल नंबर',
      malayalam: 'മൊബൈൽ നമ്പർ',
      tamil: 'மொபைல் எண்',
    },
    emailAddress: {
      english: 'Email Address',
      hindi: 'ईमेल',
      malayalam: 'ഇമെയിൽ വിലാസം',
      tamil: 'மின்னஞ்சல் முகவரி',
    },
    address: {
      english: 'Address',
      hindi: 'पता',
      malayalam: 'വിലാസം',
      tamil: 'முகவரி',
    },
    policyBondDelivery: {
      english: '(Policy Bond will be delivered here)',
      hindi: '(पॉलिसी बॉन्ड यहां डिलीवर किया जाएगा)',
      malayalam: '(പോളിസി ബോണ്ട് ഇവിടെ ഡെലിവർ ചെയ്യും)',
      tamil: '(பாலிசி பத்திரம் இங்கே வழங்கப்படும்)',
    },
    nomineeName: {
      english: 'Nominee Name',
      hindi: 'नामिती का नाम',
      malayalam: 'നോമിനി നാമം',
      tamil: 'நியமனதாரர் பெயர்',
    },
    nomineeRelation: {
      english: 'Nominee Relation',
      hindi: 'नामिती का संबंध',
      malayalam: 'നോമിനി ബന്ധം',
      tamil: 'நியமனதாரர் உறவு',
    },
    downloadProposal: {
      english: 'Download Proposal Form',
      hindi: 'प्रस्ताव फॉर्म डाउनलोड करें',
      malayalam: 'പ്രൊപ്പോസൽ ഫോം ഡൗൺലോഡ് ചെയ്യുക',
      tamil: 'முன்மொழிவு படிவம் பதிவிறக்கவும்',
    },
    needHelp: {
      english: 'Need Help',
      hindi: 'मदद चाहिए',
      malayalam: 'സഹായം വേണോ',
      tamil: 'உதவி தேவையா',
    },
    itsRight: {
      english: "It's Right",
      hindi: 'यह सही है',
      malayalam: 'ഇത് ശരിയാണ്',
      tamil: 'இது സരി',
    },
  },
  consent: {
    title: {
      english: 'Consent',
      hindi: 'सहमति',
      malayalam: 'സമ്മതം',
      tamil: 'ஒப்புதல்',
    },
    livenessInstruction: {
      english: 'Please move your head slowly in a circle',
      hindi: 'कृपया अपना सिर धीरे-धीरे घेरे में घुमाएं',
      malayalam: 'ദയവായി നിങ്ങളുടെ തല സാവധാനം വൃത്താകൃതിയിൽ നീക്കുക',
      tamil: 'தயவுசெய்து உங்கள் தலையை மெதுவாக வட்டமாக நகர்த்தவும்',
    },
    livenessCompleted: {
      english: 'Liveness check completed!',
      hindi: 'जीवंतता जांच पूर्ण!',
      malayalam: 'ജീവനുള്ള പരിശോധന പൂർത്തിയായി!',
      tamil: 'உயிர் சரிபார்ப்பு முடிந்தது!',
    },
    statement1: {
      english: 'I confirm all information shared by me is accurate.',
      hindi: 'मैं पुष्टि करता हूं कि मेरे द्वारा साझा की गई सभी जानकारी सटीक है।',
      malayalam: 'ഞാൻ പങ്കിട്ട എല്ലാ വിവരങ്ങളും കൃത്യമാണെന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു.',
      tamil: 'நான் பகிர்ந்த அனைத்து தகவல்களும் துல்லியமானவை என்பதை உறுதிப்படுத்துகிறேன்.',
    },
    statement2: {
      english: 'I understand this is a life insurance policy and not a fixed deposit, loan or a bank-linked product.',
      hindi: 'मैं समझता हूं कि यह जीवन बीमा पॉलिसी है और फिक्स्ड डिपॉजिट, ऋण या बैंक से जुड़ा उत्पाद नहीं है।',
      malayalam: 'ഇത് ഒരു ജീവിത ഇൻഷുറൻസ് പോളിസിയാണെന്നും ഫിക്സഡ് ഡെപ്പോസിറ്റ്, വായ്പ അല്ലെങ്കിൽ ബാങ്ക്-ലിങ്ക് ചെയ്ത ഉൽപ്പന്നമല്ലെന്നും ഞാൻ മനസ്സിലാക്കുന്നു.',
      tamil: 'இது ஒரு ஆயுள் காப்பீட்டுக் கொள்கை என்றும், நிலையான வைப்புத்தொகை, கடன் அல்லது வங்கி இணைக்கப்பட்ட தயாரிப்பு அல்ல என்றும் நான் புரிந்துகொள்கிறேன்.',
    },
    recordingInProgress: {
      english: 'Recording in progress...',
      hindi: 'रिकॉर्डिंग जारी है...',
      malayalam: 'റെക്കോർഡിംഗ് നടക്കുന്നു...',
      tamil: 'பதிவு செய்யப்படுகிறது...',
    },
    needHelp: {
      english: 'Need Help',
      hindi: 'मदद चाहिए',
      malayalam: 'സഹായം വേണോ',
      tamil: 'உதவி தேவையா',
    },
    iAgree: {
      english: 'I Agree',
      hindi: 'मैं सहमत हूं',
      malayalam: 'ഞാൻ സമ്മതിക്കുന്നു',
      tamil: 'நான் ஒப்புக்கொள்கிறேன்',
    },
    iDisagree: {
      english: 'I Disagree',
      hindi: 'मैं असहमत हूं',
      malayalam: 'ഞാൻ വിയോജിക്കുന്നു',
      tamil: 'நான் ஏற்கவில்லை',
    },
  },
};
