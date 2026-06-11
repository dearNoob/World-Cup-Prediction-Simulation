import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TournamentProvider } from './context/TournamentContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import GroupStagePage from './pages/GroupStagePage';
import KnockoutPage from './pages/KnockoutPage';
import ChampionPage from './pages/ChampionPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * App — Root application component.
 * Sets up state provider and browser routing hierarchy.
 */
export default function App() {
  return (
    <TournamentProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-fifa-dark text-gray-100 font-sans selection:bg-fifa-gold selection:text-fifa-dark">
          {/* Header Sticky Navigation */}
          <Navbar />

          {/* Main Route Content */}
          <Routes>
            <Route path="/"                     element={<HomePage />} />
            <Route path="/group-stage"          element={<GroupStagePage />} />
            <Route path="/group-stage/:groupId" element={<GroupStagePage />} />
            <Route path="/knockout"             element={<KnockoutPage />} />
            <Route path="/champion"             element={<ChampionPage />} />
            <Route path="*"                     element={<NotFoundPage />} />
          </Routes>

          {/* Site Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </TournamentProvider>
  );
}
