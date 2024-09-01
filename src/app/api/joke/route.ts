import OpenAI from "openai";
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { topic, tone, jokeType, temperature } = await req.json();
    console.log('Generating joke:', { topic, tone, jokeType, temperature });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a professional comedian specializing in ${tone} ${jokeType} jokes. Make it short and funny. Max 500 characters. Do not use markdown but use newlines and if there's dialogue use markers like -`,
                },
                {
                    role: "user",
                    content: `Tell me a ${tone} ${jokeType} joke about ${topic}.`,
                },
            ],
            temperature: temperature,
        });

        console.log('Generated joke:', completion.choices[0].message.content);

        return NextResponse.json({ joke: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating joke:', error);
        return NextResponse.json({ error: 'Failed to generate joke' }, { status: 500 });
    }
}