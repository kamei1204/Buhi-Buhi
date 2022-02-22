import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router';
import { Provider } from 'react-redux'
// 作成したstore
import { store } from '../src/app/store'

import ProgressBar  from "@badrap/bar-of-progress"
import Core from './Core';


const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const store = useStore()
  // const persistor = persistStore(store)

  return (
    // Providerで必ずwrap そうすることでreducerが効いてくれる
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        {/* <Core /> */}
        <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  )
}

export default MyApp
