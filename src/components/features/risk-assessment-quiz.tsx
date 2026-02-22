'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Shield, Rabbit, Turtle } from 'lucide-react';

type Question = {
  id: number;
  text: string;
  options: { text: string; value: number }[];
};

const quizQuestions: Question[] = [
  {
    id: 1,
    text: 'You have some extra money. What are you most likely to do with it?',
    options: [
      { text: 'Put it in a safe fixed deposit', value: 1 },
      { text: 'Invest in a mix of stocks and bonds', value: 2 },
      { text: 'Invest in high-growth stocks', value: 3 },
    ],
  },
  {
    id: 2,
    text: 'Imagine the stock market drops 20%. How do you feel?',
    options: [
      { text: 'Anxious. I would likely sell my investments.', value: 1 },
      { text: 'Concerned, but I would hold on.', value: 2 },
      { text: 'Excited. It\'s a buying opportunity!', value: 3 },
    ],
  },
  {
    id: 3,
    text: 'What is your primary goal for this investment?',
    options: [
      { text: 'Preserve my capital and avoid losses.', value: 1 },
      { text: 'Generate some income with low risk.', value: 2 },
      { text: 'Achieve significant long-term growth, accepting some risk.', value: 3 },
    ],
  },
];

type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export function RiskAssessmentQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<RiskProfile | null>(null);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
    if (totalScore <= 4) {
      setResult('Conservative');
    } else if (totalScore <= 7) {
      setResult('Moderate');
    } else {
      setResult('Aggressive');
    }
  };
  
  const resetQuiz = () => {
    setAnswers({});
    setResult(null);
  };
  
  if (result) {
    const profiles = {
        Conservative: {
            icon: <Turtle className="w-16 h-16 text-primary" />,
            description: "You prefer safety and capital preservation. You're comfortable with lower, but more predictable returns."
        },
        Moderate: {
            icon: <Shield className="w-16 h-16 text-primary" />,
            description: "You're willing to take on some risk for better returns, but still value a balanced approach to investing."
        },
        Aggressive: {
            icon: <Rabbit className="w-16 h-16 text-primary" />,
            description: "You are comfortable with higher risk for the potential of high returns. You understand that markets can be volatile."
        }
    }
    return (
      <Card>
        <CardHeader className="items-center text-center p-8">
            {profiles[result].icon}
            <CardTitle className="text-3xl font-headline mt-4">Your Risk Profile is: {result}</CardTitle>
            <CardDescription className="text-base max-w-md mt-2">{profiles[result].description}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center pt-0 pb-8">
          <Button onClick={resetQuiz}>Take Quiz Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Answer the following questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {quizQuestions.map((q) => (
          <div key={q.id}>
            <p className="font-semibold mb-2">{q.id}. {q.text}</p>
            <RadioGroup onValueChange={(value) => handleAnswerChange(q.id, value)}>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <div className="flex items-center space-x-2" key={opt.value}>
                    <RadioGroupItem value={String(opt.value)} id={`q${q.id}-opt${opt.value}`} />
                    <Label htmlFor={`q${q.id}-opt${opt.value}`}>{opt.text}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={calculateResult} disabled={Object.keys(answers).length !== quizQuestions.length}>
          See My Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
