import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface CreateFlashcardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCard: (card: {
    front: string;
    back: string;
    nextReview: Date;
    category: string;
  }) => void;
}

export function CreateFlashcardDialog({ open, onOpenChange, onCreateCard }: CreateFlashcardDialogProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [category, setCategory] = useState('General');
  const [reviewInterval, setReviewInterval] = useState('auto');

  const handleCreate = () => {
    if (!front.trim() || !back.trim()) {
      toast.error('Please fill in both sides of the card');
      return;
    }

    let nextReview = new Date();
    switch (reviewInterval) {
      case '1h':
        nextReview = new Date(Date.now() + 60 * 60 * 1000);
        break;
      case '1d':
        nextReview = new Date(Date.now() + 24 * 60 * 60 * 1000);
        break;
      case '3d':
        nextReview = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        break;
      default:
        nextReview = new Date(Date.now() + 2 * 60 * 60 * 1000);
    }

    onCreateCard({
      front,
      back,
      nextReview,
      category,
    });

    toast.success('Flashcard created successfully! 🎉');
    setFront('');
    setBack('');
    setCategory('General');
    setReviewInterval('auto');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] rounded-3xl">
        <DialogHeader>
          <DialogTitle>Create New Flashcard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="front">Front (Question)</Label>
            <Input
              id="front"
              placeholder="Enter the question or term"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="back">Back (Answer)</Label>
            <Textarea
              id="back"
              placeholder="Enter the answer or explanation"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="rounded-xl min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., French, Biology, History"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Next Review</Label>
            <Select value={reviewInterval} onValueChange={setReviewInterval}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (AI suggested)</SelectItem>
                <SelectItem value="1h">In 1 hour</SelectItem>
                <SelectItem value="1d">In 1 day</SelectItem>
                <SelectItem value="3d">In 3 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleCreate}
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl h-12"
          >
            Create Flashcard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
