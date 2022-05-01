import { configureStore } from "@reduxjs/toolkit";
// ...
import { appStateReducer } from "./reducers/appStateReducer";
import { UserReducer } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    user: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
