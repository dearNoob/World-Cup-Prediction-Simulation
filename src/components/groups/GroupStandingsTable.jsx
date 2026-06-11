import TeamName from '../common/TeamName';
import Badge from '../common/Badge';
import { getQualificationBadge } from '../../utils/tournamentUtils';

/**
 * GroupStandingsTable — Renders the current point standing table for a group.
 *
 * @param {Object[]} standings - Ranked standing list: RankedTeamStanding[]
 */
const GroupStandingsTable = ({ standings }) => {
  return (
    <div className="glass-card overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1.5fr] gap-1 px-4 py-3 text-xs font-bold uppercase tracking-wider text-fifa-muted border-b border-fifa-border/60 bg-fifa-dark/30">
        <div>Team</div>
        <div className="text-center">P</div>
        <div className="text-center">W</div>
        <div className="text-center">D</div>
        <div className="text-center">L</div>
        <div className="text-center">GF</div>
        <div className="text-center">GA</div>
        <div className="text-center">GD</div>
        <div className="text-center text-white">Pts</div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-fifa-border/40">
        {standings.map((row) => {
          const { team, played, won, drawn, lost, goalsFor, goalsAgainst, goalDifference, points, position } = row;
          const badge = getQualificationBadge(position);

          return (
            <div
              key={team.id}
              className={`grid grid-cols-[4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1.5fr] gap-1 items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors ${
                position <= 2 ? 'bg-white/[0.01]' : ''
              }`}
            >
              {/* Team Name + Position Indicator */}
              <div className="flex items-center gap-3">
                <span className="w-5 text-xs text-center font-semibold text-fifa-muted">
                  {position}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                  <TeamName team={team} flagSize={24} className="font-semibold text-white" />
                  {played === 3 && (
                    <Badge className={badge.className}>
                      {badge.label}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="text-center text-gray-300 font-medium">{played}</div>
              <div className="text-center text-gray-400">{won}</div>
              <div className="text-center text-gray-400">{drawn}</div>
              <div className="text-center text-gray-400">{lost}</div>
              <div className="text-center text-gray-400">{goalsFor}</div>
              <div className="text-center text-gray-400">{goalsAgainst}</div>
              <div className={`text-center font-medium ${
                goalDifference > 0 ? 'text-emerald-400' : goalDifference < 0 ? 'text-red-400' : 'text-gray-400'
              }`}>
                {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
              </div>
              <div className="text-center text-fifa-gold font-bold text-base">{points}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupStandingsTable;
