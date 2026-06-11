/**
 * Official FIFA World Cup 2026 Teams
 * 48 teams drawn from the December 5, 2025 FIFA draw + March 2026 playoff results.
 * Each team includes a flagcdn.com country code for flag rendering.
 */
export const TEAMS = [
  // GROUP A
  { id: 1,  name: "Mexico",               code: "mx",     group: "A", confederation: "CONCACAF" },
  { id: 2,  name: "South Africa",         code: "za",     group: "A", confederation: "CAF"      },
  { id: 3,  name: "South Korea",          code: "kr",     group: "A", confederation: "AFC"      },
  { id: 4,  name: "Czechia",              code: "cz",     group: "A", confederation: "UEFA"     },

  // GROUP B
  { id: 5,  name: "Canada",               code: "ca",     group: "B", confederation: "CONCACAF" },
  { id: 6,  name: "Bosnia & Herzegovina", code: "ba",     group: "B", confederation: "UEFA"     },
  { id: 7,  name: "Qatar",                code: "qa",     group: "B", confederation: "AFC"      },
  { id: 8,  name: "Switzerland",          code: "ch",     group: "B", confederation: "UEFA"     },

  // GROUP C
  { id: 9,  name: "Brazil",               code: "br",     group: "C", confederation: "CONMEBOL" },
  { id: 10, name: "Morocco",              code: "ma",     group: "C", confederation: "CAF"      },
  { id: 11, name: "Haiti",                code: "ht",     group: "C", confederation: "CONCACAF" },
  { id: 12, name: "Scotland",             code: "gb-sct", group: "C", confederation: "UEFA"     },

  // GROUP D
  { id: 13, name: "United States",        code: "us",     group: "D", confederation: "CONCACAF" },
  { id: 14, name: "Paraguay",             code: "py",     group: "D", confederation: "CONMEBOL" },
  { id: 15, name: "Australia",            code: "au",     group: "D", confederation: "AFC"      },
  { id: 16, name: "Türkiye",              code: "tr",     group: "D", confederation: "UEFA"     },

  // GROUP E
  { id: 17, name: "Germany",              code: "de",     group: "E", confederation: "UEFA"     },
  { id: 18, name: "Curaçao",              code: "cw",     group: "E", confederation: "CONCACAF" },
  { id: 19, name: "Ivory Coast",          code: "ci",     group: "E", confederation: "CAF"      },
  { id: 20, name: "Ecuador",              code: "ec",     group: "E", confederation: "CONMEBOL" },

  // GROUP F
  { id: 21, name: "Netherlands",          code: "nl",     group: "F", confederation: "UEFA"     },
  { id: 22, name: "Japan",                code: "jp",     group: "F", confederation: "AFC"      },
  { id: 23, name: "Sweden",               code: "se",     group: "F", confederation: "UEFA"     },
  { id: 24, name: "Tunisia",              code: "tn",     group: "F", confederation: "CAF"      },

  // GROUP G
  { id: 25, name: "Belgium",              code: "be",     group: "G", confederation: "UEFA"     },
  { id: 26, name: "Egypt",                code: "eg",     group: "G", confederation: "CAF"      },
  { id: 27, name: "Iran",                 code: "ir",     group: "G", confederation: "AFC"      },
  { id: 28, name: "New Zealand",          code: "nz",     group: "G", confederation: "OFC"      },

  // GROUP H
  { id: 29, name: "Spain",                code: "es",     group: "H", confederation: "UEFA"     },
  { id: 30, name: "Cape Verde",           code: "cv",     group: "H", confederation: "CAF"      },
  { id: 31, name: "Saudi Arabia",         code: "sa",     group: "H", confederation: "AFC"      },
  { id: 32, name: "Uruguay",              code: "uy",     group: "H", confederation: "CONMEBOL" },

  // GROUP I
  { id: 33, name: "France",               code: "fr",     group: "I", confederation: "UEFA"     },
  { id: 34, name: "Senegal",              code: "sn",     group: "I", confederation: "CAF"      },
  { id: 35, name: "Iraq",                 code: "iq",     group: "I", confederation: "AFC"      },
  { id: 36, name: "Norway",               code: "no",     group: "I", confederation: "UEFA"     },

  // GROUP J
  { id: 37, name: "Argentina",            code: "ar",     group: "J", confederation: "CONMEBOL" },
  { id: 38, name: "Algeria",              code: "dz",     group: "J", confederation: "CAF"      },
  { id: 39, name: "Austria",              code: "at",     group: "J", confederation: "UEFA"     },
  { id: 40, name: "Jordan",               code: "jo",     group: "J", confederation: "AFC"      },

  // GROUP K
  { id: 41, name: "Portugal",             code: "pt",     group: "K", confederation: "UEFA"     },
  { id: 42, name: "DR Congo",             code: "cd",     group: "K", confederation: "CAF"      },
  { id: 43, name: "Uzbekistan",           code: "uz",     group: "K", confederation: "AFC"      },
  { id: 44, name: "Colombia",             code: "co",     group: "K", confederation: "CONMEBOL" },

  // GROUP L
  { id: 45, name: "England",              code: "gb-eng", group: "L", confederation: "UEFA"     },
  { id: 46, name: "Croatia",              code: "hr",     group: "L", confederation: "UEFA"     },
  { id: 47, name: "Ghana",                code: "gh",     group: "L", confederation: "CAF"      },
  { id: 48, name: "Panama",               code: "pa",     group: "L", confederation: "CONCACAF" },
];

/**
 * Helper to find a team by ID.
 * @param {number} id - The team ID
 * @returns {Object|undefined} The team object
 */
export const getTeamById = (id) => TEAMS.find((t) => t.id === id);

/**
 * Helper to get all teams in a specific group.
 * @param {string} groupLetter - The group letter (A-L)
 * @returns {Object[]} Array of teams in that group
 */
export const getTeamsByGroup = (groupLetter) =>
  TEAMS.filter((t) => t.group === groupLetter);
