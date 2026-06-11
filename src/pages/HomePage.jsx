import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';
import PageWrapper from '../components/layout/PageWrapper';
import ProgressBar from '../components/common/ProgressBar';
import { Calendar, Play, Lock, HelpCircle } from 'lucide-react';
import logo from '../assets/logo.png';

/**
 * HomePage — Tournament Predictor Dashboard and welcome hero.
 */
const HomePage = () => {
  const {
    predictedMatchCount,
    groupStageComplete,
    knockoutPredictions,
    champion,
  } = useTournament();

  // Calculate knockout predicted matches count
  const knockoutPicksCount = useMemo(() => {
    const validMatchKeys = ['R32_', 'R16_', 'QF_', 'SF_', 'TPM', 'FINAL'];
    return Object.keys(knockoutPredictions).filter((key) =>
      validMatchKeys.some((prefix) => key.startsWith(prefix)) && knockoutPredictions[key]?.winnerId
    ).length;
  }, [knockoutPredictions]);

  return (
    <PageWrapper className="bg-mesh min-h-[80vh] flex flex-col justify-center gap-10">
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fifa-blue to-fifa-gold flex items-center justify-center shadow-xl shadow-fifa-gold/10 mb-2 animate-bounce">
          <img src={logo} alt="Logo" className="w-13 h-13 object-contains" />
        </div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-fifa-gold">
          Simulate the Entire Tournament
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          FIFA WORLD CUP <span className="gradient-text">2026</span> PREDICTOR
        </h1>
        <p className="text-sm sm:text-base text-fifa-muted max-w-xl leading-relaxed">
          Predict all 104 matches across North America (USA, Canada, Mexico). Fill out group standings, select qualifiers, and simulate the knockout bracket to crown your champion!
        </p>
      </div>

      {/* Progress Cards Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
        {/* Group Stage Stats */}
        <div className="glass-card p-6 flex flex-col gap-4 border border-fifa-border/80">
          <div className="flex items-center justify-between border-b border-fifa-border pb-3">
            <h2 className="font-extrabold text-white text-base">Group Stage Progress</h2>
            <span className="text-xs text-fifa-muted flex items-center gap-1">
              <Calendar size={12} /> 72 Matches
            </span>
          </div>
          <div className="py-2">
            <ProgressBar
              current={predictedMatchCount}
              total={72}
              label="Group Predictions Complete"
            />
          </div>
          <Link
            to="/group-stage"
            className="btn-primary mt-2 text-center flex items-center justify-center gap-2 group text-sm font-bold"
          >
            <Play size={14} className="group-hover:translate-x-0.5 transition-transform" />
            {predictedMatchCount === 0 ? 'Start Group Stage' : 'Continue Group Stage'}
          </Link>
        </div>

        {/* Knockout Stage Stats */}
        <div className="glass-card p-6 flex flex-col gap-4 border border-fifa-border/80">
          <div className="flex items-center justify-between border-b border-fifa-border pb-3">
            <h2 className="font-extrabold text-white text-base">Knockout Stage Progress</h2>
            <span className="text-xs text-fifa-muted flex items-center gap-1">
              <Calendar size={12} /> 32 Matches
            </span>
          </div>

          <div className="py-2">
            {!groupStageComplete ? (
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-300">
                <Lock size={16} className="shrink-0" />
                <span>Complete all 72 Group stage predictions to unlock the Knockout bracket.</span>
              </div>
            ) : (
              <ProgressBar
                current={knockoutPicksCount}
                total={32}
                label="Knockout Picks Complete"
              />
            )}
          </div>

          {groupStageComplete ? (
            <Link
              to="/knockout"
              className="btn-primary mt-2 text-center flex items-center justify-center gap-2 group text-sm font-bold"
            >
              <Play size={14} className="group-hover:translate-x-0.5 transition-transform" />
              {knockoutPicksCount === 0 ? 'Start Knockout Stage' : 'Continue Knockout Stage'}
            </Link>
          ) : (
            <button
              disabled
              className="btn-ghost mt-2 cursor-not-allowed flex items-center justify-center gap-2 text-sm font-bold opacity-40"
            >
              <Lock size={14} /> Knockout Stage Locked
            </button>
          )}
        </div>
      </div>

      {/* Navigation Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
        {/* Groups */}
        <Link
          to="/group-stage"
          className="glass-card p-5 hover:border-fifa-gold/30 transition-all duration-300 flex flex-col gap-2 group"
        >
          <span className="text-fifa-gold font-bold text-lg group-hover:text-yellow-400 transition-colors">
            1. Predict Groups
          </span>
          <p className="text-xs text-fifa-muted leading-relaxed">
            Predict outcomes for all 12 groups A to L. Live standing charts compute qualification.
          </p>
        </Link>

        {/* Knockouts */}
        <Link
          to="/knockout"
          className={`glass-card p-5 transition-all duration-300 flex flex-col gap-2 group ${
            groupStageComplete
              ? 'hover:border-fifa-gold/30 cursor-pointer'
              : 'opacity-55 cursor-not-allowed pointer-events-none'
          }`}
        >
          <span className="text-fifa-gold font-bold text-lg group-hover:text-yellow-400 transition-colors">
            2. Knockout Bracket
          </span>
          <p className="text-xs text-fifa-muted leading-relaxed">
            Fill the 32-team knockout bracket. Tap winners to advance them to the championship.
          </p>
        </Link>

        {/* Champion */}
        <Link
          to="/champion"
          className={`glass-card p-5 transition-all duration-300 flex flex-col gap-2 group ${
            champion
              ? 'hover:border-fifa-gold/30 border-emerald-500/30'
              : 'opacity-55 cursor-not-allowed pointer-events-none'
          }`}
        >
          <span className="text-fifa-gold font-bold text-lg group-hover:text-yellow-400 transition-colors">
            3. Final Champion
          </span>
          <p className="text-xs text-fifa-muted leading-relaxed">
            Unlock the golden champion page detailing the winner's complete path to the trophy.
          </p>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
