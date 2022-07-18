import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { set } from './actions';

export const SetCounter = () => {
  const countFromStore = useSelector((state) => state.count);
  const [count, setCount] = useState(countFromStore);
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(countFromStore);
  }, [countFromStore]);

  return (
    <section className="controls">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(set(count));
        }}
      >
        <label htmlFor="set-to">Set Count</label>
        <input
          id="set-to"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <input type="submit" />
      </form>
    </section>
  );
};
