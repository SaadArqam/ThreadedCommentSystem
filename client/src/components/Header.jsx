import React from 'react';
import { useUser } from '../contexts/UserContext';

const Header = () => {
  const { user, loading } = useUser();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
            <p className="text-sm text-gray-500">Share your thoughts and join the conversation</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Not logged in
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

