import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loading from './Loading';
import Navbar from './Navbar';
const Home = lazy(() => import('./Home'));
const Teams = lazy(() => import('./Teams'));
const Players = lazy(() => import('./Players'));
const TeamPage = lazy(() => import('./TeamPage'));
const Player = lazy(() => import('./Player'));
const Team = lazy(() => import('./Team'));
const Articles = lazy(() => import('./Articles'));
const Article = lazy(() => import('./Article'));

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />}>
              <Route path=":playerId" element={<Player />} />
              <Route path="" element={<div className="sidebar-instruction">Select a player</div>} />
            </Route>
            <Route path="/teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="" element={<div className="sidebar-instruction">Select a Team</div>} />
            </Route>
            <Route path="/:teamId" element={<TeamPage />} />
            <Route path="/:teamId/articles" element={<Articles />}>
              <Route path=":articleId" element={<Article />} />
              <Route
                path=""
                element={<div className="sidebar-instruction">Select an article</div>}
              />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
