export const TOTAL = 11306;
const SPAN = 1028;
const LAST_SPAN = 1027;

export type Chamber = {
  id: string;
  numeral: string;
  title: string;
  thesis: string;
  essay: string;
  practice: string;
  image: string;
};

export const CHAMBERS: Chamber[] = [
  {
    id: "fracture",
    numeral: "I",
    title: "The Fracture",
    thesis: "Harm begins as a refusal to be seen.",
    essay:
      "In a family, evil rarely arrives as a monster. It arrives as a turned shoulder, a meal eaten alone, a truth filed where no one can reach it. The old writings agree on the diagnosis and disagree on the costume: separation, ignorance, the hardened heart, the self that will not yield. This movement does not decorate the wound. It holds the wound in the light long enough for it to receive its true name.",
    practice: "Name the separation before you call it peace.",
    image: "/chambers/fracture.jpg",
  },
  {
    id: "mirror",
    numeral: "II",
    title: "The Mirror",
    thesis: "The turn begins when harm meets its own face.",
    essay:
      "Not humiliation — recognition. The one who injured is asked to stay in the room with what they did, until the preferred story loses its glamour. The traditions call this repentance, teshuvah, tawba, metanoia: the return. A mirror is not a weapon. It is the first mercy, because a person who can see themselves can still be changed. Evil that cannot bear its own reflection has already begun to lose.",
    practice: "Stay with what you did until the excuse loses its beauty.",
    image: "/chambers/mirror.jpg",
  },
  {
    id: "ledger",
    numeral: "III",
    title: "The Ledger",
    thesis: "Accountability is love with a spine.",
    essay:
      "Names, dates, what was taken, what must be restored. A household that skips this chapter calls peace what is only silence. Ancient law and modern repair agree: confession without repair is theater. The ledger is not kept to imprison a person forever. It is kept so the injured are not asked to forget in order to belong. What is written can be answered. What is denied becomes an heirloom.",
    practice: "Write the harm in specifics, then write the repair beside it.",
    image: "/chambers/ledger.jpg",
  },
  {
    id: "listening",
    numeral: "IV",
    title: "The Listening",
    thesis: "Another person's inner life is real.",
    essay:
      "Communication is not the clever sentence. It is the decision to let someone else's meaning arrive intact. The Analects praise the person slow to speak. The desert elders made speech expensive so it would be true. A family becomes possible at the moment someone says “I heard you,” and the speaker recognizes their own words coming back, neither improved nor used against them.",
    practice: "Repeat their meaning until they recognize it as theirs.",
    image: "/chambers/listening.jpg",
  },
  {
    id: "table",
    numeral: "V",
    title: "The Table",
    thesis: "Trust is rebuilt in ordinary hunger.",
    essay:
      "Bread, rice, injera, a shared pot — the oldest altar is a table with enough seats. Trust is not a mood. It is repeated evidence that you will be fed and not mocked for needing food. Children learn the moral world by watching who is allowed to sit down, and whether the powerful serve or are served. A house that eats together has already voted against exile.",
    practice: "Make a seat before you make a speech.",
    image: "/chambers/table.jpg",
  },
  {
    id: "vow",
    numeral: "VI",
    title: "The Vow",
    thesis: "A promise is a bank that lets the river arrive.",
    essay:
      "Marriage, in the oldest sense worth keeping, is not ownership and not a performance. It is two freedoms choosing a common life on the days when feeling has gone quiet. The vow limits the self on purpose, the way a bank limits water so it can reach a field. Without the bank there is only flood, which feels like power and is only ruin. The thread is held. It is not a chain.",
    practice: "Choose the common life again on a day when feeling is quiet.",
    image: "/chambers/vow.jpg",
  },
  {
    id: "child",
    numeral: "VII",
    title: "The Child",
    thesis: "Parenthood is the art of becoming unnecessary with dignity.",
    essay:
      "Protection first, then truth, then the courage to let a separate person leave the house carrying your best and not your fear. The traditions warn against devouring the child — as sacrifice, as ornament, or as a second chance at one's own unfinished life. A good parent is a door, not a mirror demanding to be admired. What the child watches you do with your own failure becomes their definition of love.",
    practice: "Protect the child from your unfinished life.",
    image: "/chambers/child.jpg",
  },
  {
    id: "forgiveness",
    numeral: "VIII",
    title: "The Forgiveness",
    thesis: "Mercy without truth is sentiment. Truth without mercy never adjourns.",
    essay:
      "Forgiveness is not the announcement that harm was small. It is the refusal to let harm become the family's only ancestor. Some things are not reconciled in one evening. The work, then, is to stop transmitting them. A house needs both truth and mercy, or the children inherit a lawsuit dressed as loyalty. Nobody is asked to hurry. Nobody is allowed to feed the wound as if it were an heir.",
    practice: "Do not hurry the wounded, and do not feed the wound as an heir.",
    image: "/chambers/forgiveness.jpg",
  },
  {
    id: "return",
    numeral: "IX",
    title: "The Return",
    thesis: "Welcome is a moral skill. So is an honest memory of the road.",
    essay:
      "Every scripture keeps a story of someone who left and someone who watched for them. The one who returns must not be made to crawl so the one who stayed can feel tall. The one who stayed must not be told their years were nothing. A door can be open and the story still true. Return is not erasure. It is the decision that the house is larger than the absence.",
    practice: "Open the door without erasing the road.",
    image: "/chambers/return.jpg",
  },
  {
    id: "hearth",
    numeral: "X",
    title: "The Hearth",
    thesis: "Harmony is not the absence of anger. It is a way back before night.",
    essay:
      "Rituals do this work when speeches fail: the lamp, the Friday table, the Sunday walk, the call to a grandparent, the apology said in the same room as the injury. Resilience is repetition. Love is the decision that the repetition is worth it. A harmonious family still has sharp days. What it does not have is a night with no path back to one another. The hearth is a practice, not a mood.",
    practice: "Give anger a way back before night.",
    image: "/chambers/hearth.jpg",
  },
  {
    id: "bequest",
    numeral: "XI",
    title: "The Bequest",
    thesis: "What crosses generations is a way of treating the weakest person in the room.",
    essay:
      "Wisdom fails when elders offer control instead of craft, and when the young offer contempt instead of questions. The last art is to put a living teaching into someone's hands and then unclench. Blood and property are the obvious inheritance. The real one is method: how to repair, how to listen, how to refuse cruelty without becoming it. Evil, having seen itself clearly, does not get the final word. The final word is a name spoken kindly in a house that learned how to stay.",
    practice: "Hand on a method, then unclench.",
    image: "/chambers/bequest.jpg",
  },
];

