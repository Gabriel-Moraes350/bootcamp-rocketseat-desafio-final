import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import '~/config/yup.locale.pt-br';
import '~/config/ReactotronConfig';
import { PersistGate } from 'redux-persist/integration/react';

import history from './services/history';
import Routes from './routes';
import GlobalStyle from '~/styles/global';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ToastContainer position="bottom-right" autoClose={4000} />
          <Routes />
          <GlobalStyle />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
