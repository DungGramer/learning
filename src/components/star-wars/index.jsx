import { Provider } from 'react-redux';
import { Application } from './components/Application';
import './index.scss';
import { store } from './store';

export default () => {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
};
