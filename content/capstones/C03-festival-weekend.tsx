// Capstone C03 — "A festival weekend at home"
// Core tier. Cultural specificity + multi-character narrative (Diwali).
// Integrates L2-09 events, L2-02 rooms/chores, L2-03 food, L1-04 clothing, L1-03 family.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C03-festival-weekend',
  order: 3,
  tier: 'core',
  isMockExam: false,
  themeGroup: 'Identity',
  heroMotif: 'diya',
  titleHindi: 'हमारे घर की दीवाली',
  titleEnglish: 'A festival weekend at home',
  hook: 'Festivals carry their own vocabulary. This capstone lets every word land where it belongs.',
  promptHindi:
    'किसी ऐसे त्योहार के बारे में लिखो जो तुमने घर पर मनाया। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about a festival you celebrated at home. Use three cohesive paragraphs.',
  whyThisCapstone:
    'The festival essay is the shortest path to a high Topic-Coverage score. Cultural detail (diyas, rangoli, specific sweets) and multi-character narrative (every festival has mother, father, sibling, a visiting relative) are naturally available. A student who lands this one brings a specificity to their writing that Wikipedia-summary essays cannot match — and raters reward exactly that.',
  draws: [
    { packId: 'L2-09-special-events', contributes: 'vocabulary', note: 'Festival vocabulary: दीपावली, दीया, रंगोली, पटाखे, मिठाई.' },
    { packId: 'L2-02-rooms-chores', contributes: 'structure', note: 'Preparation-at-home verbs: सजाना, साफ़ करना, रंगना.' },
    { packId: 'L2-03-food', contributes: 'cultural', note: 'Festive dishes — गुजिया, लड्डू, खीर, चिवड़ा — and the language around making them.' },
    { packId: 'L1-04-clothing-colors', contributes: 'vocabulary', note: 'New-clothes vocabulary: साड़ी, कुर्ता, लाल, सुनहरा, नीला.' },
    { packId: 'L1-03-family', contributes: 'structure', note: 'Multi-character scenes require secure family vocabulary and kinship terms.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'मेरे परिवार का सबसे बड़ा त्योहार दीवाली है। दीवाली से पहले हम घर की सफ़ाई करते हैं। फिर हम दुकान से नए कपड़े खरीदते हैं। दीवाली के दिन मेरी माँ रंगोली बनाती हैं। शाम को हम दीये जलाते हैं। घर बहुत सुंदर दिखता है। मेरी दादी लड्डू और गुजिया बनाती हैं। हम सब मिलकर खाते हैं। कुछ दोस्त भी आते हैं। मुझे दीवाली बहुत पसंद है क्योंकि सब खुश होते हैं। अगले साल भी हम इसी तरह मनाएँगे।',
      transliteration:
        'mere parivaar kaa sabse badaa tyohaar deevaali hai. deevaali se pahle ham ghar ki safaayi karte hain. phir ham dukaan se naye kapde khareedte hain. deevaali ke din meri maan rangoli banaati hain. shaam ko ham deeye jalaate hain. ghar bahut sundar dikhtaa hai. meri daadi laddu aur gujiyaa banaati hain. ham sab milkar khaate hain. kuchh dost bhi aate hain. mujhe deevaali bahut pasand hai kyonki sab khush hote hain. agle saal bhi ham isi tarah manaayenge.',
      english:
        "My family's biggest festival is Diwali. Before Diwali we clean the house. Then we buy new clothes from the shop. On Diwali day my mom makes rangoli. In the evening we light diyas. The house looks very beautiful. My grandmother makes laddus and gujiyas. We all eat together. Some friends also come. I like Diwali a lot because everyone is happy. Next year too we will celebrate the same way.",
      wordCount: 128,
      tensesUsed: ['present', 'future'],
      connectorsUsed: ['phir', 'kyonki'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'हमारे घर का सबसे बड़ा त्योहार दीवाली है, और पिछले साल की दीवाली मुझे ख़ास तौर पर याद है। त्योहार से एक हफ़्ता पहले हमने घर की सफ़ाई शुरू कर दी थी — पुरानी किताबें अलमारी से निकालीं, पर्दे बदले, और आँगन को साफ़ किया। मेरी माँ कहती हैं कि दीवाली दिल की सफ़ाई है, बाहर की नहीं, लेकिन बाहर से शुरुआत आसान होती है।\n\nत्योहार के दिन सुबह से ही घर में रौनक थी। मेरी दादी रसोई में लड्डू और गुजिया बना रही थीं, पापा और भाई ने बाहर रंगोली के लिए रंग मिलाए, और मैंने माँ के साथ दीये साफ़ किए। शाम को जब पहला दीया जला, तब सारे घर में रोशनी फैल गई। पड़ोसी भी मिठाई लेकर आए, और हम सब मिलकर आँगन में पटाखे जलाए। हालाँकि धुएँ से आँखें चुभ रही थीं, किसी को शिकायत नहीं थी।\n\nमुझे लगता है कि दीवाली सिर्फ़ दीयों का त्योहार नहीं है, बल्कि उन लोगों का त्योहार है जो एक साथ हैं। इसलिए अगले साल भी हम इसी तरह मनाएँगे — पुरानी मिठाइयाँ, नए कपड़े, और पूरा परिवार एक छत के नीचे।',
      transliteration:
        'hamaare ghar kaa sabse badaa tyohaar deevaali hai, aur pichhle saal ki deevaali mujhe khaas taur par yaad hai. tyohaar se ek haftaa pahle hamne ghar ki safaayi shuru kar di thi — puraani kitaaben almaari se nikaaleen, parde badle, aur aangan ko saaf kiyaa. meri maan kahti hain ki deevaali dil ki safaayi hai, baahar ki nahin, lekin baahar se shuruaat aasaan hoti hai.\n\ntyohaar ke din subah se hi ghar mein raunak thi. meri daadi rasoi mein laddu aur gujiyaa banaa rahi thin, paapaa aur bhaai ne baahar rangoli ke liye rang milaaye, aur maine maan ke saath deeye saaf kiye. shaam ko jab pahlaa deeyaa jalaa, tab saare ghar mein roshni phail gayi. padosi bhi mithaayi lekar aaye, aur ham sab milkar aangan mein patakhe jalaaye. haalaanki dhuen se aankhen chubh rahi thin, kisi ko shikaayat nahin thi.\n\nmujhe lagtaa hai ki deevaali sirf deeyon kaa tyohaar nahin hai, balki un logon kaa tyohaar hai jo ek saath hain. isliye agle saal bhi ham isi tarah manaayenge — puraani mithaaiyaan, naye kapde, aur pooraa parivaar ek chhat ke neeche.',
      english:
        "Our family's biggest festival is Diwali, and last year's Diwali I remember especially. A week before the festival we had started cleaning the house — old books out of the cupboard, new curtains, the courtyard swept. My mother says Diwali is cleaning of the heart, not the outside — but starting from the outside is easier.\n\nFrom the morning of the festival day the house was buzzing. My grandmother was making laddus and gujiyas in the kitchen, dad and my brother mixed colors for rangoli outside, and I cleaned diyas with mom. In the evening, when the first diya was lit, light spread through the whole house. Neighbors came with sweets, and we all lit firecrackers together in the courtyard. Although the smoke was stinging our eyes, no one complained.\n\nI think Diwali is not just a festival of lamps, but a festival of the people who are together. So next year too we will celebrate the same way — old sweets, new clothes, and the whole family under one roof.",
      wordCount: 246,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['lekin', 'jabTab', 'halaanki', 'kyonki', 'mujheLagta', 'sirfNahiBalki', 'isliye'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'हमारे घर का सबसे बड़ा त्योहार दीवाली है, और पिछले साल की दीवाली मुझे ख़ास तौर पर हमेशा याद रहेगी। त्योहार से पूरे एक हफ़्ता पहले हमने घर की सफ़ाई शुरू कर दी थी — पुरानी किताबें अलमारी से निकालीं, पुराने पर्दे बदले, और आँगन को बहुत ध्यान से साफ़ किया। मेरी माँ अक्सर कहती हैं कि दीवाली असली में दिल की सफ़ाई का त्योहार है, बाहर की नहीं; लेकिन सच यह है कि बाहर से शुरुआत करना आसान होता है, और धीरे-धीरे अंदर भी हल्कापन आ जाता है।\n\nत्योहार के दिन सुबह से ही घर में एक अलग ही रौनक थी। मेरी दादी रसोई में लड्डू और गुजिया बना रही थीं, पापा और छोटा भाई बाहर रंगोली के लिए रंग मिला रहे थे, और मैंने माँ के साथ बैठकर दीये साफ़ किए। शाम को जब पहला दीया जला, तब सारे घर में एक सुनहरी रोशनी फैल गई। पड़ोसी भी घर की बनी मिठाई लेकर आए, और हम सब मिलकर आँगन में पटाखे जलाए। हालाँकि धुएँ से आँखें चुभ रही थीं, किसी को शिकायत नहीं थी — शायद इसलिए कि वह धुआँ सिर्फ़ पटाखों का नहीं, बल्कि साल भर की थकान का भी था।\n\nमेरा मानना है कि दीवाली सिर्फ़ दीयों का त्योहार नहीं है, बल्कि उन लोगों का त्योहार है जो, सब कुछ छोड़कर, एक दिन एक छत के नीचे आते हैं। अगर हम इसे हर साल इसी तरह मना पाएँ, तो मुझे लगता है कि यही हमारी सबसे बड़ी परंपरा होगी। इसलिए अगले साल भी हम इसी तरह मनाएँगे — पुरानी मिठाइयाँ, नए कपड़े, और पूरा परिवार एक साथ।',
      transliteration:
        'hamaare ghar kaa sabse badaa tyohaar deevaali hai, aur pichhle saal ki deevaali mujhe khaas taur par hameshaa yaad rahegi. tyohaar se poore ek haftaa pahle hamne ghar ki safaayi shuru kar di thi — puraani kitaaben almaari se nikaaleen, puraane parde badle, aur aangan ko bahut dhyaan se saaf kiyaa. meri maan aksar kahti hain ki deevaali asli mein dil ki safaayi kaa tyohaar hai, baahar ki nahin; lekin sach yah hai ki baahar se shuruaat karnaa aasaan hotaa hai, aur dheere-dheere andar bhi halkaapan aa jaataa hai.\n\ntyohaar ke din subah se hi ghar mein ek alag hi raunak thi. meri daadi rasoi mein laddu aur gujiyaa banaa rahi thin, paapaa aur chhotaa bhaai baahar rangoli ke liye rang milaa rahe the, aur maine maan ke saath baithkar deeye saaf kiye. shaam ko jab pahlaa deeyaa jalaa, tab saare ghar mein ek sunahri roshni phail gayi. padosi bhi ghar ki bani mithaayi lekar aaye, aur ham sab milkar aangan mein patakhe jalaaye. haalaanki dhuen se aankhen chubh rahi thin, kisi ko shikaayat nahin thi — shaayad isliye ki vah dhuaan sirf patakhon kaa nahin, balki saal bhar ki thakaan kaa bhi thaa.\n\nmeraa maannaa hai ki deevaali sirf deeyon kaa tyohaar nahin hai, balki un logon kaa tyohaar hai jo, sab kuchh chhodkar, ek din ek chhat ke neeche aate hain. agar ham ise har saal isi tarah manaa paayen, to mujhe lagtaa hai ki yahi hamaari sabse badi parampara hogi. isliye agle saal bhi ham isi tarah manaayenge — puraani mithaaiyaan, naye kapde, aur pooraa parivaar ek saath.',
      english:
        "Our family's biggest festival is Diwali, and last year's Diwali I will always remember especially. A full week before the festival we had started cleaning the house — old books out of the cupboard, old curtains changed, the courtyard cleaned with great care. My mother often says Diwali is truly the festival of cleaning the heart, not the outside; but the truth is, starting from the outside is easier, and slowly a lightness comes inside too.\n\nFrom the morning of the festival day there was a distinct buzz in the house. My grandmother was making laddus and gujiyas in the kitchen, dad and my little brother were mixing colors for rangoli outside, and I sat with mom cleaning diyas. In the evening, when the first diya was lit, a golden light spread through the whole house. Neighbors came bringing home-made sweets, and we all lit firecrackers together in the courtyard. Although the smoke was stinging our eyes, no one complained — perhaps because that smoke was not only from the firecrackers, but also from a whole year's worth of exhaustion.\n\nI believe Diwali is not just a festival of lamps, but a festival of the people who, leaving everything, come together under one roof for a day. If we can celebrate it this way every year, I think that would be our greatest tradition. So next year too we will celebrate the same way — old sweets, new clothes, and the whole family together.",
      wordCount: 335,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['lekin', 'jabTab', 'halaanki', 'kyonki', 'mujheLagta', 'sirfNahiBalki', 'isliye', 'agarTo', 'meraManna'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'structure', highlight: 'पिछले साल की दीवाली मुझे ख़ास तौर पर याद है', note: 'Specific past anchor ("last year\'s Diwali") transforms a generic topic into a narrative. Text-Type jump.' },
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'हमने घर की सफ़ाई शुरू कर दी थी', note: 'Past perfect — a Language-Control signal above simple past. Rater notices.' },
    { paragraphIndex: 0, kind: 'cultural', highlight: 'दीवाली दिल की सफ़ाई है, बाहर की नहीं', note: 'Quoted wisdom from mom. Cultural voicing earns Topic-Coverage marks.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'लेकिन बाहर से शुरुआत आसान होती है', note: 'लेकिन concession — holds two competing ideas in one sentence.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'दादी रसोई में ... पापा और भाई ने ... मैंने माँ के साथ', note: 'Three-character parallel construction. Shows the student can manage multiple agents in one paragraph — a B5 marker.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'जब पहला दीया जला, तब सारे घर में रोशनी फैल गई', note: 'जब...तब dependent clause — classic Intermediate-Mid discriminator.' },
    { paragraphIndex: 1, kind: 'vocab', highlight: 'लड्डू ... गुजिया ... रंगोली ... पटाखे ... दीये', note: 'Five festival-specific nouns. Topic-Coverage axis: strong signal.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि धुएँ से आँखें चुभ रही थीं', note: 'हालाँकि concession + past continuous — two IM markers in one clause.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ दीयों का त्योहार नहीं, बल्कि ... का त्योहार', note: 'Correlative "not only X but Y" — raises register considerably.' },
    { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल भी हम इसी तरह मनाएँगे', note: 'Future closer — essay now spans past, present, and future. Benchmark-5 threshold crossed.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'इसलिए अगले साल', note: 'इसलिए ties the closing future intention to the present-tense thesis — cohesion signal.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three cohesive paragraphs: preparation (past) → the festival day (past-vivid) → reflection + next year (present + future). Text-Type at Benchmark 5.',
      'Three tenses correctly used — past (शुरू कर दी थी, जलाए), present (कहती हैं, मुझे लगता है), future (मनाएँगे). Language Control as the rubric describes it.',
      'Seven connectors (लेकिन, जब...तब, हालाँकि, क्योंकि, सिर्फ़...बल्कि, इसलिए, मुझे लगता है कि). Sentences cannot be rearranged — the IM test.',
      'Topic coverage exceptional: festival-specific vocabulary, multi-character scene, family roles, cultural detail (dil ki safai). Rater awards both concreteness and voice.',
      'The "सिर्फ़...बल्कि" correlative in the closing paragraph lifts the register into Benchmark-6 territory on language control.',
    ],
    gotchas: [
      'रंगोली बनाना vs. रंगोली लगाना — prefer बनाना; लगाना reads wrong.',
      'पटाखे जलाए should stay in past; switching mid-sentence to जलाते हैं breaks Language Control.',
      'The mother\'s quoted wisdom must keep कहती हैं in present to show it\'s a habitual saying, not a one-time comment.',
    ],
  },
  readerQuestions: [
    { q: 'दीवाली से पहले परिवार ने क्या-क्या किया?', a: 'घर की सफ़ाई की, पुरानी किताबें निकालीं, पर्दे बदले, और आँगन को साफ़ किया।' },
    { q: 'दादी ने रसोई में क्या बनाया?', a: 'दादी ने लड्डू और गुजिया बनाईं।' },
    { q: 'पहला दीया जलने पर क्या हुआ?', a: 'सारे घर में रोशनी फैल गई।' },
    { q: 'पड़ोसी क्या लेकर आए?', a: 'पड़ोसी मिठाई लेकर आए।' },
    { q: 'लेखिका के अनुसार दीवाली किन का त्योहार है?', a: 'उन लोगों का त्योहार जो एक साथ हैं।' },
  ],
  teacherNote: {
    why:
      'C03 trains cultural specificity — the single cheapest way to raise a Topic-Coverage score. Five festival-specific nouns, three-character parallel construction, and one quoted-wisdom beat give the rater every marker they need. Use this capstone to show the student that cultural detail is not a distraction from Hindi learning; it IS the Hindi content.',
    trains: ['TopicCoverage', 'TextType', 'LanguageControl'],
    examLink:
      'STAMP Topic Coverage axis — "vocabulary specific to the theme" and "concrete details, not generic words". Benchmark 5.',
  },
  status: 'shipped',
  version: 1,
};
