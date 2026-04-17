// Capstone C02 - "My typical Saturday"
// Core tier. Present-habitual backbone with one past pivot.
// Integrates L2-01 daily routine, L1-08 interests, L1-11 shopping, L1-12 food.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C02-typical-saturday',
  order: 2,
  tier: 'core',
  isMockExam: false,
  themeGroup: 'ModernSociety',
  heroMotif: 'bazaar',
  titleHindi: 'मेरा एक सामान्य शनिवार',
  titleEnglish: 'My typical Saturday',
  hook: 'A week peaks on Saturday. This capstone turns weekly rhythm into a Benchmark-5 essay.',
  promptHindi:
    'अपने किसी सामान्य शनिवार के बारे में लिखो। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about a typical Saturday. Use three cohesive paragraphs.',
  whyThisCapstone:
    'Saturdays are routine but never identical - and that gap between "every Saturday" and "last Saturday" is where Benchmark 5 lives. A student who can shift from present-habitual (every week we do X) into a specific past moment (last week something happened) and back to a reflective present has shown every language-control marker a rater wants to see.',
  draws: [
    { packId: 'L2-01-daily-routine', contributes: 'structure', note: 'Time-of-day backbone: सुबह, दोपहर, शाम, रात.' },
    { packId: 'L1-08-interests-leisure', contributes: 'vocabulary', note: 'Weekend hobby vocabulary: खेल, किताब, संगीत, दोस्त.' },
    { packId: 'L1-11-shopping', contributes: 'vocabulary', note: 'A market-trip beat adds specific vocabulary (दुकान, बाज़ार, सब्ज़ी) and authentic cultural texture.' },
    { packId: 'L1-12-restaurants-food', contributes: 'vocabulary', note: 'Lunch vocabulary for the weekend meal.' },
    { packId: 'L1-09-weather-seasons', contributes: 'structure', note: 'One weather-opening line makes the Saturday feel specific, not generic.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'शनिवार का दिन मुझे बहुत पसंद है। मैं देर से उठती हूँ। फिर मैं नाश्ता करती हूँ। दोपहर में मैं अपने दोस्तों के साथ खेलती हूँ। कभी-कभी हम बाज़ार जाते हैं। वहाँ हम सब्ज़ी खरीदते हैं। शाम को मेरी माँ स्वादिष्ट खाना बनाती हैं। रात को मैं एक फ़िल्म देखती हूँ। मुझे शनिवार इसलिए पसंद है क्योंकि स्कूल नहीं होता। अगले शनिवार मैं फिर यही करूँगी।',
      transliteration:
        'shanivaar kaa din mujhe bahut pasand hai. main der se uthti hoon. phir main naashtaa karti hoon. dopahar mein main apne doston ke saath khelti hoon. kabhi-kabhi ham baazaar jaate hain. vahaan ham sabzi khareedte hain. shaam ko meri maan svaadisht khaanaa banaati hain. raat ko main ek film dekhti hoon. mujhe shanivaar isliye pasand hai kyonki school nahin hotaa. agle shanivaar main phir yahi karoongi.',
      english:
        "I really like Saturdays. I wake up late. Then I have breakfast. In the afternoon I play with my friends. Sometimes we go to the market. There we buy vegetables. In the evening my mom cooks tasty food. At night I watch a movie. I like Saturday because there is no school. Next Saturday I will do the same again.",
      wordCount: 120,
      tensesUsed: ['present', 'future'],
      connectorsUsed: ['phir', 'kyonki'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'हमारे हफ़्ते के सबसे अच्छे दिन का नाम है - शनिवार। स्कूल के पाँच दिन भागदौड़ में बीतते हैं, इसलिए शनिवार की सुबह हमें अपना लगती है। आम तौर पर मैं आठ बजे के बाद धीरे-धीरे उठती हूँ, फिर माँ के साथ बैठकर लंबा नाश्ता करती हूँ - गरम पराठे, चाय, और कोई न कोई पुराना किस्सा। खिड़की से धूप आती है, और मुझे लगता है कि हफ़्ता अब शुरू हो रहा है।\n\nदोपहर में हम अक्सर पास के बाज़ार जाते हैं। पिछले शनिवार की बात अलग थी - वहाँ हमें बचपन की एक पुरानी आंटी मिल गईं, जो मेरी माँ को बीस साल से नहीं देखी थीं। उन्होंने हमें अपने घर चाय पर बुलाया, और हम लगभग दो घंटे वहीं बैठे रहे। बाज़ार की सब्ज़ियाँ पीछे रह गईं, लेकिन हम मुस्कुराते हुए घर लौटे। हालाँकि हम देर से पहुँचे, किसी को शिकायत नहीं थी।\n\nमुझे लगता है कि शनिवार अच्छा इसलिए लगता है क्योंकि यह हमें समय देता है - दोस्तों के लिए, परिवार के लिए, और खुद के लिए भी। अगले शनिवार हम फिर बाज़ार जाएँगे, शायद नयी आंटी के यहाँ भी - क्योंकि कुछ रिश्ते हफ़्ते के उसी दिन ही पकते हैं।',
      transliteration:
        'hamaare hafte ke sabse achhe din kaa naam hai - shanivaar. school ke paanch din bhaagdaud mein beette hain, isliye shanivaar ki subah hamen apni lagti hai. aam taur par main aath baje ke baad dheere-dheere uthti hoon, phir maan ke saath baithkar lambaa naashtaa karti hoon - garam paraathe, chaay, aur koi na koi puraanaa kissaa. khidki se dhoop aati hai, aur mujhe lagtaa hai ki haftaa ab shuru ho rahaa hai.\n\ndopahar mein ham aksar paas ke baazaar jaate hain. pichhle shanivaar ki baat alag thi - vahaan hamen bachpan ki ek puraani aanti mil gayeen, jo meri maan ko bees saal se nahin dekhi thin. unhonne hamen apne ghar chaay par bulaayaa, aur ham lagbhag do ghante vahin baithe rahe. baazaar ki sabziyaan peechhe rah gayeen, lekin ham muskuraate hue ghar laute. haalaanki ham der se pahunche, kisi ko shikaayat nahin thi.\n\nmujhe lagtaa hai ki shanivaar achhaa isliye lagtaa hai kyonki yah hamen samay detaa hai - doston ke liye, parivaar ke liye, aur khud ke liye bhi. agle shanivaar ham phir baazaar jaayenge, shaayad nayi aanti ke yahaan bhi - kyonki kuchh rishte hafte ke usi din hi pakte hain.',
      english:
        "The name of the best day of our week - is Saturday. The five school days go by in a rush, so Saturday morning feels like our own. Usually I wake up slowly after eight, then sit with mom for a long breakfast - hot parathas, tea, and some old story. Sunlight comes through the window, and I feel that the week is only now beginning.\n\nIn the afternoon we often go to the nearby market. Last Saturday was different - we ran into an old aunty from my mom's childhood, whom she hadn't seen in twenty years. She invited us to her home for tea, and we sat there for almost two hours. The market vegetables got left behind, but we returned home smiling. Although we were late, no one complained.\n\nI think Saturday feels good because it gives us time - for friends, for family, and for ourselves too. Next Saturday we will go to the market again, maybe even to the new aunty's home - because some relationships ripen only on the same day of the week.",
      wordCount: 248,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['isliye', 'phir', 'lekin', 'halaanki', 'kyonki', 'mujheLagta'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'हमारे पूरे हफ़्ते की सबसे प्यारी चीज़ का नाम है - शनिवार। स्कूल के पाँच दिन इतनी भागदौड़ में बीतते हैं कि कभी-कभी खुद से मिलना भी मुश्किल हो जाता है; इसलिए जब शनिवार की सुबह अलार्म नहीं बजता, तब एक अलग ही सुकून होता है। आम तौर पर मैं आठ बजे के बाद धीरे-धीरे उठती हूँ, फिर माँ के साथ बैठकर लंबा नाश्ता करती हूँ - गरम पराठे, चाय, और कोई न कोई पुराना किस्सा। खिड़की से धूप आती है, और मुझे लगता है कि असली हफ़्ता अब शुरू हो रहा है।\n\nदोपहर में हम अक्सर पास के बाज़ार जाते हैं। आम तौर पर यह एक सीधा काम होता है - सब्ज़ी, फल, कुछ मसाले, और घर वापस। लेकिन पिछले शनिवार की बात बिल्कुल अलग थी। बाज़ार में हमें बचपन की एक पुरानी आंटी मिल गईं, जो मेरी माँ को बीस साल से नहीं देखी थीं। उन्होंने हमें अपने घर चाय पर बुलाया, और हम लगभग दो घंटे वहीं बैठे रहे - बातें, हँसी, और पुरानी तस्वीरें। बाज़ार की सब्ज़ियाँ पीछे रह गईं, लेकिन हम मुस्कुराते हुए घर लौटे। हालाँकि हम बहुत देर से पहुँचे, किसी को शिकायत नहीं थी।\n\nमेरा मानना है कि शनिवार अच्छा इसलिए लगता है क्योंकि वह सिर्फ़ आराम का दिन नहीं, बल्कि छोटी-छोटी कहानियों के बनने का दिन भी होता है। अगर मुझे हफ़्ते में से कोई एक दिन चुनना पड़े, तो मैं हमेशा शनिवार ही चुनूँगी - क्योंकि कुछ रिश्ते, कुछ बातचीत, और कुछ यादें हफ़्ते के उसी एक दिन ही पकती हैं।',
      transliteration:
        'hamaare poore hafte ki sabse pyaari cheez kaa naam hai - shanivaar. school ke paanch din itni bhaagdaud mein beette hain ki kabhi-kabhi khud se milnaa bhi mushkil ho jaataa hai; isliye jab shanivaar ki subah alaarm nahin bajtaa, tab ek alag hi sukoon hotaa hai. aam taur par main aath baje ke baad dheere-dheere uthti hoon, phir maan ke saath baithkar lambaa naashtaa karti hoon - garam paraathe, chaay, aur koi na koi puraanaa kissaa. khidki se dhoop aati hai, aur mujhe lagtaa hai ki asli haftaa ab shuru ho rahaa hai.\n\ndopahar mein ham aksar paas ke baazaar jaate hain. aam taur par yah ek seedhaa kaam hotaa hai - sabzi, phal, kuchh masaale, aur ghar vaapas. lekin pichhle shanivaar ki baat bilkul alag thi. baazaar mein hamen bachpan ki ek puraani aanti mil gayeen, jo meri maan ko bees saal se nahin dekhi thin. unhonne hamen apne ghar chaay par bulaayaa, aur ham lagbhag do ghante vahin baithe rahe - baaten, hansee, aur puraani tasveeren. baazaar ki sabziyaan peechhe rah gayeen, lekin ham muskuraate hue ghar laute. haalaanki ham bahut der se pahunche, kisi ko shikaayat nahin thi.\n\nmeraa maannaa hai ki shanivaar achhaa isliye lagtaa hai kyonki vah sirf aaraam kaa din nahin, balki chhoti-chhoti kahaaniyon ke banne kaa din bhi hotaa hai. agar mujhe hafte mein se koi ek din chunnaa pade, to main hameshaa shanivaar hi chunoongi - kyonki kuchh rishte, kuchh baatcheet, aur kuchh yaaden hafte ke usi ek din hi pakti hain.',
      english:
        "The most beloved thing in our whole week is called - Saturday. The five school days pass in such a rush that sometimes even meeting yourself becomes difficult; so when the alarm doesn't ring on Saturday morning, there is a distinct peace. Usually I wake up slowly after eight, then sit with mom for a long breakfast - hot parathas, tea, and some old story. Sunlight comes through the window, and I feel that the real week is only now beginning.\n\nIn the afternoon we often go to the nearby market. Usually it's a simple errand - vegetables, fruits, some spices, and back home. But last Saturday was entirely different. At the market we ran into an old aunty from my mom's childhood, whom she hadn't seen in twenty years. She invited us to her home for tea, and we sat there for almost two hours - conversations, laughter, and old photographs. The market vegetables got left behind, but we returned home smiling. Although we were very late, no one complained.\n\nI believe Saturday feels good because it is not just a day of rest, but also a day when small stories are made. If I had to pick one day out of the week, I would always pick Saturday - because some relationships, some conversations, and some memories ripen only on that one day of the week.",
      wordCount: 322,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['isliye', 'jabTab', 'phir', 'lekin', 'halaanki', 'kyonki', 'meraManna', 'sirfNahiBalki', 'agarTo'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'structure', highlight: 'हमारे हफ़्ते के सबसे अच्छे दिन का नाम है', note: 'Opens with a thesis - frames the essay as a reflection, not a list.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए शनिवार की सुबह हमें अपनी लगती है', note: 'इसलिए introduces a cause-effect relation between weekday rush and Saturday\'s calm - the rubric\'s favorite move.' },
    { paragraphIndex: 0, kind: 'vocab', highlight: 'गरम पराठे, चाय, और कोई न कोई पुराना किस्सा', note: 'Concrete cultural detail (parathas + tea + old story). Topic-Coverage signal.' },
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'मुझे लगता है कि हफ़्ता अब शुरू हो रहा है', note: 'Reflective present frames the mood - not a bare sequence of actions.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'पिछले शनिवार की बात अलग थी', note: 'The habitual-to-specific pivot. One line lifts the essay from a routine description to a narrative.' },
    { paragraphIndex: 1, kind: 'tense-shift', highlight: 'जो मेरी माँ को बीस साल से नहीं देखी थीं', note: 'Past-perfect-like construction - a Benchmark-5 language-control signal.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि हम देर से पहुँचे', note: 'हालाँकि concession - holds two ideas in one sentence. IM discriminator.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... इसलिए ... क्योंकि', note: 'Opinion + cause + reason chain. Benchmark-5 closing shape.' },
    { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले शनिवार हम फिर बाज़ार जाएँगे', note: 'Future tense - essay now covers present-habitual, past narrative, and future intention.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'कुछ रिश्ते हफ़्ते के उसी दिन ही पकते हैं', note: 'Closing image (relationships "ripening" on a day) - earns emotional weight, something a rater reads as writer voice.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three cohesive paragraphs with an arc: habitual → specific past → reflection. Text-Type at Benchmark 5.',
      'Three tenses used correctly - present (उठती हूँ, लगता है), past (मिल गईं, बैठे रहे), future (जाएँगे). Language Control: some control of past/present/future.',
      'Six connectors (इसलिए, फिर, लेकिन, हालाँकि, क्योंकि, मुझे लगता है कि). Sentences link together - IM test passes.',
      'Topic-specific vocabulary - पराठे, चाय, बाज़ार, सब्ज़ी, आंटी. Plus a cultural detail (twenty-year reunion over tea). Topic-Coverage strong.',
      'Habitual-to-specific pivot ("पिछले शनिवार की बात अलग थी") is a textbook Intermediate-Mid narrative move.',
    ],
    gotchas: [
      'If the student stays only in present-habitual without the specific past beat, Text-Type drops to Benchmark 4.',
      'बीस साल से नहीं देखी थीं requires feminine plural agreement - common slip.',
      'If the closing becomes a list of "things I like" rather than a reflective opinion, the register drops.',
    ],
  },
  readerQuestions: [
    { q: 'लेखिका शनिवार को किस समय उठती है?', a: 'लेखिका आठ बजे के बाद धीरे-धीरे उठती है।' },
    { q: 'नाश्ते में वे क्या खाते हैं?', a: 'गरम पराठे और चाय।' },
    { q: 'पिछले शनिवार बाज़ार में क्या हुआ?', a: 'बचपन की एक पुरानी आंटी मिल गईं, जो माँ को बीस साल से नहीं देखी थीं।' },
    { q: 'आंटी के घर वे कितनी देर बैठे?', a: 'लगभग दो घंटे।' },
    { q: 'लेखिका के अनुसार शनिवार क्यों अच्छा लगता है?', a: 'क्योंकि वह दोस्तों, परिवार और खुद के लिए समय देता है।' },
  ],
  teacherNote: {
    why:
      'C02 teaches the present-habitual-to-past pivot - the single most common structural move in Benchmark-5 essays. A student who can open an essay in "every Saturday" mode and then slide into "last Saturday something happened" has already crossed the Intermediate-Low → Intermediate-Mid bar. Use this capstone right after L2-01 is complete.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    examLink:
      'STAMP rubric - "connected sentences with transitions and groupings of ideas" + "some control of past, present, and future time frames" → Benchmark 5.',
  },
  status: 'shipped',
  version: 1,
};