export function chamberIndex(n: number): number {
  const head = 9 * SPAN;
  if (n <= head) return Math.floor((n - 1) / SPAN);
  return 9 + Math.floor((n - head - 1) / LAST_SPAN);
}

export function chamberBounds(index: number): [number, number] {
  if (index < 9) {
    const start = index * SPAN + 1;
    return [start, start + SPAN - 1];
  }
  const start = 9 * SPAN + (index - 9) * LAST_SPAN + 1;
  return [start, start + LAST_SPAN - 1];
}

export function samples(index: number, count = 16): number[] {
  const [start, end] = chamberBounds(index);
  const out: number[] = [];
  for (let k = 0; k < count; k += 1) {
    const t = count === 1 ? 0 : k / (count - 1);
    out.push(Math.round(start + (end - start) * t));
  }
  return out;
}

export const PERSONS = [
  "The grandmother who kept the names",
  "The grandfather who spoke softly",
  "The mother after the night shift",
  "The father learning to apologize",
  "The eldest daughter",
  "The youngest son",
  "The child who heard the argument",
  "The spouses in their tenth year",
  "The newly married pair",
  "The one who left and came back",
  "The one who stayed",
  "The aunt who told the truth",
  "The uncle who paid the school fees",
  "The widowed father",
  "The widowed mother",
  "The twins who refused to take sides",
  "The foster parent",
  "The adopted child",
  "The elder brother",
  "The middle child who translated",
  "The daughter-in-law",
  "The son-in-law",
  "The co-parents after parting",
  "The neighbors who became kin",
  "The friend who stayed through the illness",
  "The teenager who would not lie",
  "The infant's two parents",
  "The great-grandmother",
  "The cousin raised in the house",
  "The stepfather",
  "The stepmother who refused to replace anyone",
  "The single parent",
  "The couple who could not conceive",
  "The couple who chose a life without children",
  "The parents of the grown child",
  "The son who washed his father's feet",
  "The daughter who kept the books",
  "The siblings sharing one room",
  "The bride the night before the vow",
  "The groom the night before the vow",
  "The pair renewing a tired promise",
  "The estranged brothers",
  "The sisters who stopped competing",
  "The parent of a difficult child",
  "The child of a difficult parent",
  "The spouse who became a caregiver",
  "The family around a sickbed",
  "The household of three generations",
  "The immigrant parents",
  "The child between two languages",
  "The elder who forgot the names",
  "The young one who remembered them",
  "The couple after betrayal",
  "The couple after forgiveness",
  "The father who put the belt away",
  "The mother who unlearned the shout",
  "The son who broke the cup",
  "The daughter who told the secret",
  "The quiet husband",
  "The wife who asked to be heard",
  "The partners who are not yet parents",
  "The godparent",
  "The mentor treated as a parent",
  "The orphaned cousins",
  "The host of the house",
  "The guest who stayed seven years",
  "The one who cooks for the house",
  "The one who set the extra place",
  "The child who drew the family",
  "The parent looking at that drawing",
  "The pair holding papers of custody",
  "The elders at the doorway",
  "The youth asking a real question",
  "The family on a hard holiday",
  "The spouses in separate chairs",
  "The spouses who moved the chairs closer",
  "The brother who returned the money",
  "The sister who returned the story",
  "The parent who said I was wrong",
  "The child who said I am still here",
];

