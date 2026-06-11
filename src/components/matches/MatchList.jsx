import MatchCard from './MatchCard';

/**
 * MatchList — Renders a group of matches, sorted/arranged by matchday.
 *
 * @param {Object[]} fixtures      - Array of fixtures
 * @param {Object}   predictions   - Prediction state object: { [fixtureId]: { homeScore, awayScore } }
 * @param {Function} onScoreChange - Score update callback
 */
const MatchList = ({ fixtures, predictions, onScoreChange }) => {
  // Group fixtures by matchday (1, 2, 3)
  const matchesByMatchday = {
    1: fixtures.filter((f) => f.matchday === 1),
    2: fixtures.filter((f) => f.matchday === 2),
    3: fixtures.filter((f) => f.matchday === 3),
  };

  return (
    <div className="flex flex-col gap-6">
      {[1, 2, 3].map((matchday) => {
        const mdFixtures = matchesByMatchday[matchday] || [];
        if (mdFixtures.length === 0) return null;

        return (
          <div key={matchday} className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-fifa-gold/80 border-b border-fifa-border/60 pb-1.5 px-1">
              Matchday {matchday}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mdFixtures.map((fixture) => (
                <MatchCard
                  key={fixture.id}
                  fixture={fixture}
                  prediction={predictions[fixture.id]}
                  onScoreChange={onScoreChange}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;
