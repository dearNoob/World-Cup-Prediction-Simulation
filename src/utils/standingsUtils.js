/**
 * Group Standings Calculation Engine
 *
 * Calculates raw standings and applies FIFA tiebreaker rules
 * for group stage ranking (MVP: Points → GD → GF).
 */

/**
 * Calculate raw standings for a single group.
 * Only counts fixtures that have a full prediction (both home and away scores present).
 *
 * @param {Object[]} teams      - The 4 teams in this group
 * @param {Object}   predictions - { [fixtureId]: { homeScore, awayScore } }
 * @param {Object[]} fixtures   - The 6 fixtures for this group
 * @returns {Object[]} Array of TeamStanding objects (unsorted)
 */
export const calculateGroupStandings = (teams, predictions, fixtures) => {
  // Initialize standings map for each team in the group
  const standingsMap = {};
  teams.forEach((team) => {
    standingsMap[team.id] = {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  // Process each fixture that has a valid prediction
  fixtures.forEach((fixture) => {
    const prediction = predictions[fixture.id];

    // Skip if no prediction or incomplete prediction
    if (!prediction || prediction.homeScore === null || prediction.awayScore === null ||
        prediction.homeScore === undefined || prediction.awayScore === undefined) {
      return;
    }

    const homeScore = parseInt(prediction.homeScore, 10);
    const awayScore = parseInt(prediction.awayScore, 10);

    // Validate parsed scores
    if (isNaN(homeScore) || isNaN(awayScore)) return;

    const home = standingsMap[fixture.homeTeamId];
    const away = standingsMap[fixture.awayTeamId];

    if (!home || !away) return;

    // Update matches played
    home.played += 1;
    away.played += 1;

    // Update goals
    home.goalsFor += homeScore;
    home.goalsAgainst += awayScore;
    away.goalsFor += awayScore;
    away.goalsAgainst += homeScore;

    // Determine result and update points
    if (homeScore > awayScore) {
      // Home win
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (homeScore < awayScore) {
      // Away win
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      // Draw
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  // Calculate goal difference for all teams
  Object.values(standingsMap).forEach((s) => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
  });

  return Object.values(standingsMap);
};

/**
 * Sort a group's standings by MVP tiebreaker rules.
 * Returns a new sorted array with position numbers (does not mutate input).
 *
 * Ranking order:
 * 1. Points (descending)
 * 2. Goal Difference (descending)
 * 3. Goals For (descending)
 *
 * @param {Object[]} standings - Raw standings from calculateGroupStandings
 * @returns {Object[]} Sorted standings with position property added
 */
export const rankGroupStandings = (standings) =>
  [...standings]
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor
    )
    .map((s, i) => ({ ...s, position: i + 1 }));

/**
 * Returns how many of the 6 matches in a group have been predicted.
 *
 * @param {string}   groupLetter - The group letter (A-L)
 * @param {Object}   predictions - Full predictions object
 * @param {Object[]} fixtures    - All fixtures (will be filtered)
 * @returns {{ predicted: number, total: number }}
 */
export const getGroupProgress = (groupLetter, predictions, fixtures) => {
  const groupFixtures = fixtures.filter((f) => f.group === groupLetter);
  const predicted = groupFixtures.filter((f) => {
    const p = predictions[f.id];
    return p && p.homeScore !== null && p.homeScore !== undefined &&
           p.awayScore !== null && p.awayScore !== undefined;
  }).length;
  return { predicted, total: groupFixtures.length };
};

/**
 * Check if a single group has all 6 matches predicted.
 *
 * @param {string}   groupLetter - The group letter
 * @param {Object}   predictions - Full predictions object
 * @param {Object[]} fixtures    - All fixtures
 * @returns {boolean}
 */
export const isGroupComplete = (groupLetter, predictions, fixtures) => {
  const progress = getGroupProgress(groupLetter, predictions, fixtures);
  return progress.predicted === progress.total;
};
