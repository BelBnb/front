import { User } from "@/redux/reducers/userReducer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "@/components/admin/adminPanel";
import NeighboursMain from "@/components/neighbours/All/neighboursComponent";
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
import NotFound from "../notFound/NotFound";

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
            <Route path="/hotel/:id" element={<ParticularHotel />} />
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
            <Route path="/messenger/:id" element={<MessengerMain />} />
            <Route path="/neighbours" element={<NeighboursMain />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute user={selectore}>
                  <ProfileWrapper />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
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

      <ToastContainer transition={Bounce} theme="dark" position="bottom-right" className={styles.prikol} />
    </>
  );
}
