import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/counterReducer'
const store = configureStore({
  reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>