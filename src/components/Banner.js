import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const notyf = new Notyf();

export default function Banner() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); 

  const isAuthenticated = !!localStorage.getItem('token');

  const handleClick = () => {
    if (!isAuthenticated) {
      notyf.error('Please log in first to start your movie journey!');
      navigate('/login');
    } else if (user && user.isAdmin) {
      notyf.success('Welcome, Admin! Navigating to the movies page.');
      navigate('/movies');
    } else {
      navigate('/movies');
    }
  };

  return (
    <Row>
      <Col className="text-center py-5">
        <h1>Welcome to CineGuru</h1>
        <p>Bringing the magic of movies to your screen!</p>

        {/* Conditionally show button text and action based on user.isAdmin */}
        <Button variant="danger" onClick={handleClick}>
          {isAuthenticated
            ? user && user.isAdmin
              ? 'Check Dashboard'
              : 'Join the Movie Adventure'
            : 'Login to Continue'}
        </Button>
      </Col>
    </Row>
  );
}
