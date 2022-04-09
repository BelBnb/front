import { increment } from "@/redux/reducers/counterReducer";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {
    const [counter, setCounter] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(increment(10))
    })

    const handleClck = () => {
        setCounter(prevState => prevState+=1)
    }

    
    return <div className={styles.elem}>
        <span>{counter}</span>
        <button onClick={handleClck}>Плюс контент</button>
    </div>;
};

export default Main;
