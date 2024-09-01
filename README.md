# AI Joke Generator

Before proceeding this is my submission for week 2 encode.club AI and GPT bootcamp.

AI Joke Generator is a web application that uses OpenAI's GPT-3.5 Turbo model to generate custom jokes based on user input. Built with Next.js, TypeScript, and shadcn UI, this project demonstrates how to create an interactive AI-powered application.

## Features

- Generate jokes on any topic
- Customize joke tone
- Choose joke type
- Adjust creativity level using a temperature slider
- Responsive design with shadcn UI components

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

You will also need an OpenAI API key to use the GPT-3.5 Turbo model.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-joke-generator.git
   cd ai-joke-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Use the form to customize your joke:
    - Enter a topic
    - Choose a tone
    - Select a joke type
    - Adjust the creativity level
    - Click "Generate Joke"

4. The generated joke will appear in the display area below the form.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn UI](https://ui.shadcn.com/)
- [OpenAI API](https://openai.com/blog/openai-api)

## License

This project is licensed under the MIT License.