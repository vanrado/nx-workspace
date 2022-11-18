import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counter-slice"

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, RootState, AppDispatch };
