import { Link, useLocation, useSearchParams } from 'react-router-dom';
import usePlayerNames from '../hooks/usePlayerNames';
import { slugify } from '../utils';
import { useEffect, useState } from 'react';

function CustomLink({ to, children }) {
  const location = useLocation();
  const playerId = location.pathname.split('/')[2];
  const match = playerId === to;

  const styles = match === true ? { fontWeight: 900, color: 'var(--white' } : null;

  return (
    <li>
      <Link style={styles} to={{ pathname: to, search: location.search }}>
        {children}
      </Link>
    </li>
  );
}

function Sidebar({ title, list }) {
  return (
    <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {list.map((item) => (
          <CustomLink key={item} to={slugify(item)}>
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );
}

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

  // const team = searchParams.get('teamId');

  const { response: players, loading } = usePlayerNames(team);

  if (loading) return null;

  return (
    <div className="container">
      <Sidebar title="Players" list={players} />
    </div>
  );
}
