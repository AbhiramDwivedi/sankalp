import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L3-01 · My Memories (मेरी यादें)
// Position on arc: pushing-to-IM. This pack is the gateway to past-tense
// narrative competence — the single feature that separates Benchmark 4 from
// Benchmark 5 on STAMP. Every section is built to give the student repeated,
// low-risk exposure to BOTH perfective (मैंने देखा) and imperfective
// (मैं खेलता था) past, plus the जब...तब construction that unlocks complex
// recollection. If a student leaves this pack without being able to switch
// between these two pasts on command, they will not reach IM.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L3-01-my-memories',
  level: 3,
  themeGroup: 'Identity',
  order: 24,
  heroMotif: 'notebook',
  titleHindi: 'मेरी यादें',
  titleEnglish: 'My Memories',
  hook: 'Past tense narrative competence is THE gate to Intermediate-Mid. This pack is the gate key.',
  heroPrompt: composeHeroPrompt(
    "A sepia-toned open photo album with a loose photo spilling out, a child's hand reaching toward it, indigo dust-motes drifting in sunlight, a warm afternoon mood",
  ),

  rationale: {
    fcpsSubTopics: [
      'My Memories (FCPS Level 3 — Identity: personal history and reflection)',
      'Childhood and growing up (FCPS Level 3 — narrating past experiences)',
      'Family traditions and celebrations remembered (FCPS Level 3)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate a childhood memory in 3 paragraphs using BOTH perfective past (मैंने खाया) and imperfective past (मैं खाता था)',
      'Use the ने construction correctly with at least five transitive verbs (देखा, किया, खाया, सुना, कहा)',
      'Anchor a past narrative with specific time markers (बचपन में, पिछले साल, जब मैं छोटा था)',
      'Shift from past narration to present reflection in the closing paragraph — a hallmark Benchmark 5 move',
      'Connect two past events with जब...तब and produce a complex sentence raters specifically reward',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '120 min reading + 45 min essay',
    ifSkippedRisk:
      'Without sustained past-tense control, the student caps at Benchmark 4 (Intermediate-Low, 2 credits). STAMP raters explicitly look for "some control of past, present, and future time frames" at Benchmark 5. A student who can only narrate memories in the present tense cannot cross the 3-credit line, no matter how rich their vocabulary.',
  },

  objectives: [
    {
      text: 'Conjugate 8 high-frequency verbs in both perfective past (मैंने किया) and imperfective past (मैं करता था) without hesitation.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Produce the ने construction correctly 5 times in a single essay — including agreement of the verb with the OBJECT.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Write a 3-paragraph memory essay that opens with a time marker (जब मैं छोटा था / बचपन में), narrates in the past, and closes with a present-tense reflection.',
      trains: ['TextType'],
    },
    {
      text: 'Use at least 6 connectors, including जब...तब and हालाँकि, to bind past events into a cohesive narrative.',
      trains: ['TextType'],
    },
    {
      text: 'Add at least one culturally specific detail (grandparent custom, village visit, festival memory) to lift the essay above generic childhood description.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Core memory nouns
    { hindi: 'यादें', transliteration: 'yaadein', english: 'memories', exampleHindi: 'बचपन की यादें बहुत प्यारी होती हैं।', exampleEnglish: 'Childhood memories are very dear.', emoji: '💭', partOfSpeech: 'noun', subgroup: 'Memory nouns' },
    { hindi: 'याद', transliteration: 'yaad', english: 'memory / remembrance', exampleHindi: 'मुझे वह दिन आज भी याद है।', exampleEnglish: 'I still remember that day today.', emoji: '🧠', partOfSpeech: 'noun', subgroup: 'Memory nouns' },
    { hindi: 'बचपन', transliteration: 'bachpan', english: 'childhood', exampleHindi: 'मेरा बचपन गाँव में बीता।', exampleEnglish: 'My childhood was spent in the village.', emoji: '🧒', partOfSpeech: 'noun', subgroup: 'Memory nouns' },
    { hindi: 'अनुभव', transliteration: 'anubhav', english: 'experience', exampleHindi: 'वह एक अनोखा अनुभव था।', exampleEnglish: 'That was a unique experience.', emoji: '🌟', partOfSpeech: 'noun', subgroup: 'Memory nouns' },
    { hindi: 'क्षण', transliteration: 'kshan', english: 'moment', exampleHindi: 'वह क्षण मैं कभी नहीं भूलूँगा।', exampleEnglish: 'I will never forget that moment.', emoji: '⏳', partOfSpeech: 'noun', subgroup: 'Memory nouns' },
    { hindi: 'ज़िंदगी', transliteration: 'zindagi', english: 'life', exampleHindi: 'मेरी ज़िंदगी में वह दिन ख़ास था।', exampleEnglish: 'That day was special in my life.', emoji: '🌅', partOfSpeech: 'noun', subgroup: 'Memory nouns' },

    // Time markers (the backbone of past narration)
    { hindi: 'बचपन में', transliteration: 'bachpan mein', english: 'in childhood', exampleHindi: 'बचपन में मैं दादी के घर जाता था।', exampleEnglish: 'In childhood I used to go to Grandma\'s house.', emoji: '🕰️', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'पिछले साल', transliteration: 'pichhle saal', english: 'last year', exampleHindi: 'पिछले साल हम भारत गए थे।', exampleEnglish: 'Last year we had gone to India.', emoji: '📅', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'कुछ साल पहले', transliteration: 'kuchh saal pahle', english: 'a few years ago', exampleHindi: 'कुछ साल पहले मैं सात साल का था।', exampleEnglish: 'A few years ago I was seven years old.', emoji: '⏪', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'जब मैं छोटा था', transliteration: 'jab main chhota tha', english: 'when I was small', exampleHindi: 'जब मैं छोटा था, तब मुझे कहानियाँ अच्छी लगती थीं।', exampleEnglish: 'When I was small, I used to like stories.', emoji: '👶', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'उस समय', transliteration: 'us samay', english: 'at that time', exampleHindi: 'उस समय हमारा घर बहुत बड़ा था।', exampleEnglish: 'At that time our house was very big.', emoji: '🔙', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'हर गर्मी', transliteration: 'har garmi', english: 'every summer', exampleHindi: 'हर गर्मी हम नानी के यहाँ जाते थे।', exampleEnglish: 'Every summer we used to go to Nani\'s place.', emoji: '☀️', partOfSpeech: 'phrase', subgroup: 'Time markers' },

    // Feelings about the past
    { hindi: 'यादगार', transliteration: 'yaadgaar', english: 'memorable', exampleHindi: 'वह दिन सबसे यादगार था।', exampleEnglish: 'That day was the most memorable.', emoji: '✨', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'ख़ुशी', transliteration: 'khushi', english: 'joy / happiness', exampleHindi: 'उस शाम मुझे बहुत ख़ुशी हुई।', exampleEnglish: 'That evening I felt very happy.', emoji: '😊', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'ख़ास', transliteration: 'khaas', english: 'special', exampleHindi: 'यह मेरे लिए एक ख़ास पल था।', exampleEnglish: 'This was a special moment for me.', emoji: '💖', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'अविस्मरणीय', transliteration: 'avismaraneeya', english: 'unforgettable', exampleHindi: 'वह यात्रा अविस्मरणीय थी।', exampleEnglish: 'That journey was unforgettable.', emoji: '🌠', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'प्यारा', transliteration: 'pyaara', english: 'dear / lovely', exampleHindi: 'दादी की आवाज़ बहुत प्यारी थी।', exampleEnglish: 'Grandma\'s voice was very lovely.', emoji: '🥰', partOfSpeech: 'adjective', subgroup: 'Feelings' },

    // People and places in memories
    { hindi: 'दादी', transliteration: 'daadi', english: 'paternal grandmother', exampleHindi: 'दादी रोज़ मुझे कहानी सुनाती थीं।', exampleEnglish: 'Grandma used to tell me a story every day.', emoji: '👵', partOfSpeech: 'noun', subgroup: 'People & places' },
    { hindi: 'नानी', transliteration: 'naani', english: 'maternal grandmother', exampleHindi: 'नानी के घर आम का पेड़ था।', exampleEnglish: 'There was a mango tree at Nani\'s house.', emoji: '👩‍🦳', partOfSpeech: 'noun', subgroup: 'People & places' },
    { hindi: 'गाँव', transliteration: 'gaon', english: 'village', exampleHindi: 'गाँव में रातें बहुत शांत होती थीं।', exampleEnglish: 'Nights in the village used to be very quiet.', emoji: '🌾', partOfSpeech: 'noun', subgroup: 'People & places' },
    { hindi: 'दादी की कहानियाँ', transliteration: 'daadi ki kahaaniyaan', english: "Grandma's stories", exampleHindi: 'दादी की कहानियाँ आज भी मेरे मन में हैं।', exampleEnglish: "Grandma's stories are still in my mind today.", emoji: '📖', partOfSpeech: 'phrase', subgroup: 'People & places' },

    // Past-tense verbs (perfective — the ने construction)
    { hindi: 'देखा', transliteration: 'dekha', english: 'saw (perfective of देखना)', exampleHindi: 'मैंने पहली बार समुद्र देखा।', exampleEnglish: 'I saw the sea for the first time.', emoji: '👀', partOfSpeech: 'verb', subgroup: 'Perfective past' },
    { hindi: 'किया', transliteration: 'kiya', english: 'did (perfective of करना)', exampleHindi: 'हमने बहुत मस्ती की।', exampleEnglish: 'We had a lot of fun.', emoji: '✅', partOfSpeech: 'verb', subgroup: 'Perfective past' },
    { hindi: 'खाया', transliteration: 'khaaya', english: 'ate (perfective of खाना)', exampleHindi: 'मैंने नानी के हाथ का आम खाया।', exampleEnglish: "I ate a mango from Nani's own hand.", emoji: '🥭', partOfSpeech: 'verb', subgroup: 'Perfective past' },
    { hindi: 'मिला', transliteration: 'mila', english: 'met / got (perfective of मिलना)', exampleHindi: 'मुझे दिवाली पर एक नया दीया मिला।', exampleEnglish: 'I got a new diya on Diwali.', emoji: '🤝', partOfSpeech: 'verb', subgroup: 'Perfective past' },
    { hindi: 'सुना', transliteration: 'suna', english: 'heard (perfective of सुनना)', exampleHindi: 'मैंने दादी से एक पुरानी कहानी सुनी।', exampleEnglish: 'I heard an old story from Grandma.', emoji: '👂', partOfSpeech: 'verb', subgroup: 'Perfective past' },
    { hindi: 'गया', transliteration: 'gaya', english: 'went (perfective of जाना, intransitive — no ने)', exampleHindi: 'पिछले साल मैं भारत गया।', exampleEnglish: 'Last year I went to India.', emoji: '✈️', partOfSpeech: 'verb', subgroup: 'Perfective past' },

    // Imperfective past — habitual/ongoing
    { hindi: 'खेलता था', transliteration: 'khelta tha', english: 'used to play (imperfective of खेलना)', exampleHindi: 'मैं हर शाम दोस्तों के साथ क्रिकेट खेलता था।', exampleEnglish: 'I used to play cricket with friends every evening.', emoji: '🏏', partOfSpeech: 'verb', subgroup: 'Imperfective past' },
    { hindi: 'जाते थे', transliteration: 'jaate the', english: 'used to go (imperfective plural)', exampleHindi: 'हम हर गर्मी पहाड़ों पर जाते थे।', exampleEnglish: 'We used to go to the mountains every summer.', emoji: '⛰️', partOfSpeech: 'verb', subgroup: 'Imperfective past' },
    { hindi: 'रहता था', transliteration: 'rahta tha', english: 'used to live (imperfective of रहना)', exampleHindi: 'बचपन में मैं एक छोटे शहर में रहता था।', exampleEnglish: 'In childhood I used to live in a small town.', emoji: '🏠', partOfSpeech: 'verb', subgroup: 'Imperfective past' },
    { hindi: 'सुनाती थीं', transliteration: 'sunaati theen', english: 'used to tell / narrate (fem. honorific)', exampleHindi: 'दादी मुझे रोज़ एक नई कहानी सुनाती थीं।', exampleEnglish: 'Grandma used to tell me a new story every day.', emoji: '🗣️', partOfSpeech: 'verb', subgroup: 'Imperfective past' },

    // Reflection verbs (for the closing paragraph shift to present)
    { hindi: 'याद आना', transliteration: 'yaad aana', english: 'to be remembered / come to mind', exampleHindi: 'आज भी मुझे वह दिन याद आता है।', exampleEnglish: 'Even today, that day comes to my mind.', emoji: '💭', partOfSpeech: 'verb', subgroup: 'Reflection' },
    { hindi: 'महसूस करना', transliteration: 'mahsoos karna', english: 'to feel / sense', exampleHindi: 'मैं आज भी वह ख़ुशी महसूस करता हूँ।', exampleEnglish: 'I still feel that happiness today.', emoji: '💓', partOfSpeech: 'verb', subgroup: 'Reflection' },
  ],
  vocabularyNote: {
    why:
      'These 30 words are the narrow set a Level-3 memory essay pulls from. Notice the split: six time markers (the scaffold), six perfective past verbs (मैंने देखा / मैंने खाया), four imperfective past verbs (मैं खेलता था), and two reflection verbs for the closing shift to present. A student who memorizes this list in these four groups can produce a benchmark-5 memory essay on almost any prompt.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage + Language Control: narration requires topic-specific verbs AND tense control.',
  },

  grammar: [
    {
      title: 'Perfective past with ने — the rule that most students get wrong',
      rule:
        'For TRANSITIVE verbs in the simple past (देखा, खाया, किया, सुना, लिखा, कहा), the subject takes ने and the verb agrees with the OBJECT in gender and number — not with the subject. The subject pronoun drops its normal form: मैं → मैंने, हम → हमने, वह → उसने.',
      examples: [
        { hindi: 'मैंने एक कहानी सुनी।', transliteration: 'maine ek kahaani suni.', english: 'I heard a story. (कहानी is feminine singular → सुनी, not सुना)' },
        { hindi: 'मैंने आम खाए।', transliteration: 'maine aam khaaye.', english: 'I ate mangoes. (आम is masculine plural → खाए)' },
        { hindi: 'हमने पुरानी तस्वीरें देखीं।', transliteration: 'humne puraani tasveerein dekheen.', english: 'We saw old photos. (तस्वीरें is feminine plural → देखीं)' },
        { hindi: 'दादी ने मुझे एक कहानी सुनाई।', transliteration: 'daadi ne mujhe ek kahaani sunaayi.', english: 'Grandma told me a story. (कहानी is feminine singular → सुनाई)' },
      ],
      pitfall:
        'The two most common errors: (1) writing "मैं देखा" without ने, and (2) agreeing the verb with the subject ("मैंने कहानी सुना" instead of "सुनी"). Both immediately drop Language Control to Low in a rater\'s mind. For INTRANSITIVE verbs (जाना, आना, होना), there is no ने — write "मैं गया", not "मैंने गया".',
      whyItMatters:
        'The ने construction is the single most visible marker of past-tense control in Hindi. A rater scanning for Benchmark 5 is literally looking for correct ने sentences. Three clean ones in an essay stabilize Language Control at Average; three wrong ones cap the essay at Benchmark 4.',
    },
    {
      title: 'Imperfective past — habitual "used to" (खेलता था / जाते थे)',
      rule:
        'To describe something that USED TO happen regularly in the past (the heart of memory narration), use the imperfective: verb-stem + ता/ती/ते + था/थी/थे. No ने. Agreement is with the SUBJECT. This is how you say "I used to play", "we used to go", "Grandma used to tell stories".',
      examples: [
        { hindi: 'मैं हर रविवार दादा-दादी से मिलने जाता था।', transliteration: 'main har ravivaar daada-daadi se milne jaata tha.', english: 'I used to go meet my grandparents every Sunday. (masc. sing.)' },
        { hindi: 'हम गर्मी में पहाड़ों पर जाते थे।', transliteration: 'hum garmi mein pahaadon par jaate the.', english: 'We used to go to the mountains in summer. (plural)' },
        { hindi: 'नानी बगीचे में तुलसी लगाती थीं।', transliteration: 'naani bagiche mein tulsi lagaati theen.', english: 'Nani used to plant tulsi in the garden. (fem. honorific plural)' },
        { hindi: 'जब मैं छोटा था, तब मुझे बारिश पसंद थी।', transliteration: 'jab main chhota tha, tab mujhe baarish pasand thi.', english: 'When I was small, I used to like rain.' },
      ],
      pitfall:
        'Students mix up the two pasts. Rule of thumb: ONE completed action in the past → perfective (मैंने खाया). A habit or ongoing state in the past → imperfective (मैं खाता था). In a memory essay you need BOTH — the habit sets the scene, the specific event is the story.',
      whyItMatters:
        'Benchmark 5 requires "some control of past, present, and future time frames." A memory essay that ONLY uses perfective reads as a list of events. A memory essay that BLENDS imperfective (scene-setting) with perfective (specific moments) reads as narrative — exactly what the rubric means by connected discourse.',
    },
    {
      title: 'जब... तब — the relative-time clause that signals Benchmark 5',
      rule:
        'To link two past events or a past state to a past event, use जब (when) in the first clause and तब (then) in the second. This produces a complex sentence — two clauses held together by time — which is precisely the structure Benchmark 5 rewards over simple-sentence strings.',
      examples: [
        { hindi: 'जब मैं सात साल का था, तब हम भारत गए।', transliteration: 'jab main saat saal ka tha, tab hum bhaarat gaye.', english: 'When I was seven years old, (then) we went to India.' },
        { hindi: 'जब दादी ने कहानी शुरू की, तब सब चुप हो गए।', transliteration: 'jab daadi ne kahaani shuru ki, tab sab chup ho gaye.', english: 'When Grandma began the story, (then) everyone became quiet.' },
        { hindi: 'जब पहली बरसात हुई, तब हम बाहर दौड़ पड़े।', transliteration: 'jab pahli barsaat hui, tab hum baahar daud pade.', english: 'When the first rain came, (then) we ran outside.' },
      ],
      pitfall:
        'Dropping तब in the second clause is fine in speech but weakens the structure in writing. Also: जब takes the past-tense in both clauses when describing the past — do not slip into present.',
      whyItMatters:
        'A single जब... तब sentence signals complex syntax to the rater. Two in one essay practically guarantees Text-Type 5. Miss this structure and the essay reads like Intermediate-Low strings of sentences, no matter how correct each sentence is.',
    },
    {
      title: 'Closing-paragraph tense shift: past → present reflection',
      rule:
        'An Intermediate-Mid memory essay does not end in the past. It shifts to the present in the final paragraph to reflect on why the memory matters NOW. This is the "some control of major time frames" the rubric asks for. Signal the shift with आज भी, अब, आजकल, or मुझे लगता है कि.',
      examples: [
        { hindi: 'आज भी जब मैं उस तस्वीर को देखता हूँ, मुझे वह दिन याद आता है।', transliteration: 'aaj bhi jab main us tasveer ko dekhta hoon, mujhe vah din yaad aata hai.', english: 'Even today when I look at that photo, I remember that day.' },
        { hindi: 'मुझे लगता है कि बचपन की यादें ज़िंदगी का सबसे क़ीमती हिस्सा हैं।', transliteration: 'mujhe lagta hai ki bachpan ki yaadein zindagi ka sabse qeemti hissa hain.', english: 'I think that childhood memories are the most precious part of life.' },
      ],
      pitfall:
        'Ending the essay with one more past event ("फिर हम घर आए") loses the rubric point. The essay must step OUT of the past, even briefly, for the rater to see tense shifting.',
      whyItMatters:
        'This single technique — three past paragraphs closed by one present reflection — is the cleanest way to hit "control of more than one time frame" on a memory prompt. Raters recognize it instantly.',
    },
  ],
  grammarNote: {
    why:
      'These four rules cover roughly 90% of grammatical decisions in a memory essay. The ने construction is the booby trap. The perfective/imperfective split is the narrative engine. जब...तब is the Benchmark-5 upgrade. The final tense shift is the rubric-visible closing move. Drill them in this order.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'jabTab',
    'kyonki',
    'lekin',
    'isliye',
    'iskeBaad',
    'antMein',
    'halaanki',
    'meraManna',
    'mujheLagta',
  ]),
  connectorsNote: {
    why:
      'For a memory essay the single most load-bearing connector is जब...तब — it is how Hindi natively joins a past scene to a past event. क्योंकि and इसलिए add the "why this memory matters" raters reward. हालाँकि lets you introduce a contrast ("Although the village was far, I loved visiting") which signals Intermediate-Mid complexity. मुझे लगता है कि and मेरा मानना है कि power the closing reflection paragraph and explicitly shift tense to the present.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'गाँव की पहली बरसात · The First Rain in the Village',
    hindi:
      'जब मैं आठ साल का था, तब हम हर गर्मी नानी के गाँव जाते थे। गाँव छोटा था, लेकिन मुझे वहाँ बहुत अच्छा लगता था। नानी के आँगन में एक बड़ा आम का पेड़ था, और हर सुबह हम उसके नीचे बैठकर चाय पीते थे। मुझे आज भी वह पेड़ याद है।\n\nएक दिन बहुत गर्मी थी। अचानक बादल छा गए और पहली बरसात शुरू हो गई। मैंने और मेरे भाई ने छत पर जाकर भीगना शुरू कर दिया। नानी ने नीचे से आवाज़ लगाई, लेकिन हम हँसते रहे। फिर नानी ने गरम पकौड़े बनाए और हमें बुलाया। हमने पकौड़े खाए और मीठी चाय पी।\n\nआज भी जब बारिश होती है, मुझे नानी का वह आँगन याद आता है। मुझे लगता है कि वह दिन मेरी ज़िंदगी का सबसे यादगार दिन था।',
    transliteration:
      'jab main aath saal ka tha, tab hum har garmi naani ke gaon jaate the. gaon chhota tha, lekin mujhe vahaan bahut achchha lagta tha. naani ke aangan mein ek bada aam ka ped tha, aur har subah hum uske neeche baithkar chaay peete the. mujhe aaj bhi vah ped yaad hai.\n\nek din bahut garmi thi. achaanak baadal chha gaye aur pahli barsaat shuru ho gayi. maine aur mere bhai ne chhat par jaakar bheegna shuru kar diya. naani ne neeche se aavaaz lagaayi, lekin hum hanste rahe. phir naani ne garam pakaude banaaye aur hamein bulaaya. humne pakaude khaaye aur meethi chaay pee.\n\naaj bhi jab baarish hoti hai, mujhe naani ka vah aangan yaad aata hai. mujhe lagta hai ki vah din meri zindagi ka sabse yaadgaar din tha.',
    english:
      'When I was eight years old, we used to go to my Nani\'s village every summer. The village was small, but I loved it there very much. In Nani\'s courtyard there was a big mango tree, and every morning we used to sit underneath it and drink tea. I still remember that tree today.\n\nOne day it was very hot. Suddenly clouds gathered and the first rain began. My brother and I went up to the roof and started getting drenched. Nani called out from below, but we kept laughing. Then Nani made hot pakoras and called us. We ate the pakoras and drank sweet tea.\n\nEven today when it rains, I remember Nani\'s courtyard. I think that day was the most memorable day of my life.',
    highlights: [
      { term: 'जब मैं आठ साल का था, तब हम जाते थे', note: 'The opening pairs जब...तब with imperfective past — the strongest possible Benchmark-5 opener. One sentence signals BOTH complex syntax AND tense control.' },
      { term: 'बैठकर चाय पीते थे (imperfective) vs. मैंने खाए / नानी ने बनाए (perfective)', note: 'The passage deliberately mixes habitual past (what we used to do) with specific perfective events (what happened that one day). This is the narrative engine of memory writing.' },
      { term: 'मैंने / हमने / नानी ने', note: 'Three correct ने-construction sentences across the passage. Each one is a visible Language-Control checkmark for the rater.' },
      { term: 'लेकिन / फिर / आज भी / मुझे लगता है कि', note: 'Four different connector types: contrast, sequence, present-time shift, reflective opinion. Raters scan for this variety.' },
      { term: 'आज भी ... मुझे लगता है कि', note: 'The closing paragraph steps out of the past into the present. This is the explicit tense-frame shift that earns Benchmark 5.' },
      { term: 'नानी का आँगन, आम का पेड़, गरम पकौड़े', note: 'Three concrete cultural details — a grandparent, a village courtyard, monsoon pakoras — not generic "it was nice". Topic Coverage lift.' },
    ],
    comprehensionQuestions: [
      { q: 'How old was the narrator when they used to visit Nani\'s village?', a: 'आठ साल का (eight years old).' },
      { q: 'What was in Nani\'s courtyard?', a: 'एक बड़ा आम का पेड़ (a big mango tree).' },
      { q: 'What did the family do every morning?', a: 'They used to sit under the mango tree and drink tea — the habitual past (पीते थे).' },
      { q: 'What specific event happened "one day"?', a: 'The first rain started, and the children got drenched on the roof while Nani made pakoras.' },
      { q: 'Identify one perfective-past sentence and one imperfective-past sentence.', a: 'Perfective: "मैंने और मेरे भाई ने ... भीगना शुरू कर दिया" or "नानी ने पकौड़े बनाए". Imperfective: "हम जाते थे" or "हम चाय पीते थे".' },
      { q: 'Why does the writer say "आज भी" in the last paragraph?', a: 'To shift the tense from past to present — showing that the memory still affects them today.' },
      { q: 'Name one cultural specific in the passage.', a: 'Any of: नानी के गाँव, आम का पेड़, छत पर भीगना, गरम पकौड़े, मीठी चाय.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is the exact shape your own memory essay should take: paragraph 1 sets the habitual scene (imperfective past), paragraph 2 narrates a specific event (perfective past with ने), paragraph 3 reflects in the present. Every sentence shape here is reusable. Read it aloud three times before attempting a prompt — the rhythm of Hindi past narration will start to feel automatic.',
    trains: ['TextType', 'TopicCoverage', 'LanguageControl'],
  },

  modelTexts: [
    {
      kind: 'diary',
      title: 'पुरानी डायरी का पन्ना · A Page from an Old Diary',
      hindi:
        'आज मुझे अपनी पुरानी डायरी मिली। उसमें एक पन्ना था जिस पर लिखा था — "आज हमने पहली बार बर्फ़ देखी।" वह दस साल पहले की बात है। तब हम कश्मीर गए थे। ठंड बहुत थी, लेकिन हम बहुत खुश थे। मैंने अपनी माँ को गले लगाया और रोने लगा, क्योंकि बर्फ़ इतनी सुंदर थी।',
      transliteration:
        'aaj mujhe apni puraani daayree mili. usmein ek panna tha jis par likha tha — "aaj humne pahli baar barf dekhi." vah das saal pahle ki baat hai. tab hum kashmeer gaye the. thand bahut thi, lekin hum bahut khush the. maine apni maa ko gale lagaaya aur rone laga, kyonki barf itni sundar thi.',
      english:
        'Today I found my old diary. In it there was a page on which was written — "Today we saw snow for the first time." That is from ten years ago. At that time we had gone to Kashmir. It was very cold, but we were very happy. I hugged my mother and began to cry, because the snow was so beautiful.',
    },
    {
      kind: 'letter',
      title: 'दादी को चिट्ठी · A Letter to Grandma',
      hindi:
        'प्यारी दादी,\n\nकल रात मुझे आपकी बहुत याद आई। मुझे याद है जब मैं छोटी थी, आप रोज़ रात मुझे कहानी सुनाती थीं। आपने एक बार राजा-रानी की कहानी सुनाई थी — मैं वह आज भी नहीं भूली। अगले महीने मैं भारत आऊँगी। तब हम फिर से साथ चाय पिएँगे।\n\nआपकी प्यारी, मीरा',
      transliteration:
        'pyaari daadi, kal raat mujhe aapki bahut yaad aayi. mujhe yaad hai jab main chhoti thi, aap roz raat mujhe kahaani sunaati theen. aapne ek baar raaja-raani ki kahaani sunaayi thi — main vah aaj bhi nahin bhooli. agle mahine main bhaarat aaoongi. tab hum phir se saath chaay piyenge. aapki pyaari, Meera',
      english:
        'Dear Grandma, Last night I missed you very much. I remember when I was small, you used to tell me a story every night. You once told me the story of a king and queen — I have not forgotten it even today. Next month I will come to India. Then we will drink tea together again. Your dear, Meera',
    },
    {
      kind: 'sms',
      title: 'पुराने दोस्त को संदेश · Message to an Old Friend',
      hindi:
        'अरे राहुल! कल मुझे हमारी पुरानी स्कूल की तस्वीर मिली 😂 याद है हमने छठी क्लास में साथ में वह नाटक किया था? तुमने तो अपनी लाइनें भी भूल गई थीं! कितना मज़ा आया था। अगली बार जब भारत आऊँ, तब ज़रूर मिलते हैं।',
      transliteration:
        'are Rahul! kal mujhe hamaari puraani school ki tasveer mili 😂 yaad hai humne chhatthi class mein saath mein vah naatak kiya tha? tumne to apni lines bhi bhool gaye the! kitna mazaa aaya tha. agli baar jab bhaarat aaoon, tab zaroor milte hain.',
      english:
        'Hey Rahul! Yesterday I found our old school photo 😂 Remember we did that play together in sixth class? You even forgot your lines! We had so much fun. Next time when I come to India, we\'ll definitely meet.',
    },
    {
      kind: 'announcement',
      title: 'पारिवारिक मिलन की घोषणा · Family Reunion Announcement',
      hindi:
        'प्यारे परिवार, इस दिसंबर हम सब दादा-दादी के घर इकट्ठा हो रहे हैं। जैसे हम बचपन में हर साल मिलते थे, वैसे ही इस बार भी मिलेंगे। पुरानी तस्वीरें, पुरानी कहानियाँ, और दादी के हाथ का खाना — तीनों मिलकर एक यादगार शाम बनाएँगे। ज़रूर आइए।',
      transliteration:
        'pyaare parivaar, is december hum sab daada-daadi ke ghar ikatthe ho rahe hain. jaise hum bachpan mein har saal milte the, vaise hi is baar bhi milenge. puraani tasveerein, puraani kahaaniyaan, aur daadi ke haath ka khaana — teenon milkar ek yaadgaar shaam banaayenge. zaroor aaiye.',
      english:
        'Dear Family, this December we are all gathering at Grandma and Grandpa\'s house. Just as we used to meet every year in childhood, we will meet this time too. Old photos, old stories, and Grandma\'s home-cooked food — together the three will make for a memorable evening. Please do come.',
    },
  ],
  modelTextsNote: {
    why:
      'Four text-types that all naturally carry past-tense narration: a diary (private reflection), a letter to a grandparent (affectionate past), an SMS to an old friend (casual past), and a family announcement (habitual past bridging to future). Each one is a different register — the student sees that memory writing is not one voice, it is many.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Summer Visits to Nani\'s House (ननिहाल)',
      body:
        'Across much of North India, children spend their school summer holidays at their maternal grandparents\' home — the ननिहाल. The word itself carries memory. Mentioning "मैं हर गर्मी नानी के घर जाता था" is instantly recognizable as an authentic childhood scene and earns a Topic-Coverage lift no generic "summer vacation" can match.',
      emoji: '🏡',
    },
    {
      title: 'Grandmother\'s Stories at Bedtime',
      body:
        'Dadi or Nani narrating folk tales — the clever Birbal, the stubborn donkey, the king who disguised himself — is a shared childhood memory for millions of Hindi-speaking households. Writing "दादी मुझे हर रात एक कहानी सुनाती थीं" immediately invokes this cultural frame and gives raters the concrete detail the rubric rewards.',
      emoji: '📖',
    },
    {
      title: 'The First Monsoon (पहली बरसात)',
      body:
        'The arrival of the year\'s first heavy rain after brutal summer heat is a cultural moment, not just weather. Children run out, families make garam pakore and chai, and the smell of wet earth (मिट्टी की सोंधी ख़ुशबू) is a universal North-Indian memory cue. This is exactly the kind of specific sensory detail Benchmark 5 essays use to lift above generic.',
      emoji: '🌧️',
    },
    {
      title: 'Diaspora Memories — Annual India Trips',
      body:
        'For Hindi-speaking students in the US, the annual or biennial trip to India IS the memory topic. Framing a memory around "पिछली गर्मी जब हम भारत गए" is authentic to the student\'s real experience and avoids the trap of inventing village life they have never lived.',
      emoji: '✈️',
    },
    {
      title: 'Festival Memories — Diwali Rangoli and Holi Colors',
      body:
        'A specific festival memory — making rangoli with Mom the night before Diwali, the first time you threw colored water on someone at Holi — is a ready-made 3-paragraph scaffold: preparation (imperfective past), the event itself (perfective past), present reflection. Memory essays that anchor on a festival almost write themselves.',
      emoji: '🪔',
    },
  ],
  culturalNote: {
    why:
      'Memory essays fail when they become generic ("my childhood was good, I played, I was happy"). They pass Benchmark 5 when they name ONE specific Indian cultural anchor — ननिहाल, दादी की कहानी, पहली बरसात, पिछली भारत यात्रा, दिवाली की रंगोली. Pick one per essay and the Topic-Coverage score takes care of itself.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    {
      phrase: 'यादें ताज़ा होना',
      literal: 'memories becoming fresh',
      meaning: 'Old memories come vividly back to mind.',
      example: 'पुरानी तस्वीरें देखकर मेरी बचपन की यादें ताज़ा हो गईं।',
      exampleEnglish: 'Seeing the old photos, my childhood memories came vividly back.',
    },
    {
      phrase: 'दिल को छू जाना',
      literal: 'to touch the heart',
      meaning: 'To move someone deeply; to leave a lasting emotional impression.',
      example: 'दादी की वह आख़िरी कहानी मेरे दिल को छू गई।',
      exampleEnglish: "That last story of Grandma's touched my heart.",
    },
  ],
  muhavareNote: {
    why:
      'Both muhavare are memory-native — यादें ताज़ा होना literally means memories getting fresh, and दिल को छू जाना is the emotional seal on a reflective closing. Placing exactly one inside a memory essay (not both) reads as genuine register mastery. Two starts to feel forced.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt: 'अपनी बचपन की सबसे यादगार याद के बारे में तीन अनुच्छेदों में लिखिए। (Write in three paragraphs about the most memorable memory from your childhood.)',
      novice: 'मेरा बचपन अच्छा था। मेरी दादी अच्छी थी। मुझे खुशी थी।',
      intermediateMid:
        'जब मैं सात साल का था, तब हम हर गर्मी में भारत जाते थे। मेरी दादी एक छोटे शहर में रहती थीं। उनका घर पुराना था, लेकिन बहुत प्यारा था। हर शाम दादी आँगन में बैठकर हमें कहानियाँ सुनाती थीं। मुझे राजा-रानी की कहानियाँ सबसे अच्छी लगती थीं।\n\nएक शाम बहुत तेज़ बारिश हुई। दादी ने गरम-गरम पकौड़े बनाए, और हमने सब ने साथ बैठकर खाए। मैंने पहली बार दादी के हाथ का अदरक वाला चाय पिया। क्योंकि बिजली चली गई थी, इसलिए दादी ने मोमबत्ती जलाई और एक पुरानी कहानी सुनाई। वह शाम मेरी यादों में आज भी ताज़ा है।\n\nआज मैं अमेरिका में रहता हूँ, लेकिन जब भी बारिश होती है, मुझे दादी का वह आँगन याद आता है। मुझे लगता है कि बचपन की ऐसी यादें ही ज़िंदगी का सबसे क़ीमती हिस्सा होती हैं। अगली गर्मी में मैं फिर भारत जाऊँगा और दादी के साथ एक और शाम बिताऊँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'जब मैं सात साल का था, तब हम जाते थे', note: 'Opening pairs जब...तब with imperfective past — the strongest possible Benchmark-5 opener.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'जाते थे / रहती थीं / सुनाती थीं / लगती थीं', note: 'Four imperfective-past verbs in one paragraph. Habitual childhood = imperfective. Textbook scene-setting.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'लेकिन', note: 'Contrast connector between "old house" and "very dear" — the kind of reasoning Benchmark 5 rewards.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'दादी ने बनाए / हमने खाए / मैंने पिया / दादी ने सुनाई', note: 'Four correct ने-construction perfective sentences. Verb agrees with object (पकौड़े masc. plural → बनाए; कहानी fem. sing. → सुनाई).' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि ... इसलिए', note: 'Cause + consequence pair in one sentence — explicit reasoning, Text-Type lift.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'यादों में आज भी ताज़ा', note: 'Muhavara यादें ताज़ा होना woven into the narrative, not appended — correct register use.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'आज मैं रहता हूँ ... मुझे आता है ... जाऊँगा', note: 'Present + future in the closing paragraph. Three time frames across the essay — Benchmark 5 sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... ही ... होती हैं', note: 'Reflective generalization — memory essay stops being personal and becomes universal. Classic IM move.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'दादी का आँगन / भारत जाऊँगा', note: 'Authentic diaspora framing — ties childhood memory to the student\'s real present life.' },
      ],
      wordCount: 152,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['जब... तब', 'लेकिन', 'क्योंकि', 'इसलिए', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Paragraph 1 is pure imperfective past (जाते थे, रहती थीं, सुनाती थीं) — habitual childhood scene. Paragraph 2 pivots to perfective past (बनाए, खाए, सुनाई) — specific memorable event. This is exactly the narrative engine STAMP raters reward at Benchmark 5.',
          'Four correct ने-construction sentences in paragraph 2, each with proper object agreement (पकौड़े → बनाए, कहानी → सुनाई). Language Control stabilizes at Average or higher.',
          'Closing paragraph steps out of the past into present (रहता हूँ, आता है, लगता है) and future (जाऊँगा, बिताऊँगा) — three time frames in one 152-word essay, textbook Intermediate-Mid.',
          'Five different connectors used correctly (जब...तब, लेकिन, क्योंकि, इसलिए, मुझे लगता है कि). Text-Type 5 confirmed.',
          'Concrete cultural anchors — हर गर्मी भारत जाना, दादी के हाथ का अदरक वाला चाय, बिजली चली गई तो मोमबत्ती — lift Topic Coverage above generic "my childhood was happy" responses.',
        ],
        gotchas: [
          'If the narrator is female, "सात साल का था" must become "सात साल की थी" throughout — inconsistent gender across the essay drops Language Control to Low immediately.',
          'Writing "मैं पकौड़े खाए" (dropping ने) is the most common error here — it must be "मैंने पकौड़े खाए" with the object-agreement plural ending.',
          'If the closing paragraph slides back into the past ("और फिर मैं सो गया"), the tense-shift point is lost and the essay caps at Benchmark 4.',
        ],
      },
    },
    {
      prompt:
        'अपने परिवार की किसी एक ख़ास याद के बारे में तीन अनुच्छेदों में लिखिए — कौन था, क्या हुआ, और आपको आज भी क्यों याद है। (Write in three paragraphs about one special memory of your family — who was there, what happened, and why you still remember it.)',
      novice: 'मेरा परिवार अच्छा है। हम भारत गए। हमें मज़ा आया।',
      intermediateMid:
        'कुछ साल पहले की बात है। उस समय मैं नौ साल की थी, और हमारे परिवार में मेरे दादा जी की अस्सीवीं सालगिरह थी। हम सब — अमेरिका से, दिल्ली से, और मुंबई से — दादा जी के पुराने घर में इकट्ठा हुए। बचपन में मैं बहुत कम बार पूरे परिवार से मिली थी, इसलिए वह दिन मेरे लिए बहुत ख़ास था।\n\nउस शाम माँ और बुआ ने मिलकर दादा जी की पसंद का खाना बनाया। मैंने पहली बार अपनी सब चचेरी बहनों के साथ रंगोली बनाई। हालाँकि मुझे रंगोली बनानी नहीं आती थी, मेरी बड़ी दीदी ने मुझे सिखाया। जब दादा जी ने केक काटा, तब सब की आँखों में आँसू थे। दादी ने एक पुरानी तस्वीर निकाली और हमें दादा जी के बचपन की कहानी सुनाई।\n\nआज दादा जी हमारे बीच नहीं हैं, लेकिन वह शाम मेरे दिल को छू गई थी और आज भी मेरे साथ है। जब भी मैं वह तस्वीर देखती हूँ, मेरी यादें ताज़ा हो जाती हैं। मेरा मानना है कि परिवार की ऐसी शाम ही असली ख़ज़ाना होती है।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'कुछ साल पहले ... उस समय मैं नौ साल की थी', note: 'Two time markers in the first two sentences — anchors the past frame unambiguously.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'अस्सीवीं सालगिरह / इकट्ठा हुए', note: 'Specific event vocabulary (eightieth birthday, gathered). Topic-Coverage signal.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'बहुत कम बार मिली थी, इसलिए', note: 'Past-perfect + reasoning connector — shows control of layered past time.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'माँ और बुआ ने बनाया / मैंने बनाई / दीदी ने सिखाया / दादा जी ने काटा / दादी ने सुनाई', note: 'Five perfective ने-construction sentences in one paragraph, each with correct object agreement. A rater\'s Language Control checkbox filled five times.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि ... सिखाया', note: 'Concessive हालाँकि is an Intermediate-Mid connector — rarely used incorrectly means real mastery.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'जब दादा जी ने केक काटा, तब सब की आँखों में आँसू थे', note: 'Textbook जब...तब complex sentence linking a specific past event to a past emotional state. Benchmark-5 syntax.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'आज दादा जी नहीं हैं ... आज भी साथ है ... देखती हूँ ... ताज़ा हो जाती हैं', note: 'Entire closing paragraph in present tense. The past → present shift the rubric explicitly rewards.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'दिल को छू जाना / यादें ताज़ा हो जाना', note: 'Two muhavare in one paragraph — but each lands naturally in its own sentence, not forced. Register mastery.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मेरा मानना है कि ... ही असली ख़ज़ाना होती है', note: 'Reflective generalization + intensifier ही. Closes with an opinion statement, not another event.' },
      ],
      wordCount: 178,
      tenseUsed: ['past', 'present'],
      connectorsUsed: ['इसलिए', 'हालाँकि', 'जब... तब', 'लेकिन', 'मेरा मानना है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Paragraph 2 contains five correct ने-construction sentences in a row, each with precise object agreement (खाना → बनाया masc. sing., रंगोली → बनाई fem. sing., कहानी → सुनाई fem. sing.). This density of correct perfective past is what pushes Language Control toward Average-High.',
          'The जब दादा जी ने केक काटा, तब sentence is a textbook Benchmark-5 complex clause — two past events bound by relative time. One such sentence alone signals Text-Type 5; this essay has two.',
          'हालाँकि used correctly in paragraph 2 is an Intermediate-Mid marker. Students below IM avoid it. Using it without error signals control of concessive syntax.',
          'Closing paragraph is fully in present tense (नहीं हैं, है, देखती हूँ, ताज़ा हो जाती हैं) — clean two-time-frame shift. The rubric\'s "some control of past, present, and future" is satisfied by past + present.',
          'Two culturally specific details (अस्सीवीं सालगिरह, चचेरी बहनों के साथ रंगोली) and two muhavare woven into narrative, not appended — Topic Coverage and Text-Type both lift.',
        ],
        gotchas: [
          'The narrator is established as female in paragraph 1 (नौ साल की थी, मिली थी). If any verb slips to masculine (e.g., देखता हूँ instead of देखती हूँ), the inconsistency drops Language Control one full band.',
          'If the student writes "मैं रंगोली बनाई" instead of "मैंने रंगोली बनाई", the ने construction breaks and the rater notices instantly.',
          'If the closing paragraph had stayed in the past ("और फिर हम सो गए"), the present-tense reflection move would be lost and this essay would sit at Benchmark 4 despite the rich vocabulary.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked Benchmark-5 memory essays. Essay 1 is the three-tense template (past → present → future). Essay 2 is the two-tense template (past → present) with deeper past density. Both are viable for FCPS Writing — different topics reward different templates. Study the annotations until the sentence shapes are automatic, then attempt the prompts below.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने बचपन की एक ख़ास याद के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप कितने साल के थे, उस दिन क्या हुआ, और वह याद आज भी आपके लिए क्यों ख़ास है।',
      english:
        'Write three paragraphs about a special memory from your childhood. Say how old you were, what happened that day, and why the memory is still special to you today.',
      hint: {
        connectors: ['जब... तब', 'क्योंकि', 'लेकिन', 'मुझे लगता है कि'],
        vocab: ['बचपन में', 'यादगार', 'दादी', 'ख़ुशी', 'याद आना'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अपने परिवार के साथ बिताई किसी एक यादगार छुट्टी के बारे में तीन अनुच्छेदों में लिखिए — आप कहाँ गए थे, वहाँ क्या किया, और वह यात्रा आज भी क्यों अविस्मरणीय है।',
      english:
        'Write three paragraphs about one memorable vacation with your family — where you had gone, what you did there, and why the trip is still unforgettable.',
      hint: {
        connectors: ['पिछले साल', 'इसके बाद', 'हालाँकि', 'अंत में'],
        vocab: ['अनुभव', 'ख़ास', 'अविस्मरणीय', 'गया / गई', 'देखा / खाया'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अपने दादा-दादी या नाना-नानी के साथ बिताए किसी ख़ास पल के बारे में तीन अनुच्छेदों में लिखिए। उनकी कोई कहानी, कोई आदत, या कोई सीख याद कीजिए।',
      english:
        'Write three paragraphs about a special moment spent with your grandparents. Recall one of their stories, one of their habits, or one lesson they taught you.',
      hint: {
        connectors: ['जब... तब', 'इसलिए', 'मेरा मानना है कि', 'आज भी'],
        vocab: ['दादी की कहानियाँ', 'सुनाती थीं', 'बचपन में', 'प्यारा', 'क्षण'],
        tenses: ['past', 'present'],
      },
    },
  ],
  promptsNote: {
    why:
      'All three prompts are FCPS-shape: three cohesive paragraphs, personal past experience, explicit cue for present-tense reflection in the closing. Each hint strip pushes the student toward different connectors and a different past-tense profile — prompt 1 favors जब...तब; prompt 2 favors a sequence (पिछले साल → अंत में); prompt 3 pushes heavy imperfective past (सुनाती थीं) plus reflection. Rotate through them across multiple writing sessions.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'For a memory essay, the rubric is unusually simple. Language Control hinges almost entirely on the ने construction — get it right, you pass; get it wrong repeatedly, you cap at Benchmark 4. Text-Type hinges on the tense shift in the closing paragraph. Topic Coverage hinges on ONE concrete cultural anchor. Self-grade each essay against these three axes before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
