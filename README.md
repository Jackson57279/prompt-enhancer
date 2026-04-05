# Prompt Enhancer

A Next.js application that transforms project ideas into detailed, professional prompts for web development using AI.

## Setup

1. Copy the environment file:

```bash
cp .env.example .env.local
```

2. Add your OpenRouter API key to `.env.local`:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Get your API key from: https://openrouter.ai/keys

**Note:** The API key is stored server-side only and never exposed to the browser.

## Development

```bash
npm install
npm run dev
```

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