export const OBJECTS = [
  "the mended bowl",
  "the second key",
  "the cold stove",
  "the extra chair",
  "the unsent letter",
  "the shared blanket",
  "the oil lamp",
  "the Friday table",
  "the doorpost",
  "the child's drawing",
  "the book of names",
  "the cup repaired with gold",
  "the pair of shoes by the door",
  "the last honest photograph",
  "the pot big enough for everyone",
  "the quiet room",
  "the specific apology",
  "the wedding thread",
  "the night lamp",
  "the family ledger",
  "the window seat",
  "the bread still cooling",
  "the locked drawer",
  "the unlocked drawer",
  "the call home",
  "the empty place setting",
  "the filled place setting",
  "the garden hoe",
  "the medicinal tea",
  "the school uniform",
  "the borrowed coat",
  "the returned coat",
  "the first tooth kept in a cloth",
  "the gray hair on the collar",
  "the prayer rug",
  "the Sabbath candles",
  "the stick of incense",
  "the wooden spoon",
  "the threshold",
  "the rain on the roof",
  "the shared name",
  "the new name chosen in peace",
  "the old quarrel",
  "the folded cloth",
  "the cracked plate",
  "the saved seed",
  "the walking stick",
  "the unfinished sweater",
  "the rent envelope",
  "the spare mattress",
  "the front-door bolt",
  "the open front door",
  "the kettle at dawn",
  "the Sunday soup",
  "the handwritten recipe",
  "the torn photograph",
  "the repaired photograph",
  "the child's first shoe",
  "the elder's glasses",
  "the shared umbrella",
  "the bus fare set aside",
  "the hospital bracelet",
  "the discharge papers",
  "the wedding ribbon",
  "the visit to the grave",
  "the flowers for the grave",
  "the toolbox",
  "the sewing needle",
  "the lullaby hummed through",
  "the hand that refused the slap",
  "the lowered voice",
  "the second chance",
  "the house key returned",
  "the room left intact",
  "the room finally changed",
  "the plant that lived",
  "the plant replaced with care",
  "the map of the old country",
  "the map of the new city",
  "the two passports",
  "the one passport",
  "the citizenship paper",
  "the report card",
  "the instrument case",
  "the silenced phone",
  "the phone turned face down",
  "the chair pulled out",
  "the chair pushed back in grief",
  "the bed made for a guest",
  "the bed made after anger",
  "the washbasin",
  "the clean towel",
  "the muddy shoes",
  "the swept floor",
  "the unswept floor, admitted",
  "the will read aloud",
  "the untitled gift",
  "the loan forgiven",
  "the loan recorded honestly",
  "the boundary spoken once",
  "the boundary kept",
  "the joke that did not wound",
  "the joke apologized for",
  "the household Bible",
  "the household Qur'an",
  "the quiet shrine",
  "the lit lamp at the shrine",
  "the empty cradle",
  "the occupied cradle",
  "the adoption papers",
  "the goodbye said in person",
  "the goodbye said late, and still said",
  "the early arrival",
  "the late arrival, welcomed",
  "the watch stopped at a death",
  "the clock set to a birth",
  "the winter coat",
  "the summer mat",
  "the shared radio",
  "the song they all knew",
  "the song only the elder knew",
  "the language kept at the table",
  "the language studied again",
  "the burnt rice",
  "the meal begun again",
  "the fast broken together",
  "the feast with enough",
  "the feast that ran short, kindly",
  "the neighbor's bowl returned full",
  "the neighbor's bowl returned washed",
  "the fence with a gate",
  "the fence taken down",
  "the roof leak",
  "the patched roof",
  "the candle for the missing",
  "the candle for the newborn",
  "the letter from prison",
  "the letter written back",
  "the seat saved",
  "the hand unclenched",
  "the story without a costume for the villain",
  "the question asked twice",
  "the answer given slowly",
  "the promise written down",
  "the promise kept on a dull Tuesday",
  "the apology in the same room",
  "the silence that was actually listening",
  "the door left unlatched",
  "the name spoken kindly",
];

