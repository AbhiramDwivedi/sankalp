// Capstone C09 — "My future self in ten years"
// Push tier. Future-tense sustained + hypotheticals.
// Integrates L3-03 future, L1-03 family, L2-01 home, L1-10 places.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C09-ten-years-from-now',
  order: 9,
  tier: 'push',
  isMockExam: false,
  themeGroup: 'HumanIngenuity',
  heroMotif: 'sunrise',
  titleHindi: 'दस साल बाद का मैं',
  titleEnglish: 'My future self in ten years',
  hook: 'Sustained future tense is the rarest strength. This capstone makes it natural — imagining a life, one paragraph at a time.',
  promptHindi:
    'आज से दस साल बाद अपने जीवन के बारे में लिखो। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about your life ten years from today. Use three cohesive paragraphs.',
  whyThisCapstone:
    'Most student essays treat future tense as one or two sentences at the close. C09 inverts that — the future IS the essay. Holding future-tense constructions across three paragraphs, while layering hypotheticals and a reflective present, shows the rater the full Language-Control range that Benchmark 5+ demands.',
  draws: [
    { packId: 'L3-03-my-future', contributes: 'vocabulary', note: 'Career and aspiration vocabulary: पेशा, सपना, लक्ष्य, सफलता.' },
    { packId: 'L1-03-family', contributes: 'structure', note: 'Family in the future: partner, children, parents aging.' },
    { packId: 'L2-01-daily-routine', contributes: 'structure', note: 'Projecting a daily routine into the future is the easiest way to fill paragraph 2.' },
    { packId: 'L1-10-places-transport', contributes: 'vocabulary', note: 'Where the future-self lives anchors the essay in a specific setting.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'दस साल बाद मैं बाईस साल की होऊँगी। शायद मैं कॉलेज ख़त्म कर चुकूँगी। मैं एक डॉक्टर बनना चाहती हूँ। मेरा अपना घर होगा। मैं एक बड़े शहर में रहूँगी। मेरे पास एक छोटी कार होगी। मेरे माता-पिता मेरे साथ रहेंगे। मैं उनका ध्यान रखूँगी। मुझे लगता है कि भविष्य अच्छा होगा। मैं मेहनत से काम करूँगी और हर सपना पूरा करूँगी।',
      transliteration:
        'das saal baad main baayees saal ki hoongi. shaayad main kolej khatm kar chukoongi. main ek doctor bannaa chaahti hoon. meraa apnaa ghar hogaa. main ek bade shahar mein rahoongi. mere paas ek chhoti kaar hogi. mere maataa-pitaa mere saath rahenge. main unkaa dhyaan rakhoongi. mujhe lagtaa hai ki bhavishya achhaa hogaa. main mehnat se kaam karoongi aur har sapnaa pooraa karoongi.',
      english:
        "Ten years from now I will be twenty-two years old. Maybe I will have finished college. I want to become a doctor. I will have my own house. I will live in a big city. I will have a small car. My parents will live with me. I will take care of them. I think the future will be good. I will work hard and make every dream come true.",
      wordCount: 120,
      tensesUsed: ['future', 'present'],
      connectorsUsed: ['kyonki'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'जब मैं दस साल बाद बाईस साल की हो जाऊँगी, तब मेरी ज़िंदगी बिलकुल अलग दिखेगी। मुझे लगता है कि मैं उस समय तक मेडिकल स्कूल ख़त्म कर चुकी हूँगी, और शायद किसी बड़े शहर के अस्पताल में काम कर रही हूँगी। मेरा सपना बच्चों की डॉक्टर बनने का है — क्योंकि मुझे हमेशा से लगता रहा है कि इस पेशे में इंसानियत और विज्ञान दोनों साथ-साथ चलते हैं।\n\nमेरी रोज़मर्रा ज़िंदगी एक संतुलन पर टिकी होगी। सुबह जल्दी उठकर मैं अस्पताल जाऊँगी, दोपहर में छोटे बच्चों के साथ समय बिताऊँगी, और शाम को अपने माता-पिता के साथ घर पर खाना खाऊँगी। हालाँकि काम बहुत होगा, मैं कोशिश करूँगी कि परिवार के लिए समय निकलता रहे। मेरा एक छोटा-सा घर होगा, जिसमें एक बगीचा हो और एक कमरा सिर्फ़ किताबों के लिए।\n\nमेरा मानना है कि भविष्य सिर्फ़ योजना बनाने से नहीं बनता, बल्कि हर दिन की छोटी-छोटी मेहनत से बनता है। अगर मैं आज अपनी पढ़ाई और अपनी सेहत दोनों का ध्यान रखूँ, तो दस साल बाद वाली मैं आज की मुझे शुक्रिया कहेगी — और मुझे लगता है कि यही भविष्य की सबसे सुंदर परिभाषा है।',
      transliteration:
        'jab main das saal baad baayees saal ki ho jaaoongi, tab meri zindagi bilkul alag dikhegi. mujhe lagtaa hai ki main us samay tak medikal skool khatm kar chuki hoongi, aur shaayad kisi bade shahar ke aspataal mein kaam kar rahi hoongi. meraa sapnaa bachchon ki doctor banne kaa hai — kyonki mujhe hameshaa se lagtaa rahaa hai ki is peshe mein insaaniyat aur vigyaan donon saath-saath chalte hain.\n\nmeri rozmarraa zindagi ek santulan par tiki hogi. subah jaldi uthkar main aspataal jaaoongi, dopahar mein chhote bachchon ke saath samay bitaaoongi, aur shaam ko apne maataa-pitaa ke saath ghar par khaanaa khaaoongi. haalaanki kaam bahut hogaa, main koshish karoongi ki parivaar ke liye samay niklataa rahe. meraa ek chhotaa-saa ghar hogaa, jismein ek bageechaa ho aur ek kamraa sirf kitaabon ke liye.\n\nmeraa maannaa hai ki bhavishya sirf yojanaa banaane se nahin bantaa, balki har din ki chhoti-chhoti mehnat se bantaa hai. agar main aaj apni padhaayi aur apni sehat donon kaa dhyaan rakhoon, to das saal baad vaali main aaj ki mujhe shukriyaa kahegi — aur mujhe lagtaa hai ki yahi bhavishya ki sabse sundar paribhaashaa hai.',
      english:
        "When I turn twenty-two ten years from now, my life will look completely different. I think that by that time I will have finished medical school, and maybe I will be working at a hospital in some big city. My dream is to become a children's doctor — because it has always seemed to me that in this profession humanity and science walk side by side.\n\nMy daily life will rest on a balance. I will wake up early and go to the hospital, spend time with small children in the afternoon, and eat dinner with my parents at home in the evening. Although the work will be a lot, I will try to keep making time for family. I will have a small house, with a garden and one room just for books.\n\nI believe the future is not built only by making plans, but by small daily efforts. If I take care of both my studies and my health today, then ten years from now that version of me will say thank you to this me — and I think that is the most beautiful definition of a future.",
      wordCount: 254,
      tensesUsed: ['future', 'present', 'past'],
      connectorsUsed: ['jabTab', 'kyonki', 'halaanki', 'meraManna', 'sirfNahiBalki', 'agarTo'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'जब मैं आज से दस साल बाद बाईस साल की हो जाऊँगी, तब मेरी ज़िंदगी आज की ज़िंदगी से बिलकुल अलग दिखेगी — पर शायद मेरी आज की सोच उस ज़िंदगी की पहली नींव है। मुझे लगता है कि मैं उस समय तक मेडिकल स्कूल ख़त्म कर चुकी हूँगी, और शायद किसी बड़े शहर के अस्पताल में बच्चों की डॉक्टर बनकर काम कर रही हूँगी। मेरा यह सपना नया नहीं है — क्योंकि मुझे हमेशा से लगता रहा है कि इस पेशे में इंसानियत और विज्ञान, दोनों साथ-साथ चलते हैं, और ऐसा संतुलन बहुत कम पेशों में मिलता है।\n\nमेरी रोज़मर्रा ज़िंदगी एक संवेदनशील संतुलन पर टिकी होगी। हर सुबह जल्दी उठकर मैं अस्पताल जाऊँगी, दोपहर में छोटे बच्चों के साथ उनकी छोटी-बड़ी तकलीफ़ें सुनूँगी, और शाम को अपने माता-पिता के साथ घर पर बैठकर खाना खाऊँगी। हालाँकि काम बहुत होगा, मैं हमेशा कोशिश करूँगी कि परिवार के लिए समय निकलता रहे — क्योंकि मेरी दादी अक्सर कहती हैं कि सफलता वह नहीं जिसे ट्रॉफ़ी मिले, बल्कि वह जिसे परिवार के पास लौटकर आराम मिले। मेरा एक छोटा-सा घर होगा, जिसमें एक बगीचा हो, एक कमरा सिर्फ़ किताबों के लिए, और एक खिड़की जिसमें से सुबह की पहली रोशनी आती हो।\n\nमेरा मानना है कि भविष्य सिर्फ़ बड़ी योजनाओं से नहीं बनता, बल्कि हर दिन की छोटी-छोटी मेहनत और चुनावों से बनता है। अगर मैं आज अपनी पढ़ाई, अपनी सेहत, और अपने रिश्तों — तीनों का ध्यान रखूँ, तो दस साल बाद वाली मैं आज की मुझे शुक्रिया कहेगी; और शायद यही भविष्य की सबसे सुंदर परिभाषा है — कि कल का आप आज के आप से नाराज़ न हो।',
      transliteration:
        'jab main aaj se das saal baad baayees saal ki ho jaaoongi, tab meri zindagi aaj ki zindagi se bilkul alag dikhegi — par shaayad meri aaj ki soch us zindagi ki pahli neenv hai. mujhe lagtaa hai ki main us samay tak medikal skool khatm kar chuki hoongi, aur shaayad kisi bade shahar ke aspataal mein bachchon ki doctor bankar kaam kar rahi hoongi. meraa yah sapnaa nayaa nahin hai — kyonki mujhe hameshaa se lagtaa rahaa hai ki is peshe mein insaaniyat aur vigyaan, donon saath-saath chalte hain, aur aisaa santulan bahut kam peshon mein miltaa hai.\n\nmeri rozmarraa zindagi ek samvedansheel santulan par tiki hogi. har subah jaldi uthkar main aspataal jaaoongi, dopahar mein chhote bachchon ke saath unki chhoti-badi takleefen sunoongi, aur shaam ko apne maataa-pitaa ke saath ghar par baithkar khaanaa khaaoongi. haalaanki kaam bahut hogaa, main hameshaa koshish karoongi ki parivaar ke liye samay niklataa rahe — kyonki meri daadi aksar kahti hain ki safaltaa vah nahin jise trofi mile, balki vah jise parivaar ke paas lautkar aaraam mile. meraa ek chhotaa-saa ghar hogaa, jismein ek bageechaa ho, ek kamraa sirf kitaabon ke liye, aur ek khidki jismein se subah ki pahli roshni aati ho.\n\nmeraa maannaa hai ki bhavishya sirf badi yojanaaon se nahin bantaa, balki har din ki chhoti-chhoti mehnat aur chunaavon se bantaa hai. agar main aaj apni padhaayi, apni sehat, aur apne rishton — teenon kaa dhyaan rakhoon, to das saal baad vaali main aaj ki mujhe shukriyaa kahegi; aur shaayad yahi bhavishya ki sabse sundar paribhaashaa hai — ki kal kaa aap aaj ke aap se naaraaz na ho.',
      english:
        "When I turn twenty-two ten years from now, my life will look completely different from today's — but perhaps my thinking today is the first foundation of that life. I think that by that time I will have finished medical school, and maybe I will be working in some big city's hospital as a children's doctor. This dream isn't new — because it has always seemed to me that in this profession humanity and science walk side by side, and such a balance is found in very few careers.\n\nMy daily life will rest on a sensitive balance. Every morning I will wake up early and go to the hospital, spend my afternoons listening to the small and large troubles of small children, and in the evening sit at home with my parents for dinner. Although there will be a lot of work, I will always try to keep making time for family — because my grandmother often says that success is not what gets a trophy, but what finds rest when it returns home to family. I will have a small house, with a garden, one room just for books, and a window through which the morning's first light comes.\n\nI believe the future is not built only by big plans, but by small daily efforts and choices. If today I take care of my studies, my health, and my relationships — all three — then ten years from now that version of me will say thank you to this me; and perhaps that is the most beautiful definition of a future — that tomorrow's you is not angry with today's you.",
      wordCount: 322,
      tensesUsed: ['future', 'present', 'past'],
      connectorsUsed: ['jabTab', 'kyonki', 'halaanki', 'meraManna', 'sirfNahiBalki', 'agarTo', 'phir'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'connector', highlight: 'जब मैं दस साल बाद ... हो जाऊँगी, तब', note: 'जब...तब in the future tense — one of the hardest Hindi constructions to hold without slipping.' },
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'मैं मेडिकल स्कूल ख़त्म कर चुकी हूँगी', note: 'Future perfect — a Benchmark-6 language-control marker that few IM essays attempt.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि मुझे हमेशा से लगता रहा है', note: 'Cause clause in present-perfect-habitual — blends two time frames in one clause.' },
    { paragraphIndex: 0, kind: 'structure', highlight: 'इंसानियत और विज्ञान दोनों साथ-साथ चलते हैं', note: 'Abstract nouns + parallelism. Register lift.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'सुबह ... दोपहर में ... शाम को', note: 'Three time markers in future tense — the hardest part: holding future across a full paragraph.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि काम बहुत होगा, मैं कोशिश करूँगी', note: 'हालाँकि concession across two future verbs. B6 signal.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'एक बगीचा ... एक कमरा सिर्फ़ किताबों के लिए', note: 'Specific future detail. Concreteness beats abstraction even in an imagined essay.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'भविष्य सिर्फ़ योजना बनाने से नहीं बनता, बल्कि', note: 'Correlative thesis — opinion register. Benchmark-6 closer.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'अगर मैं आज ... तो दस साल बाद वाली मैं', note: 'Conditional across two time frames — present + future in one sentence.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'दस साल बाद वाली मैं आज की मुझे शुक्रिया कहेगी', note: 'Personification of future-self. Voice signal beyond IM baseline.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Future tense held across three paragraphs — the hardest single control test in Hindi. Language Control at Benchmark 5–6.',
      'Future perfect (कर चुकी हूँगी) and future continuous (कर रही हूँगी) both appear — rare even for strong IM writers.',
      'Six connectors including concession (हालाँकि), cause (क्योंकि), conditional (अगर...तो), correlative (सिर्फ़...बल्कि). Sentences cannot be rearranged.',
      'The "future-self says thank you to today-self" personification is a voice signal that rubric readers specifically note.',
      'Concrete future detail (a garden, a book-room, a morning-light window) keeps the essay anchored — not a blur of aspirations.',
    ],
    gotchas: [
      'Feminine first-person future (हूँगी, जाऊँगी, रखूँगी) is easy to slip into masculine. Check every verb.',
      'Future perfect (कर चुकी हूँगी) requires the feminine past participle + हूँगी, not हूँगा.',
      'If the student drops the conditional (अगर आज...तो दस साल बाद) the essay loses its most distinctive B6 construction.',
    ],
  },
  readerQuestions: [
    { q: 'दस साल बाद लेखिका कितने साल की होगी?', a: 'बाईस साल की।' },
    { q: 'वह क्या बनना चाहती है?', a: 'बच्चों की डॉक्टर।' },
    { q: 'उसके सपने में उसका घर कैसा होगा?', a: 'एक छोटा-सा घर जिसमें एक बगीचा, एक किताबों का कमरा, और एक रोशनी वाली खिड़की होगी।' },
    { q: 'लेखिका के अनुसार भविष्य कैसे बनता है?', a: 'सिर्फ़ योजना बनाने से नहीं, बल्कि हर दिन की छोटी-छोटी मेहनत से।' },
    { q: 'दस साल बाद वाली मैं आज की मुझे क्या कहेगी?', a: 'शुक्रिया।' },
  ],
  teacherNote: {
    why:
      'C09 is the future-tense stress test. A student who sustains future tense across three paragraphs — including future perfect — is demonstrating Language Control at the very top of Benchmark 5. Pair with C10 for timed Mock Exam practice in the final week of any study plan.',
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    examLink:
      'STAMP rubric — "control of past, present, and future time frames" + "some emerging complex structures" → Benchmark 6.',
  },
  status: 'shipped',
  version: 1,
};
