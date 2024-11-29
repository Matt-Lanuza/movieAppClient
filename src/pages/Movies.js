import React, { useState } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView'; 


export default function MoviesPage() {
  const [role, setRole] = useState('user');

  return (
    <div className="movies-page">
      <h1>Movies Page</h1>

      {/* Admin role or User role */}
      {role === 'admin' ? (
        <AdminView />
      ) : (
        <UserView />
      )}


      <div>
        <button onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}>
          Switch to {role === 'admin' ? 'User' : 'Admin'} View
        </button>
      </div>
    </div>
  );
}
