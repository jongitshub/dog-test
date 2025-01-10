import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }, // Ensure this route is defined
  { path: '/admin-register', element: <AdminRegister /> },
  { path: '/admin-dashboard', element: <AdminDashboard /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
