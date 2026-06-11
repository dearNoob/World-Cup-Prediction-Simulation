import FlagImg from './FlagImg';

/**
 * TeamName — Displays a team's flag + name side by side.
 * Used consistently throughout the app wherever a team is shown.
 *
 * @param {Object}  team     - Team object { name, code }
 * @param {number}  flagSize - Flag width (default: 24)
 * @param {string}  className - Additional CSS classes
 * @param {boolean} reverse  - If true, name comes before flag
 */
const TeamName = ({ team, flagSize = 24, className = '', reverse = false }) => {
  if (!team) {
    return (
      <span className={`flex items-center gap-2 text-fifa-muted italic ${className}`}>
        <span className="w-6 h-4 bg-fifa-border rounded-sm animate-pulse" />
        TBD
      </span>
    );
  }

  const flag = <FlagImg code={team.code} name={team.name} size={flagSize} />;
  const name = <span>{team.name}</span>;

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {reverse ? (
        <>
          {name}
          {flag}
        </>
      ) : (
        <>
          {flag}
          {name}
        </>
      )}
    </span>
  );
};

export default TeamName;
