import React from 'react';
import GameMap from '@/components/GameMap';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Game = () => {
  const { state, dispatch, proceduralData } = useGame();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Welcome to NeoCity Mysteries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Explore the procedurally generated city, discover landmarks, collect hidden objects, and solve the mystery!</p>
          {!state.isPlaying && (
            <Button onClick={() => dispatch({ type: 'START_GAME' })}>
              Start Adventure
            </Button>
          )}
          {state.isPlaying && <p className="text-green-600">Game started! Click on the map to move.</p>}
        </CardContent>
      </Card>
      {state.isPlaying && <GameMap proceduralData={proceduralData} />}
    </div>
  );
};

export default Game;