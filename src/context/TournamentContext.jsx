import { createContext, useMemo, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TEAMS, getTeamsByGroup } from '../data/teams';
import { GROUPS } from '../data/groups';
import { GROUP_FIXTURES, getFixturesByGroup } from '../data/fixtures';
import { calculateGroupStandings, rankGroupStandings } from '../utils/standingsUtils';
import { getGroupQualifiers, getBestThirdPlaceTeams, isGroupStageComplete, getPredictedMatchCount } from '../utils/qualificationUtils';
import { generateFullBracket, getChampion } from '../utils/bracketUtils';
import { initStorage } from '../services/localStorageService';

/**
 * TournamentContext
 * Central state management for the entire World Cup predictor.
 * All derived data (standings, qualifications, bracket) is computed via useMemo.
 */
export const TournamentContext = createContext(null);

export const TournamentProvider = ({ children }) => {
  // Initialize schema version on first load
  useEffect(() => {
    initStorage();
  }, []);

  // ── Raw prediction state (persisted to localStorage) ──
  const [groupPredictions, setGroupPredictions] = useLocalStorage(
    'wc2026_group_predictions',
    {}
  );
  const [knockoutPredictions, setKnockoutPredictions] = useLocalStorage(
    'wc2026_knockout_predictions',
    {}
  );

  // ── Actions ──

  /**
   * Update a group stage match prediction.
   * @param {string}      fixtureId - e.g., "A1"
   * @param {number|null} homeScore - Home team score (null = not predicted)
   * @param {number|null} awayScore - Away team score (null = not predicted)
   */
  const updateGroupScore = useCallback(
    (fixtureId, homeScore, awayScore) => {
      setGroupPredictions((prev) => {
        // If both scores are null, remove the prediction
        if (homeScore === null && awayScore === null) {
          const next = { ...prev };
          delete next[fixtureId];
          return next;
        }
        return {
          ...prev,
          [fixtureId]: { homeScore, awayScore },
        };
      });
    },
    [setGroupPredictions]
  );

  /**
   * Update a knockout match prediction (select winner).
   * Also clears downstream predictions if the winner changes, to prevent stale data.
   * @param {string} matchId  - e.g., "R32_M1"
   * @param {number} winnerId - The team ID of the selected winner
   */
  const updateKnockoutWinner = useCallback(
    (matchId, winnerId) => {
      setKnockoutPredictions((prev) => {
        const next = { ...prev };

        // If clicking the same winner again, deselect (toggle behavior)
        if (next[matchId]?.winnerId === winnerId) {
          delete next[matchId];
          // Clear all downstream predictions that might reference this team
          clearDownstream(next, matchId);
          return next;
        }

        // Set the winner
        next[matchId] = { winnerId };

        // Clear downstream if changing a previous selection
        clearDownstream(next, matchId);

        return next;
      });
    },
    [setKnockoutPredictions]
  );

  /**
   * Reset the entire tournament — clear all predictions and localStorage.
   */
  const resetTournament = useCallback(() => {
    setGroupPredictions({});
    setKnockoutPredictions({});
    localStorage.removeItem('wc2026_group_predictions');
    localStorage.removeItem('wc2026_knockout_predictions');
  }, [setGroupPredictions, setKnockoutPredictions]);

  // ── Derived state (memoized) ──

  /**
   * Group standings for all 12 groups — recalculated when predictions change.
   */
  const groupStandings = useMemo(() => {
    const standings = {};
    GROUPS.forEach((groupLetter) => {
      const teams = getTeamsByGroup(groupLetter);
      const fixtures = getFixturesByGroup(groupLetter);
      const raw = calculateGroupStandings(teams, groupPredictions, fixtures);
      standings[groupLetter] = rankGroupStandings(raw);
    });
    return standings;
  }, [groupPredictions]);

  /**
   * Group stage completion stats.
   */
  const groupStageComplete = useMemo(
    () => isGroupStageComplete(groupPredictions),
    [groupPredictions]
  );

  const predictedMatchCount = useMemo(
    () => getPredictedMatchCount(groupPredictions),
    [groupPredictions]
  );

  const groupsCompletedCount = useMemo(() => {
    return GROUPS.filter((g) => {
      const standings = groupStandings[g];
      return standings && standings[0]?.played === 3;
    }).length;
  }, [groupStandings]);

  /**
   * Qualified teams from group stage.
   */
  const qualifiedTeams = useMemo(() => {
    const { winners, runnersUp } = getGroupQualifiers(groupStandings);
    const { qualified: thirdPlace, eliminated: thirdEliminated } =
      getBestThirdPlaceTeams(groupStandings);
    return { winners, runnersUp, thirdPlace, thirdEliminated };
  }, [groupStandings]);

  /**
   * Full knockout bracket.
   */
  const knockoutBracket = useMemo(() => {
    if (!groupStageComplete) return null;
    return generateFullBracket(
      qualifiedTeams.winners,
      qualifiedTeams.runnersUp,
      qualifiedTeams.thirdPlace,
      knockoutPredictions
    );
  }, [groupStageComplete, qualifiedTeams, knockoutPredictions]);

  /**
   * Champion team.
   */
  const champion = useMemo(
    () => getChampion(knockoutPredictions),
    [knockoutPredictions]
  );

  // ── Context value ──
  const contextValue = useMemo(
    () => ({
      // Raw state
      groupPredictions,
      knockoutPredictions,

      // Derived state
      groupStandings,
      qualifiedTeams,
      knockoutBracket,
      champion,

      // Stage status
      groupStageComplete,
      groupsCompletedCount,
      predictedMatchCount,

      // Actions
      updateGroupScore,
      updateKnockoutWinner,
      resetTournament,
    }),
    [
      groupPredictions,
      knockoutPredictions,
      groupStandings,
      qualifiedTeams,
      knockoutBracket,
      champion,
      groupStageComplete,
      groupsCompletedCount,
      predictedMatchCount,
      updateGroupScore,
      updateKnockoutWinner,
      resetTournament,
    ]
  );

  return (
    <TournamentContext.Provider value={contextValue}>
      {children}
    </TournamentContext.Provider>
  );
};

