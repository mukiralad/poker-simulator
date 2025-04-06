import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RulesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Poker Rules</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>The Basics of Poker</CardTitle>
              <CardDescription>Understanding the fundamental concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Poker is a family of card games that combines gambling, strategy, and skill. All poker variants involve
                betting as an intrinsic part of play, and determine the winner according to the combinations of players'
                cards, at least some of which remain hidden until the end of the hand.
              </p>

              <h3 className="text-lg font-medium">The Deck</h3>
              <p>
                Poker is played with a standard deck of 52 playing cards. The cards are ranked from high to low: Ace,
                King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2. (Ace can be high or low depending on the game variant.)
              </p>

              <h3 className="text-lg font-medium">The Goal</h3>
              <p>
                The objective of poker is to win money by either:
                <br />
                1. Having the highest-ranking hand at showdown, or
                <br />
                2. Making all other players fold before the showdown.
              </p>

              <h3 className="text-lg font-medium">Game Flow</h3>
              <p>
                A typical hand of poker follows this sequence:
                <br />
                1. <strong>Blinds/Antes:</strong> Forced bets to start the action
                <br />
                2. <strong>Deal:</strong> Players receive their initial cards
                <br />
                3. <strong>Betting Rounds:</strong> Players take turns betting
                <br />
                4. <strong>Showdown:</strong> Remaining players reveal their hands
                <br />
                5. <strong>Award Pot:</strong> Winner takes the pot
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Betting in Poker</CardTitle>
              <CardDescription>Understanding how betting works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Betting is the key mechanism in poker. Players bet when they believe they have a good hand, or when they
                want to bluff and make other players think they have a good hand.
              </p>

              <h3 className="text-lg font-medium">Betting Actions</h3>
              <p>
                When it's your turn to act, you have several options:
                <br />
                <strong>Check:</strong> Pass the action to the next player (only if no one has bet yet)
                <br />
                <strong>Bet/Raise:</strong> Put chips into the pot
                <br />
                <strong>Call:</strong> Match the current bet to stay in the hand
                <br />
                <strong>Fold:</strong> Discard your hand and forfeit any chance at the current pot
              </p>

              <h3 className="text-lg font-medium">Betting Structures</h3>
              <p>
                Different poker games use different betting structures:
                <br />
                <strong>Limit:</strong> Bet sizes are fixed
                <br />
                <strong>Pot Limit:</strong> Maximum bet is the size of the pot
                <br />
                <strong>No Limit:</strong> Players can bet any amount up to all their chips
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Key Terminology</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <strong>Blinds:</strong> Forced bets posted by players to the left of the dealer button
                </li>
                <li>
                  <strong>Button:</strong> Marker that indicates the dealer position
                </li>
                <li>
                  <strong>Community Cards:</strong> Shared cards used by all players (in games like Hold'em)
                </li>
                <li>
                  <strong>Flop:</strong> The first three community cards dealt face-up
                </li>
                <li>
                  <strong>Turn:</strong> The fourth community card
                </li>
                <li>
                  <strong>River:</strong> The fifth and final community card
                </li>
                <li>
                  <strong>Pot:</strong> The total amount of money bet during a hand
                </li>
                <li>
                  <strong>All-in:</strong> Betting all of your remaining chips
                </li>
                <li>
                  <strong>Bluff:</strong> Betting with a weak hand to make opponents fold better hands
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Continue your poker education with these topics:</p>

              <div className="space-y-2">
                <Link href="/learn/hand-rankings">
                  <Button variant="outline" className="w-full justify-between">
                    Hand Rankings
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/learn/variants">
                  <Button variant="outline" className="w-full justify-between">
                    Game Variants
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/learn/strategy">
                  <Button variant="outline" className="w-full justify-between">
                    Basic Strategy
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

