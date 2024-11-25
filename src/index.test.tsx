import { App, ConfigProvider } from 'antd';
import antdTheme from 'config/antd';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'stores/store';
import { expect, it } from 'vitest';

// The application renders without crashing
it('should render the application without crashing', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootElement = document.getElementById('root');
  expect(rootElement).not.toBeNull();
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  createRoot(rootElement!).render(
    <ConfigProvider theme={antdTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>,
  );
});
