import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '~/store/modules/rootReducer';

const persistConfig = {
  key: 'gympoint',
  storage,
  whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
