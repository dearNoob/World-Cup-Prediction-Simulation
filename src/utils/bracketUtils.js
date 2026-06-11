/**
 * Bracket Engine
 *
 * Generates the Round of 32 bracket, advances winners through rounds,
 * and determines the champion.
 */

import { TEAMS, getTeamById } from '../data/teams';

/**
 * Pre-defined R32 matchup skeleton.
 * Each entry defines which group positions feed into each R32 slot.
 * "1A" = Group A winner, "2B" = Group B runner-up, "TP" = third-place slot.
 *
 * Third-place teams are filled in ranked order (TP1 = best 3rd, TP8 = 8th-best 3rd).
 */
const R32_TEMPLATE = [
  { id: 'R32_M1',  home: { type: 'winner',   group: 'A' }, away: { type: 'runnerup', group: 'B' } },
  { id: 'R32_M2',  home: { type: 'winner',   group: 'C' }, away: { type: 'third',    index: 0   } },
  { id: 'R32_M3',  home: { type: 'winner',   group: 'E' }, away: { type: 'runnerup', group: 'F' } },
  { id: 'R32_M4',  home: { type: 'winner',   group: 'G' }, away: { type: 'third',    index: 1   } },
  { id: 'R32_M5',  home: { type: 'winner',   group: 'I' }, away: { type: 'runnerup', group: 'J' } },
  { id: 'R32_M6',  home: { type: 'winner',   group: 'K' }, away: { type: 'third',    index: 2   } },
  { id: 'R32_M7',  home: { type: 'runnerup', group: 'A' }, away: { type: 'runnerup', group: 'C' } },
  { id: 'R32_M8',  home: { type: 'winner',   group: 'B' }, away: { type: 'third',    index: 3   } },
  { id: 'R32_M9',  home: { type: 'winner',   group: 'D' }, away: { type: 'runnerup', group: 'E' } },
  { id: 'R32_M10', home: { type: 'winner',   group: 'F' }, away: { type: 'third',    index: 4   } },
  { id: 'R32_M11', home: { type: 'winner',   group: 'H' }, away: { type: 'runnerup', group: 'I' } },
  { id: 'R32_M12', home: { type: 'winner',   group: 'J' }, away: { type: 'third',    index: 5   } },
  { id: 'R32_M13', home: { type: 'runnerup', group: 'G' }, away: { type: 'runnerup', group: 'K' } },
  { id: 'R32_M14', home: { type: 'winner',   group: 'L' }, away: { type: 'third',    index: 6   } },
  { id: 'R32_M15', home: { type: 'runnerup', group: 'D' }, away: { type: 'runnerup', group: 'L' } },
  { id: 'R32_M16', home: { type: 'runnerup', group: 'H' }, away: { type: 'third',    index: 7   } },
];

/**
 * Which R32 match pairs feed into each R16 match.
 */
const R16_PAIRINGS = [
  { id: 'R16_M1', home: 'R32_M1',  away: 'R32_M2'  },
  { id: 'R16_M2', home: 'R32_M3',  away: 'R32_M4'  },
  { id: 'R16_M3', home: 'R32_M5',  away: 'R32_M6'  },
  { id: 'R16_M4', home: 'R32_M7',  away: 'R32_M8'  },
  { id: 'R16_M5', home: 'R32_M9',  away: 'R32_M10' },
  { id: 'R16_M6', home: 'R32_M11', away: 'R32_M12' },
  { id: 'R16_M7', home: 'R32_M13', away: 'R32_M14' },
  { id: 'R16_M8', home: 'R32_M15', away: 'R32_M16' },
];

const QF_PAIRINGS = [
  { id: 'QF_M1', home: 'R16_M1', away: 'R16_M2' },
  { id: 'QF_M2', home: 'R16_M3', away: 'R16_M4' },
  { id: 'QF_M3', home: 'R16_M5', away: 'R16_M6' },
  { id: 'QF_M4', home: 'R16_M7', away: 'R16_M8' },
];

const SF_PAIRINGS = [
  { id: 'SF_M1', home: 'QF_M1', away: 'QF_M2' },
  { id: 'SF_M2', home: 'QF_M3', away: 'QF_M4' },
];

/**
 * Resolve a team from a bracket slot definition.
 * @param {Object} slot      - { type, group } or { type, index }
 * @param {Object[]} winners - Group winners
 * @param {Object[]} runnersUp - Group runners-up
 * @param {Object[]} thirdPlace - Best 8 third-placed teams
 * @returns {Object|null} Team object or null if not yet determined
 */
const resolveSlot = (slot, winners, runnersUp, thirdPlace) => {
  if (slot.type === 'winner') {
    const found = winners.find((w) => w.group === slot.group);
    return found ? found.team : null;
  }
  if (slot.type === 'runnerup') {
    const found = runnersUp.find((r) => r.group === slot.group);
    return found ? found.team : null;
  }
  if (slot.type === 'third') {
    const tp = thirdPlace[slot.index];
    return tp ? tp.team : null;
  }
  return null;
};

/**
 * Generate the full Round of 32 bracket from group stage results.
 *
 * @param {Object[]} winners     - 12 group winners (with .group and .team)
 * @param {Object[]} runnersUp   - 12 group runners-up
 * @param {Object[]} thirdPlace  - Best 8 third-placed teams (sorted by rank)
 * @returns {Object[]} Array of 16 R32 match objects
 */
