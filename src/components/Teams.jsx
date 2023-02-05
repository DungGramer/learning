import { Outlet } from 'react-router-dom';
import useTeamNames from '../hooks/useTeamNames';
import Loading from './Loading';
import Sidebar from './Sidebar';

export default function Teams() {
  const { loading, response: teamNames } = useTeamNames();

  if (loading) return <Loading />;

  return (
    <div className="container two-column">
      <Sidebar title={'Teams'} list={teamNames} />

      <Outlet />
    </div>
  );
}
