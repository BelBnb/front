import { User } from "@/redux/reducers/userReducer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Main from "../main/mainComponent";
import { ProtectedRoute } from "./protectedRoute";

export default function App() {
  const selectore = useSelector<RootState, User>(el => el.user);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/kirill">Home</Link>
              <Link to="/sign-in">Sign in</Link>
              <Link to="/nohon">No homo</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/kirill" element={<Main />} />
          <Route path="/sign-in" element={<span>pasasi potom prosi</span>} />
          <Route path="/nohon" element={
            <ProtectedRoute user={selectore}>
              <span>Successful prikol</span>
            </ProtectedRoute>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}