export const CLAUSES = [
  "The room does not become pure. It becomes honest.",
  "A child learns that adults can repair without pretending.",
  "Anger is allowed to finish its sentence, and is not allowed to rule the night.",
  "Someone says the harm out loud and does not enjoy saying it.",
  "The person who was hurt is not asked to hurry.",
  "Accountability stays longer than shame's performance.",
  "They eat anyway. Bodies are not punished for the quarrel.",
  "The apology is specific, which is why it can be believed.",
  "Silence is no longer asked to do the work of peace.",
  "Two people remain two people, and still choose the same table.",
  "The elder admits what the old way cost.",
  "The younger one is not recruited as a weapon.",
  "Mercy arrives after the truth, not instead of it.",
  "The door is left unlatched for the one still outside.",
  "What they transmit is a method, not a grudge.",
  "Evil, seeing its own shape, loses the pleasure of being misunderstood.",
  "Nobody wins the evening. The house survives it.",
  "Tenderness is practiced without cancelling the fact.",
  "They repair the thing, and also the way they speak while repairing it.",
  "A boundary is drawn without exile.",
  "Forgiveness is not announced. It is practiced in small repeated acts.",
  "The story told later will include the repair, not only the wound.",
  "Whoever holds power in the room is asked to speak first.",
  "Love is treated as a discipline. That is how it lasts.",
];

export const FORMS: Array<(person: string, object: string) => string> = [
  (person, object) => `${person} sets ${object} where the whole house must see it.`,
  (person, object) =>
    `No one is allowed to rename ${object} into something smaller. ${person} keeps its true size.`,
  (person, object) => `The quarrel tried to end at ${object}. ${person} refuses the shortcut.`,
  (person, object) =>
    `${person} returns to ${object} on an ordinary day — the only kind a family actually has.`,
  (person, object) => `What was done still sits beside ${object}. ${person} does not decorate it.`,
  (person, object) =>
    `${person} shows the younger hands what ${object} is for. Not ornament. Use.`,
];

export type Tradition = {
  name: string;
  beside: string;
  line?: string;
  source?: string;
};

