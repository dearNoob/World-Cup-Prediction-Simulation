/**
 * Qualification Engine
 *
 * Determines which teams qualify from the group stage:
 * - Top 2 from each group (24 teams)
 * - Best 8 out of 12 third-placed teams (8 teams)
 * - Total: 32 teams advance to Round of 32
 */

import { GROUP_FIXTURES } from '../data/fixtures';

/**
 * Extract group winners and runners-up from fully-ranked standings.
 * Only includes teams from groups where all 6 matches have been predicted.
 *
 * @param {Object} allGroupStandings - { [groupLetter]: RankedTeamStanding[] }
 * @returns {{ winners: Object[], runnersUp: Object[] }}
 */
export const getGroupQualifiers = (allGroupStandings) => {
  const winners = [];
  const runnersUp = [];

  Object.entries(allGroupStandings).forEach(([group, standings]) => {
    // Only consider groups where all teams have played 3 matches
    if (standings.length >= 2 && standings[0].played === 3) {
      winners.push({ ...standings[0], group });
      runnersUp.push({ ...standings[1], group });
    }
  });

  return { winners, runnersUp };
};

/**
 * Collect the best 8 third-placed teams from all groups.
 * Ranking criteria: Points → Goal Difference → Goals For
 *
 * @param {Object} allGroupStandings - { [groupLetter]: RankedTeamStanding[] }
 * @returns {{ qualified: Object[], eliminated: Object[] }}
 */
export const getBestThirdPlaceTeams = (allGroupStandings) => {
  const thirdPlaceCandidates = Object.entries(allGroupStandings)
    .filter(([, standings]) => standings.length >= 3 && standings[2].played === 3)
    .map(([group, standings]) => ({ ...standings[2], group }));

  // Sort by: Points desc → GD desc → GF desc
  const ranked = [...thirdPlaceCandidates].sort(
    (a, b) =>
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      b.goalsFor - a.goalsFor
  );

  return {
    qualified: ranked.slice(0, 8),
    eliminated: ranked.slice(8),
  };
};

/**
 * Check if ALL 72 group stage matches have been predicted.
 *
 * @param {Object} predictions - { [fixtureId]: { homeScore, awayScore } }
 * @returns {boolean}
 */
export const isGroupStageComplete = (predictions) =>
  GROUP_FIXTURES.every((f) => {
    const p = predictions[f.id];
    return p && p.homeScore !== null && p.homeScore !== undefined &&
           p.awayScore !== null && p.awayScore !== undefined;
  });

/**
 * Count how many group stage matches have been predicted (0–72).
 *
 * @param {Object} predictions - Full predictions object
 * @returns {number}
 */
export const getPredictedMatchCount = (predictions) =>
  GROUP_FIXTURES.filter((f) => {
    const p = predictions[f.id];
    return p && p.homeScore !== null && p.homeScore !== undefined &&
           p.awayScore !== null && p.awayScore !== undefined;
  }).length;
