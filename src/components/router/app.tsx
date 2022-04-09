import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Main from "../main/mainComponent";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/kirill">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/kirill" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}
