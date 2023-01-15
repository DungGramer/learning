import { useParams } from 'react-router-dom';
import usePlayer from '../hooks/usePlayer';

export default function Player() {
  const { playerId } = useParams();

  const { response: player, loading } = usePlayer(playerId);

  if (loading || !player) return null;

  return <div className="panel">{}</div>;
}
