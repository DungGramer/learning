import { Provider } from "react-redux";
import {Counter} from "./Counter";
import { store } from "./store/store";
import './index.scss';

export default () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}