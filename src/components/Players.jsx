import { useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import usePlayerNames from '../hooks/usePlayerNames';
import Sidebar from './Sidebar';



export default function Players() {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const [team, setTeam] = useState(searchParams.get('teamId'));

  useEffect(() => {
    if (location.search === '') {
      searchParams.delete('teamId');
      setTeam(null);
    } else {
      setTeam(searchParams.get('teamId'));
    }
  }, [location.search, searchParams]);

  const { response: names, loading } = usePlayerNames(team);

  if (loading) return null;

  return (
    <div className="container two-column">
      <Sidebar title="Players" list={names} />

      <Outlet />
    </div>
  );
}
