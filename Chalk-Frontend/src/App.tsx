import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/Login/Login";
import { Register } from "./components/pages/Register/Register";
import { HomePage } from "./components/pages/HomePage/HomePage";
import "./App.css";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { FrontPage } from "./components/pages/FrontPage/FrontPage";
import { WebApp } from "./WebApp";
import { TestPage } from "./components/pages/TestPage/TestPage";

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/webapp"
          element={user.authenticated ? <WebApp /> : <Login />}
        >
          <Route index element={<FrontPage />} />
          <Route path="test" element={<TestPage />} />
          {/*<Route path="test"  element={<TestCreator />} />*/}
          {/*<Route path="group" element={<Group />} />*/}
          {/*<Route path="search" element={<Group />} />*/}
          {/*<Route path="profile" element={<Group />} />*/}
          {/*<Route path="upgrade" element={<Group />} />*/}
          {/*<Route path="history" element={<Group />} />*/}
          {/*<Route path="exercise-list" element={<Group />} />*/}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
