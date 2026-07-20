import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./service/profileApi";
import { authSlice } from "./slice/auth-slice";
import storage from "redux-persist/es/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { authApi } from "./service/authApi";
import { experienceApi } from "./service/experienceApi";
import { cardCategoryApi } from "./service/cardCategoryApi";
import { cardApi } from "./service/cardApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [profileApi.reducerPath]: profileApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [experienceApi.reducerPath]: experienceApi.reducer,
  [cardCategoryApi.reducerPath]: cardCategoryApi.reducer,
  [cardApi.reducerPath]: cardApi.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      profileApi.middleware,
      authApi.middleware,
      experienceApi.middleware,
      cardCategoryApi.middleware,
      cardApi.middleware,
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
