import FlagImg from '../common/FlagImg';
import Badge from '../common/Badge';
import { getConfederationInfo } from '../../utils/tournamentUtils';
import { Trophy } from 'lucide-react';

/**
 * ChampionDisplay — Displays a beautiful card for the tournament champion.
 * Showcases a large flag, country name, and confederation badge.
 *
 * @param {Object} team - Champion team object
 */
const ChampionDisplay = ({ team }) => {
  if (!team) return null;

  const confInfo = getConfederationInfo(team.confederation);

  return (
    <div className="relative glass-card overflow-hidden p-8 flex flex-col items-center justify-center text-center border-2 border-fifa-gold/60 shadow-2xl shadow-fifa-gold/10 max-w-xl mx-auto animate-scale-in">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fifa-gold/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Golden Trophy Icon */}
      <div className="w-20 h-20 rounded-full bg-fifa-gold/25 border-2 border-fifa-gold/50 flex items-center justify-center mb-6 animate-pulse shadow-lg shadow-fifa-gold/10">
        <Trophy size={44} className="text-fifa-gold" />
      </div>

      {/* Stage Title */}
      <span className="text-xs uppercase font-extrabold tracking-widest text-fifa-gold mb-2">
        FIFA World Cup 2026 Winner
      </span>

      {/* Flag */}
      <div className="my-4 relative group">
        <div className="absolute inset-0 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        <FlagImg code={team.code} name={team.name} size={160} />
      </div>

      {/* Team Name */}
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-lg">
        {team.name}
      </h1>

      {/* Confederation */}
      <Badge className={`px-3 py-1 font-bold ${confInfo.color}`}>
        {confInfo.label}
      </Badge>

      <p className="mt-6 text-sm text-fifa-muted italic">
        Congratulations to the World Champions!
      </p>
    </div>
  );
};

export default ChampionDisplay;
