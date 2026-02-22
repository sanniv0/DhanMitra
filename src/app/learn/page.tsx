import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const learningPaths = [
  {
    id: 'investing-101',
    title: 'Investing 101: The Basics',
    content: `Investing can seem complicated, but it's really just about making your money work for you. Think of it like planting a seed. You put a small amount of money (the seed) into an investment (the soil), and over time, it grows into a bigger amount (the plant).

Key Concepts:
- **Stocks:** Owning a small piece of a company.
- **Bonds:** Loaning money to a company or government.
- **Mutual Funds:** A basket of many stocks and/or bonds. This is like buying a fruit salad instead of just one type of fruit, which spreads out your risk (diversification).
- **SIP (Systematic Investment Plan):** A way to invest a fixed amount of money regularly into mutual funds. It's like a recurring payment that builds your wealth over time.`,
  },
  {
    id: 'tax-saving',
    title: 'Tax-Saving Options',
    content: `In India, the government encourages you to save and invest by offering tax deductions on certain investments. This means you can reduce your taxable income and pay less tax.

Popular Options under Section 80C (up to Rs 1.5 lakh deduction):
- **PPF (Public Provident Fund):** A long-term, safe investment backed by the government. Lock-in period is 15 years.
- **ELSS (Equity Linked Savings Scheme):** A type of mutual fund with a shorter lock-in of 3 years. It invests in stocks, so it has higher risk but also potential for higher returns.
- **NPS (National Pension System):** A retirement-focused investment. It gives you tax benefits beyond the 80C limit as well.`,
  },
  {
    id: 'first-time-stock',
    title: 'First-Time Stock Investor Guide',
    content: `Buying your first stock is exciting! Here’s a simple guide:

1. **Open a Demat & Trading Account:** This is like a bank account for your stocks. You'll need your PAN card, Aadhaar card, and bank details.
2. **Do Your Research:** Don't just buy a stock because it's popular. Understand what the company does and its financial health. Start with large, well-known companies (often called "blue-chip" stocks).
3. **Start Small:** You don't need a lot of money to start. Invest an amount you're comfortable with losing, as stocks can be risky.
4. **Think Long-Term:** The stock market goes up and down. The key to wealth creation is to stay invested for a long time and not panic during downturns.`,
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Financial Learning Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Empower yourself with knowledge. Start your journey to financial literacy here.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {learningPaths.map((path) => (
          <AccordionItem value={path.id} key={path.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">{path.title}</AccordionTrigger>
            <AccordionContent className="text-base whitespace-pre-line text-muted-foreground">
              {path.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
