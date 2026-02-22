'use server';

import { z } from 'zod';
import { recommendInvestmentProducts } from '@/ai/flows/recommend-investment-products';
import type { RecommendInvestmentProductsOutput } from '@/ai/flows/recommend-investment-products';

const productSchema = z.object({
  age: z.coerce.number().int().min(18, 'Must be 18 or older.'),
  income: z.coerce.number().min(1, 'Please enter your monthly income.'),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']),
  financialGoals: z.string().min(10, 'Please describe your financial goals.'),
  timeHorizon: z.enum(['Short-term (1-3 years)', 'Medium-term (3-7 years)', 'Long-term (7+ years)']),
  existingInvestments: z.string().optional(),
});

export type FormState = {
  message: string;
  data?: RecommendInvestmentProductsOutput;
  issues?: any;
};

export async function getProductRecommendations(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await recommendInvestmentProducts(validatedFields.data);
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
