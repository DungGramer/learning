import { useParams } from 'react-router-dom';
import useArticle from '../hooks/useArticle';
import Loading from './Loading';
import { Navigate } from 'react-router-dom';

export default function Article() {
  const { teamId, articleId } = useParams();

  const { response: article, loading } = useArticle({ teamId, articleId });

  let body;
  if (loading) {
    body = <Loading />;
  } else if (article === null) {
    body = <Navigate to={`/${teamId}/articles`} />;
  } else {
    <article className="article">
      <h1 className="header">{article.title}</h1>
      <p>{article.body}</p>
    </article>;
  }

  return <div className="panel">{body}</div>;
}
