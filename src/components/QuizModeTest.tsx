import { useState, useEffect } from 'react';
import { ArrowLeft, Timer, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface QuizModeTestProps {
  onBack: () => void;
}

const sampleQuestions = [
  {
    question: 'What does "Bonjour" mean?',
    options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
    correct: 1,
  },
  {
    question: 'What does "Gracias" mean?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correct: 2,
  },
  {
    question: 'What is photosynthesis?',
    options: [
      'Breaking down food',
      'Converting light to chemical energy',
      'Cell division',
      'Breathing process',
    ],
    correct: 1,
  },
];

export function QuizModeTest({ onBack }: QuizModeTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = sampleQuestions[currentIndex];

  useEffect(() => {
    if (answered || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answered]);

  const handleTimeout = () => {
    setAnswered(true);
    toast.error('Time\'s up! ⏰');
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === currentQuestion.correct) {
      const xp = 10 + Math.floor(timeLeft / 3); // Bonus XP for speed
      setScore(prev => prev + xp);
      toast.success(`Correct! +${xp} XP 🎉`);
    } else {
      toast.error('Wrong answer 😔');
    }
  };

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(30);
    } else {
      toast.success(`Quiz complete! Total: ${score} XP 🏆`);
      setTimeout(() => onBack(), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-gray-900">Timed Quiz</h2>
          <p className="text-sm text-gray-500">
            Question {currentIndex + 1} of {sampleQuestions.length}
          </p>
        </div>
        <div className="text-purple-600">
          {score} XP
        </div>
      </div>

      {/* Timer */}
      <Card className={`p-4 rounded-2xl ${timeLeft <= 10 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`} />
            <span className="text-gray-700">Time Remaining</span>
          </div>
          <span className={`${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
            {timeLeft}s
          </span>
        </div>
        <Progress 
          value={(timeLeft / 30) * 100} 
          className="h-2"
        />
      </Card>

      {/* Question */}
      <div className="flex-1 space-y-4">
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <p className="text-gray-900">{currentQuestion.question}</p>
        </Card>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correct;
            const isSelected = selectedAnswer === index;
            
            let buttonClass = 'bg-white border-gray-200 hover:bg-gray-50';
            
            if (answered) {
              if (isCorrect) {
                buttonClass = 'bg-green-100 border-green-300 text-green-700';
              } else if (isSelected && !isCorrect) {
                buttonClass = 'bg-red-100 border-red-300 text-red-700';
              }
            } else if (isSelected) {
              buttonClass = 'bg-purple-100 border-purple-300';
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="outline"
                className={`w-full h-auto py-4 rounded-xl text-left justify-start ${buttonClass} transition-all`}
                disabled={answered}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    answered && isCorrect ? 'bg-green-600' : 
                    answered && isSelected && !isCorrect ? 'bg-red-600' : 
                    'bg-gray-200'
                  }`}>
                    {answered && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                    {answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                    {!answered && <span className="text-gray-600">{String.fromCharCode(65 + index)}</span>}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      {answered && (
        <Button 
          onClick={handleNext}
          className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl h-12"
        >
          {currentIndex < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      )}
    </div>
  );
}
