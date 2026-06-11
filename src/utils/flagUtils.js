/**
 * Flag Utilities
 * Generates flag image URLs from flagcdn.com CDN.
 * No API key required — free and reliable.
 */

/**
 * Build a flagcdn.com URL for a country code.
 * Maps the size parameter to the nearest supported flagcdn width:
 * 20, 40, 80, 120, 160, 240, 320.
 *
 * @param {string} code - ISO country code (e.g., "us", "gb-eng", "gb-sct")
 * @param {number} size - Requested width in pixels
 * @returns {string} The full flag image URL
 */
export const getFlagUrl = (code, size = 40) => {
  let cdnWidth = 40;
  if (size <= 20) cdnWidth = 20;
  else if (size <= 40) cdnWidth = 40;
  else if (size <= 80) cdnWidth = 80;
  else if (size <= 120) cdnWidth = 120;
  else if (size <= 160) cdnWidth = 160;
  else if (size <= 240) cdnWidth = 240;
  else cdnWidth = 320;

  return `https://flagcdn.com/w${cdnWidth}/${code}.png`;
};
