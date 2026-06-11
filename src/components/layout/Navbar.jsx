import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTournament } from '../../hooks/useTournament';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { RotateCcw, Award, Menu, X, Trophy } from 'lucide-react';

/**
 * Navbar — Sticky header navigation with links and a tournament reset trigger.
 */
const Navbar = () => {
  const { resetTournament, predictedMatchCount } = useTournament();
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleResetConfirm = () => {
    resetTournament();
    setIsResetOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/group-stage');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-fifa-dark/90 backdrop-blur-md border-b border-fifa-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center gap-2 text-white hover:opacity-95 select-none">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-fifa-blue to-fifa-gold flex items-center justify-center shadow-md shadow-fifa-gold/10">
              <Trophy size={18} className="text-fifa-dark" strokeWidth={2.5} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight leading-none uppercase">
                FIFA World Cup
              </span>
              <span className="text-[10px] text-fifa-gold tracking-widest font-bold uppercase leading-none">
                2026 Predictor
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/group-stage" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Group Stage
            </NavLink>
            <NavLink to="/knockout" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Knockout Stage
            </NavLink>
            <NavLink to="/champion" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Champion
            </NavLink>
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {predictedMatchCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsResetOpen(true)}
                className="flex items-center gap-1.5 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <RotateCcw size={14} /> Reset Predictor
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-fifa-muted hover:text-white hover:bg-fifa-border/40 transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-fifa-border bg-fifa-dark px-4 py-4 flex flex-col gap-3 animate-fade-in shadow-2xl">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors block ${
                isActive ? 'text-fifa-gold bg-fifa-gold/10' : 'text-gray-300 hover:bg-fifa-border/40'
              }`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/group-stage"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors block ${
                isActive ? 'text-fifa-gold bg-fifa-gold/10' : 'text-gray-300 hover:bg-fifa-border/40'
              }`}
            >
              Group Stage
            </NavLink>
            <NavLink
              to="/knockout"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors block ${
                isActive ? 'text-fifa-gold bg-fifa-gold/10' : 'text-gray-300 hover:bg-fifa-border/40'
              }`}
            >
              Knockout Stage
            </NavLink>
            <NavLink
              to="/champion"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors block ${
                isActive ? 'text-fifa-gold bg-fifa-gold/10' : 'text-gray-300 hover:bg-fifa-border/40'
              }`}
            >
              Champion
            </NavLink>

            {predictedMatchCount > 0 && (
              <div className="border-t border-fifa-border/60 pt-3 mt-1 px-4">
                <button
                  onClick={() => setIsResetOpen(true)}
                  className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 w-full"
                >
                  <RotateCcw size={16} /> Reset Tournament
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Confirmation Reset Modal */}
      <Modal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        title="Reset Tournament?"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            Are you sure you want to reset the entire tournament simulation?
            This will permanently delete all predictions for group stage matches and knockout rounds.
          </p>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="ghost" onClick={() => setIsResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleResetConfirm}>
              Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
