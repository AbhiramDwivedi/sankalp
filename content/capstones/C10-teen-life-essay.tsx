// Capstone C10 — "What it means to be a teenager today"
// Push tier, ceiling anchor (reaches toward Benchmark 6). Main-thread authored.
// Integrates L3-02 teen life, L1-08 interests, L2-06 health, L1-03 family.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C10-teen-life-essay',
  order: 10,
  tier: 'push',
  isMockExam: false,
  themeGroup: 'HumanIngenuity',
  heroMotif: 'notebook',
  titleHindi: 'आज का किशोर होने का मतलब',
  titleEnglish: 'What it means to be a teenager today',
  hook: 'An opinion essay at the push ceiling — three tense frames, hypothetical reasoning, and a rater-grade register.',
  promptHindi:
    'आज के समय में एक किशोर होना कैसा लगता है? तीन सुसंगत पैराग्राफ में अपनी राय लिखो।',
  promptEnglish:
    'What is it like to be a teenager in today\'s world? Write your opinion in three cohesive paragraphs.',
  whyThisCapstone:
    'C10 is the ceiling essay. Unlike the narrative capstones, this is an opinion piece — the STAMP rubric reserves the highest language-control marks for students who can hold a sustained argument across paragraphs. A student who lands this essay at push length has shown the rater a bigger vocabulary, hypothetical reasoning, and multi-clause sentences. This is the shape that nudges a Benchmark-5 essay toward Benchmark 6.',
  draws: [
    { packId: 'L3-02-teen-life', contributes: 'vocabulary', note: 'Teen-specific register: दबाव, स्वतंत्रता, अपेक्षाएँ, सोशल मीडिया.' },
    { packId: 'L1-08-interests-leisure', contributes: 'vocabulary', note: 'Hobbies and leisure vocabulary anchor the second paragraph.' },
    { packId: 'L2-06-health-fitness', contributes: 'vocabulary', note: 'Mental and physical wellness vocabulary — neeंद, तनाव, व्यायाम.' },
    { packId: 'L1-03-family', contributes: 'structure', note: 'Family-expectation framing is central to the teen-life discussion in South Asian households.' },
    { packId: 'L3-03-my-future', contributes: 'structure', note: 'Future-tense register and hypothetical phrasing bridge into the closing paragraph.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'मैं एक किशोरी हूँ। आज के समय में हमारी ज़िंदगी बहुत अलग है। हम पढ़ते हैं, खेलते हैं, और बहुत काम करते हैं। हमारे पास मोबाइल फ़ोन है। हम दोस्तों से मिलते हैं। कभी-कभी हम थक जाते हैं। परिवार हमसे बहुत उम्मीद रखता है। मुझे लगता है कि किशोर होना मज़ेदार भी है और मुश्किल भी। मैं अच्छा भविष्य चाहती हूँ। मैं मेहनत करूँगी।',
      transliteration:
        'main ek kishori hoon. aaj ke samay mein hamaari zindagi bahut alag hai. ham padhte hain, khelte hain, aur bahut kaam karte hain. hamaare paas mobile phone hai. ham doston se milte hain. kabhi-kabhi ham thak jaate hain. parivaar hamse bahut ummeed rakhtaa hai. mujhe lagtaa hai ki kishor honaa mazedaar bhi hai aur mushkil bhi. main achhaa bhavishya chaahti hoon. main mehnat karoongi.',
      english:
        "I am a teenager. In today's time our life is very different. We study, play, and do a lot of work. We have mobile phones. We meet our friends. Sometimes we get tired. Family expects a lot from us. I think being a teenager is fun and also difficult. I want a good future. I will work hard.",
      wordCount: 115,
      tensesUsed: ['present', 'future'],
      connectorsUsed: ['kyonki'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'आज के ज़माने में किशोर होना पहले से कहीं ज़्यादा जटिल हो गया है। मेरी पीढ़ी एक ऐसी दुनिया में बड़ी हो रही है जहाँ हर पल कुछ नया हो रहा है — नए ऐप, नई खबरें, नए दबाव। सुबह उठते ही मेरा मोबाइल मुझे बताता है कि मेरे दोस्त क्या कर रहे हैं, दुनिया में क्या हो रहा है, और मुझे क्या करना चाहिए। यह सब रोचक तो है, लेकिन कभी-कभी बहुत थका देता है।\n\nएक ओर स्कूल में पढ़ाई का बोझ है, और दूसरी ओर परिवार की उम्मीदें। मेरी माँ मुझसे अच्छे अंकों की उम्मीद रखती हैं, पापा चाहते हैं कि मैं कोई खेल भी सीखूँ, और मेरे दोस्तों के साथ समय बिताने का भी मन करता है। इसलिए अक्सर मुझे लगता है कि दिन में चौबीस घंटे कम पड़ते हैं। हालाँकि यह सब मुश्किल लगता है, मुझे अपनी पीढ़ी पर गर्व है — हम बहुत कुछ सीखते हैं, बहुत कुछ झेलते हैं, और फिर भी मुस्कुराते हैं।\n\nमेरा मानना है कि एक अच्छा किशोर वही है जो पढ़ाई के साथ-साथ अपनी सेहत, अपने दोस्तों, और अपने परिवार का भी ख़्याल रखे। अगर हम संतुलन सीख लें, तो आगे चलकर हम अच्छे इंसान बन सकते हैं। इसलिए मैं रोज़ कोशिश करती हूँ — थोड़ी पढ़ाई, थोड़ा खेल, थोड़ी बातचीत, और थोड़ा आराम।',
      transliteration:
        'aaj ke zamaane mein kishor honaa pahle se kahin zyaadaa jatil ho gayaa hai. meri peedhi ek aisi duniyaa mein badi ho rahi hai jahaan har pal kuchh nayaa ho rahaa hai — naye app, nayi khabaren, naye dabaav. subah uthte hi meraa mobile mujhe bataataa hai ki mere dost kyaa kar rahe hain, duniyaa mein kyaa ho rahaa hai, aur mujhe kyaa karnaa chaahiye. yah sab rochak to hai, lekin kabhi-kabhi bahut thakaa detaa hai.\n\nek or school mein padhaayi kaa bojh hai, aur doosri or parivaar ki ummeeden. meri maan mujhse achhe ankon ki ummeed rakhti hain, paapaa chaahte hain ki main koi khel bhi seekhoon, aur mere doston ke saath samay bitaane kaa bhi man kartaa hai. isliye aksar mujhe lagtaa hai ki din mein chaubees ghante kam padte hain. haalaanki yah sab mushkil lagtaa hai, mujhe apni peedhi par garv hai — ham bahut kuchh seekhte hain, bahut kuchh jhelte hain, aur phir bhi muskuraate hain.\n\nmeraa maannaa hai ki ek achhaa kishor vahi hai jo padhaayi ke saath-saath apni sehat, apne doston, aur apne parivaar kaa bhi khyaal rakhe. agar ham santulan seekh len, to aage chalkar ham achhe insaan ban sakte hain. isliye main roz koshish karti hoon — thodi padhaayi, thodaa khel, thodi baat-cheet, aur thodaa aaraam.',
      english:
        "Being a teenager in today's time has become more complicated than ever before. My generation is growing up in a world where something new happens every moment — new apps, new news, new pressures. As soon as I wake up, my phone tells me what my friends are doing, what's happening in the world, and what I should be doing. All of it is interesting, but sometimes it is exhausting.\n\nOn one hand there is the weight of school studies, and on the other the expectations of family. My mom expects me to get good grades, dad wants me to also learn a sport, and I want to spend time with my friends too. So often I feel that twenty-four hours in a day aren't enough. Although all of this feels difficult, I am proud of my generation — we learn so much, we endure so much, and we still smile.\n\nI believe a good teenager is one who takes care of health, friends, and family alongside studies. If we learn balance, we can grow into good people. So I try every day — a little study, a little play, a little conversation, and a little rest.",
      wordCount: 268,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['lekin', 'isliye', 'halaanki', 'agarTo', 'meraManna', 'kyonki'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'आज के ज़माने में किशोर होना पहले से कहीं ज़्यादा जटिल हो गया है, यह बात मैं अपनी ज़िंदगी के हर दिन महसूस करती हूँ। मेरी पीढ़ी एक ऐसी दुनिया में बड़ी हो रही है जहाँ हर पल कुछ नया हो रहा है — नए ऐप, नई खबरें, नए दबाव, और नई उम्मीदें। सुबह की पहली घंटी बजने से पहले ही मेरा मोबाइल मुझे बता देता है कि मेरे दोस्त क्या कर रहे हैं, दुनिया में क्या घट रहा है, और मुझे आज क्या-क्या करना चाहिए। यह सब रोचक तो है, लेकिन सच कहूँ, तो कभी-कभी इतना बहुत हो जाता है कि दिमाग को आराम देना भी एक कला बन गई है।\n\nएक ओर स्कूल में पढ़ाई का बोझ है, दूसरी ओर परिवार की मीठी लेकिन भारी उम्मीदें, और बीच में हम — जो न पूरी तरह बच्चे रह गए हैं, न पूरे बड़े हुए हैं। मेरी माँ मुझसे अच्छे अंकों की उम्मीद रखती हैं, पापा चाहते हैं कि मैं कोई खेल भी सीखूँ, और अपने दोस्तों के साथ भी समय बिताने का मन करता है। हालाँकि यह सब मुश्किल लगता है, मुझे अपनी पीढ़ी पर गर्व है — हम सिर्फ़ पढ़ते ही नहीं, बल्कि दुनिया को सवाल भी पूछते हैं, परिवर्तन की माँग भी करते हैं, और फिर भी हँसना नहीं भूलते। अगर मेरी दादी आज के समय में बड़ी हो रही होतीं, तो शायद वे भी यही कहतीं।\n\nमेरा मानना है कि एक अच्छा किशोर वही है जो पढ़ाई, सेहत, दोस्ती, और परिवार — इन चारों को संतुलन में रखे। अगर हम छोटी उम्र में ही यह संतुलन सीख लें, तो आगे चलकर हम न सिर्फ़ सफल पेशेवर बनेंगे, बल्कि अच्छे इंसान भी। इसलिए मैं रोज़ सुबह अपने आप से कहती हूँ — आज थोड़ी पढ़ाई, थोड़ा खेल, थोड़ी बातचीत, और थोड़ा आराम — और यही हमारी पीढ़ी का असली मंत्र है।',
      transliteration:
        'aaj ke zamaane mein kishor honaa pahle se kahin zyaadaa jatil ho gayaa hai, yah baat main apni zindagi ke har din mahasoos karti hoon. meri peedhi ek aisi duniyaa mein badi ho rahi hai jahaan har pal kuchh nayaa ho rahaa hai — naye app, nayi khabaren, naye dabaav, aur nayi ummeedein. subah ki pahli ghanti bajne se pahle hi meraa mobile mujhe bataa detaa hai ki mere dost kyaa kar rahe hain, duniyaa mein kyaa ghat rahaa hai, aur mujhe aaj kyaa-kyaa karnaa chaahiye. yah sab rochak to hai, lekin sach kahoon, to kabhi-kabhi itnaa bahut ho jaataa hai ki dimaag ko aaraam denaa bhi ek kalaa ban gayi hai.\n\nek or school mein padhaayi kaa bojh hai, doosri or parivaar ki meethi lekin bhaari ummeedein, aur beech mein ham — jo na poori tarah bachche rah gaye hain, na poore bade hue hain. meri maan mujhse achhe ankon ki ummeed rakhti hain, paapaa chaahte hain ki main koi khel bhi seekhoon, aur apne doston ke saath bhi samay bitaane kaa man kartaa hai. haalaanki yah sab mushkil lagtaa hai, mujhe apni peedhi par garv hai — ham sirf padhte hi nahin, balki duniyaa ko savaal bhi poochhte hain, parivartan ki maang bhi karte hain, aur phir bhi hansnaa nahin bhoolte. agar meri daadi aaj ke samay mein badi ho rahi hotin, to shaayad ve bhi yahi kahtin.\n\nmeraa maannaa hai ki ek achhaa kishor vahi hai jo padhaayi, sehat, dosti, aur parivaar — in chaaron ko santulan mein rakhe. agar ham chhoti umar mein hi yah santulan seekh len, to aage chalkar ham na sirf safal peshevar banenge, balki achhe insaan bhi. isliye main roz subah apne aap se kahti hoon — aaj thodi padhaayi, thodaa khel, thodi baat-cheet, aur thodaa aaraam — aur yahi hamaari peedhi kaa asli mantra hai.',
      english:
        "Being a teenager in today's time has become more complicated than ever, and I feel this every single day of my life. My generation is growing up in a world where something new is happening every moment — new apps, new news, new pressures, new expectations. Before the first school bell even rings, my phone tells me what my friends are doing, what's happening in the world, and everything I should be doing today. All of this is interesting, but honestly, sometimes it gets so overwhelming that even resting the mind has become an art.\n\nOn one side is the weight of school studies, on the other the sweet but heavy expectations of family, and in between — us, who are neither fully children anymore nor fully grown. My mom expects good grades, dad wants me to also learn a sport, and I want to spend time with my friends too. Although all of this feels difficult, I am proud of my generation — we don't just study, we also question the world, we demand change, and we still don't forget to laugh. If my grandmother were growing up today, she would probably say the same.\n\nI believe a good teenager is one who keeps studies, health, friendship, and family — all four — in balance. If we learn this balance young, then we will go on to become not only successful professionals but also good human beings. So I say to myself every morning — today, a little study, a little play, a little conversation, and a little rest — and that is really my generation's mantra.",
      wordCount: 338,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['lekin', 'isliye', 'halaanki', 'agarTo', 'meraManna', 'kyonki', 'sirfNahiBalki', 'jabki'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'structure', highlight: 'पहले से कहीं ज़्यादा जटिल हो गया है', note: 'Comparative opening — immediately frames the essay as an argument, not a description. Rubric register boost.' },
    { paragraphIndex: 0, kind: 'vocab', highlight: 'नए ऐप, नई खबरें, नए दबाव', note: 'Triple parallel noun phrase. Syntactic parallelism is a Benchmark-6 marker.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'यह सब रोचक तो है, लेकिन', note: 'Concession clause. Opinion essays live on concession — this is the single most important connector type for Push-tier writing.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'एक ओर ... दूसरी ओर', note: 'Formal discourse marker pair. This is textbook Benchmark 6.' },
    { paragraphIndex: 1, kind: 'vocab', highlight: 'दबाव ... उम्मीदें ... संतुलन', note: 'Abstract nouns (pressure, expectations, balance). Moving beyond concrete vocabulary = higher Language Control mark.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि यह सब मुश्किल लगता है', note: 'हालाँकि concession clause — shows the student can hold contrasting ideas in one sentence.' },
    { paragraphIndex: 1, kind: 'tense-shift', highlight: 'अगर मेरी दादी आज के समय में बड़ी हो रही होतीं', note: 'Hypothetical in past continuous. This is one of the hardest Hindi constructions — landing it correctly pushes language control above Benchmark 5.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'अगर हम ... तो ... न सिर्फ़ ... बल्कि', note: 'Conditional + correlative in the same sentence. This is the syntactic density Benchmark 6 requires.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'मेरा मानना है कि एक अच्छा किशोर वही है जो', note: 'Thesis sentence with relative clause. Formal register signal.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'यही हमारी पीढ़ी का असली मंत्र है', note: 'The word मंत्र lands culturally; closing on it gives the essay a Hindi-specific register rather than a translated-from-English feel.' },
  ],
  verdict: {
    predictedBenchmark: 6,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Opinion essay with a sustained thesis — "being a teenager is complex, and balance is the answer." Text-Type at Benchmark 6: "paragraph-length narratives; clear cohesion across multiple paragraphs."',
      'Eight connector types (लेकिन, इसलिए, हालाँकि, अगर...तो, क्योंकि, सिर्फ़...नहीं बल्कि, जबकि, मेरा मानना है). Syntactic variety is the B6 discriminator.',
      'Hypothetical (अगर दादी बड़ी हो रही होतीं) and abstract nouns (दबाव, संतुलन, पीढ़ी) show Language Control beyond the IM baseline.',
      'Three tense frames + one formal concession structure (एक ओर...दूसरी ओर). Rater will read this as "emerging Intermediate-High / B6".',
      'Closing sentence lands a Hindi-register word (मंत्र) — avoids the "translated-from-English" feel many student essays have.',
    ],
    gotchas: [
      'The hypothetical form "बड़ी हो रही होतीं" is easy to mangle. Getting the feminine plural agreement wrong drops it back to Benchmark 5.',
      'If the student writes a list of pressures instead of a thesis + evidence, Text-Type drops from IM/IH to IL.',
      'Losing the एक ओर...दूसरी ओर move deflates the mid-paragraph — without it, the essay still passes at B5 but loses the B6 ceiling.',
    ],
  },
  readerQuestions: [
    { q: 'लेखिका के अनुसार आज का किशोर होना पहले से कैसा है?', a: 'पहले से कहीं ज़्यादा जटिल हो गया है।' },
    { q: 'एक ओर और दूसरी ओर क्या है?', a: 'एक ओर स्कूल की पढ़ाई का बोझ है, और दूसरी ओर परिवार की उम्मीदें।' },
    { q: 'लेखिका अपनी पीढ़ी पर गर्व क्यों करती है?', a: 'क्योंकि वे सीखते भी हैं, सवाल भी पूछते हैं, परिवर्तन की माँग करते हैं, और फिर भी हँसना नहीं भूलते।' },
    { q: 'लेखिका के अनुसार एक अच्छा किशोर कौन है?', a: 'जो पढ़ाई, सेहत, दोस्ती, और परिवार — इन चारों को संतुलन में रखे।' },
    { q: 'उसकी पीढ़ी का "असली मंत्र" क्या है?', a: 'थोड़ी पढ़ाई, थोड़ा खेल, थोड़ी बातचीत, और थोड़ा आराम।' },
  ],
  teacherNote: {
    why:
      'C10 is the ceiling of the capstone library. Other capstones prove a student can narrate; C10 proves they can argue. The combination of concession clauses, abstract nouns, and a hypothetical past form is the exact signal a STAMP rater uses to move an essay from Benchmark 5 to Benchmark 6. A student who lands this essay has shown they can write beyond the pass bar — which is the ultimate insurance against a borderline score.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    examLink:
      'STAMP rubric — "paragraph-length narratives; clear cohesion across multiple paragraphs" (Benchmark 6). Earning B6 on just one of the two essays is the safest path to 3 FCPS credits — it absorbs variation on the other.',
  },
  status: 'shipped',
  version: 1,
};
