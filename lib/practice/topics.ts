import type { Category, Topic, Language } from './types'

const EN: Topic[] = [
  // Daily life
  { id: 'en-d1',  category: 'daily',    text: 'Your morning routine' },
  { id: 'en-d2',  category: 'daily',    text: 'How you spend your evenings' },
  { id: 'en-d3',  category: 'daily',    text: 'Your daily commute' },
  { id: 'en-d4',  category: 'daily',    text: 'Cooking a meal you love' },
  { id: 'en-d5',  category: 'daily',    text: 'A typical weekend' },
  { id: 'en-d6',  category: 'daily',    text: 'How you stay organized' },
  { id: 'en-d7',  category: 'daily',    text: 'Your sleep habits' },
  { id: 'en-d8',  category: 'daily',    text: 'Shopping for groceries' },
  // Opinion
  { id: 'en-o1',  category: 'opinion',  text: 'The best invention of the last 20 years' },
  { id: 'en-o2',  category: 'opinion',  text: 'Social media — good or bad?' },
  { id: 'en-o3',  category: 'opinion',  text: 'Remote work vs. office work' },
  { id: 'en-o4',  category: 'opinion',  text: 'Should everyone learn to code?' },
  { id: 'en-o5',  category: 'opinion',  text: 'Money vs. happiness' },
  { id: 'en-o6',  category: 'opinion',  text: 'Is it better to live in a city or the countryside?' },
  { id: 'en-o7',  category: 'opinion',  text: 'The importance of hobbies' },
  { id: 'en-o8',  category: 'opinion',  text: 'Should schools teach financial literacy?' },
  // Story
  { id: 'en-s1',  category: 'story',    text: 'A mistake that taught you something' },
  { id: 'en-s2',  category: 'story',    text: 'A trip that changed you' },
  { id: 'en-s3',  category: 'story',    text: 'The best decision you ever made' },
  { id: 'en-s4',  category: 'story',    text: 'A time you were really nervous' },
  { id: 'en-s5',  category: 'story',    text: 'Something you learned the hard way' },
  { id: 'en-s6',  category: 'story',    text: 'A moment you felt proud of yourself' },
  { id: 'en-s7',  category: 'story',    text: 'A childhood memory' },
  { id: 'en-s8',  category: 'story',    text: 'A time you helped someone' },
  // Describe
  { id: 'en-desc1', category: 'describe', text: 'Your ideal home' },
  { id: 'en-desc2', category: 'describe', text: 'Your city or neighborhood' },
  { id: 'en-desc3', category: 'describe', text: 'Your workspace' },
  { id: 'en-desc4', category: 'describe', text: 'Someone who inspires you' },
  { id: 'en-desc5', category: 'describe', text: 'Your favorite place in the world' },
  { id: 'en-desc6', category: 'describe', text: 'A book or film that stayed with you' },
  { id: 'en-desc7', category: 'describe', text: 'Your dream job' },
  { id: 'en-desc8', category: 'describe', text: 'A skill you want to develop' },
  // Abstract
  { id: 'en-a1',  category: 'abstract', text: 'What does success mean to you?' },
  { id: 'en-a2',  category: 'abstract', text: 'What makes a good friend?' },
  { id: 'en-a3',  category: 'abstract', text: 'What is courage?' },
  { id: 'en-a4',  category: 'abstract', text: 'What does home mean to you?' },
  { id: 'en-a5',  category: 'abstract', text: 'What would you do with unlimited time?' },
  { id: 'en-a6',  category: 'abstract', text: 'What is the hardest thing about being human?' },
  { id: 'en-a7',  category: 'abstract', text: 'What does creativity mean to you?' },
  { id: 'en-a8',  category: 'abstract', text: 'If you could change one thing about society' },
  // Word
  { id: 'en-w1',  category: 'word', text: 'Freedom' },
  { id: 'en-w2',  category: 'word', text: 'Time' },
  { id: 'en-w3',  category: 'word', text: 'Trust' },
  { id: 'en-w4',  category: 'word', text: 'Change' },
  { id: 'en-w5',  category: 'word', text: 'Silence' },
  { id: 'en-w6',  category: 'word', text: 'Fear' },
  { id: 'en-w7',  category: 'word', text: 'Ambition' },
  { id: 'en-w8',  category: 'word', text: 'Beauty' },
  { id: 'en-w9',  category: 'word', text: 'Work' },
  { id: 'en-w10', category: 'word', text: 'Memory' },
  { id: 'en-w11', category: 'word', text: 'Risk' },
  { id: 'en-w12', category: 'word', text: 'Comfort' },
  { id: 'en-w13', category: 'word', text: 'Patience' },
  { id: 'en-w14', category: 'word', text: 'Happiness' },
  { id: 'en-w15', category: 'word', text: 'Failure' },
  { id: 'en-w16', category: 'word', text: 'Nature' },
  { id: 'en-w17', category: 'word', text: 'Routine' },
  { id: 'en-w18', category: 'word', text: 'Loneliness' },
  { id: 'en-w19', category: 'word', text: 'Loyalty' },
  { id: 'en-w20', category: 'word', text: 'Power' },
]

