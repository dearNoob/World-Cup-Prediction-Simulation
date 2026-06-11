import { GROUPS } from '../../data/groups';
import { getGroupProgress } from '../../utils/standingsUtils';
import { getFixturesByGroup } from '../../data/fixtures';

/**
 * GroupTabs — Renders tabs for Group A through L.
 * Highlights the active group and displays completion badges/borders for completed groups.
 *
 * @param {string}   activeGroup   - Currently active group letter (e.g. 'A')
 * @param {Function} onSelectGroup - Callback when a group is clicked
 * @param {Object}   predictions   - Current group prediction state
 */
const GroupTabs = ({ activeGroup, onSelectGroup, predictions }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide select-none -mx-4 px-4 md:mx-0 md:px-0">
      {GROUPS.map((group) => {
        const fixtures = getFixturesByGroup(group);
        const { predicted, total } = getGroupProgress(group, predictions, fixtures);
        const isComplete = predicted === total;
        const isActive = activeGroup === group;

        return (
          <button
            key={group}
            onClick={() => onSelectGroup(group)}
            className={`group-tab relative ${
              isActive
                ? 'group-tab-active'
                : 'group-tab-inactive'
            } ${isComplete ? 'group-tab-complete' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              Group {group}
              {isComplete && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </span>
            {!isComplete && predicted > 0 && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-fifa-gold/60 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default GroupTabs;
