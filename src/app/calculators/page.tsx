import { SipCalculator } from '@/components/features/sip-calculator';

export default function CalculatorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Investment Calculators</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Plan for your financial goals with these simple tools.
        </p>
      </div>
      <SipCalculator />
    </div>
  );
}
