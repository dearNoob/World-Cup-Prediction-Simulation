import { Check } from 'lucide-react';
import TeamName from '../common/TeamName';

/**
 * KnockoutMatchCard — Renders a single knockout match card.
 * Users click/tap on either team to select the winner.
 * Tapping the already-selected winner deselects them.
 *
 * @param {Object}   match        - Match object: { id, round, homeTeam, awayTeam }
 * @param {Object}   prediction   - Prediction value: { winnerId } or undefined
 * @param {Function} onSelectWinner - Callback: (matchId, teamId) => void
 * @param {string}   matchLabel   - Display label for the match (e.g. "Match 1")
 */
const KnockoutMatchCard = ({ match, prediction, onSelectWinner, matchLabel }) => {
  const { id, homeTeam, awayTeam } = match;
  const winnerId = prediction?.winnerId || null;

  const handleSelectHome = () => {
    if (homeTeam) {
      onSelectWinner(id, homeTeam.id);
    }
  };

  const handleSelectAway = () => {
    if (awayTeam) {
      onSelectWinner(id, awayTeam.id);
    }
  };

  const isHomeSelected = winnerId !== null && homeTeam !== null && winnerId === homeTeam.id;
  const isAwaySelected = winnerId !== null && awayTeam !== null && winnerId === awayTeam.id;

  const isHomeEliminated = winnerId !== null && homeTeam !== null && winnerId !== homeTeam.id;
  const isAwayEliminated = winnerId !== null && awayTeam !== null && winnerId !== awayTeam.id;

  return (
    <div className="knockout-card border border-fifa-border/60 hover:border-fifa-gold/30 transition-all duration-300">
      {/* Match Label Header */}
      <div className="bg-fifa-border/30 border-b border-fifa-border/40 px-3 py-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-fifa-muted">
        <span>{matchLabel}</span>
        {winnerId && (
          <span className="text-fifa-gold flex items-center gap-1">
            <Check size={10} strokeWidth={3} /> Decided
          </span>
        )}
      </div>

      {/* Team rows */}
      <div className="flex flex-col divide-y divide-fifa-border/40">
        {/* Home Team Row */}
        <div
          onClick={handleSelectHome}
          className={`knockout-team ${
            !homeTeam
              ? 'knockout-team-tbd'
              : isHomeSelected
              ? 'knockout-team-selected'
              : isHomeEliminated
              ? 'knockout-team-eliminated'
              : 'hover:bg-white/5'
          }`}
        >
          <TeamName team={homeTeam} flagSize={20} className="text-xs font-semibold flex-1 text-white" />
          {isHomeSelected && (
            <span className="w-5 h-5 rounded-full bg-fifa-gold flex items-center justify-center shadow-lg shadow-fifa-gold/20">
              <Check size={12} strokeWidth={3} className="text-fifa-dark" />
            </span>
          )}
        </div>

        {/* Away Team Row */}
        <div
          onClick={handleSelectAway}
          className={`knockout-team ${
            !awayTeam
              ? 'knockout-team-tbd'
              : isAwaySelected
              ? 'knockout-team-selected'
              : isAwayEliminated
              ? 'knockout-team-eliminated'
              : 'hover:bg-white/5'
          }`}
        >
          <TeamName team={awayTeam} flagSize={20} className="text-xs font-semibold flex-1 text-white" />
          {isAwaySelected && (
            <span className="w-5 h-5 rounded-full bg-fifa-gold flex items-center justify-center shadow-lg shadow-fifa-gold/20">
              <Check size={12} strokeWidth={3} className="text-fifa-dark" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnockoutMatchCard;
