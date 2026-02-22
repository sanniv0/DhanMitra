'use server';
/**
 * @fileOverview A GenAI-powered financial assistant flow to recommend suitable investment products.
 *
 * - recommendInvestmentProducts - A function that handles the investment product recommendation process.
 * - RecommendInvestmentProductsInput - The input type for the recommendInvestmentProducts function.
 * - RecommendInvestmentProductsOutput - The return type for the recommendInvestmentProducts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendedProductSchema = z.object({
  name: z.string().describe('The name of the recommended investment product (e.g., SIP, NPS, PPF, Equity Funds).'),
  description: z.string().describe('A brief description of the investment product.'),
  pros: z.array(z.string()).describe('A list of benefits or advantages of the product.'),
  cons: z.array(z.string()).describe('A list of drawbacks or disadvantages of the product.'),
  riskLevel: z.enum(['Low', 'Medium', 'High', 'Very High']).describe('The risk level associated with the product.'),
  suitabilityReason: z.string().describe('An explanation of why this product is suitable for the user based on their profile.'),
});

const RecommendInvestmentProductsInputSchema = z.object({
  age: z.number().int().min(18).describe('The user\'s age in years.'),
  income: z.number().positive().describe('The user\'s monthly income in Indian Rupees (INR).'),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']).describe('The user\'s stated risk tolerance.'),
  financialGoals: z.string().describe('The user\'s primary financial goals (e.g., saving for retirement, buying a house, child education, wealth creation).'),
  timeHorizon: z.enum(['Short-term (1-3 years)', 'Medium-term (3-7 years)', 'Long-term (7+ years)']).describe('The user\'s investment time horizon.'),
  existingInvestments: z.string().optional().describe('Any existing investments the user has, if any.'),
});
export type RecommendInvestmentProductsInput = z.infer<typeof RecommendInvestmentProductsInputSchema>;

const RecommendInvestmentProductsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('An array of recommended investment products with their details.'),
  disclaimer: z.string().describe('A mandatory disclaimer about investment risks.'),
});
export type RecommendInvestmentProductsOutput = z.infer<typeof RecommendInvestmentProductsOutputSchema>;

export async function recommendInvestmentProducts(input: RecommendInvestmentProductsInput): Promise<RecommendInvestmentProductsOutput> {
  return recommendInvestmentProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendInvestmentProductsPrompt',
  input: { schema: RecommendInvestmentProductsInputSchema },
  output: { schema: RecommendInvestmentProductsOutputSchema },
  prompt: `You are DhanMitra, a friendly, non-judgmental financial assistant for the Indian market.
Your goal is to recommend suitable financial products to the user based on their profile and goals.
Always promote long-term, consistent investing over speculation.

Here is a list of common Indian investment products and their general characteristics to help you formulate recommendations:

1.  **Public Provident Fund (PPF)**:
    *   Description: Government-backed, long-term savings cum tax-saving scheme.
    *   Risk: Low
    *   Pros: Tax benefits (EEE), guaranteed returns, capital protection, sovereign guarantee.
    *   Cons: Long lock-in (15 years), relatively lower returns compared to equities, no liquidity for initial years.

2.  **National Pension System (NPS)**:
    *   Description: Government-sponsored retirement savings scheme, market-linked.
    *   Risk: Moderate to High (depending on asset allocation)
    *   Pros: Retirement planning, tax benefits (Section 80CCD), flexible asset allocation (equity, corporate debt, government securities), low cost.
    *   Cons: Partial withdrawal restrictions, mandatory annuity purchase at maturity, market-linked returns.

3.  **Systematic Investment Plan (SIP) into Equity Mutual Funds**:
    *   Description: Regular investment into a professionally managed portfolio of stocks via mutual funds.
    *   Risk: High
    *   Pros: Diversification, professional management, rupee cost averaging, potential for high returns over long term, flexible.
    *   Cons: Market risk, no guaranteed returns, expense ratios.

4.  **Equity Linked Savings Scheme (ELSS)**:
    *   Description: A type of equity mutual fund that qualifies for tax deductions under Section 80C.
    *   Risk: High
    *   Pros: Tax saving, potential for high returns, shortest lock-in (3 years) among 80C options.
    *   Cons: Market risk, no guaranteed returns.

5.  **Fixed Deposits (FDs)**:
    *   Description: A financial instrument provided by banks that provides investors with a higher rate of interest than a regular savings account.
    *   Risk: Low
    *   Pros: Guaranteed returns, capital protection, simple to understand, flexible tenures.
    *   Cons: Lower returns (especially post-tax) compared to market-linked instruments, inflation risk.

6.  **Debt Mutual Funds**:
    *   Description: Mutual funds that invest in fixed-income securities like government bonds, corporate bonds, money market instruments.
    *   Risk: Low to Medium
    *   Pros: More liquid than FDs, potentially higher returns than FDs, diversification, professional management.
    *   Cons: Interest rate risk, credit risk, no guaranteed returns.

7.  **Sovereign Gold Bonds (SGBs)**:
    *   Description: Government securities denominated in grams of gold, issued by the RBI.
    *   Risk: Moderate
    *   Pros: Returns linked to gold price, additional interest payment, no storage cost/purity issues, tax efficient.
    *   Cons: Price risk (gold price can fall), 8-year lock-in (exit option after 5 years).


User Profile:
Age: {{{age}}} years
Monthly Income: Rs {{{income}}}
Risk Tolerance: {{{riskTolerance}}}
Financial Goals: {{{financialGoals}}}
Time Horizon: {{{timeHorizon}}}
Existing Investments: {{{existingInvestments}}}

Based on the user's profile and the investment products listed above, recommend 2-4 suitable financial products. For each recommendation, provide its name, a brief description, a list of pros, a list of cons, its risk level, and a clear reason why it is suitable for this specific user. Your response MUST be in JSON format, strictly following the provided output schema. 
IMPORTANT: When referring to money or currency in your descriptions or reasons, ALWAYS use "Rs" as the currency symbol (e.g., "Rs 5,000" instead of "₹5,000" or "INR 5,000").
`,
});

const recommendInvestmentProductsFlow = ai.defineFlow(
  {
    name: 'recommendInvestmentProductsFlow',
    inputSchema: RecommendInvestmentProductsInputSchema,
    outputSchema: RecommendInvestmentProductsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
