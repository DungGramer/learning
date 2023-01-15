import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useTeamsArticles from '../hooks/useTeamsArticles';
import useTeamNames from '../hooks/useTeamNames';
import useTeam from '../hooks/useTeam';
import TeamLogo from './TeamLogo';
import { slugify } from '../utils';

function useTeamPageData(teamId) {
  const { response: teamNames, loading: loadingTeamNames } = useTeamNames(teamId);
  const { response: articles, loading: loadingArticles } = useTeamsArticles(teamId);
  const { response: team, loading: loadingTeam } = useTeam(teamId);

  return {
    teamNames,
    articles,
    team,
    loading: loadingTeamNames || loadingArticles || loadingTeam,
  };
}

const TeamPage = () => {
  const { teamId } = useParams();

  const { teamNames, articles, team, loading } = useTeamPageData(teamId);

  if (loading) return <p>LOADING</p>;

  if (!teamNames.includes(teamId)) {
    return <h1 className="text-center">The {teamId} is not a valid team.</h1>;
  }

  return (
    <div className="panel">
      <TeamLogo id={teamId} className="center" />
      <h1 className="medium-header">{team.name}</h1>
      <h4 style={{ margin: 5 }}>
        <Link to={{ pathname: '/players', search: `?teamId=${teamId}` }}>View Roster</Link>
      </h4>
      <h4>Championships</h4>
      <ul className="championships">
        {team.championships.map((ship) => (
          <li key={ship}>{ship}</li>
        ))}
      </ul>
      <ul className="info-list row" style={{ width: '100%' }}>
        <li>
          Est.<div>{team.established}</div>
        </li>
        <li>
          Manager<div>{team.manager}</div>
        </li>
        <li>
          Coach<div>{team.coach}</div>
        </li>
        <li>
          Record
          <div>
            {team.wins}-{team.losses}
          </div>
        </li>
      </ul>
      <ul className="articles">
        {
          articles.map((article) => (
            <li key={article.id}>
              <h4 className="article-title">
                <Link to={`article/${slugify(article.title)}`}>{article.title}</Link>
              </h4>
              <div className="article-date">{new Date (article.date).toLocaleDateString()}</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default TeamPage;
