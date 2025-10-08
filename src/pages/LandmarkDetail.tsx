import React from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useGame } from '@/contexts/GameContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandmarkDetailComponent from '@/components/LandmarkDetail';

const LandmarkDetail = () => {
  const search = useSearch({ from: '/game/landmark' as const } as any);
  const { proceduralData } = useGame();
  const navigate = useNavigate();
  const landmarkId = (search as any).id;
  const landmark = proceduralData.landmarks.find(l => l.id === landmarkId);

  if (!landmark) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Landmark Not Found</h1>
          <Button onClick={() => navigate({ to: '/game' as const } as any)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate({ to: '/game' as const } as any)}>Explore</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold">{landmark.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <LandmarkDetailComponent landmark={landmark} />
    </div>
  );
};

export default LandmarkDetail;