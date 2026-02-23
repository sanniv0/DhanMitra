# Dhan Mitra: Your GenAI Financial Mentor

Dhan Mitra is a modern, AI-powered financial wellness platform designed for the Indian market. It empowers users with low to moderate financial literacy to make informed investing decisions through personalized guidance, interactive tools, and a simplified learning hub.

## 🌟 Key Features

- **🤖 AI Plan Generator**: Get a personalized investment roadmap based on your age, income, risk tolerance, and goals. Powered by Google Gemini and Genkit.
- **🔍 Product Finder**: Discover suitable Indian investment products (PPF, NPS, ELSS, Gold Bonds, etc.) tailored to your profile.
- **📊 SIP Calculator**: Estimate the future value of your monthly investments with interactive charts and projections.
- **🎓 Learning Hub**: A non-intimidating guide to investing basics, tax-saving options, and first-time stock investing.
- **🎯 Risk Assessment Quiz**: Understand your risk appetite through an interactive psychological profiling tool.
- **🇮🇳 Culturally Relevant**: Designed specifically for the Indian financial landscape, using standard local terminology (SIP, Rs, Lakhs) and tax laws.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI Infrastructure**: [Google Genkit](https://firebase.google.com/docs/genkit) + [Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management & Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Fire_Project_ArthaNiti
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

### Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run genkit:dev`: Starts the Genkit Developer UI for flow debugging.

## 📂 Project Structure

```text
src/
├── ai/              # AI Flow definitions and Genkit configuration
├── app/             # Next.js App Router (Pages & API Routes)
├── components/      
│   ├── features/    # Business logic components (Calculators, Quizzes)
│   ├── layout/      # App Shell, Header, Footer
│   └── ui/          # Reusable UI components (shadcn/ui boilerplate)
├── hooks/           # Custom React hooks
└── lib/             # Utilities and static data (nav-links, formatting)
```

## 🧠 AI Architecture

ArthaNiti uses **Google Genkit** to manage complex AI workflows.
- **Flows**: Encapsulated business logic for generating plans and recommendations.
- **Prompts**: Specialized instructions for the "ArthaNiti" persona, ensuring a friendly, "elder sibling" tone.
- **Validation**: Zod-based output schemas ensure the AI provides structured, reliable JSON data that the UI can render securely.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for Financial Literacy in India.
