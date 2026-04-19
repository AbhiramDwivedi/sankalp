import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

// -----------------------------------------------------------------------------
// L3-02 Teen Life - किशोर जीवन
// Opinion-heavy, present-tense-dominant stretch pack. The pedagogical goal is
// to train the student to voice a clear view on personal topics (pressure,
// friendship, phones, parents, dreams) using opinion markers and
// reason-chains. Raters reward the essay that argues, not just describes.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L3-02-teen-life',
  level: 3,
  themeGroup: 'Identity',
  topicTheme: 'personal',
  order: 25,
  heroMotif: 'notebook',
  titleHindi: 'किशोर जीवन',
  titleEnglish: 'Teen Life',
  hook: 'Opinion-heavy topics in present tense - raters reward students who voice a view clearly.',
  heroPrompt: composeHeroPrompt(
    'A notebook open with Devanagari journal entries, earbuds coiled beside it, a smartphone screen faintly glowing, in a warm bedroom scene',
  ),

  rationale: {
    fcpsSubTopics: [
      'Teen Life (FCPS Level 3 - Identity)',
      'Friendship and Peer Relationships (FCPS Level 3)',
      'School Life and Academic Pressure (FCPS Level 3)',
      'Social Media and Technology in Daily Life (FCPS Level 3)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'State a clear opinion on a teen-life topic using मुझे लगता है कि / मेरा मानना है कि in the opening sentence',
      'Build a reason-chain of at least three sentences using क्योंकि, इसलिए, and हालाँकि',
      'Contrast two aspects of teen life (school vs. free time, parents vs. friends) with जबकि and से भिन्न',
      'Sustain present tense for opinion paragraphs while shifting into past for a personal example and future for aspirations',
      'Include one culturally specific Indian teen reference (board exam, coaching, joint family expectation) in the essay',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '90 min reading + 45 min essay',
    ifSkippedRisk:
      'FCPS Level 3 writing prompts routinely ask "what do you think" about friendship, school, or social media. A student who has not practiced opinion registers writes a description instead of an argument - raters cap that at Intermediate-Low (2 credits). This pack is the opinion-register drill.',
  },

  objectives: [
    {
      text: 'Open any teen-life essay with an opinion statement using a first-person marker (मुझे लगता है / मेरा मानना है / मेरी राय में).',
      trains: ['TextType'],
    },
    {
      text: 'Use at least three different opinion-and-reasoning connectors in one essay (क्योंकि, इसलिए, हालाँकि, जबकि).',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Name at least 15 teen-specific nouns and 5 feeling-adjectives without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Agree or disagree with a claim in Hindi using सहमत हूँ / असहमत हूँ followed by a reason clause.',
      trains: ['LanguageControl', 'TopicCoverage'],
    },
    {
      text: 'Shift from present-opinion to past-example to future-aspiration within a single 3-paragraph essay.',
      trains: ['TextType', 'LanguageControl'],
    },
  ],

  vocabulary: [
    // Core teen concerns
    { hindi: 'किशोर', transliteration: 'kishor', english: 'teenager / adolescent', exampleHindi: 'हर किशोर के अपने सपने होते हैं।', exampleEnglish: 'Every teenager has their own dreams.', emoji: '🧑‍🎓', partOfSpeech: 'noun', subgroup: 'Core' },
    { hindi: 'दोस्ती', transliteration: 'dosti', english: 'friendship', exampleHindi: 'सच्ची दोस्ती समय के साथ मज़बूत होती है।', exampleEnglish: 'True friendship grows stronger with time.', emoji: '🤝', partOfSpeech: 'noun', subgroup: 'Core' },
    { hindi: 'पढ़ाई', transliteration: 'padhaai', english: 'studies / education', exampleHindi: 'पढ़ाई मेरे जीवन का सबसे बड़ा हिस्सा है।', exampleEnglish: 'Studies are the biggest part of my life.', emoji: '📚', partOfSpeech: 'noun', subgroup: 'Core' },
    { hindi: 'दबाव', transliteration: 'dabaav', english: 'pressure', exampleHindi: 'परीक्षाओं का दबाव बहुत ज़्यादा होता है।', exampleEnglish: 'The pressure of exams is very high.', emoji: '😰', partOfSpeech: 'noun', subgroup: 'Core' },
    { hindi: 'उम्मीदें', transliteration: 'ummeedein', english: 'expectations / hopes', exampleHindi: 'माता-पिता की उम्मीदें कभी-कभी भारी लगती हैं।', exampleEnglish: "Parents' expectations sometimes feel heavy.", emoji: '🎯', partOfSpeech: 'noun', subgroup: 'Core' },
    { hindi: 'सपने', transliteration: 'sapne', english: 'dreams', exampleHindi: 'मेरे सपने मेरी मेहनत से पूरे होंगे।', exampleEnglish: 'My dreams will be fulfilled through my hard work.', emoji: '💭', partOfSpeech: 'noun', subgroup: 'Core' },

    // Social life
    { hindi: 'सोशल मीडिया', transliteration: 'social media', english: 'social media', exampleHindi: 'सोशल मीडिया पर ज़्यादा समय बर्बाद होता है।', exampleEnglish: 'A lot of time is wasted on social media.', emoji: '📱', partOfSpeech: 'noun', subgroup: 'Social life' },
    { hindi: 'मोबाइल', transliteration: 'mobile', english: 'mobile phone', exampleHindi: 'मेरा मोबाइल हमेशा मेरे पास रहता है।', exampleEnglish: 'My mobile is always with me.', emoji: '📞', partOfSpeech: 'noun', subgroup: 'Social life' },
    { hindi: 'वीडियो गेम', transliteration: 'video game', english: 'video game', exampleHindi: 'शाम को मैं अपने दोस्तों के साथ वीडियो गेम खेलता हूँ।', exampleEnglish: 'In the evening I play video games with my friends.', emoji: '🎮', partOfSpeech: 'noun', subgroup: 'Social life' },
    { hindi: 'संगीत', transliteration: 'sangeet', english: 'music', exampleHindi: 'संगीत सुनने से मेरा तनाव कम हो जाता है।', exampleEnglish: 'Listening to music reduces my stress.', emoji: '🎧', partOfSpeech: 'noun', subgroup: 'Social life' },

    // School experience
    { hindi: 'कक्षा', transliteration: 'kaksha', english: 'class / classroom', exampleHindi: 'हमारी कक्षा में तीस विद्यार्थी हैं।', exampleEnglish: 'There are thirty students in our class.', emoji: '🏫', partOfSpeech: 'noun', subgroup: 'School' },
    { hindi: 'परीक्षा', transliteration: 'pareeksha', english: 'exam', exampleHindi: 'बोर्ड की परीक्षा हर किशोर के लिए चुनौती होती है।', exampleEnglish: 'The board exam is a challenge for every teenager.', emoji: '📝', partOfSpeech: 'noun', subgroup: 'School' },
    { hindi: 'होमवर्क', transliteration: 'homework', english: 'homework', exampleHindi: 'रोज़ रात को मैं दो घंटे होमवर्क करता हूँ।', exampleEnglish: 'Every night I do homework for two hours.', emoji: '✏️', partOfSpeech: 'noun', subgroup: 'School' },
    { hindi: 'कोचिंग', transliteration: 'coaching', english: 'tutoring / coaching class', exampleHindi: 'स्कूल के बाद मैं गणित की कोचिंग जाता हूँ।', exampleEnglish: 'After school I go to math coaching.', emoji: '📖', partOfSpeech: 'noun', subgroup: 'School' },

    // Relationships
    { hindi: 'माता-पिता', transliteration: 'maata-pita', english: 'parents', exampleHindi: 'मेरे माता-पिता हमेशा मेरा साथ देते हैं।', exampleEnglish: 'My parents always support me.', emoji: '👨‍👩‍👧', partOfSpeech: 'noun', subgroup: 'Relationships' },
    { hindi: 'दोस्त', transliteration: 'dost', english: 'friend', exampleHindi: 'मेरा सबसे अच्छा दोस्त मेरे साथ स्कूल में पढ़ता है।', exampleEnglish: 'My best friend studies with me at school.', emoji: '👫', partOfSpeech: 'noun', subgroup: 'Relationships' },
    { hindi: 'शिक्षक', transliteration: 'shikshak', english: 'teacher', exampleHindi: 'हमारे शिक्षक बहुत प्यार से पढ़ाते हैं।', exampleEnglish: 'Our teachers teach with great affection.', emoji: '👨‍🏫', partOfSpeech: 'noun', subgroup: 'Relationships' },

    // Feelings
    { hindi: 'तनाव', transliteration: 'tanaav', english: 'stress / tension', exampleHindi: 'परीक्षाओं के समय तनाव बढ़ जाता है।', exampleEnglish: 'Stress increases at the time of exams.', emoji: '😓', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'उत्साह', transliteration: 'utsaah', english: 'enthusiasm / excitement', exampleHindi: 'नए साल में मेरा उत्साह दोगुना हो जाता है।', exampleEnglish: 'My enthusiasm doubles in the new year.', emoji: '🎉', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'चिंता', transliteration: 'chinta', english: 'worry / anxiety', exampleHindi: 'भविष्य की चिंता हर किशोर को होती है।', exampleEnglish: 'Every teenager worries about the future.', emoji: '😟', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'आत्मविश्वास', transliteration: 'aatmavishvaas', english: 'self-confidence', exampleHindi: 'आत्मविश्वास से हर काम आसान हो जाता है।', exampleEnglish: 'With self-confidence every task becomes easier.', emoji: '💪', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'गर्व', transliteration: 'garv', english: 'pride', exampleHindi: 'अपनी भाषा पर मुझे गर्व है।', exampleEnglish: 'I take pride in my language.', emoji: '🦚', partOfSpeech: 'noun', subgroup: 'Feelings' },

    // Opinion verbs and adjectives
    { hindi: 'सहमत होना', transliteration: 'sahmat hona', english: 'to agree', exampleHindi: 'मैं अपने दोस्त की बात से सहमत हूँ।', exampleEnglish: "I agree with my friend's point.", emoji: '👍', partOfSpeech: 'verb', subgroup: 'Opinion' },
    { hindi: 'असहमत होना', transliteration: 'asahmat hona', english: 'to disagree', exampleHindi: 'इस विषय पर मैं असहमत हूँ।', exampleEnglish: 'I disagree on this topic.', emoji: '👎', partOfSpeech: 'verb', subgroup: 'Opinion' },
    { hindi: 'महत्वपूर्ण', transliteration: 'mahatvapoorn', english: 'important', exampleHindi: 'दोस्ती किशोर जीवन का सबसे महत्वपूर्ण हिस्सा है।', exampleEnglish: 'Friendship is the most important part of teen life.', emoji: '⭐', partOfSpeech: 'adjective', subgroup: 'Opinion' },
    { hindi: 'मुश्किल', transliteration: 'mushkil', english: 'difficult', exampleHindi: 'किशोर जीवन आसान नहीं, बल्कि मुश्किल है।', exampleEnglish: 'Teen life is not easy, rather it is difficult.', emoji: '🧗', partOfSpeech: 'adjective', subgroup: 'Opinion' },
    { hindi: 'राय', transliteration: 'raay', english: 'opinion', exampleHindi: 'मेरी राय में, परिवार का साथ सबसे ज़रूरी है।', exampleEnglish: "In my opinion, family's support is most essential.", emoji: '💡', partOfSpeech: 'noun', subgroup: 'Opinion' },
    { hindi: 'सोचना', transliteration: 'sochna', english: 'to think', exampleHindi: 'मैं अक्सर अपने भविष्य के बारे में सोचता हूँ।', exampleEnglish: 'I often think about my future.', emoji: '🤔', partOfSpeech: 'verb', subgroup: 'Opinion' },
  ],
  vocabularyNote: {
    why:
      'These 28 words are the exact set FCPS Level 3 "what do you think about teen life" prompts recycle. Opinion nouns (राय, दबाव, उम्मीदें) and feeling nouns (तनाव, आत्मविश्वास, गर्व) carry the argument; opinion verbs (सहमत होना, सोचना) unlock the register. Learn this list before the connectors - connectors without vocabulary make empty sentences.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Opinion markers: मुझे लगता है कि / मेरा मानना है कि / मेरी राय में',
      rule:
        'Start an opinion sentence with one of three markers. मुझे लगता है कि ("I think that") is softest and most common. मेरा मानना है कि ("I believe that") is firmer - use when you will defend the claim. मेरी राय में ("in my opinion") is most formal and works well as an essay opener.',
      examples: [
        { hindi: 'मुझे लगता है कि दोस्ती सबसे महत्वपूर्ण है।', transliteration: 'mujhe lagta hai ki dosti sabse mahatvapoorn hai.', english: 'I think that friendship is the most important.' },
        { hindi: 'मेरा मानना है कि सोशल मीडिया से ज़्यादा नुकसान होता है।', transliteration: 'mera maanna hai ki social media se zyaada nuksaan hota hai.', english: 'I believe that social media causes more harm.' },
        { hindi: 'मेरी राय में, माता-पिता का साथ ज़रूरी है।', transliteration: 'meri raay mein, maata-pita ka saath zaroori hai.', english: "In my opinion, parents' support is essential." },
      ],
      pitfall:
        'Dropping कि after लगता है / मानना है produces a truncated sentence that raters read as Novice. Always include the कि clause: subject + क्या + है.',
      whyItMatters:
        'The STAMP Text-Type 5 descriptor requires "groupings of ideas" - opinion markers frame a grouping. One marker in the first sentence plus a reason clause immediately lifts Text-Type above Intermediate-Low.',
    },
    {
      title: 'Agreement-level verbs: सहमत होना / असहमत होना',
      rule:
        'To agree, use मैं + ... से सहमत हूँ. To disagree, use मैं + ... से असहमत हूँ. The postposition से marks what you agree with (a claim, an idea, a person). Follow immediately with क्योंकि + reason.',
      examples: [
        { hindi: 'मैं इस बात से सहमत हूँ कि पढ़ाई ज़रूरी है।', transliteration: 'main is baat se sahmat hoon ki padhaai zaroori hai.', english: 'I agree with the point that studies are essential.' },
        { hindi: 'मैं असहमत हूँ, क्योंकि दोस्त भी उतने ही ज़रूरी हैं।', transliteration: 'main asahmat hoon, kyonki dost bhi utne hee zaroori hain.', english: 'I disagree, because friends are just as essential.' },
        { hindi: 'मेरी बहन मुझसे सहमत है, लेकिन मेरे पिताजी असहमत हैं।', transliteration: 'meri bahan mujhse sahmat hai, lekin mere pitaji asahmat hain.', english: 'My sister agrees with me, but my father disagrees.' },
      ],
      pitfall:
        'Students write "मैं सहमत हूँ" with no से and no reason. That is a dangling claim. Raters need (a) what you agree with and (b) why.',
      whyItMatters:
        'Raters specifically scan for "does the student take a position?" An explicit agree/disagree verb plus reason clause is the clearest possible Yes.',
    },
    {
      title: 'Comparison and contrast: से बेहतर / से भिन्न / जबकि',
      rule:
        'To say "X is better than Y", use X, Y से बेहतर है. To say "X is different from Y", use X, Y से भिन्न है. For side-by-side contrast within one sentence, use जबकि ("while/whereas").',
      examples: [
        { hindi: 'मेरी राय में, किताबें मोबाइल से बेहतर हैं।', transliteration: 'meri raay mein, kitaabein mobile se behtar hain.', english: 'In my opinion, books are better than mobiles.' },
        { hindi: 'किशोर जीवन बचपन से भिन्न होता है।', transliteration: 'kishor jeevan bachpan se bhinn hota hai.', english: 'Teen life is different from childhood.' },
        { hindi: 'मेरे दोस्त वीडियो गेम खेलते हैं, जबकि मैं किताबें पढ़ता हूँ।', transliteration: 'mere dost video game khelte hain, jabki main kitaabein padhta hoon.', english: 'My friends play video games, whereas I read books.' },
      ],
      pitfall:
        'Students put से बेहतर on the wrong side of the comparison (e.g., "मोबाइल किताबों से बेहतर" when they mean the reverse). Rule: the noun that comes first is the one that "wins".',
      whyItMatters:
        'Comparison is an Intermediate-Mid hallmark - raters look for it explicitly. One clean comparison sentence + one जबकि contrast puts the essay safely at Benchmark 5 on Text-Type.',
    },
    {
      title: 'Reason-plus-opinion chains with क्योंकि + इसलिए',
      rule:
        'A strong opinion paragraph chains three sentences: (1) opinion, (2) reason with क्योंकि, (3) consequence with इसलिए. Add हालाँकि to acknowledge a counter-point before your conclusion.',
      examples: [
        { hindi: 'मुझे लगता है कि तनाव ज़्यादा है, क्योंकि पढ़ाई का बोझ भारी है, इसलिए हम खुलकर नहीं जी पाते।', transliteration: 'mujhe lagta hai ki tanaav zyaada hai, kyonki padhaai ka bojh bhaari hai, isliye hum khulkar nahin jee paate.', english: 'I think that stress is excessive, because the burden of studies is heavy, so we cannot live freely.' },
        { hindi: 'हालाँकि मोबाइल ज़रूरी है, फिर भी इसका ज़्यादा इस्तेमाल नुकसान करता है।', transliteration: 'haalaanki mobile zaroori hai, phir bhi iska zyaada istemaal nuksaan karta hai.', english: 'Although the mobile is essential, still its excessive use causes harm.' },
      ],
      pitfall:
        'Stringing क्योंकि ... क्योंकि ... क्योंकि without इसलिए or हालाँकि flattens the paragraph. Vary the connectors.',
      whyItMatters:
        'The rubric says "sentences cannot be rearranged without altering meaning" for Benchmark 5. A reason-chain literally cannot be rearranged - this construction is the surest route to Text-Type 5.',
    },
  ],
  grammarNote: {
    why:
      'These four rules convert a descriptive Level 2 essay into an opinion Level 3 essay. The student already knows present tense from earlier packs - here we add the register that makes raters mark "takes a clear position". Every FCPS Level 3 prompt on this topic expects the opinion move.',
    trains: ['TextType', 'LanguageControl'],
  },

  connectors: pickConnectors([
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'halaanki',
    'meraManna',
    'mujheLagta',
    'sirfNahiBalki',
    'jabki',
  ]),
  connectorsNote: {
    why:
      'Nine connectors, tuned for opinion writing. मुझे लगता है कि / मेरा मानना है कि open the argument; क्योंकि / इसलिए power the reason-chain; हालाँकि / जबकि admit counter-points; सिर्फ़...बल्कि...भी expands the claim. Use at least four of these nine in every essay from this pack.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'किशोर जीवन का सबसे मुश्किल और सबसे अच्छा हिस्सा · The Hardest and Best Part of Teen Life',
    hindi:
      'मुझे लगता है कि किशोर जीवन का सबसे मुश्किल हिस्सा दबाव है। हर दिन पढ़ाई, होमवर्क और कोचिंग का बोझ बहुत भारी लगता है। माता-पिता की उम्मीदें अपनी जगह सही हैं, लेकिन कभी-कभी वे हमारी चिंता को बढ़ा देती हैं। इसलिए बहुत से किशोर रात को ठीक से सो नहीं पाते। हालाँकि मेरे शिक्षक कहते हैं कि दबाव ज़िंदगी का हिस्सा है, फिर भी मेरा मानना है कि हमें खुद के लिए भी समय चाहिए। दूसरी ओर, किशोर जीवन का सबसे अच्छा हिस्सा दोस्ती है। जबकि परिवार हमारी पहचान है, दोस्त हमारी आज़ादी हैं। मेरी राय में, सच्चा दोस्त सिर्फ़ खेल का साथी नहीं, बल्कि सपनों का गवाह भी होता है। इसलिए मैं अपने दोस्तों के साथ बिताए हर पल की कद्र करता हूँ।',
    transliteration:
      'mujhe lagta hai ki kishor jeevan ka sabse mushkil hissa dabaav hai. har din padhaai, homework aur coaching ka bojh bahut bhaari lagta hai. maata-pita kee ummeedein apni jagah sahi hain, lekin kabhi-kabhi ve hamari chinta ko badha deti hain. isliye bahut se kishor raat ko theek se so nahin paate. haalaanki mere shikshak kahte hain ki dabaav zindagi ka hissa hai, phir bhi mera maanna hai ki hamein khud ke liye bhee samay chaahiye. doosri or, kishor jeevan ka sabse achchha hissa dosti hai. jabki parivaar hamari pahchaan hai, dost hamari aazaadi hain. meri raay mein, sachcha dost sirf khel ka saathi nahin, balki sapnon ka gavaah bhee hota hai. isliye main apne doston ke saath bitaaye har pal kee kadar karta hoon.',
    english:
      "I think that the hardest part of teen life is pressure. Every day the burden of studies, homework, and coaching feels very heavy. Parents' expectations are fair in their own way, but sometimes they increase our anxiety. So many teenagers can't sleep properly at night. Although my teachers say that pressure is part of life, I still believe that we also need time for ourselves. On the other hand, the best part of teen life is friendship. Whereas family is our identity, friends are our freedom. In my opinion, a true friend is not just a play companion, but also a witness to our dreams. That is why I cherish every moment spent with my friends.",
    highlights: [
      { term: 'मुझे लगता है कि / मेरा मानना है कि / मेरी राय में', note: 'Three different opinion markers in one passage - the Level 3 register signature. Raters read this as "student takes a position repeatedly".' },
      { term: 'क्योंकि, इसलिए, हालाँकि, जबकि', note: 'A four-connector reason-chain that cannot be rearranged. This is the exact shape Text-Type 5 describes.' },
      { term: 'सिर्फ़ ... बल्कि ... भी', note: 'Not-only-but-also structure - widens the claim about friendship from functional to meaningful.' },
      { term: 'कोचिंग, माता-पिता की उम्मीदें', note: 'Indian-specific cultural texture - coaching culture and parental expectations are the FCPS Level 3 teen-life stereotype done right.' },
      { term: 'चिंता (f) / दबाव (m) / आत्मविश्वास (m)', note: 'Feeling-nouns used with correct gender - one of the toughest agreement zones in teen-life vocabulary.' },
    ],
    comprehensionQuestions: [
      { q: 'What does the writer call the hardest part of teen life?', a: 'दबाव (pressure) - the daily burden of studies, homework, and coaching.' },
      { q: 'Why, according to the writer, do parental expectations sometimes become a problem?', a: 'वे हमारी चिंता को बढ़ा देती हैं - they increase the teenager\'s anxiety.' },
      { q: 'What do the teachers say about pressure, and does the writer agree?', a: 'शिक्षक कहते हैं कि दबाव ज़िंदगी का हिस्सा है. The writer partly agrees but still believes teens need time for themselves.' },
      { q: 'What does the writer call the best part of teen life, and why?', a: 'दोस्ती (friendship) - because friends represent freedom and are "witnesses to our dreams."' },
      { q: 'Identify one contrast the passage makes using जबकि.', a: 'जबकि परिवार हमारी पहचान है, दोस्त हमारी आज़ादी हैं। (Family is identity, whereas friends are freedom.)' },
      { q: 'Pick any opinion marker used in the passage and explain its role.', a: 'मुझे लगता है कि / मेरा मानना है कि / मेरी राय में - each signals that the following sentence is the writer\'s opinion, not a fact.' },
      { q: 'What Indian-specific detail grounds the essay in teen life here, not abroad?', a: 'The mention of कोचिंग and माता-पिता की उम्मीदें reflects the Indian academic-pressure context.' },
    ],
  },
  anchorNote: {
    why:
      'The anchor is 133 words - right in the sweet spot for an Intermediate-Mid essay on this topic. Notice that every paragraph begins with an opinion marker, every claim has a reason, and the essay admits a counter-point (हालाँकि) before concluding. Read it three times out loud; the opinion rhythm is the whole lesson.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'diary',
      title: 'परीक्षा से पहले की रात · The Night Before the Exam',
      hindi:
        'आज रात मुझे नींद नहीं आ रही। कल मेरी गणित की परीक्षा है और मेरा तनाव बहुत ज़्यादा है। माँ ने कहा कि चिंता मत करो, लेकिन मेरा मानना है कि थोड़ी चिंता ज़रूरी है। अगर मैं अच्छा करूँगा, तो मेरा आत्मविश्वास बढ़ेगा।',
      transliteration:
        'aaj raat mujhe neend nahin aa rahi. kal meri ganit kee pareeksha hai aur mera tanaav bahut zyaada hai. maa ne kaha ki chinta mat karo, lekin mera maanna hai ki thodi chinta zaroori hai. agar main achchha karoonga, to mera aatmavishvaas badhega.',
      english:
        "I can't sleep tonight. Tomorrow is my math exam and my stress is very high. Mom said don't worry, but I believe a little worry is necessary. If I do well, my self-confidence will grow.",
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'यार, आज कोचिंग के बाद मिलते हैं? मुझे तुमसे बात करनी है। माँ-पिताजी चाहते हैं कि मैं इंजीनियर बनूँ, जबकि मेरा सपना कुछ और है। तुम्हारी राय चाहिए 🙏',
      transliteration:
        'yaar, aaj coaching ke baad milte hain? mujhe tumse baat karni hai. maa-pitaji chaahte hain ki main engineer banoon, jabki mera sapna kuchh aur hai. tumhari raay chaahiye.',
      english:
        "Buddy, shall we meet after coaching today? I need to talk to you. Mom and Dad want me to become an engineer, whereas my dream is something else. I want your opinion.",
    },
    {
      kind: 'email',
      title: 'क्लास टीचर को ईमेल · Email to the Class Teacher',
      hindi:
        'नमस्ते सर,\nमैं अपनी कक्षा का प्रतिनिधि हूँ। हमारी कक्षा के कई विद्यार्थियों का मानना है कि होमवर्क बहुत ज़्यादा है। हालाँकि हम पढ़ाई से भाग नहीं रहे, फिर भी थोड़ा समय खेल और परिवार के लिए भी ज़रूरी है। कृपया इस बात पर विचार कीजिए।\nधन्यवाद,\nअर्जुन',
      transliteration:
        'namaste sir, main apni kaksha ka pratinidhi hoon. hamari kaksha ke kai vidyaarthiyon ka maanna hai ki homework bahut zyaada hai. haalaanki hum padhaai se bhaag nahin rahe, phir bhi thoda samay khel aur parivaar ke liye bhee zaroori hai. kripaya is baat par vichaar keejiye. dhanyavaad, Arjun.',
      english:
        'Hello Sir,\nI am the class representative. Many students in our class believe that there is too much homework. Although we are not running from studies, we still need some time for sports and family. Please consider this point.\nThank you,\nArjun',
    },
    {
      kind: 'review',
      title: 'सोशल मीडिया पर पोस्ट · A Social Media Post',
      hindi:
        'किशोर जीवन आसान नहीं है। मुझे लगता है कि हमें अपने सपनों के साथ-साथ अपनी सेहत का भी ध्यान रखना चाहिए। सिर्फ़ नंबर नहीं, बल्कि खुशी भी ज़रूरी है। #किशोरजीवन #मेरीराय',
      transliteration:
        'kishor jeevan aasaan nahin hai. mujhe lagta hai ki hamein apne sapnon ke saath-saath apni sehat ka bhee dhyaan rakhna chaahiye. sirf number nahin, balki khushi bhee zaroori hai.',
      english:
        'Teen life is not easy. I think we should take care of our health along with our dreams. Not just numbers, but happiness too is essential.',
    },
  ],
  modelTextsNote: {
    why:
      'Four registers - personal diary, casual SMS, formal email, public post - each asking the student to carry an opinion. Notice how the opinion markers shift: मेरा मानना है in the email (formal), मुझे लगता है in the post (public), a plain claim in the diary (private). Register-awareness is a Text-Type 5 signal.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Board Exam Fever',
      body:
        'Class 10 and Class 12 "board exams" are treated as life-defining moments in India. Whole households rearrange around them - no weddings, quiet TVs, special pooja visits. Dropping a mention of बोर्ड की परीक्षा signals you understand how Indian teenage time is organized.',
      emoji: '📝',
    },
    {
      title: 'Coaching Culture',
      body:
        'For most urban Indian teens, school ends at 2 p.m. and "coaching" - private tutoring for IIT-JEE, NEET, or board prep - runs until 8 p.m. The word कोचिंग in an essay immediately locates the writer in the real Indian teen experience, not an abstract one.',
      emoji: '📖',
    },
    {
      title: 'Joint vs. Nuclear Family Dynamics',
      body:
        'In a joint family, a teenager navigates opinions from parents, grandparents, and uncles/aunts. In a nuclear family, the voice pair narrows to just parents but can intensify. Either framing is authentic - saying संयुक्त परिवार or एकल परिवार in one sentence lifts Topic Coverage.',
      emoji: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Engineer or Doctor?',
      body:
        'For a large slice of Indian middle-class families, the default dream for a teenager is "engineer or doctor". A teen who wants to become an artist, writer, or athlete often has to argue for the choice. Writing about this tension is instantly credible.',
      emoji: '🩺',
    },
    {
      title: 'Phones, Cricket, and Beyond',
      body:
        'Indian teens bond over the same three things - their phones, cricket, and filmy music - but a growing number are adding K-pop, gaming, and Instagram reels to the list. Naming a specific interest (not just "I like music") gives the essay texture.',
      emoji: '🏏',
    },
  ],
  culturalNote: {
    why:
      'Indian teen life is culturally very specific - coaching, board exams, joint families, engineer-or-doctor defaults. A student who writes "I study a lot and I feel pressure" gets Topic Coverage Low. A student who writes "कोचिंग के बाद मेरे पास बहुत कम समय रहता है" gets it Average or High. These five insights give you the specific details to slip into the essay.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    {
      phrase: 'आसमान छूना',
      literal: 'to touch the sky',
      meaning: 'To achieve something extraordinary; to reach great heights.',
      example: 'मेहनत से कोई भी किशोर आसमान छू सकता है।',
      exampleEnglish: 'With hard work any teenager can touch the sky (achieve great heights).',
    },
    {
      phrase: 'नाक में दम करना',
      literal: 'to put life into the nose',
      meaning: 'To annoy someone terribly; to make life difficult for someone.',
      example: 'सोशल मीडिया की सूचनाएँ मेरी नाक में दम कर देती हैं।',
      exampleEnglish: 'Social media notifications drive me up the wall.',
    },
  ],
  muhavareNote: {
    why:
      'Two muhavare that suit the aspiration/annoyance polarity of teen essays: आसमान छूना for dreams, नाक में दम करना for irritations. One muhavara per essay is plenty - two in one essay reads as overdone. Pick the one that fits your argument.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Teen challenges',
      prompt:
        'किशोर जीवन का सबसे बड़ा चैलेंज क्या है? अपनी राय तीन अनुच्छेदों में लिखो। (What is the biggest challenge of teen life? Write your opinion in three paragraphs.)',
      novice:
        'किशोर जीवन मुश्किल है। पढ़ाई ज़्यादा है। मैं थक जाता हूँ।',
      intermediateMid:
        'मेरी राय में, किशोर जीवन का सबसे बड़ा चैलेंज पढ़ाई का दबाव है। हर दिन स्कूल के बाद हम कोचिंग जाते हैं और रात को देर तक होमवर्क करते हैं। माता-पिता की उम्मीदें भी बहुत ज़्यादा हैं, क्योंकि वे चाहते हैं कि हम इंजीनियर या डॉक्टर बनें।\n\nपिछले महीने मेरी बोर्ड की तैयारी शुरू हुई और तब से मेरा तनाव बहुत बढ़ गया। एक रात मैं सो नहीं पाया, इसलिए मैंने अपने पिताजी से बात की। उन्होंने कहा कि नंबर ज़रूरी हैं, लेकिन सेहत उससे भी ज़रूरी है। उस दिन मुझे लगा कि मैं अकेला नहीं हूँ।\n\nहालाँकि दबाव कभी खत्म नहीं होगा, फिर भी मेरा मानना है कि हमें खुद पर भरोसा रखना चाहिए। अगले साल मैं अपने सपने के लिए मेहनत करूँगा, लेकिन साथ ही अपने दोस्तों और परिवार के लिए भी समय निकालूँगा। सिर्फ़ पढ़ाई नहीं, बल्कि खुशी भी ज़िंदगी का हिस्सा है।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'मेरी राय में', note: 'Essay opens with a formal opinion marker - immediately signals Level 3 register to the rater.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'कोचिंग, होमवर्क, बोर्ड, इंजीनियर या डॉक्टर', note: 'Four Indian-specific teen references in one paragraph - Topic Coverage High.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि', note: 'Reason clause follows the opinion - this is the basic opinion-plus-reason shape.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले महीने ... शुरू हुई ... मैंने बात की', note: 'Past-tense personal example anchoring the abstract claim. The rubric explicitly rewards this move.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'इसलिए / लेकिन', note: 'Two reasoning connectors in a single paragraph - the reason-chain the rubric requires.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'हालाँकि ... फिर भी', note: 'Counter-point acknowledged before conclusion - an Intermediate-Mid hallmark.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल ... मेहनत करूँगा ... निकालूँगा', note: 'Future tense closes the essay - three time frames in 135 words, clean Benchmark 5.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ पढ़ाई नहीं, बल्कि खुशी भी', note: 'Not-only-but-also closing generalization - raters read this as "student makes a reasoned conclusion".' },
      ],
      wordCount: 135,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'इसलिए', 'लेकिन', 'हालाँकि', 'मेरी राय में', 'मेरा मानना है कि', 'बल्कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Essay opens with मेरी राय में and sustains opinion register across all three paragraphs - raters mark "takes a clear position" without hesitation.',
          'Uses past (शुरू हुई, मैंने बात की), present (चाहते हैं, मानना है), and future (करूँगा, निकालूँगा) within 135 words - satisfies the rubric\'s "some control of past, present, and future" for IM.',
          'Seven distinct connectors/opinion markers (क्योंकि, इसलिए, लेकिन, हालाँकि, मेरी राय में, मेरा मानना है कि, बल्कि) - well above the Text-Type 5 threshold.',
          'Personal example (the conversation with father) grounds the abstract claim - a direct Intermediate-Mid move.',
          'Cultural specifics (कोचिंग, बोर्ड, इंजीनियर या डॉक्टर) lift Topic Coverage above generic teen-angst answers.',
        ],
        gotchas: [
          'If "पढ़ाई का दबाव" becomes "पढ़ाई के दबाव" when it shouldn\'t, Language Control dips.',
          'If the student drops the counter-point हालाँकि and just piles on complaints, Text-Type flattens back to Benchmark 4.',
        ],
      },
    },
    {
      shortLabel: 'Social media',
      prompt:
        'किशोरों के जीवन में सोशल मीडिया की क्या भूमिका होनी चाहिए? अपनी राय तीन अनुच्छेदों में लिखो। (What should be the role of social media in teenagers\' lives? Write your opinion in three paragraphs.)',
      novice:
        'सोशल मीडिया अच्छा है। मोबाइल पर दोस्त मिलते हैं। मैं पसंद करता हूँ।',
      intermediateMid:
        'मुझे लगता है कि सोशल मीडिया किशोरों के जीवन का एक ज़रूरी हिस्सा है, लेकिन इसका सीमित इस्तेमाल होना चाहिए। एक ओर, यह दोस्तों से जोड़ता है और दुनिया भर की जानकारी देता है। जबकि दूसरी ओर, इस पर ज़्यादा समय बिताने से हमारी पढ़ाई और सेहत दोनों पर असर पड़ता है।\n\nपिछले साल मेरे एक दोस्त ने पूरी रात रीलें देखीं और अगले दिन परीक्षा में थक गया। उसने मुझे बताया कि उसे खुद पर गुस्सा आया, क्योंकि उसने वक़्त बर्बाद कर दिया। उस दिन से मैंने खुद तय किया कि रात नौ बजे के बाद मैं फ़ोन नहीं छूऊँगा।\n\nमेरा मानना है कि सोशल मीडिया हमारा दोस्त है, दुश्मन नहीं - बस इस्तेमाल सही होना चाहिए। हालाँकि मेरे कई दोस्त असहमत हैं, फिर भी मेरी राय में, सिर्फ़ लाइक्स नहीं, बल्कि असली बातचीत भी ज़रूरी है। अगर हम सीमा तय करेंगे, तो आत्मविश्वास और दोस्ती दोनों बचेंगे।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'मुझे लगता है कि ... लेकिन', note: 'Balanced thesis - opinion plus a qualifier in sentence one. Raters recognize this as a Level 3 move.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'एक ओर ... जबकि दूसरी ओर', note: 'On-one-hand/on-the-other-hand scaffold - one of the clearest Text-Type 5 signals.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले साल ... देखीं ... थक गया ... बताया', note: 'Past-tense anecdote supporting the claim - exactly the "personal experience" FCPS prompts ask for.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि / इसलिए', note: 'Classical reason-chain inside the anecdote. Sentences cannot be rearranged.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'नहीं छूऊँगा', note: 'Future tense arrives mid-essay, not just in the closing - adds tense variety.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'हालाँकि ... फिर भी', note: 'Counter-point admitted before conclusion.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ लाइक्स नहीं, बल्कि असली बातचीत भी', note: 'Not-only-but-also closes with a memorable line.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर ... तो', note: 'Conditional future seals the third time frame and makes the closing feel argued.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'जबकि', 'क्योंकि', 'हालाँकि', 'मुझे लगता है कि', 'मेरा मानना है कि', 'मेरी राय में', 'बल्कि', 'अगर... तो'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Balanced thesis ("ज़रूरी है, लेकिन सीमित इस्तेमाल होना चाहिए") lets the essay argue in two directions - a strong Text-Type 5 move.',
          'Nine distinct connectors/opinion markers used correctly across three paragraphs - far above the rubric threshold.',
          'Past-tense anecdote (the friend who watched reels all night) is concrete and plausible, not abstract - raters consistently reward this pattern.',
          'Three time frames are woven throughout, not bunched in one paragraph - a sign of real tense control, not a rehearsed ending.',
          'Closing conditional (अगर ... तो) plus the सिर्फ़...बल्कि...भी structure gives the essay a memorable last line.',
        ],
        gotchas: [
          'If the student writes एक दोस्त ने ... देखा (masculine) when the object रीलें is feminine plural, Language Control dips. Correct: देखीं.',
          'Ditching the counter-point हालाँकि and stacking only complaints about social media drops the essay to Benchmark 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Both model essays argue - they do not just describe. Study the opening sentences: each states a position in the first line. Study the middle paragraphs: each grounds the position in a past-tense personal example. Study the closings: each admits a counter-point with हालाँकि before concluding with a memorable line. Reproducing this three-move shape - Claim, Example, Reasoned Conclusion - is the core skill of this pack.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'आपकी राय में, किशोरों पर माता-पिता की उम्मीदों का क्या असर पड़ता है? तीन अनुच्छेदों में लिखिए। एक व्यक्तिगत उदाहरण ज़रूर दीजिए।',
      english:
        "In your opinion, what effect do parents' expectations have on teenagers? Write in three paragraphs. Be sure to include a personal example.",
      hint: {
        connectors: ['मुझे लगता है कि', 'क्योंकि', 'हालाँकि', 'इसलिए'],
        vocab: ['उम्मीदें', 'दबाव', 'आत्मविश्वास', 'माता-पिता', 'सपने'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'क्या सच्ची दोस्ती आज के डिजिटल युग में पहले से मुश्किल हो गई है? तीन अनुच्छेदों में अपनी राय दीजिए।',
      english:
        'Has true friendship become harder in today\'s digital age? Give your opinion in three paragraphs.',
      hint: {
        connectors: ['मेरा मानना है कि', 'जबकि', 'लेकिन', 'सिर्फ़... बल्कि भी'],
        vocab: ['दोस्ती', 'सोशल मीडिया', 'मोबाइल', 'तनाव', 'सच्चा दोस्त'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'किशोर जीवन में सबसे ज़रूरी तीन चीज़ें क्या हैं? तीन अनुच्छेदों में लिखिए और हर चीज़ के लिए एक वजह दीजिए।',
      english:
        'What are the three most important things in teen life? Write in three paragraphs and give one reason for each.',
      hint: {
        connectors: ['पहले', 'इसके अलावा', 'क्योंकि', 'अंत में', 'मेरी राय में'],
        vocab: ['पढ़ाई', 'दोस्ती', 'परिवार', 'सेहत', 'सपने'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'All three prompts force an opinion - they start with "आपकी राय में", "क्या ... हो गई है", or "सबसे ज़रूरी". A descriptive answer cannot satisfy these prompts. Use the hint strip to pre-load the four connectors and five vocab items you will use before you start writing; that way the essay flows instead of stalling.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'For this pack, self-grade every essay against three extra questions beyond the standard rubric: (1) Did the first sentence of each paragraph state an opinion? (2) Did you use at least two of क्योंकि / इसलिए / हालाँकि / जबकि? (3) Did you include at least one past-tense personal example? If the answer to any is No, revise before submitting.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
