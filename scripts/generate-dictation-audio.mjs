/**
 * Generates MP3 files for all dictation sentences via ElevenLabs.
 * Run once: node scripts/generate-dictation-audio.mjs
 * Requires: ELEVENLABS_API_KEY in .env.local
 *
 * Output: public/audio/dictation/{lang}-{index}.mp3
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')

const envPath = resolve(root, '.env.local')
const env     = existsSync(envPath)
  ? Object.fromEntries(
      readFileSync(envPath, 'utf8')
        .split('\n')
        .filter(l => l.includes('='))
        .map(l => l.split('=').map(s => s.trim()))
    )
  : {}

const API_KEY           = process.env.ELEVENLABS_API_KEY  ?? env.ELEVENLABS_API_KEY
const VOICE_ID_OVERRIDE = process.env.ELEVENLABS_VOICE_ID ?? env.ELEVENLABS_VOICE_ID

if (!API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY — add it to .env.local')
  process.exit(1)
}

const PREMADE_VOICES = [
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam'   },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella'  },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi'   },
  { id: 'MF3mGyEYCl7XYWbV9V9of', name: 'Elli'  },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh'   },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam'    },
]

let VOICE_ID = VOICE_ID_OVERRIDE
if (!VOICE_ID) {
  const res = await fetch('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': API_KEY } })
  if (res.ok) {
    const voices = (await res.json()).voices ?? []
    VOICE_ID = voices[0]?.voice_id ?? PREMADE_VOICES[0].id
    console.log('Account voices:', voices.map(v => `${v.name} (${v.voice_id})`).join(', '))
  } else {
    VOICE_ID = PREMADE_VOICES[0].id
    console.log('Using premade voice fallback.')
  }
}

const voiceName = PREMADE_VOICES.find(v => v.id === VOICE_ID)?.name ?? VOICE_ID
console.log(`Voice: ${voiceName} (${VOICE_ID})\n`)

// ─── Sentences (mirrors lib/tools/data.ts) ────────────────────────────────

const SENTENCES = {
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
    "Elle ouvrit la porte lentement et regarda à l'intérieur.",
    "Il décida d'apprendre le français après avoir visité Paris pour la première fois.",
    "La bibliothèque ferme à neuf heures en semaine et à cinq heures le week-end.",
    "Parler couramment une deuxième langue demande du temps et de la patience.",
    "Ils marchèrent le long de la rivière jusqu'au coucher du soleil.",
    "Il pleuvait quand ils arrivèrent à l'aéroport.",
    "La réunion a été annulée parce que trois personnes étaient malades.",
    "Elle lit trente minutes chaque matin avant le travail.",
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

// ─── Generator ────────────────────────────────────────────────────────────

const outDir = resolve(root, 'public/audio/dictation')
mkdirSync(outDir, { recursive: true })

async function generate(lang, text, index) {
  const file = resolve(outDir, `${lang}-${index}.mp3`)
  if (existsSync(file)) {
    console.log(`  skip  ${lang}-${index}.mp3`)
    return
  }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method:  'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  })
  if (!res.ok) { console.error(`  error ${lang}-${index}: ${res.status} ${await res.text()}`); return }
  writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  console.log(`  ✓     ${lang}-${index}.mp3`)
  await new Promise(r => setTimeout(r, 400))
}

let total = 0
for (const s of Object.values(SENTENCES)) total += s.length
console.log(`Generating ${total} audio files...\n`)

for (const [lang, sentences] of Object.entries(SENTENCES)) {
  console.log(`${lang.toUpperCase()} (${sentences.length})`)
  for (let i = 0; i < sentences.length; i++) await generate(lang, sentences[i], i)
}

console.log('\nDone. Commit public/audio/dictation/ to skip regeneration.')
