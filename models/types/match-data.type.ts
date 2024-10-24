export type MatchData = {
  leagueDivision: string;
  leagueCountry: string;
  leagueName: string;
  season: string;
  matchDate: string;
  matchTime: string;
  homeTeam: string;
  awayTeam: string;
  fullTimeHomeGoals: string;
  fullTimeAwayGoals: string;
  fullTimeResult: string;
  halfTimeHomeGoals: string;
  halfTimeAwayGoals: string;
  halfTimeResult: string;
  attendance: string;
  referee: string;
  homeShots: string;
  awayShots: string;
  homeShotsOnTarget: string;
  awayShotsOnTarget: string;
  homeHitWoodwork: string;
  awayHitWoodwork: string;
  homeCorners: string;
  awayCorners: string;
  homeFouls: string;
  awayFouls: string;
  homeFreeKicksConceded: string;
  awayFreeKicksConceded: string;
  homeOffsides: string;
  awayOffsides: string;
  homeYellowCards: string;
  awayYellowCards: string;
  homeRedCards: string;
  awayRedCards: string;
  homeBookingsPoints: string;
  awayBookingsPoints: string;
  bet365HomeWinOdds: string;
  bet365DrawOdds: string;
  bet365AwayWinOdds: string;
  betfairHomeWinOdds: string;
  betfairDrawOdds: string;
  betfairAwayWinOdds: string;
  blueSquareHomeWinOdds: string;
  blueSquareDrawOdds: string;
  blueSquareAwayWinOdds: string;
  betAndWinHomeWinOdds: string;
  betAndWinDrawOdds: string;
  betAndWinAwayWinOdds: string;
  gamebookersHomeWinOdds: string;
  gamebookersDrawOdds: string;
  gamebookersAwayWinOdds: string;
  interwettenHomeWinOdds: string;
  interwettenDrawOdds: string;
  interwettenAwayWinOdds: string;
  ladbrokesHomeWinOdds: string;
  ladbrokesDrawOdds: string;
  ladbrokesAwayWinOdds: string;
  pinnacleHomeWinOdds: string;
  pinnacleDrawOdds: string;
  pinnacleAwayWinOdds: string;
  sportingOddsHomeWinOdds: string;
  sportingOddsDrawOdds: string;
  sportingOddsAwayWinOdds: string;
  sportingbetHomeWinOdds: string;
  sportingbetDrawOdds: string;
  sportingbetAwayWinOdds: string;
  stanJamesHomeWinOdds: string;
  stanJamesDrawOdds: string;
  stanJamesAwayWinOdds: string;
  stanleybetHomeWinOdds: string;
  stanleybetDrawOdds: string;
  stanleybetAwayWinOdds: string;
  vcBetHomeWinOdds: string;
  vcBetDrawOdds: string;
  vcBetAwayWinOdds: string;
  williamHillHomeWinOdds: string;
  williamHillDrawOdds: string;
  williamHillAwayWinOdds: string;
  numberOfBookmakersFor1X2: string;
  maxHomeWinOdds: string;
  avgHomeWinOdds: string;
  maxDrawOdds: string;
  avgDrawOdds: string;
  maxAwayWinOdds: string;
  avgAwayWinOdds: string;
  betfairExchangeHomeWinOdds: string;
  betfairExchangeDrawOdds: string;
  betfairExchangeAwayWinOdds: string;
  numberOfBookmakersForOverUnder25: string;
  maxOver25GoalsOdds: string;
  avgOver25GoalsOdds: string;
  maxUnder25GoalsOdds: string;
  avgUnder25GoalsOdds: string;
  gamebookersOver25GoalsOdds: string;
  gamebookersUnder25GoalsOdds: string;
  bet365Over25GoalsOdds: string;
  bet365Under25GoalsOdds: string;
  pinnacleOver25GoalsOdds: string;
  pinnacleUnder25GoalsOdds: string;
  marketMaxOver25GoalsOdds: string;
  marketMaxUnder25GoalsOdds: string;
  marketAvgOver25GoalsOdds: string;
  marketAvgUnder25GoalsOdds: string;
  numberOfBookmakersForAsianHandicap: string;
  betbrainHandicapSize: string;
  marketHandicapSize: string;
  maxAsianHandicapHomeOdds: string;
  avgAsianHandicapHomeOdds: string;
  maxAsianHandicapAwayOdds: string;
  avgAsianHandicapAwayOdds: string;
  gamebookersAsianHandicapHomeOdds: string;
  gamebookersAsianHandicapAwayOdds: string;
  gamebookersHandicapSize: string;
  ladbrokesAsianHandicapHomeOdds: string;
  ladbrokesAsianHandicapAwayOdds: string;
  ladbrokesHandicapSize: string;
  bet365AsianHandicapHomeOdds: string;
  bet365AsianHandicapAwayOdds: string;
  bet365HandicapSize: string;
  pinnacleAsianHandicapHomeOdds: string;
  pinnacleAsianHandicapAwayOdds: string;
  marketMaxAsianHandicapHomeOdds: string;
  marketMaxAsianHandicapAwayOdds: string;
  marketAvgAsianHandicapHomeOdds: string;
  marketAvgAsianHandicapAwayOdds: string;
};

