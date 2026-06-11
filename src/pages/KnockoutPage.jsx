import { Link } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';
import PageWrapper from '../components/layout/PageWrapper';
import BracketView from '../components/knockout/BracketView';
import { Lock, ArrowRight, Award, Trophy } from 'lucide-react';

/**
 * KnockoutPage — Displays the scrollable knockout bracket.
 * Enforces locking rules, rendering a locked card if group stage is incomplete.
 */
const KnockoutPage = () => {
  const {
    groupStageComplete,
    predictedMatchCount,
    knockoutBracket,
    knockoutPredictions,
    updateKnockoutWinner,
    champion,
  } = useTournament();

  return (
    <PageWrapper className="flex flex-col gap-6 md:gap-8 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-fifa-border pb-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Knockout Stage Bracket
          </h1>
          <p className="text-xs md:text-sm text-fifa-muted">
            Tap a country to select them as the winner and advance them to the next round
          </p>
        </div>

        {/* Link to Champion if winner is selected */}
        {champion && (
          <Link
            to="/champion"
            className="btn-primary self-start md:self-auto flex items-center justify-center gap-2 text-xs font-bold ring-2 ring-emerald-500/20"
          >
            <Trophy size={14} className="text-fifa-dark animate-pulse" /> View World Champion!
          </Link>
        )}
      </div>

      {/* Locked Screen / Bracket rendering */}
      {!groupStageComplete ? (
        <div className="max-w-xl mx-auto w-full glass-card p-8 flex flex-col items-center justify-center text-center gap-5 border border-fifa-border/80 my-12 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/30">
            <Lock size={28} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-white">Knockout Stage Locked</h2>
            <p className="text-sm text-fifa-muted leading-relaxed">
              To generate the Round of 32 matchup board, you must predict all group stage fixtures first.
            </p>
          </div>

          {/* Progress overview */}
          <div className="w-full bg-fifa-dark/50 border border-fifa-border/40 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex justify-between text-xs font-semibold text-gray-300">
              <span>Predictions made</span>
              <span>{predictedMatchCount} / 72 Matches</span>
            </div>
            <div className="w-full h-2 bg-fifa-border rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${(predictedMatchCount / 72) * 100}%` }}
              />
            </div>
          </div>

          <Link
            to="/group-stage"
            className="btn-primary mt-2 flex items-center justify-center gap-2 w-full text-sm font-bold"
          >
            Go to Group Predictions <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-fade-in w-full">
          {/* Scroll indicators helper */}
          <span className="text-[10px] text-fifa-muted font-bold uppercase tracking-wider block md:hidden mb-2 text-center">
            ← Swipe horizontally to view other rounds →
          </span>

          <BracketView
            bracket={knockoutBracket}
            predictions={knockoutPredictions}
            onSelectWinner={updateKnockoutWinner}
          />
        </div>
      )}
    </PageWrapper>
  );
};

export default KnockoutPage;
