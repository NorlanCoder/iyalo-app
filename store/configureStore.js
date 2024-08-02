import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import appReducer from "./reducers/appReducer.js";
import rootReducer from "./index";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['appReducer']
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// const store = configureStore({
//     reducer: {
//         app: appReducer,
//     }
// })

// export default store;

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})