export const ALL_MATCH_DATA_KEYS: (keyof MatchData)[] = [
  "leagueDivision",
  "leagueCountry",
  "leagueName",
  "season",
  "homeTeam",
  "awayTeam",
  "fullTimeHomeGoals",
  "fullTimeAwayGoals",
  "fullTimeResult",
  "avgHomeWinOdds",
  "avgDrawOdds",
  "avgAwayWinOdds",
  "halfTimeHomeGoals",
  "halfTimeAwayGoals",
  "halfTimeResult",
  "matchDate",
  "matchTime",
  "attendance",
  "referee",
  "homeShots",
  "awayShots",
  "homeShotsOnTarget",
  "awayShotsOnTarget",
  "homeHitWoodwork",
  "awayHitWoodwork",
  "homeCorners",
  "awayCorners",
  "homeFouls",
  "awayFouls",
  "homeFreeKicksConceded",
  "awayFreeKicksConceded",
  "homeOffsides",
  "awayOffsides",
  "homeYellowCards",
  "awayYellowCards",
  "homeRedCards",
  "awayRedCards",
  "homeBookingsPoints",
  "awayBookingsPoints",
  "bet365HomeWinOdds",
  "bet365DrawOdds",
  "bet365AwayWinOdds",
  "betfairHomeWinOdds",
  "betfairDrawOdds",
  "betfairAwayWinOdds",
  "blueSquareHomeWinOdds",
  "blueSquareDrawOdds",
  "blueSquareAwayWinOdds",
  "betAndWinHomeWinOdds",
  "betAndWinDrawOdds",
  "betAndWinAwayWinOdds",
  "gamebookersHomeWinOdds",
  "gamebookersDrawOdds",
  "gamebookersAwayWinOdds",
  "interwettenHomeWinOdds",
  "interwettenDrawOdds",
  "interwettenAwayWinOdds",
  "ladbrokesHomeWinOdds",
  "ladbrokesDrawOdds",
  "ladbrokesAwayWinOdds",
  "pinnacleHomeWinOdds",
  "pinnacleDrawOdds",
  "pinnacleAwayWinOdds",
  "sportingOddsHomeWinOdds",
  "sportingOddsDrawOdds",
  "sportingOddsAwayWinOdds",
  "sportingbetHomeWinOdds",
  "sportingbetDrawOdds",
  "sportingbetAwayWinOdds",
  "stanJamesHomeWinOdds",
  "stanJamesDrawOdds",
  "stanJamesAwayWinOdds",
  "stanleybetHomeWinOdds",
  "stanleybetDrawOdds",
  "stanleybetAwayWinOdds",
  "vcBetHomeWinOdds",
  "vcBetDrawOdds",
  "vcBetAwayWinOdds",
  "williamHillHomeWinOdds",
  "williamHillDrawOdds",
  "williamHillAwayWinOdds",
  "numberOfBookmakersFor1X2",
  "maxHomeWinOdds",
  "maxDrawOdds",
  "maxAwayWinOdds",
  "betfairExchangeHomeWinOdds",
  "betfairExchangeDrawOdds",
  "betfairExchangeAwayWinOdds",
  "numberOfBookmakersForOverUnder25",
  "maxOver25GoalsOdds",
  "avgOver25GoalsOdds",
  "maxUnder25GoalsOdds",
  "avgUnder25GoalsOdds",
  "gamebookersOver25GoalsOdds",
  "gamebookersUnder25GoalsOdds",
  "bet365Over25GoalsOdds",
  "bet365Under25GoalsOdds",
  "pinnacleOver25GoalsOdds",
  "pinnacleUnder25GoalsOdds",
  "marketMaxOver25GoalsOdds",
  "marketMaxUnder25GoalsOdds",
  "marketAvgOver25GoalsOdds",
  "marketAvgUnder25GoalsOdds",
  "numberOfBookmakersForAsianHandicap",
  "betbrainHandicapSize",
  "marketHandicapSize",
  "maxAsianHandicapHomeOdds",
  "avgAsianHandicapHomeOdds",
  "maxAsianHandicapAwayOdds",
  "avgAsianHandicapAwayOdds",
  "gamebookersAsianHandicapHomeOdds",
  "gamebookersAsianHandicapAwayOdds",
  "gamebookersHandicapSize",
  "ladbrokesAsianHandicapHomeOdds",
  "ladbrokesAsianHandicapAwayOdds",
  "ladbrokesHandicapSize",
  "bet365AsianHandicapHomeOdds",
  "bet365AsianHandicapAwayOdds",
  "bet365HandicapSize",
  "pinnacleAsianHandicapHomeOdds",
  "pinnacleAsianHandicapAwayOdds",
  "marketMaxAsianHandicapHomeOdds",
  "marketMaxAsianHandicapAwayOdds",
  "marketAvgAsianHandicapHomeOdds",
  "marketAvgAsianHandicapAwayOdds",
];
