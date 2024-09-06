import { Routes, Route } from "react-router-dom";
import MuiLayout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <>
        <UserProvider>
          <MuiLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </MuiLayout>
        </UserProvider>
      </>
    </div>
  );
}

export default App;
