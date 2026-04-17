// Master Hindi connector bank. Packs cite these by key; the ConnectorBank
// component renders the full definition. Keeping connectors centralized keeps
// transliteration and frames consistent across 26 packs.

import type { ConnectorEntry } from './schema';

export const CONNECTORS: Record<string, ConnectorEntry> = {
  pahle: {
    hindi: 'पहले',
    transliteration: 'pahle',
    english: 'first / at first',
    frame: 'पहले मैं ___ करता हूँ।',
    sampleHindi: 'पहले मैं नाश्ता करता हूँ।',
    sampleEnglish: 'First, I have breakfast.',
  },
  phir: {
    hindi: 'फिर',
    transliteration: 'phir',
    english: 'then / next',
    frame: 'फिर मैं ___ जाता हूँ।',
    sampleHindi: 'फिर मैं स्कूल जाता हूँ।',
    sampleEnglish: 'Then I go to school.',
  },
  iskeBaad: {
    hindi: 'इसके बाद',
    transliteration: 'iske baad',
    english: 'after this / afterwards',
    frame: 'इसके बाद हम ___ करते हैं।',
    sampleHindi: 'इसके बाद हम खाना खाते हैं।',
    sampleEnglish: 'After this, we eat food.',
  },
  antMein: {
    hindi: 'अंत में',
    transliteration: 'ant mein',
    english: 'in the end / finally',
    frame: 'अंत में मैं ___ करता हूँ।',
    sampleHindi: 'अंत में मैं सो जाता हूँ।',
    sampleEnglish: 'In the end, I go to sleep.',
  },
  kyonki: {
    hindi: 'क्योंकि',
    transliteration: 'kyonki',
    english: 'because',
    frame: '___, क्योंकि ___।',
    sampleHindi: 'मुझे आम पसंद है, क्योंकि वे मीठे होते हैं।',
    sampleEnglish: 'I like mangoes because they are sweet.',
  },
  lekin: {
    hindi: 'लेकिन',
    transliteration: 'lekin',
    english: 'but',
    frame: '___, लेकिन ___।',
    sampleHindi: 'मुझे चाय पसंद है, लेकिन मेरी बहन को कॉफ़ी पसंद है।',
    sampleEnglish: 'I like tea, but my sister likes coffee.',
  },
  isliye: {
    hindi: 'इसलिए',
    transliteration: 'isliye',
    english: 'therefore / so',
    frame: '___, इसलिए ___।',
    sampleHindi: 'बाहर बारिश हो रही है, इसलिए हम घर पर हैं।',
    sampleEnglish: 'It is raining outside, so we are at home.',
  },
  iskeAlawa: {
    hindi: 'इसके अलावा',
    transliteration: 'iske alawa',
    english: 'besides this / moreover',
    frame: 'इसके अलावा, ___।',
    sampleHindi: 'इसके अलावा, मुझे गाना भी पसंद है।',
    sampleEnglish: 'Besides this, I also like singing.',
  },
  jabTab: {
    hindi: 'जब... तब',
    transliteration: 'jab... tab',
    english: 'when... then',
    frame: 'जब ___, तब ___।',
    sampleHindi: 'जब मैं छोटा था, तब मैं गाँव में रहता था।',
    sampleEnglish: 'When I was small, I lived in the village.',
  },
  agarTo: {
    hindi: 'अगर... तो',
    transliteration: 'agar... to',
    english: 'if... then',
    frame: 'अगर ___, तो ___।',
    sampleHindi: 'अगर बारिश होगी, तो हम नहीं जाएँगे।',
    sampleEnglish: 'If it rains, then we will not go.',
  },
  jabki: {
    hindi: 'जबकि',
    transliteration: 'jabki',
    english: 'while / whereas',
    frame: '___, जबकि ___।',
    sampleHindi: 'मेरा भाई खेलता है, जबकि मैं पढ़ती हूँ।',
    sampleEnglish: 'My brother plays, while I study.',
  },
  yaaniKi: {
    hindi: 'यानी कि',
    transliteration: 'yaani ki',
    english: 'that is to say / i.e.',
    frame: '___, यानी कि ___।',
    sampleHindi: 'वह शाकाहारी है, यानी कि वह मांस नहीं खाता।',
    sampleEnglish: 'He is vegetarian, that is to say, he does not eat meat.',
  },
  halaanki: {
    hindi: 'हालाँकि',
    transliteration: 'haalaanki',
    english: 'although / even though',
    frame: 'हालाँकि ___, ___।',
    sampleHindi: 'हालाँकि मुझे थकान थी, मैंने होमवर्क पूरा किया।',
    sampleEnglish: 'Although I was tired, I finished my homework.',
  },
  udaharanKeLiye: {
    hindi: 'उदाहरण के लिए',
    transliteration: 'udaaharan ke liye',
    english: 'for example',
    frame: 'उदाहरण के लिए, ___।',
    sampleHindi: 'मुझे फल पसंद हैं, उदाहरण के लिए सेब और केले।',
    sampleEnglish: 'I like fruits, for example apples and bananas.',
  },
  meraManna: {
    hindi: 'मेरा मानना है कि',
    transliteration: 'mera maanna hai ki',
    english: 'I believe that / in my opinion',
    frame: 'मेरा मानना है कि ___।',
    sampleHindi: 'मेरा मानना है कि शिक्षा सबसे महत्वपूर्ण है।',
    sampleEnglish: 'I believe that education is most important.',
  },
  mujheLagta: {
    hindi: 'मुझे लगता है कि',
    transliteration: 'mujhe lagta hai ki',
    english: 'I think that',
    frame: 'मुझे लगता है कि ___।',
    sampleHindi: 'मुझे लगता है कि यह फ़िल्म अच्छी है।',
    sampleEnglish: 'I think that this movie is good.',
  },
  sirfNahiBalki: {
    hindi: 'सिर्फ़ ___ नहीं, बल्कि ___ भी',
    transliteration: 'sirf ___ nahin, balki ___ bhi',
    english: 'not only ___, but also ___',
    frame: 'सिर्फ़ ___ नहीं, बल्कि ___ भी ___।',
    sampleHindi: 'सिर्फ़ मुझे नहीं, बल्कि मेरी बहन को भी हिंदी पसंद है।',
    sampleEnglish: 'Not only I, but also my sister likes Hindi.',
  },
};

// Convenience: small, medium, and full "starter" connector sets packs can cite.
export const STARTER_CONNECTOR_KEYS = [
  'pahle',
  'phir',
  'iskeBaad',
  'antMein',
  'kyonki',
  'lekin',
];

export const GROWING_CONNECTOR_KEYS = [
  ...STARTER_CONNECTOR_KEYS,
  'isliye',
  'iskeAlawa',
  'jabTab',
  'agarTo',
];

export const IM_PUSH_CONNECTOR_KEYS = [
  ...GROWING_CONNECTOR_KEYS,
  'jabki',
  'halaanki',
  'udaharanKeLiye',
  'meraManna',
  'mujheLagta',
  'sirfNahiBalki',
];

export function pickConnectors(keys: string[]): ConnectorEntry[] {
  return keys.map((k) => {
    const c = CONNECTORS[k];
    if (!c) throw new Error(`Unknown connector key: ${k}`);
    return c;
  });
}
