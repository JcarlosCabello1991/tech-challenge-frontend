import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store} from '../redux/store/store'
import {Provider} from 'react-redux'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <Provider store={store}>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp
