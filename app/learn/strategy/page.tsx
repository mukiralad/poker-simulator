import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StrategyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Poker Strategy</h1>
      </div>

      <p className="text-lg mb-8">
        Mastering poker requires understanding both the technical aspects of the game and the psychological elements.
        Here are key strategies to improve your poker game:
      </p>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="beginner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Starting Hand Selection</CardTitle>
                <CardDescription>Know which hands to play and which to fold</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  One of the most important decisions in poker is whether to play a hand or fold it. As a beginner, you
                  should play tight (conservative) and only play strong starting hands.
                </p>

                <h3 className="text-lg font-medium">Premium Hands</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pocket pairs: AA, KK, QQ, JJ</li>
                  <li>Strong Aces: AK, AQ, AJ (suited preferred)</li>
                  <li>Strong Kings: KQ, KJ (suited preferred)</li>
                </ul>

                <h3 className="text-lg font-medium">Playable Hands</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Medium pairs: TT, 99, 88</li>
                  <li>Suited connectors: JT, T9, 98 (same suit)</li>
                  <li>Suited Aces: A9s-A2s (s = suited)</li>
                </ul>

                <p className="text-sm text-muted-foreground mt-4">
                  Remember: Position matters! You can play more hands in late position (when you act last) than in early
                  position.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Position Awareness</CardTitle>
                <CardDescription>Understanding the power of position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Position is one of the most powerful advantages in poker. Acting last gives you more information and
                  control over the pot.
                </p>

                <h3 className="text-lg font-medium">Position Types</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Early Position:</strong> First to act after the blinds (tight range)
                  </li>
                  <li>
                    <strong>Middle Position:</strong> Between early and late positions (slightly wider range)
                  </li>
                  <li>
                    <strong>Late Position:</strong> Button and cutoff positions (widest range)
                  </li>
                  <li>
                    <strong>Blinds:</strong> Small and big blinds (defensive play)
                  </li>
                </ul>

                <h3 className="text-lg font-medium">Position Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Play fewer hands from early position</li>
                  <li>Take advantage of late position to steal blinds</li>
                  <li>Defend your big blind appropriately</li>
                  <li>Consider position when deciding whether to call or raise</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bet Sizing</CardTitle>
                <CardDescription>How much to bet in different situations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Proper bet sizing is crucial for maximizing value with strong hands and minimizing losses with weak
                  hands.
                </p>

                <h3 className="text-lg font-medium">Basic Guidelines</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Pre-flop raises:</strong> 3-4x the big blind
                  </li>
                  <li>
                    <strong>Continuation bets:</strong> 1/2 to 2/3 of the pot
                  </li>
                  <li>
                    <strong>Value bets:</strong> 1/2 to 3/4 of the pot
                  </li>
                  <li>
                    <strong>Bluffs:</strong> Same size as your value bets
                  </li>
                </ul>

                <p className="text-sm text-muted-foreground mt-4">
                  Consistency is key! Use similar bet sizes for both your strong hands and bluffs to avoid giving away
                  information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bankroll Management</CardTitle>
                <CardDescription>Protecting your poker funds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Proper bankroll management is essential for long-term success in poker and avoiding going broke.</p>

                <h3 className="text-lg font-medium">Basic Rules</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Have at least 20-30 buy-ins for cash games</li>
                  <li>Have at least 50-100 buy-ins for tournaments</li>
                  <li>Move down in stakes if your bankroll drops below these thresholds</li>
                  <li>Only move up when your bankroll can support it</li>
                </ul>

                <h3 className="text-lg font-medium">Avoiding Tilt</h3>
                <p>
                  "Tilt" is emotional play that leads to poor decisions. Set stop-loss limits for your sessions and take
                  breaks after big wins or losses.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="intermediate">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Pot Odds & Equity</CardTitle>
                <CardDescription>Making mathematically correct decisions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Pot odds help you determine whether calling a bet is profitable in the long run by comparing the
                  current pot size to the cost of a contemplated call.
                </p>

                <h3 className="text-lg font-medium">Calculating Pot Odds</h3>
                <p>Pot odds = Pot size ÷ Cost to call</p>
                <p>
                  Example: If the pot is $100 and your opponent bets $50, the pot is now $150 and it costs you $50 to
                  call. Your pot odds are 150:50 or 3:1.
                </p>

                <h3 className="text-lg font-medium">Equity Calculation</h3>
                <p>
                  Your equity is your chance of winning the hand. If you have a flush draw on the flop, you have about
                  35% equity (about 2:1 against making your hand).
                </p>

                <p className="text-sm text-muted-foreground mt-4">
                  If your equity exceeds your pot odds, you should call. If not, you should fold.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hand Reading</CardTitle>
                <CardDescription>Narrowing your opponent's range</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Hand reading is the process of deducing what cards your opponent might have based on their actions.
                </p>

                <h3 className="text-lg font-medium">Range-Based Thinking</h3>
                <p>
                  Instead of trying to put your opponent on a specific hand, think about the range of hands they could
                  have.
                </p>

                <h3 className="text-lg font-medium">Narrowing Ranges</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Consider their position (what hands would they play from there?)</li>
                  <li>Consider their pre-flop action (raise, call, 3-bet?)</li>
                  <li>Consider their post-flop action (bet, check, raise?)</li>
                  <li>Consider their bet sizing (large bets often indicate strength)</li>
                </ul>

                <p className="text-sm text-muted-foreground mt-4">
                  As the hand progresses, continue to narrow their range based on each action they take.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bluffing Strategy</CardTitle>
                <CardDescription>When and how to bluff effectively</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Bluffing is an essential part of poker, but it should be done selectively and strategically.</p>

                <h3 className="text-lg font-medium">Semi-Bluffing</h3>
                <p>
                  A semi-bluff is when you bet with a hand that's not currently the best but has potential to improve
                  (like a flush draw). This is generally more profitable than bluffing with no equity.
                </p>

                <h3 className="text-lg font-medium">Bluffing Considerations</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fewer opponents = Better bluffing opportunities</li>
                  <li>Consider the board texture (is it favorable for your perceived range?)</li>
                  <li>Consider your table image (tight players can bluff more effectively)</li>
                  <li>Consider your opponent's tendencies (don't bluff calling stations)</li>
                </ul>

                <p className="text-sm text-muted-foreground mt-4">
                  Remember: Bluffing is not about "getting away with it" occasionally; it's about making your overall
                  strategy profitable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table Dynamics</CardTitle>
                <CardDescription>Adapting to different table types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Different tables require different strategies. Adapting to the specific dynamics of your table is
                  crucial.
                </p>

                <h3 className="text-lg font-medium">Table Types</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Tight-Passive:</strong> Play more hands and steal more pots
                  </li>
                  <li>
                    <strong>Loose-Passive:</strong> Value bet more and bluff less
                  </li>
                  <li>
                    <strong>Tight-Aggressive:</strong> Be cautious when facing aggression
                  </li>
                  <li>
                    <strong>Loose-Aggressive:</strong> Tighten up and trap with strong hands
                  </li>
                </ul>

                <h3 className="text-lg font-medium">Player Profiling</h3>
                <p>Take notes on your opponents' tendencies:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Do they fold to continuation bets?</li>
                  <li>Do they call too much with weak hands?</li>
                  <li>Do they bluff frequently?</li>
                  <li>Are they aggressive or passive post-flop?</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Game Theory Optimal (GTO) Play</CardTitle>
                <CardDescription>Unexploitable poker strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  GTO is an approach to poker that aims to create a mathematically perfect strategy that cannot be
                  exploited, regardless of how your opponents play.
                </p>

                <h3 className="text-lg font-medium">Key GTO Concepts</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Balanced ranges:</strong> Having the right proportion of value hands and bluffs
                  </li>
                  <li>
                    <strong>Minimum defense frequency:</strong> Defending enough to prevent profitable bluffs
                  </li>
                  <li>
                    <strong>Optimal bet sizing:</strong> Using game-theory-based bet sizes
                  </li>
                  <li>
                    <strong>Mixed strategies:</strong> Sometimes taking different actions with the same hand
                  </li>
                </ul>

                <p className="text-sm text-muted-foreground mt-4">
                  While perfect GTO play is impossible for humans, understanding GTO concepts can significantly improve
                  your game.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exploitative Play</CardTitle>
                <CardDescription>Maximizing profit against specific opponents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Exploitative play involves adjusting your strategy to take maximum advantage of your opponents'
                  mistakes.
                </p>

                <h3 className="text-lg font-medium">Exploiting Common Leaks</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Against calling stations:</strong> Value bet thinner and bluff less
                  </li>
                  <li>
                    <strong>Against nits (very tight):</strong> Bluff more and fold to their aggression
                  </li>
                  <li>
                    <strong>Against maniacs:</strong> Tighten up and call down lighter
                  </li>
                  <li>
                    <strong>Against fit-or-fold players:</strong> C-bet more frequently
                  </li>
                </ul>

                <h3 className="text-lg font-medium">Balancing GTO and Exploitation</h3>
                <p>
                  The best players use GTO as a baseline but deviate when they identify exploitable tendencies in their
                  opponents.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mental Game</CardTitle>
                <CardDescription>Psychological aspects of poker</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The mental game is often what separates good players from great players. Managing emotions and
                  maintaining focus are crucial.
                </p>

                <h3 className="text-lg font-medium">Tilt Control</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Recognize your tilt triggers</li>
                  <li>Develop a pre-session mental routine</li>
                  <li>Take breaks when emotions are affecting decisions</li>
                  <li>Focus on making good decisions, not results</li>
                </ul>

                <h3 className="text-lg font-medium">Mindset Development</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Embrace variance and understand its role</li>
                  <li>Develop a growth mindset for continuous improvement</li>
                  <li>Practice mindfulness during sessions</li>
                  <li>Review sessions objectively without emotion</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Table Selection</CardTitle>
                <CardDescription>Finding the most profitable games</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Table selection is one of the most important skills in poker. Playing in profitable games can be more
                  important than your skill edge.
                </p>

                <h3 className="text-lg font-medium">What to Look For</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>High average pot size (indicates loose play)</li>
                  <li>High percentage of players seeing the flop</li>
                  <li>Players with large stacks who play poorly</li>
                  <li>Recreational players (erratic betting patterns)</li>
                </ul>

                <h3 className="text-lg font-medium">Game Selection Strategy</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Don't play in games where you're the fish</li>
                  <li>Change tables if the dynamics become unfavorable</li>
                  <li>Play during peak recreational hours (evenings, weekends)</li>
                  <li>Keep records of profitable games and venues</li>
                </ul>

                <p className="text-sm text-muted-foreground mt-4">
                  Remember: Your win rate is determined by both your skill edge and the profitability of the games you
                  choose.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

