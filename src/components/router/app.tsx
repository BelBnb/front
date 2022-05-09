import { User } from "@/redux/reducers/userReducer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Main from "../main/mainComponent";
import { ProtectedRoute, UnprotectedRoute } from "./protectedRoute";
import Header from "../header/headerComponent";
import styles from "./styles.module.scss";
import LoginPage from "../auth/login/loginPageComponent";
import SignUpPage from "../auth/signUp/signUpPage";
import MessengerMain from "../mesenger/messengerMain/messengerMain";
import HotelsWrapper from "../hotels/hotelsWrapper/HotelsWrapper";
import ParticularHotel from "../hotels/particularHotel/ParticularHotel";
import ProfileWrapper from "../profile/profileWrapper/ProfileWrapper";
import "react-toastify/dist/ReactToastify.css";
import BookingMain from "@/components/bookings/bookingsComponent";

export default function App() {
  const selectore = useSelector<RootState, User>((el) => el.user);
  const [open, setOpen] = useState(true);

  return (
    <>
      <Router>
        <div className={styles.pageWrapper}>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/hotels" element={<HotelsWrapper />} />
            <Route path="/hotels/:id" element={<ParticularHotel />} />
            <Route
              path="/sign-in"
              element={
                <UnprotectedRoute user={selectore}>
                  <LoginPage />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <UnprotectedRoute user={selectore}>
                  <SignUpPage />
                </UnprotectedRoute>
              }
            />
            <Route path="/messenger" element={<MessengerMain />} />
            <Route path="/booking" element={<BookingMain />} />
            <Route path="*" element={<span>kek</span>} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={selectore}>
                  <ProfileWrapper />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* <Footer /> */}
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}
