export interface Landmark {
  id: number;
  name: string;
  description: string;
  image: string;
  x: number; // Grid position for map
  y: number;
  category: string;
  mysteryClue?: string; // Ties into mysteries
}

export interface HiddenObject {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic';
  possibleLocations: [number, number][]; // Possible (x,y) grid positions
  currentLocation?: [number, number]; // Added for procedural generation
}

export interface Puzzle {
  id: number;
  type: 'riddle' | 'pattern' | 'timed';
  question: string;
  options?: string[]; // For multiple choice
  answer: string;
  timeLimit?: number; // Seconds for timed
  hint: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlockCondition: string;
}

export interface MysteryClue {
  id: number;
  step: number;
  text: string;
  requiredLandmark: number;
  leadsToPuzzle: number;
  randomizedOrder?: boolean;
}

// Realistic mock data
export const landmarks: Landmark[] = [
  {
    id: 1,
    name: "Central Tower",
    description: "A gleaming skyscraper at the heart of NeoCity, offering panoramic views and whispers of ancient secrets.",
    image: "https://picsum.photos/400/300?random=1",
    x: 5,
    y: 5,
    category: "Downtown",
    mysteryClue: "The shadow falls where the river meets the steel."
  },
  {
    id: 2,
    name: "River Bridge",
    description: "An ornate bridge spanning the neon-lit river, where locals share tales of lost treasures.",
    image: "https://picsum.photos/400/300?random=2",
    x: 3,
    y: 7,
    category: "Riverside",
    mysteryClue: "Cross the waters to find the hidden gem."
  },
  {
    id: 3,
    name: "Tech Plaza",
    description: "A bustling square filled with holographic displays and innovation hubs.",
    image: "https://picsum.photos/400/300?random=3",
    x: 7,
    y: 2,
    category: "Tech District",
    mysteryClue: "Innovation hides in plain sight."
  },
  {
    id: 4,
    name: "Old Market",
    description: "A vibrant marketplace with street performers and antique stalls echoing the city's history.",
    image: "https://picsum.photos/400/300?random=4",
    x: 1,
    y: 4,
    category: "Historic",
    mysteryClue: "Bargains conceal deeper truths."
  },
  {
    id: 5,
    name: "Green Park",
    description: "A serene oasis amid the urban sprawl, perfect for reflection and discovery.",
    image: "https://picsum.photos/400/300?random=5",
    x: 6,
    y: 8,
    category: "Parks",
    mysteryClue: "Nature guards the forgotten path."
  },
  {
    id: 6,
    name: "Neon Arcade",
    description: "A retro gaming haven with flashing lights and underground lore.",
    image: "https://picsum.photos/400/300?random=6",
    x: 4,
    y: 1,
    category: "Entertainment",
    mysteryClue: "Pixels reveal the code to the vault."
  },
  {
    id: 7,
    name: "Sky Observatory",
    description: "High above the city, stargazing meets surveillance mysteries.",
    image: "https://picsum.photos/400/300?random=7",
    x: 8,
    y: 6,
    category: "Science",
    mysteryClue: "Stars align with the city's grid."
  },
  {
    id: 8,
    name: "Harbor Docks",
    description: "Bustling piers where ships arrive with exotic cargo and secrets.",
    image: "https://picsum.photos/400/300?random=8",
    x: 2,
    y: 9,
    category: "Waterfront",
    mysteryClue: "The tide brings what the night hides."
  }
];

export const hiddenObjects: HiddenObject[] = [
  {
    id: 1,
    name: "Ancient Coin",
    description: "A weathered coin from NeoCity's founding era, etched with cryptic symbols.",
    image: "https://picsum.photos/100/100?random=9",
    rarity: "rare",
    possibleLocations: [[1,1], [2,3], [4,5], [6,7], [8,2]]
  },
  {
    id: 2,
    name: "Glowing Key",
    description: "A luminescent key that unlocks hidden doors in the city's underbelly.",
    image: "https://picsum.photos/100/100?random=10",
    rarity: "epic",
    possibleLocations: [[3,4], [5,6], [7,8], [1,7], [4,2]]
  },
  {
    id: 3,
    name: "Mystery Note",
    description: "A scribbled note hinting at the next clue in the grand puzzle.",
    image: "https://picsum.photos/100/100?random=11",
    rarity: "common",
    possibleLocations: [[2,2], [5,3], [7,5], [3,8], [6,1]]
  },
  {
    id: 4,
    name: "Crystal Shard",
    description: "A shard from a shattered monument, pulsing with faint energy.",
    image: "https://picsum.photos/100/100?random=12",
    rarity: "rare",
    possibleLocations: [[1,5], [4,7], [6,4], [8,6], [2,9]]
  },
  {
    id: 5,
    name: "Lost Map Fragment",
    description: "Part of an old city map showing unmarked paths.",
    image: "https://picsum.photos/100/100?random=13",
    rarity: "common",
    possibleLocations: [[3,1], [5,9], [7,3], [1,6], [4,8]]
  },
  {
    id: 6,
    name: "Enigmatic Locket",
    description: "A locket containing a faded photo of NeoCity's founders.",
    image: "https://picsum.photos/100/100?random=14",
    rarity: "epic",
    possibleLocations: [[2,6], [6,2], [8,4], [3,9], [5,5]]
  },
  {
    id: 7,
    name: "Rusty Compass",
    description: "Points not north, but to hidden caches around the city.",
    image: "https://picsum.photos/100/100?random=15",
    rarity: "rare",
    possibleLocations: [[1,3], [4,1], [7,7], [2,8], [6,9]]
  },
  {
    id: 8,
    name: "Shadow Amulet",
    description: "An amulet that reveals illusions in the city's landmarks.",
    image: "https://picsum.photos/100/100?random=16",
    rarity: "epic",
    possibleLocations: [[5,4], [8,1], [3,2], [1,9], [7,6]]
  }
];

