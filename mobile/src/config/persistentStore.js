import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '~/store/modules/rootReducer';

const persistConfig = {
  key: 'gympoint',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
