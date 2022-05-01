import { createReducer } from "@reduxjs/toolkit";
import { enableLoader, disableLoader } from "../actions/globalSettingsActions";

export type GlobalSettings = {
  loaderEnabled: boolean;
};

const initState: GlobalSettings = {
  loaderEnabled: false,
};

export const appStateReducer = createReducer(initState, (bldr) => {
  bldr.addCase(enableLoader, (state) => {
    state.loaderEnabled = true;
  });
  bldr.addCase(disableLoader, (state) => {
    state.loaderEnabled = false;
  });
});
