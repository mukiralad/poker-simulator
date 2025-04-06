"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type HandRanking = {
  name: string
  description: string
  example: string
  rank: number
}

const handRankings: HandRanking[] = [
  {
    name: "Royal Flush",
    description: "A, K, Q, J, 10, all of the same suit",
    example: "A♥ K♥ Q♥ J♥ 10♥",
    rank: 1,
  },
  {
    name: "Straight Flush",
    description: "Five cards in sequence, all of the same suit",
    example: "8♣ 7♣ 6♣ 5♣ 4♣",
    rank: 2,
  },
  {
    name: "Four of a Kind",
    description: "Four cards of the same rank",
    example: "Q♠ Q♥ Q♦ Q♣ 7♠",
    rank: 3,
  },
  {
    name: "Full House",
    description: "Three of a kind plus a pair",
    example: "10♥ 10♦ 10♠ 9♣ 9♥",
    rank: 4,
  },
  {
    name: "Flush",
    description: "Five cards of the same suit, not in sequence",
    example: "K♦ J♦ 8♦ 4♦ 2♦",
    rank: 5,
  },
  {
    name: "Straight",
    description: "Five cards in sequence, not all of the same suit",
    example: "Q♠ J♥ 10♦ 9♣ 8♥",
    rank: 6,
  },
  {
    name: "Three of a Kind",
    description: "Three cards of the same rank",
    example: "8♠ 8♥ 8♦ K♣ 4♥",
    rank: 7,
  },
  {
    name: "Two Pair",
    description: "Two different pairs",
    example: "A♠ A♥ J♦ J♣ 7♥",
    rank: 8,
  },
  {
    name: "One Pair",
    description: "Two cards of the same rank",
    example: "10♠ 10♥ A♦ 7♣ 2♥",
    rank: 9,
  },
  {
    name: "High Card",
    description: "When no other hand is made",
    example: "A♠ J♥ 8♦ 7♣ 3♥",
    rank: 10,
  },
]

type QuizQuestion = {
  hand1: HandRanking
  hand2: HandRanking
  correctAnswer: "hand1" | "hand2" | "tie"
}

export default function PracticePage() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(generateQuestion())

  function generateQuestion(): QuizQuestion {
    // Get two random hand rankings
    const index1 = Math.floor(Math.random() * handRankings.length)
    let index2 = Math.floor(Math.random() * handRankings.length)

    // Make sure they're different
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * handRankings.length)
    }

    const hand1 = handRankings[index1]
    const hand2 = handRankings[index2]

    let correctAnswer: "hand1" | "hand2" | "tie" = "tie"

    if (hand1.rank < hand2.rank) {
      correctAnswer = "hand1"
    } else if (hand2.rank < hand1.rank) {
      correctAnswer = "hand2"
    }

    return { hand1, hand2, correctAnswer }
  }

  function handleAnswer() {
    if (!selectedAnswer || isAnswered) return

    setIsAnswered(true)

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  function nextQuestion() {
    setSelectedAnswer(null)
    setIsAnswered(false)
    setCurrentQuestion(generateQuestion())
    setQuestionNumber(questionNumber + 1)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Practice Your Skills</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hand Ranking Quiz</CardTitle>
              <CardDescription>Which hand is stronger? Test your knowledge of poker hand rankings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Hand 1</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-xl">{currentQuestion.hand1.name}</p>
                    <p className="text-muted-foreground">{currentQuestion.hand1.description}</p>
                    <p className="mt-2 font-mono">{currentQuestion.hand1.example}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Hand 2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-xl">{currentQuestion.hand2.name}</p>
                    <p className="text-muted-foreground">{currentQuestion.hand2.description}</p>
                    <p className="mt-2 font-mono">{currentQuestion.hand2.example}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Which hand wins?</h3>
                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                  disabled={isAnswered}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hand1" id="hand1" />
                    <Label
                      htmlFor="hand1"
                      className={
                        isAnswered && currentQuestion.correctAnswer === "hand1" ? "font-bold text-green-600" : ""
                      }
                    >
                      Hand 1 ({currentQuestion.hand1.name})
                      {isAnswered && currentQuestion.correctAnswer === "hand1" && (
                        <Check className="inline ml-2 h-4 w-4 text-green-600" />
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hand2" id="hand2" />
                    <Label
                      htmlFor="hand2"
                      className={
                        isAnswered && currentQuestion.correctAnswer === "hand2" ? "font-bold text-green-600" : ""
                      }
                    >
                      Hand 2 ({currentQuestion.hand2.name})
                      {isAnswered && currentQuestion.correctAnswer === "hand2" && (
                        <Check className="inline ml-2 h-4 w-4 text-green-600" />
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tie" id="tie" />
                    <Label
                      htmlFor="tie"
                      className={
                        isAnswered && currentQuestion.correctAnswer === "tie" ? "font-bold text-green-600" : ""
                      }
                    >
                      It's a tie
                      {isAnswered && currentQuestion.correctAnswer === "tie" && (
                        <Check className="inline ml-2 h-4 w-4 text-green-600" />
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {isAnswered && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="font-medium">
                    {selectedAnswer === currentQuestion.correctAnswer ? "Correct! 👍" : "Incorrect. 😕"}
                  </p>
                  <p className="mt-2">
                    {currentQuestion.correctAnswer === "hand1"
                      ? `${currentQuestion.hand1.name} beats ${currentQuestion.hand2.name}.`
                      : currentQuestion.correctAnswer === "hand2"
                        ? `${currentQuestion.hand2.name} beats ${currentQuestion.hand1.name}.`
                        : "These hands are of equal value."}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!isAnswered ? (
                <Button onClick={handleAnswer} disabled={!selectedAnswer}>
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion}>
                  Next Question <Shuffle className="ml-2 h-4 w-4" />
                </Button>
              )}
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Question {questionNumber}</p>
                <p className="font-medium">Score: {score}</p>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hand Rankings Reference</CardTitle>
              <CardDescription>From strongest to weakest</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {handRankings.map((hand) => (
                  <li key={hand.name} className="flex items-start">
                    <span className="font-medium mr-2">{hand.rank}.</span>
                    <div>
                      <span className="font-medium">{hand.name}</span>
                      <p className="text-sm text-muted-foreground">{hand.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

