import { combineReducers, configureStore } from '@reduxjs/toolkit'

import gameReducer from '@store/game/slice';

const rootReducer = combineReducers({
  game: gameReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;