'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating personalized investment plans.
 *
 * - generatePersonalizedInvestmentPlan - A function that generates a personalized investment plan.
 * - PersonalizedInvestmentPlanInput - The input type for the generatePersonalizedInvestmentPlan function.
 * - PersonalizedInvestmentPlanOutput - The return type for the generatePersonalizedInvestmentPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedInvestmentPlanInputSchema = z.object({
  age: z.number().int().min(18).describe('The age of the user in years.'),
  annualIncome: z.number().min(0).describe('The user\'s annual income in Indian Rupees (INR).'),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']).describe('The user\'s risk appetite for investments.'),
  financialGoals: z.string().describe('A clear description of the user\'s financial goals (e.g., "saving for a house down payment", "child\'s higher education", "retirement planning").'),
});
export type PersonalizedInvestmentPlanInput = z.infer<typeof PersonalizedInvestmentPlanInputSchema>;

const RecommendedProductSchema = z.object({
  name: z.string().describe('The name of the recommended investment product (e.g., "Equity Mutual Fund SIP", "Public Provident Fund (PPF)", "Fixed Deposit").'),
  description: z.string().describe('A brief, easy-to-understand description of the investment product.'),
  allocationPercentage: z.number().min(0).max(100).describe('The suggested percentage of the investment portfolio to allocate to this product.'),
  pros: z.array(z.string()).describe('List of advantages of this investment product.'),
  cons: z.array(z.string()).describe('List of disadvantages or risks associated with this investment product.'),
  riskLevel: z.enum(['Low', 'Medium', 'High', 'Very High']).describe('The risk level associated with this investment product.'),
});

const PersonalizedInvestmentPlanOutputSchema = z.object({
  planSummary: z.string().describe('An overall summary of the personalized investment plan, presented in a friendly and encouraging tone.'),
  riskProfile: z.string().describe('The user\'s assessed risk profile, considering their inputs (e.g., "Based on your inputs, your risk profile is Moderate.").'),
  recommendedProducts: z.array(RecommendedProductSchema).describe('A list of recommended investment products with details for each.'),
  nextSteps: z.array(z.string()).describe('Clear, actionable next steps for the user to begin implementing their plan.'),
  disclaimer: z.string().describe('A mandatory disclaimer stating that investments are subject to market risks and to consult a financial advisor.'),
});
export type PersonalizedInvestmentPlanOutput = z.infer<typeof PersonalizedInvestmentPlanOutputSchema>;

const generatePersonalizedInvestmentPlanPrompt = ai.definePrompt({
  name: 'generatePersonalizedInvestmentPlanPrompt',
  input: { schema: PersonalizedInvestmentPlanInputSchema },
  output: { schema: PersonalizedInvestmentPlanOutputSchema },
  prompt: `You are DhanMitra, a friendly, patient, and non-judgmental financial assistant specifically designed for the Indian market. Your goal is to help individuals with low to moderate financial literacy make better, more informed investing decisions. You simplify complex financial concepts and guide users towards suitable investment products based on their profile.\n\nBased on the following user details, generate a personalized, easy-to-understand investment plan. Focus on culturally relevant investment options for India and avoid jargon. Break down complex topics into plain language.\n\nUser Profile:
Age: {{{age}}} years
Annual Income: Rs {{{annualIncome}}}
Risk Tolerance: {{{riskTolerance}}}
Financial Goals: {{{financialGoals}}}
{{#if dependents}}Dependents: {{{dependents}}}
{{/if}}{{#if debt}}Debt: Rs {{{debt}}}
{{/if}}
Your plan should include:
1. An overall plan summary in a friendly and encouraging tone.
2. The user's assessed risk profile based on their inputs.
3. A list of 3-5 recommended investment products relevant to the Indian market (e.g., SIPs, NPS, PPF, ELSS, gold, LIC policies, equity/debt mutual funds, fixed deposits). For each product, provide:
    - Its name
    - A brief, easy-to-understand description.
    - A suggested allocation percentage (summing up to 100% across all recommended products if applicable, or indicating relative importance).
    - A list of pros.
    - A list of cons/risks.
    - Its risk level (Low, Medium, High, Very High).
4. Clear, actionable next steps for the user.
5. A mandatory disclaimer stating that investments are subject to market risks and to consult a financial advisor.

IMPORTANT: When referring to money or currency anywhere in your output, ALWAYS use "Rs" as the currency symbol (e.g., "Rs 50,000" instead of "₹50,000" or "INR 50,000").
`,
});

const generatePersonalizedInvestmentPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedInvestmentPlanFlow',
    inputSchema: PersonalizedInvestmentPlanInputSchema,
    outputSchema: PersonalizedInvestmentPlanOutputSchema,
  },
  async (input) => {
    const { output } = await generatePersonalizedInvestmentPlanPrompt(input);
    return output!;
  }
);

export async function generatePersonalizedInvestmentPlan(
  input: PersonalizedInvestmentPlanInput
): Promise<PersonalizedInvestmentPlanOutput> {
  return generatePersonalizedInvestmentPlanFlow(input);
}
