import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

const Inventory = () => {
  const { state } = useGame();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Inventory ({state.inventory.length}/{8})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {state.inventory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.inventory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <Badge variant="secondary">{item.rarity}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No items collected yet. Explore the city!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;