const FR: Topic[] = [
  // Vie quotidienne
  { id: 'fr-d1',  category: 'daily',    text: 'Ta routine du matin' },
  { id: 'fr-d2',  category: 'daily',    text: 'Comment tu passes tes soirées' },
  { id: 'fr-d3',  category: 'daily',    text: 'Ton trajet quotidien' },
  { id: 'fr-d4',  category: 'daily',    text: 'Préparer un plat que tu aimes' },
  { id: 'fr-d5',  category: 'daily',    text: 'Un week-end typique' },
  { id: 'fr-d6',  category: 'daily',    text: 'Comment tu restes organisé(e)' },
  { id: 'fr-d7',  category: 'daily',    text: 'Tes habitudes de sommeil' },
  { id: 'fr-d8',  category: 'daily',    text: 'Faire les courses' },
  // Opinion
  { id: 'fr-o1',  category: 'opinion',  text: 'La meilleure invention des 20 dernières années' },
  { id: 'fr-o2',  category: 'opinion',  text: 'Les réseaux sociaux — bien ou mal ?' },
  { id: 'fr-o3',  category: 'opinion',  text: 'Télétravail ou bureau ?' },
  { id: 'fr-o4',  category: 'opinion',  text: 'Est-ce que tout le monde devrait apprendre à coder ?' },
  { id: 'fr-o5',  category: 'opinion',  text: 'L\'argent ou le bonheur ?' },
  { id: 'fr-o6',  category: 'opinion',  text: 'Mieux vivre en ville ou à la campagne ?' },
  { id: 'fr-o7',  category: 'opinion',  text: 'L\'importance des loisirs' },
  { id: 'fr-o8',  category: 'opinion',  text: 'L\'école devrait-elle enseigner la gestion financière ?' },
  // Histoire
  { id: 'fr-s1',  category: 'story',    text: 'Une erreur qui t\'a appris quelque chose' },
  { id: 'fr-s2',  category: 'story',    text: 'Un voyage qui t\'a changé(e)' },
  { id: 'fr-s3',  category: 'story',    text: 'La meilleure décision que tu aies prise' },
  { id: 'fr-s4',  category: 'story',    text: 'Un moment où tu étais vraiment stressé(e)' },
  { id: 'fr-s5',  category: 'story',    text: 'Quelque chose que tu as appris à la dure' },
  { id: 'fr-s6',  category: 'story',    text: 'Un moment de fierté' },
  { id: 'fr-s7',  category: 'story',    text: 'Un souvenir d\'enfance' },
  { id: 'fr-s8',  category: 'story',    text: 'Une fois où tu as aidé quelqu\'un' },
  // Décrire
  { id: 'fr-desc1', category: 'describe', text: 'Ta maison idéale' },
  { id: 'fr-desc2', category: 'describe', text: 'Ta ville ou ton quartier' },
  { id: 'fr-desc3', category: 'describe', text: 'Ton espace de travail' },
  { id: 'fr-desc4', category: 'describe', text: 'Quelqu\'un qui t\'inspire' },
  { id: 'fr-desc5', category: 'describe', text: 'Ton endroit préféré dans le monde' },
  { id: 'fr-desc6', category: 'describe', text: 'Un livre ou film qui t\'a marqué(e)' },
  { id: 'fr-desc7', category: 'describe', text: 'Ton travail idéal' },
  { id: 'fr-desc8', category: 'describe', text: 'Une compétence que tu veux développer' },
  // Abstrait
  { id: 'fr-a1',  category: 'abstract', text: 'Que signifie le succès pour toi ?' },
  { id: 'fr-a2',  category: 'abstract', text: 'Qu\'est-ce qui fait un bon ami ?' },
  { id: 'fr-a3',  category: 'abstract', text: 'C\'est quoi le courage ?' },
  { id: 'fr-a4',  category: 'abstract', text: 'Que représente le mot "chez soi" pour toi ?' },
  { id: 'fr-a5',  category: 'abstract', text: 'Que ferais-tu avec un temps illimité ?' },
  { id: 'fr-a6',  category: 'abstract', text: 'Quelle est la chose la plus difficile dans le fait d\'être humain ?' },
  { id: 'fr-a7',  category: 'abstract', text: 'Que représente la créativité pour toi ?' },
  { id: 'fr-a8',  category: 'abstract', text: 'Si tu pouvais changer une chose dans la société' },
  // Mot
  { id: 'fr-w1',  category: 'word', text: 'Liberté' },
  { id: 'fr-w2',  category: 'word', text: 'Temps' },
  { id: 'fr-w3',  category: 'word', text: 'Confiance' },
  { id: 'fr-w4',  category: 'word', text: 'Changement' },
  { id: 'fr-w5',  category: 'word', text: 'Silence' },
  { id: 'fr-w6',  category: 'word', text: 'Peur' },
  { id: 'fr-w7',  category: 'word', text: 'Ambition' },
  { id: 'fr-w8',  category: 'word', text: 'Beauté' },
  { id: 'fr-w9',  category: 'word', text: 'Travail' },
  { id: 'fr-w10', category: 'word', text: 'Mémoire' },
  { id: 'fr-w11', category: 'word', text: 'Risque' },
  { id: 'fr-w12', category: 'word', text: 'Confort' },
  { id: 'fr-w13', category: 'word', text: 'Patience' },
  { id: 'fr-w14', category: 'word', text: 'Bonheur' },
  { id: 'fr-w15', category: 'word', text: 'Échec' },
  { id: 'fr-w16', category: 'word', text: 'Nature' },
  { id: 'fr-w17', category: 'word', text: 'Routine' },
  { id: 'fr-w18', category: 'word', text: 'Solitude' },
  { id: 'fr-w19', category: 'word', text: 'Loyauté' },
  { id: 'fr-w20', category: 'word', text: 'Pouvoir' },
]

