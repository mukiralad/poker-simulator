import Link from "next/link"
import { ArrowRight, Award, BookOpen, Layers, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Poker Master</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your complete guide to learning poker from the basics to advanced strategies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learn the Rules
            </CardTitle>
            <CardDescription>
              Start with the fundamentals of poker, including game flow, betting, and basic terminology.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Poker is a card game played with a standard deck of 52 cards. The goal is to win money by capturing the
              pot, which contains bets made by various players during the hand.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/learn/rules" className="w-full">
              <Button className="w-full">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Hand Rankings
            </CardTitle>
            <CardDescription>Master the hierarchy of poker hands from high card to royal flush.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Understanding hand rankings is crucial in poker. Learn which combinations of cards beat others and how to
              quickly identify the strength of your hand.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/learn/hand-rankings" className="w-full">
              <Button className="w-full">
                View Hand Rankings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Game Variants
            </CardTitle>
            <CardDescription>
              Explore different poker variations including Texas Hold'em, Omaha, and Seven-Card Stud.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              While Texas Hold'em is the most popular poker variant, learning other games can expand your skills and
              make you a more versatile player.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/learn/variants" className="w-full">
              <Button className="w-full">
                Explore Variants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Advanced Strategy
            </CardTitle>
            <CardDescription>
              Take your game to the next level with position play, reading opponents, and calculating odds.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Once you've mastered the basics, learn advanced concepts like pot odds, expected value, and psychological
              aspects of the game.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/learn/strategy" className="w-full">
              <Button className="w-full">
                Study Strategy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

