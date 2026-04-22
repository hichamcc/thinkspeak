export type Language = 'en' | 'fr' | 'es' | 'ar' | 'ja'

export const LANG_BCP47: Record<Language, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  ar: 'ar-SA',
  ja: 'ja-JP',
}

// ─── Shadowing sentences ───────────────────────────────────────────────────

export const SHADOWING: Record<Language, string[]> = {
  en: [
    'Practice every day, even when you do not feel like it.',
    'The hardest part is starting. Everything gets easier after that.',
    'She looked out the window and watched the rain begin to fall.',
    'There is a big difference between knowing something and being able to explain it.',
    'He spent three years living in a city where nobody spoke his language.',
    'The more you listen, the easier it becomes to hear the patterns.',
    'Nobody becomes fluent without making a lot of embarrassing mistakes first.',
    'The coffee was cold but she drank it anyway and kept reading.',
    'Learning a language is learning a different way of seeing the world.',
    'You do not need to be perfect. You just need to be understood.',
    'She had been studying for hours but the words still would not come.',
    'The best conversations happen when both people are genuinely curious.',
  ],
  fr: [
    'La pratique quotidienne vaut mieux qu\'une longue session hebdomadaire.',
    'Le plus difficile c\'est de commencer. Après ça devient plus facile.',
    'Elle regarda par la fenêtre et vit la pluie commencer à tomber.',
    'Il y a une grande différence entre savoir quelque chose et pouvoir l\'expliquer.',
    'Il a passé trois ans dans une ville où personne ne parlait sa langue.',
    'Plus vous écoutez, plus il devient facile d\'entendre les structures.',
    'Personne ne devient bilingue sans faire beaucoup d\'erreurs embarrassantes d\'abord.',
    'Le café était froid mais elle le but quand même et continua à lire.',
    'Apprendre une langue c\'est apprendre une façon différente de voir le monde.',
    'Tu n\'as pas besoin d\'être parfait. Tu dois juste être compris.',
  ],
  es: [
    'Practica todos los días, incluso cuando no tengas ganas.',
    'Lo más difícil es empezar. Todo se vuelve más fácil después.',
    'Ella miró por la ventana y vio cómo empezaba a llover.',
    'Hay una gran diferencia entre saber algo y poder explicarlo.',
    'Pasó tres años viviendo en una ciudad donde nadie hablaba su idioma.',
    'Cuanto más escuchas, más fácil se vuelve reconocer los patrones.',
    'Nadie se vuelve fluido sin cometer muchos errores vergonzosos primero.',
    'El café estaba frío pero ella lo bebió de todas formas y siguió leyendo.',
    'Aprender un idioma es aprender una forma diferente de ver el mundo.',
    'No necesitas ser perfecto. Solo necesitas ser entendido.',
  ],
  ar: [
    'مارس كل يوم، حتى عندما لا تشعر بالرغبة في ذلك.',
    'أصعب جزء هو البداية. كل شيء يصبح أسهل بعد ذلك.',
    'نظرت من النافذة وشاهدت المطر يبدأ في السقوط.',
    'هناك فرق كبير بين معرفة شيء والقدرة على شرحه.',
    'قضى ثلاث سنوات في مدينة لا يتحدث فيها أحد لغته.',
    'كلما استمعت أكثر، كلما أصبح من الأسهل سماع الأنماط.',
    'لا أحد يصبح طليقاً دون ارتكاب الكثير من الأخطاء المحرجة أولاً.',
    'التعلم لا يتطلب الكمال، بل يتطلب الفهم.',
  ],
  ja: [
    '毎日練習してください、たとえやる気がなくても。',
    '一番難しいのは始めることです。その後はすべてが楽になります。',
    '彼女は窓の外を見て、雨が降り始めるのを見ました。',
    '何かを知っていることと、それを説明できることには大きな違いがあります。',
    '彼は誰も自分の言語を話さない都市で3年間過ごしました。',
    '聞けば聞くほど、パターンが聞き取りやすくなります。',
    '恥ずかしい間違いをたくさん犯さずに流暢になる人はいません。',
    '上手である必要はありません。理解されることが大切です。',
  ],
}

