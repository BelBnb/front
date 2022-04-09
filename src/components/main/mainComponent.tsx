import { logUserOut, setUser } from "@/redux/actions/userActions";
import { User } from "@/redux/reducers/userReducer";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {

    const selector = useSelector<RootState, User>(el => el.user);

    const dispatch = useDispatch();

    useEffect(()=> {
        console.log(selector)
    }, [selector])

    const handleClck = () => {
        dispatch(setUser({email:"prikol", id:228, roles:["kirick"]}));
    }

    const handleMisClck = () => {
        dispatch(logUserOut());
    }


    
    return <div className={styles.elem}>
        <span>{selector.email}</span>
        <button onClick={handleClck}>Плюс контент</button>
        <button onClick={handleMisClck}>Минус контент</button>
    </div>;
};

export default Main;
