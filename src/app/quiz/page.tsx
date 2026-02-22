import { RiskAssessmentQuiz } from '@/components/features/risk-assessment-quiz';

export default function QuizPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Risk Assessment Quiz</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover your investment style. This short quiz will help you understand your risk tolerance.
        </p>
      </div>
      <RiskAssessmentQuiz />
    </div>
  );
}
