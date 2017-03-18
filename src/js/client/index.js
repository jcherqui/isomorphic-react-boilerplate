import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import reducers from './reducers';
import App from './components/App';

const persistedState = loadState();
const store = createStore(
    reducers,
    persistedState,
);

store.subscribe(() => {
    saveState(store.getState());
    console.log('store changed!', store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
