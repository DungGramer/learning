import { Theme } from '@twilio-paste/core/theme';
import { Provider } from 'react-redux';
import Application from './components/Application';
import './index.css';
import { store } from './store';

export default () => {
  return (
    <Provider store={store}>
      <Theme.Provider theme="default">
        <Application />
      </Theme.Provider>
    </Provider>
  );
};
