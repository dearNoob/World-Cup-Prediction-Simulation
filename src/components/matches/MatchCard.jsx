import { useCallback } from 'react';
import TeamName from '../common/TeamName';
import ScoreInput from './ScoreInput';
import { getResultLabel, getResultColor } from '../../utils/tournamentUtils';
import { getTeamById } from '../../data/teams';

/**
 * MatchCard — Renders a single match fixture with team information, flags,
 * score inputs, and calculated result badges.
 *
 * @param {Object}   fixture      - Fixture object: { id, homeTeamId, awayTeamId, group, matchday }
 * @param {Object}   prediction   - Prediction value: { homeScore, awayScore } or undefined
 * @param {Function} onScoreChange - Callback when a score is updated: (fixtureId, homeScore, awayScore) => void
 */
const MatchCard = ({ fixture, prediction, onScoreChange }) => {
  const homeTeam = getTeamById(fixture.homeTeamId);
  const awayTeam = getTeamById(fixture.awayTeamId);

  const homeScore = prediction?.homeScore !== undefined ? prediction.homeScore : null;
  const awayScore = prediction?.awayScore !== undefined ? prediction.awayScore : null;

  const handleHomeScoreChange = useCallback((score) => {
    onScoreChange(fixture.id, score, awayScore);
  }, [fixture.id, awayScore, onScoreChange]);

  const handleAwayScoreChange = useCallback((score) => {
    onScoreChange(fixture.id, homeScore, score);
  }, [fixture.id, homeScore, onScoreChange]);

  const isPredicted = homeScore !== null && awayScore !== null;
  const homeResult = isPredicted ? getResultLabel(homeScore, awayScore) : null;
  const awayResult = isPredicted ? getResultLabel(awayScore, homeScore) : null;

  return (
    <div className="match-card p-4 hover:border-fifa-gold/30 transition-all duration-300">
      {/* Mobile Stacked Layout (hidden on sm and above) */}
      <div className="sm:hidden flex flex-col gap-3 w-full">
        {/* Home Team Row */}
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <TeamName team={homeTeam} flagSize={24} className="font-semibold text-white min-w-0" />
            {homeResult && (
              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm shrink-0 ${getResultColor(homeResult)}`}>
                {homeResult}
              </span>
            )}
          </div>
          <div className="shrink-0">
            <ScoreInput
              value={homeScore}
              onChange={handleHomeScoreChange}
              label={`${homeTeam?.name || 'Home Team'} score`}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-fifa-border/40 my-0.5" />

        {/* Away Team Row */}
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <TeamName team={awayTeam} flagSize={24} className="font-semibold text-white min-w-0" />
            {awayResult && (
              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm shrink-0 ${getResultColor(awayResult)}`}>
                {awayResult}
              </span>
            )}
          </div>
          <div className="shrink-0">
            <ScoreInput
              value={awayScore}
              onChange={handleAwayScoreChange}
              label={`${awayTeam?.name || 'Away Team'} score`}
            />
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Layout (hidden on mobile) */}
      <div className="hidden sm:flex items-center justify-between gap-4 w-full">
        {/* Home Team */}
        <div className="flex-1 flex items-center justify-end gap-3 text-right min-w-0">
          {homeResult && (
            <span className={`px-2 py-0.5 text-xs font-bold rounded-sm shrink-0 ${getResultColor(homeResult)}`}>
              {homeResult}
            </span>
          )}
          <TeamName team={homeTeam} flagSize={28} className="font-semibold text-white justify-end min-w-0" reverse={true} />
        </div>

        {/* Score Fields */}
        <div className="flex items-center gap-2 shrink-0">
          <ScoreInput
            value={homeScore}
            onChange={handleHomeScoreChange}
            label={`${homeTeam?.name || 'Home Team'} score`}
          />
          <span className="text-fifa-muted font-bold px-1">:</span>
          <ScoreInput
            value={awayScore}
            onChange={handleAwayScoreChange}
            label={`${awayTeam?.name || 'Away Team'} score`}
          />
        </div>

        {/* Away Team */}
        <div className="flex-1 flex items-center justify-start gap-3 text-left min-w-0">
          <TeamName team={awayTeam} flagSize={28} className="font-semibold text-white justify-start min-w-0" />
          {awayResult && (
            <span className={`px-2 py-0.5 text-xs font-bold rounded-sm shrink-0 ${getResultColor(awayResult)}`}>
              {awayResult}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
