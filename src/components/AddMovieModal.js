// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Notyf } from 'notyf';

// const notyf = new Notyf();

// export default function AddMovieModal({ show, handleClose, refreshMovies }) {
//   const [title, setTitle] = useState('');
//   const [director, setDirector] = useState('');
//   const [year, setYear] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const movieData = { title, director, year };

//     try {
//       const response = await fetch('https://movie-catalog-systemapi-lanuza.onrender.com/movies/addMovie', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movieData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add movie');
//       }

//       const data = await response.json();
//       notyf.success('Movie added successfully!');
//       refreshMovies(); // Refresh the movie list in AdminView
//       handleClose(); // Close the modal
//     } catch (error) {
//       notyf.error('Failed to add movie. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Movie</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="movieTitle">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter movie title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="movieDirector" className="mt-3">
//             <Form.Label>Director</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter director's name"
//               value={director}
//               onChange={(e) => setDirector(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="movieYear" className="mt-3">
//             <Form.Label>Year</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter release year"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
//             {loading ? 'Adding Movie...' : 'Add Movie'}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }
