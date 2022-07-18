import { Provider } from 'react-redux';
import './index.css';
import { Theme } from '@twilio-paste/core/theme';
import store from './store';
import { Calculator } from './Calculator';

export default () => {
  return (
    <Provider store={store}>
      <Theme.Provider theme="default">
        <Calculator />
      </Theme.Provider>
    </Provider>
  );
};
