import MatchList from '../matches/MatchList';
import GroupStandingsTable from './GroupStandingsTable';

/**
 * GroupPanel — Assembles match list and group standings for the selected group.
 *
 * @param {string}   groupLetter    - Selected group letter (e.g. 'A')
 * @param {Object[]} groupFixtures  - Fixtures for this group
 * @param {Object[]} standings      - Ranked standings for this group
 * @param {Object}   predictions    - All group predictions
 * @param {Function} onScoreChange  - Score change handler
 */
const GroupPanel = ({ groupLetter, groupFixtures, standings, predictions, onScoreChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Fixtures (Matches) Section */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-extrabold text-white">
            Group {groupLetter} Fixtures
          </h2>
          <span className="text-xs text-fifa-muted italic">
            Enter scores to calculate standings
          </span>
        </div>
        <MatchList
          fixtures={groupFixtures}
          predictions={predictions}
          onScoreChange={onScoreChange}
        />
      </div>

      {/* Standings Section */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="px-1">
          <h2 className="text-xl font-extrabold text-white">
            Standings
          </h2>
        </div>
        <GroupStandingsTable standings={standings} />

        {/* Legend */}
        <div className="glass-card p-4 flex flex-wrap gap-4 text-xs text-fifa-muted">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
            <span>1st: Winner (Q)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500/30 border border-blue-500/50" />
            <span>2nd: Runner-up (Q)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
            <span>3rd: Best 3rd contender</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-500/30 border border-gray-500/50" />
            <span>4th: Eliminated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPanel;
