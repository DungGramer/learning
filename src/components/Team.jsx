import { useParams } from "react-router-dom";
import useTeam from "../hooks/useTeam";


export default function Team() {
  const { teamId } = useParams();

  const {loading, response: team} = useTeam(teamId);

  if (loading) return null;

  return (
    <div className="panel">
      <div style={{width: '100%'}}>
        <TeamLogo id={teamId} className="center" />
        <h1 className="medium-header">{team.name}</h1>
        
      </div>
    </div>
  )
}