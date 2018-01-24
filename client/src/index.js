import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import MThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import tapEventPlugin from 'react-tap-event-plugin';

import App from './app/App'

import { store } from './app/state'

const myTheme = getMuiTheme({
    palette: {
        primary1Color: '#008080'
    }
})


tapEventPlugin();

const Root = () => (
    <Provider store={store}>
        <MThemeProvider muiTheme={myTheme}>
            <App/>
        </MThemeProvider>
    </Provider>
)

ReactDOM.render(<Root />, document.querySelector('#root'));
