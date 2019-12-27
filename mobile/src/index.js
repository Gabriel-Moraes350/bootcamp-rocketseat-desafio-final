import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';
import App from './app';
import { store, persistor } from './store';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <App />
      </PersistGate>
    </Provider>
  );
}
