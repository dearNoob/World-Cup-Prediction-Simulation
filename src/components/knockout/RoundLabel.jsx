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
  const progress = (predicted / total) * 100;

  return (
    <div className="flex flex-col gap-3 pb-3 mb-4 border-b border-gradient-to-r from-fifa-gold/40 to-transparent">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold uppercase tracking-wide text-white drop-shadow-lg">
          {title}
        </h3>
        {isComplete && (
          <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
            ✓ Complete
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[12px]">
          <span className={`font-semibold ${isComplete ? 'text-emerald-400' : 'text-fifa-gold'}`}>
            {predicted} / {total} Picks
          </span>
          <span className="text-fifa-muted text-[11px]">{Math.round(progress)}%</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-fifa-border/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              isComplete 
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' 
                : 'bg-gradient-to-r from-fifa-gold to-amber-400'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoundLabel;
