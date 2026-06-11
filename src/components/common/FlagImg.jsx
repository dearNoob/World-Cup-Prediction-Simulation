import { getFlagUrl } from '../../utils/flagUtils';

/**
 * FlagImg — Renders a country flag image from flagcdn.com CDN.
 * Handles load errors gracefully by hiding the broken image.
 *
 * @param {string} code - ISO country code (e.g., "us", "gb-eng")
 * @param {string} name - Country name (for alt text)
 * @param {number} size - Width in pixels (default: 32)
 */
const FlagImg = ({ code, name, size = 32 }) => {
  if (!code) return null;

  return (
    <img
      src={getFlagUrl(code, size)}
      alt={`${name || code} flag`}
      className="rounded-sm object-cover inline-block shadow-sm"
      style={{ width: size, height: Math.round(size * 0.67) }}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

export default FlagImg;
