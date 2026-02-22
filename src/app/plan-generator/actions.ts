'use server';

import { z } from 'zod';
import { generatePersonalizedInvestmentPlan } from '@/ai/flows/generate-personalized-investment-plan-flow';
import type { PersonalizedInvestmentPlanOutput } from '@/ai/flows/generate-personalized-investment-plan-flow';

const planSchema = z.object({
  age: z.coerce.number().int().min(18, 'Must be 18 or older.'),
  annualIncome: z.coerce.number().min(1, 'Please enter your annual income.'),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']),
  financialGoals: z.string().min(10, 'Please describe your financial goals in a bit more detail.'),
});

export type FormState = {
  message: string;
  data?: PersonalizedInvestmentPlanOutput;
  issues?: string[];
};

export async function getInvestmentPlan(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = planSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      issues: Object.values(validatedFields.error.flatten().fieldErrors).flat() as string[],
    };
  }

  try {
    const result = await generatePersonalizedInvestmentPlan(validatedFields.data);
    return {
      message: 'success',
      data: result,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'An unexpected error occurred on the server. Please try again.',
    };
  }
}
