/**
 * Badge — A small status indicator with colored background.
 * Used for qualification status, result labels, etc.
 *
 * @param {string} children  - Badge text content
 * @param {string} className - CSS class for coloring (e.g., "badge-winner")
 */
const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
