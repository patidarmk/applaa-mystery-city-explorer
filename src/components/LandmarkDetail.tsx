import React from 'react';
import { useNavigate, useSearch, useLocation } from '@tanstack/react-router';
import { Landmark, HiddenObject, mysteryClues } from '@/data/gameData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import PuzzleModal from './PuzzleModal';
import { useGame } from '@/contexts/GameContext';

interface LandmarkDetailProps {
  landmark: Landmark;
}

export default function LandmarkDetail({ landmark }: LandmarkDetailProps) {
  const { state, dispatch, proceduralData } = useGame();
  const navigate = useNavigate();
  const search = useSearch({ from: '/game/landmark' as const } as any);
  const location = useLocation();
  const clue = mysteryClues.find(c => c.requiredLandmark === landmark.id);

  const handleMysteryAdvance = () => {
    if (clue && state.currentMysteryStep < clue.step) {
      dispatch({ type: 'ADVANCE_MYSTERY', step: clue.step });
      if (clue.leadsToPuzzle) {
        // Puzzle triggered via modal
      }
    }
  };

  const nearbyObjects: HiddenObject[] = proceduralData.hiddenObjects.filter(o => 
    o.currentLocation && 
    Math.abs(o.currentLocation[0] - landmark.x) <= 1 && 
    Math.abs(o.currentLocation[1] - landmark.y) <= 1
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate({ to: '/game' as const } as any)}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Map
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {landmark.name}
            <Badge variant="secondary">{landmark.category}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img 
            src={landmark.image} 
            alt={landmark.name} 
            className="w-full h-64 object-cover rounded-lg" 
          />
          <p className="text-gray-700">{landmark.description}</p>
          {landmark.mysteryClue && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <strong className="text-blue-800">Mystery Clue:</strong>
              <p className="mt-1">{landmark.mysteryClue}</p>
              <Button 
                onClick={handleMysteryAdvance} 
                className="mt-2 w-full"
                disabled={state.currentMysteryStep >= (clue?.step || 0)}
              >
                Follow This Clue
              </Button>
            </div>
          )}
          {clue && state.currentMysteryStep >= clue.step - 1 && (
            <PuzzleModal 
              puzzleId={clue.leadsToPuzzle} 
              onSolve={handleMysteryAdvance} 
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Nearby Hidden Objects</CardTitle>
          <p className="text-sm text-gray-500">Search around this landmark for treasures.</p>
        </CardHeader>
        <CardContent>
          {nearbyObjects.length > 0 ? (
            <div className="space-y-2">
              {nearbyObjects.map((obj) => {
                const isCollected = state.inventory.some((i) => i.id === obj.id);
                return (
                  <div key={obj.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <img 
                      src={obj.image} 
                      alt={obj.name} 
                      className="w-8 h-8 rounded border" 
                    />
                    <div className="flex-1">
                      <p className="font-medium">{obj.name}</p>
                      <p className="text-sm text-gray-600">{obj.description}</p>
                    </div>
                    <Badge variant={isCollected ? "default" : "secondary"}>
                      {isCollected ? "Collected" : `${obj.rarity}`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hidden objects nearby. Explore more!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}