/**
 * Generates MP3 files for all shadowing sentences via ElevenLabs.
 * Run once: node scripts/generate-shadowing-audio.mjs
 * Requires: ELEVENLABS_API_KEY in .env.local
 *
 * Output: public/audio/shadowing/{lang}-{index}.mp3
 * Files are committed — no API calls happen at runtime.
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')

// Load API key from .env.local
const envPath = resolve(root, '.env.local')
const env     = existsSync(envPath)
  ? Object.fromEntries(
      readFileSync(envPath, 'utf8')
        .split('\n')
        .filter(l => l.includes('='))
        .map(l => l.split('=').map(s => s.trim()))
    )
  : {}

const API_KEY        = process.env.ELEVENLABS_API_KEY ?? env.ELEVENLABS_API_KEY
const VOICE_ID_OVERRIDE = process.env.ELEVENLABS_VOICE_ID ?? env.ELEVENLABS_VOICE_ID

if (!API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY — add it to .env.local')
  process.exit(1)
}

// ElevenLabs premade voices available on all plans (incl. free)
const PREMADE_VOICES = [
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam'    },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni'  },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella'   },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi'    },
  { id: 'MF3mGyEYCl7XYWbV9V9of', name: 'Elli'   },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh'    },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold'  },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam'     },
]

// Try to list account voices; fall back to premade list if permission missing
let VOICE_ID = VOICE_ID_OVERRIDE
if (!VOICE_ID) {
  const voicesRes = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: { 'xi-api-key': API_KEY },
  })
  if (voicesRes.ok) {
    const data   = await voicesRes.json()
    const voices = data.voices ?? []
    console.log('Available voices on your account:')
    for (const v of voices) console.log(`  ${v.voice_id}  ${v.name}`)
    console.log()
    VOICE_ID = voices[0]?.voice_id ?? PREMADE_VOICES[0].id
  } else {
    console.log('Could not list account voices (permission missing) — using premade voice list.')
    VOICE_ID = PREMADE_VOICES[0].id
  }
}

const voiceName = PREMADE_VOICES.find(v => v.id === VOICE_ID)?.name ?? VOICE_ID
console.log(`Using voice: ${voiceName} (${VOICE_ID})`)
console.log('To change, add ELEVENLABS_VOICE_ID=<id> to .env.local\n')

// ─── Sentences (mirrors lib/tools/data.ts) ────────────────────────────────

const SENTENCES = {
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
    "La pratique quotidienne vaut mieux qu'une longue session hebdomadaire.",
    "Le plus difficile c'est de commencer. Après ça devient plus facile.",
    'Elle regarda par la fenêtre et vit la pluie commencer à tomber.',
    "Il y a une grande différence entre savoir quelque chose et pouvoir l'expliquer.",
    "Il a passé trois ans dans une ville où personne ne parlait sa langue.",
    "Plus vous écoutez, plus il devient facile d'entendre les structures.",
    "Personne ne devient bilingue sans faire beaucoup d'erreurs embarrassantes d'abord.",
    'Le café était froid mais elle le but quand même et continua à lire.',
    "Apprendre une langue c'est apprendre une façon différente de voir le monde.",
    "Tu n'as pas besoin d'être parfait. Tu dois juste être compris.",
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

// ─── Generator ────────────────────────────────────────────────────────────

const outDir = resolve(root, 'public/audio/shadowing')
mkdirSync(outDir, { recursive: true })

async function generate(lang, text, index) {
  const file = resolve(outDir, `${lang}-${index}.mp3`)
  if (existsSync(file)) {
    console.log(`  skip  ${lang}-${index}.mp3 (already exists)`)
    return
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method:  'POST',
    headers: {
      'xi-api-key':   API_KEY,
      'Content-Type': 'application/json',
      'Accept':       'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability:        0.45,
        similarity_boost: 0.75,
        style:            0.0,
        use_speaker_boost: true,
      },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`  error ${lang}-${index}: ${res.status} ${body}`)
    return
  }

  writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  console.log(`  ✓     ${lang}-${index}.mp3`)

  // Stay well within rate limits
  await new Promise(r => setTimeout(r, 400))
}

// ─── Run ──────────────────────────────────────────────────────────────────

let total = 0
for (const sentences of Object.values(SENTENCES)) total += sentences.length
console.log(`Generating ${total} audio files with ElevenLabs (${VOICE_ID})\n`)

for (const [lang, sentences] of Object.entries(SENTENCES)) {
  console.log(`${lang.toUpperCase()} (${sentences.length} sentences)`)
  for (let i = 0; i < sentences.length; i++) {
    await generate(lang, sentences[i], i)
  }
}

console.log('\nDone. Commit public/audio/shadowing/ to avoid re-generating.')
