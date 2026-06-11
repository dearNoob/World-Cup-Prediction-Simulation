import { useMemo } from 'react';
import TeamName from '../common/TeamName';
import { getRoundDisplayName } from '../../utils/tournamentUtils';
import { getTeamsByGroup } from '../../data/teams';
import { getFixturesByGroup } from '../../data/fixtures';
import { calculateGroupStandings, rankGroupStandings } from '../../utils/standingsUtils';

/**
 * TournamentPath — Displays the match-by-match journey of the champion team.
 * Calculates their group stage record and details their knockout victories.
 *
 * @param {Object} team                - Champion team object
 * @param {Object} groupPredictions   - Group predictions state
 * @param {Object} knockoutPredictions - Knockout predictions state
 * @param {Object} bracket            - Derived bracket object
 */
const TournamentPath = ({ team, groupPredictions, knockoutPredictions, bracket }) => {
  if (!team) return null;

  // 1. Calculate Group Stage Stats for Champion
  const groupStats = useMemo(() => {
    const groupLetter = team.group;
    const teams = getTeamsByGroup(groupLetter);
    const fixtures = getFixturesByGroup(groupLetter);
    const standings = rankGroupStandings(calculateGroupStandings(teams, groupPredictions, fixtures));
    const champRow = standings.find((row) => row.team.id === team.id);
    return champRow || null;
  }, [team, groupPredictions]);

  // 2. Extract Knockout Victories
  const knockoutVictories = useMemo(() => {
    if (!bracket) return [];

    const rounds = ['r32', 'r16', 'qf', 'sf', 'final'];
    const victories = [];

    rounds.forEach((roundKey) => {
      const roundMatches = Array.isArray(bracket[roundKey])
        ? bracket[roundKey]
        : [bracket[roundKey]]; // 'final' is a single object

      const match = roundMatches.find(
        (m) => m && (m.homeTeam?.id === team.id || m.awayTeam?.id === team.id)
      );

      if (match) {
        const opponent = match.homeTeam?.id === team.id ? match.awayTeam : match.homeTeam;
        const pred = knockoutPredictions[match.id];
        const isWinner = pred?.winnerId === team.id;

        if (opponent && isWinner) {
          victories.push({
            round: match.round,
            opponent,
          });
        }
      }
    });

    return victories;
  }, [team, knockoutPredictions, bracket]);

  return (
    <div className="glass-card p-6 w-full max-w-xl mx-auto flex flex-col gap-6 border border-fifa-border/60">
      <h2 className="text-lg font-bold text-white border-b border-fifa-border/60 pb-3">
        Tournament Journey
      </h2>

      {/* Group Stage Record */}
      {groupStats && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-fifa-dark/40 border border-fifa-border/40 rounded-xl">
          <span className="text-xs uppercase font-extrabold tracking-wider text-fifa-muted">
            Group Stage (Group {team.group})
          </span>
          <div className="text-sm font-semibold text-white">
            <span className="text-emerald-400">{groupStats.won}W</span>
            <span className="text-fifa-muted px-1">•</span>
            <span className="text-yellow-400">{groupStats.drawn}D</span>
            <span className="text-fifa-muted px-1">•</span>
            <span className="text-red-400">{groupStats.lost}L</span>
            <span className="text-fifa-muted px-4">|</span>
            <span className="text-gray-300">GF {groupStats.goalsFor} - GA {groupStats.goalsAgainst}</span>
          </div>
        </div>
      )}

      {/* Knockout Victories */}
      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-fifa-gold px-1">
          Knockout Stages
        </span>

        {knockoutVictories.length === 0 ? (
          <p className="text-sm text-fifa-muted italic px-1">
            No knockout victories recorded yet.
          </p>
        ) : (
          <div className="relative border-l-2 border-fifa-border/60 pl-5 ml-2.5 flex flex-col gap-6">
            {knockoutVictories.map((victory) => (
              <div key={victory.round} className="relative">
                {/* Dot marker */}
                <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-fifa-gold ring-4 ring-fifa-dark" />

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-fifa-muted uppercase tracking-wider">
                    {getRoundDisplayName(victory.round)}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span>Defeated</span>
                    <TeamName team={victory.opponent} flagSize={20} className="text-fifa-gold font-bold" />
                  </div>
                </div>
              </div>
            ))}

            {/* Champion trophy milestone */}
            <div className="relative">
              <span className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-fifa-dark">
                🏆
              </span>
              <div className="flex flex-col gap-0.5 pl-1.5">
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                  Champion Reveal
                </span>
                <span className="text-sm font-black text-white">
                  World Cup Winner 👑
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentPath;
