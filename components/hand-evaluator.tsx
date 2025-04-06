// Hand evaluator for poker
type Suit = "hearts" | "diamonds" | "clubs" | "spades"
type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"
type Card = { suit: Suit; rank: Rank; faceUp: boolean }

export class HandEvaluator {
  // Rank values for comparison
  private static readonly RANK_VALUES: Record<Rank, number> = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  }

  // Hand types in order of strength
  private static readonly HAND_TYPES = [
    "High Card",
    "One Pair",
    "Two Pair",
    "Three of a Kind",
    "Straight",
    "Flush",
    "Full House",
    "Four of a Kind",
    "Straight Flush",
    "Royal Flush",
  ]

  // Evaluate a hand of 5-7 cards
  static evaluateHand(cards: Card[]): { handRank: number; description: string } {
    if (cards.length < 5) {
      return { handRank: 0, description: "Invalid Hand" }
    }

    // Get all possible 5-card combinations if more than 5 cards
    const combinations = this.getCombinations(cards, 5)

    // Evaluate each combination and return the best one
    let bestHandRank = 0
    let bestDescription = ""

    for (const combo of combinations) {
      const { handRank, description } = this.evaluateFiveCardHand(combo)
      if (handRank > bestHandRank) {
        bestHandRank = handRank
        bestDescription = description
      }
    }

    return { handRank: bestHandRank, description: bestDescription }
  }

  // Get all combinations of k elements from array
  private static getCombinations<T>(array: T[], k: number): T[][] {
    const result: T[][] = []

    // Helper function to generate combinations
    const combine = (start: number, combo: T[]) => {
      if (combo.length === k) {
        result.push([...combo])
        return
      }

      for (let i = start; i < array.length; i++) {
        combo.push(array[i])
        combine(i + 1, combo)
        combo.pop()
      }
    }

    combine(0, [])
    return result
  }

  // Evaluate a 5-card hand
  private static evaluateFiveCardHand(cards: Card[]): { handRank: number; description: string } {
    // Sort cards by rank (high to low)
    const sortedCards = [...cards].sort((a, b) => this.RANK_VALUES[b.rank] - this.RANK_VALUES[a.rank])

    // Check for each hand type from highest to lowest
    if (this.isRoyalFlush(sortedCards)) {
      return { handRank: 9000, description: "Royal Flush" }
    }

    const straightFlush = this.isStraightFlush(sortedCards)
    if (straightFlush.is) {
      return {
        handRank: 8000 + this.RANK_VALUES[straightFlush.highCard],
        description: `Straight Flush, ${straightFlush.highCard} high`,
      }
    }

    const fourOfAKind = this.isFourOfAKind(sortedCards)
    if (fourOfAKind.is) {
      return {
        handRank: 7000 + this.RANK_VALUES[fourOfAKind.rank],
        description: `Four of a Kind, ${fourOfAKind.rank}s`,
      }
    }

    const fullHouse = this.isFullHouse(sortedCards)
    if (fullHouse.is) {
      return {
        handRank: 6000 + this.RANK_VALUES[fullHouse.threeRank] * 100 + this.RANK_VALUES[fullHouse.pairRank],
        description: `Full House, ${fullHouse.threeRank}s over ${fullHouse.pairRank}s`,
      }
    }

    const flush = this.isFlush(sortedCards)
    if (flush.is) {
      return {
        handRank: 5000 + this.RANK_VALUES[flush.highCard],
        description: `Flush, ${flush.highCard} high`,
      }
    }

    const straight = this.isStraight(sortedCards)
    if (straight.is) {
      return {
        handRank: 4000 + this.RANK_VALUES[straight.highCard],
        description: `Straight, ${straight.highCard} high`,
      }
    }

    const threeOfAKind = this.isThreeOfAKind(sortedCards)
    if (threeOfAKind.is) {
      return {
        handRank: 3000 + this.RANK_VALUES[threeOfAKind.rank],
        description: `Three of a Kind, ${threeOfAKind.rank}s`,
      }
    }

    const twoPair = this.isTwoPair(sortedCards)
    if (twoPair.is) {
      return {
        handRank: 2000 + this.RANK_VALUES[twoPair.highPairRank] * 100 + this.RANK_VALUES[twoPair.lowPairRank],
        description: `Two Pair, ${twoPair.highPairRank}s and ${twoPair.lowPairRank}s`,
      }
    }

    const onePair = this.isOnePair(sortedCards)
    if (onePair.is) {
      return {
        handRank: 1000 + this.RANK_VALUES[onePair.rank],
        description: `One Pair, ${onePair.rank}s`,
      }
    }

    // High card
    const highCard = sortedCards[0].rank
    return {
      handRank: this.RANK_VALUES[highCard],
      description: `High Card, ${highCard}`,
    }
  }

  // Check for royal flush
  private static isRoyalFlush(cards: Card[]): boolean {
    const straightFlush = this.isStraightFlush(cards)
    return straightFlush.is && straightFlush.highCard === "A"
  }

  // Check for straight flush
  private static isStraightFlush(cards: Card[]): { is: boolean; highCard: Rank } {
    const flush = this.isFlush(cards)
    const straight = this.isStraight(cards)

    return {
      is: flush.is && straight.is,
      highCard: straight.highCard,
    }
  }

  // Check for four of a kind
  private static isFourOfAKind(cards: Card[]): { is: boolean; rank: Rank } {
    const rankCounts = this.countRanks(cards)

    for (const [rank, count] of Object.entries(rankCounts)) {
      if (count === 4) {
        return { is: true, rank: rank as Rank }
      }
    }

    return { is: false, rank: "2" }
  }

  // Check for full house
  private static isFullHouse(cards: Card[]): { is: boolean; threeRank: Rank; pairRank: Rank } {
    const rankCounts = this.countRanks(cards)
    let threeRank: Rank | null = null
    let pairRank: Rank | null = null

    for (const [rank, count] of Object.entries(rankCounts)) {
      if (count === 3) {
        threeRank = rank as Rank
      } else if (count === 2) {
        pairRank = rank as Rank
      }
    }

    return {
      is: threeRank !== null && pairRank !== null,
      threeRank: threeRank || "2",
      pairRank: pairRank || "2",
    }
  }

  // Check for flush
  private static isFlush(cards: Card[]): { is: boolean; highCard: Rank } {
    const suitCounts = this.countSuits(cards)

    for (const count of Object.values(suitCounts)) {
      if (count === 5) {
        return { is: true, highCard: cards[0].rank }
      }
    }

    return { is: false, highCard: "2" }
  }

  // Check for straight
  private static isStraight(cards: Card[]): { is: boolean; highCard: Rank } {
    // Handle special case: A-5-4-3-2
    const ranks = cards.map((card) => this.RANK_VALUES[card.rank])
    if (this.containsRanks(ranks, [14, 5, 4, 3, 2])) {
      return { is: true, highCard: "5" }
    }

    // Check for regular straight
    for (let i = 0; i < cards.length - 1; i++) {
      if (this.RANK_VALUES[cards[i].rank] - this.RANK_VALUES[cards[i + 1].rank] !== 1) {
        return { is: false, highCard: "2" }
      }
    }

    return { is: true, highCard: cards[0].rank }
  }

  // Check if array contains all specified values
  private static containsRanks(ranks: number[], values: number[]): boolean {
    return values.every((value) => ranks.includes(value))
  }

  // Check for three of a kind
  private static isThreeOfAKind(cards: Card[]): { is: boolean; rank: Rank } {
    const rankCounts = this.countRanks(cards)

    for (const [rank, count] of Object.entries(rankCounts)) {
      if (count === 3) {
        return { is: true, rank: rank as Rank }
      }
    }

    return { is: false, rank: "2" }
  }

  // Check for two pair
  private static isTwoPair(cards: Card[]): { is: boolean; highPairRank: Rank; lowPairRank: Rank } {
    const rankCounts = this.countRanks(cards)
    const pairs: Rank[] = []

    for (const [rank, count] of Object.entries(rankCounts)) {
      if (count === 2) {
        pairs.push(rank as Rank)
      }
    }

    if (pairs.length >= 2) {
      // Sort pairs by rank value (high to low)
      pairs.sort((a, b) => this.RANK_VALUES[b] - this.RANK_VALUES[a])

      return {
        is: true,
        highPairRank: pairs[0],
        lowPairRank: pairs[1],
      }
    }

    return { is: false, highPairRank: "2", lowPairRank: "2" }
  }

  // Check for one pair
  private static isOnePair(cards: Card[]): { is: boolean; rank: Rank } {
    const rankCounts = this.countRanks(cards)

    for (const [rank, count] of Object.entries(rankCounts)) {
      if (count === 2) {
        return { is: true, rank: rank as Rank }
      }
    }

    return { is: false, rank: "2" }
  }

  // Count occurrences of each rank
  private static countRanks(cards: Card[]): Record<Rank, number> {
    const counts: Partial<Record<Rank, number>> = {}

    for (const card of cards) {
      counts[card.rank] = (counts[card.rank] || 0) + 1
    }

    return counts as Record<Rank, number>
  }

  // Count occurrences of each suit
  private static countSuits(cards: Card[]): Record<Suit, number> {
    const counts: Partial<Record<Suit, number>> = {}

    for (const card of cards) {
      counts[card.suit] = (counts[card.suit] || 0) + 1
    }

    return counts as Record<Suit, number>
  }
}

