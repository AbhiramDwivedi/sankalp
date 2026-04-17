import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L2-09 — Special Events & Festivals (विशेष अवसर और त्योहार)
// Festival essays are the Text-Type 5 sweet spot: past (last Diwali),
// present (this year), and future (next year) land naturally in one piece.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L2-09-special-events',
  level: 2,
  themeGroup: 'ModernSociety',
  order: 21,
  titleHindi: 'विशेष अवसर और त्योहार',
  titleEnglish: 'Special Events & Festivals',
  hook: 'Festival essays let students show past, present, and future tenses in one piece — the Text-Type 5 sweet spot.',
  heroPrompt: composeHeroPrompt(
    'A Diwali scene with a bright kolam-style rangoli on the floor, a row of clay diyas glowing along the threshold, sparklers in the hands of two children, a plate of mithai and marigold garlands on a brass tray, a family silhouette on the rooftop under a sky lit with soft fireworks',
  ),

  rationale: {
    fcpsSubTopics: [
      'Special Events (FCPS Level 2 — Leisure Time)',
      'Festivals and Celebrations (FCPS Level 2)',
      'Family and community gatherings (bridges to FCPS Level 2 — Home Life)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate one completed festival in past perfective with correct ने-constructions.',
      'Describe what their family does every year in habitual present, then shift to a future plan for next year — in the same essay.',
      'Name at least eight Indian festivals and three festival-specific objects (दीया, रंगोली, राखी) without searching.',
      'Use a conditional (अगर ... तो मनाएँगे) and a relative clause (जिस दिन) in a single paragraph.',
      'Add one culturally specific practice — diya-lighting order, sheer korma, rakhi tying — that separates the essay from generic responses.',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '90 min reading + 45 min essay',
    ifSkippedRisk:
      'Festivals are the single most common FCPS prompt domain because they let raters see three tenses in one essay. A student who skips this pack is likely to default to one-tense "we eat food and are happy" writing and land at Benchmark 4 (2 credits).',
  },

  objectives: [
    {
      text: 'Produce 20+ festival-specific nouns and 6+ event verbs on demand in Devanagari.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Write a 3-paragraph essay that uses past, present, AND future — each anchored by a time marker (पिछले साल, हर साल, अगले साल).',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Use the ने-construction correctly in three past perfective sentences about who prepared what.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Include at least one conditional (अगर ... तो) and one relative clause (जो / जिस दिन) in every festival essay.',
      trains: ['TextType'],
    },
    {
      text: 'Name one festival-specific cultural practice (rangoli design, rakhi thread, sheer korma) per essay — not just "we celebrate and eat sweets".',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Festival names
    { hindi: 'त्योहार', transliteration: 'tyohaar', english: 'festival', exampleHindi: 'भारत में बहुत सारे त्योहार मनाए जाते हैं।', exampleEnglish: 'Many festivals are celebrated in India.', emoji: '🎉', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'दिवाली', transliteration: 'divaali', english: 'Diwali (festival of lights)', exampleHindi: 'दिवाली पर हम दीये जलाते हैं।', exampleEnglish: 'On Diwali we light diyas.', emoji: '🪔', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'होली', transliteration: 'holi', english: 'Holi (festival of colors)', exampleHindi: 'होली पर सब रंग खेलते हैं।', exampleEnglish: 'On Holi everyone plays with colors.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'रक्षाबंधन', transliteration: 'rakshaabandhan', english: 'Rakshabandhan', exampleHindi: 'रक्षाबंधन पर बहन भाई को राखी बाँधती है।', exampleEnglish: 'On Rakshabandhan, a sister ties rakhi on her brother.', emoji: '🪢', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'ईद', transliteration: 'eed', english: 'Eid', exampleHindi: 'ईद पर शीर-कोरमा बनता है।', exampleEnglish: 'Sheer korma is made on Eid.', emoji: '🌙', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'क्रिसमस', transliteration: 'krismas', english: 'Christmas', exampleHindi: 'क्रिसमस पर हम पेड़ सजाते हैं।', exampleEnglish: 'On Christmas we decorate the tree.', emoji: '🎄', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'जन्मदिन', transliteration: 'janamdin', english: 'birthday', exampleHindi: 'मेरा जन्मदिन मार्च में आता है।', exampleEnglish: 'My birthday comes in March.', emoji: '🎂', partOfSpeech: 'noun', subgroup: 'Festival names' },
    { hindi: 'शादी', transliteration: 'shaadi', english: 'wedding', exampleHindi: 'मेरी चाची की शादी पिछले साल हुई थी।', exampleEnglish: "My aunt's wedding was last year.", emoji: '💍', partOfSpeech: 'noun', subgroup: 'Festival names' },

    // Festival objects
    { hindi: 'दीया', transliteration: 'diyaa', english: 'oil lamp', exampleHindi: 'माँ ने आँगन में दस दीये जलाए।', exampleEnglish: 'Mother lit ten diyas in the courtyard.', emoji: '🪔', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'रंगोली', transliteration: 'rangoli', english: 'floor art pattern', exampleHindi: 'दीदी ने दरवाज़े पर सुंदर रंगोली बनाई।', exampleEnglish: 'Big sister made a beautiful rangoli at the door.', emoji: '🌸', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'रंग', transliteration: 'rang', english: 'color / colored powder', exampleHindi: 'होली पर हमने लाल और हरा रंग लगाया।', exampleEnglish: 'On Holi we applied red and green color.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'पटाखे', transliteration: 'pataakhe', english: 'firecrackers', exampleHindi: 'छोटे बच्चे पटाखों से थोड़ा डरते हैं।', exampleEnglish: 'Small children are a little scared of firecrackers.', emoji: '🎆', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'मिठाई', transliteration: 'mithaai', english: 'sweets', exampleHindi: 'दादी ने घर पर मिठाई बनाई।', exampleEnglish: 'Grandmother made sweets at home.', emoji: '🍬', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'उपहार', transliteration: 'uphaar', english: 'gift', exampleHindi: 'भैया ने मुझे एक किताब उपहार में दी।', exampleEnglish: 'Big brother gave me a book as a gift.', emoji: '🎁', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'तिलक', transliteration: 'tilak', english: 'forehead mark', exampleHindi: 'माँ ने मेरे माथे पर तिलक लगाया।', exampleEnglish: 'Mother applied tilak on my forehead.', emoji: '🔴', partOfSpeech: 'noun', subgroup: 'Festival objects' },
    { hindi: 'राखी', transliteration: 'raakhi', english: 'rakhi thread', exampleHindi: 'बहन ने भाई की कलाई पर राखी बाँधी।', exampleEnglish: "Sister tied rakhi on her brother's wrist.", emoji: '🪢', partOfSpeech: 'noun', subgroup: 'Festival objects' },

    // Event verbs
    { hindi: 'मनाना', transliteration: 'manaana', english: 'to celebrate', exampleHindi: 'हम हर साल दिवाली मनाते हैं।', exampleEnglish: 'We celebrate Diwali every year.', emoji: '🎊', partOfSpeech: 'verb', subgroup: 'Event verbs' },
    { hindi: 'सजाना', transliteration: 'sajaana', english: 'to decorate', exampleHindi: 'हमने पूरा घर फूलों से सजाया।', exampleEnglish: 'We decorated the whole house with flowers.', emoji: '✨', partOfSpeech: 'verb', subgroup: 'Event verbs' },
    { hindi: 'बुलाना', transliteration: 'bulaana', english: 'to invite / call over', exampleHindi: 'माँ ने पड़ोसियों को खाने पर बुलाया।', exampleEnglish: 'Mother invited the neighbors over for a meal.', emoji: '📣', partOfSpeech: 'verb', subgroup: 'Event verbs' },
    { hindi: 'आमंत्रित करना', transliteration: 'aamantrit karna', english: 'to invite (formal)', exampleHindi: 'हमने सब रिश्तेदारों को आमंत्रित किया।', exampleEnglish: 'We invited all the relatives.', emoji: '💌', partOfSpeech: 'verb', subgroup: 'Event verbs' },
    { hindi: 'नाचना', transliteration: 'naachna', english: 'to dance', exampleHindi: 'बच्चे संगीत पर खूब नाचे।', exampleEnglish: 'The children danced a lot to the music.', emoji: '💃', partOfSpeech: 'verb', subgroup: 'Event verbs' },
    { hindi: 'गाना', transliteration: 'gaana', english: 'to sing / song', exampleHindi: 'दादी ने एक पुराना भजन गाया।', exampleEnglish: 'Grandmother sang an old bhajan.', emoji: '🎤', partOfSpeech: 'verb', subgroup: 'Event verbs' },
    { hindi: 'जलाना', transliteration: 'jalaana', english: 'to light / kindle', exampleHindi: 'पिताजी ने पहला दीया जलाया।', exampleEnglish: 'Father lit the first diya.', emoji: '🔥', partOfSpeech: 'verb', subgroup: 'Event verbs' },

    // Emotion words specific to events
    { hindi: 'उत्साह', transliteration: 'utsaah', english: 'enthusiasm', exampleHindi: 'बच्चों में बहुत उत्साह था।', exampleEnglish: 'There was great enthusiasm among the children.', emoji: '🤩', partOfSpeech: 'noun', subgroup: 'Emotions' },
    { hindi: 'खुशी', transliteration: 'khushi', english: 'happiness', exampleHindi: 'माँ की आँखों में खुशी थी।', exampleEnglish: "There was happiness in Mother's eyes.", emoji: '😊', partOfSpeech: 'noun', subgroup: 'Emotions' },
    { hindi: 'रोमांच', transliteration: 'romaanch', english: 'excitement / thrill', exampleHindi: 'पटाखे देखकर रोमांच हो गया।', exampleEnglish: 'Seeing the firecrackers was thrilling.', emoji: '🎆', partOfSpeech: 'noun', subgroup: 'Emotions' },

    // Time markers
    { hindi: 'पिछले साल', transliteration: 'pichhle saal', english: 'last year', exampleHindi: 'पिछले साल हमने गाँव में दिवाली मनाई।', exampleEnglish: 'Last year we celebrated Diwali in the village.', emoji: '⬅️', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'इस साल', transliteration: 'is saal', english: 'this year', exampleHindi: 'इस साल हम शहर में हैं।', exampleEnglish: 'This year we are in the city.', emoji: '📅', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'अगले साल', transliteration: 'agle saal', english: 'next year', exampleHindi: 'अगले साल दादी हमारे साथ होंगी।', exampleEnglish: 'Next year Grandmother will be with us.', emoji: '➡️', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'उस दिन', transliteration: 'us din', english: 'on that day', exampleHindi: 'उस दिन घर में बहुत शोर था।', exampleEnglish: 'On that day there was a lot of noise in the house.', emoji: '📆', partOfSpeech: 'phrase', subgroup: 'Time markers' },
  ],
  vocabularyNote: {
    why:
      'This 31-word set is curated so a student can write about any major Indian festival — Diwali, Holi, Rakhi, Eid — without reaching for a dictionary. The time markers (पिछले साल / इस साल / अगले साल) are load-bearing: they are what let the essay span three tenses without sounding forced.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Past perfective with ने (हमने मनाया, दादी ने बनाया)',
      rule:
        'To narrate what people DID at a festival, use the ने-construction. The subject takes ने, and the verb agrees with the gender/number of the OBJECT — not the subject. This is the single most common structure in festival essays.',
      examples: [
        { hindi: 'हमने दिवाली मनाई।', transliteration: 'humne divaali manaayi.', english: 'We celebrated Diwali. (दिवाली is feminine → manaayi)' },
        { hindi: 'दादी ने शीर-कोरमा बनाया।', transliteration: 'daadi ne sheer-korma banaaya.', english: 'Grandmother made sheer korma. (शीर-कोरमा masc. → banaaya)' },
        { hindi: 'माँ ने दस दीये जलाए।', transliteration: 'maa ne das diye jalaaye.', english: 'Mother lit ten diyas. (दीये masc. plural → jalaaye)' },
        { hindi: 'बहन ने राखी बाँधी।', transliteration: 'bahen ne raakhi baandhi.', english: 'Sister tied the rakhi. (राखी fem. → baandhi)' },
      ],
      pitfall:
        'Writing "हम दिवाली मनाए" or "हम दिवाली मनाया" skips the ने and mismatches gender. Both errors show up in Language Control immediately. The verb should NOT agree with हम — it should agree with दिवाली.',
      whyItMatters:
        'The ने-construction is the diagnostic the rater uses to check whether the student controls past transitive. Get it right three times in one essay and Language Control moves from "Low" to "Average" — exactly the step from 2 to 3 credits.',
    },
    {
      title: 'Habitual past (हम हर साल मनाते थे)',
      rule:
        'For repeated actions in the past ("we used to celebrate every year"), use the imperfective past: verb stem + ता/ती/ते + था/थी/थे. This is different from the perfective (what happened once).',
      examples: [
        { hindi: 'जब मैं छोटी थी, हम हर साल गाँव में होली मनाते थे।', transliteration: 'jab main chhoti thi, hum har saal gaanv mein holi manaate the.', english: 'When I was small, we used to celebrate Holi in the village every year.' },
        { hindi: 'दादी हर ईद पर शीर-कोरमा बनाती थीं।', transliteration: 'daadi har eed par sheer-korma banaati theen.', english: 'Grandmother used to make sheer korma every Eid.' },
        { hindi: 'बचपन में मुझे पटाखे बहुत अच्छे लगते थे।', transliteration: 'bachpan mein mujhe pataakhe bahut achchhe lagte the.', english: 'In childhood I used to like firecrackers very much.' },
      ],
      pitfall:
        'Students often collapse this into the simple perfective ("हम मनाए"), which means "we celebrated once". That loses the "every year" meaning and raters hear it as a tense mismatch.',
      whyItMatters:
        'The habitual past is the cleanest way to contrast "what we used to do / what we do now". Pair it with present-tense "इस साल" sentences and you have a mini Intermediate-Mid showcase inside one paragraph.',
    },
    {
      title: 'Conditional future with अगर ... तो',
      rule:
        'To project a future plan, use अगर + present/future subjunctive, तो + future. This is the single structure that most reliably adds the third (future) time frame to a festival essay.',
      examples: [
        { hindi: 'अगर अगले साल दादी आएँगी, तो हम बड़ी दिवाली मनाएँगे।', transliteration: 'agar agle saal daadi aayengi, to hum badi divaali manaayenge.', english: 'If Grandmother comes next year, we will celebrate a big Diwali.' },
        { hindi: 'अगर मौसम अच्छा होगा, तो हम छत पर पटाखे जलाएँगे।', transliteration: 'agar mausam achchha hoga, to hum chhat par pataakhe jalaayenge.', english: 'If the weather is good, we will set off firecrackers on the roof.' },
        { hindi: 'अगर भैया घर आएगा, तो मैं उसे राखी बाँधूँगी।', transliteration: 'agar bhaiya ghar aayega, to main use raakhi baandhoongi.', english: 'If brother comes home, I will tie rakhi on him.' },
      ],
      pitfall:
        'Dropping तो is the most common error ("अगर दादी आएँगी, हम मनाएँगे"). The sentence still parses but sounds half-finished to a Hindi ear — raters mark this as "inconsistent control".',
      whyItMatters:
        'Intermediate-Mid explicitly requires "some control of major time frames." A single well-formed अगर ... तो sentence in the final paragraph is the most efficient way to tick the future-frame box.',
    },
    {
      title: 'Relative clauses with जो / जिस दिन',
      rule:
        'जिस दिन ("the day on which") and जो ("who / which") let you attach extra detail to one noun instead of starting a new choppy sentence. Each relative clause you use correctly is a Text-Type win.',
      examples: [
        { hindi: 'जिस दिन दिवाली थी, उस दिन बहुत बारिश हुई।', transliteration: 'jis din divaali thi, us din bahut baarish hui.', english: 'On the day Diwali fell, it rained a lot.' },
        { hindi: 'जो मिठाई दादी ने बनाई, वह सबसे स्वादिष्ट थी।', transliteration: 'jo mithaai daadi ne banaayi, vah sabse svaadisht thi.', english: 'The sweet that Grandma made was the most delicious.' },
      ],
      pitfall:
        'Many students forget the "resumptive" pronoun (उस / वह) in the second half of the sentence. "जिस दिन दिवाली थी, बहुत बारिश हुई" is acceptable but weaker; the full जिस ... उस pair reads more controlled.',
      whyItMatters:
        'A relative clause is a complex structure. Raters specifically listen for one or two of these when deciding between Benchmark 5 and 6. One per essay is plenty.',
    },
  ],
  grammarNote: {
    why:
      'These four rules are what separate a festival essay that lands at Benchmark 4 from one that lands at Benchmark 5. The ne-construction and the habitual past together cover 70% of the past-tense load in a festival essay; the conditional and relative clause add the Intermediate-Mid polish.',
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
    'jabTab',
    'iskeAlawa',
  ]),
  connectorsNote: {
    why:
      'A festival essay naturally breaks into three beats — preparation, celebration, reflection. पहले / फिर / इसके बाद / अंत में scaffold those beats exactly. क्योंकि and इसलिए carry the "why we do this" cultural reasoning that lifts Topic Coverage. जब ... तब is reserved for the childhood-memory sentence almost every strong festival essay uses.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'हमारे घर की दिवाली · Diwali at Our House',
    hindi:
      'पिछले साल दिवाली पर हमारे घर में बहुत उत्साह था। सुबह सबसे पहले माँ और दीदी ने दरवाज़े पर सुंदर रंगोली बनाई। फिर हमने पूरे घर को फूलों और लाइटों से सजाया। दादी ने रसोई में बैठकर मिठाई और नमकीन बनाए, क्योंकि वह हर साल यही करती हैं। शाम को पड़ोसियों को भी बुलाया गया। जब अँधेरा हुआ, तब पिताजी ने पहला दीया जलाया और उसके बाद हम सबने मिलकर पूरे आँगन में दीये रखे। छोटे भाई को पटाखों से थोड़ा डर लगा, लेकिन फुलझड़ियाँ उसे बहुत पसंद आईं। अंत में हम छत पर गए और दूर तक जगमगाते शहर को देखा। उस रात माँ की आँखों में खुशी थी, और मुझे लगा कि दिवाली सिर्फ़ रोशनी का त्योहार नहीं, बल्कि परिवार के साथ होने का त्योहार भी है।',
    transliteration:
      'pichhle saal divaali par hamaare ghar mein bahut utsaah tha. subah sabse pahle maa aur deedi ne darwaaze par sundar rangoli banaayi. phir humne poore ghar ko phoolon aur laiton se sajaaya. daadi ne rasoi mein baithkar mithaai aur namkeen banaaye, kyonki vah har saal yahi karti hain. shaam ko padosiyon ko bhi bulaaya gaya. jab andhera hua, tab pitaji ne pahla diya jalaaya aur uske baad hum sabne milkar poore aangan mein diye rakhe. chhote bhai ko pataakhon se thoda dar laga, lekin phuljhadiyaan use bahut pasand aayeen. ant mein hum chhat par gaye aur door tak jagmagaate shahar ko dekha. us raat maa ki aankhon mein khushi thi, aur mujhe laga ki divaali sirf roshni ka tyohaar nahin, balki parivaar ke saath hone ka tyohaar bhi hai.',
    english:
      'Last year on Diwali, there was great enthusiasm in our home. First thing in the morning, Mother and elder sister made a beautiful rangoli at the door. Then we decorated the whole house with flowers and lights. Grandmother sat in the kitchen and made sweets and namkeen, because she does this every year. In the evening the neighbors were invited too. When it got dark, Father lit the first diya, and after that we all placed diyas across the courtyard together. My little brother was a bit afraid of the firecrackers, but he really liked the sparklers. Finally we went up to the roof and watched the city twinkling into the distance. That night there was happiness in Mother\'s eyes, and I felt that Diwali is not only the festival of lights but also the festival of being with family.',
    highlights: [
      { term: 'पिछले साल ... इस साल ... अगले साल', note: 'The anchor opens with पिछले साल and pivots; a festival essay always benefits from these three time anchors, even if only two appear.' },
      { term: 'माँ और दीदी ने ... बनाई / दादी ने ... बनाए / पिताजी ने ... जलाया', note: 'Four correct ने-constructions in one passage, each with the verb agreeing with the OBJECT. This is what clean Language Control looks like.' },
      { term: 'जब अँधेरा हुआ, तब ...', note: 'The जब ... तब pivot between afternoon preparation and evening celebration — the single most useful Text-Type connector for festival narration.' },
      { term: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: 'Reflective closing. "Not only X but also Y" is a Benchmark-5 hallmark because it generalizes past the specific event.' },
      { term: 'आँगन / रंगोली / दीये / पटाखे / फुलझड़ियाँ', note: 'Five festival-specific nouns, none of which are generic. Raters register cultural specificity here.' },
    ],
    comprehensionQuestions: [
      { q: 'Who made the rangoli, and where?', a: 'माँ and दीदी made it at the door (दरवाज़े पर).' },
      { q: 'What did Grandmother prepare, and why "every year"?', a: 'मिठाई and नमकीन — क्योंकि वह हर साल यही करती हैं (because she does this every year — a family tradition).' },
      { q: 'Identify the moment when afternoon shifts to evening.', a: 'The जब अँधेरा हुआ, तब पिताजी ने पहला दीया जलाया clause.' },
      { q: 'What did the little brother like and dislike?', a: 'He was scared of पटाखे but loved फुलझड़ियाँ (sparklers).' },
      { q: 'What does the narrator reflect at the end?', a: 'Diwali is सिर्फ़ रोशनी का त्योहार नहीं, बल्कि परिवार के साथ होने का त्योहार भी है — not only the festival of lights but also of being with family.' },
      { q: 'Name three connectors used in this passage.', a: 'Any three of पहले, फिर, क्योंकि, जब ... तब, इसके बाद, लेकिन, अंत में, बल्कि.' },
      { q: 'Point to two ने-sentences and identify the objects.', a: 'माँ और दीदी ने रंगोली (f) बनाई; पिताजी ने दीया (m) जलाया.' },
    ],
  },
  anchorNote: {
    why:
      'This 148-word anchor is tuned to the exact Intermediate-Mid target. Read it three times before writing your first festival essay. Notice how preparation → celebration → reflection gives a natural 3-paragraph arc, and how the ending generalizes beyond the event. Those are the two moves raters reward.',
    trains: ['TextType', 'TopicCoverage', 'LanguageControl'],
  },

  modelTexts: [
    {
      kind: 'letter',
      title: 'दादी को दिवाली की चिट्ठी · Diwali Letter to Grandmother',
      hindi:
        'प्यारी दादी,\nइस साल दिवाली पर आपकी बहुत याद आई। हमने आपकी बनाई हुई गुझिया खाई, लेकिन वह आपके हाथ जैसी नहीं थी। अगले साल हम गाँव ज़रूर आएँगे। आप अपना ख्याल रखिए।\nआपकी, मीरा',
      transliteration:
        'pyaari daadi,\nis saal divaali par aapki bahut yaad aayi. humne aapki banaai hui gujhiya khaayi, lekin vah aapke haath jaisi nahin thi. agle saal hum gaanv zaroor aayenge. aap apna khyaal rakhiye.\naapki, meera.',
      english:
        'Dear Grandmother,\nWe missed you a lot this Diwali. We ate the gujhiya you had made, but it was not like when you make it by hand. Next year we will definitely come to the village. Please take care of yourself.\nYours, Meera.',
    },
    {
      kind: 'announcement',
      title: 'होली मिलन समारोह · Holi Gathering Announcement',
      hindi:
        'नमस्कार पड़ोसियों!\nइस रविवार को सुबह दस बजे हमारे पार्क में होली मिलन समारोह है। रंग, गुझिया और ठंडाई का इंतज़ाम है। कृपया परिवार के साथ आइए। पुराने कपड़े पहनकर आना सही रहेगा।',
      transliteration:
        'namaskaar padosiyon!\nis ravivaar ko subah das baje hamaare paark mein holi milan samaaroh hai. rang, gujhiya aur thandaai ka intazaam hai. kripaya parivaar ke saath aaiye. puraane kapde pahankar aana sahi rahega.',
      english:
        'Hello neighbors!\nThis Sunday at 10 AM we have a Holi gathering in our park. Colors, gujhiya, and thandai are arranged. Please come with your family. It will be wise to come wearing old clothes.',
    },
    {
      kind: 'diary',
      title: 'राखी का दिन · Rakhi Day Diary',
      hindi:
        'आज रक्षाबंधन था। सुबह माँ ने पूजा की थाली सजाई। मैंने भैया के माथे पर तिलक लगाया और उसकी कलाई पर राखी बाँधी। भैया ने मुझे एक छोटा उपहार दिया और वादा किया कि वह मेरा हमेशा ख्याल रखेगा। मुझे बहुत खुशी हुई।',
      transliteration:
        'aaj rakshaabandhan tha. subah maa ne pooja ki thaali sajaai. maine bhaiya ke maathe par tilak lagaaya aur uski kalaai par raakhi baandhi. bhaiya ne mujhe ek chhota uphaar diya aur vaada kiya ki vah mera hamesha khyaal rakhega. mujhe bahut khushi hui.',
      english:
        'Today was Rakshabandhan. In the morning Mother set up the puja plate. I put a tilak on my brother\'s forehead and tied the rakhi on his wrist. Brother gave me a small gift and promised that he will always look after me. I was very happy.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को ईद का संदेश · Eid Message to a Friend',
      hindi:
        'ईद मुबारक! 🌙\nकल हमारे घर आओ ना — अम्मी शीर-कोरमा बना रही हैं और छोटे भाई ने पूरा घर सजाया है। शाम सात बजे ठीक रहेगा?',
      transliteration:
        'eed mubaarak!\nkal hamaare ghar aao na — ammi sheer-korma bana rahi hain aur chhote bhai ne poora ghar sajaaya hai. shaam saat baje theek rahega?',
      english:
        'Eid Mubarak!\nCome over to our place tomorrow — Mom is making sheer korma and my little brother has decorated the whole house. Would 7 PM work?',
    },
    {
      kind: 'poster',
      title: 'क्रिसमस कार्यक्रम · Christmas Event Poster',
      hindi:
        'क्रिसमस की शाम\n२५ दिसंबर, शाम ६ बजे\nस्कूल का सभागार\nकैरल, नृत्य, और केक\nसब बच्चे अपने परिवार के साथ आमंत्रित हैं।\nप्रवेश निःशुल्क।',
      transliteration:
        'krismas ki shaam.\n25 disambar, shaam 6 baje. school ka sabhaagaar. kairol, nritya, aur kek. sab bachche apne parivaar ke saath aamantrit hain. pravesh nihshulk.',
      english:
        'Christmas Evening.\n25 December, 6 PM. School auditorium. Carols, dance, and cake. All children are invited with their families. Entry free.',
    },
  ],
  modelTextsNote: {
    why:
      'Five registers — intimate letter, community announcement, private diary, casual SMS, public poster — on the same topic domain. The student who can copy these shapes has the range raters are looking for when they score Text-Type beyond "one-register monotone".',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'The Diya Order Matters',
      body:
        'In many households, the eldest male lights the first diya at the threshold, then family members light diyas outward across the courtyard and balcony. Mentioning who lit first (पिताजी ने पहला दीया जलाया) is a single sentence that signals deep cultural knowledge — far more specific than "we lit diyas".',
      emoji: '🪔',
    },
    {
      title: 'Holi is Two Days, Not One',
      body:
        'The night before Holi is होलिका दहन (bonfire of Holika); the color-playing day is the next morning. Many essays collapse them. Getting the sequence right ("पहले रात को होलिका दहन हुआ, फिर अगली सुबह रंग खेला") reads as authentic.',
      emoji: '🔥',
    },
    {
      title: 'Rakhi is a Protection Promise',
      body:
        'The rakhi thread is not a gift — it is a request for lifelong protection. The brother traditionally gives a return gift (नेग) and promises to look after the sister. Writing "भैया ने वादा किया" (brother promised) captures this in a single phrase.',
      emoji: '🪢',
    },
    {
      title: 'Eid = Sheer Korma + Eidi',
      body:
        'Sheer korma (vermicelli milk pudding with dates and dry fruits) is the signature Eid dish, cooked from dawn. Children receive ईदी — small cash gifts from elders. Name either item in your essay and Topic Coverage jumps above "we ate sweets".',
      emoji: '🌙',
    },
    {
      title: 'Intergenerational Division of Labor',
      body:
        'Festivals in Indian homes follow a predictable pattern: grandmothers cook the signature dish, mothers arrange the rangoli and puja, children do decoration and dance, fathers handle outdoor rituals (lighting, firecrackers, guests). Narrating each person doing their role (दादी ने गुझिया बनाई, माँ ने रंगोली बनाई, पिताजी ने दीया जलाया) gives you three correct ने-sentences for free.',
      emoji: '👵',
    },
  ],
  culturalNote: {
    why:
      'Raters have read a thousand "festivals are happy and colorful" essays. What separates Benchmark 5 is one concrete, specific practice — who lights the first diya, the Holi two-day sequence, sheer korma on Eid, the rakhi protection promise. Pick one per essay. Do not list all of them.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'चार चाँद लगाना',
      literal: 'to attach four moons',
      meaning: 'To make something even more beautiful or splendid.',
      example: 'दादी की मौजूदगी ने दिवाली में चार चाँद लगा दिए।',
      exampleEnglish: "Grandmother's presence made the Diwali celebration even more beautiful.",
    },
    {
      phrase: 'दीवाली मनाना',
      literal: 'to celebrate Diwali',
      meaning: 'To be in a state of joyful celebration; to feel like it\'s Diwali (used figuratively for any very happy occasion).',
      example: 'जब भैया विदेश से लौटा, तो हमारे घर में दीवाली मन गई।',
      exampleEnglish: 'When my brother returned from abroad, our home felt like Diwali.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are festival-adjacent, so they slot naturally into a Diwali / Rakhi / birthday essay without forcing. One placed in the reflection paragraph ("दादी आईं और हमारे घर में चार चाँद लग गए") signals register mastery.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपने परिवार के एक यादगार त्योहार के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि पिछले साल आपने उसे कैसे मनाया, इस साल क्या अलग है, और अगले साल आपकी क्या योजना है।',
      novice: 'दिवाली अच्छी है। हम मिठाई खाते हैं। सब खुश हैं।',
      intermediateMid:
        'पिछले साल दिवाली हमारे गाँव में मनाई गई थी। दादी ने सुबह से रसोई में गुझिया और मठरी बनाईं, और माँ ने दरवाज़े पर एक बड़ी रंगोली बनाई। शाम को जब अँधेरा हुआ, तब पिताजी ने पहला दीया जलाया और उसके बाद हम सबने मिलकर पूरे आँगन में दीये रखे। मेरे छोटे भाई को पटाखों से थोड़ा डर लगा, लेकिन फुलझड़ियाँ उसे बहुत पसंद आईं।\n\nइस साल हम शहर में हैं और दादी गाँव में रह गईं, इसलिए माहौल थोड़ा अलग है। हम हर साल की तरह रंगोली बनाते हैं और दीये जलाते हैं, लेकिन दादी की बनाई गुझिया की खुशबू रसोई से नहीं आ रही। माँ ने आज उनसे फ़ोन पर बात की और उनकी रेसिपी लिखी, क्योंकि वह भी यही स्वाद चाहती हैं।\n\nअगले साल अगर दादी की तबीयत ठीक रही, तो हम ज़रूर गाँव जाएँगे और उनके साथ दिवाली मनाएँगे। मुझे लगता है कि त्योहार सिर्फ़ दीये और मिठाई का नाम नहीं, बल्कि उन लोगों का नाम भी है जिनके साथ हम उन्हें मनाते हैं।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले साल ... मनाई गई थी', note: 'Opens in past perfective passive. Anchors the first tense immediately.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'दादी ने ... बनाईं / माँ ने ... बनाई / पिताजी ने ... जलाया', note: 'Three ne-constructions in one paragraph, each with correct object agreement — this is the Language Control signal raters specifically check for.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'जब अँधेरा हुआ, तब ... और उसके बाद', note: 'जब ... तब pivot + sequencing connector in a single sentence.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'इस साल हम शहर में हैं ... माँ ने फ़ोन पर बात की', note: 'Present habitual sits next to past perfective inside one paragraph — textbook Intermediate-Mid tense interleaving.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'दादी की बनाई गुझिया की खुशबू', note: 'Sensory, specific cultural detail — far above "we miss Grandma".' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल अगर ... तो ... जाएँगे', note: 'Conditional + future closes the third time frame cleanly. Benchmark 5 sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: 'Reflective not-only-but-also generalizes beyond the event — a Benchmark-5 hallmark.' },
      ],
      wordCount: 148,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले (implied via sequencing)', 'इसके बाद', 'लेकिन', 'क्योंकि', 'इसलिए', 'जब... तब', 'अगर... तो', 'सिर्फ़... बल्कि भी'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three time frames anchored by explicit markers — पिछले साल (past), इस साल (present), अगले साल (future) — exactly the "some control of major time frames" the IM rubric asks for.',
          'Four correct ने-sentences across the essay (दादी ने बनाईं, माँ ने बनाई, पिताजी ने जलाया, माँ ने बात की). Language Control at Average or above.',
          'Seven distinct connectors including the high-value pair जब ... तब and the conditional अगर ... तो. Text-Type 5 confirmed.',
          'Sensory cultural detail (दादी की बनाई गुझिया की खुशबू) and intergenerational specificity lift Topic Coverage above generic "we ate sweets" essays.',
          'Reflective closing generalizes the event ("त्योहार ... उन लोगों का नाम भी है जिनके साथ ...") — a Benchmark-5 signature move.',
        ],
        gotchas: [
          'If the student writes "दादी ने गुझिया बनाया" (masculine agreement on feminine object), Language Control drops to Low.',
          'Collapsing पिछले साल / इस साल / अगले साल into a single undifferentiated past would drop this to Benchmark 4, regardless of vocabulary.',
        ],
      },
    },
    {
      prompt:
        'किसी एक त्योहार या विशेष अवसर (जन्मदिन, शादी, ईद, होली, रक्षाबंधन) के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि बचपन में आप उसे कैसे मनाते थे, अब कैसे मनाते हैं, और अगर आप दूर होंगे तो क्या करेंगे।',
      novice: 'होली अच्छी है। हम रंग खेलते हैं। मज़ा आता है।',
      intermediateMid:
        'जब मैं छोटी थी, तब हम हर साल अपने मोहल्ले में होली मनाते थे। सुबह पहले बच्चे गुब्बारों में रंग भरते थे, फिर सब छत पर चढ़कर एक-दूसरे पर रंग डालते थे। दादी हमारे लिए गरम-गरम गुझिया और ठंडाई बनाती थीं, क्योंकि होली बिना गुझिया के अधूरी लगती है। उस उम्र में रंगों से डर नहीं लगता था — बस उत्साह और शोर था।\n\nअब मैं बड़ी हो गई हूँ और हम अमेरिका में रहते हैं, इसलिए होली वैसी नहीं होती। इस साल हमने अपने भारतीय दोस्तों को घर पर बुलाया और आँगन में थोड़ा रंग खेला। माँ ने गुझिया बनाने की कोशिश की, लेकिन बाज़ार का मैदा वैसा नहीं था जैसा गाँव में मिलता था। फिर भी सबने मिलकर बहुत हँसी-मज़ाक किया और पुराने गाने गाए।\n\nअगले साल अगर मेरी पढ़ाई की छुट्टियाँ मिलेंगी, तो मैं ज़रूर भारत जाऊँगी और अपनी बहन के साथ असली होली मनाऊँगी। मेरा मानना है कि त्योहार हमें सिर्फ़ खुशी नहीं देते, बल्कि हमें हमारी जड़ों से जोड़े रखते हैं।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'जब मैं छोटी थी, तब हम ... मनाते थे', note: 'Habitual past opens the essay. This is the single cleanest way to establish "childhood" as a tense zone distinct from "now".' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... क्योंकि', note: 'Three connectors in one paragraph — sequential + causal cohesion.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'दादी ... गुझिया और ठंडाई बनाती थीं', note: 'Festival-specific food items in habitual past — Topic Coverage + Language Control together.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'अब मैं बड़ी हो गई हूँ ... हमने ... बुलाया', note: 'Present state + past perfective (हमने बुलाया, माँ ने कोशिश की) inside one paragraph.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'जैसा गाँव में मिलता था', note: 'Relative/comparative construction — a complex structure raters listen for.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल अगर ... तो ... जाऊँगी', note: 'Conditional future closes the third time frame.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: 'Reflective closing generalizes the event. Benchmark 5 signature.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'हमें हमारी जड़ों से जोड़े रखते हैं', note: 'Register-appropriate figurative expression — not a forced idiom, but reads as idiomatic.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['जब... तब', 'पहले', 'फिर', 'क्योंकि', 'लेकिन', 'इसलिए', 'फिर भी', 'अगर... तो', 'सिर्फ़... बल्कि भी'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three distinct tense zones anchored by जब मैं छोटी थी (habitual past), अब (present), अगले साल (future) — textbook Intermediate-Mid tense layout.',
          'Habitual past (मनाते थे, बनाती थीं, डर नहीं लगता था) is maintained for a full paragraph before shifting to present — raters register this as "control of past time frame".',
          'Nine distinct connectors across the essay, including the high-value जब ... तब, अगर ... तो, and सिर्फ़ ... बल्कि भी. Text-Type 5 easily confirmed.',
          'Cultural specificity (ठंडाई, गुझिया, gaon-vs-foreign-flour contrast) and register-appropriate reflective closing both lift Topic Coverage.',
          'Gender agreement consistent with a feminine narrator (छोटी थी, बड़ी हो गई, जाऊँगी) — Language Control stable.',
        ],
        gotchas: [
          'Switching mid-essay from feminine to masculine self-reference (e.g. writing जाऊँगा after छोटी थी) would drop Language Control to Low immediately.',
          'Removing the future paragraph leaves only two tenses and caps this at Benchmark 4 despite strong vocabulary.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Each model essay explicitly stages the three tenses in three paragraphs — past (what happened / what we used to do), present (what is different now), future (what we will do). Copy this structural template. If your draft essay does not have at least one time marker per paragraph, rewrite before submitting.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने परिवार के एक यादगार त्योहार के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि पिछले साल आपने उसे कैसे मनाया, इस साल क्या अलग है, और अगले साल आप क्या करना चाहेंगे।',
      english:
        'Write three paragraphs about a memorable family festival. Describe how you celebrated it last year, what is different this year, and what you would like to do next year.',
      hint: {
        connectors: ['पहले', 'फिर', 'लेकिन', 'क्योंकि', 'अगर... तो'],
        vocab: ['त्योहार', 'दीया', 'रंगोली', 'मिठाई', 'परिवार', 'पिछले साल', 'अगले साल'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'अपने बचपन के किसी एक त्योहार की याद तीन अनुच्छेदों में लिखिए। बताइए कि उस दिन घर में क्या हुआ था, वह त्योहार अब कैसे बदल गया है, और आप अपने बच्चों को उस दिन के बारे में क्या बताएँगे।',
      english:
        'Write three paragraphs about a festival memory from your childhood. Describe what happened in the house that day, how that festival has changed for you now, and what you will tell your children about it someday.',
      hint: {
        connectors: ['जब... तब', 'इसके बाद', 'इसलिए', 'अंत में'],
        vocab: ['बचपन', 'उत्साह', 'दादी', 'सजाना', 'मनाना', 'उस दिन'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'एक विशेष अवसर (जन्मदिन, शादी, या किसी दोस्त का स्वागत समारोह) के बारे में तीन अनुच्छेदों में लिखिए। तैयारी, कार्यक्रम, और उस दिन की आपकी भावनाओं पर बात कीजिए।',
      english:
        'Write three paragraphs about a special occasion (birthday, wedding, or a friend\'s welcome gathering). Talk about the preparation, the event itself, and your feelings that day.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'क्योंकि', 'इसके अलावा'],
        vocab: ['उपहार', 'सजाना', 'बुलाना', 'उत्साह', 'खुशी', 'मनाना'],
        tenses: ['past', 'present'],
      },
    },
  ],
  promptsNote: {
    why:
      'Two of the three prompts explicitly ask for past + present + future. This is deliberate: FCPS festival prompts almost always invite a three-tense response, and raters score accordingly. The third prompt is a two-tense option for students who still need one more practice round before committing to all three time frames.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Festival essays are where the three rubric axes pull in the same direction — festival vocabulary fuels Topic Coverage, time markers fuel Text-Type, and the ने-construction fuels Language Control. Self-grade each draft: if you cannot point to a sentence per axis, the essay is not Benchmark 5 yet.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
