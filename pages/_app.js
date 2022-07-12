import Layout from '../components/layout/Layout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthContextProvider } from '../store/auth-context';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp
