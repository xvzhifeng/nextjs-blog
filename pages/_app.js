import '../styles/global.css'
import '../styles/navbar.css'
import { store } from '../lib/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}