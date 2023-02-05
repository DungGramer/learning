import { useParams } from 'react-router-dom';
import useTeamsArticles from '../hooks/useTeamsArticles';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Articles() {
  const { teamId } = useParams();

  const { response: articles, loading } = useTeamsArticles(teamId);

  if (loading) return <p>Loading</p>;

  return (
    <div className="container two-column">
      <Sidebar title={`Articles`} list={articles.map((article) => article.title)} />

      <Outlet />
    </div>
  );
}
