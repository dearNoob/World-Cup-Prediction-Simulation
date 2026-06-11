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
    <div className="knockout-card group border border-fifa-border/50 hover:border-fifa-gold/60 hover:shadow-lg hover:shadow-fifa-gold/10 transition-all duration-300 bg-gradient-to-br from-fifa-card/80 to-fifa-card/60 backdrop-blur-sm rounded-lg overflow-hidden">
      {/* Match Label Header */}
      <div className="bg-gradient-to-r from-fifa-blue/20 to-fifa-gold/10 border-b border-fifa-gold/20 px-3 py-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-fifa-muted">
        <span className="group-hover:text-fifa-gold/80 transition-colors">{matchLabel}</span>
        {winnerId && (
          <span className="text-fifa-gold flex items-center gap-1 bg-fifa-gold/10 px-2 py-0.5 rounded animate-pulse">
            <Check size={11} strokeWidth={3} /> Decided
          </span>
        )}
      </div>

      {/* Team rows */}
      <div className="flex flex-col divide-y divide-fifa-border/30">
        {/* Home Team Row */}
        <div
          onClick={handleSelectHome}
          className={`knockout-team transition-all duration-300 ${
            !homeTeam
              ? 'knockout-team-tbd opacity-40 cursor-default'
              : isHomeSelected
              ? 'knockout-team-selected bg-gradient-to-r from-fifa-gold/15 to-transparent border-l-2 border-fifa-gold'
              : isHomeEliminated
              ? 'knockout-team-eliminated opacity-30'
              : 'hover:bg-white/5 cursor-pointer'
          }`}
        >
          <TeamName team={homeTeam} flagSize={22} className="text-sm font-bold flex-1 text-white" />
          {isHomeSelected && (
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fifa-gold to-amber-500 flex items-center justify-center shadow-lg shadow-fifa-gold/30 animate-scale-in">
              <Check size={14} strokeWidth={3} className="text-fifa-dark" />
            </span>
          )}
        </div>

        {/* Away Team Row */}
        <div
          onClick={handleSelectAway}
          className={`knockout-team transition-all duration-300 ${
            !awayTeam
              ? 'knockout-team-tbd opacity-40 cursor-default'
              : isAwaySelected
              ? 'knockout-team-selected bg-gradient-to-r from-fifa-gold/15 to-transparent border-l-2 border-fifa-gold'
              : isAwayEliminated
              ? 'knockout-team-eliminated opacity-30'
              : 'hover:bg-white/5 cursor-pointer'
          }`}
        >
          <TeamName team={awayTeam} flagSize={22} className="text-sm font-bold flex-1 text-white" />
          {isAwaySelected && (
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fifa-gold to-amber-500 flex items-center justify-center shadow-lg shadow-fifa-gold/30 animate-scale-in">
              <Check size={14} strokeWidth={3} className="text-fifa-dark" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnockoutMatchCard;
