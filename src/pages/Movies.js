import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView'; 

export default function MoviesPage() {
  const { user } = useContext(UserContext);
  const [role, setRole] = useState('user'); 

  useEffect(() => {
    if (user && user.isAdmin) {
      setRole('admin');
    } else {
      setRole('user');
    }
  }, [user]);

  return (
    <div className="movies-page">

      {role === 'admin' ? (
        <AdminView />
      ) : (
        <UserView />
      )}
    </div>
  );
}
