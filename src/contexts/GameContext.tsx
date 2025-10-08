import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { landmarks, hiddenObjects, puzzles, achievements, mysteryClues, Landmark, HiddenObject, Puzzle, Achievement, MysteryClue } from '@/data/gameData';
import { useToast } from '@/components/ui/use-toast';

interface GameState {
  playerX: number;
  playerY: number;
  inventory: HiddenObject[];
  visitedLandmarks: number[];
  solvedPuzzles: number[];
  unlockedAchievements: number[];
  currentMysteryStep: number;
  gameSeed: number; // For procedural generation
  isPlaying: boolean;
  timeLeft?: number; // For timed challenges
}

type GameAction =
  | { type: 'START_GAME'; seed?: number }
  | { type: 'MOVE_PLAYER'; x: number; y: number }
  | { type: 'COLLECT_OBJECT'; objectId: number }
  | { type: 'VISIT_LANDMARK'; landmarkId: number }
  | { type: 'SOLVE_PUZZLE'; puzzleId: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: number }
  | { type: 'ADVANCE_MYSTERY'; step: number }
  | { type: 'START_TIMER'; time: number }
  | { type: 'TICK_TIMER' }
  | { type: 'END_GAME' };

const initialState: GameState = {
  playerX: 0,
  playerY: 0,
  inventory: [],
  visitedLandmarks: [],
  solvedPuzzles: [],
  unlockedAchievements: [],
  currentMysteryStep: 0,
  gameSeed: Date.now(),
  isPlaying: false,
};

function generateProceduralMap(seed: number): { landmarks: Landmark[]; hiddenObjects: HiddenObject[]; mysteryClues: MysteryClue[] } {
  // Simple seeded random for positions and order
  const rand = (max: number) => {
    let s = seed;
    s = (s * 1103515245 + 12345) % 2147483647;
    return Math.floor((s / 2147483647) * max);
  };

  // Shuffle landmark positions (10x10 grid)
  const shuffledLandmarks = [...landmarks].map((l, i) => ({
    ...l,
    x: rand(9),
    y: rand(9),
  }));

  // Randomize hidden object positions from possibles
  const shuffledObjects = hiddenObjects.map(obj => ({
    ...obj,
    currentLocation: obj.possibleLocations[rand(obj.possibleLocations.length)],
  }));

  // Shuffle mystery clue order
  const shuffledClues = [...mysteryClues].sort(() => rand(2) - 1);

  return { landmarks: shuffledLandmarks, hiddenObjects: shuffledObjects, mysteryClues: shuffledClues };
}

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  proceduralData: ReturnType<typeof generateProceduralMap>;
} | null>(null);

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameSeed: action.seed || Date.now(),
        isPlaying: true,
      };
    case 'MOVE_PLAYER':
      return { ...state, playerX: action.x, playerY: action.y };
    case 'COLLECT_OBJECT':
      if (!state.inventory.some(o => o.id === action.objectId)) {
        return {
          ...state,
          inventory: [...state.inventory, hiddenObjects.find(o => o.id === action.objectId)!],
        };
      }
      return state;
    case 'VISIT_LANDMARK':
      if (!state.visitedLandmarks.includes(action.landmarkId)) {
        return {
          ...state,
          visitedLandmarks: [...state.visitedLandmarks, action.landmarkId],
        };
      }
      return state;
    case 'SOLVE_PUZZLE':
      if (!state.solvedPuzzles.includes(action.puzzleId)) {
        return {
          ...state,
          solvedPuzzles: [...state.solvedPuzzles, action.puzzleId],
        };
      }
      return state;
    case 'UNLOCK_ACHIEVEMENT':
      if (!state.unlockedAchievements.includes(action.achievementId)) {
        return {
          ...state,
          unlockedAchievements: [...state.unlockedAchievements, action.achievementId],
        };
      }
      return state;
    case 'ADVANCE_MYSTERY':
      return { ...state, currentMysteryStep: action.step };
    case 'START_TIMER':
      return { ...state, timeLeft: action.time };
    case 'TICK_TIMER':
      if (state.timeLeft && state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }
      return state;
    case 'END_GAME':
      return initialState;
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const proceduralData = React.useMemo(() => generateProceduralMap(state.gameSeed), [state.gameSeed]);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('neoCityGame', JSON.stringify(state));
    // Check achievements on changes
    if (state.visitedLandmarks.length >= 1) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 1 });
    if (state.inventory.length >= 3) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 2 });
    if (state.solvedPuzzles.length >= 5) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 3 });
    if (state.visitedLandmarks.length === landmarks.length) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 7 });
    if (state.inventory.length === hiddenObjects.length) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 6 });
    if (state.currentMysteryStep === mysteryClues.length) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 5 });
    if (state.unlockedAchievements.length === achievements.length) dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 8 });
  }, [state]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('neoCityGame');
    if (saved) {
      const parsed = JSON.parse(saved);
      dispatch({ type: 'START_GAME', seed: parsed.gameSeed });
      // Restore other state via dispatch if needed
    }
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, proceduralData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};