// ─── Dictation sentences ───────────────────────────────────────────────────

export const DICTATION: Record<Language, string[]> = {
  en: [
    'She opened the door slowly and looked inside.',
    'He decided to learn French after visiting Paris for the first time.',
    'The library closes at nine on weekdays and at five on weekends.',
    'Speaking a second language fluently takes time, patience, and daily practice.',
    'They walked along the river until the sun went down.',
    'I have been studying Japanese for two years but I still cannot read the newspaper.',
    'The meeting was cancelled because three people were sick.',
    'She reads for thirty minutes every morning before work.',
    'He forgot his phone at the restaurant and had to go back.',
    'It was raining when they arrived at the airport.',
    'She had never eaten sushi before but she tried it and liked it.',
    'The best way to improve is to practice speaking with real people every day.',
  ],
  fr: [
    'Elle ouvrit la porte lentement et regarda à l\'intérieur.',
    'Il décida d\'apprendre le français après avoir visité Paris pour la première fois.',
    'La bibliothèque ferme à neuf heures en semaine et à cinq heures le week-end.',
    'Parler couramment une deuxième langue demande du temps et de la patience.',
    'Ils marchèrent le long de la rivière jusqu\'au coucher du soleil.',
    'Il pleuvait quand ils arrivèrent à l\'aéroport.',
    'La réunion a été annulée parce que trois personnes étaient malades.',
    'Elle lit trente minutes chaque matin avant le travail.',
  ],
  es: [
    'Ella abrió la puerta despacio y miró adentro.',
    'Decidió aprender francés después de visitar París por primera vez.',
    'La biblioteca cierra a las nueve entre semana y a las cinco los fines de semana.',
    'Hablar un segundo idioma con fluidez requiere tiempo, paciencia y práctica diaria.',
    'Caminaron junto al río hasta que el sol se puso.',
    'Llovía cuando llegaron al aeropuerto.',
    'La reunión fue cancelada porque tres personas estaban enfermas.',
    'Ella lee treinta minutos cada mañana antes del trabajo.',
  ],
  ar: [
    'فتحت الباب ببطء ونظرت في الداخل.',
    'قرر تعلم الفرنسية بعد زيارته لباريس لأول مرة.',
    'يغلق المكتبة في التاسعة في أيام الأسبوع وفي الخامسة في عطلة نهاية الأسبوع.',
    'التحدث بلغة ثانية بطلاقة يستغرق وقتاً وصبراً وممارسة يومية.',
    'كان يمطر عندما وصلوا إلى المطار.',
    'تم إلغاء الاجتماع لأن ثلاثة أشخاص كانوا مرضى.',
  ],
  ja: [
    '彼女はゆっくりドアを開けて中を見ました。',
    '彼は初めてパリを訪れた後、フランス語を学ぶことにしました。',
    '図書館は平日は9時に、週末は5時に閉まります。',
    '第二言語を流暢に話すには、時間と忍耐と毎日の練習が必要です。',
    '彼らは日が沈むまで川沿いを歩きました。',
    '3人が病気だったため、会議はキャンセルされました。',
  ],
}

// ─── Tongue twisters ───────────────────────────────────────────────────────

export interface TongueTwister {
  text:       string
  difficulty: 'easy' | 'medium' | 'hard'
  phonetic?:  string
}

