import { Provider } from 'react-redux';
import store from './stores/store';

import { ConfigProvider } from 'antd';
import antdTheme from 'config/antd';
import { createRoot } from 'react-dom/client';
import App from './views/App';
import './styles.scss';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={antdTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
);
