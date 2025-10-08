import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { achievements } from '@/data/gameData';

const Achievements = () => {
  const { state } = useGame();

  const unlocked = achievements.filter(a => state.unlockedAchievements.includes(a.id));

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            Achievements ({unlocked.length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => {
              const isUnlocked = state.unlockedAchievements.includes(ach.id);
              return (
                <div key={ach.id} className="border rounded-lg p-4">
                  <img src={ach.icon} alt={ach.name} className="w-12 h-12 mb-2" />
                  <h3 className="font-semibold mb-1">{ach.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{ach.description}</p>
                  <Badge variant={isUnlocked ? "default" : "secondary"}>
                    {isUnlocked ? "Unlocked" : "Locked"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;