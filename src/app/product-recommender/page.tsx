'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { getProductRecommendations } from './actions';
import type { FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShoppingBag, Shield, TrendingUp, BarChart, FileText, AlertCircle } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : "Find Products"}
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

export default function ProductRecommenderPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(getProductRecommendations, initialState);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Investment Product Finder</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover investment products that match your profile and goals.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Investor Profile</CardTitle>
            <CardDescription>Help us understand your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" required />
                {state.issues?.age && <p className="text-sm text-destructive mt-1">{state.issues.age[0]}</p>}
              </div>
              <div>
                <Label htmlFor="income">Monthly Income (Rs)</Label>
                <Input id="income" name="income" type="number" required />
                {state.issues?.income && <p className="text-sm text-destructive mt-1">{state.issues.income[0]}</p>}
              </div>
              <div>
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select name="riskTolerance" required>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeHorizon">Investment Time Horizon</Label>
                <Select name="timeHorizon" required>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short-term (1-3 years)">Short-term (1-3 years)</SelectItem>
                    <SelectItem value="Medium-term (3-7 years)">Medium-term (3-7 years)</SelectItem>
                    <SelectItem value="Long-term (7+ years)">Long-term (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="financialGoals">Financial Goals</Label>
                <Textarea id="financialGoals" name="financialGoals" placeholder="e.g., Save for a car, build an emergency fund..." required />
                {state.issues?.financialGoals && <p className="text-sm text-destructive mt-1">{state.issues.financialGoals[0]}</p>}
              </div>
              <div>
                <Label htmlFor="existingInvestments">Existing Investments (Optional)</Label>
                <Textarea id="existingInvestments" name="existingInvestments" placeholder="e.g., PPF, some mutual funds..." />
              </div>
              <SubmitButton />
              {state.message && state.message !== 'success' && (
                <p className="text-sm text-destructive mt-2">{state.message}</p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {!state.data && (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8">
              <ShoppingBag className="h-16 w-16 text-accent" />
              <h3 className="mt-4 text-2xl font-bold font-headline">Find Your Perfect Match</h3>
              <p className="mt-2 text-muted-foreground">Fill out your profile to discover suitable investment products.</p>
            </Card>
          )}

          {state.data && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Recommended Products for You</CardTitle>
                </CardHeader>
              </Card>
              {state.data.recommendations.map(product => (
                <Card key={product.name}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        {getRiskIcon(product.riskLevel)}
                        {product.name}
                      </CardTitle>
                      <div className="text-right">
                        <p className="text-sm font-semibold capitalize">{product.riskLevel} Risk</p>
                      </div>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-semibold mb-1 text-secondary-foreground">Why it's suitable for you:</h4>
                      <p className="text-sm text-secondary-foreground">{product.suitabilityReason}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Pros</h4>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {product.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Cons</h4>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {product.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
