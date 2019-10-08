import React from 'react';
import { Router } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // will allow to use the redux in all the application

import { ToastContainer } from 'react-toastify'; // it allow to add friendly user messages
// argument autoClose is the quantity of seconds it will still in screen

import './config/ReactotronConfig';

import GlobalStyles from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      {/* <BrowserRouter> // Replaced this by <Router> in order to support history */}
      <Router history={history}>
        <Header />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
        <Routes />
        {/* </BrowserRouter> */}
      </Router>
    </Provider>
  );
}

export default App;