export const generateRound32 = (winners, runnersUp, thirdPlace) => {
  return R32_TEMPLATE.map((template) => {
    const homeTeam = resolveSlot(template.home, winners, runnersUp, thirdPlace);
    const awayTeam = resolveSlot(template.away, winners, runnersUp, thirdPlace);
    return {
      id: template.id,
      round: 'R32',
      homeTeam,
      awayTeam,
    };
  });
};

/**
 * Get the winner of a knockout match from predictions.
 * @param {string} matchId - The match ID
 * @param {Object} knockoutPredictions - All knockout predictions
 * @returns {Object|null} Team object or null
 */
const getMatchWinner = (matchId, knockoutPredictions) => {
  const prediction = knockoutPredictions[matchId];
  if (!prediction?.winnerId) return null;
  return getTeamById(prediction.winnerId) || null;
};

/**
 * Generate a round of matches based on the pairings and previous round results.
 *
 * @param {Object[]} pairings           - Round pairings ({ id, home, away })
 * @param {string}   roundName          - Round identifier (e.g., 'R16')
 * @param {Object}   knockoutPredictions - All knockout predictions
 * @returns {Object[]} Array of match objects for this round
 */
export const generateRound = (pairings, roundName, knockoutPredictions) => {
  return pairings.map((pairing) => ({
    id: pairing.id,
    round: roundName,
    homeTeam: getMatchWinner(pairing.home, knockoutPredictions),
    awayTeam: getMatchWinner(pairing.away, knockoutPredictions),
  }));
};

/**
 * Build the complete knockout bracket from R32 through Final.
 *
 * @param {Object[]} winners             - Group winners
 * @param {Object[]} runnersUp           - Group runners-up
 * @param {Object[]} thirdPlace          - Best 8 third-placed teams
 * @param {Object}   knockoutPredictions - All knockout predictions
 * @returns {Object} Full bracket: { r32, r16, qf, sf, thirdPlace, final }
 */
export const generateFullBracket = (winners, runnersUp, thirdPlace, knockoutPredictions) => {
  // Round of 32
  const r32 = generateRound32(winners, runnersUp, thirdPlace);

  // Round of 16 — teams come from R32 winners
  const r16 = generateRound(R16_PAIRINGS, 'R16', knockoutPredictions);

  // Quarter-Finals — teams come from R16 winners
  const qf = generateRound(QF_PAIRINGS, 'QF', knockoutPredictions);

  // Semi-Finals — teams come from QF winners
  const sf = generateRound(SF_PAIRINGS, 'SF', knockoutPredictions);

  // Third Place Match — losers of SF
  const sf1Winner = getMatchWinner('SF_M1', knockoutPredictions);
  const sf2Winner = getMatchWinner('SF_M2', knockoutPredictions);

  // SF participants (from QF results)
  const sf1Home = getMatchWinner('QF_M1', knockoutPredictions);
  const sf1Away = getMatchWinner('QF_M2', knockoutPredictions);
  const sf2Home = getMatchWinner('QF_M3', knockoutPredictions);
  const sf2Away = getMatchWinner('QF_M4', knockoutPredictions);

  // Third-place match: losers of each semi-final
  const tpmHome = sf1Winner && sf1Home && sf1Away
    ? (sf1Winner.id === sf1Home.id ? sf1Away : sf1Home)
    : null;
  const tpmAway = sf2Winner && sf2Home && sf2Away
    ? (sf2Winner.id === sf2Home.id ? sf2Away : sf2Home)
    : null;

  const thirdPlaceMatch = {
    id: 'TPM',
    round: 'TPM',
    homeTeam: tpmHome,
    awayTeam: tpmAway,
  };

  // Final
  const finalMatch = {
    id: 'FINAL',
    round: 'FINAL',
    homeTeam: sf1Winner,
    awayTeam: sf2Winner,
  };

  return { r32, r16, qf, sf, thirdPlace: thirdPlaceMatch, final: finalMatch };
};

/**
 * Returns the champion team or null.
 *
 * @param {Object} knockoutPredictions - All knockout predictions
 * @returns {Object|null} Team object or null
 */
export const getChampion = (knockoutPredictions) => {
  const finalPrediction = knockoutPredictions['FINAL'];
  if (!finalPrediction?.winnerId) return null;
  return getTeamById(finalPrediction.winnerId) || null;
};

/**
 * Count how many predictions exist for a specific round.
 *
 * @param {string}   roundPrefix        - e.g., "R32", "R16", "QF", "SF"
 * @param {number}   totalMatches       - Expected matches in this round
 * @param {Object}   knockoutPredictions - All knockout predictions
 * @returns {{ predicted: number, total: number }}
 */
export const getRoundProgress = (roundPrefix, totalMatches, knockoutPredictions) => {
  let predicted = 0;
  for (let i = 1; i <= totalMatches; i++) {
    const matchId = `${roundPrefix}_M${i}`;
    if (knockoutPredictions[matchId]?.winnerId) {
      predicted++;
    }
  }
  return { predicted, total: totalMatches };
};

/**
 * Check if a full round is complete (all winners selected).
 *
 * @param {string}   roundPrefix        - e.g., "R32"
 * @param {number}   totalMatches       - Expected matches in this round
 * @param {Object}   knockoutPredictions - All knockout predictions
 * @returns {boolean}
 */
export const isRoundComplete = (roundPrefix, totalMatches, knockoutPredictions) => {
  const { predicted, total } = getRoundProgress(roundPrefix, totalMatches, knockoutPredictions);
  return predicted === total;
};
