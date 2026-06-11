import { useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';

/**
 * Custom hook for consuming the TournamentContext.
 * Always use this instead of calling useContext(TournamentContext) directly.
 *
 * @returns {Object} The full tournament context value
 * @throws {Error} If used outside of TournamentProvider
 */
export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
