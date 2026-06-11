/**
 * FIFA World Cup 2026 Group Stage Fixtures
 * 72 matches total: 6 matches per group × 12 groups.
 *
 * For each group with teams [T1, T2, T3, T4]:
 *   Matchday 1: T1 vs T2, T3 vs T4
 *   Matchday 2: T1 vs T3, T2 vs T4
 *   Matchday 3: T1 vs T4, T2 vs T3
 */
export const GROUP_FIXTURES = [
  // --- GROUP A (Mexico=1, South Africa=2, South Korea=3, Czechia=4) ---
  { id: "A1", group: "A", matchday: 1, homeTeamId: 1,  awayTeamId: 2  },
  { id: "A2", group: "A", matchday: 1, homeTeamId: 3,  awayTeamId: 4  },
  { id: "A3", group: "A", matchday: 2, homeTeamId: 1,  awayTeamId: 3  },
  { id: "A4", group: "A", matchday: 2, homeTeamId: 2,  awayTeamId: 4  },
  { id: "A5", group: "A", matchday: 3, homeTeamId: 1,  awayTeamId: 4  },
  { id: "A6", group: "A", matchday: 3, homeTeamId: 2,  awayTeamId: 3  },

  // --- GROUP B (Canada=5, Bosnia & Herzegovina=6, Qatar=7, Switzerland=8) ---
  { id: "B1", group: "B", matchday: 1, homeTeamId: 5,  awayTeamId: 6  },
  { id: "B2", group: "B", matchday: 1, homeTeamId: 7,  awayTeamId: 8  },
  { id: "B3", group: "B", matchday: 2, homeTeamId: 5,  awayTeamId: 7  },
  { id: "B4", group: "B", matchday: 2, homeTeamId: 6,  awayTeamId: 8  },
  { id: "B5", group: "B", matchday: 3, homeTeamId: 5,  awayTeamId: 8  },
  { id: "B6", group: "B", matchday: 3, homeTeamId: 6,  awayTeamId: 7  },

  // --- GROUP C (Brazil=9, Morocco=10, Haiti=11, Scotland=12) ---
  { id: "C1", group: "C", matchday: 1, homeTeamId: 9,  awayTeamId: 10 },
  { id: "C2", group: "C", matchday: 1, homeTeamId: 11, awayTeamId: 12 },
  { id: "C3", group: "C", matchday: 2, homeTeamId: 9,  awayTeamId: 11 },
  { id: "C4", group: "C", matchday: 2, homeTeamId: 10, awayTeamId: 12 },
  { id: "C5", group: "C", matchday: 3, homeTeamId: 9,  awayTeamId: 12 },
  { id: "C6", group: "C", matchday: 3, homeTeamId: 10, awayTeamId: 11 },

  // --- GROUP D (USA=13, Paraguay=14, Australia=15, Türkiye=16) ---
  { id: "D1", group: "D", matchday: 1, homeTeamId: 13, awayTeamId: 14 },
  { id: "D2", group: "D", matchday: 1, homeTeamId: 15, awayTeamId: 16 },
  { id: "D3", group: "D", matchday: 2, homeTeamId: 13, awayTeamId: 15 },
  { id: "D4", group: "D", matchday: 2, homeTeamId: 14, awayTeamId: 16 },
  { id: "D5", group: "D", matchday: 3, homeTeamId: 13, awayTeamId: 16 },
  { id: "D6", group: "D", matchday: 3, homeTeamId: 14, awayTeamId: 15 },

  // --- GROUP E (Germany=17, Curaçao=18, Ivory Coast=19, Ecuador=20) ---
  { id: "E1", group: "E", matchday: 1, homeTeamId: 17, awayTeamId: 18 },
  { id: "E2", group: "E", matchday: 1, homeTeamId: 19, awayTeamId: 20 },
  { id: "E3", group: "E", matchday: 2, homeTeamId: 17, awayTeamId: 19 },
  { id: "E4", group: "E", matchday: 2, homeTeamId: 18, awayTeamId: 20 },
  { id: "E5", group: "E", matchday: 3, homeTeamId: 17, awayTeamId: 20 },
  { id: "E6", group: "E", matchday: 3, homeTeamId: 18, awayTeamId: 19 },

  // --- GROUP F (Netherlands=21, Japan=22, Sweden=23, Tunisia=24) ---
  { id: "F1", group: "F", matchday: 1, homeTeamId: 21, awayTeamId: 22 },
  { id: "F2", group: "F", matchday: 1, homeTeamId: 23, awayTeamId: 24 },
  { id: "F3", group: "F", matchday: 2, homeTeamId: 21, awayTeamId: 23 },
  { id: "F4", group: "F", matchday: 2, homeTeamId: 22, awayTeamId: 24 },
  { id: "F5", group: "F", matchday: 3, homeTeamId: 21, awayTeamId: 24 },
  { id: "F6", group: "F", matchday: 3, homeTeamId: 22, awayTeamId: 23 },

  // --- GROUP G (Belgium=25, Egypt=26, Iran=27, New Zealand=28) ---
  { id: "G1", group: "G", matchday: 1, homeTeamId: 25, awayTeamId: 26 },
  { id: "G2", group: "G", matchday: 1, homeTeamId: 27, awayTeamId: 28 },
  { id: "G3", group: "G", matchday: 2, homeTeamId: 25, awayTeamId: 27 },
  { id: "G4", group: "G", matchday: 2, homeTeamId: 26, awayTeamId: 28 },
  { id: "G5", group: "G", matchday: 3, homeTeamId: 25, awayTeamId: 28 },
  { id: "G6", group: "G", matchday: 3, homeTeamId: 26, awayTeamId: 27 },

  // --- GROUP H (Spain=29, Cape Verde=30, Saudi Arabia=31, Uruguay=32) ---
  { id: "H1", group: "H", matchday: 1, homeTeamId: 29, awayTeamId: 30 },
  { id: "H2", group: "H", matchday: 1, homeTeamId: 31, awayTeamId: 32 },
  { id: "H3", group: "H", matchday: 2, homeTeamId: 29, awayTeamId: 31 },
  { id: "H4", group: "H", matchday: 2, homeTeamId: 30, awayTeamId: 32 },
  { id: "H5", group: "H", matchday: 3, homeTeamId: 29, awayTeamId: 32 },
  { id: "H6", group: "H", matchday: 3, homeTeamId: 30, awayTeamId: 31 },

  // --- GROUP I (France=33, Senegal=34, Iraq=35, Norway=36) ---
  { id: "I1", group: "I", matchday: 1, homeTeamId: 33, awayTeamId: 34 },
  { id: "I2", group: "I", matchday: 1, homeTeamId: 35, awayTeamId: 36 },
  { id: "I3", group: "I", matchday: 2, homeTeamId: 33, awayTeamId: 35 },
  { id: "I4", group: "I", matchday: 2, homeTeamId: 34, awayTeamId: 36 },
  { id: "I5", group: "I", matchday: 3, homeTeamId: 33, awayTeamId: 36 },
  { id: "I6", group: "I", matchday: 3, homeTeamId: 34, awayTeamId: 35 },

  // --- GROUP J (Argentina=37, Algeria=38, Austria=39, Jordan=40) ---
  { id: "J1", group: "J", matchday: 1, homeTeamId: 37, awayTeamId: 38 },
  { id: "J2", group: "J", matchday: 1, homeTeamId: 39, awayTeamId: 40 },
  { id: "J3", group: "J", matchday: 2, homeTeamId: 37, awayTeamId: 39 },
  { id: "J4", group: "J", matchday: 2, homeTeamId: 38, awayTeamId: 40 },
  { id: "J5", group: "J", matchday: 3, homeTeamId: 37, awayTeamId: 40 },
  { id: "J6", group: "J", matchday: 3, homeTeamId: 38, awayTeamId: 39 },

  // --- GROUP K (Portugal=41, DR Congo=42, Uzbekistan=43, Colombia=44) ---
  { id: "K1", group: "K", matchday: 1, homeTeamId: 41, awayTeamId: 42 },
  { id: "K2", group: "K", matchday: 1, homeTeamId: 43, awayTeamId: 44 },
  { id: "K3", group: "K", matchday: 2, homeTeamId: 41, awayTeamId: 43 },
  { id: "K4", group: "K", matchday: 2, homeTeamId: 42, awayTeamId: 44 },
  { id: "K5", group: "K", matchday: 3, homeTeamId: 41, awayTeamId: 44 },
  { id: "K6", group: "K", matchday: 3, homeTeamId: 42, awayTeamId: 43 },

  // --- GROUP L (England=45, Croatia=46, Ghana=47, Panama=48) ---
  { id: "L1", group: "L", matchday: 1, homeTeamId: 45, awayTeamId: 46 },
  { id: "L2", group: "L", matchday: 1, homeTeamId: 47, awayTeamId: 48 },
  { id: "L3", group: "L", matchday: 2, homeTeamId: 45, awayTeamId: 47 },
  { id: "L4", group: "L", matchday: 2, homeTeamId: 46, awayTeamId: 48 },
  { id: "L5", group: "L", matchday: 3, homeTeamId: 45, awayTeamId: 48 },
  { id: "L6", group: "L", matchday: 3, homeTeamId: 46, awayTeamId: 47 },
];

/**
 * Get all fixtures for a specific group.
 * @param {string} groupLetter - The group letter (A-L)
 * @returns {Object[]} Array of fixtures for that group
 */
export const getFixturesByGroup = (groupLetter) =>
  GROUP_FIXTURES.filter((f) => f.group === groupLetter);
