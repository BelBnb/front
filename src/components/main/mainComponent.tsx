import { disableLoader, enableLoader } from "@/redux/actions/globalSettingsActions";
import { GlobalSettings } from "@/redux/reducers/appStateReducer";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {

    const selector = useSelector<RootState, GlobalSettings>(el => el.appState);

    const dispatch = useDispatch();


    const handleClck = () => {
        dispatch(enableLoader());
    }

    const handleMisClck = () => {
        dispatch(disableLoader());
    }


    
    return <div className={styles.elem}>
        <span>{selector.loaderEnabled? "kok":"shok"}</span>
        <button onClick={handleClck}>Плюс контент</button>
        <button onClick={handleMisClck}>Минус контент</button>
    </div>;
};

export default Main;
