import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VariantsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Poker Variants</h1>
      </div>

      <p className="text-lg mb-8">
        There are many different variations of poker, each with its own rules and strategies. Here are some of the most
        popular poker variants:
      </p>

      <Tabs defaultValue="holdem" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="holdem">Texas Hold'em</TabsTrigger>
          <TabsTrigger value="omaha">Omaha</TabsTrigger>
          <TabsTrigger value="seven-card">Seven-Card Stud</TabsTrigger>
        </TabsList>
        <TabsContent value="holdem">
          <Card>
            <CardHeader>
              <CardTitle>Texas Hold'em</CardTitle>
              <CardDescription>The most popular poker variant worldwide</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">How to Play</h3>
              <p>
                In Texas Hold'em, each player is dealt two private cards (known as "hole cards") that belong to them
                alone. Five community cards are dealt face-up on the "board". All players use their two hole cards and
                the five community cards to make their best five-card poker hand.
              </p>

              <h3 className="text-lg font-medium">Game Flow</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Blinds:</strong> The player to the left of the dealer posts the small blind, and the next
                  player posts the big blind.
                </li>
                <li>
                  <strong>Pre-Flop:</strong> Each player is dealt two hole cards. A round of betting occurs.
                </li>
                <li>
                  <strong>Flop:</strong> Three community cards are dealt face-up. Another round of betting occurs.
                </li>
                <li>
                  <strong>Turn:</strong> A fourth community card is dealt face-up. Another round of betting occurs.
                </li>
                <li>
                  <strong>River:</strong> A fifth and final community card is dealt face-up. A final round of betting
                  occurs.
                </li>
                <li>
                  <strong>Showdown:</strong> If more than one player remains, cards are shown and the player with the
                  best five-card hand wins.
                </li>
              </ol>

              <h3 className="text-lg font-medium">Key Strategy Points</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Position is extremely important in Texas Hold'em</li>
                <li>Starting hand selection is crucial</li>
                <li>Pay attention to the community cards and how they might help your opponents' hands</li>
                <li>Bet sizing and timing tells can reveal a lot about your opponents' hands</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="omaha">
          <Card>
            <CardHeader>
              <CardTitle>Omaha</CardTitle>
              <CardDescription>A game of the nuts and big draws</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">How to Play</h3>
              <p>
                In Omaha, each player is dealt four private cards. Five community cards are dealt face-up on the board.
                Each player must use exactly two of their hole cards and three of the community cards to make their best
                five-card poker hand.
              </p>

              <h3 className="text-lg font-medium">Game Flow</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Blinds:</strong> Similar to Texas Hold'em, with small and big blinds.
                </li>
                <li>
                  <strong>Pre-Flop:</strong> Each player is dealt four hole cards. A round of betting occurs.
                </li>
                <li>
                  <strong>Flop, Turn, River:</strong> Same as Texas Hold'em, with community cards and betting rounds.
                </li>
                <li>
                  <strong>Showdown:</strong> Players must use exactly two hole cards and three community cards.
                </li>
              </ol>

              <h3 className="text-lg font-medium">Key Strategy Points</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  The "must use two" rule is critical - many beginners make the mistake of not following this rule
                </li>
                <li>Starting hands with coordinated cards (cards that work well together) are more valuable</li>
                <li>Draws are more powerful in Omaha due to having four hole cards</li>
                <li>The best possible hand (the "nuts") changes more frequently in Omaha than in Hold'em</li>
              </ul>

              <h3 className="text-lg font-medium">Variants</h3>
              <p>
                <strong>Pot-Limit Omaha (PLO):</strong> The most common form of Omaha, where the maximum bet is the size
                of the pot.
                <br />
                <strong>Omaha Hi-Lo:</strong> The pot is split between the highest and lowest qualifying hands.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seven-card">
          <Card>
            <CardHeader>
              <CardTitle>Seven-Card Stud</CardTitle>
              <CardDescription>A classic poker variant that predates Hold'em</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">How to Play</h3>
              <p>
                In Seven-Card Stud, each player is dealt seven cards throughout the hand, three face-down and four
                face-up. Players must make the best five-card poker hand from their seven cards.
              </p>

              <h3 className="text-lg font-medium">Game Flow</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Ante:</strong> Each player posts an ante before the hand begins.
                </li>
                <li>
                  <strong>Third Street:</strong> Each player is dealt two cards face-down and one card face-up. The
                  player with the lowest face-up card brings in the betting.
                </li>
                <li>
                  <strong>Fourth Street:</strong> Each player receives another face-up card. Betting begins with the
                  player showing the highest-value face-up cards.
                </li>
                <li>
                  <strong>Fifth Street:</strong> Each player receives another face-up card, followed by betting.
                </li>
                <li>
                  <strong>Sixth Street:</strong> Each player receives another face-up card, followed by betting.
                </li>
                <li>
                  <strong>Seventh Street (River):</strong> Each player receives a final card face-down, followed by the
                  final betting round.
                </li>
                <li>
                  <strong>Showdown:</strong> Remaining players show their cards, and the best five-card hand wins.
                </li>
              </ol>

              <h3 className="text-lg font-medium">Key Strategy Points</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Memory is important - remember which cards have been folded</li>
                <li>Pay attention to your opponents' exposed cards</li>
                <li>Starting hand selection is different from Hold'em - connected cards and pairs are valuable</li>
                <li>Position is less important than in Hold'em, but still matters</li>
              </ul>

              <h3 className="text-lg font-medium">Variants</h3>
              <p>
                <strong>Seven-Card Stud Hi-Lo:</strong> The pot is split between the highest and lowest qualifying
                hands.
                <br />
                <strong>Razz:</strong> A lowball variant where the lowest hand wins.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

