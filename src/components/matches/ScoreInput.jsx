import { useCallback } from 'react';

/**
 * ScoreInput — Numeric input for match scores.
 * Uses type="text" with inputMode="numeric" to avoid browser spinner quirks.
 * Empty input = null (not predicted) — valid state.
 *
 * @param {number|null} value    - Current score value (null = empty)
 * @param {Function}    onChange - Called with parsed score or null
 * @param {string}      label   - Aria label for accessibility
 */
const ScoreInput = ({ value, onChange, label = 'Score' }) => {
  const handleChange = useCallback(
    (e) => {
      const rawValue = e.target.value.trim();

      // Empty input → not predicted (null)
      if (rawValue === '') {
        onChange(null);
        return;
      }

      const num = parseInt(rawValue, 10);

      // Reject non-numeric, negative, or >20 scores
      if (isNaN(num)) return;
      if (num < 0) return;
      if (num > 20) return;

      onChange(num);
    },
    [onChange]
  );

  // Determine if this input has a valid prediction
  const isPredicted = value !== null && value !== undefined;

  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={2}
      value={isPredicted ? value : ''}
      onChange={handleChange}
      aria-label={label}
      placeholder="–"
      className={`score-input ${
        isPredicted ? 'score-input-predicted' : 'score-input-empty'
      }`}
    />
  );
};

export default ScoreInput;
