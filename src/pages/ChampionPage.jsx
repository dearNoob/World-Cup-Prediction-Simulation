import { Link } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';
import PageWrapper from '../components/layout/PageWrapper';
import ChampionDisplay from '../components/champion/ChampionDisplay';
import TournamentPath from '../components/champion/TournamentPath';
import { HelpCircle, ArrowRight, Trophy } from 'lucide-react';

/**
 * ChampionPage — Displays the crowned champion and their simulation path.
 * If no champion is selected, displays an elegant invitation banner.
 */
const ChampionPage = () => {
  const { champion, groupPredictions, knockoutPredictions, knockoutBracket } = useTournament();

  return (
    <PageWrapper className="flex flex-col gap-8 md:gap-12 justify-center items-center min-h-[75vh]">
      {champion ? (
        <div className="flex flex-col gap-10 w-full animate-fade-in">
          {/* Header Banner */}
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-fifa-gold">
              Predictor Results
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Your World Cup Simulation
            </h1>
          </div>

          {/* Golden Winner Display */}
          <ChampionDisplay team={champion} />

          {/* Historical path display */}
          <TournamentPath
            team={champion}
            groupPredictions={groupPredictions}
            knockoutPredictions={knockoutPredictions}
            bracket={knockoutBracket}
          />
        </div>
      ) : (
        <div className="max-w-md w-full glass-card p-8 flex flex-col items-center justify-center text-center gap-6 border border-fifa-border/80 animate-scale-in my-12">
          <div className="w-16 h-16 rounded-full bg-fifa-gold/15 flex items-center justify-center text-fifa-gold border border-fifa-gold/30">
            <Trophy size={28} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-white">No Champion Decided Yet</h2>
            <p className="text-sm text-fifa-muted leading-relaxed">
              Complete your knockout bracket picks all the way to the Finals to reveal your 2026 World Champion!
            </p>
          </div>
          <Link
            to="/knockout"
            className="btn-primary mt-2 flex items-center justify-center gap-2 w-full text-sm font-bold"
          >
            Predict Knockouts <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </PageWrapper>
  );
};

export default ChampionPage;
