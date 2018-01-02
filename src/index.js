import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './containers/App'
import { BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
    reducer,
    devToolsEnhancer(),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter><App/></BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
