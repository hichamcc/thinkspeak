import type { ReactNode } from 'react'

export interface Post {
  slug:        string
  title:       string
  description: string
  date:        string
  content:     ReactNode
}

function CTA() {
  return (
    <div className="blog-cta">
      <p className="blog-cta-text">Put it into practice right now</p>
      <p className="blog-cta-sub">
        ThinkSpeak gives you a random topic, 30 seconds to think, and 60 seconds to speak.
        No account. No setup. Works in 5 languages.
      </p>
      <a href="/" className="blog-cta-btn">Start practicing →</a>
    </div>
  )
}

export const POSTS: Post[] = [
  {
    slug:        'record-yourself-speaking',
    title:       'Why Recording Yourself Speaking Is the Fastest Way to Improve',
    description: 'Most people never hear themselves speak. That\'s the single biggest thing holding them back. Here\'s why recording changes everything.',
    date:        '2026-04-10',
    content: (
      <>
        <p>Most people have never heard themselves speak. Not really. They talk every day, but they never sit down and listen back critically, the same way a musician listens to a recording, or an athlete watches game film.</p>
        <p>That gap is exactly what separates people who improve quickly from those who stay stuck for years.</p>

        <h2>The problem with practicing in your head</h2>
        <p>When you rehearse a speech or prepare an answer in your mind, your brain fills in all the gaps. The words sound fluent. The logic feels clear. The pace seems right.</p>
        <p>Then you speak out loud,and it's nothing like what you imagined. You stumble on transitions. You repeat the same phrase three times. You trail off before finishing your point.</p>
        <p>Your brain lied to you. It showed you the ideal version, not the real one.</p>

        <h2>What recording forces you to confront</h2>
        <p>When you record yourself and listen back, you notice things you never would otherwise:</p>
        <ul>
          <li>Filler words like "um", "uh", "like", "you know" that appear far more often than you thought</li>
          <li>A pace that's either too fast (nerves) or too slow (lack of fluency)</li>
          <li>Sentences that start confidently and collapse halfway through</li>
          <li>A tone that sounds flat, tentative, or monotone</li>
          <li>The same vocabulary repeated over and over</li>
        </ul>
        <p>None of this is visible from the inside. It only becomes clear when you hear it from the outside.</p>

        <h2>The feedback loop that actually works</h2>
        <p>Improvement in speaking follows a simple loop: speak, record, listen, adjust, repeat. The record-and-listen step is the one most people skip, which is exactly why most people don't improve as fast as they could.</p>
        <p>You don't need a coach. You don't need a speaking partner. You just need the discipline to listen back with honest ears,and the willingness to do it again.</p>

        <h2>How to listen critically without being harsh on yourself</h2>
        <p>When you listen back, resist the urge to cringe and stop. Instead, treat it like a curious observer. Ask specific questions:</p>
        <ul>
          <li>Was my main point clear in the first 15 seconds?</li>
          <li>Did I use any filler words? How many?</li>
          <li>Did I finish my sentences?</li>
          <li>Did I sound like I believed what I was saying?</li>
        </ul>
        <p>Pick one thing to fix per session. Not five. One. Then record again and see if it improved.</p>

        <CTA />
      </>
    ),
  },

  {
    slug:        'how-to-practice-speaking-alone',
    title:       'How to Practice Speaking a Language Without a Partner',
    description: 'You don\'t need someone to talk to in order to build speaking fluency. Here\'s how to practice alone,and why it works.',
    date:        '2026-04-08',
    content: (
      <>
        <p>The most common reason people give for not practicing speaking is "I don't have anyone to practice with." It sounds reasonable. But it's mostly an excuse,and a costly one.</p>
        <p>Solo speaking practice is not only possible, it has unique advantages that partner practice doesn't.</p>

        <h2>Why solo practice works</h2>
        <p>When you practice with a partner, a lot of your mental energy goes toward the social dynamic,not wanting to look stupid, filling silence quickly, following the other person's lead. That pressure can actually slow down fluency development.</p>
        <p>Solo practice removes all of that. You can pause, restart, go slower, try a word three different ways. There's no one to impress. The only feedback is from yourself.</p>

        <h2>Technique 1: The self-monologue</h2>
        <p>Pick any topic,something you did today, an opinion you have, a memory,and speak about it for 60 seconds without stopping. Don't write anything down first. Just talk.</p>
        <p>The goal isn't to be eloquent. The goal is to keep the words flowing, even when it's uncomfortable. That discomfort is where fluency is built.</p>

        <h2>Technique 2: Think first, then speak</h2>
        <p>Give yourself a topic and 30 seconds of silence to organize your thoughts. Then speak for 60 seconds.</p>
        <p>This mirrors real conversations more accurately than free-form rambling,in real life, you usually have a few seconds to formulate before responding. Training that transition from thought to speech is one of the highest-leverage things you can practice.</p>

        <h2>Technique 3: Record and review</h2>
        <p>Record every session. Even just audio. Then listen back and note one specific thing to improve next time,a filler word, a grammatical pattern, vocabulary you reached for but didn't have.</p>
        <p>Over time, this builds a precise picture of exactly where your speaking breaks down,something even a patient conversation partner rarely gives you.</p>

        <h2>Consistency beats intensity</h2>
        <p>Ten minutes every day beats two hours once a week. Speaking fluency is a motor skill as much as a cognitive one,it needs regular repetition to become automatic. Short, daily sessions do far more than occasional deep dives.</p>

        <CTA />
      </>
    ),
  },

  {
    slug:        'how-to-stop-saying-um',
    title:       'How to Stop Saying "Um" and "Uh" When You Speak',
    description: 'Filler words are a habit, not a flaw. Here\'s how to break the habit,without sounding robotic.',
    date:        '2026-04-06',
    content: (
      <>
        <p>"Um", "uh", "like", "you know", "basically", "literally",filler words are universal. Every language has them. Every speaker uses them. The question isn't how to eliminate them entirely, but how to use them less,and replace them with something more intentional.</p>

        <h2>Why filler words happen</h2>
        <p>Filler words are a coping mechanism for the gap between thought and speech. Your brain is searching for the next word, the next idea, the right phrasing,and your mouth, trained to keep making sound, fills the gap with noise.</p>
        <p>They're not a sign of low intelligence. They're a sign that you're thinking in real time, which is actually what good speakers do. The goal is to replace that noise with something better: silence.</p>

        <h2>The pause is more powerful than the filler</h2>
        <p>A deliberate pause feels awkward to the speaker and authoritative to the listener. When you stop and think before answering, the audience reads it as confidence,as someone who chooses their words carefully rather than rushing to fill space.</p>
        <p>Most speakers have it backwards. They fear silence and reach for fillers to avoid it. Skilled speakers embrace silence and use it to signal that what comes next matters.</p>

        <h2>Step 1: Hear yourself first</h2>
        <p>Before you can fix filler words, you have to notice them. Most people have no idea how often they say "um",until they hear a recording of themselves. That moment of recognition is uncomfortable but essential.</p>
        <p>Record a 60-second response to any topic and listen back. Count the fillers. Just counting them,without trying to change anything,starts to build awareness.</p>

        <h2>Step 2: Slow down</h2>
        <p>Filler words increase when you speak too fast. Slowing your pace gives your brain time to find the next word before your mouth needs it. Most speakers who eliminate fillers don't actually talk faster,they talk slower, but more deliberately.</p>

        <h2>Step 3: Practice under low stakes</h2>
        <p>You can't fix filler words in high-stakes situations,a job interview, a presentation,without first fixing them in low-stakes ones. Daily solo practice, with recording, is where the habit actually changes. By the time you're in front of an audience, the new pattern needs to already be automatic.</p>

        <CTA />
      </>
    ),
  },

  {
    slug:        'the-30-60-speaking-method',
    title:       'The 30-60 Method: A Simple Framework for Daily Speaking Practice',
    description: 'Thirty seconds to think. Sixty seconds to speak. Here\'s why this simple constraint is one of the most effective ways to build fluency.',
    date:        '2026-04-04',
    content: (
      <>
        <p>Most speaking practice advice is vague: "talk more", "find a partner", "watch TV in the language". These suggestions aren't wrong, but they're not structured enough to produce consistent improvement. Structure matters,especially for solo practice.</p>
        <p>The 30-60 method is simple: given any topic, take 30 seconds to think, then speak continuously for 60 seconds. That's one rep. Do a few reps a day.</p>

        <h2>Why 30 seconds to think?</h2>
        <p>Thirty seconds is short enough that you can't write a script,you can only sketch an idea. This forces you to think in the language rather than translate from another one, which is exactly the cognitive pattern you want to build.</p>
        <p>It also mirrors real conversation. When someone asks you a question in a meeting or interview, you have a few seconds to organize your response,not minutes. Practicing that short thinking window trains your brain to retrieve and organize language quickly.</p>

        <h2>Why 60 seconds to speak?</h2>
        <p>Sixty seconds is long enough to require structure,you need an opening, a development, and a close,but short enough that you can do many reps in a single session. It's the sweet spot between too easy (20 seconds) and too demanding (5 minutes).</p>
        <p>At 60 seconds, you're forced to keep going even when you run out of obvious things to say. That moment of reaching,searching for the next thought, the next word,is where real fluency is built.</p>

        <h2>What to do with the recording</h2>
        <p>After each rep, listen back and ask one question: did I make a clear point? Not "was it perfect",just "was there a point?" Over time, raise the bar: was the structure clear? Was the vocabulary precise? Did I sound like I meant it?</p>

        <h2>How often to practice</h2>
        <p>Three to five reps per day is enough. That's roughly 10 minutes. The consistency matters more than the volume,daily practice of 10 minutes builds fluency faster than a two-hour session once a week.</p>
        <p>The speakers who improve most quickly aren't the ones who practice the longest. They're the ones who practice the most consistently, and who actually listen back to what they recorded.</p>

        <CTA />
      </>
    ),
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
