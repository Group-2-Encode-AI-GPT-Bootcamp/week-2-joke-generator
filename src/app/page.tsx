'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const topics = [
    "Work", "People", "Animals", "Food", "Television", "Movies", "Music",
    "Technology", "Sports", "Politics", "Weather", "Travel", "Fashion",
    "Education", "Health", "Relationships", "Money", "Hobbies", "Books",
    "Social Media"
]

export default function Home() {
    const [topic, setTopic] = useState('')
    const [tone, setTone] = useState('Witty')
    const [jokeType, setJokeType] = useState('Pun')
    const [temperature, setTemperature] = useState(0.5)
    const [joke, setJoke] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!topic) {
            alert("Please select or enter a topic")
            return
        }
        setIsLoading(true)
        setJoke('')

        try {
            const response = await fetch('/api/joke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, tone, jokeType, temperature }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate joke');
            }

            const data = await response.json();
            setJoke(data.joke || 'Sorry, couldn\'t generate a joke this time.')
        } catch (error) {
            console.error('Error generating joke:', error)
            setJoke('Sorry, there was an error generating the joke. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">AI Joke Generator</h1>

            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select a topic...</option>
                    {topics.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Or type a custom topic"
                    className="w-full p-2 border rounded"
                />

                <Select onValueChange={setTone} value={tone}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Witty">Witty</SelectItem>
                        <SelectItem value="Sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="Silly">Silly</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setJokeType} value={jokeType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select joke type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pun">Pun</SelectItem>
                        <SelectItem value="Knock-Knock">Knock-Knock</SelectItem>
                        <SelectItem value="Story">Story</SelectItem>
                    </SelectContent>
                </Select>

                <div>
                    <label>Creativity Level: {temperature.toFixed(1)}</label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[temperature]}
                        onValueChange={(value) => setTemperature(value[0])}
                    />
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Joke'}
                </Button>
            </form>

            {joke && (
                <div className="mt-4 p-4 border rounded whitespace-pre-line w-full max-w-md">
                    <h2 className="text-xl font-bold mb-2">Generated Joke:</h2>
                    <p>{joke}</p>
                </div>
            )}
        </main>
    )
}