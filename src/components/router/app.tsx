import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../footer/footerComponent";
import Header from "../header/headerComponent";
import Main from "../main/mainComponent";
import styles from "./styles.module.scss";

export default function App() {
  return (
    <Router>
      <div className={styles.pageWrapper}>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/kirill" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
