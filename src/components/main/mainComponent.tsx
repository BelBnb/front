import { logUserOut, setUser } from "@/redux/actions/userActions";
import { User } from "@/redux/reducers/userReducer";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Main: React.FC = (): JSX.Element => {
  const selector = useSelector<RootState, User>((el) => el.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(selector);
  }, [selector]);

  const handleClck = () => {
    dispatch(setUser({ email: "prikol", id: 228, roles: ["kirick"], authorized: true }));
  };

  const handleMisClck = () => {
    dispatch(logUserOut());
  };

  return (
    <div className={styles.elem}>
      <nav>
        <ul>
          <li>
            <Link to="/kirill">Home</Link>
            <Link to="/sign-in">Sign in</Link>
            <Link to="/nohon">No homo</Link>
          </li>
        </ul>
      </nav>
      <span>{selector.email}</span>
      <button type="button" onClick={handleClck}>
        Плюс контент
      </button>
      <button type="button" onClick={handleMisClck}>
        Минус контент
      </button>
    </div>
  );
};

export default Main;