export const TOPICS: Record<Language, Topic[]> = { en: EN, fr: FR }

export const CATEGORY_LABELS: Record<string, Record<Language, string>> = {
  daily:    { en: 'Daily Life',  fr: 'Vie quotidienne' },
  opinion:  { en: 'Opinion',    fr: 'Opinion' },
  story:    { en: 'Story',      fr: 'Histoire' },
  describe: { en: 'Describe',   fr: 'Décrire' },
  abstract: { en: 'Abstract',   fr: 'Abstrait' },
  word:     { en: 'Word',       fr: 'Mot' },
}

export const CATEGORY_HINTS: Record<Category, Record<Language, string[]>> = {
  daily: {
    en: ['describe your typical routine', 'what do you enjoy or dislike about it?', 'has it changed recently?'],
    fr: ['décris ta routine habituelle', 'qu\'est-ce que tu aimes ou pas ?', 'est-ce que ça a changé récemment ?'],
  },
  opinion: {
    en: ['state your main position clearly', 'give one or two reasons why', 'acknowledge a counterargument'],
    fr: ['énonce clairement ta position', 'donne une ou deux raisons', 'reconnais un contre-argument'],
  },
  story: {
    en: ['set the scene — when, where, who', 'what happened step by step', 'what did you take away from it?'],
    fr: ['campe le décor — quand, où, qui', 'raconte ce qui s\'est passé', 'qu\'est-ce que ça t\'a appris ?'],
  },
  describe: {
    en: ['paint a picture with specific details', 'how does it make you feel?', 'why is it meaningful to you?'],
    fr: ['donne des détails précis', 'qu\'est-ce que ça t\'évoque ?', 'pourquoi c\'est important pour toi ?'],
  },
  abstract: {
    en: ['define it in your own words', 'give a concrete example from your life', 'why does it matter to you?'],
    fr: ['définis-le avec tes propres mots', 'donne un exemple concret de ta vie', 'pourquoi est-ce important ?'],
  },
  word: {
    en: ['what does this word mean to you personally?', 'share a memory or moment linked to it', 'is it positive, negative, or both?'],
    fr: ['que représente ce mot pour toi ?', 'un souvenir ou moment lié à ce mot', 'positif, négatif, ou les deux ?'],
  },
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function createTopicQueue(lang: Language): Topic[] {
  return shuffle(TOPICS[lang])
}
