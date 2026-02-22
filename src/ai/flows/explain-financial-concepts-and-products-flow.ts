'use server';
/**
 * @fileOverview A financial explainer AI agent for Indian market.
 *
 * - explainFinancialConceptsAndProducts - A function that explains financial concepts and products.
 * - ExplainFinancialConceptsInput - The input type for the explainFinancialConceptsAndProducts function.
 * - ExplainFinancialConceptsOutput - The return type for the explainFinancialConceptsAndProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainFinancialConceptsInputSchema = z.object({
  question: z.string().describe('The user\'s financial question.'),
  preferredLanguage: z
    .string()
    .optional()
    .describe(
      'Optional: The preferred Indian language for the response (e.g., "Hindi", "Tamil", "Bengali"). Defaults to English if not provided.'
    ),
});
export type ExplainFinancialConceptsInput = z.infer<
  typeof ExplainFinancialConceptsInputSchema
>;

const ExplainFinancialConceptsOutputSchema = z.object({
  explanation: z.string().describe('A clear, jargon-free explanation of the financial concept or product.'),
  followUpQuestions: z
    .array(z.string())
    .optional()
    .describe(
      'Optional: A list of clarifying follow-up questions to help understand the user\'s needs better.'
    ),
  language: z.string().describe('The language used for the explanation (e.g., "English", "Hindi").'),
});
export type ExplainFinancialConceptsOutput = z.infer<
  typeof ExplainFinancialConceptsOutputSchema
>;

export async function explainFinancialConceptsAndProducts(
  input: ExplainFinancialConceptsInput
): Promise<ExplainFinancialConceptsOutput> {
  return explainFinancialConceptsAndProductsFlow(input);
}

const explainFinancialConceptsPrompt = ai.definePrompt({
  name: 'explainFinancialConceptsPrompt',
  input: {schema: ExplainFinancialConceptsInputSchema},
  output: {schema: ExplainFinancialConceptsOutputSchema},
  prompt: `You are DhanMitra, a friendly, patient, and non-judgmental financial assistant specifically for the Indian market.
Your goal is to explain financial concepts, products, and tax-saving options in a clear, jargon-free manner, as if you are a financially savvy elder sibling or mentor.

Keep the tone reassuring and empathetic. Provide culturally relevant explanations where appropriate (e.g., mentioning gold investing, LIC policies).

If the user's question is vague or could benefit from more context, ask 1-3 relevant follow-up questions to clarify their goals (e.g., "Are you saving for something specific, like a house or your child’s education?").

Respond in {{{preferredLanguage}}} if specified, otherwise respond in English.

User's Question: "{{{question}}}"
`,
});

const explainFinancialConceptsAndProductsFlow = ai.defineFlow(
  {
    name: 'explainFinancialConceptsAndProductsFlow',
    inputSchema: ExplainFinancialConceptsInputSchema,
    outputSchema: ExplainFinancialConceptsOutputSchema,
  },
  async input => {
    const {output} = await explainFinancialConceptsPrompt(input);
    return output!;
  }
);