// ── Helper: Clear downstream knockout predictions ──

/**
 * Clears predictions that depend on a match result, preventing stale data.
 * E.g., if you change R32_M1's winner, any R16_M1 pick that relied on it
 * should be cleared, and so on up the bracket.
 */
const DOWNSTREAM_MAP = {
  // R32 → R16
  R32_M1: ['R16_M1'], R32_M2: ['R16_M1'],
  R32_M3: ['R16_M2'], R32_M4: ['R16_M2'],
  R32_M5: ['R16_M3'], R32_M6: ['R16_M3'],
  R32_M7: ['R16_M4'], R32_M8: ['R16_M4'],
  R32_M9: ['R16_M5'], R32_M10: ['R16_M5'],
  R32_M11: ['R16_M6'], R32_M12: ['R16_M6'],
  R32_M13: ['R16_M7'], R32_M14: ['R16_M7'],
  R32_M15: ['R16_M8'], R32_M16: ['R16_M8'],
  // R16 → QF
  R16_M1: ['QF_M1'], R16_M2: ['QF_M1'],
  R16_M3: ['QF_M2'], R16_M4: ['QF_M2'],
  R16_M5: ['QF_M3'], R16_M6: ['QF_M3'],
  R16_M7: ['QF_M4'], R16_M8: ['QF_M4'],
  // QF → SF
  QF_M1: ['SF_M1'], QF_M2: ['SF_M1'],
  QF_M3: ['SF_M2'], QF_M4: ['SF_M2'],
  // SF → TPM + FINAL
  SF_M1: ['TPM', 'FINAL'], SF_M2: ['TPM', 'FINAL'],
};

function clearDownstream(predictions, matchId) {
  const targets = DOWNSTREAM_MAP[matchId];
  if (!targets) return;
  targets.forEach((targetId) => {
    if (predictions[targetId]) {
      delete predictions[targetId];
      // Recurse to clear further downstream
      clearDownstream(predictions, targetId);
    }
  });
}
