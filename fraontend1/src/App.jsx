import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { Dashboard } from './components/dashboard';
import { Home } from "./components/home";
import Login from "./components/login";
import { Logout } from './components/logout';
import { Navigation } from './components/navigation';
import { Register } from "./components/register";
import './interceptor/axiox';



function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
