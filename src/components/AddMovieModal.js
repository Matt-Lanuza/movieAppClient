import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function AddMovieModal({ show, handleClose, refreshMovies }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');  // Add description state
  const [genre, setGenre] = useState('');  // Add genre state
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const movieData = { title, director, year: Number(year), description, genre };

    const token = localStorage.getItem('token');
    console.log("here", token);
    console.log(movieData);

    // If token is not found, show an error message
    if (!token) {
      notyf.error('Authentication token is missing. Please log in.');
      handleClose();
      setLoading(false);
      return;
    }

    fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/addMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response Data:", data); 
        if (data) {
          notyf.success('Movie added successfully!');
          refreshMovies();
          handleClose();
          setTitle('');
          setDirector('');
          setYear('');
          setDescription('');
          setGenre('');
        } else {
          throw new Error(data.message || 'Failed to add movie');
        }
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        notyf.error('Failed to add movie. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="movieTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="movieDirector" className="mt-3">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter director's name"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="movieYear" className="mt-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter release year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="movieDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter movie description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="movieGenre" className="mt-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter movie genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? 'Adding Movie...' : 'Add Movie'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
