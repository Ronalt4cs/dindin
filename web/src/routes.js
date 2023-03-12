import Main from './pages/Main';
import SignIn from './pages/SignIn';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp';
import { getItem } from './utils/storage';

function ProtectedRoutes({ redirectTo }) {

  const isAuthenticated = getItem('token')

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/usuario" element={<SignUp />} />

      <Route element={<ProtectedRoutes redirectTo='/login' />}>
        <Route path="/home" element={<Main />} />
      </Route>
    </Routes>

  );
}

export default MainRoutes;