import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L2-02 · Rooms of the House & Household Chores (घर के कमरे और कार्य)
// FCPS Level 2 Home Life. Position on arc: building. Target = STAMP Benchmark 5.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L2-02-rooms-chores',
  level: 2,
  themeGroup: 'Identity',
  order: 14,
  heroMotif: 'family',
  titleHindi: 'घर के कमरे और कार्य',
  titleEnglish: 'Rooms of the House & Household Chores',
  hook: 'Concrete nouns plus action verbs — high-yield vocabulary for descriptive essays and obligation sentences.',
  heroPrompt: composeHeroPrompt(
    'A cutaway view of a middle-class Indian home with each room labelled by activity — kitchen with steaming pot, living room with a ceiling fan, bedroom with a bed and lamp, balcony with drying laundry, a tulsi plant on the angan',
  ),

  rationale: {
    fcpsSubTopics: [
      'Rooms of the House and Household Chores (FCPS Level 2 — Home Life)',
      'Daily Routines at Home (FCPS Level 2 — Home Life)',
      'Family Roles and Responsibilities (FCPS Level 2 — Home Life)',
    ],
    trains: ['TopicCoverage', 'LanguageControl', 'TextType'],
    afterThisPackStudentCan: [
      'Label every major room of a home in Hindi and describe what happens there',
      'Use four location postpositions (में, पर, के पास, के बीच) without switching cases incorrectly',
      'Express household obligation using the "मुझे ... करना पड़ता है" pattern across three tenses',
      'Compare how chores are divided in their family in a 3-paragraph essay with past, present, and future',
      'Add one culturally specific detail (Diwali सफ़ाई, दादी in the kitchen, shared आँगन) to lift Text-Type',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Home Life prompts (describe your home, how chores are divided, a weekend at home) appear in nearly every FCPS L2 writing set. Without this pack, the student will fall back on thin vocabulary and abstract sentences, capping Topic Coverage at Intermediate-Low.',
  },

  objectives: [
    {
      text: 'Name at least 8 rooms, 6 furniture items, and 4 appliances in Hindi with correct gender.',
      trains: ['TopicCoverage', 'LanguageControl'],
    },
    {
      text: 'Use location postpositions (में, पर, के पास, के बीच) correctly in descriptive sentences.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Express obligation with "मुझे ___ करना पड़ता है" across past, present, and future time frames.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Write a 3-paragraph account of how chores are divided at home using at least four connectors.',
      trains: ['TextType'],
    },
    {
      text: 'Include one cultural specific — Diwali cleaning, a maid/didi, a shared courtyard — to lift Topic Coverage.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Rooms
    { hindi: 'रसोई', transliteration: 'rasoi', english: 'kitchen', exampleHindi: 'माँ रसोई में खाना बनाती हैं।', exampleEnglish: 'Mother cooks in the kitchen.', emoji: '🍳', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'बैठक', transliteration: 'baithak', english: 'living room', exampleHindi: 'हम बैठक में टीवी देखते हैं।', exampleEnglish: 'We watch TV in the living room.', emoji: '🛋️', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'कमरा', transliteration: 'kamra', english: 'room', exampleHindi: 'मेरा कमरा छोटा है, लेकिन साफ़ है।', exampleEnglish: 'My room is small but clean.', emoji: '🚪', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'बेडरूम', transliteration: 'bedroom', english: 'bedroom', exampleHindi: 'बेडरूम में एक बड़ा पलंग है।', exampleEnglish: 'There is a big bed in the bedroom.', emoji: '🛏️', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'बाथरूम', transliteration: 'bathroom', english: 'bathroom', exampleHindi: 'बाथरूम रसोई के पास है।', exampleEnglish: 'The bathroom is near the kitchen.', emoji: '🚿', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'बालकनी', transliteration: 'balcony', english: 'balcony', exampleHindi: 'बालकनी में तुलसी का पौधा है।', exampleEnglish: 'There is a tulsi plant on the balcony.', emoji: '🪴', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'आँगन', transliteration: 'aangan', english: 'courtyard', exampleHindi: 'गर्मियों में हम आँगन में सोते हैं।', exampleEnglish: 'In summers we sleep in the courtyard.', emoji: '🌿', partOfSpeech: 'noun', subgroup: 'Rooms' },
    { hindi: 'छत', transliteration: 'chhat', english: 'roof / terrace', exampleHindi: 'शाम को हम छत पर जाते हैं।', exampleEnglish: 'In the evening we go up to the roof.', emoji: '🏠', partOfSpeech: 'noun', subgroup: 'Rooms' },

    // Furniture
    { hindi: 'पलंग', transliteration: 'palang', english: 'bed', exampleHindi: 'मेरा पलंग खिड़की के पास है।', exampleEnglish: 'My bed is near the window.', emoji: '🛏️', partOfSpeech: 'noun', subgroup: 'Furniture' },
    { hindi: 'कुर्सी', transliteration: 'kursi', english: 'chair', exampleHindi: 'कुर्सी मेज़ के पास रखो।', exampleEnglish: 'Keep the chair near the table.', emoji: '🪑', partOfSpeech: 'noun', subgroup: 'Furniture' },
    { hindi: 'मेज़', transliteration: 'mez', english: 'table', exampleHindi: 'मेज़ पर मेरी किताबें हैं।', exampleEnglish: 'My books are on the table.', emoji: '🪵', partOfSpeech: 'noun', subgroup: 'Furniture' },
    { hindi: 'सोफ़ा', transliteration: 'sofa', english: 'sofa', exampleHindi: 'सोफ़ा बैठक के बीच में है।', exampleEnglish: 'The sofa is in the middle of the living room.', emoji: '🛋️', partOfSpeech: 'noun', subgroup: 'Furniture' },
    { hindi: 'अलमारी', transliteration: 'almaari', english: 'cupboard / wardrobe', exampleHindi: 'अलमारी में मेरे कपड़े हैं।', exampleEnglish: 'My clothes are in the cupboard.', emoji: '🗄️', partOfSpeech: 'noun', subgroup: 'Furniture' },
    { hindi: 'पंखा', transliteration: 'pankha', english: 'fan', exampleHindi: 'छत का पंखा धीरे चल रहा है।', exampleEnglish: 'The ceiling fan is running slowly.', emoji: '💨', partOfSpeech: 'noun', subgroup: 'Furniture' },
    { hindi: 'लैंप', transliteration: 'lamp', english: 'lamp', exampleHindi: 'मेज़ पर एक छोटा लैंप है।', exampleEnglish: 'There is a small lamp on the table.', emoji: '💡', partOfSpeech: 'noun', subgroup: 'Furniture' },

    // Appliances
    { hindi: 'फ़्रिज', transliteration: 'fridge', english: 'fridge', exampleHindi: 'फ़्रिज में दूध और फल हैं।', exampleEnglish: 'There is milk and fruit in the fridge.', emoji: '🧊', partOfSpeech: 'noun', subgroup: 'Appliances' },
    { hindi: 'वॉशिंग मशीन', transliteration: 'washing machine', english: 'washing machine', exampleHindi: 'रविवार को वॉशिंग मशीन में कपड़े धुलते हैं।', exampleEnglish: 'On Sunday the clothes are washed in the machine.', emoji: '🧺', partOfSpeech: 'noun', subgroup: 'Appliances' },
    { hindi: 'माइक्रोवेव', transliteration: 'microwave', english: 'microwave', exampleHindi: 'माइक्रोवेव में खाना जल्दी गरम हो जाता है।', exampleEnglish: 'Food heats up quickly in the microwave.', emoji: '📟', partOfSpeech: 'noun', subgroup: 'Appliances' },
    { hindi: 'टीवी', transliteration: 'TV', english: 'television', exampleHindi: 'हम रात को टीवी पर समाचार देखते हैं।', exampleEnglish: 'At night we watch news on TV.', emoji: '📺', partOfSpeech: 'noun', subgroup: 'Appliances' },

    // Chores (verbs)
    { hindi: 'सफ़ाई करना', transliteration: 'safaai karna', english: 'to clean', exampleHindi: 'शनिवार को मैं अपने कमरे की सफ़ाई करता हूँ।', exampleEnglish: 'On Saturday I clean my room.', emoji: '🧽', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'झाड़ू लगाना', transliteration: 'jhaadoo lagaana', english: 'to sweep', exampleHindi: 'दादी रोज़ सुबह झाड़ू लगाती हैं।', exampleEnglish: 'Grandmother sweeps every morning.', emoji: '🧹', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'बर्तन धोना', transliteration: 'bartan dhona', english: 'to wash dishes', exampleHindi: 'खाने के बाद मैं बर्तन धोता हूँ।', exampleEnglish: 'After eating I wash the dishes.', emoji: '🍽️', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'कपड़े धोना', transliteration: 'kapde dhona', english: 'to wash clothes', exampleHindi: 'माँ रविवार को कपड़े धोती हैं।', exampleEnglish: 'Mother washes clothes on Sunday.', emoji: '👕', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'खाना बनाना', transliteration: 'khaana banaana', english: 'to cook', exampleHindi: 'पिताजी शाम को खाना बनाते हैं।', exampleEnglish: 'Father cooks in the evening.', emoji: '🍲', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'बिस्तर लगाना', transliteration: 'bistar lagaana', english: 'to make the bed', exampleHindi: 'मुझे रोज़ सुबह बिस्तर लगाना पड़ता है।', exampleEnglish: 'I have to make the bed every morning.', emoji: '🛌', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'कचरा फेंकना', transliteration: 'kachra phenkna', english: 'to throw out the trash', exampleHindi: 'मेरा भाई कचरा फेंकता है।', exampleEnglish: 'My brother throws out the trash.', emoji: '🗑️', partOfSpeech: 'verb', subgroup: 'Chores' },
    { hindi: 'पानी भरना', transliteration: 'paani bharna', english: 'to fill water', exampleHindi: 'सुबह-सुबह हमें पानी भरना पड़ता है।', exampleEnglish: 'Early in the morning we have to fill water.', emoji: '🪣', partOfSpeech: 'verb', subgroup: 'Chores' },
  ],
  vocabularyNote: {
    why:
      'These 30 words cover every room, the furniture and appliances you will actually write about, and the six chores FCPS Home Life prompts pull from. Learn them with their gender (रसोई f, कमरा m, मेज़ f, पंखा m) — gender is where students lose Language Control points on this topic.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Location postpositions — में, पर, के पास, के बीच',
      rule:
        'Hindi location words follow the noun (unlike English prepositions). में = in (enclosed space); पर = on (surface); के पास = near; के बीच = between / in the middle of. The noun before में / पर / के पास / के बीच stays in the oblique case (कमरे में, not कमरा में).',
      examples: [
        { hindi: 'मेरी किताबें मेज़ पर हैं।', transliteration: 'meri kitaaben mez par hain.', english: 'My books are on the table.' },
        { hindi: 'पलंग खिड़की के पास है।', transliteration: 'palang khidki ke paas hai.', english: 'The bed is near the window.' },
        { hindi: 'सोफ़ा दो कुर्सियों के बीच में है।', transliteration: 'sofa do kursiyon ke beech mein hai.', english: 'The sofa is between two chairs.' },
        { hindi: 'हम बैठक में टीवी देखते हैं।', transliteration: 'hum baithak mein TV dekhte hain.', english: 'We watch TV in the living room.' },
      ],
      pitfall:
        'Forgetting the oblique (writing "कमरा में" instead of "कमरे में") is the single most common mistake when describing a home. Raters notice it on the first sentence.',
      whyItMatters:
        'Location sentences are the backbone of any "describe your home" essay. If the postpositions are wrong, the whole first paragraph reads as broken — Language Control drops to Low and caps the essay at Intermediate-Low (2 credits).',
    },
    {
      title: 'Obligation with मुझे ... करना पड़ता है',
      rule:
        'To say "I have to do X" (which is the natural frame for chores), use मुझे + noun/object + verb-stem + "ना पड़ता है" (present) / "ना पड़ा" (past) / "ना पड़ेगा" (future). The pronoun takes को (मुझे = मैं + को) because the sentence is literally "to me, doing X falls."',
      examples: [
        { hindi: 'मुझे रोज़ बिस्तर लगाना पड़ता है।', transliteration: 'mujhe roz bistar lagaana padta hai.', english: 'I have to make the bed every day. (present)' },
        { hindi: 'कल मुझे बर्तन धोने पड़े।', transliteration: 'kal mujhe bartan dhone pade.', english: 'Yesterday I had to wash the dishes. (past)' },
        { hindi: 'इस रविवार मुझे पूरे घर की सफ़ाई करनी पड़ेगी।', transliteration: 'is ravivaar mujhe poore ghar ki safaai karni padegi.', english: 'This Sunday I will have to clean the whole house. (future, feminine agreement with सफ़ाई)' },
      ],
      pitfall:
        'Students often write "मैं बिस्तर लगाना पड़ता है" — this is ungrammatical. The subject of पड़ना is the CHORE (the thing falling on you); the person takes को.',
      whyItMatters:
        'One well-formed "पड़ता है / पड़ा / पड़ेगा" sentence per paragraph delivers all three time frames the Intermediate-Mid rubric requires — a reliable shortcut to Benchmark 5.',
    },
    {
      title: 'Dividing chores — मैं ... करता हूँ, मेरा भाई ... करता है',
      rule:
        'When you split chores across family members, use parallel clauses joined by लेकिन or जबकि. Keep the verb tense identical across clauses and make sure each subject gets its own correctly-agreeing verb.',
      examples: [
        { hindi: 'मैं झाड़ू लगाता हूँ, जबकि मेरा भाई कचरा फेंकता है।', transliteration: 'main jhaadoo lagaata hoon, jabki mera bhai kachra phenkta hai.', english: 'I sweep, while my brother throws out the trash.' },
        { hindi: 'माँ खाना बनाती हैं, लेकिन बर्तन मैं धोती हूँ।', transliteration: 'maa khaana banaati hain, lekin bartan main dhoti hoon.', english: 'Mother cooks, but I wash the dishes.' },
        { hindi: 'दिन में कितनी बार मैं पानी भरता हूँ? तीन बार।', transliteration: 'din mein kitni baar main paani bharta hoon? teen baar.', english: 'How many times a day do I fill water? Three times.' },
      ],
      pitfall:
        'Mixing tenses across the two clauses ("मैं झाड़ू लगाता हूँ, लेकिन भाई ने कचरा फेंका") confuses the reader and costs Language Control points. Keep both clauses in the same tense.',
      whyItMatters:
        'Parallel "मैं ... जबकि वह ..." structures are a Text-Type 5 signature. They show the rater that your sentences are coordinated, not just listed.',
    },
  ],
  grammarNote: {
    why:
      'Location postpositions, the पड़ता है obligation frame, and parallel-clause chore-splitting are the three structures this topic tests most. Get these clean and the essay almost writes itself.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'antMein',
    'kyonki',
    'lekin',
    'isliye',
  ]),
  connectorsNote: {
    why:
      'The sequence पहले / फिर / इसके बाद / अंत में narrates a cleaning routine cleanly. क्योंकि and इसलिए explain why a particular person does a particular chore (e.g., "दादी को घुटने की तकलीफ़ है, इसलिए वे झाड़ू नहीं लगातीं"). लेकिन handles the inevitable contrast between what you like and what you have to do.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'हमारा घर और काम · Our House and Its Work',
    hindi:
      'हमारा घर बहुत बड़ा नहीं है, लेकिन हम चार लोग उसमें आराम से रहते हैं। नीचे एक रसोई, एक बैठक, और एक छोटा बाथरूम है। ऊपर दो बेडरूम और एक बालकनी है। बालकनी में माँ ने तुलसी का पौधा लगाया है। पहले सुबह माँ और दादी रसोई में खाना बनाती हैं। फिर मैं अपना बिस्तर लगाता हूँ और बर्तन धोता हूँ। मेरा छोटा भाई कचरा फेंकता है, क्योंकि वह सबसे छोटा है। शाम को हम सब मिलकर बैठक की सफ़ाई करते हैं। शनिवार को पिताजी वॉशिंग मशीन में कपड़े धोते हैं, जबकि माँ आँगन में कपड़े सुखाती हैं। अंत में रविवार को पूरा परिवार छत पर बैठकर चाय पीता है। इसलिए हमारे घर में काम बँटा हुआ है, और कोई भी थकता नहीं।',
    transliteration:
      'hamaara ghar bahut bada nahin hai, lekin hum chaar log usmein aaraam se rahte hain. neeche ek rasoi, ek baithak, aur ek chhota bathroom hai. oopar do bedroom aur ek balcony hai. balcony mein maa ne tulsi ka paudha lagaaya hai. pahle subah maa aur daadi rasoi mein khaana banaati hain. phir main apna bistar lagaata hoon aur bartan dhota hoon. mera chhota bhai kachra phenkta hai, kyonki vah sabse chhota hai. shaam ko hum sab milkar baithak ki safaai karte hain. shanivaar ko pitaji washing machine mein kapde dhote hain, jabki maa aangan mein kapde sukhaati hain. ant mein ravivaar ko poora parivaar chhat par baithkar chaay peeta hai. isliye hamaare ghar mein kaam banta hua hai, aur koi bhi thakta nahin.',
    english:
      'Our house is not very big, but the four of us live comfortably in it. Downstairs there is one kitchen, one living room, and one small bathroom. Upstairs there are two bedrooms and one balcony. Mother has planted a tulsi plant on the balcony. First, in the morning Mother and Grandmother cook in the kitchen. Then I make my bed and wash the dishes. My younger brother throws out the trash, because he is the youngest. In the evening we all clean the living room together. On Saturday, Father washes clothes in the washing machine, while Mother dries the clothes in the courtyard. Finally, on Sunday the whole family sits on the terrace and drinks tea. So the work is shared in our house, and no one gets tired.',
    highlights: [
      { term: 'नीचे ... ऊपर', note: 'Two-level spatial frame before listing rooms — a clean Text-Type opener.' },
      { term: 'बालकनी में / बैठक की / छत पर', note: 'Three different location postpositions in a single passage, all in the oblique case. Language Control signal.' },
      { term: 'पहले / फिर / अंत में / इसलिए', note: 'Four connectors sequence the chore-routine and close with a reason — exactly what raters look for.' },
      { term: 'जबकि', note: 'Parallel clauses for chore-splitting: मैं ... जबकि माँ ... — Intermediate-Mid hallmark.' },
      { term: 'तुलसी का पौधा', note: 'Specific cultural anchor — lifts Topic Coverage with a single noun.' },
    ],
    comprehensionQuestions: [
      { q: 'How many rooms are downstairs?', a: 'Three: रसोई, बैठक, and बाथरूम.' },
      { q: 'What has mother planted on the balcony?', a: 'तुलसी का पौधा (a tulsi plant).' },
      { q: 'Who throws out the trash, and why?', a: 'The youngest brother, क्योंकि वह सबसे छोटा है.' },
      { q: 'Which day do the parents wash clothes?', a: 'शनिवार (Saturday).' },
      { q: 'What does the family do on Sunday?', a: 'The whole family sits on the chhat (terrace) and drinks tea.' },
      { q: 'Identify the sentence that uses जबकि and explain what it does.', a: '"पिताजी वॉशिंग मशीन में कपड़े धोते हैं, जबकि माँ आँगन में कपड़े सुखाती हैं" — parallels two chores happening at the same time, one per parent.' },
      { q: 'What is the final conclusion of the passage?', a: 'Work is shared (बँटा हुआ है), so no one gets tired.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a direct model of what a passing Intermediate-Mid essay on home and chores looks like. It opens with a two-level spatial description, narrates a routine with four connectors, splits chores with जबकि, and closes with a reason. Study the sentence shapes — these are the shapes the student must reproduce.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'साप्ताहिक कार्य-सूची · Weekly Chore Chart',
      hindi:
        'सोमवार — मैं: बिस्तर लगाना, बर्तन धोना\nमंगलवार — भाई: कचरा फेंकना\nबुधवार — माँ: खाना बनाना\nगुरुवार — पिताजी: बालकनी की सफ़ाई\nशुक्रवार — दादी: झाड़ू लगाना\nशनिवार — सब मिलकर: वॉशिंग मशीन में कपड़े\nरविवार — छुट्टी · आराम',
      transliteration:
        'somvaar — main: bistar lagaana, bartan dhona | mangalvaar — bhai: kachra phenkna | budhvaar — maa: khaana banaana | guruvaar — pitaji: balcony ki safaai | shukravaar — daadi: jhaadoo lagaana | shanivaar — sab milkar: washing machine mein kapde | ravivaar — chhutti, aaraam',
      english:
        'Monday — Me: make the bed, wash dishes · Tuesday — Brother: throw out trash · Wednesday — Mother: cook · Thursday — Father: clean the balcony · Friday — Grandmother: sweep · Saturday — Everyone together: clothes in the washing machine · Sunday — Holiday, rest.',
    },
    {
      kind: 'diary',
      title: 'मेरी डायरी — दिवाली की सफ़ाई · My Diary — Diwali Cleaning',
      hindi:
        'आज दिवाली से पहले वाला शनिवार है। सुबह से हम सब घर की सफ़ाई कर रहे हैं। मुझे अलमारी साफ़ करनी पड़ी, क्योंकि माँ ने कहा। भाई ने छत पर झाड़ू लगाई। अंत में पिताजी ने बालकनी में दिए रखे। थकान बहुत है, लेकिन घर एकदम चमक रहा है।',
      transliteration:
        'aaj diwali se pahle waala shanivaar hai. subah se hum sab ghar ki safaai kar rahe hain. mujhe almaari saaf karni padi, kyonki maa ne kaha. bhai ne chhat par jhaadoo lagaai. ant mein pitaji ne balcony mein diye rakhe. thakaan bahut hai, lekin ghar ekdam chamak raha hai.',
      english:
        'Today is the Saturday before Diwali. Since morning we have all been cleaning the house. I had to clean the cupboard, because Mother said so. Brother swept the terrace. Finally Father placed diyas on the balcony. There is a lot of exhaustion, but the house is absolutely shining.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'यार, आज नहीं आ सकता 😩 माँ ने कहा पहले बर्तन धोने हैं, फिर पूरे कमरे की सफ़ाई करनी है। शाम तक खाली हो जाऊँगा। कल मिलते हैं?',
      transliteration:
        'yaar, aaj nahin aa sakta. maa ne kaha pahle bartan dhone hain, phir poore kamre ki safaai karni hai. shaam tak khaali ho jaaoonga. kal milte hain?',
      english:
        'Dude, I can\'t come today 😩 Mother said I have to wash the dishes first, then clean the whole room. I\'ll be free by evening. See you tomorrow?',
    },
    {
      kind: 'announcement',
      title: 'सोसाइटी की सूचना · Housing Society Notice',
      hindi:
        'सूचना: सोमवार को पूरी सोसाइटी में पानी की टंकी की सफ़ाई होगी। कृपया सुबह नौ बजे से पहले अपने घर में पानी भर लें। बाथरूम और रसोई में पानी आधे दिन तक नहीं आएगा। असुविधा के लिए खेद है। — प्रबंधन',
      transliteration:
        'soochna: somvaar ko poori society mein paani ki tanki ki safaai hogi. kripaya subah nau baje se pahle apne ghar mein paani bhar len. bathroom aur rasoi mein paani aadhe din tak nahin aaega. asuvidha ke liye khed hai. — prabandhan',
      english:
        'Notice: On Monday the water tanks will be cleaned throughout the entire society. Please fill water in your home before 9 a.m. Water will not come in the bathroom and kitchen for half the day. We regret the inconvenience. — Management',
    },
  ],
  modelTextsNote: {
    why:
      'A chore chart, a diary entry, a quick SMS, and a formal society notice — four registers tied to home life. Each uses the same base vocabulary but different sentence shapes, so the student sees that "घर" Hindi ranges from casual to formal.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Joint-Family Chore Sharing',
      body:
        'In many Indian homes, grandparents, parents, and children divide chores by age and tradition — दादी often supervises the kitchen, mother cooks, children wash dishes or fetch water. Writing "हमारे घर में काम बँटा हुआ है" with one example per person is an instant Topic-Coverage lift.',
      emoji: '👪',
    },
    {
      title: 'Diwali Cleaning (दिवाली की सफ़ाई)',
      body:
        'Before Diwali, families do a deep clean — every cupboard emptied, every room mopped, fresh paint on the walls. It is a multi-day ritual, not a chore. One line about "दिवाली से पहले घर की सफ़ाई" places the essay firmly in Indian cultural time.',
      emoji: '🪔',
    },
    {
      title: 'The Didi / Bai Who Helps',
      body:
        'In most Indian cities, households employ a part-time "didi" or "bai" (often called कामवाली) who sweeps, mops, and washes dishes once or twice a day. Mentioning her matter-of-factly ("हमारे घर सुबह कामवाली दीदी आती हैं") is authentic and specific.',
      emoji: '🧹',
    },
    {
      title: 'The आँगन — Open Courtyard',
      body:
        'Traditional Indian homes, especially in smaller cities and villages, have an open inner courtyard (आँगन) where clothes dry, children play, and families sit on summer evenings. Even when a modern flat has no आँगन, the word itself signals home warmth.',
      emoji: '🌿',
    },
    {
      title: 'Tulsi on the Balcony',
      body:
        'A तुलसी (holy basil) plant on the balcony or near the entrance is an almost universal marker of a Hindu home. One sentence — "बालकनी में माँ का तुलसी का पौधा है" — packs cultural specificity without requiring complex grammar.',
      emoji: '🪴',
    },
  ],
  culturalNote: {
    why:
      'Raters reading 200 Hindi essays on "describe your home" see "घर बड़ा है, घर अच्छा है" on repeat. A tulsi plant, a Diwali clean, a didi, an आँगन — any one of these specifics separates your essay from the pile. That is pure Text-Type and Topic-Coverage lift.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'घर का भेदी लंका ढाए',
      literal: 'The insider of the house brings down Lanka',
      meaning: 'A secret known to an insider can destroy even a strong household.',
      example: 'भाई की बात सुनकर माँ नाराज़ हो गईं — घर का भेदी लंका ढाए।',
      exampleEnglish: 'Hearing brother tell on us, mother got angry — an insider can bring the whole house down.',
    },
    {
      phrase: 'घर की मुर्गी दाल बराबर',
      literal: 'The home chicken equals daal (is treated as common)',
      meaning: "What's available at home is undervalued; people crave what they don't have.",
      example: 'माँ का खाना सबसे अच्छा है, लेकिन हम बाहर जाना चाहते हैं — घर की मुर्गी दाल बराबर।',
      exampleEnglish: "Mother's food is the best, but we want to go out — the home chicken is treated like ordinary daal.",
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are home-centric and widely understood. Drop one — and only one — into an essay about your home and raters read it as register mastery. Two is showing off; one is plenty.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt: 'अपने घर के कमरों और घर में काम कैसे बँटे हैं, इसके बारे में तीन अनुच्छेदों में लिखिए। (Write three paragraphs about the rooms of your house and how chores are divided.)',
      novice:
        'मेरा घर अच्छा है। माँ काम करती है। मैं कमरा साफ़ करता हूँ।',
      intermediateMid:
        'मेरा घर बहुत बड़ा नहीं है, लेकिन हमारे लिए पूरा है। नीचे एक रसोई, एक बैठक, और एक बाथरूम है। ऊपर दो बेडरूम और एक छोटी बालकनी है। बालकनी में माँ ने तुलसी का पौधा लगाया है। बैठक में एक सोफ़ा, दो कुर्सियाँ और एक टीवी है, और मेज़ पर हमेशा किताबें रहती हैं।\n\nहमारे घर में काम बँटा हुआ है। पहले सुबह माँ और दादी रसोई में खाना बनाती हैं। फिर मुझे अपना बिस्तर लगाना पड़ता है और बर्तन धोने पड़ते हैं। मेरा छोटा भाई कचरा फेंकता है, जबकि पिताजी शाम को बालकनी की सफ़ाई करते हैं। शनिवार को पूरा परिवार मिलकर वॉशिंग मशीन में कपड़े डालता है, क्योंकि यह सबसे भारी काम है।\n\nपिछली दिवाली हमें पूरे घर की सफ़ाई करनी पड़ी, और तीन दिन लगे। इसलिए इस बार मैं पहले से योजना बनाऊँगा। मुझे लगता है कि जब हर कोई थोड़ा-थोड़ा काम करता है, तो घर साफ़ भी रहता है और कोई थकता नहीं।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'नीचे ... ऊपर', note: 'Two-level spatial frame — tells the reader this is a structured description, not a list.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'सोफ़ा, कुर्सियाँ, टीवी, मेज़', note: 'Four furniture items with correct gender and plural agreement.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'तुलसी का पौधा', note: 'Single cultural specific in paragraph 1 — Topic Coverage win.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर ... जबकि ... क्योंकि', note: 'Four connectors in one paragraph — clean Text-Type 5.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'मुझे ... पड़ता है / पड़ते हैं', note: 'Obligation frame used twice with gender agreement on the chore (बिस्तर m, बर्तन m pl).' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'पिछली दिवाली ... करनी पड़ी / बनाऊँगा / करता है', note: 'Past, future, and present-habitual in a single paragraph — three time frames sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... तो ... भी ... और ...', note: 'Reflective closing generalizes beyond the household — an IM hallmark.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'क्योंकि', 'लेकिन', 'इसलिए', 'जबकि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three fully cohesive paragraphs that cannot be rearranged — Text-Type 5 met cleanly.',
          'Six distinct connectors (पहले, फिर, लेकिन, जबकि, क्योंकि, इसलिए) — well above the 3-connector threshold for Intermediate-Mid.',
          'All three time frames in paragraph 3 (पड़ी past, बनाऊँगा future, करता है present) — satisfies the rubric\'s "some control of past, present, and future."',
          'Gender is controlled across the whole essay: तुलसी का पौधा (m), छोटी बालकनी (f), बिस्तर (m), बर्तन (m pl). Language Control stays at Average or higher.',
          'Cultural specifics (तुलसी, पिछली दिवाली, साझा वॉशिंग मशीन) lift Topic Coverage above the generic "my house is big" baseline.',
        ],
        gotchas: [
          'If the student writes "कमरा में" instead of "कमरे में" (oblique case error), Language Control drops fast.',
          'Dropping to one long paragraph with the same content would fall back to Benchmark 4.',
          'Writing "मैं बिस्तर लगाना पड़ता है" (missing को / मुझे) would break the obligation frame.',
        ],
      },
    },
    {
      prompt:
        'पिछले शनिवार आपने घर में क्या-क्या काम किया और इस शनिवार क्या करेंगे? तीन अनुच्छेदों में लिखिए। (What chores did you do last Saturday, and what will you do this Saturday? Write three paragraphs.)',
      novice:
        'पिछले शनिवार मैंने सफ़ाई की। इस शनिवार भी सफ़ाई करूँगा। घर अच्छा है।',
      intermediateMid:
        'पिछले शनिवार सुबह मुझे जल्दी उठना पड़ा, क्योंकि हमारे घर में बहुत काम था। पहले मैंने अपना बिस्तर लगाया, फिर बाथरूम की सफ़ाई की। इसके बाद माँ के साथ रसोई में बर्तन धोए। भाई ने छत पर झाड़ू लगाई, जबकि पिताजी वॉशिंग मशीन में कपड़े डाल रहे थे।\n\nदोपहर तक हम सब थक गए थे, लेकिन घर एकदम चमक रहा था। हम बैठक में सोफ़े पर बैठे और पंखे के नीचे आराम किया। माँ ने सबके लिए चाय बनाई। उस पल मुझे लगा कि जब पूरा परिवार मिलकर काम करता है, तो काम आधा हो जाता है।\n\nइस शनिवार भी बहुत काम होगा, क्योंकि अगले हफ़्ते दिवाली है। मुझे अलमारी साफ़ करनी पड़ेगी और पुराने कपड़े निकालने होंगे। इसके अलावा, मैं बालकनी में दिए भी रखूँगा। अंत में हम सब मिलकर घर को सजाएँगे। मुझे यह दिन हर साल सबसे अच्छा लगता है।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले शनिवार ... उठना पड़ा / लगाया / की / धोए', note: 'Past frame established immediately with four past-perfective verbs in correct gender.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... इसके बाद ... जबकि', note: 'Four sequence + parallel connectors in a single paragraph — textbook Text-Type 5.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'बैठक में सोफ़े पर ... पंखे के नीचे', note: 'Three location postpositions (में, पर, के नीचे) in oblique case — Language Control signal.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'जब ... तो ... आधा हो जाता है', note: 'Reflective generalization mid-essay — lifts Text-Type.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'होगा / पड़ेगी / रखूँगा / सजाएँगे', note: 'Four future verbs in one paragraph — the third time frame is unambiguous.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'अगले हफ़्ते दिवाली ... बालकनी में दिए', note: 'Cultural specific tied into the future plan — Topic Coverage + Text-Type.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'इसके अलावा / अंत में', note: 'Closing connectors escalate the essay toward its final statement.' },
      ],
      wordCount: 148,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'इसके बाद', 'लेकिन', 'क्योंकि', 'जबकि', 'इसके अलावा', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Eight distinct connectors used — comfortably above the 3-connector minimum, and used in correct contexts (sequence + parallel + reason + closing).',
          'Past-perfective cluster in paragraph 1 (लगाया, की, धोए, लगाई) shows controlled transitive past — a Language Control high point.',
          'Future cluster in paragraph 3 (होगा, पड़ेगी, रखूँगा, सजाएँगे) with gender agreement — past-present-future triangle complete.',
          'Two reflective generalizations ("जब परिवार मिलकर ... तो काम आधा हो जाता है" and "मुझे यह दिन हर साल सबसे अच्छा लगता है") — Text-Type 5 signature.',
          'Cultural specificity (दिवाली, अलमारी की सफ़ाई, बालकनी में दिए) avoids the generic "I cleaned the house" baseline.',
        ],
        gotchas: [
          'Mixing genders on पड़ना ("मुझे अलमारी साफ़ करना पड़ेगा" instead of "करनी पड़ेगी") would cost Language Control points fast.',
          'Dropping the future paragraph entirely would drop to Benchmark 4 even with the rich past.',
          'Writing "मैंने झाड़ू लगाई" for a male narrator is fine (verb agrees with object), but "मैं झाड़ू लगाया" would be wrong.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked essays at Intermediate-Mid. The first is a steady-state description ("how chores are divided"); the second is a two-tense narrative ("last Saturday vs. this Saturday"). Between them the student sees both FCPS patterns — the "describe" prompt and the "compare time frames" prompt.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने घर के कमरों का वर्णन तीन अनुच्छेदों में कीजिए। बताइए कि कौन-सा कमरा कहाँ है, उसमें क्या-क्या है, और आपको कौन-सा कमरा सबसे अच्छा लगता है।',
      english:
        'Describe the rooms of your house in three paragraphs. Say where each room is, what it contains, and which room you like best.',
      hint: {
        connectors: ['पहले', 'फिर', 'लेकिन', 'क्योंकि'],
        vocab: ['रसोई', 'बैठक', 'बेडरूम', 'बालकनी', 'पलंग', 'मेज़', 'पंखा'],
        tenses: ['present'],
      },
    },
    {
      hindi:
        'आपके घर में काम कैसे बँटे हैं? तीन अनुच्छेदों में लिखिए। बताइए कि कौन क्या करता है, कब करता है, और क्यों इसी तरह बँटा है।',
      english:
        'How are chores divided in your home? Write three paragraphs. Say who does what, when, and why the division is that way.',
      hint: {
        connectors: ['पहले', 'फिर', 'जबकि', 'क्योंकि', 'इसलिए'],
        vocab: ['सफ़ाई करना', 'झाड़ू लगाना', 'बर्तन धोना', 'कपड़े धोना', 'बिस्तर लगाना'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'पिछले रविवार आपने घर में क्या-क्या काम किया, और इस रविवार क्या करेंगे? तीन अनुच्छेदों में तुलना कीजिए।',
      english:
        'What chores did you do last Sunday, and what will you do this Sunday? Compare in three paragraphs.',
      hint: {
        connectors: ['पहले', 'इसके बाद', 'लेकिन', 'अंत में'],
        vocab: ['सफ़ाई करना', 'कपड़े धोना', 'खाना बनाना', 'बिस्तर लगाना', 'परिवार'],
        tenses: ['past', 'future', 'present'],
      },
    },
  ],
  promptsNote: {
    why:
      'Three prompts in the exact FCPS shape. Prompt 1 is descriptive (present tense, location postpositions). Prompt 2 forces parallel-clause chore splitting. Prompt 3 forces past + future + present — the full Intermediate-Mid triangle. Pick the one that stretches you most.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay you write in this pack. Check that (a) your rooms are in the oblique case before postpositions, (b) every chore verb agrees in gender with its object, (c) at least three connectors appear, and (d) all three time frames show up. If any box is unchecked, fix it before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
