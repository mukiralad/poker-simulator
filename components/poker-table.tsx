"use client"

import { useState, useEffect } from "react"
import { Coins } from "lucide-react"
import { Check, ChevronRight, ChevronsUp, HandMetal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { HandEvaluator } from "@/components/hand-evaluator"
import { cn } from "@/lib/utils"

// Types
type Suit = "hearts" | "diamonds" | "clubs" | "spades"
type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"
type PokerCard = { suit: Suit; rank: Rank; faceUp: boolean }
type Player = {
  id: number
  name: string
  chips: number
  cards: PokerCard[]
  betAmount: number
  folded: boolean
  isAllIn: boolean
  isActive: boolean
  isWinner: boolean
  handDescription?: string
}
type GameStage = "preflop" | "flop" | "turn" | "river" | "showdown" | "complete"
type PlayerAction = "fold" | "check" | "call" | "bet" | "raise" | "allIn"

interface PokerTableProps {
  difficulty: string
  opponents: number
  bigBlind: number
  startingChips: number
  onGameEnd: (result: { won: boolean; chipsWon: number }) => void
}

export function PokerTable({ difficulty, opponents, bigBlind, startingChips, onGameEnd }: PokerTableProps) {
  // Game state
  const [deck, setDeck] = useState<PokerCard[]>([])
  const [communityCards, setCommunityCards] = useState<PokerCard[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [pot, setPot] = useState(0)
  const [gameStage, setGameStage] = useState<GameStage>("preflop")
  const [currentBet, setCurrentBet] = useState(0)
  const [betAmount, setBetAmount] = useState(bigBlind)
  const [lastRaiseIndex, setLastRaiseIndex] = useState(-1)
  const [message, setMessage] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [gameResult, setGameResult] = useState<{ won: boolean; chipsWon: number } | null>(null)
  const [sidePots, setSidePots] = useState<{ amount: number; eligiblePlayers: number[] }[]>([])
  const [showControls, setShowControls] = useState(true)
  const [handEvaluations, setHandEvaluations] = useState<{ playerId: number; description: string }[]>([])

  const smallBlind = bigBlind / 2
  const humanPlayerIndex = 0 // The human player is always at index 0

  // Initialize the game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create a new deck
    const newDeck = createDeck()
    setDeck(newDeck)

    // Create players
    const newPlayers: Player[] = [
      {
        id: 0,
        name: "You",
        chips: startingChips,
        cards: [],
        betAmount: 0,
        folded: false,
        isAllIn: false,
        isActive: true,
        isWinner: false,
      },
    ]

    // Add AI opponents
    for (let i = 1; i <= opponents; i++) {
      newPlayers.push({
        id: i,
        name: `Player ${i}`,
        chips: startingChips,
        cards: [],
        betAmount: 0,
        folded: false,
        isAllIn: false,
        isActive: true,
        isWinner: false,
      })
    }

    setPlayers(newPlayers)
    setCommunityCards([])
    setPot(0)
    setGameStage("preflop")
    setCurrentBet(0)
    setBetAmount(bigBlind)
    setLastRaiseIndex(-1)
    setMessage("Game starting...")
    setGameResult(null)
    setSidePots([])
    setHandEvaluations([])

    // Start the game after a short delay
    setTimeout(() => {
      dealCards(newDeck, newPlayers)
    }, 1000)
  }

  // Create a shuffled deck of cards
  const createDeck = () => {
    const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
    const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    const deck: PokerCard[] = []

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank, faceUp: false })
      }
    }

    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }

    return deck
  }

  // Deal cards to players
  const dealCards = (currentDeck: PokerCard[], currentPlayers: Player[]) => {
    const updatedDeck = [...currentDeck]
    const updatedPlayers = [...currentPlayers]

    // Deal 2 cards to each player
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < updatedPlayers.length; j++) {
        const card = updatedDeck.pop()
        if (card) {
          // Only the human player's cards are face up
          card.faceUp = j === humanPlayerIndex
          updatedPlayers[j].cards.push(card)
        }
      }
    }

    setDeck(updatedDeck)
    setPlayers(updatedPlayers)

    // Post blinds
    postBlinds(updatedPlayers)
  }

  // Post blinds
  const postBlinds = (currentPlayers: Player[]) => {
    const updatedPlayers = [...currentPlayers]

    // Small blind (player to the left of the dealer)
    const sbIndex = 1 % updatedPlayers.length
    updatedPlayers[sbIndex].chips -= smallBlind
    updatedPlayers[sbIndex].betAmount = smallBlind

    // Big blind (player to the left of the small blind)
    const bbIndex = 2 % updatedPlayers.length
    updatedPlayers[bbIndex].chips -= bigBlind
    updatedPlayers[bbIndex].betAmount = bigBlind

    setPlayers(updatedPlayers)
    setCurrentBet(bigBlind)
    setPot(smallBlind + bigBlind)

    // Start with the player to the left of the big blind
    setCurrentPlayerIndex(3 % updatedPlayers.length)
    setMessage(
      `${updatedPlayers[sbIndex].name} posts small blind (${smallBlind}), ${updatedPlayers[bbIndex].name} posts big blind (${bigBlind})`,
    )

    // If it's the human player's turn, wait for input
    // Otherwise, let the AI play after a short delay
    if (currentPlayerIndex !== humanPlayerIndex) {
      setTimeout(() => {
        aiAction()
      }, 1000)
    }
  }

  // Deal community cards
  const dealCommunityCards = () => {
    const updatedDeck = [...deck]
    const updatedCommunityCards = [...communityCards]

    let cardsToDeal = 0

    if (gameStage === "preflop") {
      // Deal 3 cards for the flop
      cardsToDeal = 3
      setGameStage("flop")
      setMessage("Dealing the flop...")
    } else if (gameStage === "flop") {
      // Deal 1 card for the turn
      cardsToDeal = 1
      setGameStage("turn")
      setMessage("Dealing the turn...")
    } else if (gameStage === "turn") {
      // Deal 1 card for the river
      cardsToDeal = 1
      setGameStage("river")
      setMessage("Dealing the river...")
    }

    for (let i = 0; i < cardsToDeal; i++) {
      const card = updatedDeck.pop()
      if (card) {
        card.faceUp = true
        updatedCommunityCards.push(card)
      }
    }

    setDeck(updatedDeck)
    setCommunityCards(updatedCommunityCards)

    // Reset betting for the new round
    resetBettingRound()
  }

  // Reset betting for a new round
  const resetBettingRound = () => {
    const updatedPlayers = [...players]

    for (let i = 0; i < updatedPlayers.length; i++) {
      updatedPlayers[i].betAmount = 0
    }

    setPlayers(updatedPlayers)
    setCurrentBet(0)
    setBetAmount(bigBlind)
    setLastRaiseIndex(-1)

    // Find the first active player after the dealer
    let nextPlayerIndex = 1 % updatedPlayers.length
    while (
      updatedPlayers[nextPlayerIndex].folded ||
      updatedPlayers[nextPlayerIndex].isAllIn ||
      !updatedPlayers[nextPlayerIndex].isActive
    ) {
      nextPlayerIndex = (nextPlayerIndex + 1) % updatedPlayers.length

      // If we've gone all the way around, break to avoid infinite loop
      if (nextPlayerIndex === 1 % updatedPlayers.length) {
        break
      }
    }

    setCurrentPlayerIndex(nextPlayerIndex)

    // If it's the human player's turn, wait for input
    // Otherwise, let the AI play after a short delay
    if (nextPlayerIndex !== humanPlayerIndex) {
      setTimeout(() => {
        aiAction()
      }, 1000)
    }
  }

  // Handle player actions
  const handleAction = (action: PlayerAction, amount = 0) => {
    if (gameResult) return

    const updatedPlayers = [...players]
    const player = updatedPlayers[currentPlayerIndex]

    switch (action) {
      case "fold":
        player.folded = true
        setMessage(`${player.name} folds`)
        break

      case "check":
        setMessage(`${player.name} checks`)
        break

      case "call":
        {
          const callAmount = Math.min(currentBet - player.betAmount, player.chips)
          player.chips -= callAmount
          player.betAmount += callAmount
          setPot(pot + callAmount)

          if (player.chips === 0) {
            player.isAllIn = true
            setMessage(`${player.name} calls ${callAmount} and is all-in!`)
          } else {
            setMessage(`${player.name} calls ${callAmount}`)
          }
        }
        break

      case "bet":
        {
          player.chips -= amount
          player.betAmount = amount
          setPot(pot + amount)
          setCurrentBet(amount)
          setLastRaiseIndex(currentPlayerIndex)

          if (player.chips === 0) {
            player.isAllIn = true
            setMessage(`${player.name} bets ${amount} and is all-in!`)
          } else {
            setMessage(`${player.name} bets ${amount}`)
          }
        }
        break

      case "raise":
        {
          const raiseAmount = amount - player.betAmount
          player.chips -= raiseAmount
          player.betAmount = amount
          setPot(pot + raiseAmount)
          setCurrentBet(amount)
          setLastRaiseIndex(currentPlayerIndex)

          if (player.chips === 0) {
            player.isAllIn = true
            setMessage(`${player.name} raises to ${amount} and is all-in!`)
          } else {
            setMessage(`${player.name} raises to ${amount}`)
          }
        }
        break

      case "allIn":
        {
          const allInAmount = player.chips
          setPot(pot + allInAmount)
          player.betAmount += allInAmount
          player.chips = 0
          player.isAllIn = true

          if (player.betAmount > currentBet) {
            setCurrentBet(player.betAmount)
            setLastRaiseIndex(currentPlayerIndex)
            setMessage(`${player.name} goes all-in for ${player.betAmount}!`)
          } else {
            setMessage(`${player.name} calls and is all-in for ${player.betAmount}!`)
          }
        }
        break
    }

    setPlayers(updatedPlayers)

    // Move to the next player
    nextPlayer()
  }

  // Move to the next player
  const nextPlayer = () => {
    // Check if the hand is over (only one player left)
    const activePlayers = players.filter((p) => !p.folded && p.isActive)
    if (activePlayers.length === 1) {
      // Hand is over, award pot to the remaining player
      endHand(activePlayers[0].id)
      return
    }

    // Check if the betting round is complete
    const nonFoldedPlayers = players.filter((p) => !p.folded && p.isActive)
    const allInPlayers = nonFoldedPlayers.filter((p) => p.isAllIn)
    const activeBettingPlayers = nonFoldedPlayers.filter((p) => !p.isAllIn)

    // If all players are all-in or have matched the current bet
    const bettingComplete =
      activeBettingPlayers.every((p) => p.betAmount === currentBet) &&
      (lastRaiseIndex === -1 || hasCompletedRound(lastRaiseIndex))

    if (bettingComplete || activeBettingPlayers.length === 0) {
      // If we're at showdown, evaluate hands
      if (gameStage === "river") {
        setGameStage("showdown")
        showdown()
        return
      }

      // Otherwise, move to the next stage
      dealCommunityCards()
      return
    }

    // Find the next active player
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length
    while (players[nextPlayerIndex].folded || players[nextPlayerIndex].isAllIn || !players[nextPlayerIndex].isActive) {
      nextPlayerIndex = (nextPlayerIndex + 1) % players.length

      // If we've gone all the way around, break to avoid infinite loop
      if (nextPlayerIndex === currentPlayerIndex) {
        break
      }
    }

    setCurrentPlayerIndex(nextPlayerIndex)

    // If it's the human player's turn, wait for input
    // Otherwise, let the AI play after a short delay
    if (nextPlayerIndex !== humanPlayerIndex) {
      setTimeout(() => {
        aiAction()
      }, 1000)
    }
  }

  // Check if we've completed a full betting round since the last raise
  const hasCompletedRound = (lastRaiseIdx: number) => {
    const currentIdx = currentPlayerIndex

    // If we're back at the last raiser, we've completed the round
    return currentIdx === lastRaiseIdx
  }

  // AI player action
  const aiAction = () => {
    if (gameResult) return

    setIsThinking(true)

    // Simulate AI thinking
    setTimeout(() => {
      const player = players[currentPlayerIndex]
      const aiLevel = difficulty

      // Simple AI logic based on difficulty
      let action: PlayerAction = "fold"
      let betSize = 0

      // Calculate pot odds and hand strength
      const handStrength = evaluateAIHandStrength(player, aiLevel)
      const potOdds = currentBet > 0 ? (currentBet - player.betAmount) / (pot + currentBet) : 0

      if (aiLevel === "beginner") {
        // Beginner AI - plays straightforward based on hand strength
        if (handStrength > 0.7) {
          // Strong hand - raise or bet
          if (currentBet === 0) {
            action = "bet"
            betSize = Math.min(pot * 0.5, player.chips)
            betSize = Math.max(bigBlind, Math.floor(betSize))
          } else if (player.chips <= currentBet - player.betAmount) {
            action = "allIn"
          } else {
            action = Math.random() > 0.5 ? "call" : "raise"
            if (action === "raise") {
              betSize = Math.min(currentBet * 2, player.chips + player.betAmount)
            }
          }
        } else if (handStrength > 0.4) {
          // Medium hand - call or check
          if (currentBet === 0 || player.betAmount === currentBet) {
            action = "check"
          } else if (player.chips <= currentBet - player.betAmount) {
            action = Math.random() > 0.7 ? "allIn" : "fold"
          } else {
            action = "call"
          }
        } else {
          // Weak hand - check or fold
          if (currentBet === 0 || player.betAmount === currentBet) {
            action = "check"
          } else {
            action = "fold"
          }
        }
      } else if (aiLevel === "intermediate") {
        // Intermediate AI - considers pot odds and position
        const isLatePosition = currentPlayerIndex > players.length / 2
        const bluffFactor = Math.random() * 0.2

        if (handStrength + bluffFactor > 0.7) {
          // Strong hand - raise or bet
          if (currentBet === 0) {
            action = "bet"
            betSize = Math.min(pot * 0.75, player.chips)
            betSize = Math.max(bigBlind, Math.floor(betSize))
          } else if (player.chips <= currentBet - player.betAmount) {
            action = "allIn"
          } else {
            action = Math.random() > 0.3 ? "raise" : "call"
            if (action === "raise") {
              betSize = Math.min(currentBet * 2.5, player.chips + player.betAmount)
            }
          }
        } else if (handStrength > potOdds || (handStrength > 0.3 && isLatePosition)) {
          // Medium hand or late position - call or check
          if (currentBet === 0 || player.betAmount === currentBet) {
            action = "check"
          } else if (player.chips <= currentBet - player.betAmount) {
            action = Math.random() > 0.5 ? "allIn" : "fold"
          } else {
            action = "call"
          }
        } else {
          // Weak hand - check, fold, or occasional bluff
          if (currentBet === 0 || player.betAmount === currentBet) {
            action = Math.random() > 0.8 && isLatePosition ? "bet" : "check"
            if (action === "bet") {
              betSize = Math.min(pot * 0.5, player.chips)
              betSize = Math.max(bigBlind, Math.floor(betSize))
            }
          } else {
            action = Math.random() > 0.9 && isLatePosition ? "raise" : "fold"
            if (action === "raise") {
              betSize = Math.min(currentBet * 2, player.chips + player.betAmount)
            }
          }
        }
      } else {
        // Advanced AI - uses more complex strategy
        const isLatePosition = currentPlayerIndex > players.length / 2
        const bluffFactor = Math.random() * 0.3
        const playerTendency = 0.5 // Neutral tendency (could track player behavior over time)

        if (handStrength + (isLatePosition ? 0.1 : 0) > 0.75) {
          // Strong hand - value bet or raise
          if (currentBet === 0) {
            action = "bet"
            // Size bet based on board texture and game stage
            const sizingFactor = gameStage === "river" ? 0.9 : 0.7
            betSize = Math.min(pot * sizingFactor, player.chips)
            betSize = Math.max(bigBlind, Math.floor(betSize))
          } else if (player.chips <= currentBet - player.betAmount) {
            action = "allIn"
          } else {
            action = Math.random() > 0.2 ? "raise" : "call"
            if (action === "raise") {
              betSize = Math.min(currentBet * 3, player.chips + player.betAmount)
            }
          }
        } else if (handStrength > potOdds + 0.1 || (handStrength > 0.4 && isLatePosition)) {
          // Medium hand - call, check, or small raise
          if (currentBet === 0 || player.betAmount === currentBet) {
            action = Math.random() > 0.6 ? "bet" : "check"
            if (action === "bet") {
              betSize = Math.min(pot * 0.5, player.chips)
              betSize = Math.max(bigBlind, Math.floor(betSize))
            }
          } else if (player.chips <= currentBet - player.betAmount) {
            // Consider pot odds for all-in decision
            action = handStrength > potOdds + 0.2 ? "allIn" : "fold"
          } else {
            // Mix of calls and raises
            action = Math.random() > 0.7 ? "raise" : "call"
            if (action === "raise") {
              betSize = Math.min(currentBet * 1.5, player.chips + player.betAmount)
            }
          }
        } else {
          // Weak hand - check, fold, or strategic bluff
          if (currentBet === 0 || player.betAmount === currentBet) {
            // Check most of the time, occasionally bluff
            action = Math.random() > 0.8 ? "bet" : "check"
            if (action === "bet") {
              betSize = Math.min(pot * 0.6, player.chips)
              betSize = Math.max(bigBlind, Math.floor(betSize))
            }
          } else {
            // Consider bluffing based on position and player tendencies
            const bluffThreshold = isLatePosition ? 0.85 : 0.95
            action = Math.random() > bluffThreshold ? "raise" : "fold"
            if (action === "raise") {
              betSize = Math.min(currentBet * 2.5, player.chips + player.betAmount)
            }
          }
        }
      }

      // Round bet size to nearest chip
      betSize = Math.floor(betSize)

      // Execute the chosen action
      setIsThinking(false)
      handleAction(action, betSize)
    }, 1500)
  }

  // Evaluate AI hand strength (simplified)
  const evaluateAIHandStrength = (player: Player, aiLevel: string) => {
    // Basic hand strength evaluation
    // This is a simplified version - a real poker AI would use more sophisticated evaluation

    // Count pairs, trips, etc.
    const allCards = [...player.cards, ...communityCards]
    const rankCounts: Record<Rank, number> = {
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      J: 0,
      Q: 0,
      K: 0,
      A: 0,
    }

    const suitCounts: Record<Suit, number> = {
      hearts: 0,
      diamonds: 0,
      clubs: 0,
      spades: 0,
    }

    allCards.forEach((card) => {
      rankCounts[card.rank]++
      suitCounts[card.suit]++
    })

    // Check for pairs, trips, etc.
    let pairs = 0
    let trips = 0
    let quads = 0

    Object.values(rankCounts).forEach((count) => {
      if (count === 2) pairs++
      if (count === 3) trips++
      if (count === 4) quads++
    })

    // Check for flush potential
    const flushPotential = Math.max(...Object.values(suitCounts))

    // Check for straight potential (simplified)
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    let straightPotential = 0

    for (let i = 0; i < ranks.length - 4; i++) {
      let consecutive = 0
      for (let j = 0; j < 5; j++) {
        if (rankCounts[ranks[i + j] as Rank] > 0) consecutive++
      }
      straightPotential = Math.max(straightPotential, consecutive)
    }

    // Calculate base hand strength
    let strength = 0

    // High card value
    const hasAce = rankCounts["A"] > 0
    const hasKing = rankCounts["K"] > 0
    const hasQueen = rankCounts["Q"] > 0

    if (hasAce) strength += 0.1
    if (hasKing) strength += 0.05
    if (hasQueen) strength += 0.03

    // Made hands
    if (pairs === 1) strength += 0.2
    if (pairs >= 2) strength += 0.4
    if (trips === 1) strength += 0.5
    if (trips === 1 && pairs >= 1) strength += 0.7 // Full house
    if (quads === 1) strength += 0.8
    if (flushPotential >= 5) strength += 0.6
    if (straightPotential >= 5) strength += 0.6

    // Adjust based on game stage
    if (gameStage === "preflop") {
      // Preflop hand strength
      const card1 = player.cards[0]
      const card2 = player.cards[1]

      // Premium starting hands
      if (card1.rank === card2.rank) {
        // Pocket pair
        if (card1.rank === "A") strength = 0.95
        else if (card1.rank === "K") strength = 0.9
        else if (card1.rank === "Q") strength = 0.85
        else if (card1.rank === "J") strength = 0.8
        else if (card1.rank === "10") strength = 0.75
        else if (["9", "8", "7"].includes(card1.rank)) strength = 0.7
        else strength = 0.6
      } else if (card1.rank === "A" || card2.rank === "A") {
        // Ace + something
        const otherCard = card1.rank === "A" ? card2.rank : card1.rank
        if (otherCard === "K") strength = 0.85
        else if (otherCard === "Q") strength = 0.8
        else if (otherCard === "J") strength = 0.75
        else if (otherCard === "10") strength = 0.7
        else strength = 0.5
      } else if (card1.rank === "K" || card2.rank === "K") {
        // King + something
        const otherCard = card1.rank === "K" ? card2.rank : card1.rank
        if (otherCard === "Q") strength = 0.7
        else if (otherCard === "J") strength = 0.65
        else strength = 0.4
      } else {
        // Connected cards
        const rankIndex1 = ranks.indexOf(card1.rank)
        const rankIndex2 = ranks.indexOf(card2.rank)
        const gap = Math.abs(rankIndex1 - rankIndex2)

        if (gap === 1)
          strength = 0.5 // Connected
        else if (gap === 2)
          strength = 0.4 // One gap
        else strength = 0.3
      }

      // Suited bonus
      if (card1.suit === card2.suit) {
        strength += 0.1
      }
    }

    // Add randomness based on AI level
    if (aiLevel === "beginner") {
      strength += Math.random() * 0.3 - 0.15 // More random
    } else if (aiLevel === "intermediate") {
      strength += Math.random() * 0.2 - 0.1
    } else {
      strength += Math.random() * 0.1 - 0.05 // Less random
    }

    // Clamp between 0 and 1
    return Math.max(0, Math.min(1, strength))
  }

  // Showdown - evaluate hands and determine winner
  const showdown = () => {
    setMessage("Showdown! Revealing cards...")
    setShowControls(false)

    // Reveal all cards
    const updatedPlayers = [...players]
    updatedPlayers.forEach((player) => {
      if (!player.folded) {
        player.cards.forEach((card) => {
          card.faceUp = true
        })
      }
    })

    setPlayers(updatedPlayers)

    // Evaluate hands
    setTimeout(() => {
      evaluateHands()
    }, 1500)
  }

  // Evaluate hands and determine winner
  const evaluateHands = () => {
    const activePlayers = players.filter((p) => !p.folded && p.isActive)

    // Use the HandEvaluator to determine the winner
    const evaluations = activePlayers.map((player) => {
      const allCards = [...player.cards, ...communityCards]
      const { handRank, description } = HandEvaluator.evaluateHand(allCards)
      return { playerId: player.id, handRank, description }
    })

    // Store hand descriptions
    setHandEvaluations(evaluations.map((e) => ({ playerId: e.playerId, description: e.description })))

    // Find the winner(s)
    const maxRank = Math.max(...evaluations.map((e) => e.handRank))
    const winners = evaluations.filter((e) => e.handRank === maxRank).map((e) => e.playerId)

    // Update player states
    const updatedPlayers = [...players]
    updatedPlayers.forEach((player) => {
      player.isWinner = winners.includes(player.id)

      // Add hand description
      const evaluation = evaluations.find((e) => e.playerId === player.id)
      if (evaluation) {
        player.handDescription = evaluation.description
      }
    })

    setPlayers(updatedPlayers)

    // Award pot
    if (winners.length === 1) {
      const winner = updatedPlayers.find((p) => p.id === winners[0])
      if (winner) {
        setMessage(`${winner.name} wins with ${winner.handDescription}!`)

        // Award pot
        winner.chips += pot

        // Check if human player won
        const humanWon = winner.id === humanPlayerIndex
        const chipsWon = humanWon ? pot : -players[humanPlayerIndex].betAmount

        // End the hand
        setTimeout(() => {
          setGameResult({ won: humanWon, chipsWon })
        }, 2000)
      }
    } else {
      // Split pot
      const splitAmount = Math.floor(pot / winners.length)
      winners.forEach((winnerId) => {
        const winner = updatedPlayers.find((p) => p.id === winnerId)
        if (winner) {
          winner.chips += splitAmount
        }
      })

      setMessage(
        `Split pot! ${winners.map((id) => updatedPlayers.find((p) => p.id === id)?.name).join(", ")} each win ${splitAmount}`,
      )

      // Check if human player won
      const humanWon = winners.includes(humanPlayerIndex)
      const chipsWon = humanWon
        ? splitAmount - players[humanPlayerIndex].betAmount
        : -players[humanPlayerIndex].betAmount

      // End the hand
      setTimeout(() => {
        setGameResult({ won: humanWon, chipsWon })
      }, 2000)
    }

    setPlayers(updatedPlayers)
  }

  // End hand when only one player remains
  const endHand = (winnerId: number) => {
    const updatedPlayers = [...players]
    const winner = updatedPlayers.find((p) => p.id === winnerId)

    if (winner) {
      winner.isWinner = true
      winner.chips += pot

      setMessage(`${winner.name} wins the pot!`)
      setPlayers(updatedPlayers)

      // Check if human player won
      const humanWon = winnerId === humanPlayerIndex
      const chipsWon = humanWon ? pot : -players[humanPlayerIndex].betAmount

      // End the hand
      setTimeout(() => {
        setGameResult({ won: humanWon, chipsWon })
      }, 1500)
    }
  }

  // Play another hand
  const playAnotherHand = () => {
    onGameEnd(gameResult!)
  }

  // Render card
  const renderCard = (card: PokerCard | null, key: string) => {
    if (!card) {
      return (
        <div key={key} className="w-16 h-24 rounded-md bg-muted flex items-center justify-center border border-border">
          <span className="text-muted-foreground">?</span>
        </div>
      )
    }

    if (!card.faceUp) {
      return (
        <div
          key={key}
          className="w-16 h-24 rounded-md bg-blue-900 flex items-center justify-center border-2 border-blue-700 shadow-md"
        >
          <div className="w-10 h-16 rounded bg-blue-800 flex items-center justify-center">
            <span className="text-blue-600 font-bold">♠♥♦♣</span>
          </div>
        </div>
      )
    }

    const suitSymbol = card.suit === "hearts" ? "♥" : card.suit === "diamonds" ? "♦" : card.suit === "clubs" ? "♣" : "♠"

    const suitColor = card.suit === "hearts" || card.suit === "diamonds" ? "text-red-600" : "text-slate-900"

    return (
      <div
        key={key}
        className="w-16 h-24 rounded-md bg-white flex flex-col items-center justify-between p-1 border border-gray-300 shadow-md"
      >
        <div className={`self-start font-bold ${suitColor}`}>{card.rank}</div>
        <div className={`text-3xl ${suitColor}`}>{suitSymbol}</div>
        <div className={`self-end font-bold rotate-180 ${suitColor}`}>{card.rank}</div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="bg-green-800 rounded-xl p-6 min-h-[600px] relative">
        {/* Message area */}
        <div className="absolute top-2 left-0 right-0 text-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded-md inline-block">
            {isThinking ? (
              <div className="flex items-center">
                <span className="mr-2">{players[currentPlayerIndex]?.name} is thinking</span>
                <span className="animate-pulse">...</span>
              </div>
            ) : (
              message
            )}
          </div>
        </div>

        {/* Pot */}
        <div className="absolute top-20 left-0 right-0 text-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded-md inline-block">
            <div className="flex items-center">
              <Coins className="mr-2 h-4 w-4" />
              <span>Pot: {pot}</span>
            </div>
          </div>
        </div>

        {/* Community cards */}
        <div className="flex justify-center gap-2 mb-8 mt-16">
          {communityCards.length > 0
            ? communityCards.map((card, i) => renderCard(card, `community-${i}`))
            : Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} className="w-16 h-24 rounded-md border-2 border-white/20 bg-white/5" />
                ))}
        </div>

        {/* Opponents */}
        <div className="grid grid-cols-5 gap-4 mb-16">
          {players.slice(1).map((player, i) => (
            <div
              key={`opponent-${i}`}
              className={cn(
                "flex flex-col items-center",
                player.folded && "opacity-50",
                player.isWinner && "animate-pulse",
                currentPlayerIndex === i + 1 && "ring-2 ring-yellow-400 rounded-lg p-1",
              )}
            >
              <div className="text-white text-center mb-1">
                <div className="font-bold">{player.name}</div>
                <div className="flex items-center justify-center bg-black/40 px-2 py-1 rounded-md">
                  <Coins className="mr-1 h-3 w-3" />
                  <span>{player.chips}</span>
                </div>
                {player.betAmount > 0 && (
                  <div className="bg-black/40 text-white px-2 py-1 rounded-md text-xs mt-1">
                    Bet: {player.betAmount}
                  </div>
                )}
                {player.folded && (
                  <div className="bg-red-500/50 text-white px-2 py-1 rounded-md text-xs mt-1">Folded</div>
                )}
                {player.isAllIn && (
                  <div className="bg-yellow-500/50 text-white px-2 py-1 rounded-md text-xs mt-1">All-In</div>
                )}
                {player.handDescription && (
                  <div className="bg-green-500/50 text-white px-2 py-1 rounded-md text-xs mt-1">
                    {player.handDescription}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                {player.cards.map((card, j) => renderCard(card, `opponent-${i}-card-${j}`))}
              </div>
            </div>
          ))}
        </div>

        {/* Player */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-4">
              {players[0]?.cards.map((card, i) => renderCard(card, `player-card-${i}`))}
            </div>

            <div
              className={cn(
                "bg-black/50 text-white px-4 py-2 rounded-md mb-4 w-full max-w-md",
                currentPlayerIndex === 0 && "ring-2 ring-yellow-400",
              )}
            >
              <div className="flex items-center justify-center">
                <div className="mr-4">
                  <span className="font-bold text-lg">{players[0]?.name}</span>
                </div>
                <div className="flex items-center bg-black/30 px-3 py-1 rounded-md">
                  <Coins className="mr-1 h-4 w-4" />
                  <span>{players[0]?.chips}</span>
                </div>
                {players[0]?.betAmount > 0 && (
                  <div className="ml-4 bg-black/30 px-3 py-1 rounded-md">Bet: {players[0]?.betAmount}</div>
                )}
                {players[0]?.handDescription && (
                  <div className="ml-4 font-bold text-green-300">{players[0]?.handDescription}</div>
                )}
              </div>
            </div>

            {/* Player controls */}
            {currentPlayerIndex === 0 && showControls && !gameResult ? (
              <div className="bg-black/50 p-4 rounded-lg w-full max-w-2xl">
                {currentBet === 0 || players[0]?.betAmount === currentBet ? (
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      onClick={() => handleAction("check")}
                      variant="secondary"
                      size="lg"
                      className="min-w-[100px]"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Check
                    </Button>
                    <Button
                      onClick={() => handleAction("bet", betAmount)}
                      variant="default"
                      size="lg"
                      className="min-w-[100px]"
                    >
                      <Coins className="mr-2 h-4 w-4" />
                      Bet {betAmount}
                    </Button>
                    <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-md">
                      <span className="text-white">Amount:</span>
                      <div className="w-32">
                        <Slider
                          value={[betAmount]}
                          min={bigBlind}
                          max={Math.max(bigBlind, Math.min(players[0]?.chips || 0, pot * 2))}
                          step={bigBlind}
                          onValueChange={(value) => setBetAmount(value[0])}
                        />
                      </div>
                      <span className="text-white">{betAmount}</span>
                    </div>
                    <Button
                      onClick={() => handleAction("allIn")}
                      variant="outline"
                      size="lg"
                      className="bg-yellow-500/30 border-yellow-500/50 text-white hover:bg-yellow-500/50 min-w-[100px]"
                    >
                      <ChevronsUp className="mr-2 h-4 w-4" />
                      All-In ({players[0]?.chips})
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      onClick={() => handleAction("fold")}
                      variant="destructive"
                      size="lg"
                      className="min-w-[100px]"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Fold
                    </Button>
                    <Button
                      onClick={() => handleAction("call")}
                      variant="secondary"
                      size="lg"
                      className="min-w-[100px]"
                    >
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Call {currentBet - (players[0]?.betAmount || 0)}
                    </Button>
                    <Button
                      onClick={() => handleAction("raise", betAmount)}
                      variant="default"
                      size="lg"
                      className="min-w-[100px]"
                    >
                      <ChevronsUp className="mr-2 h-4 w-4" />
                      Raise to {betAmount}
                    </Button>
                    <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-md">
                      <span className="text-white">Amount:</span>
                      <div className="w-32">
                        <Slider
                          value={[betAmount]}
                          min={currentBet * 2}
                          max={Math.max(
                            currentBet * 2,
                            Math.min(players[0]?.chips + (players[0]?.betAmount || 0), pot * 3),
                          )}
                          step={bigBlind}
                          onValueChange={(value) => setBetAmount(value[0])}
                        />
                      </div>
                      <span className="text-white">{betAmount}</span>
                    </div>
                    <Button
                      onClick={() => handleAction("allIn")}
                      variant="outline"
                      size="lg"
                      className="bg-yellow-500/30 border-yellow-500/50 text-white hover:bg-yellow-500/50 min-w-[100px]"
                    >
                      <HandMetal className="mr-2 h-4 w-4" />
                      All-In ({players[0]?.chips})
                    </Button>
                  </div>
                )}
              </div>
            ) : gameResult ? (
              <div className="flex flex-col items-center bg-black/50 p-6 rounded-lg">
                <div className={cn("text-xl font-bold mb-4", gameResult.won ? "text-green-300" : "text-red-300")}>
                  {gameResult.won ? `You won ${gameResult.chipsWon} chips!` : `You lost ${-gameResult.chipsWon} chips`}
                </div>
                <Button onClick={playAnotherHand} size="lg" className="min-w-[200px]">
                  Play Another Hand
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

