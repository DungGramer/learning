import Characters from './Characters';
import FetchCharacters from './FetchCharacters';

export const Application = () => {
  return (
    <div className="Application">
      <h1>Algolia Search</h1>
      <FetchCharacters />
      <Characters />
    </div>
  );
};