export const TRADITIONS: Tradition[] = [
  {
    name: "Hebrew prophets",
    line: "What doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    source: "Micah 6:8, King James Version",
    beside:
      "Justice, mercy, and humility are not three moods. In a house they are one practice: tell the truth, spare the weak, and do not make your own pain the center of the world.",
  },
  {
    name: "Psalms",
    line: "Behold, how good and how pleasant it is for brethren to dwell together in unity!",
    source: "Psalm 133:1, King James Version",
    beside:
      "Unity here is not sameness. It is kin dwelling together without devouring one another — pleasant because it is rare, and good because it is chosen.",
  },
  {
    name: "The Gospels",
    line: "Blessed are the peacemakers: for they shall be called the children of God.",
    source: "Matthew 5:9, King James Version",
    beside:
      "Peacemaking is not the avoidance of conflict. It is the work of making a peace that the injured can stand inside. Children of that work resemble the God the verse names.",
  },
  {
    name: "The Pauline letters",
    line: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",
    source: "1 Corinthians 13:4, King James Version",
    beside:
      "Long-suffering without kindness is martyrdom as a weapon. Kindness without endurance is a mood. A family needs the unfashionable pair: patience that does not keep score, and warmth that does not lie.",
  },
  {
    name: "The Qur'an",
    beside:
      "In the spirit of the Qur'an's teachings on kinship and mercy: spouses are a dwelling of tranquility, and there is a prayer to be granted family who are a comfort to the eyes and an example for the mindful. Rahma is mercy that acts. It does not decorate harm.",
  },
  {
    name: "Prophetic teaching",
    beside:
      "A well-remembered hadith holds that the best of people are those who are best to their families. Public piety that fails at the table has not yet become character. The house is the proof.",
  },
  {
    name: "Dhammapada",
    line: "For hatred does not cease by hatred at any time: hatred ceases by love, this is an old rule.",
    source: "Dhammapada 5, Müller translation",
    beside:
      "The old rule is not sentimental. Hatred rehearsed in a kitchen becomes the child's nervous system. Love, here, means the interruption of that rehearsal — a law, not a feeling.",
  },
  {
    name: "Daodejing",
    line: "The highest excellence is like that of water.",
    source: "Daodejing 8, James Legge translation",
    beside:
      "Water goes to the low place and makes things grow. A family is made the same way. Someone is willing to be the valley, not because they are lesser, but because life gathers where striving loosens its fist.",
  },
  {
    name: "Analects",
    line: "What you do not want done to yourself, do not do to others.",
    source: "Analects 15.24, James Legge translation",
    beside:
      "Reciprocity is the whole of the domestic art in one sentence. The hard part is applying it to the person whose nearness makes them easiest to treat as an exception.",
  },
  {
    name: "Bhagavad Gita",
    line: "Let right deeds be thy motive, not the fruit which comes from them.",
    source: "Bhagavad Gita 2.47, Edwin Arnold translation",
    beside:
      "A parent who loves only the visible result — the obedient child, the impressive marriage — has already left the duty. The fruit is not the vow. The deed is.",
  },
  {
    name: "Upanishads",
    beside:
      "Beside the prayer to be led from the unreal to the real, and from darkness to light: a family sickens on the unreal, on stories that flatter. Light, in a house, is the version of events that all the witnesses can recognize.",
  },
  {
    name: "Instruction of Ptahhotep",
    beside:
      "Beside one of the oldest books of advice we still have: do not be arrogant because of what you know, and take counsel with the ignorant as with the wise. A household where only one voice counts is already a small tyranny.",
  },
  {
    name: "Epic of Gilgamesh",
    beside:
      "The oldest long story we have is, at its center, a grief: one life undone by the loss of another. Civilization's first epic is not about a throne. It is about what a person is worth to the person who loves them.",
  },
  {
    name: "Pirkei Avot",
    line: "On three things the world stands: on justice, on truth, and on peace.",
    source: "Pirkei Avot 1:18",
    beside:
      "Pull one leg away and the world — or the table — tips. Peace that cancels truth is a truce of the frightened. Truth that cancels peace is a court that moves into the bedroom. Justice is how they bear each other's weight.",
  },
  {
    name: "Classic of Filial Piety",
    beside:
      "The classic treats care of parents as the root of virtue, including the duty not to waste the body and life one was given. This codex keeps the care and refuses the distortion: elders are not owed cruelty, and children are not property. Filial love that cannot be questioned has become fear.",
  },
  {
    name: "Stoic ethics",
    line: "Waste no more time arguing what a good man should be. Be one.",
    source: "Marcus Aurelius, Meditations 10.16, George Long translation",
    beside:
      "The household version is sharper. Do not spend the evening defining a good parent, spouse, or child. Perform the next decent act. Character is what remains when the argument about character is over.",
  },
  {
    name: "Akan proverb tradition",
    beside:
      "Beside Akan wisdom about character and the home: a people is not ruined first in public. It is ruined where the child watches how power speaks to weakness. What is done in the house becomes the proverb the child will live.",
  },
  {
    name: "Yoruba oral wisdom",
    beside:
      "Beside the Yoruba teaching of iwa: character is the ornament that does not tarnish. A household may lose money, land, and ease. If iwa remains, the family is not poor. If iwa goes, the decorations are a costume.",
  },
  {
    name: "Ubuntu",
    beside:
      "Beside the philosophy carried in umuntu ngumuntu ngabantu: a person becomes a person through other persons. The family is the first school of that becoming, and the first place it can be betrayed.",
  },
  {
    name: "Sikh scripture",
    beside:
      "Beside the Guru Granth Sahib's joining of remembrance to truthful living: sharing bread is already worship, and seva that cannot be practiced on the people under one's own roof is still a performance.",
  },
  {
    name: "Desert elders",
    beside:
      "Beside the desert fathers and mothers: speech was made expensive so that it would be true, and anger was treated as a guest that must not be given the keys. A family can learn the same economy without moving to the desert.",
  },
  {
    name: "Sufi teaching",
    beside:
      "Beside the teaching that the heart is broken in the direction it can be filled: grief does not destroy a family. Forbidding grief to teach is what destroys it. The wound is not holy because it hurts. It is useful if light is allowed to use it.",
  },
];

