import { Link, useNavigate } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';
import PageWrapper from '../components/layout/PageWrapper';
import BracketView from '../components/knockout/BracketView';
import { Lock, ArrowRight, Award, Trophy } from 'lucide-react';

/**
 * KnockoutPage — Displays the scrollable knockout bracket.
 * Enforces locking rules, rendering a locked card if group stage is incomplete.
 */
const KnockoutPage = () => {
  const navigate = useNavigate();
  const {
    groupStageComplete,
    predictedMatchCount,
    knockoutBracket,
    knockoutPredictions,
    updateKnockoutWinner,
    champion,
  } = useTournament();

  const handleSelectWinner = (matchId, winnerId) => {
    updateKnockoutWinner(matchId, winnerId);
    if (matchId === 'FINAL') {
      if (knockoutPredictions['FINAL']?.winnerId !== winnerId) {
        setTimeout(() => {
          navigate('/champion');
        }, 600);
      }
    }
  };

  return (
    <PageWrapper className="flex flex-col gap-8 md:gap-10 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gradient-to-r from-fifa-gold/30 to-transparent pb-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg flex items-center gap-2">
            <Trophy size={32} className="text-fifa-gold" /> Knockout Stage Bracket
          </h1>
          <p className="text-sm md:text-base text-fifa-muted font-medium">
            Tap a country to select them as the winner and advance them to the next round
          </p>
        </div>

        {/* Link to Champion if winner is selected */}
        {champion && (
          <Link
            to="/champion"
            className="btn-primary self-start md:self-auto flex items-center justify-center gap-2 text-sm font-bold ring-2 ring-emerald-500/30 hover:ring-emerald-400/50 transition-all duration-300 whitespace-nowrap"
          >
            <Trophy size={16} className="text-fifa-dark animate-pulse" /> View World Champion!
          </Link>
        )}
      </div>

      {/* Locked Screen / Bracket rendering */}
      {!groupStageComplete ? (
        <div className="max-w-2xl mx-auto w-full glass-card p-10 flex flex-col items-center justify-center text-center gap-6 border border-fifa-border/80 my-12 animate-scale-in bg-gradient-to-br from-fifa-card/90 to-fifa-card/70">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center text-amber-400 border-2 border-amber-500/40 shadow-lg shadow-amber-500/20">
            <Lock size={36} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-white">Knockout Stage Locked</h2>
            <p className="text-base text-fifa-muted leading-relaxed max-w-md mx-auto">
              To generate the Round of 32 matchup board, you must predict all group stage fixtures first.
            </p>
          </div>

          {/* Progress overview */}
          <div className="w-full bg-fifa-dark/60 border border-fifa-border/50 rounded-xl p-6 flex flex-col gap-3">
            <div className="flex justify-between text-sm font-semibold text-gray-300">
              <span>Predictions Made</span>
              <span className="text-fifa-gold">{predictedMatchCount} / 72 Matches</span>
            </div>
            <div className="w-full h-3 bg-fifa-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500 rounded-full shadow-lg shadow-amber-500/30"
                style={{ width: `${(predictedMatchCount / 72) * 100}%` }}
              />
            </div>
            <p className="text-xs text-fifa-muted font-medium">
              {Math.round((predictedMatchCount / 72) * 100)}% Complete
            </p>
          </div>

          <Link
            to="/group-stage"
            className="btn-primary mt-4 flex items-center justify-center gap-2 w-full text-base font-bold hover:scale-105 transition-transform duration-300"
          >
            Go to Group Predictions <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-fade-in w-full">
          {/* Scroll indicators helper */}
          <span className="text-[11px] text-fifa-muted font-bold uppercase tracking-widest block md:hidden mb-2 text-center bg-fifa-border/20 py-2 rounded-lg">
            ← Swipe horizontally to view other rounds →
          </span>

          <BracketView
            bracket={knockoutBracket}
            predictions={knockoutPredictions}
            onSelectWinner={handleSelectWinner}
          />
        </div>
      )}
    </PageWrapper>
  );
};

export default KnockoutPage;
