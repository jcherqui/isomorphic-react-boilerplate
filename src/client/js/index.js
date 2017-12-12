import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import { loadState, saveState } from './localStorage';
import reducers from './app/reducers';
import App from './app/App';

const store = createStore(reducers, loadState());
store.subscribe(() => {
    saveState(store.getState());
    console.log('store changed!', store.getState());
});

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <ReactHotLoader>
                <Component />
            </ReactHotLoader>
        </Provider>,
        document.getElementById('root'),
    );
};

render(App);

if (module.hot) {
    console.log('testwd');
    module.hot.accept('./app/App', () => render(App));
}
