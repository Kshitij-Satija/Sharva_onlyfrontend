import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            FoodTracker
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/menu" className="text-gray-600 hover:text-indigo-600">
              Menu
            </Link>
            <Link to="/order-history" className="text-gray-600 hover:text-indigo-600">
              Orders
            </Link>
            <Link to="/friends" className="text-gray-600 hover:text-indigo-600">
              Friends
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-indigo-600">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;