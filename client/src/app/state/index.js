import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducer from './reducer'


const middleware = applyMiddleware(ReduxThunk);

const store = createStore(
    reducer,
    compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

export { store }