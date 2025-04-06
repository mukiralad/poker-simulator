import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HandRankingsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Poker Hand Rankings</h1>
      </div>

      <p className="text-lg mb-8">
        In poker, hands are ranked in order from highest to lowest. The player with the highest-ranking hand wins the
        pot. Here are the standard poker hand rankings from highest to lowest:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Royal Flush</CardTitle>
            <CardDescription>The best possible hand in poker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Royal Flush: A, K, Q, J, 10 of the same suit"
                fill
                className="object-cover"
              />
            </div>
            <p>
              A royal flush consists of A, K, Q, J, 10, all of the same suit. This is the highest possible hand in
              standard poker. All royal flushes are equal in rank.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Straight Flush</CardTitle>
            <CardDescription>Five sequential cards of the same suit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Straight Flush: Five sequential cards of the same suit"
                fill
                className="object-cover"
              />
            </div>
            <p>
              A straight flush consists of five cards of the same suit in sequence, such as 7♥, 6♥, 5♥, 4♥, 3♥. The
              highest card determines the rank of the straight flush.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Four of a Kind</CardTitle>
            <CardDescription>Four cards of the same rank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Four of a Kind: Four cards of the same rank"
                fill
                className="object-cover"
              />
            </div>
            <p>
              Four of a kind consists of four cards of the same rank, such as 9♠, 9♥, 9♦, 9♣. The fifth card, known as
              the kicker, can be any card. Higher-ranked four of a kind beats lower-ranked ones.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Full House</CardTitle>
            <CardDescription>Three of a kind plus a pair</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Full House: Three of a kind plus a pair"
                fill
                className="object-cover"
              />
            </div>
            <p>
              A full house consists of three cards of one rank and two cards of another rank, such as Q♠, Q♥, Q♦, 6♠,
              6♥. It's often described as "threes over pairs" (e.g., "queens over sixes").
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flush</CardTitle>
            <CardDescription>Five cards of the same suit, not in sequence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Flush: Five cards of the same suit, not in sequence"
                fill
                className="object-cover"
              />
            </div>
            <p>
              A flush consists of five cards of the same suit, not in sequence, such as K♠, J♠, 8♠, 4♠, 3♠. The highest
              card determines the rank of the flush.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Straight</CardTitle>
            <CardDescription>Five sequential cards of mixed suits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Straight: Five sequential cards of mixed suits"
                fill
                className="object-cover"
              />
            </div>
            <p>
              A straight consists of five cards in sequence, not all of the same suit, such as 8♣, 7♠, 6♦, 5♥, 4♠. The
              highest card determines the rank of the straight.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Three of a Kind</CardTitle>
            <CardDescription>Three cards of the same rank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Three of a Kind: Three cards of the same rank"
                fill
                className="object-cover"
              />
            </div>
            <p>
              Three of a kind consists of three cards of the same rank, such as 7♠, 7♥, 7♦. The other two cards
              (kickers) can be any rank. Higher-ranked three of a kind beats lower-ranked ones.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two Pair</CardTitle>
            <CardDescription>Two different pairs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Two Pair: Two different pairs"
                fill
                className="object-cover"
              />
            </div>
            <p>
              Two pair consists of two cards of one rank, two cards of another rank, and one card of a third rank, such
              as K♠, K♥, 9♦, 9♣, 5♠. The highest pair determines the rank.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>One Pair</CardTitle>
            <CardDescription>Two cards of the same rank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="One Pair: Two cards of the same rank"
                fill
                className="object-cover"
              />
            </div>
            <p>
              One pair consists of two cards of the same rank, such as J♠, J♥. The other three cards (kickers) can be
              any rank. Higher-ranked pairs beat lower-ranked ones.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Card</CardTitle>
            <CardDescription>When no other hand is made</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="High Card: When no other hand is made"
                fill
                className="object-cover"
              />
            </div>
            <p>
              If no player has at least a pair, then the highest card wins. If multiple players have the same high card,
              the second-highest card determines the winner, and so on.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

