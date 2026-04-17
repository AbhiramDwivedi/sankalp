import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: 'L2-11-countries-directions',
  level: 2,
  themeGroup: 'ModernSociety',
  order: 23,
  heroMotif: 'temple',
  titleHindi: 'देश, नागरिकता और दिशाएँ',
  titleEnglish: 'Countries, Nationalities & Directions',
  hook: 'Postpositions (से, तक, की ओर) + country names - two essay-builder blocks in one pack.',
  heroPrompt: composeHeroPrompt(
    'A stylized world map with the Indian subcontinent centered, a compass rose at the top, flight paths arcing between India and the USA, soft earthy palette with gold inlay borders',
  ),

  rationale: {
    fcpsSubTopics: [
      'Countries and Nationalities (FCPS Level 2 - Vacation & Travel)',
      'Asking For and Giving Directions (FCPS Level 2 - Vacation & Travel)',
      'Cultural comparison between India and the US (FCPS Level 2 - Identity / Modern Society)',
    ],
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Name at least 8 countries and 8 nationalities in Hindi with correct gender',
      'Use compass directions (उत्तर/दक्षिण/पूर्व/पश्चिम) and relative directions (बाएँ/दाएँ/सीधा) in a single route description',
      'Describe the route from home to another place using source/destination postpositions (X से Y तक, की ओर)',
      'Compare India and the US in a single paragraph using से बेहतर, जबकि, दोनों में',
      'Include at least one diaspora-specific detail (Hindi at home, Indian grocery store in the US) to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Direction-giving and country-comparison prompts appear in every FCPS Vacation & Travel cluster. Without the postposition + compass-direction combo, the student writes "go straight then left" in choppy fragments rather than a cohesive route, capping Text-Type at Intermediate-Low.',
  },

  objectives: [
    { text: 'Describe a route in 3–4 sentences using at least three directional terms (बाएँ / दाएँ / सीधा / मुड़ना).', trains: ['LanguageControl', 'TextType'] },
    { text: 'Use compass directions (उत्तर / दक्षिण / पूर्व / पश्चिम) to place at least two countries relative to India.', trains: ['TopicCoverage'] },
    { text: 'Build one "X से Y तक" source-destination sentence per essay with the correct verb of motion.', trains: ['LanguageControl'] },
    { text: 'Compare India and the US (or India and another country) in at least three sentences using contrast connectors.', trains: ['TextType'] },
    { text: 'Include one diaspora specific (Hindi-speaking temple, Indian grocery, weekend Hindi class) to lift Topic Coverage.', trains: ['TopicCoverage', 'TextType'] },
  ],

  vocabulary: [
    // Countries
    { hindi: 'भारत', transliteration: 'bhaarat', english: 'India', exampleHindi: 'मेरा जन्म भारत में हुआ था।', exampleEnglish: 'I was born in India.', emoji: '🇮🇳', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'अमेरिका', transliteration: 'amerika', english: 'America / USA', exampleHindi: 'हम अमेरिका में रहते हैं।', exampleEnglish: 'We live in America.', emoji: '🇺🇸', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'इंग्लैंड', transliteration: 'england', english: 'England', exampleHindi: 'इंग्लैंड में बहुत बारिश होती है।', exampleEnglish: 'It rains a lot in England.', emoji: '🇬🇧', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'फ़्रांस', transliteration: 'france', english: 'France', exampleHindi: 'मेरे चाचा फ़्रांस में काम करते हैं।', exampleEnglish: 'My uncle works in France.', emoji: '🇫🇷', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'जापान', transliteration: 'japan', english: 'Japan', exampleHindi: 'जापान एशिया में है।', exampleEnglish: 'Japan is in Asia.', emoji: '🇯🇵', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'चीन', transliteration: 'cheen', english: 'China', exampleHindi: 'चीन भारत के उत्तर-पूर्व में है।', exampleEnglish: 'China is to the north-east of India.', emoji: '🇨🇳', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'जर्मनी', transliteration: 'jarmani', english: 'Germany', exampleHindi: 'जर्मनी की कारें बहुत मशहूर हैं।', exampleEnglish: 'German cars are very famous.', emoji: '🇩🇪', partOfSpeech: 'noun', subgroup: 'Countries' },
    { hindi: 'कनाडा', transliteration: 'kanaadaa', english: 'Canada', exampleHindi: 'कनाडा में बहुत ठंड पड़ती है।', exampleEnglish: 'It gets very cold in Canada.', emoji: '🇨🇦', partOfSpeech: 'noun', subgroup: 'Countries' },

    // Nationalities
    { hindi: 'भारतीय', transliteration: 'bhaarateey', english: 'Indian', exampleHindi: 'मेरे दादा-दादी भारतीय हैं।', exampleEnglish: 'My grandparents are Indian.', emoji: '👨‍🦱', partOfSpeech: 'adjective', subgroup: 'Nationalities' },
    { hindi: 'अमेरिकी', transliteration: 'amerikee', english: 'American', exampleHindi: 'मैं अमेरिकी भारतीय हूँ।', exampleEnglish: 'I am Indian-American.', emoji: '🗽', partOfSpeech: 'adjective', subgroup: 'Nationalities' },
    { hindi: 'अंग्रेज़', transliteration: 'angrez', english: 'English / British', exampleHindi: 'अंग्रेज़ लोग चाय पीते हैं।', exampleEnglish: 'British people drink tea.', emoji: '☕', partOfSpeech: 'noun', subgroup: 'Nationalities' },
    { hindi: 'फ्रांसीसी', transliteration: 'fransiseey', english: 'French', exampleHindi: 'फ्रांसीसी खाना बहुत लज़ीज़ है।', exampleEnglish: 'French food is very delicious.', emoji: '🥐', partOfSpeech: 'adjective', subgroup: 'Nationalities' },
    { hindi: 'जापानी', transliteration: 'jaapaanee', english: 'Japanese', exampleHindi: 'जापानी भाषा सीखना कठिन है।', exampleEnglish: 'Learning the Japanese language is hard.', emoji: '🗾', partOfSpeech: 'adjective', subgroup: 'Nationalities' },
    { hindi: 'चीनी', transliteration: 'cheenee', english: 'Chinese', exampleHindi: 'चीनी लोगों की अपनी लिपि है।', exampleEnglish: 'Chinese people have their own script.', emoji: '🥢', partOfSpeech: 'adjective', subgroup: 'Nationalities' },

    // Compass directions
    { hindi: 'उत्तर', transliteration: 'uttar', english: 'north', exampleHindi: 'हिमालय भारत के उत्तर में है।', exampleEnglish: 'The Himalayas are to the north of India.', emoji: '⬆️', partOfSpeech: 'noun', subgroup: 'Compass' },
    { hindi: 'दक्षिण', transliteration: 'dakshin', english: 'south', exampleHindi: 'केरल भारत के दक्षिण में है।', exampleEnglish: 'Kerala is in the south of India.', emoji: '⬇️', partOfSpeech: 'noun', subgroup: 'Compass' },
    { hindi: 'पूर्व', transliteration: 'poorv', english: 'east', exampleHindi: 'सूरज पूर्व से निकलता है।', exampleEnglish: 'The sun rises from the east.', emoji: '➡️', partOfSpeech: 'noun', subgroup: 'Compass' },
    { hindi: 'पश्चिम', transliteration: 'pashchim', english: 'west', exampleHindi: 'पश्चिम दिशा में समुद्र है।', exampleEnglish: 'There is a sea in the west.', emoji: '⬅️', partOfSpeech: 'noun', subgroup: 'Compass' },

    // Relative directions
    { hindi: 'बाएँ', transliteration: 'baayen', english: 'left', exampleHindi: 'मंदिर बाएँ हाथ पर है।', exampleEnglish: 'The temple is on the left hand.', emoji: '👈', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'दाएँ', transliteration: 'daayen', english: 'right', exampleHindi: 'दाएँ मुड़िए और सीधे जाइए।', exampleEnglish: 'Turn right and go straight.', emoji: '👉', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'सीधा', transliteration: 'seedha', english: 'straight', exampleHindi: 'सीधा जाओ, बाज़ार वहीं है।', exampleEnglish: 'Go straight, the market is right there.', emoji: '⬆️', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'आगे', transliteration: 'aage', english: 'ahead / forward', exampleHindi: 'आगे एक पुल आएगा।', exampleEnglish: 'A bridge will come ahead.', emoji: '▶️', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'पीछे', transliteration: 'peechhe', english: 'behind', exampleHindi: 'दुकान घर के पीछे है।', exampleEnglish: 'The shop is behind the house.', emoji: '◀️', partOfSpeech: 'adverb', subgroup: 'Directions' },

    // Direction verbs
    { hindi: 'मुड़ना', transliteration: 'mudna', english: 'to turn', exampleHindi: 'चौराहे पर बाएँ मुड़िए।', exampleEnglish: 'Turn left at the crossing.', emoji: '↩️', partOfSpeech: 'verb', subgroup: 'Direction verbs' },
    { hindi: 'रुकना', transliteration: 'rukna', english: 'to stop', exampleHindi: 'लाल बत्ती पर रुक जाइए।', exampleEnglish: 'Stop at the red light.', emoji: '🛑', partOfSpeech: 'verb', subgroup: 'Direction verbs' },
    { hindi: 'चलना', transliteration: 'chalna', english: 'to walk / go along', exampleHindi: 'इस रास्ते पर चलते रहिए।', exampleEnglish: 'Keep walking along this road.', emoji: '🚶', partOfSpeech: 'verb', subgroup: 'Direction verbs' },
    { hindi: 'पार करना', transliteration: 'paar karna', english: 'to cross', exampleHindi: 'सड़क पार कीजिए।', exampleEnglish: 'Cross the road.', emoji: '🚸', partOfSpeech: 'verb', subgroup: 'Direction verbs' },

    // Prepositions / locations
    { hindi: 'के पास', transliteration: 'ke paas', english: 'near', exampleHindi: 'स्कूल मेरे घर के पास है।', exampleEnglish: 'The school is near my home.', emoji: '📍', partOfSpeech: 'phrase', subgroup: 'Locations' },
    { hindi: 'के सामने', transliteration: 'ke saamne', english: 'in front of', exampleHindi: 'अस्पताल पार्क के सामने है।', exampleEnglish: 'The hospital is in front of the park.', emoji: '↪️', partOfSpeech: 'phrase', subgroup: 'Locations' },
    { hindi: 'की ओर', transliteration: 'ki or', english: 'towards', exampleHindi: 'पूर्व की ओर चलते रहिए।', exampleEnglish: 'Keep walking towards the east.', emoji: '🧭', partOfSpeech: 'phrase', subgroup: 'Locations' },
  ],
  vocabularyNote: {
    why: 'This pack\'s vocabulary pairs country-level geography with sentence-level direction-giving. Students writing about travel or a route need both sets simultaneously.',
    trains: ['TopicCoverage', 'LanguageControl'],
  },

  grammar: [
    {
      title: 'Source-destination: X से Y तक',
      rule: '"से" marks the source (from X), "तक" marks the destination or boundary (to/up to Y). The verb of motion agrees with the subject.',
      examples: [
        { hindi: 'मैं दिल्ली से आगरा तक ट्रेन से गया।', transliteration: 'main Dilli se Aagra tak train se gaya.', english: 'I went from Delhi to Agra by train.' },
        { hindi: 'हम घर से स्कूल तक पैदल चलते हैं।', transliteration: 'hum ghar se school tak paidal chalte hain.', english: 'We walk from home to school on foot.' },
        { hindi: 'भारत से अमेरिका तक का सफ़र लंबा है।', transliteration: 'bhaarat se amerika tak kaa safar lamba hai.', english: 'The journey from India to America is long.' },
      ],
      pitfall: 'Swapping से and तक is a common error - "मैं तक जाता हूँ" is meaningless. The source always takes से.',
      whyItMatters: 'The X से Y तक pattern is the single cleanest way to express motion in Hindi. Using it correctly twice in an essay demonstrates exactly the "preparatory phrases" feature the rubric rewards at Intermediate-Mid.',
    },
    {
      title: 'Compass direction: noun + के + direction + में',
      rule: 'To place X to the north/south of Y, use "Y के उत्तर/दक्षिण में X है". The noun takes oblique case before के.',
      examples: [
        { hindi: 'नेपाल भारत के उत्तर में है।', transliteration: 'nepaal bhaarat ke uttar mein hai.', english: 'Nepal is to the north of India.' },
        { hindi: 'कश्मीर भारत के सबसे उत्तर में है।', transliteration: 'kashmeer bhaarat ke sabse uttar mein hai.', english: 'Kashmir is in the farthest north of India.' },
        { hindi: 'अमेरिका भारत के पश्चिम में है।', transliteration: 'amerika bhaarat ke pashchim mein hai.', english: 'America is to the west of India.' },
      ],
      pitfall: 'Using the nominative case ("भारत के" not "भारत का") is easy to get wrong - के is required because a postposition (में) follows.',
      whyItMatters: 'Direction phrases are often the difference between an essay that reads like a list of facts and one that paints a map. Raters credit spatial reasoning.',
    },
    {
      title: 'Imperative for directions: -इए form',
      rule: 'Polite directions use the -इए form: मुड़िए (turn), जाइए (go), रुकिए (stop), पार कीजिए (cross). This is the register you\'d use when helping a stranger.',
      examples: [
        { hindi: 'सीधा जाइए और दूसरे चौराहे पर बाएँ मुड़िए।', transliteration: 'seedha jaaiye aur doosare chauraahe par baayen mudiye.', english: 'Go straight and turn left at the second crossing.' },
        { hindi: 'लाल बत्ती पर रुकिए।', transliteration: 'laal batti par rukiye.', english: 'Stop at the red light.' },
      ],
      pitfall: 'Using "तू जा" or "तुम जाओ" for giving directions to a stranger is too casual. Default to -इए on an exam.',
      whyItMatters: 'Register matters. Polite -इए directions signal the politeness Avant raters specifically credit as "appropriate use of target-language norms".',
    },
  ],
  grammarNote: {
    why: 'Three grammar moves cover 95% of what direction and country essays need: source/destination, compass placement, and polite imperatives.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors(['pahle','phir','iskeBaad','antMein','kyonki','lekin','isliye','jabTab']),
  connectorsNote: {
    why: 'Direction-giving is naturally sequential - पहले / फिर / इसके बाद / अंत में scaffold the route. The contrast connectors (लेकिन, जबकि) come in when comparing two countries or two routes.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरे घर से मंदिर तक · From My Home to the Temple',
    hindi: 'हमारा घर वर्जीनिया में है, और यहाँ से हमारा हिंदू मंदिर पाँच किलोमीटर दूर है। पहले मेरी माँ गाड़ी बाहर निकालती हैं। फिर हम मुख्य सड़क पर आते हैं और दाएँ मुड़ते हैं। इसके बाद हम सीधा दो मील जाते हैं, जब तक एक बड़ा चौराहा नहीं आता। चौराहे पर हम बाएँ मुड़ते हैं और पुल पार करते हैं। अंत में मंदिर पहाड़ी के ऊपर दिखता है। भारत में मंदिर हर मोहल्ले में होता था, लेकिन यहाँ अमेरिका में हमें गाड़ी से जाना पड़ता है। फिर भी, जब हम वहाँ पहुँचते हैं और घंटी बजती है, तब ऐसा लगता है कि हम भारत में ही हैं। यह दूरी रास्ते की है, मन की नहीं।',
    transliteration: 'hamaara ghar Virginia mein hai, aur yahaan se hamaara Hindu mandir paanch kilomeetar door hai. pahle meri maa gaadi baahar nikaalti hain. phir hum mukhya sadak par aate hain aur daayen mudte hain. iske baad hum seedha do meel jaate hain, jab tak ek bada chauraaha nahin aata. chauraahe par hum baayen mudte hain aur pul paar karte hain. ant mein mandir pahaadi ke oopar dikhta hai. bhaarat mein mandir har mohalle mein hota tha, lekin yahaan amerika mein hamein gaadi se jaana padta hai. phir bhi, jab hum vahaan pahunchte hain aur ghanti bajti hai, tab aisa lagta hai ki hum bhaarat mein hi hain. yah doori raaste ki hai, man ki nahin.',
    english: 'Our house is in Virginia, and from here our Hindu temple is five kilometers away. First my mother takes the car out. Then we come to the main road and turn right. After this we go straight for two miles, until a big crossing arrives. At the crossing we turn left and cross a bridge. Finally the temple appears on top of a hill. In India there used to be a temple in every neighborhood, but here in America we have to go by car. Even so, when we arrive there and the bell rings, it feels as if we are in India itself. This distance is of the road, not of the heart.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors scaffold the route - textbook Text-Type 5.' },
      { term: 'दाएँ मुड़ते हैं / बाएँ मुड़ते हैं / सीधा जाते हैं / पार करते हैं', note: 'Four direction verbs - complete route vocabulary in one paragraph.' },
      { term: 'भारत में ... लेकिन ... अमेरिका में', note: 'Cross-country comparison built into the route narrative.' },
      { term: 'यह दूरी रास्ते की है, मन की नहीं', note: 'Reflective closing - the IM hallmark reflective move.' },
    ],
    comprehensionQuestions: [
      { q: 'How far is the temple from the narrator\'s house?', a: 'पाँच किलोमीटर / five kilometers.' },
      { q: 'List the four direction verbs used in the passage.', a: 'मुड़ते हैं (twice - दाएँ and बाएँ), जाते हैं (सीधा), पार करते हैं (cross).' },
      { q: 'What is different between temples in India and in America, according to the narrator?', a: 'In India there was a temple in every neighborhood; in America they have to go by car.' },
      { q: 'Find one sequence connector and one contrast connector.', a: 'Sequence: पहले / फिर / इसके बाद / अंत में. Contrast: लेकिन / फिर भी.' },
      { q: 'What does the narrator mean by "यह दूरी रास्ते की है, मन की नहीं"?', a: 'The physical distance exists, but emotionally they still feel connected to India.' },
    ],
  },
  anchorNote: {
    why: 'This anchor weaves route-giving (practical directions) with cross-country comparison (India vs America diaspora context) in one passage - exactly the shape a Level-2 direction essay should take.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'sign',
      title: 'रास्ते का साइनबोर्ड',
      hindi: 'आगे दो किलोमीटर - दाहिने मुड़िए - सरकारी अस्पताल। धीरे चलिए।',
      transliteration: 'aage do kilomeetar - daahine mudiye - sarkaari aspataal. dheere chaliye.',
      english: 'Two kilometers ahead - turn right - government hospital. Drive slowly.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को पता',
      hindi: 'यार, मेट्रो स्टेशन से निकलकर बाएँ जाना। फिर दो सौ मीटर सीधा। मेरा घर पीले रंग का है - पार्क के सामने।',
      transliteration: 'yaar, metro station se niklakar baayen jaana. phir do sau meter seedha. mera ghar peele rang ka hai - park ke saamne.',
      english: 'Dude, after leaving the metro station go left. Then 200 meters straight. My house is yellow - in front of the park.',
    },
    {
      kind: 'letter',
      title: 'चाचा को पत्र',
      hindi: 'प्रिय चाचा जी, नमस्ते। आप भारत से अमेरिका कब आ रहे हैं? हमारा नया घर पुराने घर से पाँच मील दक्षिण में है। आप हवाई अड्डे से टैक्सी लीजिएगा - ड्राइवर को "मेपल स्ट्रीट" का पता दे दीजिएगा।',
      transliteration: 'priya chaacha ji, namaste. aap bhaarat se amerika kab aa rahe hain? hamaara naya ghar puraane ghar se paanch meel dakshin mein hai. aap havai adde se taxi leejiyega - driver ko "Maple Street" ka pataa de deejiyega.',
      english: 'Dear Uncle, namaste. When are you coming from India to America? Our new house is five miles south of the old house. Please take a taxi from the airport - give the driver the "Maple Street" address.',
    },
    {
      kind: 'announcement',
      title: 'हिंदी कक्षा की सूचना',
      hindi: 'शनिवार की हिंदी कक्षा मंदिर के पुस्तकालय कक्ष में होगी। पुस्तकालय मुख्य द्वार से सीधा, दूसरे तल पर है। समय: सुबह दस बजे।',
      transliteration: 'shanivaar ki hindi kakshaa mandir ke pustakaalaya kaksh mein hogi. pustakaalaya mukhya dvaar se seedha, doosre tal par hai. samay: subah das baje.',
      english: 'Saturday\'s Hindi class will be in the temple\'s library room. The library is straight from the main entrance, on the second floor. Time: 10 AM.',
    },
  ],
  modelTextsNote: {
    why: 'Four text types from the direction-giving register: a road sign, casual SMS directions, a formal letter, and a public announcement. Each shows the same directional vocabulary in a different register.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    { title: 'India\'s compass: geographic shorthand', body: 'Indians often describe regions by direction: उत्तर भारत (wheat, roti, harsh winters), दक्षिण भारत (rice, dosa, coastal). Using these terms reads as cultural literacy.', emoji: '🧭' },
    { title: 'Temples as landmarks', body: 'Even outside India, the Hindu temple is often a family\'s weekend anchor. Giving directions "to the temple" reads instantly for an Indian diaspora essay.', emoji: '🛕' },
    { title: 'Streets don\'t have names (in India)', body: 'In many Indian cities, directions are given by landmarks, not street names - "बैंक के सामने, लाल बिल्डिंग, पहले माले पर". This shapes how Hindi direction-giving works.', emoji: '🏢' },
    { title: 'Weekend Hindi class', body: 'Many US-born Indian kids attend Saturday Hindi classes at temples or community centers - a small diaspora detail that anchors an essay in lived experience.', emoji: '📚' },
  ],
  culturalNote: {
    why: 'Direction essays from a diaspora student feel authentic when they combine Indian cultural landmarks (temples, compass-region references) with the American geography the student actually navigates.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    { phrase: 'रास्ता दिखाना', literal: 'to show the road', meaning: 'To guide / to show the way (literal or metaphorical).', example: 'हमारे अध्यापक हमेशा हमें सही रास्ता दिखाते हैं।', exampleEnglish: 'Our teachers always show us the right way.' },
    { phrase: 'दोराहे पर खड़ा होना', literal: 'to stand at a crossroads', meaning: 'To be at a decision point / unable to choose.', example: 'दसवीं के बाद हर छात्र एक दोराहे पर खड़ा होता है।', exampleEnglish: 'After tenth grade, every student stands at a crossroads.' },
  ],
  muhavareNote: {
    why: 'Both idioms are road/direction-rooted and slot naturally into route or decision essays. One well-placed idiom lifts register to IM.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Home to school',
      prompt: 'अपने घर से अपने स्कूल (या किसी पसंदीदा जगह) तक का रास्ता तीन अनुच्छेदों में बताइए। भारत और अमेरिका के रास्तों की तुलना भी कीजिए।',
      novice: 'मेरा स्कूल पास है। मैं बस से जाता हूँ।',
      intermediateMid:
        'मेरा घर वर्जीनिया के एक छोटे शहर में है, और मेरा स्कूल घर से लगभग तीन मील दूर है। पहले मैं घर से निकलकर मुख्य सड़क पर आता हूँ, फिर दाएँ मुड़कर सीधा जाता हूँ। दो चौराहों के बाद मुझे एक पुल पार करना पड़ता है। अंत में स्कूल बाएँ हाथ पर पीले रंग की इमारत के रूप में दिखता है।\n\nपिछले साल हम भारत गए थे और मैंने देखा कि वहाँ के रास्ते बहुत अलग हैं। दादाजी का गाँव छोटा था, इसलिए वहाँ हर चीज़ पैदल की दूरी पर थी। मंदिर घर के ठीक सामने था, स्कूल बाज़ार के पीछे। कोई भी रास्ता पाँच मिनट से ज़्यादा नहीं लगता था।\n\nमुझे लगता है कि दोनों जगहों की अपनी सुंदरता है। अमेरिका में गाड़ी से जाना पड़ता है, जबकि भारत में पैदल चलकर हर किसी से मुलाक़ात हो जाती है। अगले साल जब मैं फिर भारत जाऊँगा, तो मैं अपनी बहन को वह गलियाँ ज़रूर दिखाऊँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले / फिर / अंत में', note: 'Three sequence connectors scaffold the route - Text-Type 5 signal.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'दाएँ मुड़कर / सीधा / बाएँ हाथ पर', note: 'Four direction terms in four sentences - Topic Coverage density.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'गए थे / देखा / था / लगता था', note: 'Paragraph shifts to past-perfective + past-habitual - rubric-rewarded shift.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'दादाजी का गाँव / मंदिर / बाज़ार', note: 'India-specific landmarks, not "a place" or "a store".' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'जबकि', note: 'Discourse-level contrast - an IM register marker.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'जाऊँगा / दिखाऊँगा', note: 'Future closer - third time frame sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'दोनों जगहों की अपनी सुंदरता है', note: 'Reflective synthesis - not description but a personal thesis.' },
      ],
      wordCount: 148,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'अंत में', 'इसलिए', 'जबकि', 'अगले साल जब'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Six distinct connectors including "जबकि" - discourse-level contrast marker raters specifically credit.',
          'Four direction terms + three sequence connectors in paragraph 1 - textbook route narrative.',
          'Three time frames cleanly separated by paragraph: present route → past visit → future plan.',
          'Diaspora-specific comparison (Virginia vs village) grounds the essay in lived experience.',
          'Reflective synthesis closing ("दोनों की अपनी सुंदरता है") elevates from description to argument.',
        ],
        gotchas: [
          'Dropping the India comparison would make the essay a flat route description and cap at Benchmark 4.',
          'Writing "स्कूल पर" instead of "स्कूल तक" is a postposition error raters catch.',
        ],
      },
    },
    {
      shortLabel: 'India vs USA',
      prompt: 'भारत और अमेरिका (या अपने वर्तमान देश) की तुलना तीन अनुच्छेदों में कीजिए। भौगोलिक स्थिति, भाषा, और संस्कृति पर लिखिए।',
      novice: 'भारत अच्छा है। अमेरिका भी अच्छा है।',
      intermediateMid:
        'भारत और अमेरिका - दो अलग महाद्वीप, दो अलग दुनिया। भौगोलिक रूप से, भारत एशिया के दक्षिण में है, जबकि अमेरिका पश्चिम में है। दोनों देशों के बीच समय का अंतर लगभग दस घंटे का है। मेरे दादा-दादी भारत में रहते हैं, और हम अमेरिका में।\n\nभाषा की बात करें, तो भारत में बाईस से ज़्यादा आधिकारिक भाषाएँ हैं, जबकि अमेरिका में ज़्यादातर अंग्रेज़ी चलती है। मेरे घर में हम हिंदी बोलते हैं, लेकिन स्कूल में अंग्रेज़ी। इसलिए मैं एक ऐसी दुनिया में बड़ा हो रहा हूँ जहाँ दो भाषाएँ साथ-साथ रहती हैं।\n\nमुझे लगता है कि दोनों देशों की अपनी ताक़त है। भारत मुझे परंपरा और रिश्ते सिखाता है, जबकि अमेरिका अवसर और खुलापन देता है। अगले साल अगर मौक़ा मिला, तो मैं दोनों जगह के बीच कुछ ऐसा करना चाहूँगा जिसमें दोनों के अच्छे पहलू एक साथ हों।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'महाद्वीप / दक्षिण / पश्चिम', note: 'Geographic vocabulary used precisely - Topic Coverage signal.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'जबकि', note: 'Contrast connector twice - discourse density.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'भाषा की बात करें, तो', note: 'Topic-shift opener - a sophisticated discourse marker.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'बाईस ... आधिकारिक भाषाएँ', note: 'Accurate India fact - raters reward specificity over "many languages".' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'दोनों देशों की अपनी ताक़त है', note: 'Balanced synthesis - the hallmark reflective IM move.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर ... तो', note: 'Conditional future - third time frame.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'सिखाता है / देता है / चाहूँगा', note: 'Present-habitual beside future-desiderative.' },
      ],
      wordCount: 147,
      tenseUsed: ['present', 'future'],
      connectorsUsed: ['जबकि', 'लेकिन', 'इसलिए', 'अगर... तो', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three-part comparison structure (geography / language / culture) mirrors a classic IM thesis shape.',
          '"जबकि" used three times at discourse level - a Benchmark-5 marker raters look for.',
          'Specific factual content ("बाईस से ज़्यादा भाषाएँ") - raters reward accuracy over generality.',
          'Balanced synthesis closing names both countries\' strengths rather than picking a winner.',
          'Conditional future closer adds the third time frame.',
        ],
        gotchas: [
          'The essay is past-tense-light; students should add one past anecdote to strengthen Language Control signal.',
          'Writing "भारत है दक्षिण में" instead of "भारत ... के दक्षिण में है" would drop postposition agreement.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why: 'Two Benchmark-5 essays in the two likely FCPS shapes: a diaspora route narrative and a two-country comparison. Both central to a Hindi-speaking American teen\'s FCPS writing prompt.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    { hindi: 'अपने घर से किसी पसंदीदा जगह तक का रास्ता तीन अनुच्छेदों में समझाइए। दिशाएँ और चिन्ह शामिल कीजिए।', english: 'Explain the route from your home to a favorite place in three paragraphs. Include directions and landmarks.', hint: { connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में'], vocab: ['बाएँ', 'दाएँ', 'सीधा', 'मुड़िए'], tenses: ['present'] } },
    { hindi: 'भारत और अपने वर्तमान देश की तुलना तीन अनुच्छेदों में कीजिए। भौगोलिक स्थिति, खाना, और भाषा पर लिखिए।', english: 'Compare India and your current country in three paragraphs. Write about geography, food, and language.', hint: { connectors: ['जबकि', 'लेकिन', 'मुझे लगता है कि'], vocab: ['उत्तर', 'दक्षिण', 'भाषा', 'संस्कृति'], tenses: ['present', 'past'] } },
    { hindi: 'अगर आप दुनिया के किसी भी देश में एक महीने के लिए जा सकते, तो कहाँ जाते और क्यों? तीन अनुच्छेदों में लिखिए।', english: 'If you could go to any country in the world for a month, where would you go and why? Write in three paragraphs.', hint: { connectors: ['अगर... तो', 'क्योंकि', 'इसलिए'], vocab: ['देश', 'संस्कृति', 'भाषा', 'घूमना'], tenses: ['future'] } },
  ],
  promptsNote: {
    why: 'Three shapes cover every direction/country prompt FCPS uses: route narrative, cross-country comparison, and hypothetical travel. Practicing all three locks the topic.',
    trains: ['TextType'],
  },

  rubricNote: {
    why: 'A Level-2 direction essay must include at least three direction terms, one sequence connector, and one cultural specific. The self-check ensures all three appear.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
