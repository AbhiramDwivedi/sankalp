import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// TENSE-SHOWCASE PACK
// Weather and Seasons naturally forces past (last monsoon), present (current
// season), and future (next season plans). This pack is the place where a
// student stops writing one-time-frame essays and starts shifting tenses in
// a controlled way — the single clearest signal of Benchmark 5.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-09-weather-seasons',
  level: 1,
  themeGroup: 'Identity',
  order: 9,
  heroMotif: 'umbrella',
  titleHindi: 'मौसम और ऋतुएँ',
  titleEnglish: 'Weather & Seasons',
  hook: 'Seasons force tense variety — summers were hot, winters will be cold, it is raining now.',
  heroPrompt: composeHeroPrompt(
    'A four-panel tableau of Indian seasons: monsoon downpour with umbrellas over a Mumbai street, summer sun over a mango tree in Lucknow, winter mist with shawls at a Delhi morning market, spring mustard fields in Punjab',
  ),

  rationale: {
    fcpsSubTopics: [
      'Weather and Seasons (FCPS Level 1 — Social Life)',
      'Daily activities linked to weather (FCPS Level 1)',
      'Bridges into Travel and Geography (FCPS Level 2) for season-linked trips',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Describe a current, past, and upcoming season in one 3-paragraph essay',
      'Use impersonal weather constructions (बहुत गरमी है, बारिश हो रही है) without calquing English',
      'Name all six traditional Indian seasons and at least 8 weather nouns unaided',
      'Shift between past-imperfective (हम हर गर्मी में जाते थे) and simple future (अगले हफ़्ते बारिश होगी)',
      'Tie a season to a festival or cultural practice (monsoon, Holi, Diwali) to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Weather is the easiest, most natural on-ramp to three-tense writing. Skipping this pack means the student arrives at the exam still writing single-tense essays — an automatic Benchmark 4 ceiling.',
  },

  objectives: [
    {
      text: 'Name all six traditional Indian seasons in Devanagari without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Write correctly the three weather constructions बारिश हो रही है, बहुत गरमी है, and बर्फ़ गिरेगी.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Produce one 3-paragraph essay that shifts past → present → future across the paragraph boundaries.',
      trains: ['TextType'],
    },
    {
      text: 'Use the past-imperfective habitual (हम हर गर्मी में जाते थे) at least once in a model essay.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Include one India-specific weather/season cultural marker (monsoon, Holi, hill station, mango season) per essay.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Six Indian seasons
    { hindi: 'वसंत', transliteration: 'vasant', english: 'spring', exampleHindi: 'वसंत में फूल खिलते हैं।', exampleEnglish: 'Flowers bloom in spring.', emoji: '🌸', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'ग्रीष्म', transliteration: 'greeshm', english: 'summer', exampleHindi: 'ग्रीष्म ऋतु में बहुत गरमी होती है।', exampleEnglish: 'It gets very hot in the summer season.', emoji: '☀️', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'वर्षा', transliteration: 'varsha', english: 'monsoon / rainy season', exampleHindi: 'वर्षा ऋतु जून में शुरू होती है।', exampleEnglish: 'The monsoon season begins in June.', emoji: '🌧️', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'शरद', transliteration: 'sharad', english: 'autumn / early autumn', exampleHindi: 'शरद ऋतु में आकाश साफ़ होता है।', exampleEnglish: 'The sky is clear in autumn.', emoji: '🍂', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'हेमंत', transliteration: 'hemant', english: 'pre-winter', exampleHindi: 'हेमंत में सुबह ठंडी होने लगती है।', exampleEnglish: 'Mornings start getting cold in hemant.', emoji: '🌾', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'शिशिर', transliteration: 'shishir', english: 'deep winter', exampleHindi: 'शिशिर में पेड़ों के पत्ते गिर जाते हैं।', exampleEnglish: 'In deep winter the leaves of trees fall.', emoji: '❄️', partOfSpeech: 'noun', subgroup: 'Seasons' },

    // Weather nouns
    { hindi: 'मौसम', transliteration: 'mausam', english: 'weather', exampleHindi: 'आज मौसम बहुत सुहावना है।', exampleEnglish: 'The weather is very pleasant today.', emoji: '🌤️', partOfSpeech: 'noun', subgroup: 'Weather' },
    { hindi: 'धूप', transliteration: 'dhoop', english: 'sunshine', exampleHindi: 'सुबह की धूप अच्छी लगती है।', exampleEnglish: 'Morning sunshine feels good.', emoji: '🌞', partOfSpeech: 'noun', subgroup: 'Weather' },
    { hindi: 'बारिश', transliteration: 'baarish', english: 'rain', exampleHindi: 'कल रात बहुत तेज़ बारिश हुई।', exampleEnglish: 'It rained very heavily last night.', emoji: '🌧️', partOfSpeech: 'noun', subgroup: 'Weather' },
    { hindi: 'बादल', transliteration: 'baadal', english: 'cloud(s)', exampleHindi: 'आकाश में काले बादल छाए हैं।', exampleEnglish: 'Dark clouds have gathered in the sky.', emoji: '☁️', partOfSpeech: 'noun', subgroup: 'Weather' },
    { hindi: 'बर्फ़', transliteration: 'barf', english: 'snow', exampleHindi: 'पहाड़ों पर बर्फ़ गिर रही है।', exampleEnglish: 'Snow is falling in the mountains.', emoji: '🌨️', partOfSpeech: 'noun', subgroup: 'Weather' },
    { hindi: 'आँधी', transliteration: 'aandhi', english: 'dust storm / gale', exampleHindi: 'गर्मियों में अक्सर आँधी आती है।', exampleEnglish: 'Dust storms often come in the summer.', emoji: '🌪️', partOfSpeech: 'noun', subgroup: 'Weather' },
    { hindi: 'ओले', transliteration: 'ole', english: 'hailstones', exampleHindi: 'कल दोपहर को ओले गिरे।', exampleEnglish: 'Hailstones fell yesterday afternoon.', emoji: '🧊', partOfSpeech: 'noun', subgroup: 'Weather' },

    // Temperature / feel
    { hindi: 'गरम', transliteration: 'garam', english: 'hot / warm', exampleHindi: 'चाय अभी भी गरम है।', exampleEnglish: 'The tea is still hot.', emoji: '🔥', partOfSpeech: 'adjective', subgroup: 'Temperature' },
    { hindi: 'ठंडा', transliteration: 'thanda', english: 'cold', exampleHindi: 'पानी बहुत ठंडा है।', exampleEnglish: 'The water is very cold.', emoji: '🥶', partOfSpeech: 'adjective', subgroup: 'Temperature' },
    { hindi: 'सुहावना', transliteration: 'suhaavna', english: 'pleasant', exampleHindi: 'बारिश के बाद मौसम सुहावना हो जाता है।', exampleEnglish: 'After the rain the weather becomes pleasant.', emoji: '🌈', partOfSpeech: 'adjective', subgroup: 'Temperature' },
    { hindi: 'गुनगुना', transliteration: 'gungunaa', english: 'lukewarm / mild', exampleHindi: 'नवंबर की धूप गुनगुनी होती है।', exampleEnglish: 'The November sunshine is mild.', emoji: '🌅', partOfSpeech: 'adjective', subgroup: 'Temperature' },

    // Weather verbs
    { hindi: 'बरसना', transliteration: 'barasna', english: 'to rain / to pour', exampleHindi: 'आज सुबह से बादल बरस रहे हैं।', exampleEnglish: 'Clouds have been pouring since morning.', emoji: '☔', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'चमकना', transliteration: 'chamakna', english: 'to shine / to flash', exampleHindi: 'आकाश में बिजली चमक रही है।', exampleEnglish: 'Lightning is flashing in the sky.', emoji: '⚡', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'झमाझम होना', transliteration: 'jhamaajham hona', english: 'to pour heavily', exampleHindi: 'कल रात बारिश झमाझम हुई।', exampleEnglish: 'Last night it rained heavily.', emoji: '🌊', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'गिरना', transliteration: 'girna', english: 'to fall (rain/snow/hail)', exampleHindi: 'सर्दियों में तापमान बहुत गिरता है।', exampleEnglish: 'Temperature falls a lot in winter.', emoji: '⬇️', partOfSpeech: 'verb', subgroup: 'Verbs' },

    // Clothing & activities tie-in
    { hindi: 'छाता', transliteration: 'chhaata', english: 'umbrella', exampleHindi: 'बारिश में छाता ले जाना पड़ता है।', exampleEnglish: 'One has to take an umbrella in the rain.', emoji: '☂️', partOfSpeech: 'noun', subgroup: 'Gear' },
    { hindi: 'स्वेटर', transliteration: 'svetar', english: 'sweater', exampleHindi: 'दादी ने मेरे लिए एक ऊनी स्वेटर बुना।', exampleEnglish: 'Grandma knitted a woolen sweater for me.', emoji: '🧥', partOfSpeech: 'noun', subgroup: 'Gear' },
    { hindi: 'कोट', transliteration: 'kot', english: 'coat', exampleHindi: 'सर्दियों में मैं काला कोट पहनता हूँ।', exampleEnglish: 'I wear a black coat in winter.', emoji: '🧥', partOfSpeech: 'noun', subgroup: 'Gear' },
    { hindi: 'पंखा', transliteration: 'pankha', english: 'fan', exampleHindi: 'गर्मियों में पंखा दिनभर चलता है।', exampleEnglish: 'In summer the fan runs all day.', emoji: '🪭', partOfSpeech: 'noun', subgroup: 'Gear' },
    { hindi: 'ए.सी.', transliteration: 'A.C.', english: 'air conditioner', exampleHindi: 'मई में ए.सी. के बिना नहीं रह सकते।', exampleEnglish: 'One cannot live without an AC in May.', emoji: '❄️', partOfSpeech: 'noun', subgroup: 'Gear' },

    // Cultural tie-ins
    { hindi: 'आम', transliteration: 'aam', english: 'mango (summer fruit)', exampleHindi: 'गर्मियों में हम रोज़ आम खाते हैं।', exampleEnglish: 'In summer we eat mangoes every day.', emoji: '🥭', partOfSpeech: 'noun', subgroup: 'Cultural' },
    { hindi: 'हिल स्टेशन', transliteration: 'hill station', english: 'hill station', exampleHindi: 'गर्मियों में लोग हिल स्टेशन जाते हैं।', exampleEnglish: 'People go to hill stations in the summer.', emoji: '⛰️', partOfSpeech: 'noun', subgroup: 'Cultural' },
    { hindi: 'ऋतु', transliteration: 'ritu', english: 'season (formal)', exampleHindi: 'भारत में छह ऋतुएँ होती हैं।', exampleEnglish: 'There are six seasons in India.', emoji: '🗓️', partOfSpeech: 'noun', subgroup: 'Seasons' },
  ],
  vocabularyNote: {
    why:
      'These 30 items cover every weather-prompt the student will see on FCPS: the six traditional ऋतुएँ, the eight weather nouns, a full temperature scale, the four verbs actually used in monsoon sentences, and the gear/cultural hooks that lift Topic-Coverage. Every word appears later in this pack.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Present-continuous weather: बारिश हो रही है',
      rule:
        'Weather events in progress use हो रहा/रही/रहे है — NOT the English-style "it is raining" with a dummy subject. The subject is the weather noun itself (बारिश, बर्फ़, ओले), and the verb agrees with it in gender and number.',
      examples: [
        { hindi: 'बाहर बारिश हो रही है।', transliteration: 'baahar baarish ho rahi hai.', english: 'It is raining outside. (बारिश is feminine → हो रही है)' },
        { hindi: 'पहाड़ों पर बर्फ़ गिर रही है।', transliteration: 'pahaadon par barf gir rahi hai.', english: 'Snow is falling in the mountains.' },
        { hindi: 'बादल गरज रहे हैं।', transliteration: 'baadal garaj rahe hain.', english: 'Clouds are thundering. (बादल masculine plural → रहे हैं)' },
      ],
      pitfall:
        'Writing "यह बारिश हो रहा है" (dummy subject + masculine agreement) is the single most common error. Hindi does not use a dummy "it" — drop "यह" and let the weather noun agree directly.',
      whyItMatters:
        'Weather prompts almost always ask about current conditions. Getting this construction right once signals to the rater that you control Hindi syntax, not English translated word-for-word — a fast Language Control win.',
    },
    {
      title: 'Impersonal constructions: बहुत गरमी है / सर्दी है',
      rule:
        'To say "it is hot / cold / pleasant", Hindi uses a noun + है structure: बहुत गरमी है (there is much heat), बहुत सर्दी है (there is much cold). Do NOT use मौसम + adjective alone — "मौसम गरम है" sounds odd; prefer "मौसम बहुत गरम है" or the noun form.',
      examples: [
        { hindi: 'आज बहुत गरमी है।', transliteration: 'aaj bahut garmi hai.', english: 'It is very hot today.' },
        { hindi: 'दिल्ली में दिसंबर में बहुत सर्दी होती है।', transliteration: 'dilli mein disambar mein bahut sardi hoti hai.', english: 'It gets very cold in Delhi in December.' },
        { hindi: 'बारिश के बाद मौसम सुहावना हो जाता है।', transliteration: 'baarish ke baad mausam suhaavna ho jaata hai.', english: 'After rain the weather becomes pleasant.' },
      ],
      pitfall:
        'Students often say "मैं गरम हूँ" meaning "I am hot" — but this means "I am warm-natured". For "I feel hot" use "मुझे गरमी लग रही है".',
      whyItMatters:
        'Impersonal constructions are an Intermediate-Mid marker on the rubric. Using गरमी है / सर्दी है / बारिश हो रही है in the same essay demonstrates "control of simple Hindi idioms" — raters mark this specifically.',
    },
    {
      title: 'Past-imperfective habitual: हम हर गर्मी में जाते थे',
      rule:
        'For habits in the past ("we used to go every summer"), Hindi uses the imperfective participle + था/थी/थे. Formula: verb stem + ता/ती/ते + था/थी/थे. Subject-verb agreement in gender/number.',
      examples: [
        { hindi: 'बचपन में हम हर गर्मी में नानी के घर जाते थे।', transliteration: 'bachpan mein hum har garmi mein naani ke ghar jaate the.', english: 'As children, we used to go to Grandma\'s every summer.' },
        { hindi: 'मेरी दादी सर्दियों में गरम हलवा बनाती थीं।', transliteration: 'meri daadi sardiyon mein garam halwa banaati theen.', english: 'My grandma used to make hot halwa in winters.' },
        { hindi: 'पहले बारिश जून में शुरू होती थी।', transliteration: 'pahle baarish joon mein shuroo hoti thi.', english: 'Earlier, the rain used to start in June.' },
      ],
      pitfall:
        'Students jump straight to simple past (गए — "went one time") when they mean "used to go repeatedly". Habitual requires ते थे, not गए/गयीं.',
      whyItMatters:
        'Benchmark 5 explicitly rewards "some control of past, present, AND future time frames." The habitual past is the cleanest, lowest-risk way to produce a past frame without needing the complex ने construction.',
    },
    {
      title: 'Simple future for weather plans: अगले हफ़्ते बारिश होगी',
      rule:
        'Future uses verb stem + ga/gi/ge + a/i/e for gender/number. होगा/होगी/होंगे for होना. Crucial for essays that project next season or next trip.',
      examples: [
        { hindi: 'अगले हफ़्ते बारिश होगी।', transliteration: 'agle hafte baarish hogi.', english: 'It will rain next week. (बारिश f → होगी)' },
        { hindi: 'मैं गर्मियों में शिमला जाऊँगा।', transliteration: 'main garmiyon mein shimla jaaoonga.', english: 'I will go to Shimla in summer. (m speaker)' },
        { hindi: 'हम होली पर रंग खेलेंगे।', transliteration: 'hum holi par rang khelenge.', english: 'We will play with colors on Holi.' },
      ],
      pitfall:
        'Writing जाऊँगी when the speaker is male, or होगा when the subject is बारिश (feminine), is an agreement error raters catch immediately.',
      whyItMatters:
        'The future frame is the third pillar of Benchmark 5. Even one correctly-formed future sentence at the end of an essay ("next summer I will...") locks in the three-time-frame requirement.',
    },
  ],
  grammarNote: {
    why:
      'Weather and seasons are the one topic where past-imperfective, present-continuous, and simple-future all show up naturally. If the student nails these four constructions, the Benchmark 5 requirement of "some control of major time frames" is handled structurally — not by accident.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'jabTab',
    'agarTo',
  ]),
  connectorsNote: {
    why:
      'This set is tuned to weather writing. जब...तब is how you narrate "when the rain started, everyone..."; अगर...तो handles the hypothetical ("if it snows, we will..."); क्योंकि / इसलिए bind weather to consequence (hot → AC on). Past, present, and future all get a connector each.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मुंबई का मानसून · Mumbai\'s Monsoon',
    hindi:
      'मुंबई में जून के महीने में मानसून आता है। पहले आकाश में काले बादल छा जाते हैं, फिर अचानक झमाझम बारिश शुरू होती है। सड़कों पर पानी भर जाता है और लोग छाते लेकर दौड़ते हैं। बच्चे कागज़ की नाव बनाते हैं और पानी में छोड़ते हैं। चाय वाले के पास भीड़ लग जाती है, क्योंकि बारिश में गरम अदरक वाली चाय सबको पसंद आती है। पिछले साल हम पहली बारिश में भीग गए थे, लेकिन बहुत मज़ा आया। इसके अलावा, मानसून के बाद हवा सुहावनी हो जाती है और पेड़ एकदम हरे लगते हैं। अगर अगले महीने छुट्टी मिली, तो मैं फिर से मुंबई जाऊँगा — सिर्फ़ बारिश देखने के लिए।',
    transliteration:
      'mumbai mein joon ke mahine mein maansoon aata hai. pahle aakaash mein kaale baadal chha jaate hain, phir achaanak jhamaajham baarish shuru hoti hai. sadakon par paani bhar jaata hai aur log chhaate lekar daudte hain. bachche kaagaz ki naav banaate hain aur paani mein chhodte hain. chaay vaale ke paas bheed lag jaati hai, kyonki baarish mein garam adarak vaali chaay sabko pasand aati hai. pichhle saal hum pahli baarish mein bheeg gaye the, lekin bahut mazaa aaya. iske alawa, maansoon ke baad hawa suhaavni ho jaati hai aur ped ekdam hare lagte hain. agar agle mahine chhutti mili, to main phir se mumbai jaaoonga — sirf baarish dekhne ke liye.',
    english:
      'The monsoon arrives in Mumbai in June. First, dark clouds spread across the sky, then suddenly heavy rain begins. Water floods the streets and people run with umbrellas. Children make paper boats and float them in the water. A crowd gathers around the tea-seller, because everyone loves hot ginger tea in the rain. Last year we got drenched in the first rain, but it was great fun. Besides, after the monsoon the air becomes pleasant and the trees look completely green. If I get leave next month, I will go to Mumbai again — just to see the rain.',
    highlights: [
      { term: 'पहले / फिर / इसके अलावा', note: 'Three sequence/addition connectors scaffold the paragraph — Text-Type 5 structure in a single passage.' },
      { term: 'आता है / हो रही है / गए थे / जाऊँगा', note: 'Four different tenses in 130 words: habitual present, past-perfective, and future. This is the model for a Benchmark 5 essay.' },
      { term: 'झमाझम बारिश / काले बादल / सुहावनी हवा', note: 'Authentic monsoon vocabulary — not "बहुत बारिश". Raters reward precision.' },
      { term: 'अदरक वाली चाय / कागज़ की नाव', note: 'Two India-specific cultural details in one paragraph — lifts Topic Coverage above generic weather essays.' },
      { term: 'अगर ... तो ... जाऊँगा', note: 'Conditional + future closing — the exact move Benchmark 5 essays use.' },
    ],
    comprehensionQuestions: [
      { q: 'In which month does the Mumbai monsoon arrive?', a: 'जून में (in June).' },
      { q: 'What two things do children do when the rain starts?', a: 'कागज़ की नाव बनाते हैं और पानी में छोड़ते हैं (they make paper boats and float them in the water).' },
      { q: 'Why do people crowd around the tea-seller?', a: 'क्योंकि बारिश में गरम अदरक वाली चाय पसंद आती है (because everyone likes hot ginger tea in the rain).' },
      { q: 'What happened to the narrator last year in the first rain?', a: 'वे भीग गए थे, लेकिन मज़ा आया (they got drenched, but had fun).' },
      { q: 'Name one thing that happens AFTER the monsoon.', a: 'हवा सुहावनी हो जाती है और पेड़ हरे लगते हैं (the air becomes pleasant and trees look green).' },
      { q: 'Identify one tense other than the present and give the sentence.', a: 'Past: "हम भीग गए थे" / Future: "मैं जाऊँगा".' },
      { q: 'Find two connectors and explain what each does.', a: 'क्योंकि gives a reason (rain → hot tea); अगर...तो sets up the conditional future (if leave → will go).' },
    ],
  },
  anchorNote: {
    why:
      'This anchor packs every grammar move the pack teaches into one 130-word narrative: present-habitual opening, past-perfective middle, conditional-future closing. Read it aloud three times before attempting an essay — the tense shifts should start to feel automatic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'diary',
      title: 'सर्दियों की सुबह · A Winter Morning',
      hindi:
        'आज दिल्ली में बहुत सर्दी है। सुबह छह बजे उठा तो बाहर घना कोहरा था। मैंने ऊनी स्वेटर और काला कोट पहना, क्योंकि बिना उसके बाहर जाना मुश्किल है। माँ ने गरम अदरक वाली चाय बनाई। अगले हफ़्ते शायद तापमान और गिरेगा।',
      transliteration:
        'aaj dilli mein bahut sardi hai. subah chhe baje utha to baahar ghana kohra tha. maine ooni svetar aur kaala kot pahna, kyonki bina uske baahar jaana mushkil hai. maa ne garam adarak vaali chaay banaai. agle hafte shaayad taapmaan aur giregaa.',
      english:
        'It is very cold in Delhi today. When I got up at six, it was densely foggy outside. I put on a woolen sweater and a black coat, because going out without them is difficult. Mom made hot ginger tea. Next week the temperature will probably fall further.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे यार! यहाँ झमाझम बारिश हो रही है 🌧️ स्कूल छूट गया। तुम्हारे यहाँ कैसा मौसम है? कल पिकनिक कैंसल कर दें क्या? अगर बादल हटे तो बताना।',
      transliteration:
        'are yaar! yahaan jhamaajham baarish ho rahi hai. school chhoot gaya. tumhaare yahaan kaisa mausam hai? kal picnic cancel kar den kya? agar baadal hate to bataana.',
      english:
        'Hey buddy! It\'s pouring here, school got canceled. How\'s the weather at your place? Should we cancel the picnic tomorrow? Let me know if the clouds clear.',
    },
    {
      kind: 'announcement',
      title: 'मौसम विभाग की सूचना · Weather Department Notice',
      hindi:
        'सूचना: अगले दो दिनों में उत्तर भारत में तेज़ आँधी और ओले गिरने की संभावना है। किसानों से अनुरोध है कि अपनी फ़सल सुरक्षित रखें। शहरवासी छाता साथ रखें। आपात स्थिति में 112 पर कॉल करें।',
      transliteration:
        'soochana: agle do dinon mein uttar bhaarat mein tez aandhi aur ole girne ki sambhaavna hai. kisaanon se anurodh hai ki apni fasal surakshit rakhein. shaharvaasi chhaata saath rakhein. aapaat sthiti mein 112 par call karein.',
      english:
        'Notice: In the next two days, strong dust storms and hailstorms are possible in North India. Farmers are requested to keep their crops safe. City residents should keep an umbrella. In an emergency, call 112.',
    },
    {
      kind: 'letter',
      title: 'नानी को पत्र · Letter to Grandma',
      hindi:
        'प्यारी नानी, आप कैसी हैं? यहाँ अब वसंत आ गया है और बाग में आम के पेड़ पर फूल खिले हैं। पिछले साल गर्मी में हम आपके गाँव आए थे, तब आपने आम तोड़कर दिए थे। अगर इस बार भी छुट्टी मिली, तो हम ज़रूर आएँगे। माँ को आपकी बहुत याद आती है।',
      transliteration:
        'pyaari naani, aap kaisi hain? yahaan ab vasant aa gaya hai aur baag mein aam ke ped par phool khile hain. pichhle saal garmi mein hum aapke gaon aaye the, tab aapne aam todkar diye the. agar is baar bhi chhutti mili, to hum zaroor aayenge. maa ko aapki bahut yaad aati hai.',
      english:
        'Dear Grandma, how are you? Spring has come here now and flowers have bloomed on the mango tree in the garden. Last year in summer we came to your village — you had plucked mangoes for us. If we get leave this time too, we will definitely come. Mom misses you a lot.',
    },
  ],
  modelTextsNote: {
    why:
      'Four text-types, four registers — a diary (personal reflection), an SMS (casual), an official notice (formal), and a family letter (affectionate formal). Each one shows the same tense machinery (present + past + future) in a different voice. Imitate the one that matches your prompt.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Six Seasons, Not Four',
      body:
        'The traditional Hindu calendar recognizes six ऋतुएँ — वसंत (spring), ग्रीष्म (summer), वर्षा (monsoon), शरद (autumn), हेमंत (pre-winter), शिशिर (deep winter). Using even one of these names instead of the generic "सर्दी / गर्मी" signals serious cultural literacy to a rater.',
      emoji: '🗓️',
    },
    {
      title: 'Monsoon is Celebrated, Not Endured',
      body:
        'Unlike in many Western cultures, the monsoon is welcomed in India with songs (मल्हार राग), festival foods (पकौड़े और चाय), and poetry. Writing "I love the rain" reads as childish; writing "मानसून में पकौड़े और चाय की महफ़िल सजती है" is culture-on-the-page.',
      emoji: '🌧️',
    },
    {
      title: 'Holi = Spring, Diwali = Autumn',
      body:
        'Every major Indian festival is tied to a season. Holi ushers in वसंत with colors and mustard fields; Diwali marks शरद with oil lamps and the post-monsoon harvest. Linking the season to its festival gives you an automatic essay hook.',
      emoji: '🎨',
    },
    {
      title: 'Hill Stations and the Summer Migration',
      body:
        'In May and June, families from North India traditionally migrate to hill stations — Shimla, Mussoorie, Nainital, Darjeeling — to escape the heat. "हर गर्मी में हम नानी के साथ मसूरी जाते थे" is the single most reliable past-habitual sentence you can write.',
      emoji: '⛰️',
    },
    {
      title: 'Mango Season = Summer\'s Compensation',
      body:
        'North Indian summers (April–June) are brutal, but they bring आम — the king of fruits. Dussehri, Langda, Alphonso each ripen in a different week. Writing "गर्मी बुरी थी, लेकिन आम बहुत मीठे थे" packs a contrast connector AND cultural specificity in one sentence.',
      emoji: '🥭',
    },
  ],
  culturalNote: {
    why:
      'Weather essays are the easiest place to sound generic ("it is hot, I like winter"). Each of these five hooks — the six-season calendar, monsoon celebration, festivals, hill stations, mango season — is a pre-packaged cultural upgrade that costs zero extra grammar.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'नौ दो ग्यारह होना',
      literal: 'to become nine-two-eleven',
      meaning: 'To flee / disappear quickly (often used when someone runs at the first sign of rain or trouble).',
      example: 'बारिश शुरू होते ही बच्चे नौ दो ग्यारह हो गए।',
      exampleEnglish: 'The moment the rain began, the children vanished.',
    },
    {
      phrase: 'आसमान से बातें करना',
      literal: 'to talk to the sky',
      meaning: 'To soar very high; often used for a kite, a price, or — on a hot day — the temperature.',
      example: 'मई में दिल्ली का तापमान आसमान से बातें करने लगता है।',
      exampleEnglish: 'In May, Delhi\'s temperature starts touching the sky.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms drop naturally into weather writing: one for the monsoon scramble, one for peak summer heat. One idiom in a 3-paragraph essay = register mastery; two would look stuffed. Pick the one that fits your season.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'An Indian season',
      prompt:
        'भारत की किसी एक ऋतु के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि वह ऋतु कैसी होती है, आप क्या करते हैं, और पिछली बार क्या हुआ था।',
      novice: 'मुझे बारिश पसंद है। बारिश अच्छी है। पानी गिरता है।',
      intermediateMid:
        'भारत में मानसून जून में आता है और मेरी सबसे पसंदीदा ऋतु है। इन दिनों आकाश में काले बादल छाए रहते हैं और झमाझम बारिश होती रहती है। दिल्ली में बहुत गरमी थी, लेकिन पहली बारिश के बाद मौसम एकदम सुहावना हो गया।\n\nहर साल हम मानसून में पकौड़े और अदरक वाली चाय बनाते हैं, क्योंकि यह हमारे परिवार की पुरानी परंपरा है। पिछले साल मैं और मेरा भाई छत पर भीगने गए थे। माँ ने डाँटा, लेकिन बहुत मज़ा आया। इसके अलावा, बारिश के बाद पेड़ एकदम हरे दिखते हैं।\n\nअगले महीने हम नानी के गाँव जाएँगे, जहाँ खेतों में पानी भर जाता है और मेंढक गाते हैं। अगर मौसम साफ़ रहा, तो हम नाव भी चलाएँगे। मुझे लगता है कि मानसून सिर्फ़ एक ऋतु नहीं, बल्कि एक त्योहार भी है।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'आता है / थी / हो गया', note: 'Past and present in one paragraph. Opens with habitual present (आता है), moves to past (थी), closes with past-perfective (हो गया) — three verbal moves in one paragraph.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'काले बादल, झमाझम बारिश, सुहावना', note: 'Three precise weather items — not "बहुत बारिश". Topic Coverage lift.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'पकौड़े और अदरक वाली चाय', note: 'Culture-on-the-page: a specific monsoon ritual, not "we drink tea".' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'बनाते हैं / गए थे / डाँटा', note: 'Habitual present beside past-perfect inside one paragraph — raters love this.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि / लेकिन / इसके अलावा', note: 'Three different connectors in six sentences — Text-Type 5 signal.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'जाएँगे / चलाएँगे', note: 'Future frame opens paragraph 3. Three time frames across three paragraphs = clean Benchmark 5.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: 'Not-only-but-also closing — textbook Intermediate-Mid reflective move.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर ... तो', note: 'Conditional with future tense — locks in the third time frame AND a complex connector.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'क्योंकि', 'इसके अलावा', 'अगर... तो', 'बल्कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs, each anchored to a different time frame (present / past / future). Text-Type 5 confirmed.',
          'Five distinct connectors used correctly across the essay, well above the 3-connector threshold for Intermediate-Mid.',
          'Correct impersonal weather constructions (बहुत गरमी थी, झमाझम बारिश होती है) — no English calque. Language Control at Average or High.',
          'Two culture-specific details (पकौड़े और अदरक वाली चाय, नानी का गाँव) lift Topic Coverage above generic weather essays.',
          'Reflective closing (सिर्फ़ एक ऋतु नहीं, बल्कि एक त्योहार भी) generalizes beyond the event — a rubric-rewarded IM move.',
        ],
        gotchas: [
          'If the student writes "मैं भीग गयी" as a male speaker, Language Control drops immediately — gender on intransitive past must match the subject.',
          'Dropping the future paragraph (3) would strip the third tense and knock the essay to Benchmark 4 despite identical vocabulary.',
        ],
      },
    },
    {
      shortLabel: 'My city\'s weather',
      prompt:
        'अपने शहर के मौसम के बारे में तीन अनुच्छेदों में लिखिए। बताइए आज का मौसम कैसा है, पिछली सर्दियों में क्या हुआ था, और अगले महीने आप क्या करेंगे।',
      novice: 'आज ठंडा है। सर्दी है। मैं कोट पहनता हूँ।',
      intermediateMid:
        'आज दिल्ली में बहुत सर्दी है और बाहर घना कोहरा छाया हुआ है। तापमान सुबह से गिर रहा है, इसलिए मैंने ऊनी स्वेटर और कोट पहना। जब मैं खिड़की से बाहर देखता हूँ, तब पेड़ धुंध में छिप जाते हैं। माँ रसोई में गरम चाय बना रही हैं।\n\nपिछली सर्दियों में हम सब शिमला गए थे, क्योंकि वहाँ बर्फ़ गिरती है। पहले तो हमें बहुत ठंड लगी, फिर हमने गरम कपड़े पहने और बाहर निकले। मेरी छोटी बहन ने पहली बार बर्फ़ देखी और बहुत खुश हुई। अंत में हमने एक छोटा स्नोमैन भी बनाया। वह यात्रा हमारे लिए यादगार बन गई।\n\nअगले महीने फरवरी आ जाएगा और धीरे-धीरे वसंत शुरू होगा। अगर मौसम सुहावना रहा, तो हम बाग में पिकनिक करेंगे। मुझे लगता है कि हर ऋतु का अपना मज़ा है — सर्दी में चाय, गर्मी में आम, और बारिश में पकौड़े।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'है / गिर रहा है / पहना', note: 'Present + continuous + past in one paragraph — three verbal moves before paragraph 1 ends.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'घना कोहरा / ऊनी स्वेटर / तापमान', note: 'Precise winter vocabulary — no one says "बहुत सर्दी" alone. Topic Coverage signal.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए / जब ... तब', note: 'Consequence + temporal connectors in a single paragraph.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'गए थे / लगी / बनाया', note: 'Full past narrative. Paragraph 2 commits to past tense throughout — cleanly separated from paragraph 1\'s present.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर ... अंत में', note: 'Three sequence connectors in one paragraph — textbook Text-Type 5 scaffolding.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'शिमला / बर्फ़ / स्नोमैन', note: 'Shimla as the specific hill station — not "a cold place". Cultural authenticity.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'आ जाएगा / शुरू होगा / करेंगे', note: 'Future-future-future: third paragraph is the third time frame. Three-tense essay locked in.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर ... तो', note: 'Conditional + future — the move raters specifically mark as "complex structure emerging".' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सर्दी में चाय, गर्मी में आम, बारिश में पकौड़े', note: 'Parallel tricolon closing — seasoned cultural knowledge compressed into seven words.' },
      ],
      wordCount: 145,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['इसलिए', 'जब... तब', 'क्योंकि', 'पहले', 'फिर', 'अंत में', 'अगर... तो'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Seven distinct connectors used — well above the Intermediate-Mid threshold. Text-Type 5 confirmed.',
          'Each paragraph anchors a different time frame: paragraph 1 present, paragraph 2 past, paragraph 3 future — the cleanest structure a Benchmark 5 essay can have.',
          'Correct gender on every adjective: घना कोहरा (m), ऊनी स्वेटर (m), छोटी बहन (f), छोटा स्नोमैन (m). Language Control stable.',
          'Tricolon closing (सर्दी में चाय, गर्मी में आम, बारिश में पकौड़े) compresses three cultural specifics into one sentence — Topic Coverage lift at no grammar cost.',
          'Conditional future (अगर मौसम सुहावना रहा, तो हम पिकनिक करेंगे) demonstrates the "emerging complex structures" raters flag at IM.',
        ],
        gotchas: [
          'If the student writes "हम गयी" or mixes masculine/feminine verb endings across the essay, Language Control drops to Low — Benchmark 4 max.',
          'If paragraph 3 reverted to simple present ("अगले महीने फरवरी है"), the essay loses its future frame and caps at Benchmark 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two 138–145-word models, each built around a different season (monsoon and winter), each shifting past → present → future across its three paragraphs. Study the annotations until you can name which rubric box each sentence ticks. That is exactly how raters grade.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपनी पसंदीदा ऋतु के बारे में तीन अनुच्छेदों में लिखिए। बताइए वह ऋतु कैसी होती है, पिछली बार उस ऋतु में क्या हुआ था, और अगली बार आप क्या करेंगे।',
      english:
        'Write three paragraphs about your favorite season. Describe what the season is like, what happened last time in that season, and what you will do next time.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'अगर... तो'],
        vocab: ['मौसम', 'बारिश', 'सुहावना', 'छाता', 'परिवार'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'भारत की किसी एक यादगार बारिश या बर्फ़बारी का वर्णन तीन अनुच्छेदों में कीजिए। बताइए वह कब हुई, आपने क्या किया, और उस अनुभव से क्या सीखा।',
      english:
        'Describe a memorable rainfall or snowfall in India in three paragraphs. Say when it happened, what you did, and what you learned from the experience.',
      hint: {
        connectors: ['जब... तब', 'लेकिन', 'इसलिए', 'अंत में'],
        vocab: ['झमाझम', 'बादल', 'भीगना', 'गरम चाय', 'यादगार'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगर आप अगली गर्मी की छुट्टियों में किसी हिल स्टेशन जाएँगे, तो वहाँ का मौसम कैसा होगा और आप क्या करेंगे? तीन अनुच्छेदों में लिखिए।',
      english:
        'If you go to a hill station next summer vacation, what will the weather be like and what will you do there? Write in three paragraphs.',
      hint: {
        connectors: ['अगर... तो', 'इसके अलावा', 'क्योंकि', 'लेकिन'],
        vocab: ['हिल स्टेशन', 'ठंडा', 'पहाड़', 'स्वेटर', 'सुहावना'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt explicitly invites a different tense combination. Prompt 1 spans all three; prompt 2 pairs past with present; prompt 3 pairs present with future. Pick the one that matches the time frames you are weakest in and train there.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay you draft in this pack against the three axes. Weather prompts are the most forgiving place to produce three tenses — if you cannot hit Benchmark 5 here, go back to the reading sample and imitate its structure line by line before trying again.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
