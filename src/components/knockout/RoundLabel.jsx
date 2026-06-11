/**
 * RoundLabel — Elegant label for columns in the bracket.
 * Displays the round title and the predictions progress (e.g., "Round of 16 (4/8)").
 *
 * @param {string} title      - Title of the round
 * @param {number} predicted  - Count of predicted matches
 * @param {number} total      - Total matches in this round
 */
const RoundLabel = ({ title, predicted, total }) => {
  const isComplete = predicted === total;

  return (
    <div className="flex flex-col gap-1.5 pb-2 mb-4 border-b border-fifa-border/40">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
        {title}
      </h3>
      <div className="flex items-center justify-between text-[11px]">
        <span className={isComplete ? 'text-emerald-400 font-medium' : 'text-fifa-muted'}>
          {predicted} / {total} Picks
        </span>
        {isComplete && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        )}
      </div>
    </div>
  );
};

export default RoundLabel;
