import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
})