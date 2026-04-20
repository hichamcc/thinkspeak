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

  {
    slug:        'why-you-sound-different-in-recordings',
    title:       'Why You Sound Different in Recordings (And Why That Is a Good Thing)',
    description: 'Everyone hates hearing their own voice on a recording. There is a real reason for that, and once you understand it, recordings become a tool instead of a punishment.',
    date:        '2026-04-18',
    content: (
      <>
        <p>The first time most people hear a recording of themselves, the reaction is the same: that does not sound like me. The voice is too high, too nasal, too flat, too something. It feels wrong.</p>
        <p>It is not wrong. It is just unfamiliar. And there is a precise reason for the gap.</p>

        <h2>What you hear vs what everyone else hears</h2>
        <p>When you speak, you hear yourself through two paths at once. Sound travels through the air and into your ears like normal. But it also travels through the bones of your skull directly to your inner ear, and bone conduction makes low frequencies sound richer and fuller. So the voice you are used to is boosted, warmer, deeper than what actually comes out of your mouth.</p>
        <p>A recording captures only what came through the air. That is what other people have always heard. When you cringe at a recording, you are not hearing something bad. You are hearing the truth.</p>

        <h2>Why this matters for speaking practice</h2>
        <p>Most speaking mistakes are invisible from the inside. You cannot feel filler words happening. You cannot sense when your pace is off. You cannot hear your own monotone. Your internal experience of speaking is always more polished than the reality, because your brain is filling in gaps and interpreting charitably.</p>
        <p>The recording does not interpret. It just captures. That is exactly what makes it useful.</p>

        <h2>Getting past the discomfort</h2>
        <p>The discomfort of hearing your own voice is a calibration problem. Your brain expects the richer, bone-conducted version, and gets something different. That gap closes with exposure. People who record themselves regularly stop cringing within a few weeks. The voice becomes familiar, and familiar means workable.</p>
        <p>The speakers who improve fastest are not the ones with the best natural voice. They are the ones willing to listen back without flinching.</p>

        <h2>One thing to listen for each time</h2>
        <p>Do not try to fix everything at once. Pick one thing per session. Filler words one week. Sentence endings another. Pace after that. Small, specific targets move faster than vague improvement goals.</p>

        <CTA />
      </>
    ),
  },

  {
    slug:        'thinking-in-a-second-language',
    title:       'The Difference Between Knowing a Language and Being Able to Speak It',
    description: 'You can pass a grammar test and still freeze when someone asks you a question. Knowing a language and speaking it fluently are two different skills.',
    date:        '2026-04-16',
    content: (
      <>
        <p>Language learners hit a wall that no textbook prepares them for. They know the vocabulary. They understand the grammar. They can read articles, follow conversations, write decent sentences. Then someone asks them something in real time and the words stop coming.</p>
        <p>This is not a knowledge problem. It is a retrieval problem.</p>

        <h2>Recognition vs production</h2>
        <p>Reading and listening are recognition tasks. You are given the word and your brain confirms it. Speaking is a production task. You have to generate the word from scratch, under time pressure, while simultaneously tracking the conversation, managing tone, and thinking about what comes next.</p>
        <p>These are different cognitive operations. Training one does not automatically train the other. You can build a large passive vocabulary and still struggle to produce simple sentences under pressure, because you have never practiced the production side.</p>

        <h2>Why classrooms underprepare you</h2>
        <p>Most language instruction optimizes for recognition. You read texts, translate sentences, pass multiple choice tests. Speaking exercises, when they happen, are usually scripted, low stakes, and forgiving of long pauses.</p>
        <p>Real conversation has none of that. The other person is waiting. The clock is running. Your brain has to retrieve words fast enough to keep up, which is a skill that only gets built by practicing under that kind of pressure.</p>

        <h2>The rehearsal trap</h2>
        <p>A common workaround is rehearsing set phrases. You memorize how to introduce yourself, how to order food, how to ask for directions. This works until someone replies in an unexpected way, and the script runs out.</p>
        <p>Fluency is not having the right phrases memorized. It is being able to construct new sentences in real time from the words you know. That construction process only gets faster by doing it repeatedly, without a script, under mild pressure.</p>

        <h2>What actually builds speaking fluency</h2>
        <p>Speaking. Specifically, speaking without preparation, on topics you did not anticipate, without being able to stop and look things up. The discomfort of that process is the adaptation. Your brain learns to retrieve faster, to construct sentences with incomplete information, to keep going when the exact word is not there.</p>
        <p>Five minutes of that kind of practice beats an hour of vocabulary study for spoken fluency.</p>

        <CTA />
      </>
    ),
  },

  {
    slug:        'the-pause-is-not-the-problem',
    title:       'The Pause Is Not the Problem',
    description: 'Most speakers are terrified of silence. They fill every gap with filler words and rushed sentences. But silence in speech is not weakness, it is control.',
    date:        '2026-04-14',
    content: (
      <>
        <p>Watch recordings of people who are considered excellent speakers. Politicians, professors, comedians, interviewers. One thing stands out once you notice it: they pause. Sometimes for a full second or two. Sometimes in the middle of a sentence.</p>
        <p>They do not seem to be struggling. They seem to be thinking. And that is exactly right.</p>

        <h2>What filler words actually signal</h2>
        <p>When you say "um" or "uh" or "like", you are not just making noise. You are signaling to the listener: I am still talking, do not interrupt me. The filler holds the floor while your brain catches up to your mouth.</p>
        <p>The problem is that after a while, listeners stop hearing the content and start noticing the fillers. Heavy filler use reads as uncertainty, as someone who does not quite believe what they are saying. Even if the content is strong, the delivery undermines it.</p>

        <h2>Silence reads differently than you think</h2>
        <p>From the inside, a pause feels like failure. You stopped. Something went wrong. The listener is waiting. That anxiety is almost universal.</p>
        <p>From the outside, a pause reads completely differently. It looks like someone choosing their words. Someone confident enough not to babble. Someone who thinks before speaking instead of speaking while thinking.</p>
        <p>The gap between how a pause feels and how a pause lands is one of the most useful things to understand about speaking.</p>

        <h2>How to practice tolerating silence</h2>
        <p>Record yourself answering a question. When you notice a filler word in the playback, go back and do the same question again. This time, when you feel the urge to say "um", say nothing instead. Just wait. Let the silence sit for a beat, then continue.</p>
        <p>It will feel strange. The recording will sound fine. Do it enough times and the filler habit starts to break, not because you suppressed it, but because your brain learned that the silence is survivable.</p>

        <h2>The one thing to fix first</h2>
        <p>Do not try to eliminate all fillers at once. Pick one. "Um" is usually the most frequent. Spend two weeks specifically noticing that one word in your recordings. Awareness comes before reduction. You cannot change what you cannot hear.</p>

        <CTA />
      </>
    ),
  },

  {
    slug:        'how-to-tell-a-better-story',
    title:       'How to Tell a Better Story When Speaking',
    description: 'Most spoken stories fail for the same reason: no shape. Here is a simple structure that works for any topic, in any language.',
    date:        '2026-04-12',
    content: (
      <>
        <p>Most people tell stories the same way. They start at the beginning, add everything they remember in order, and stop when they run out of things to say. The listener is left waiting for a point that never quite arrives.</p>
        <p>Good storytelling is not about having interesting experiences. It is about shape.</p>

        <h2>The problem with chronological order</h2>
        <p>Chronological telling puts the listener in the same position you were in before you knew how the story ended. They do not know what to pay attention to. They do not know whether the detail you just gave matters. They are waiting for context that only arrives at the end.</p>
        <p>Good stories work backwards from the point. You know where you are going, so you only include details that serve that destination. Everything else gets cut.</p>

        <h2>A shape that works every time</h2>
        <p>Before you start speaking, answer three questions in your head: What happened? Why does it matter? What does the listener take away?</p>
        <p>Then structure your story around those answers. Open with something that signals what kind of story this is. Build to the central moment. Land on what it meant. That is it. It does not need to be more complex than that.</p>

        <h2>The opening sentence is almost everything</h2>
        <p>Most stories bury the interesting part. The first thirty seconds are setup, context, background. By the time something actually happens, the listener has half-checked out.</p>
        <p>Try starting with the most specific, concrete detail from the whole story. Not "I want to tell you about a trip I took last year" but "I was on the side of a road in Morocco at 2am with a dead phone." Now the listener is in. Now you can go back and explain how you got there.</p>

        <h2>Specificity does more than description</h2>
        <p>Generic details slide off. Specific ones stick. "I was nervous" is nothing. "My voice came out half a pitch higher than normal" is something. The specific version shows the listener rather than telling them, and showing lands harder in spoken storytelling than in writing.</p>
        <p>When you practice telling a story out loud and listen back, the spots that feel thin are almost always where you went generic. Replace one generic phrase per recording with something specific. The story gets better immediately.</p>

        <CTA />
      </>
    ),
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
