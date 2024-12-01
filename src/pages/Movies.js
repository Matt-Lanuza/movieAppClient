import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView'; 

export default function MoviesPage() {
  const { user } = useContext(UserContext);
  console.log("is the user admin?", user.isAdmin);


  return (
    <div className="movies-page">
      {user && user.isAdmin === true ? (
        <AdminView />
      ) : (
        <UserView />
      )}
    </div>
  );
}
