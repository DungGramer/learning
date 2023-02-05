import { useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import usePlayerNames from '../hooks/usePlayerNames';
import Sidebar from './Sidebar';
import Loading from './Loading';
import { Navigate } from 'react-router-dom';

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

  let body;
  if (loading) {
    body = <Loading />;
  } else if (team === null) {
    body = <Navigate to="teams" />;
  } else {
    body = (
      <>
        <Sidebar title="Players" list={names} />
        <Outlet />
      </>
    );
  }

  return <div className="container two-column">{body}</div>;
}
