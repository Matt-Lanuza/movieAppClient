import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function Banner() {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/movies');
    } else {
      notyf.error('Please log in first to start your fitness journey!');
      navigate('/login');
    }
  };

  return (
    <Row>
      <Col className="text-center py-5">
        <h1>Welcome to CineGuru</h1>
        <p>Bringing the magic of movies to your screen!</p>
        
        {/* Show the button only if the user is authenticated */}
        <Button variant="danger" onClick={handleClick}>
          Join the Movie Adventure
        </Button>
      </Col>
    </Row>
  );
}
