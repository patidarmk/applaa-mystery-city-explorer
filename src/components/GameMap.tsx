import React from 'react';
import { landmarks, hiddenObjects } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { Landmark, HiddenObject } from '@/data/gameData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface GameMapProps {
  proceduralData: { landmarks: Landmark[]; hiddenObjects: HiddenObject[] };
}

const GRID_SIZE = 10;

export default function GameMap({ proceduralData }: GameMapProps) {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMove = (x: number, y: number) => {
    dispatch({ type: 'MOVE_PLAYER', x, y });

    // Check landmark visit
    const landmark = proceduralData.landmarks.find(l => l.x === x && l.y === y);
    if (landmark && !state.visitedLandmarks.includes(landmark.id)) {
      dispatch({ type: 'VISIT_LANDMARK', landmarkId: landmark.id });
      if (location.pathname !== '/game') {
        navigate({
          to: '/game/landmark' as const,
          search: (prev: any) => ({ ...prev, id: landmark.id })
        } as any);
      }
    }

    // Check hidden object collection
    const obj = proceduralData.hiddenObjects.find(o => o.currentLocation?.[0] === x && o.currentLocation?.[1] === y);
    if (obj && !state.inventory.some(i => i.id === obj.id)) {
      dispatch({ type: 'COLLECT_OBJECT', objectId: obj.id });
    }

    // Advance mystery if at required landmark
    // Simplified: Check if current step's landmark matches
  };

  const renderGridCell = (x: number, y: number) => {
    const landmark = proceduralData.landmarks.find(l => l.x === x && l.y === y);
    const obj = proceduralData.hiddenObjects.find(o => o.currentLocation?.[0] === x && o.currentLocation?.[1] === y);
    const isPlayer = state.playerX === x && state.playerY === y;

    return (
      <div
        key={`${x}-${y}`}
        className={cn(
          "w-10 h-10 border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors relative",
          isPlayer && "bg-blue-500 text-white",
          landmark && "bg-green-100",
          obj && !state.inventory.some(i => i.id === obj.id) && "bg-yellow-100"
        )}
        onClick={() => handleMove(x, y)}
      >
        {isPlayer && <span className="text-xs">P</span>}
        {landmark && <MapPin className="h-4 w-4 text-green-600" />}
        {obj && !state.inventory.some(i => i.id === obj.id) && <Search className="h-3 w-3 text-yellow-600" />}
        {landmark && (
          <div className="absolute -bottom-12 left-0 w-32 bg-white shadow-lg rounded p-2 text-xs z-10">
            <strong>{landmark.name}</strong><br />
            {landmark.description.substring(0, 50)}...
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          NeoCity Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-10 gap-0.5 bg-gray-200 p-2 rounded">
          {Array.from({ length: GRID_SIZE }, (_, y) =>
            Array.from({ length: GRID_SIZE }, (_, x) => renderGridCell(x, y))
          )}
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Player at ({state.playerX}, {state.playerY})</span>
          <Button variant="outline" onClick={() => dispatch({ type: 'START_GAME' })}>
            New Playthrough
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}