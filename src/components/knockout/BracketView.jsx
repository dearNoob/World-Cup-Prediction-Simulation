import BracketColumn from './BracketColumn';
import KnockoutMatchCard from './KnockoutMatchCard';
import RoundLabel from './RoundLabel';
import { getRoundProgress } from '../../utils/bracketUtils';

/**
 * BracketView — Renders the complete knockout stages horizontally scrollable.
 * Supports locking columns based on rules.
 *
 * @param {Object}   bracket           - Derived bracket object: { r32, r16, qf, sf, thirdPlace, final }
 * @param {Object}   predictions       - Knockout predictions state
 * @param {Function} onSelectWinner    - Winner selection callback
 */
const BracketView = ({ bracket, predictions, onSelectWinner }) => {
  const { r32, r16, qf, sf, thirdPlace, final } = bracket;

  // Calculate progress for each round
  const p32 = getRoundProgress('R32', 16, predictions);
  const p16 = getRoundProgress('R16', 8, predictions);
  const pQF = getRoundProgress('QF', 4, predictions);
  const pSF = getRoundProgress('SF', 2, predictions);

  // Locking rules
  const r32Locked = false; // Unlocked since we only show bracket if group stage is complete
  const r16Locked = p32.predicted < 16;
  const qfLocked = r16Locked || p16.predicted < 8;
  const sfLocked = qfLocked || pQF.predicted < 4;
  const finalLocked = sfLocked || pSF.predicted < 2;

  // Third Place match predictions progress (1 match total)
  const isTPMPredicted = predictions['TPM']?.winnerId ? 1 : 0;
  // Final predictions progress (1 match total)
  const isFinalPredicted = predictions['FINAL']?.winnerId ? 1 : 0;

  return (
    <div className="flex gap-8 overflow-x-auto pb-8 pt-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 select-none items-stretch">
      {/* 1. Round of 32 */}
      <BracketColumn
        title="Round of 32"
        matches={r32}
        predictions={predictions}
        onSelectWinner={onSelectWinner}
        roundPrefix="R32"
        predictedCount={p32.predicted}
        totalCount={16}
        isLocked={r32Locked}
      />

      {/* 2. Round of 16 */}
      <BracketColumn
        title="Round of 16"
        matches={r16}
        predictions={predictions}
        onSelectWinner={onSelectWinner}
        roundPrefix="R16"
        predictedCount={p16.predicted}
        totalCount={8}
        isLocked={r16Locked}
      />

      {/* 3. Quarter-Finals */}
      <BracketColumn
        title="Quarter-Finals"
        matches={qf}
        predictions={predictions}
        onSelectWinner={onSelectWinner}
        roundPrefix="QF"
        predictedCount={pQF.predicted}
        totalCount={4}
        isLocked={qfLocked}
      />

      {/* 4. Semi-Finals */}
      <BracketColumn
        title="Semi-Finals"
        matches={sf}
        predictions={predictions}
        onSelectWinner={onSelectWinner}
        roundPrefix="SF"
        predictedCount={pSF.predicted}
        totalCount={2}
        isLocked={sfLocked}
      />

      {/* 5. Finals Column (Final + Third Place Match) */}
      <div className={`flex flex-col gap-6 min-w-[260px] max-w-[320px] flex-1 ${finalLocked ? 'opacity-40 select-none pointer-events-none' : ''}`}>
        {/* Column Header */}
        <RoundLabel
          title="The Finals"
          predicted={isFinalPredicted + isTPMPredicted}
          total={2}
        />

        <div className="flex flex-col justify-around h-full py-4 gap-8">
          {/* Third Place Match Card */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-fifa-gold uppercase tracking-wider px-1">
              Third Place Playoff
            </span>
            <KnockoutMatchCard
              match={thirdPlace}
              prediction={predictions['TPM']}
              onSelectWinner={onSelectWinner}
              matchLabel="Bronze Medal Match"
            />
          </div>

          {/* The Final Match Card */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-1">
              World Cup Final
            </span>
            <KnockoutMatchCard
              match={final}
              prediction={predictions['FINAL']}
              onSelectWinner={onSelectWinner}
              matchLabel="Championship Final"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketView;
