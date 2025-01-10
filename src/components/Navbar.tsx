import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 text-white px-4 py-3 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="../public/puppy-logo.jpg"
          alt="Puppy Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-lg font-bold">Dog Sitting App</h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
