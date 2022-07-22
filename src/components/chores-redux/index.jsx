import { Provider } from 'react-redux';
import './index.css';
import { Theme } from '@twilio-paste/core/theme';
import { store } from './store';
import Chores from './Chores';

export default () => {
  return (
    <Provider store={store}>
      <Theme.Provider theme="default">
        <Chores />
      </Theme.Provider>
    </Provider>
  );
};
