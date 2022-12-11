import './store-feature-game-detail.scss';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CardMedia } from '@material-ui/core';
import { formatRating } from '@nxegghead/store/util-formatters';
import { Game } from '@nxegghead/api/util-interfaces';

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps {}

export function StoreFeatureGameDetail() {
  const params = useParams();

  const [state, setState] = useState<{
    data: Game | null;
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: null,
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    const gameId = params.id;
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, [params.id]);

  return (
    <div className="container">
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error fetching data</div>
      ) : state.data == null ? (
        ''
      ) : (
        <Card>
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              image={state.data.image}
              title={state.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="game-rating"
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default StoreFeatureGameDetail;
