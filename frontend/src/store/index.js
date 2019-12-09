import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import createStore from './createStore';
import persistedReducer from '~/config/persistentStore';

import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistedReducer, middlewares);
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