export const TONGUE_TWISTERS: Record<Language, TongueTwister[]> = {
  en: [
    { text: 'Red lorry, yellow lorry.', difficulty: 'easy' },
    { text: 'Unique New York. Unique New York. You know you need unique New York.', difficulty: 'easy' },
    { text: 'She sells seashells by the seashore.', difficulty: 'easy' },
    { text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', difficulty: 'medium' },
    { text: 'Peter Piper picked a peck of pickled peppers.', difficulty: 'medium' },
    { text: 'Betty Botter bought some butter but she said the butter\'s bitter. If I put it in my batter it will make my batter bitter.', difficulty: 'medium' },
    { text: 'The sixth sick sheikh\'s sixth sheep\'s sick.', difficulty: 'hard' },
    { text: 'How can a clam cram in a clean cream can?', difficulty: 'hard' },
    { text: 'Pad kid poured curd pulled cod.', difficulty: 'hard' },
  ],
  fr: [
    { text: 'Un chasseur sachant chasser.', difficulty: 'easy' },
    { text: 'Cinq gros rats grillent dans la grande salle grise.', difficulty: 'easy' },
    { text: 'Un chasseur sachant chasser sait chasser sans son chien.', difficulty: 'medium' },
    { text: 'Les chaussettes de l\'archiduchesse sont-elles sèches, archi-sèches?', difficulty: 'medium' },
    { text: 'Didon dina, dit-on, du dos d\'un dodu dindon.', difficulty: 'hard' },
    { text: 'Seize chaises sèches. Seize chaises sèches. Seize chaises sèches.', difficulty: 'hard' },
  ],
  es: [
    { text: 'Tres tristes tigres.', difficulty: 'easy' },
    { text: 'Pablito clavó un clavito. ¿Qué clavito clavó Pablito?', difficulty: 'easy' },
    { text: 'Tres tristes tigres tragaban trigo en un trigal.', difficulty: 'medium' },
    { text: 'Como poco coco como, poco coco compro.', difficulty: 'medium' },
    { text: 'El cielo está enladrillado. ¿Quién lo desenladrillará? El desenladrillador que lo desenladrille buen desenladrillador será.', difficulty: 'hard' },
    { text: 'Pepe Peña pela papa, pica piña, pita un pito, pica piña, pela papa, Pepe Peña.', difficulty: 'hard' },
  ],
  ar: [
    { text: 'سلسلة زلزلة السلاسل.', difficulty: 'easy', phonetic: 'silsilat zilzalat al-salasil' },
    { text: 'جحا جحا حاج جاج.', difficulty: 'easy', phonetic: 'juha juha haj jaj' },
    { text: 'خال خالي خالٍ من الخيل والخيلاء.', difficulty: 'medium', phonetic: 'khal khali khalin min al-khayl wal-khayala' },
    { text: 'صف صفاً من الصفصاف الصافي في صف الصفصافات.', difficulty: 'hard', phonetic: 'suf saffan min al-safsaf al-safi fi saff al-safsafat' },
  ],
  ja: [
    { text: '生麦生米生卵', difficulty: 'easy', phonetic: 'nama mugi, nama gome, nama tamago' },
    { text: '隣の客はよく柿食う客だ', difficulty: 'medium', phonetic: 'tonari no kyaku wa yoku kaki kuu kyaku da' },
    { text: 'バスガス爆発', difficulty: 'medium', phonetic: 'basu gasu bakuhatsu' },
    { text: '赤巻紙青巻紙黄巻紙', difficulty: 'hard', phonetic: 'aka makigami, ao makigami, ki makigami' },
  ],
}

// ─── Debate prompts ────────────────────────────────────────────────────────

export const DEBATE_PROMPTS: string[] = [
  'Technology has made human relationships weaker.',
  'Cities are better places to live than the countryside.',
  'Learning a language is more valuable than learning to code.',
  'Social media has done more harm than good.',
  'Remote work is better for productivity than working in an office.',
  'Travel teaches you more than formal education.',
  'Bilingualism gives you a cognitive advantage in life.',
  'Reading books is more valuable than watching films.',
  'Competitive sports teach more bad lessons than good ones.',
  'It is better to specialize deeply than to be broadly knowledgeable.',
  'Privacy is more important than convenience.',
  'Parents are too protective of their children today.',
  'Failure is a better teacher than success.',
  'Money can buy happiness.',
  'The internet has made people less creative.',
  'It is more important to be kind than to be honest.',
  'Learning music makes you better at everything else.',
  'Hard work matters more than natural talent.',
  'Patience is the most important quality a person can have.',
  'It is better to have a few deep friendships than many shallow ones.',
  'Routine is the enemy of creativity.',
  'The most important language skill is listening, not speaking.',
  'Ambition causes more problems than it solves.',
  'Handwriting is a skill worth preserving.',
  'The best art comes from difficulty, not comfort.',
  'Introversion is an advantage in modern work.',
  'Breakfast is the most important meal of the day.',
  'First impressions are reliable.',
  'Experience is always more valuable than a diploma.',
  'It is better to ask for forgiveness than for permission.',
]

// ─── Word association words ────────────────────────────────────────────────

export const WORD_ASSOCIATION: string[] = [
  'ocean', 'fire', 'freedom', 'childhood', 'music', 'silence', 'mountain',
  'journey', 'home', 'memory', 'rain', 'midnight', 'language', 'dream',
  'city', 'library', 'winter', 'trust', 'failure', 'light', 'garden',
  'stranger', 'clock', 'hunger', 'voice', 'shadow', 'bridge', 'laughter',
  'wound', 'morning', 'crowd', 'empty', 'beginning', 'secret', 'time',
]

// ─── Flashcard vocabulary ──────────────────────────────────────────────────

export interface FlashCard {
  en:       string
  fr:       string
  es:       string
  ar:       string
  ar_roman: string
  ja:       string
  ja_roman: string
}

export const FLASHCARDS: FlashCard[] = [
  { en: 'speak',       fr: 'parler',        es: 'hablar',       ar: 'يتحدث',   ar_roman: 'yatahadath', ja: '話す',    ja_roman: 'hanasu'     },
  { en: 'listen',      fr: 'écouter',       es: 'escuchar',     ar: 'يستمع',   ar_roman: 'yastami',   ja: '聞く',    ja_roman: 'kiku'       },
  { en: 'understand',  fr: 'comprendre',    es: 'entender',     ar: 'يفهم',    ar_roman: 'yafham',    ja: '理解する', ja_roman: 'rikai suru' },
  { en: 'remember',    fr: 'se souvenir',   es: 'recordar',     ar: 'يتذكر',   ar_roman: 'yatadhkar', ja: '覚える',   ja_roman: 'oboeru'     },
  { en: 'learn',       fr: 'apprendre',     es: 'aprender',     ar: 'يتعلم',   ar_roman: 'yataallam', ja: '学ぶ',    ja_roman: 'manabu'     },
  { en: 'practice',    fr: 'pratiquer',     es: 'practicar',    ar: 'يمارس',   ar_roman: 'yumaris',   ja: '練習する', ja_roman: 'renshuu suru' },
  { en: 'improve',     fr: 'améliorer',     es: 'mejorar',      ar: 'يحسن',    ar_roman: 'yuhsin',    ja: '上達する', ja_roman: 'joutatsu suru' },
  { en: 'forget',      fr: 'oublier',       es: 'olvidar',      ar: 'ينسى',    ar_roman: 'yansa',     ja: '忘れる',   ja_roman: 'wasureru'   },
  { en: 'repeat',      fr: 'répéter',       es: 'repetir',      ar: 'يكرر',    ar_roman: 'yukarrir',  ja: '繰り返す', ja_roman: 'kurikaesu'  },
  { en: 'translate',   fr: 'traduire',      es: 'traducir',     ar: 'يترجم',   ar_roman: 'yutarjim',  ja: '翻訳する', ja_roman: 'hon\'yaku suru' },
  { en: 'pronounce',   fr: 'prononcer',     es: 'pronunciar',   ar: 'ينطق',    ar_roman: 'yantiq',    ja: '発音する', ja_roman: 'hatsuon suru' },
  { en: 'mistake',     fr: 'erreur',        es: 'error',        ar: 'خطأ',     ar_roman: 'khata',     ja: '間違い',   ja_roman: 'machigai'   },
  { en: 'confidence',  fr: 'confiance',     es: 'confianza',    ar: 'ثقة',     ar_roman: 'thiqa',     ja: '自信',    ja_roman: 'jishin'     },
  { en: 'fluent',      fr: 'courant',       es: 'fluido',       ar: 'طليق',    ar_roman: 'taliq',     ja: '流暢',    ja_roman: 'ryuucho'    },
  { en: 'accent',      fr: 'accent',        es: 'acento',       ar: 'لكنة',    ar_roman: 'lahja',     ja: 'なまり',   ja_roman: 'namari'     },
  { en: 'vocabulary',  fr: 'vocabulaire',   es: 'vocabulario',  ar: 'مفردات',  ar_roman: 'mufradat',  ja: '語彙',    ja_roman: 'goi'        },
  { en: 'grammar',     fr: 'grammaire',     es: 'gramática',    ar: 'قواعد',   ar_roman: 'qawaid',    ja: '文法',    ja_roman: 'bunpou'     },
  { en: 'sentence',    fr: 'phrase',        es: 'frase',        ar: 'جملة',    ar_roman: 'jumla',     ja: '文',      ja_roman: 'bun'        },
  { en: 'conversation',fr: 'conversation',  es: 'conversación', ar: 'محادثة',  ar_roman: 'muhadatha', ja: '会話',    ja_roman: 'kaiwa'      },
  { en: 'patience',    fr: 'patience',      es: 'paciencia',    ar: 'صبر',     ar_roman: 'sabr',      ja: '忍耐',    ja_roman: 'nintai'     },
  { en: 'daily',       fr: 'quotidien',     es: 'diario',       ar: 'يومي',    ar_roman: 'yawmi',     ja: '毎日',    ja_roman: 'mainichi'   },
  { en: 'progress',    fr: 'progrès',       es: 'progreso',     ar: 'تقدم',    ar_roman: 'taqaddum',  ja: '進歩',    ja_roman: 'shinpo'     },
  { en: 'native',      fr: 'natif',         es: 'nativo',       ar: 'أصلي',    ar_roman: 'asli',      ja: 'ネイティブ', ja_roman: 'neitibu'   },
  { en: 'immersion',   fr: 'immersion',     es: 'inmersión',    ar: 'انغماس',  ar_roman: 'inghimas',  ja: 'イマージョン', ja_roman: 'imaajon'  },
  { en: 'rhythm',      fr: 'rythme',        es: 'ritmo',        ar: 'إيقاع',   ar_roman: 'iqaa',      ja: 'リズム',   ja_roman: 'rizumu'     },
  { en: 'tone',        fr: 'ton',           es: 'tono',         ar: 'نبرة',    ar_roman: 'nabra',     ja: 'トーン',   ja_roman: 'toon'       },
  { en: 'journal',     fr: 'journal',       es: 'diario',       ar: 'يوميات',  ar_roman: 'yawmiyat',  ja: '日記',    ja_roman: 'nikki'      },
  { en: 'habit',       fr: 'habitude',      es: 'hábito',       ar: 'عادة',    ar_roman: 'ada',       ja: '習慣',    ja_roman: 'shuukan'    },
  { en: 'beginner',    fr: 'débutant',      es: 'principiante', ar: 'مبتدئ',   ar_roman: 'mubtadi',   ja: '初心者',   ja_roman: 'shoshinsha' },
  { en: 'advanced',    fr: 'avancé',        es: 'avanzado',     ar: 'متقدم',   ar_roman: 'mutaqaddim',ja: '上級者',   ja_roman: 'joukyuusha' },
  { en: 'write',       fr: 'écrire',        es: 'escribir',     ar: 'يكتب',    ar_roman: 'yaktub',    ja: '書く',    ja_roman: 'kaku'       },
  { en: 'read',        fr: 'lire',          es: 'leer',         ar: 'يقرأ',    ar_roman: 'yaqra',     ja: '読む',    ja_roman: 'yomu'       },
  { en: 'think',       fr: 'penser',        es: 'pensar',       ar: 'يفكر',    ar_roman: 'yufakkir',  ja: '考える',   ja_roman: 'kangaeru'   },
  { en: 'ask',         fr: 'demander',      es: 'preguntar',    ar: 'يسأل',    ar_roman: 'yasaal',    ja: '尋ねる',   ja_roman: 'tazuneru'   },
  { en: 'answer',      fr: 'répondre',      es: 'responder',    ar: 'يجيب',    ar_roman: 'yujib',     ja: '答える',   ja_roman: 'kotaeru'    },
  { en: 'meaning',     fr: 'sens',          es: 'significado',  ar: 'معنى',    ar_roman: 'mana',      ja: '意味',    ja_roman: 'imi'        },
  { en: 'word',        fr: 'mot',           es: 'palabra',      ar: 'كلمة',    ar_roman: 'kalima',    ja: '言葉',    ja_roman: 'kotoba'     },
  { en: 'letter',      fr: 'lettre',        es: 'letra',        ar: 'حرف',     ar_roman: 'harf',      ja: '文字',    ja_roman: 'moji'       },
  { en: 'difficult',   fr: 'difficile',     es: 'difícil',      ar: 'صعب',     ar_roman: 'saab',      ja: '難しい',   ja_roman: 'muzukashii' },
  { en: 'easy',        fr: 'facile',        es: 'fácil',        ar: 'سهل',     ar_roman: 'sahl',      ja: '簡単',    ja_roman: 'kantan'     },
  { en: 'slowly',      fr: 'lentement',     es: 'despacio',     ar: 'ببطء',    ar_roman: 'bibut',     ja: 'ゆっくり',  ja_roman: 'yukkuri'    },
  { en: 'clearly',     fr: 'clairement',    es: 'claramente',   ar: 'بوضوح',   ar_roman: 'biwuduh',   ja: 'はっきり',  ja_roman: 'hakkiri'    },
  { en: 'culture',     fr: 'culture',       es: 'cultura',      ar: 'ثقافة',   ar_roman: 'thaqafa',   ja: '文化',    ja_roman: 'bunka'      },
  { en: 'language',    fr: 'langue',        es: 'idioma',       ar: 'لغة',     ar_roman: 'lugha',     ja: '言語',    ja_roman: 'gengo'      },
  { en: 'story',       fr: 'histoire',      es: 'historia',     ar: 'قصة',     ar_roman: 'qissa',     ja: '話',      ja_roman: 'hanashi'    },
  { en: 'question',    fr: 'question',      es: 'pregunta',     ar: 'سؤال',    ar_roman: 'sual',      ja: '質問',    ja_roman: 'shitsumon'  },
  { en: 'friend',      fr: 'ami',           es: 'amigo',        ar: 'صديق',    ar_roman: 'sadiq',     ja: '友達',    ja_roman: 'tomodachi'  },
  { en: 'travel',      fr: 'voyager',       es: 'viajar',       ar: 'يسافر',   ar_roman: 'yusafir',   ja: '旅行する', ja_roman: 'ryokou suru'},
  { en: 'time',        fr: 'temps',         es: 'tiempo',       ar: 'وقت',     ar_roman: 'waqt',      ja: '時間',    ja_roman: 'jikan'      },
  { en: 'morning',     fr: 'matin',         es: 'mañana',       ar: 'صباح',    ar_roman: 'sabah',     ja: '朝',      ja_roman: 'asa'        },
  { en: 'evening',     fr: 'soir',          es: 'tarde',        ar: 'مساء',    ar_roman: 'masa',      ja: '夕方',    ja_roman: 'yuugata'    },
  { en: 'food',        fr: 'nourriture',    es: 'comida',       ar: 'طعام',    ar_roman: 'taam',      ja: '食べ物',   ja_roman: 'tabemono'   },
  { en: 'water',       fr: 'eau',           es: 'agua',         ar: 'ماء',     ar_roman: 'maa',       ja: '水',      ja_roman: 'mizu'       },
  { en: 'school',      fr: 'école',         es: 'escuela',      ar: 'مدرسة',   ar_roman: 'madrasa',   ja: '学校',    ja_roman: 'gakkou'     },
  { en: 'book',        fr: 'livre',         es: 'libro',        ar: 'كتاب',    ar_roman: 'kitab',     ja: '本',      ja_roman: 'hon'        },
  { en: 'music',       fr: 'musique',       es: 'música',       ar: 'موسيقى',  ar_roman: 'musiqa',    ja: '音楽',    ja_roman: 'ongaku'     },
  { en: 'succeed',     fr: 'réussir',       es: 'tener éxito',  ar: 'ينجح',    ar_roman: 'yanjah',    ja: '成功する', ja_roman: 'seikou suru'},
  { en: 'courage',     fr: 'courage',       es: 'coraje',       ar: 'شجاعة',   ar_roman: 'shajaa',    ja: '勇気',    ja_roman: 'yuuki'      },
]
