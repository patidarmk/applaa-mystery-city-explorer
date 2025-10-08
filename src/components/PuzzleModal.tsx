import React, { useState, useEffect } from 'react';
import { puzzles, type Puzzle } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Clock } from 'lucide-react';

interface PuzzleModalProps {
  puzzleId: number;
  onSolve?: () => void;
}

export default function PuzzleModal({ puzzleId, onSolve }: PuzzleModalProps) {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const puzzle = puzzles.find(p => p.id === puzzleId);
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [solved, setSolved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (puzzle?.type === 'timed' && state.timeLeft) {
      const timer = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
      return () => clearInterval(timer);
    }
  }, [state.timeLeft, dispatch, puzzle]);

  const handleSubmit = () => {
    const userAnswer = puzzle?.type === 'riddle' ? answer.toLowerCase() : selectedOption;
    if (userAnswer === puzzle?.answer.toLowerCase()) {
      dispatch({ type: 'SOLVE_PUZZLE', puzzleId });
      setSolved(true);
      toast({ title: "Correct!" });
      onSolve?.();
      setShowModal(false);
    } else {
      toast({ title: "Wrong! Try again.", variant: "destructive" });
    }
  };

  if (!puzzle) return null;

  const isDisabled = solved || Boolean(puzzle.timeLimit && (!state.timeLeft || state.timeLeft <= 0));

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button>Solve Puzzle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {puzzle.question}
            {puzzle.timeLimit && <Clock className="h-4 w-4" />}
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>{puzzle.type.toUpperCase()} Challenge</CardTitle>
            {puzzle.hint && <p className="text-sm text-gray-500">Hint: {puzzle.hint}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            {puzzle.type === 'riddle' ? (
              <Input
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            ) : (
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  {puzzle.options?.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {puzzle.timeLimit && (
              <div className="text-center text-lg font-bold">
                Time: {state.timeLeft || puzzle.timeLimit}s
              </div>
            )}
            <Button onClick={handleSubmit} disabled={isDisabled}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}