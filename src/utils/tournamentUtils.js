/**
 * Tournament Utility Helpers
 * General-purpose helpers used across the tournament app.
 */

/**
 * Get the result label for a match from a team's perspective.
 * @param {number} teamGoals    - Goals scored by this team
 * @param {number} opponentGoals - Goals scored by the opponent
 * @returns {string} "W", "D", or "L"
 */
export const getResultLabel = (teamGoals, opponentGoals) => {
  if (teamGoals > opponentGoals) return 'W';
  if (teamGoals < opponentGoals) return 'L';
  return 'D';
};

/**
 * Get CSS class for a result label.
 * @param {string} result - "W", "D", or "L"
 * @returns {string} Tailwind CSS classes
 */
export const getResultColor = (result) => {
  switch (result) {
    case 'W': return 'text-emerald-400 bg-emerald-500/20';
    case 'D': return 'text-yellow-400 bg-yellow-500/20';
    case 'L': return 'text-red-400 bg-red-500/20';
    default:  return 'text-gray-400 bg-gray-500/20';
  }
};

/**
 * Get the qualification badge info based on position.
 * @param {number} position - Position in group (1-4)
 * @returns {{ label: string, emoji: string, className: string }}
 */
export const getQualificationBadge = (position) => {
  switch (position) {
    case 1:
      return { label: 'Winner', emoji: '🟢', className: 'badge-winner' };
    case 2:
      return { label: 'Runner-up', emoji: '🔵', className: 'badge-runnerup' };
    case 3:
      return { label: 'Best 3rd?', emoji: '🟡', className: 'badge-third' };
    case 4:
      return { label: 'Eliminated', emoji: '⚪', className: 'badge-eliminated' };
    default:
      return { label: '', emoji: '', className: '' };
  }
};

/**
 * Get the round display name.
 * @param {string} roundId - e.g., "R32", "R16", "QF", "SF", "TPM", "FINAL"
 * @returns {string} Human-readable round name
 */
export const getRoundDisplayName = (roundId) => {
  const names = {
    R32: 'Round of 32',
    R16: 'Round of 16',
    QF: 'Quarter-Finals',
    SF: 'Semi-Finals',
    TPM: 'Third Place',
    FINAL: 'Final',
  };
  return names[roundId] || roundId;
};

/**
 * Format a confederation name with a color badge.
 * @param {string} confederation - e.g., "UEFA", "CONMEBOL"
 * @returns {{ label: string, color: string }}
 */
export const getConfederationInfo = (confederation) => {
  const info = {
    UEFA:     { label: 'UEFA',     color: 'bg-blue-500/20 text-blue-400'    },
    CONMEBOL: { label: 'CONMEBOL', color: 'bg-green-500/20 text-green-400'  },
    CONCACAF: { label: 'CONCACAF', color: 'bg-orange-500/20 text-orange-400'},
    CAF:      { label: 'CAF',      color: 'bg-yellow-500/20 text-yellow-400'},
    AFC:      { label: 'AFC',      color: 'bg-red-500/20 text-red-400'      },
    OFC:      { label: 'OFC',      color: 'bg-purple-500/20 text-purple-400'},
  };
  return info[confederation] || { label: confederation, color: 'bg-gray-500/20 text-gray-400' };
};
