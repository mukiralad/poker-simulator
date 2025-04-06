"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, Brain, Coins, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PokerTable } from "@/components/poker-table"

export default function PlayPage() {
  const [difficulty, setDifficulty] = useState("beginner")
  const [chips, setChips] = useState(1000)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [gamesWon, setGamesWon] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [bigBlind, setBigBlind] = useState(10)
  const [opponents, setOpponents] = useState(3)

  // Start a new game
  const startGame = () => {
    setIsGameActive(true)
  }

  // When a game ends
  const handleGameEnd = (result: { won: boolean; chipsWon: number }) => {
    setGamesPlayed(gamesPlayed + 1)
    if (result.won) {
      setGamesWon(gamesWon + 1)
    }
    setChips(chips + result.chipsWon)
    setIsGameActive(false)
  }

  // Reset stats
  const resetStats = () => {
    setChips(1000)
    setGamesPlayed(0)
    setGamesWon(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Play Poker</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to Play</DialogTitle>
              <DialogDescription>
                Play Texas Hold'em poker against AI opponents to practice your skills.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>
                <strong>Game Flow:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>You'll be dealt two private cards (hole cards)</li>
                <li>The flop (3 community cards) will be dealt</li>
                <li>The turn (4th community card) will be dealt</li>
                <li>The river (5th community card) will be dealt</li>
                <li>The best 5-card hand wins the pot</li>
              </ol>
              <p>
                <strong>Actions:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Check: Pass the action to the next player (if no one has bet)</li>
                <li>Bet/Raise: Put chips into the pot</li>
                <li>Call: Match the current bet to stay in the hand</li>
                <li>Fold: Discard your hand and forfeit any chance at the current pot</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {isGameActive ? (
            <PokerTable
              difficulty={difficulty}
              opponents={opponents}
              bigBlind={bigBlind}
              startingChips={chips}
              onGameEnd={handleGameEnd}
            />
          ) : (
            <Card className="h-full flex flex-col bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Start a New Game</CardTitle>
                <CardDescription>Configure your game settings and start playing against AI opponents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Difficulty Level</h3>
                  <Tabs defaultValue={difficulty} onValueChange={setDifficulty} className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="beginner">Beginner</TabsTrigger>
                      <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="text-sm text-muted-foreground mt-2">
                    {difficulty === "beginner"
                      ? "AI opponents play straightforward and make obvious mistakes."
                      : difficulty === "intermediate"
                        ? "AI opponents understand basic strategy and make fewer mistakes."
                        : "AI opponents play solid poker with advanced concepts."}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Number of Opponents</h3>
                    <span className="text-sm font-medium">{opponents}</span>
                  </div>
                  <Slider
                    value={[opponents]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => setOpponents(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 (Heads-up)</span>
                    <span>5 (Full table)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Big Blind</h3>
                    <span className="text-sm font-medium">{bigBlind} chips</span>
                  </div>
                  <Slider
                    value={[bigBlind]}
                    min={2}
                    max={50}
                    step={2}
                    onValueChange={(value) => setBigBlind(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small: {bigBlind / 2}</span>
                    <span>Big: {bigBlind}</span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Brain className="mr-2 h-4 w-4" />
                    AI Difficulty Explained
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Beginner AI:</strong> Makes basic decisions based on hand strength alone. Will often call
                      too much and rarely bluffs.
                    </p>
                    <p>
                      <strong>Intermediate AI:</strong> Considers position, pot odds, and basic hand reading.
                      Occasionally bluffs and can make strategic folds.
                    </p>
                    <p>
                      <strong>Advanced AI:</strong> Uses complex strategies including balanced ranges, exploitative
                      adjustments, and sophisticated bluffing. Pays attention to your betting patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={startGame} className="w-full text-lg py-6" size="lg">
                  <Coins className="mr-2 h-5 w-5" />
                  Start Game
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="mr-2 h-5 w-5" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Chips</p>
                  <p className="text-2xl font-bold">{chips}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Games Played</p>
                  <p className="text-2xl font-bold">{gamesPlayed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Games Won</p>
                  <p className="text-2xl font-bold">{gamesWon}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold">
                    {gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={resetStats} className="w-full">
                Reset Stats
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Hand Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ol className="space-y-1">
                <li>1. Royal Flush</li>
                <li>2. Straight Flush</li>
                <li>3. Four of a Kind</li>
                <li>4. Full House</li>
                <li>5. Flush</li>
                <li>6. Straight</li>
                <li>7. Three of a Kind</li>
                <li>8. Two Pair</li>
                <li>9. One Pair</li>
                <li>10. High Card</li>
              </ol>
            </CardContent>
            <CardFooter>
              <Link href="/learn/hand-rankings" className="w-full">
                <Button variant="link" className="w-full">
                  View Detailed Rankings
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

