import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

// -----------------------------------------------------------------------------
// L3-03 My Future (मेरा भविष्य)
// Completes the three-tense mastery (past + present + FUTURE + conditional)
// that Benchmark 5 demands. Position on arc: pushing-to-IM.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L3-03-my-future',
  level: 3,
  themeGroup: 'Identity',
  topicTheme: 'future',
  order: 26,
  heroMotif: 'sunrise',
  titleHindi: 'मेरा भविष्य',
  titleEnglish: 'My Future',
  hook: 'Future tense + hypotheticals - the final piece of the three-time-frame puzzle the rubric requires.',
  heroPrompt: composeHeroPrompt(
    'A dawn horizon seen through a window frame, a graduation cap silhouette, a distant city skyline at sunrise, a tree whose roots form a compass rose, open notebook with aspirations sketched in Devanagari',
  ),

  rationale: {
    fcpsSubTopics: [
      'My Future (FCPS Level 3 - Identity, Aspirations & Goals)',
      'Careers and professions (FCPS Level 3 - Future Plans)',
      'Hypothetical and conditional reasoning (FCPS Level 3 stretch)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate a 10-year personal plan using at least five future-tense verbs correctly conjugated for gender.',
      'Use अगर ... तो ... conditional structures to reason about hypotheticals in Hindi.',
      'Shift cleanly between past experience, present effort, and future aspiration in a single essay.',
      'Name five careers in Hindi and describe what each profession does in one full sentence.',
      'Reflect on parental expectations vs. personal dreams without lapsing into English vocabulary.',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '100 min reading + 40 min essay',
    ifSkippedRisk:
      'Future tense is the one time-frame Benchmark 5 explicitly names and that students most often drop. Skipping this pack leaves essays stuck at Intermediate-Low (2 credits) no matter how good the past/present writing is - raters will cap the score.',
  },

  objectives: [
    {
      text: 'Conjugate five verbs (करना, जाना, बनना, पढ़ना, सीखना) in simple future for both masculine and feminine first person.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Write an अगर ... तो ... sentence using future or subjunctive in both clauses, without English fallback.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Produce a 3-paragraph essay that moves past → present → future explicitly with time markers (बचपन में, आज, दस साल बाद).',
      trains: ['TextType'],
    },
    {
      text: 'Use at least 10 aspiration-specific vocabulary items (सपना, लक्ष्य, पेशा, करियर, वैज्ञानिक, इंजीनियर, etc.) in context.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Reference one India-specific cultural expectation (family service, education-first, parental career preference) without stereotyping.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Aspiration nouns
    { hindi: 'सपना', transliteration: 'sapna', english: 'dream', exampleHindi: 'मेरा सपना डॉक्टर बनना है।', exampleEnglish: 'My dream is to become a doctor.', emoji: '💭', partOfSpeech: 'noun', subgroup: 'Aspirations' },
    { hindi: 'लक्ष्य', transliteration: 'lakshya', english: 'goal / aim', exampleHindi: 'मेरा लक्ष्य अच्छे कॉलेज में पढ़ना है।', exampleEnglish: 'My goal is to study at a good college.', emoji: '🎯', partOfSpeech: 'noun', subgroup: 'Aspirations' },
    { hindi: 'उद्देश्य', transliteration: 'uddeshya', english: 'purpose / objective', exampleHindi: 'मेरे जीवन का उद्देश्य दूसरों की मदद करना है।', exampleEnglish: "My life's purpose is to help others.", emoji: '🧭', partOfSpeech: 'noun', subgroup: 'Aspirations' },
    { hindi: 'करियर', transliteration: 'career', english: 'career', exampleHindi: 'मैं विज्ञान में करियर बनाना चाहता हूँ।', exampleEnglish: 'I want to build a career in science.', emoji: '📈', partOfSpeech: 'noun', subgroup: 'Aspirations' },
    { hindi: 'पेशा', transliteration: 'pesha', english: 'profession', exampleHindi: 'शिक्षण एक महान पेशा है।', exampleEnglish: 'Teaching is a great profession.', emoji: '💼', partOfSpeech: 'noun', subgroup: 'Aspirations' },
    { hindi: 'भविष्य', transliteration: 'bhavishya', english: 'future', exampleHindi: 'भविष्य में मैं भारत जाऊँगा।', exampleEnglish: 'In the future I will go to India.', emoji: '🌅', partOfSpeech: 'noun', subgroup: 'Aspirations' },
    { hindi: 'मेहनत', transliteration: 'mehnat', english: 'hard work / effort', exampleHindi: 'मेहनत के बिना सपना पूरा नहीं होता।', exampleEnglish: 'Without hard work, a dream is not fulfilled.', emoji: '💪', partOfSpeech: 'noun', subgroup: 'Aspirations' },

    // Careers
    { hindi: 'डॉक्टर', transliteration: 'doctor', english: 'doctor', exampleHindi: 'मेरी बहन डॉक्टर बनेगी।', exampleEnglish: 'My sister will become a doctor.', emoji: '🩺', partOfSpeech: 'noun', subgroup: 'Careers' },
    { hindi: 'इंजीनियर', transliteration: 'engineer', english: 'engineer', exampleHindi: 'पिताजी चाहते हैं कि मैं इंजीनियर बनूँ।', exampleEnglish: 'Father wants me to become an engineer.', emoji: '⚙️', partOfSpeech: 'noun', subgroup: 'Careers' },
    { hindi: 'शिक्षक', transliteration: 'shikshak', english: 'teacher', exampleHindi: 'अच्छा शिक्षक देश का भविष्य बनाता है।', exampleEnglish: "A good teacher builds a country's future.", emoji: '👨‍🏫', partOfSpeech: 'noun', subgroup: 'Careers' },
    { hindi: 'वैज्ञानिक', transliteration: 'vaigyaanik', english: 'scientist', exampleHindi: 'मैं वैज्ञानिक बनकर नई खोज करूँगा।', exampleEnglish: 'Becoming a scientist, I will make new discoveries.', emoji: '🔬', partOfSpeech: 'noun', subgroup: 'Careers' },
    { hindi: 'लेखक', transliteration: 'lekhak', english: 'writer', exampleHindi: 'मेरी माँ एक लेखक हैं।', exampleEnglish: 'My mother is a writer.', emoji: '✍️', partOfSpeech: 'noun', subgroup: 'Careers' },
    { hindi: 'कलाकार', transliteration: 'kalaakaar', english: 'artist', exampleHindi: 'कलाकार बनना आसान नहीं है।', exampleEnglish: 'Becoming an artist is not easy.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Careers' },
    { hindi: 'वकील', transliteration: 'vakeel', english: 'lawyer', exampleHindi: 'मेरे चाचा दिल्ली में वकील हैं।', exampleEnglish: 'My uncle is a lawyer in Delhi.', emoji: '⚖️', partOfSpeech: 'noun', subgroup: 'Careers' },

    // Future-tense verbs (masculine first-person forms)
    { hindi: 'बनूँगा / बनूँगी', transliteration: 'banoonga / banoongi', english: 'I will become (m/f)', exampleHindi: 'मैं बड़ा होकर डॉक्टर बनूँगा।', exampleEnglish: 'When I grow up I will become a doctor.', emoji: '🌱', partOfSpeech: 'verb', subgroup: 'Future verbs' },
    { hindi: 'करूँगा / करूँगी', transliteration: 'karoonga / karoongi', english: 'I will do (m/f)', exampleHindi: 'मैं हर दिन पढ़ाई करूँगा।', exampleEnglish: 'I will study every day.', emoji: '📝', partOfSpeech: 'verb', subgroup: 'Future verbs' },
    { hindi: 'जाऊँगा / जाऊँगी', transliteration: 'jaaoonga / jaaoongi', english: 'I will go (m/f)', exampleHindi: 'मैं अगले साल भारत जाऊँगी।', exampleEnglish: 'I will go to India next year.', emoji: '✈️', partOfSpeech: 'verb', subgroup: 'Future verbs' },
    { hindi: 'पढ़ूँगा / पढ़ूँगी', transliteration: 'padhoonga / padhoongi', english: 'I will study/read (m/f)', exampleHindi: 'मैं वर्जीनिया विश्वविद्यालय में पढ़ूँगा।', exampleEnglish: 'I will study at the University of Virginia.', emoji: '📚', partOfSpeech: 'verb', subgroup: 'Future verbs' },
    { hindi: 'सीखूँगा / सीखूँगी', transliteration: 'seekhoonga / seekhoongi', english: 'I will learn (m/f)', exampleHindi: 'मैं हिंदी और साथ में संस्कृत भी सीखूँगा।', exampleEnglish: 'I will learn Hindi and Sanskrit along with it.', emoji: '🧠', partOfSpeech: 'verb', subgroup: 'Future verbs' },
    { hindi: 'मदद करूँगा', transliteration: 'madad karoonga', english: 'I will help', exampleHindi: 'मैं अपने माता-पिता की मदद करूँगा।', exampleEnglish: 'I will help my parents.', emoji: '🤝', partOfSpeech: 'verb', subgroup: 'Future verbs' },

    // Time markers
    { hindi: 'अगले साल', transliteration: 'agle saal', english: 'next year', exampleHindi: 'अगले साल मैं कॉलेज जाऊँगा।', exampleEnglish: 'Next year I will go to college.', emoji: '📅', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'भविष्य में', transliteration: 'bhavishya mein', english: 'in the future', exampleHindi: 'भविष्य में मैं गाँव में स्कूल खोलूँगा।', exampleEnglish: 'In the future I will open a school in a village.', emoji: '🔭', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'दस साल बाद', transliteration: 'das saal baad', english: 'ten years later', exampleHindi: 'दस साल बाद मैं अपना क्लिनिक खोलूँगा।', exampleEnglish: 'Ten years later I will open my own clinic.', emoji: '⏳', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'जब मैं बड़ा होऊँगा', transliteration: 'jab main bada hoonga', english: 'when I grow up', exampleHindi: 'जब मैं बड़ा होऊँगा, तब मैं विदेश जाऊँगा।', exampleEnglish: 'When I grow up, then I will go abroad.', emoji: '🌟', partOfSpeech: 'phrase', subgroup: 'Time markers' },
    { hindi: 'जल्दी', transliteration: 'jaldi', english: 'soon', exampleHindi: 'मैं जल्दी ही अपनी परीक्षा दूँगा।', exampleEnglish: 'I will take my exam soon.', emoji: '⏰', partOfSpeech: 'adverb', subgroup: 'Time markers' },

    // Desiderative / modal chunks
    { hindi: 'चाहता हूँ कि', transliteration: 'chaahta hoon ki', english: 'I want that (+ subjunctive)', exampleHindi: 'मैं चाहता हूँ कि मेरा परिवार खुश रहे।', exampleEnglish: 'I want my family to stay happy.', emoji: '🙏', partOfSpeech: 'phrase', subgroup: 'Desiderative' },
    { hindi: 'आशा है कि', transliteration: 'aasha hai ki', english: 'I hope that', exampleHindi: 'मुझे आशा है कि मैं सफल हूँगा।', exampleEnglish: 'I hope that I will be successful.', emoji: '🌈', partOfSpeech: 'phrase', subgroup: 'Desiderative' },
    { hindi: 'सफल', transliteration: 'safal', english: 'successful', exampleHindi: 'हर माँ-बाप अपने बच्चे को सफल देखना चाहते हैं।', exampleEnglish: 'Every parent wants to see their child successful.', emoji: '🏆', partOfSpeech: 'adjective', subgroup: 'Desiderative' },
    { hindi: 'कठिन', transliteration: 'kathin', english: 'difficult', exampleHindi: 'यह रास्ता कठिन है, लेकिन मुमकिन है।', exampleEnglish: 'This path is difficult, but possible.', emoji: '🧗', partOfSpeech: 'adjective', subgroup: 'Desiderative' },
  ],
  vocabularyNote: {
    why:
      'These 28 items are the minimal kit for writing credibly about the future in Hindi. Aspiration nouns let you name the goal, career nouns let you name the destination, future-tense verb stems let you place it in time, and the desiderative chunks (चाहता हूँ कि, आशा है कि) let you reason about it. Every one of them appears in the model essays.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Simple future tense (मैं ... करूँगा / करूँगी)',
      rule:
        'The simple future is formed by adding -ऊँगा/-ऊँगी (first person), -ओगे/-ओगी (second person familiar), -एगा/-एगी (third person singular), -एँगे/-एँगी (third person plural / आप). The ending agrees with the subject\'s gender and number - this is where most errors happen.',
      examples: [
        { hindi: 'मैं डॉक्टर बनूँगा।', transliteration: 'main doctor banoonga.', english: 'I will become a doctor. (m)' },
        { hindi: 'मैं डॉक्टर बनूँगी।', transliteration: 'main doctor banoongi.', english: 'I will become a doctor. (f)' },
        { hindi: 'मेरी बहन वैज्ञानिक बनेगी।', transliteration: 'meri bahan vaigyaanik banegi.', english: 'My sister will become a scientist.' },
        { hindi: 'हम सब मिलकर भारत जाएँगे।', transliteration: 'hum sab milkar bhaarat jaaenge.', english: 'We will all go to India together.' },
      ],
      pitfall:
        'A female narrator writing "मैं बनूँगा" instead of "मैं बनूँगी" is the most common tense error on this topic. Inconsistency - switching gender mid-essay - is worse than picking the wrong one.',
      whyItMatters:
        'Benchmark 5 explicitly requires "some control of past, present, and future time frames." One correctly conjugated future-tense sentence unlocks the third time frame the rubric counts.',
    },
    {
      title: 'Conditional with अगर ... तो (if ... then)',
      rule:
        'For real/likely conditionals, use future in both halves: "अगर X होगा, तो Y होगा." For hypothetical/unreal conditionals, use the imperfective participle + होता: "अगर X होता, तो Y होता." Intermediate-Mid students usually only need the future-future version.',
      examples: [
        { hindi: 'अगर मुझे अच्छे अंक मिलेंगे, तो मैं वर्जीनिया टेक जाऊँगा।', transliteration: 'agar mujhe achchhe ank milenge, to main virginia tech jaaoonga.', english: 'If I get good marks, then I will go to Virginia Tech.' },
        { hindi: 'अगर मैं डॉक्टर बनूँगी, तो गाँव में क्लिनिक खोलूँगी।', transliteration: 'agar main doctor banoongi, to gaanv mein clinic kholoongi.', english: 'If I become a doctor, then I will open a clinic in a village.' },
        { hindi: 'अगर पिताजी मान जाएँगे, तो मैं कला पढ़ूँगा।', transliteration: 'agar pitaji maan jaaenge, to main kala padhoonga.', english: 'If Father agrees, then I will study art.' },
      ],
      pitfall:
        'Writing "अगर मैं पढ़ता हूँ, तो पास हूँगा" (present in if-clause, future in then-clause) breaks agreement. Keep both clauses in the same time frame.',
      whyItMatters:
        'The conditional is a hallmark of Intermediate-Mid speaking and writing. A rater seeing one clean अगर ... तो with matched tenses silently ticks the "complex sentence structure" box on Text-Type.',
    },
    {
      title: 'Subjunctive after चाहता हूँ कि / आशा है कि',
      rule:
        'When expressing a wish, hope, or desire about someone else, Hindi uses the subjunctive (the bare stem + -ए/-ऊँ endings, NOT the indicative future). "मैं चाहता हूँ कि वह डॉक्टर बने" - not "बनेगा."',
      examples: [
        { hindi: 'मैं चाहता हूँ कि मेरा परिवार हमेशा खुश रहे।', transliteration: 'main chaahta hoon ki mera parivaar hamesha khush rahe.', english: 'I want my family to always stay happy.' },
        { hindi: 'माँ चाहती हैं कि मैं इंजीनियर बनूँ।', transliteration: 'maa chaahti hain ki main engineer banoon.', english: 'Mother wants me to become an engineer.' },
        { hindi: 'मुझे आशा है कि मैं अपने सपने पूरे कर सकूँ।', transliteration: 'mujhe aasha hai ki main apne sapne poore kar sakoon.', english: 'I hope that I can fulfill my dreams.' },
      ],
      pitfall:
        'Using the indicative future (बनेगा, जाएगा) inside a कि-clause after चाहना sounds like a native-speaker error. It still communicates, but raters flag it under Language Control.',
      whyItMatters:
        'The subjunctive lets the student express parental expectations and personal hopes - the two themes FCPS future-topic prompts reward. Without it, the essay flattens into bare declaratives.',
    },
    {
      title: 'Tense bridging: past → present → future in one essay',
      rule:
        'An Intermediate-Mid future-topic essay must actually USE all three time frames. Anchor the past with बचपन में / जब मैं छोटा था; anchor the present with आज / आजकल; anchor the future with दस साल बाद / भविष्य में.',
      examples: [
        { hindi: 'बचपन में मुझे कहानियाँ पसंद थीं।', transliteration: 'bachpan mein mujhe kahaaniyaan pasand thhin.', english: 'In childhood I liked stories. (past)' },
        { hindi: 'आज मैं रोज़ एक घंटा लिखता हूँ।', transliteration: 'aaj main roz ek ghanta likhta hoon.', english: 'Today I write for one hour every day. (present)' },
        { hindi: 'दस साल बाद मैं एक किताब प्रकाशित करूँगा।', transliteration: 'das saal baad main ek kitaab prakaashit karoonga.', english: 'Ten years from now I will publish a book. (future)' },
      ],
      pitfall:
        'Writing the whole essay in the future (all three paragraphs start with "मैं ... करूँगा") scores lower than writing two paragraphs. Raters want variety, not volume.',
      whyItMatters:
        'This is the single rubric axis separating Benchmark 4 and Benchmark 5. A future-topic essay that only uses the future tense plateaus at Benchmark 4 (2 credits). Add one past-tense sentence and one present-tense sentence to unlock Benchmark 5.',
    },
  ],
  grammarNote: {
    why:
      'Future tense is mechanical - learn the four endings, learn गender agreement, learn the अगर...तो frame, and you have 80% of what the topic demands. The subjunctive adds the final 20%. These four rules, practiced together, move an Intermediate-Low essay to Intermediate-Mid.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'agarTo',
    'halaanki',
    'meraManna',
    'mujheLagta',
    'sirfNahiBalki',
  ]),
  connectorsNote: {
    why:
      'This is the IM-push connector set. अगर ... तो is the single most important one for this topic - it lets you hypothesize without leaving Hindi. हालाँकि and मेरा मानना है कि let you structure argument-style reasoning about parental pressure vs. personal dreams. सिर्फ़ ... नहीं बल्कि ... भी is the Intermediate-Mid signature move and must appear at least once in each essay.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरी दस साल बाद की दुनिया · My World, Ten Years From Now',
    hindi:
      'जब मैं छोटा था, तब मैं अपने पिताजी को अस्पताल में मरीज़ों की मदद करते देखता था। मुझे लगता था कि यह काम बहुत कठिन है, लेकिन बहुत महत्वपूर्ण भी। आज मैं हाई स्कूल में जीव विज्ञान पढ़ रहा हूँ और हर रोज़ दो घंटे अतिरिक्त मेहनत करता हूँ, क्योंकि मेरा लक्ष्य डॉक्टर बनना है।\n\nदस साल बाद मैं वर्जीनिया विश्वविद्यालय से पढ़ाई पूरी करूँगा। अगर मुझे अच्छे अंक मिलेंगे, तो मैं भारत जाऊँगा और वहाँ एक छोटे गाँव में क्लिनिक खोलूँगा। मेरा मानना है कि अच्छी चिकित्सा सिर्फ़ शहरों में नहीं, बल्कि गाँवों में भी मिलनी चाहिए। हालाँकि यह रास्ता आसान नहीं होगा, मैं हार नहीं मानूँगा, क्योंकि मेरे माता-पिता ने मुझे यही सिखाया है।',
    transliteration:
      'jab main chhota tha, tab main apne pitaji ko aspataal mein mareezon ki madad karte dekhta tha. mujhe lagta tha ki yah kaam bahut kathin hai, lekin bahut mahatvapoorn bhi. aaj main high school mein jeev vigyaan padh raha hoon aur har roz do ghante atirikt mehnat karta hoon, kyonki mera lakshya doctor banna hai.\n\ndas saal baad main virginia vishwavidyalaya se padhaai poori karoonga. agar mujhe achchhe ank milenge, to main bhaarat jaaoonga aur vahaan ek chhote gaanv mein clinic kholoonga. mera maanna hai ki achchhi chikitsa sirf shaharon mein nahin, balki gaanvon mein bhi milni chaahiye. haalaanki yah raasta aasaan nahin hoga, main haar nahin maanoonga, kyonki mere maata-pita ne mujhe yahi sikhaaya hai.',
    english:
      'When I was small, I used to watch my father help patients at the hospital. I used to feel that this work was very difficult, but also very important. Today I study biology in high school and put in two extra hours of hard work every day, because my goal is to become a doctor.\n\nTen years from now I will finish my studies at the University of Virginia. If I get good marks, then I will go to India and open a clinic in a small village there. I believe that good medical care should be available not only in cities, but also in villages. Although this path will not be easy, I will not give up, because this is what my parents have taught me.',
    highlights: [
      { term: 'जब मैं छोटा था ... आज ... दस साल बाद', note: 'Three time anchors in three paragraphs - past, present, future. This is the exact structure the rubric rewards.' },
      { term: 'अगर ... तो ... जाऊँगा / खोलूँगा', note: 'Conditional + future in the same sentence. Complex structure signal.' },
      { term: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: 'The Intermediate-Mid signature connector. Notice how it carries the moral reasoning.' },
      { term: 'हालाँकि ... मैं हार नहीं मानूँगा', note: 'Concessive clause + determined future. Shows argument structure, not just description.' },
      { term: 'गाँव में क्लिनिक खोलूँगा', note: 'India-specific cultural anchor - rural service as a personal value. Lifts Topic Coverage.' },
    ],
    comprehensionQuestions: [
      { q: 'What did the narrator watch in childhood?', a: 'Their father helping patients at the hospital (अपने पिताजी को अस्पताल में मरीज़ों की मदद करते).' },
      { q: 'What is the narrator doing right now?', a: 'Studying biology in high school and doing two extra hours of hard work every day.' },
      { q: 'Where will the narrator study after school?', a: 'At the University of Virginia (वर्जीनिया विश्वविद्यालय).' },
      { q: 'What condition is attached to the India trip?', a: 'If the narrator gets good marks (अगर मुझे अच्छे अंक मिलेंगे).' },
      { q: 'What does the narrator want to do in India?', a: 'Open a clinic in a small village.' },
      { q: 'What belief closes the first future paragraph?', a: 'Good medical care should be available not only in cities, but also in villages.' },
      { q: 'Identify the concessive connector and the phrase that follows it.', a: 'हालाँकि - "although this path will not be easy, I will not give up."' },
    ],
  },
  anchorNote: {
    why:
      'This passage is a living demo of the three-tense bridge. Read it aloud three times noticing the tense every sentence is in. Then try to write a parallel paragraph about your own future - same shape, different content. The shape is half the battle.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelTexts: [
    {
      kind: 'letter',
      title: 'भविष्य के खुद को चिट्ठी · Letter to My Future Self',
      hindi:
        'प्रिय भविष्य के मैं,\n\nआज सोलह साल की हूँ। मैं चाहती हूँ कि दस साल बाद तू एक अच्छी इंजीनियर हो। कठिन रास्ता है, लेकिन मुझे विश्वास है। अपने माता-पिता का ध्यान रखना। हिंदी मत भूलना।\n\nप्यार से,\nतुम्हारा सोलह साल का आप।',
      transliteration:
        'priya bhavishya ke main, aaj solah saal ki hoon. main chaahti hoon ki das saal baad too ek achchhi engineer ho. kathin raasta hai, lekin mujhe vishvaas hai. apne maata-pita ka dhyaan rakhna. hindi mat bhoolna. pyaar se, tumhaara solah saal ka aap.',
      english:
        "Dear future me, today I am sixteen years old. I want that ten years from now you will be a good engineer. The path is difficult, but I have faith. Take care of your parents. Don't forget Hindi. With love, your sixteen-year-old self.",
    },
    {
      kind: 'diary',
      title: 'फ़ैसले का दिन · Decision Day',
      hindi:
        'आज पिताजी ने पूछा कि मैं क्या बनना चाहता हूँ। मैंने कहा - कलाकार। वे चुप हो गए। माँ ने कहा कि अगर मैं मेहनत करूँगा, तो वे साथ देंगी। मुझे लगता है कि सपना सिर्फ़ मेरा नहीं, बल्कि पूरे परिवार का फ़ैसला है।',
      transliteration:
        'aaj pitaji ne poochha ki main kya banna chaahta hoon. maine kaha - kalaakaar. ve chup ho gaye. maa ne kaha ki agar main mehnat karoonga, to ve saath dengi. mujhe lagta hai ki sapna sirf mera nahin, balki poore parivaar ka faisla hai.',
      english:
        'Today Father asked what I want to become. I said - artist. He went quiet. Mother said that if I work hard, she will stand with me. I feel that a dream is not just mine, but a decision for the whole family.',
    },
    {
      kind: 'announcement',
      title: 'कॉलेज खुला दिवस · College Open Day',
      hindi:
        'वर्जीनिया टेक खुला दिवस\nशनिवार, १५ अक्टूबर\nइंजीनियरिंग, चिकित्सा, और कला - तीनों विभाग\nअगर आप भविष्य की योजना बना रहे हैं, तो ज़रूर आइए\nमाता-पिता भी आमंत्रित हैं।',
      transliteration:
        'virginia tech khula divas, shanivaar, 15 october. engineering, chikitsa, aur kala - teenon vibhaag. agar aap bhavishya ki yojna bana rahe hain, to zaroor aaiye. maata-pita bhi aamantrit hain.',
      english:
        'Virginia Tech Open Day - Saturday, October 15. Engineering, medicine, and art - all three departments. If you are planning your future, please come. Parents are also invited.',
    },
    {
      kind: 'email',
      title: 'शिक्षक को ईमेल · Email to a Teacher',
      hindi:
        'नमस्ते मैडम,\n\nमुझे आपकी सलाह चाहिए। मैं डॉक्टर बनना चाहती हूँ, लेकिन मुझे गणित से डर लगता है। अगर मैं अगले साल अतिरिक्त कक्षा लूँगी, तो क्या मेरा सपना पूरा हो सकता है? आपका मार्गदर्शन मेरे लिए बहुत महत्वपूर्ण है।\n\nधन्यवाद,\nआशा',
      transliteration:
        'namaste madam, mujhe aapki salaah chaahiye. main doctor banna chaahti hoon, lekin mujhe ganit se dar lagta hai. agar main agle saal atirikt kaksha loongi, to kya mera sapna poora ho sakta hai? aapka maargdarshan mere liye bahut mahatvapoorn hai. dhanyavaad, aasha.',
      english:
        "Hello Madam, I need your advice. I want to become a doctor, but I am afraid of math. If I take an extra class next year, can my dream be fulfilled? Your guidance is very important to me. Thank you, Aasha.",
    },
  ],
  modelTextsNote: {
    why:
      'A letter to one\'s future self, a diary entry about a hard family conversation, a college-open-day announcement, and a respectful email to a teacher - these four registers together show how Hindi handles future-tense reasoning in personal, private, public, and formal modes. Imitate the ONE that matches your prompt.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'The Engineer-Doctor-Lawyer Triangle',
      body:
        'In many Indian families, parents still treat engineering, medicine, and law as the three "safe" careers. Naming this openly in an essay - "पिताजी चाहते हैं कि मैं इंजीनियर बनूँ, लेकिन मेरा सपना कलाकार बनना है" - is both honest and culturally specific. Raters reward the honesty.',
      emoji: '🎓',
    },
    {
      title: 'Service to Family as a Goal',
      body:
        'A future plan framed purely around personal success reads differently in Hindi than in English. Including a line about अपने माता-पिता का ध्यान रखना (caring for parents) or गाँव में वापस जाना (returning to one\'s village) signals culturally authentic values, not individualism-in-translation.',
      emoji: '🏡',
    },
    {
      title: 'Education First (पढ़ाई ही सब कुछ है)',
      body:
        'Indian middle-class culture treats education as the single most important family project. Summer holidays, family vacations, and even weddings are often planned around exam dates. Writing "मेरा पूरा परिवार मेरी पढ़ाई के लिए त्याग करता है" captures this without needing explanation.',
      emoji: '📖',
    },
    {
      title: 'Dreams vs. Parental Expectations',
      body:
        'Hindi writers handle the tension between अपना सपना and माता-पिता का सपना by RECONCILING rather than REJECTING - the essay-winning move is to show how you will honor both. A pure rebellion narrative reads young; a negotiation narrative reads mature.',
      emoji: '⚖️',
    },
    {
      title: 'Returning to India',
      body:
        'Among diaspora students, the "return" arc - study in America, serve in India - is a recognizable and respected essay frame. Mentioning a specific region (बिहार का गाँव, राजस्थान का स्कूल) rather than just "India" reads as genuine knowledge, not symbolism.',
      emoji: '🇮🇳',
    },
  ],
  culturalNote: {
    why:
      'The "my future" essay is where culture shows through most. A bland "I will be successful" paragraph reads as a Google-translated placeholder. Plant ONE of these five anchors - the engineer/doctor expectation, service to parents, education-first, dream-vs-expectation tension, or the return-to-India arc - and Topic Coverage jumps.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    {
      phrase: 'सपने साकार करना',
      literal: 'to make dreams real',
      meaning: 'To fulfill / realize one\'s dreams.',
      example: 'मेहनत करने वाले ही अपने सपने साकार करते हैं।',
      exampleEnglish: 'Only those who work hard realize their dreams.',
    },
    {
      phrase: 'आसमान छूना',
      literal: 'to touch the sky',
      meaning: 'To reach the highest point of success.',
      example: 'मेहनत से वह एक दिन आसमान छुएगी।',
      exampleEnglish: 'With hard work, she will one day touch the sky.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are directly about aspiration, so they land naturally inside this topic\'s prompts. Use ONE, not both - an Intermediate-Mid essay reads better with one well-placed idiom than with two stacked ones. Place it in the closing paragraph for maximum effect.',
    trains: ['TextType'],
  },

  modelEssays: [
    {
      shortLabel: 'Ten years from now',
      prompt:
        'दस साल बाद आप क्या करेंगे? तीन अनुच्छेदों में लिखिए - आपका बचपन का सपना, आज की तैयारी, और भविष्य की योजना। (What will you be doing ten years from now? Write in three paragraphs - your childhood dream, today\'s preparation, and future plan.)',
      novice: 'मैं डॉक्टर बनूँगा। मैं पढ़ता हूँ। बहुत अच्छा।',
      intermediateMid:
        'बचपन में मुझे हमेशा आसमान के तारे देखना अच्छा लगता था। जब मैं दस साल का था, तब पिताजी ने मुझे एक छोटा टेलिस्कोप लाकर दिया। उस रात से मेरा एक ही सपना है - वैज्ञानिक बनकर अंतरिक्ष में नई खोज करना।\n\nआज मैं हाई स्कूल के अंतिम वर्ष में हूँ। मैं रोज़ भौतिकी और गणित पढ़ता हूँ, क्योंकि मेरा लक्ष्य एमआईटी या कैलटेक में दाख़िला लेना है। मेरे माता-पिता चाहते हैं कि मैं इंजीनियर बनूँ, हालाँकि मैंने उन्हें समझाया है कि विज्ञान सिर्फ़ एक पेशा नहीं, बल्कि मेरा जुनून भी है।\n\nदस साल बाद मैं किसी बड़ी प्रयोगशाला में काम करूँगा। अगर मेरी मेहनत रंग लाएगी, तो मैं भारत के छात्रों के लिए मुफ़्त विज्ञान कक्षाएँ शुरू करूँगा। मेरा मानना है कि ज्ञान बाँटने से बढ़ता है। मुझे आशा है कि एक दिन मैं अपने सपने साकार करूँगा और अपने माता-पिता को गर्व महसूस कराऊँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'बचपन में ... जब मैं दस साल का था', note: 'Past-imperfective opens the essay - anchors childhood memory cleanly.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'पिताजी ने मुझे एक छोटा टेलिस्कोप लाकर दिया', note: 'Specific memory, not generic "I loved science." Lifts Topic Coverage.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'सपना ... वैज्ञानिक बनकर', note: 'Aspiration noun + career noun + compound verb in one sentence.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'आज ... पढ़ता हूँ', note: 'Present-habitual anchors paragraph two - second time frame established.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि ... बल्कि ... भी', note: 'Concessive + not-only-but-also. Two Intermediate-Mid connectors in one paragraph.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'चाहते हैं कि मैं इंजीनियर बनूँ', note: 'Subjunctive after चाहना - correctly uses बनूँ, not बनूँगा.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'दस साल बाद ... करूँगा', note: 'Future tense arrives in paragraph three. Third time frame locked.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर ... तो ... शुरू करूँगा', note: 'Conditional + future. Complex-structure signal raters explicitly reward.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'सपने साकार करना', note: 'Aspiration idiom placed in closing - one is plenty.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'हालाँकि', 'सिर्फ़ ... नहीं, बल्कि ... भी', 'अगर ... तो', 'मेरा मानना है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three paragraphs each anchored to a different time frame (बचपन में / आज / दस साल बाद) - meets Benchmark 5 "some control of past, present, and future" requirement head-on.',
          'Five distinct connectors including two Intermediate-Mid signatures (हालाँकि, सिर्फ़...बल्कि...भी). Text-Type 5 confirmed.',
          'Subjunctive used correctly: "चाहते हैं कि मैं इंजीनियर बनूँ" (not बनूँगा). This is the exact grammar point that separates IM from IL on the rubric.',
          'Conditional अगर ... तो in paragraph three pairs future + future correctly, adding a complex structure raters bump Language Control for.',
          'Cultural specifics - parental career expectation, return-service to Indian students - elevate Topic Coverage above generic "I want to be a scientist."',
        ],
        gotchas: [
          'A female narrator must write करूँगी / पढ़ूँगी / बनूँगी etc. throughout. Switching gender mid-essay drops Language Control to Low.',
          'If the student writes "मैं चाहते हूँ कि मैं बनूँगा" (wrong subject agreement AND indicative inside कि-clause), the whole subjunctive clause unravels.',
          'Replacing the idiom with a generic "मैं सफल हूँगा" weakens the closing - one idiom is a cheap, reliable lift.',
        ],
      },
    },
    {
      shortLabel: 'Choosing a career',
      prompt:
        'अगर आपको अपना करियर चुनने की पूरी आज़ादी मिले, तो आप क्या बनेंगे और क्यों? तीन अनुच्छेदों में लिखिए। (If you had complete freedom to choose your career, what would you become and why? Write in three paragraphs.)',
      novice: 'मैं कलाकार बनूँगा। अच्छा लगता है। बस।',
      intermediateMid:
        'मैं एक भारतीय परिवार में पली-बढ़ी हूँ, जहाँ बच्चों के करियर का फ़ैसला अक्सर माता-पिता करते हैं। बचपन से मुझे कहा गया कि डॉक्टर या इंजीनियर बनना ही सुरक्षित है। लेकिन अगर मुझे पूरी आज़ादी मिले, तो मैं एक लेखिका बनूँगी, क्योंकि शब्दों से बड़ी कोई ताकत नहीं होती।\n\nआजकल मैं अपने स्कूल की पत्रिका के लिए कहानियाँ लिखती हूँ। मेरी शिक्षिका कहती हैं कि मेरी कलम में जान है। मुझे लगता है कि लिखना सिर्फ़ एक शौक़ नहीं, बल्कि एक ज़िम्मेदारी भी है, क्योंकि एक अच्छी कहानी किसी की सोच बदल सकती है। हालाँकि यह रास्ता कठिन होगा, मैं पीछे नहीं हटूँगी।\n\nदस साल बाद मैं हिंदी और अंग्रेज़ी दोनों भाषाओं में किताबें लिखूँगी। अगर मेरी पहली किताब चलेगी, तो मैं अपनी कमाई से ग्रामीण लड़कियों के लिए एक पुस्तकालय खोलूँगी। मेरा मानना है कि हर लड़की को पढ़ने और सपने देखने का हक़ है। मुझे आशा है कि एक दिन मैं आसमान छुऊँगी और अपने माता-पिता को भी इस सफ़र में साथ ले जाऊँगी।',
      annotations: [
        { paragraphIndex: 0, kind: 'cultural', highlight: 'भारतीय परिवार ... करियर का फ़ैसला अक्सर माता-पिता करते हैं', note: 'India-specific cultural setup in sentence one. Topic Coverage signal immediately.' },
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'बचपन से मुझे कहा गया', note: 'Past-passive voice. Unusual and high-credit structure.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'अगर मुझे पूरी आज़ादी मिले, तो मैं एक लेखिका बनूँगी', note: 'Conditional with subjunctive in if-clause, future in then-clause - matches the prompt perfectly.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'आजकल ... लिखती हूँ', note: 'Present paragraph, consistent feminine forms (लिखती, हटूँगी).' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'सिर्फ़ एक शौक़ नहीं, बल्कि एक ज़िम्मेदारी भी', note: 'Not-only-but-also carries the moral argument. Text-Type 5 move.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि ... पीछे नहीं हटूँगी', note: 'Concessive + determined future closes the present paragraph with tension.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'दस साल बाद ... लिखूँगी', note: 'Future tense paragraph. Feminine forms sustained throughout (खोलूँगी, छुऊँगी, जाऊँगी).' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर मेरी पहली किताब चलेगी, तो', note: 'Second अगर...तो construction - shows this is not a memorized phrase but a learned structure.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'आसमान छुऊँगी', note: 'Aspiration idiom placed in closing, conjugated in feminine first-person future. Perfect landing.' },
      ],
      wordCount: 168,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'लेकिन', 'अगर ... तो', 'सिर्फ़ ... नहीं, बल्कि ... भी', 'हालाँकि', 'मुझे लगता है कि', 'मेरा मानना है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Feminine first-person agreement is sustained perfectly across 168 words - पली-बढ़ी, लिखती, बनूँगी, हटूँगी, खोलूँगी, छुऊँगी. Language Control reads as High.',
          'Seven distinct connectors, including TWO different अगर...तो conditionals. Raters see this as structural fluency, not memorization.',
          'The prompt asks a hypothetical; the essay opens with real constraints (parental expectation), pivots through the hypothetical (अगर मुझे आज़ादी मिले), and lands on a concrete future plan. That arc is exactly what Text-Type 5 describes.',
          'Cultural specifics are layered: family career-choice culture, feminine voice speaking about freedom, service to rural girls. Topic Coverage elevated beyond generic.',
          'The closing idiom आसमान छुऊँगी is correctly conjugated in feminine first-person future - one idiom, one gender error would have undone the whole essay, and this student nails it.',
        ],
        gotchas: [
          'If the student had written "लिखता हूँ" in paragraph two after "पली-बढ़ी" in paragraph one, the gender inconsistency alone would drop the essay to Benchmark 4.',
          'A single "मैं चाहती हूँ कि मैं लेखिका बनूँगी" (indicative after चाहना) would be flagged under Language Control. Student avoided this by restructuring.',
          'Over-reliance on English career words (writer, library) instead of लेखिका, पुस्तकालय would have hurt Topic Coverage. Student chose Hindi correctly.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Essay 1 is masculine voice, science-career, with parental-reconciliation arc. Essay 2 is feminine voice, arts-career, with parental-tension-then-bridge arc. Between them, they cover the four moves FCPS future prompts demand: childhood → present effort → hypothetical → concrete plan. Pick the one closer to your life and imitate its SHAPE, not its content.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'दस साल बाद आप क्या कर रहे होंगे? तीन अनुच्छेदों में लिखिए। पहले अनुच्छेद में अपने बचपन के सपने, दूसरे में आज की मेहनत, और तीसरे में भविष्य की ठोस योजना का ज़िक्र कीजिए।',
      english:
        'What will you be doing ten years from now? Write three paragraphs. In the first, describe your childhood dream; in the second, today\'s effort; in the third, a concrete future plan.',
      hint: {
        connectors: ['क्योंकि', 'लेकिन', 'अगर ... तो', 'इसलिए'],
        vocab: ['सपना', 'लक्ष्य', 'बनूँगा / बनूँगी', 'मेहनत', 'भविष्य में'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'आपके माता-पिता क्या चाहते हैं कि आप क्या बनें, और आप स्वयं क्या बनना चाहते हैं? इन दोनों इच्छाओं को तीन अनुच्छेदों में संतुलित कीजिए।',
      english:
        'What do your parents want you to become, and what do you yourself want to become? Balance these two desires in three paragraphs.',
      hint: {
        connectors: ['हालाँकि', 'सिर्फ़ ... नहीं, बल्कि ... भी', 'मेरा मानना है कि', 'लेकिन'],
        vocab: ['चाहते हैं कि', 'डॉक्टर', 'इंजीनियर', 'कलाकार', 'पेशा'],
        tenses: ['present', 'future'],
      },
    },
    {
      hindi:
        'अगर आपको अपने लिए एक बिलकुल नया देश चुनने का मौक़ा मिले, तो आप कहाँ जाएँगे, क्या सीखेंगे, और वहाँ से लौटकर क्या करेंगे? तीन अनुच्छेदों में बताइए।',
      english:
        'If you had the chance to choose a completely new country for yourself, where would you go, what would you learn there, and what would you do after returning? Explain in three paragraphs.',
      hint: {
        connectors: ['अगर ... तो', 'क्योंकि', 'इसके अलावा', 'अंत में'],
        vocab: ['जाऊँगा / जाऊँगी', 'सीखूँगा / सीखूँगी', 'भविष्य में', 'देश', 'आशा है कि'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 is the default FCPS "ten years" question - every student must be able to answer this cold. Prompt 2 forces the parental-expectation culture into the essay, which is where most students gain or lose Topic Coverage points. Prompt 3 is a pure hypothetical, practicing अगर...तो at maximum load. Do all three.',
    trains: ['TextType', 'TopicCoverage'],
  },

  rubricNote: {
    why:
      'For this topic, self-grade with one extra question: "Did I actually use the future tense - correctly conjugated - at least five times?" If the answer is fewer than five, the essay has not earned Benchmark 5 regardless of how polished the past/present paragraphs are. Future tense is the scoring lever on this pack.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
