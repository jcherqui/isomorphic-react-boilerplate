import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, hashHistory } from 'react-router';
import Routes from './routes';
import { loadState, saveState } from './localStorage';
import reducers from './reducers';

const persistedState = loadState();
const store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState({ book: store.getState().book });
});

ReactDOM.render(
    <Provider store={store}>
        <Router routes={Routes} history={hashHistory} />
    </Provider>,
    document.getElementById('root')
);
