import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Provider store={appStore}>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <div className="h-screen">
              <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
              <Sidebar isOpen={isSidebarOpen} />
              <main
                className={`pt-14 ${
                  isSidebarOpen ? "ml-64" : ""
                } transition-margin duration-300 ease-in-out`}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
