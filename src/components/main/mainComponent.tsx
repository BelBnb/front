import { decrementCounter, incrementCounter } from "@/redux/actions/counterActions";
import { increment } from "@/redux/reducers/counterReducer";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {
    const [counter, setCounter] = useState(0)

    const selector = useSelector<RootState, {counter: number}>(el => el.counter);

    const dispatch = useDispatch();


    const handleClck = () => {
        dispatch(incrementCounter(1));
    }

    const handleMisClck = () => {
        dispatch(decrementCounter(1));
    }


    
    return <div className={styles.elem}>
        <span>{selector.counter}</span>
        <button onClick={handleClck}>Плюс контент</button>
        <button onClick={handleMisClck}>Минус контент</button>
    </div>;
};

export default Main;
