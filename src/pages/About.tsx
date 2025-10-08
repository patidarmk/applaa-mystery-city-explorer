import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            NeoCity Mysteries is an immersive web game where players uncover the secrets of a futuristic city through exploration, puzzles, and discovery. Our goal is to blend adventure gaming with procedural generation for endless replayability.
          </p>
          <p className="text-gray-600">
            Founded in 2024, we aim to create engaging experiences that challenge the mind and spark curiosity. Whether solving riddles or hunting hidden treasures, every playthrough reveals something new.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Our Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Alex Rivera", role: "Lead Developer", bio: "Passionate about procedural generation and React." },
              { name: "Jordan Lee", role: "Game Designer", bio: "Creates engaging puzzles and narratives." },
              { name: "Taylor Kim", role: "UI/UX Designer", bio: "Focuses on intuitive and beautiful interfaces." }
            ].map((member, i) => (
              <div key={i} className="text-center border rounded-lg p-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xl font-bold">{member.name[0]}</span>
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">{member.bio}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;