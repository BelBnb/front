import { User } from "@/redux/reducers/userReducer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "../main/mainComponent";
import { ProtectedRoute } from "./protectedRoute";
import Header from "../header/headerComponent";
import styles from "./styles.module.scss";
import LoginPage from "../auth/login/loginPageComponent";
import SignUpPage from "../auth/signUp/signUpPage";

export default function App() {
  const selectore = useSelector<RootState, User>((el) => el.user);
  return (
    <Router>
      <div className={styles.pageWrapper}>
        <Header />
        <Routes>
          <Route path="/kirill" element={<Main />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/nohon"
            element={
              <ProtectedRoute user={selectore}>
                <span>Successful prikol</span>
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}
