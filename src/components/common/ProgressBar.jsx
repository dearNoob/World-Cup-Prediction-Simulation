/**
 * ProgressBar — Shows completion progress with gradient fill.
 *
 * @param {number} current   - Current count
 * @param {number} total     - Total count
 * @param {string} label     - Optional label text
 * @param {boolean} showCount - Whether to show "X / Y" count (default: true)
 */
const ProgressBar = ({ current, total, label = '', showCount = true }) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      {/* Label row */}
      {(label || showCount) && (
        <div className="flex items-center justify-between mb-2 text-sm">
          {label && <span className="text-gray-300 font-medium">{label}</span>}
          {showCount && (
            <span className="text-fifa-muted">
              <span className="text-fifa-gold font-semibold">{current}</span>
              {' / '}
              <span>{total}</span>
              <span className="ml-2 text-xs">({percentage}%)</span>
            </span>
          )}
        </div>
      )}

      {/* Bar */}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
