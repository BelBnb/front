import { createAction } from "@reduxjs/toolkit";
import { DISABLE_LOADER, ENABLE_LOADER } from "../actionTypes/counterTypes";

export const enableLoader = createAction(ENABLE_LOADER);
export const disableLoader = createAction(DISABLE_LOADER);