export const puzzles: Puzzle[] = [
  {
    id: 1,
    type: "riddle",
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "echo",
    hint: "Think of sounds in empty spaces."
  },
  {
    id: 2,
    type: "pattern",
    question: "Which comes next: 2, 4, 8, 16, ?",
    options: ["24", "32", "64", "18"],
    answer: "32",
    hint: "It's doubling each time."
  },
  {
    id: 3,
    type: "timed",
    question: "Match the colors: Red to Fire, Blue to ? (Water, Earth, Air)",
    options: ["Water", "Earth", "Air", "Sky"],
    answer: "Water",
    timeLimit: 30,
    hint: "Basic elemental associations."
  },
  {
    id: 4,
    type: "riddle",
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    hint: "Consider what trails behind you."
  },
  {
    id: 5,
    type: "pattern",
    question: "Complete the sequence: A, C, F, J, ?",
    options: ["M", "O", "K", "N"],
    answer: "O",
    hint: "Look at the gaps in the alphabet."
  },
  {
    id: 6,
    type: "timed",
    question: "Find the odd one: Apple, Banana, Carrot, Grape",
    options: ["Apple", "Banana", "Carrot", "Grape"],
    answer: "Carrot",
    timeLimit: 20,
    hint: "Fruits vs. vegetables."
  },
  {
    id: 7,
    type: "riddle",
    question: "What has keys but can't open locks?",
    answer: "piano",
    hint: "Musical instrument."
  },
  {
    id: 8,
    type: "pattern",
    question: "1, 1, 2, 3, 5, 8, ?",
    options: ["10", "13", "11", "21"],
    answer: "13",
    hint: "Fibonacci sequence."
  }
];

export const achievements: Achievement[] = [
  {
    id: 1,
    name: "Explorer Initiate",
    description: "Visit your first landmark.",
    icon: "https://picsum.photos/50/50?random=17",
    unlockCondition: "visit 1 landmark"
  },
  {
    id: 2,
    name: "Object Hunter",
    description: "Collect 3 hidden objects.",
    icon: "https://picsum.photos/50/50?random=18",
    unlockCondition: "collect 3 objects"
  },
  {
    id: 3,
    name: "Puzzle Master",
    description: "Solve 5 puzzles correctly.",
    icon: "https://picsum.photos/50/50?random=19",
    unlockCondition: "solve 5 puzzles"
  },
  {
    id: 4,
    name: "Time Warrior",
    description: "Complete a timed challenge under limit.",
    icon: "https://picsum.photos/50/50?random=20",
    unlockCondition: "win timed puzzle"
  },
  {
    id: 5,
    name: "Mystery Solver",
    description: "Unravel the full city mystery.",
    icon: "https://picsum.photos/50/50?random=21",
    unlockCondition: "complete mystery"
  },
  {
    id: 6,
    name: "Collector Elite",
    description: "Gather all 8 hidden objects.",
    icon: "https://picsum.photos/50/50?random=22",
    unlockCondition: "collect all objects"
  },
  {
    id: 7,
    name: "Landmark Legend",
    description: "Discover every landmark in one playthrough.",
    icon: "https://picsum.photos/50/50?random=23",
    unlockCondition: "visit all landmarks"
  },
  {
    id: 8,
    name: "Achievement Hunter",
    description: "Unlock all achievements.",
    icon: "https://picsum.photos/50/50?random=24",
    unlockCondition: "unlock all"
  }
];

export const mysteryClues: MysteryClue[] = [
  {
    id: 1,
    step: 1,
    text: "The mystery begins at the city's core. Seek the tower that pierces the sky.",
    requiredLandmark: 1,
    leadsToPuzzle: 1,
    randomizedOrder: true
  },
  {
    id: 2,
    step: 2,
    text: "Follow the flow of water to the crossing point where bridges whisper secrets.",
    requiredLandmark: 2,
    leadsToPuzzle: 2,
    randomizedOrder: true
  },
  {
    id: 3,
    step: 3,
    text: "In the glow of progress, find the spark that ignites the next revelation.",
    requiredLandmark: 3,
    leadsToPuzzle: 3,
    randomizedOrder: true
  },
  {
    id: 4,
    step: 4,
    text: "Amid the echoes of the past, trade for knowledge in the crowded stalls.",
    requiredLandmark: 4,
    leadsToPuzzle: 4,
    randomizedOrder: true
  },
  {
    id: 5,
    step: 5,
    text: "Rest in green arms, where leaves hide the path to enlightenment.",
    requiredLandmark: 5,
    leadsToPuzzle: 5,
    randomizedOrder: true
  },
  {
    id: 6,
    step: 6,
    text: "Play the games of old to decode the digital enigma.",
    requiredLandmark: 6,
    leadsToPuzzle: 6,
    randomizedOrder: true
  },
  {
    id: 7,
    step: 7,
    text: "Gaze upward to the heavens; the stars map your final trial.",
    requiredLandmark: 7,
    leadsToPuzzle: 7,
    randomizedOrder: true
  },
  {
    id: 8,
    step: 8,
    text: "At the edge of land and sea, the truth surfaces with the waves.",
    requiredLandmark: 8,
    leadsToPuzzle: 8,
    randomizedOrder: true
  }
];