'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { getInvestmentPlan } from './actions';
import type { FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Zap, Shield, TrendingUp, BarChart, FileText, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LoadingBar } from '@/components/ui/loading-bar';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : "Generate My Plan"}
    </Button>
  );
}

const getRiskIcon = (riskLevel: string) => {
  switch (riskLevel) {
    case 'Low': return <Shield className="h-5 w-5 text-green-500" />;
    case 'Medium': return <BarChart className="h-5 w-5 text-yellow-500" />;
    case 'High':
    case 'Very High':
      return <TrendingUp className="h-5 w-5 text-red-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

export default function PlanGeneratorPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction, isPending] = useActionState(getInvestmentPlan, initialState);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Personalized Investment Plan</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Answer a few questions to get a custom investment plan generated just for you by our AI assistant.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Financial Profile</CardTitle>
            <CardDescription>Tell us about yourself to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" required />
                {state.issues?.[0] && state.issues.includes('age') && <p className="text-sm text-destructive mt-1">{state.issues.find(i => i.toLowerCase().includes('age'))}</p>}
              </div>
              <div>
                <Label htmlFor="annualIncome">Annual Income (Rs)</Label>
                <Input id="annualIncome" name="annualIncome" type="number" placeholder="e.g., 800000" required />
                {state.issues?.[0] && state.issues.includes('annualIncome') && <p className="text-sm text-destructive mt-1">{state.issues.find(i => i.toLowerCase().includes('income'))}</p>}
              </div>
              <div>
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select name="riskTolerance" required>
                  <SelectTrigger id="riskTolerance">
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
                {state.issues?.[0] && state.issues.includes('riskTolerance') && <p className="text-sm text-destructive mt-1">{state.issues.find(i => i.toLowerCase().includes('risk'))}</p>}
              </div>
              <div>
                <Label htmlFor="financialGoals">Financial Goals</Label>
                <Textarea id="financialGoals" name="financialGoals" placeholder="e.g., Save for a house down payment in 5 years, retirement planning..." required />
                {state.issues?.[0] && state.issues.includes('financialGoals') && <p className="text-sm text-destructive mt-1">{state.issues.find(i => i.toLowerCase().includes('goals'))}</p>}
              </div>
              <SubmitButton />
              {state.message && state.message !== 'success' && (
                <p className="text-sm text-destructive mt-2">{state.message}</p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {isPending && (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="w-full max-w-md mx-auto">
                <h3 className="text-2xl font-bold font-headline mb-4 text-primary">Analyzing Your Profile</h3>
                <p className="text-muted-foreground mb-8 text-lg">Dhan Mitra is crafting your personalized investment roadmap...</p>
                <LoadingBar message="Generating your plan..." />
              </div>
            </Card>
          )}

          {!isPending && !state.data && (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8">
              <Zap className="h-16 w-16 text-accent mb-4" />
              <h3 className="text-2xl font-bold font-headline">Your AI-Powered Plan Awaits</h3>
              <p className="mt-2 text-muted-foreground">Fill out your profile to generate your personalized investment roadmap.</p>
            </Card>
          )}

          {state.data && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Your Personalized Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{state.data.riskProfile}</p>
                  <p className="mt-2 text-muted-foreground">{state.data.planSummary}</p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="font-headline text-xl font-semibold">Recommended Portfolio</h3>
                {state.data.recommendedProducts.map((product: any) => (
                  <Card key={product.name}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {getRiskIcon(product.riskLevel)}
                            {product.name}
                          </CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{product.allocationPercentage}%</p>
                          <p className="text-sm text-muted-foreground">Allocation</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={product.allocationPercentage} className="h-2 mb-4" />
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold mb-1">Pros</h4>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {product.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Cons</h4>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {product.cons.map((con: string, i: number) => <li key={i}>{con}</li>)}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                    {state.data.nextSteps.map((step: string, i: number) => <li key={i}>{step}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Disclaimer</AlertTitle>
                <AlertDescription>{state.data.disclaimer}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
