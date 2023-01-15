import useTeamNames from '../hooks/useTeamNames';
import Sidebar from './Sidebar';

export default function Teams() {
  const { loading, response: teamNames } = useTeamNames();

  if (loading) return null;

  return (
    <div className="container two-cilumn">
      <Sidebar title={'Teams'} list={teamNames} />
    </div>
  );
}
