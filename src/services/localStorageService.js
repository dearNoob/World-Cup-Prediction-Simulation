/**
 * LocalStorage Service
 * Handles all persistence for the FIFA World Cup 2026 Predictor.
 * All localStorage access is centralized here — no direct calls elsewhere.
 */

const KEYS = {
  GROUP_PREDICTIONS:    'wc2026_group_predictions',
  KNOCKOUT_PREDICTIONS: 'wc2026_knockout_predictions',
  SCHEMA_VERSION:       'wc2026_schema_version',
};

const CURRENT_VERSION = 1;

/**
 * Save group stage predictions to localStorage.
 * @param {Object} data - { [fixtureId]: { homeScore, awayScore } }
 */
export const saveGroupPredictions = (data) => {
  try {
    localStorage.setItem(KEYS.GROUP_PREDICTIONS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save group predictions:', e);
  }
};

/**
 * Load group stage predictions from localStorage.
 * @returns {Object} Prediction map or empty object
 */
export const loadGroupPredictions = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.GROUP_PREDICTIONS) || '{}');
  } catch {
    return {};
  }
};

/**
 * Save knockout stage predictions to localStorage.
 * @param {Object} data - { [matchId]: { winnerId } }
 */
export const saveKnockoutPredictions = (data) => {
  try {
    localStorage.setItem(KEYS.KNOCKOUT_PREDICTIONS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save knockout predictions:', e);
  }
};

/**
 * Load knockout stage predictions from localStorage.
 * @returns {Object} Prediction map or empty object
 */
export const loadKnockoutPredictions = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.KNOCKOUT_PREDICTIONS) || '{}');
  } catch {
    return {};
  }
};

/**
 * Clear all tournament data from localStorage.
 */
export const clearAll = () => {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
};

/**
 * Initialize storage with schema version check.
 * If schema version is outdated, wipe old data to prevent corruption.
 */
export const initStorage = () => {
  const v = localStorage.getItem(KEYS.SCHEMA_VERSION);
  if (!v || parseInt(v, 10) < CURRENT_VERSION) {
    clearAll();
    localStorage.setItem(KEYS.SCHEMA_VERSION, String(CURRENT_VERSION));
  }
};
