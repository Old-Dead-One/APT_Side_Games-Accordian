import { Routes, Route } from 'react-router-dom';
import MuiLayout from './components/MuiLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <div className='App'>
      <>
        <MuiLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </MuiLayout>
      </>
    </div>
  );
}

export default App;
