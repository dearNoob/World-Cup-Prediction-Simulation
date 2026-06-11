import KnockoutMatchCard from './KnockoutMatchCard';
import RoundLabel from './RoundLabel';

/**
 * BracketColumn — Renders a column of matches representing one knockout round.
 *
 * @param {string}   title              - Column round title
 * @param {Object[]} matches            - Matches in this round
 * @param {Object}   predictions        - Knockout predictions state
 * @param {Function} onSelectWinner     - Winner selection handler
 * @param {string}   roundPrefix        - Prefix for match labels (e.g. 'R32')
 * @param {number}   predictedCount     - Predicted picks count
 * @param {number}   totalCount         - Total match count in this round
 * @param {boolean}  isLocked           - If this round is locked
 */
const BracketColumn = ({
  title,
  matches,
  predictions,
  onSelectWinner,
  roundPrefix,
  predictedCount,
  totalCount,
  isLocked = false,
}) => {
  return (
    <div className={`flex flex-col gap-4 min-w-[260px] max-w-[320px] flex-1 ${isLocked ? 'opacity-40 select-none pointer-events-none' : ''}`}>
      {/* Round Header */}
      <RoundLabel
        title={title}
        predicted={predictedCount}
        total={totalCount}
      />

      {/* Match Cards */}
      <div className="flex flex-col gap-6 justify-around h-full py-4">
        {matches.map((match, idx) => {
          const matchNum = idx + 1;
          const matchLabel = `${roundPrefix} Match ${matchNum}`;

          return (
            <KnockoutMatchCard
              key={match.id}
              match={match}
              prediction={predictions[match.id]}
              onSelectWinner={onSelectWinner}
              matchLabel={matchLabel}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BracketColumn;
