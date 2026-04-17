// Capstone C04 - "My favorite place in my neighborhood"
// Core tier. Descriptive + personal-meaning frame.
// Integrates L1-10 places/transport, L1-08 interests, L1-09 weather.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C04-neighborhood-place',
  order: 4,
  tier: 'core',
  isMockExam: false,
  themeGroup: 'ModernSociety',
  heroMotif: 'temple',
  titleHindi: 'मेरे मोहल्ले की मेरी पसंदीदा जगह',
  titleEnglish: 'My favorite place in my neighborhood',
  hook: 'A place you love tells a rater more about your Hindi than a place you describe. This capstone captures both.',
  promptHindi:
    'अपने मोहल्ले की अपनी पसंदीदा जगह के बारे में लिखो। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about your favorite place in your neighborhood. Use three cohesive paragraphs.',
  whyThisCapstone:
    'This capstone is about voice. A descriptive essay, if written without a point of view, reads as a list of features; if written with "why this place means something to me", it reads as writing. The rubric rewards the second shape at Benchmark 5. A student who can tie a place to a personal meaning has also practiced the reflective move that appears on nearly every FCPS prompt.',
  draws: [
    { packId: 'L1-10-places-transport', contributes: 'vocabulary', note: 'Place vocabulary: मोहल्ला, पार्क, मंदिर, दुकान - and how to get there.' },
    { packId: 'L1-08-interests-leisure', contributes: 'structure', note: 'The "why I love this" move overlaps directly with the hobby-essay structure.' },
    { packId: 'L1-09-weather-seasons', contributes: 'structure', note: 'One weather anchor (शाम की ठंडी हवा, बारिश के बाद) instantly dates the scene.' },
    { packId: 'L1-03-family', contributes: 'vocabulary', note: 'Places matter because they hold people; family vocabulary fuels the "why" paragraph.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'मेरे मोहल्ले में एक छोटा पार्क है। मुझे यह पार्क बहुत पसंद है। पार्क में बड़े पेड़ हैं। हरी घास है। पार्क के बीच में एक झूला है। मैं रोज़ शाम को वहाँ जाती हूँ। मेरे दोस्त भी वहाँ आते हैं। हम साथ में खेलते हैं। कभी-कभी मेरी माँ भी आती हैं। वे अख़बार पढ़ती हैं। मुझे यह जगह इसलिए पसंद है क्योंकि यहाँ शांति है। मैं हमेशा वहाँ जाती रहूँगी।',
      transliteration:
        'mere mohalle mein ek chhotaa paark hai. mujhe yah paark bahut pasand hai. paark mein bade ped hain. hari ghaas hai. paark ke beech mein ek jhoolaa hai. main roz shaam ko vahaan jaati hoon. mere dost bhi vahaan aate hain. ham saath mein khelte hain. kabhi-kabhi meri maan bhi aati hain. ve akhbaar padhti hain. mujhe yah jagah isliye pasand hai kyonki yahaan shaanti hai. main hameshaa vahaan jaati rahoongi.',
      english:
        "In my neighborhood there is a small park. I like this park a lot. The park has big trees. There is green grass. In the middle of the park there is a swing. Every evening I go there. My friends also come there. We play together. Sometimes my mom comes too. She reads the newspaper. I like this place because it is peaceful. I will keep going there always.",
      wordCount: 130,
      tensesUsed: ['present', 'future'],
      connectorsUsed: ['isliye', 'kyonki'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'हमारे मोहल्ले के एकदम पीछे एक छोटा-सा पार्क है जिसे लोग "आम वाला पार्क" कहते हैं - शायद इसलिए कि वहाँ तीन पुराने आम के पेड़ खड़े हैं। बाहर से यह पार्क ख़ास नहीं दिखता, लेकिन मेरे लिए यह मोहल्ले की सबसे प्यारी जगह है। हर शाम जब स्कूल से थककर घर लौटती हूँ, तब मैं किताबें रखकर सीधे वहीं चली जाती हूँ।\n\nपार्क में ज़्यादा कुछ नहीं है - कुछ झूले, एक पुरानी बेंच, और एक छोटा फव्वारा जो अक्सर बंद ही रहता है। लेकिन बरसात के मौसम में यह जगह बिल्कुल बदल जाती है। पिछले जून की एक शाम मुझे अच्छी तरह याद है - अचानक बारिश शुरू हो गई, मैं और मेरी सहेली रिया बेंच के नीचे छुप गए, और हमने अगले आधे घंटे तक पूरी चॉकलेट खा ली। हालाँकि कपड़े भीग गए, हम बहुत हँसे। वह शाम आज भी मुझे मुस्कुरा देती है।\n\nमुझे लगता है कि एक जगह सिर्फ़ अपनी सुंदरता से ख़ास नहीं बनती, बल्कि उन पलों से बनती है जो वहाँ बनते हैं। इसलिए अगर कोई मुझसे मेरे शहर की सबसे अच्छी जगह पूछे, तो मैं पार्क या मॉल नहीं, बल्कि यही आम वाला पार्क बताऊँगी।',
      transliteration:
        'hamaare mohalle ke ekdam peechhe ek chhotaa-saa paark hai jise log "aam vaalaa paark" kahte hain - shaayad isliye ki vahaan teen puraane aam ke ped khade hain. baahar se yah paark khaas nahin dikhtaa, lekin mere liye yah mohalle ki sabse pyaari jagah hai. har shaam jab school se thakkar ghar lautti hoon, tab main kitaaben rakhkar seedhe vahin chali jaati hoon.\n\npaark mein zyaadaa kuchh nahin hai - kuchh jhoole, ek puraani bench, aur ek chhotaa favvaaraa jo aksar band hi rahtaa hai. lekin barsaat ke mausam mein yah jagah bilkul badal jaati hai. pichhle joon ki ek shaam mujhe achhi tarah yaad hai - achaanak baarish shuru ho gayi, main aur meri saheli riyaa bench ke neeche chhup gaye, aur hamne agle aadhe ghante tak poori chocolate khaa li. haalaanki kapde bheeg gaye, ham bahut hanse. vah shaam aaj bhi mujhe muskuraa deti hai.\n\nmujhe lagtaa hai ki ek jagah sirf apni sundartaa se khaas nahin banti, balki un palon se banti hai jo vahaan bante hain. isliye agar koi mujhse mere shahar ki sabse achhi jagah poochhe, to main paark yaa mall nahin, balki yahi aam vaalaa paark bataaoongi.',
      english:
        "Right behind our neighborhood there's a small park that people call the \"mango park\" - probably because three old mango trees stand there. From the outside the park doesn't look special, but for me it is the most beloved place in the neighborhood. Every evening when I come home tired from school, I set my books down and walk straight there.\n\nThere isn't much in the park - some swings, an old bench, and a small fountain that mostly stays off. But in the monsoon season this place completely changes. I remember one evening last June clearly - rain started suddenly, my friend Riya and I hid under the bench, and over the next half hour we finished a whole chocolate bar. Although our clothes got soaked, we laughed a lot. That evening still makes me smile today.\n\nI think a place becomes special not by its own beauty, but by the moments that are made there. So if someone asked me the best place in my city, I would say not a park or a mall, but this very mango park.",
      wordCount: 245,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['lekin', 'jabTab', 'halaanki', 'isliye', 'agarTo', 'mujheLagta', 'sirfNahiBalki', 'kyonki'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'हमारे मोहल्ले के ठीक पीछे एक छोटा-सा पार्क है जिसे लोग "आम वाला पार्क" कहते हैं - शायद इसलिए कि वहाँ तीन बहुत पुराने आम के पेड़ अब भी खड़े हैं। बाहर से यह पार्क कुछ ख़ास नहीं दिखता, और पास से गुज़रने वाले लोग शायद ही इस पर ध्यान देते हैं; लेकिन मेरे लिए यह पूरे मोहल्ले की सबसे प्यारी जगह है। हर शाम जब स्कूल से थककर घर लौटती हूँ, तब मैं किताबें रखकर सीधे वहीं चली जाती हूँ - ऐसा लगता है कि दिन का असली अंत वहीं होता है।\n\nपार्क में सचमुच ज़्यादा कुछ नहीं है - कुछ पुराने झूले, एक लकड़ी की बेंच, और एक छोटा फव्वारा जो अक्सर बंद ही रहता है। लेकिन बरसात के मौसम में यह जगह एकदम बदल जाती है। पिछले जून की एक शाम मुझे अच्छी तरह याद है - अचानक बारिश शुरू हो गई, मैं और मेरी सहेली रिया बेंच के नीचे छुप गए, और हमने अगले आधे घंटे तक वहीं बैठकर पूरी चॉकलेट खा ली। हालाँकि कपड़े पूरी तरह भीग गए और हमारी जूतियाँ मिट्टी से भर गईं, किसी को शिकायत नहीं थी। वह छोटी-सी शाम आज भी, बिना कुछ कहे, मुझे मुस्कुरा देती है।\n\nमेरा मानना है कि एक जगह सिर्फ़ अपनी सुंदरता या अपनी बनावट से ख़ास नहीं बनती, बल्कि उन पलों से बनती है जो वहाँ अनजाने में बन जाते हैं। अगर कोई कल मुझसे पूछे कि मेरे शहर की सबसे अच्छी जगह कौन-सी है, तो मैं कोई बड़ा पार्क या चमकता मॉल नहीं, बल्कि यही अपना पुराना आम वाला पार्क बताऊँगी - क्योंकि असली सुंदरता वहीं होती है जहाँ कहानियाँ होती हैं।',
      transliteration:
        'hamaare mohalle ke theek peechhe ek chhotaa-saa paark hai jise log "aam vaalaa paark" kahte hain - shaayad isliye ki vahaan teen bahut puraane aam ke ped ab bhi khade hain. baahar se yah paark kuchh khaas nahin dikhtaa, aur paas se guzarne vaale log shaayad hi is par dhyaan dete hain; lekin mere liye yah poore mohalle ki sabse pyaari jagah hai. har shaam jab school se thakkar ghar lautti hoon, tab main kitaaben rakhkar seedhe vahin chali jaati hoon - aisaa lagtaa hai ki din kaa asli ant vahin hotaa hai.\n\npaark mein sachmuch zyaadaa kuchh nahin hai - kuchh puraane jhoole, ek lakdi ki bench, aur ek chhotaa favvaaraa jo aksar band hi rahtaa hai. lekin barsaat ke mausam mein yah jagah ekdam badal jaati hai. pichhle joon ki ek shaam mujhe achhi tarah yaad hai - achaanak baarish shuru ho gayi, main aur meri saheli riyaa bench ke neeche chhup gaye, aur hamne agle aadhe ghante tak vahin baithkar poori chocolate khaa li. haalaanki kapde poori tarah bheeg gaye aur hamaari jootiyaan mitti se bhar gayeen, kisi ko shikaayat nahin thi. vah chhoti-si shaam aaj bhi, binaa kuchh kahe, mujhe muskuraa deti hai.\n\nmeraa maannaa hai ki ek jagah sirf apni sundartaa yaa apni banaavat se khaas nahin banti, balki un palon se banti hai jo vahaan anjaane mein ban jaate hain. agar koi kal mujhse poochhe ki mere shahar ki sabse achhi jagah kaun-si hai, to main koi badaa paark yaa chamaktaa mall nahin, balki yahi apnaa puraanaa aam vaalaa paark bataaoongi - kyonki asli sundartaa vahin hoti hai jahaan kahaaniyaan hoti hain.',
      english:
        "Right behind our neighborhood there's a small park people call the \"mango park\" - probably because three very old mango trees still stand there. From the outside it doesn't look special, and people passing by barely notice it; but for me it is the most beloved place in the whole neighborhood. Every evening when I come home tired from school, I set my books down and walk straight there - it feels as if the day's true end happens only there.\n\nThere really isn't much in the park - some old swings, a wooden bench, and a small fountain that mostly stays off. But in the monsoon season this place transforms completely. I remember one evening last June clearly - rain started suddenly, my friend Riya and I hid under the bench, and over the next half hour we sat there and finished a whole chocolate bar. Although our clothes got fully soaked and our shoes filled with mud, no one minded. That small evening still, without saying a word, makes me smile today.\n\nI believe a place becomes special not by its own beauty or its design, but by the moments that form there unnoticed. If someone asks me tomorrow which is the best place in my city, I won't say a big park or a shiny mall, but this very old mango park of mine - because real beauty is where the stories are.",
      wordCount: 322,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['lekin', 'jabTab', 'halaanki', 'isliye', 'agarTo', 'meraManna', 'sirfNahiBalki', 'kyonki'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'structure', highlight: 'शायद इसलिए कि वहाँ तीन पुराने आम के पेड़ खड़े हैं', note: 'Parenthetical reason. A syntactic move above simple coordination - B5 signal.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'बाहर से ... नहीं दिखता, लेकिन मेरे लिए', note: 'लेकिन establishes the voice: "others don\'t see it, but I do." This is the essay\'s thesis.' },
    { paragraphIndex: 0, kind: 'vocab', highlight: 'आम वाला पार्क', note: 'A proper noun invented on-page gives the essay a uniquely local feel. Topic-Coverage gold.' },
    { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले जून की एक शाम मुझे अच्छी तरह याद है', note: 'Shift from present description to specific past memory. The habitual-to-specific pivot.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि कपड़े भीग गए, हम बहुत हँसे', note: 'हालाँकि concession - classic Intermediate-Mid construction.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'वह शाम आज भी मुझे मुस्कुरा देती है', note: 'Personification ("that evening makes me smile") - voice signal above description.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ अपनी सुंदरता से ... नहीं, बल्कि', note: 'Correlative "not by X, but by Y" - thesis restatement with elevated structure.' },
    { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगर कोई मुझसे पूछे, तो मैं बताऊँगी', note: 'Conditional + future - shows sustained Language Control across two frames.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'इसलिए अगर ... तो', note: 'Cause + condition in one sentence. Syntactic density past IL.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'पार्क या मॉल नहीं, बल्कि यही आम वाला पार्क', note: 'Rejects the generic "big" option in favor of the specific local one - the writing voice the rubric rewards.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three paragraphs with a clear descriptive-to-narrative-to-reflective arc. Text-Type at Benchmark 5.',
      'Three tense frames - present-habitual (लौटती हूँ), specific past (शुरू हो गई, भीग गए), conditional future (कोई पूछे, बताऊँगी). Language Control: yes.',
      'Eight connectors including one concession (हालाँकि), one cause (क्योंकि), one correlative (सिर्फ़...बल्कि), one conditional (अगर...तो). Sentence rearrangeability fails - the IM test.',
      'Voice: essay argues "my favorite place is not beautiful but meaningful". This is a thesis, not a description - which is exactly what the rubric rewards at IM+.',
      'Invented proper noun ("आम वाला पार्क") + weather-specific memory (monsoon + chocolate) give the essay a concreteness impossible to generate generically.',
    ],
    gotchas: [
      'पार्क ki zyaadaa ka word order - careful with postposition attachment.',
      'हालाँकि कपड़े भीग गए - माँ not माँ के, since कपड़े is subject.',
      'If the student describes the park without the specific past beat (last June, rain, chocolate), Text-Type drops to IL.',
    ],
  },
  readerQuestions: [
    { q: 'पार्क का नाम क्या है और क्यों?', a: 'उसे "आम वाला पार्क" कहते हैं क्योंकि वहाँ तीन पुराने आम के पेड़ हैं।' },
    { q: 'पार्क में क्या-क्या है?', a: 'कुछ झूले, एक पुरानी बेंच, और एक छोटा फव्वारा जो अक्सर बंद रहता है।' },
    { q: 'पिछले जून की शाम क्या हुआ?', a: 'अचानक बारिश शुरू हो गई और लेखिका अपनी सहेली के साथ बेंच के नीचे छुप गई।' },
    { q: 'बारिश में दोनों ने क्या खाया?', a: 'उन्होंने पूरी चॉकलेट खा ली।' },
    { q: 'लेखिका के अनुसार एक जगह कैसे ख़ास बनती है?', a: 'अपनी सुंदरता से नहीं, बल्कि उन पलों से जो वहाँ बनते हैं।' },
  ],
  teacherNote: {
    why:
      'C04 is the "descriptive essay with voice" capstone. A student who can resist turning a place into a feature list and instead wrap it in a single specific memory has learned the single most transferable FCPS skill - because nearly every prompt asks for a personal experience, and places are one of the easiest domains to mine for one.',
    trains: ['TextType', 'TopicCoverage', 'LanguageControl'],
    examLink:
      'STAMP rubric - "connected sentences with transitions and groupings of ideas" + "concrete details, not generic words" → Benchmark 5.',
  },
  status: 'shipped',
  version: 1,
};