export const SCHOOLS = [
  "Fernand Léger",
  "Leonardo da Vinci",
  "Michelangelo Buonarroti",
  "Raphael",
  "Pablo Picasso",
  "Vincent van Gogh",
  "Rembrandt van Rijn",
  "Claude Monet",
  "Salvador Dalí",
  "Johannes Vermeer",
  "Sandro Botticelli",
  "Caravaggio",
  "Frida Kahlo",
  "Henri Matisse",
  "Gustav Klimt",
  "Edvard Munch",
  "Katsushika Hokusai",
  "Diego Velázquez",
  "Francisco Goya",
  "J. M. W. Turner",
  "Andy Warhol",
  "Pierre-Auguste Renoir",
  "Edgar Degas",
  "Paul Cézanne",
  "Georgia O'Keeffe",
  "Diego Rivera",
  "Giotto di Bondone",
  "Piero della Francesca",
  "Titian",
  "Donatello",
  "Jan van Eyck",
  "Albrecht Dürer",
  "El Greco",
  "Peter Paul Rubens",
  "Artemisia Gentileschi",
  "Georges Braque",
  "Juan Gris",
  "Robert Delaunay",
  "Sonia Delaunay",
  "Albert Gleizes",
  "Jean Metzinger",
  "Amédée Ozenfant",
  "Rogier van der Weyden",
  "Hieronymus Bosch",
  "Masaccio",
  "Fra Angelico",
  "Tintoretto",
  "Paolo Veronese",
  "Pieter Bruegel the Elder",
  "Anthony van Dyck",
  "Frans Hals",
  "Nicolas Poussin",
  "Gian Lorenzo Bernini",
  "William Blake",
  "John Constable",
  "Eugène Delacroix",
  "Jean-Auguste-Dominique Ingres",
  "Gustave Courbet",
  "Édouard Manet",
  "Camille Corot",
  "Théodore Géricault",
  "Berthe Morisot",
  "Mary Cassatt",
  "Camille Pissarro",
  "Paul Gauguin",
  "Georges Seurat",
  "Egon Schiele",
  "Marc Chagall",
  "Wassily Kandinsky",
  "Paul Klee",
  "René Magritte",
  "Joan Miró",
  "Max Ernst",
  "Piet Mondrian",
  "Kazimir Malevich",
  "Hilma af Klint",
  "Jackson Pollock",
  "Mark Rothko",
  "Willem de Kooning",
  "Lee Krasner",
  "Helen Frankenthaler",
  "Agnes Martin",
  "Bridget Riley",
  "Roy Lichtenstein",
  "Jean-Michel Basquiat",
  "Keith Haring",
  "Robert Rauschenberg",
  "Jasper Johns",
  "David Hockney",
  "Francis Bacon",
  "Lucian Freud",
  "Gerhard Richter",
  "Utagawa Hiroshige",
  "Qi Baishi",
  "Zhang Daqian",
  "Xu Beihong",
  "Raja Ravi Varma",
  "Amrita Sher-Gil",
  "Ben Enwonwu",
  "Ibrahim El-Salahi",
  "Wifredo Lam",
  "José Clemente Orozco",
  "David Alfaro Siqueiros",
  "Tarsila do Amaral",
  "Louise Bourgeois",
  "Yayoi Kusama",
  "Faith Ringgold",
  "Ai Weiwei",
];
