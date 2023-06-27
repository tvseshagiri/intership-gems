import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import store from './rootStore'
import { Provider } from 'react-redux';
import React from 'react';
import Login from '../pages/LoginPage'
import { router } from '../app/createRouter'
import { RouterProvider } from 'react-router-dom';

console.log(store)

const App = () => {

    return (
        <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </React.StrictMode>

    )

}

export default App;