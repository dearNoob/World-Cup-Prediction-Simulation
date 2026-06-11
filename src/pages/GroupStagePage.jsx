import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';
import PageWrapper from '../components/layout/PageWrapper';
import ProgressBar from '../components/common/ProgressBar';
import GroupTabs from '../components/groups/GroupTabs';
import GroupPanel from '../components/groups/GroupPanel';
import { getFixturesByGroup } from '../data/fixtures';
import { getTeamsByGroup } from '../data/teams';
import { GROUPS } from '../data/groups';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * GroupStagePage — Prediction page for the 72 group-stage matches.
 * Syncs the selected group (A-L) with Router URL parameters.
 */
const GroupStagePage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const {
    groupPredictions,
    groupStandings,
    predictedMatchCount,
    groupStageComplete,
    updateGroupScore,
  } = useTournament();

  // Validate active group letter, defaulting to A
  const activeGroup = useMemo(() => {
    const uppercaseGroup = groupId?.toUpperCase();
    if (uppercaseGroup && GROUPS.includes(uppercaseGroup)) {
      return uppercaseGroup;
    }
    return 'A';
  }, [groupId]);

  // Sync URL if activeGroup fallback was applied or param is lowercase
  useEffect(() => {
    if (groupId !== activeGroup) {
      navigate(`/group-stage/${activeGroup}`, { replace: true });
    }
  }, [groupId, activeGroup, navigate]);

  const handleSelectGroup = (groupLetter) => {
    navigate(`/group-stage/${groupLetter}`);
  };

  // Get active group data
  const groupFixtures = useMemo(() => getFixturesByGroup(activeGroup), [activeGroup]);
  const groupStandingsData = useMemo(() => groupStandings[activeGroup] || [], [groupStandings, activeGroup]);

  return (
    <PageWrapper className="flex flex-col gap-6 md:gap-8">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-fifa-border pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Group Stage Predictions
          </h1>
          <p className="text-xs md:text-sm text-fifa-muted">
            Predict outcomes to qualify teams for the Round of 32
          </p>
        </div>

        {/* CTA to Knockout once group stage is done */}
        {groupStageComplete && (
          <Link
            to="/knockout"
            className="btn-primary self-start md:self-auto flex items-center justify-center gap-2 text-xs font-bold ring-2 ring-fifa-gold/20"
          >
            <Play size={12} fill="currentColor" /> Go to Knockout Bracket
          </Link>
        )}
      </div>

      {/* Progress Bar Widget */}
      <div className="glass-card p-5 border border-fifa-border/80">
        <ProgressBar
          current={predictedMatchCount}
          total={72}
          label="Total Group Stage Matches Predicted"
        />
      </div>

      {/* Tabs list (A-L) */}
      <GroupTabs
        activeGroup={activeGroup}
        onSelectGroup={handleSelectGroup}
        predictions={groupPredictions}
      />

      {/* Active Group Stage Simulation Panel */}
      <div className="animate-fade-in">
        <GroupPanel
          groupLetter={activeGroup}
          groupFixtures={groupFixtures}
          standings={groupStandingsData}
          predictions={groupPredictions}
          onScoreChange={updateGroupScore}
        />
      </div>
    </PageWrapper>
  );
};

export default GroupStagePage;
