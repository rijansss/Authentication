import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import AdminDashboard from './pages/AdminDashBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element= {<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path= '/dashboard' element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>
        <Route path ='/admin'element ={<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
