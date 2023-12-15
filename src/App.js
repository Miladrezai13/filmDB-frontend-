import React, { useState } from 'react';
import FilmForm from './FilmForm';
import FilmList from './FilmList';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editableFilm, setEditableFilm] = useState(null);


  const addFilm = (filmData) => {
    const newFilm = {
      id: Date.now(),
      title: filmData.title,
      description: filmData.description,
      rating: filmData.rating,
      thumbnail: filmData.thumbnail,
      video: filmData.file
    };
    setFilms([...films, newFilm]);
    setShowForm(false);
  };


  const deleteFilm = (filmId) => {
    setFilms(films.filter(film => film.id !== filmId));
  };


  const handleEditFilm = (updatedFilm) => {
    setFilms(films.map(film => film.id === updatedFilm.id ? updatedFilm : film));
    setShowForm(false);
    setEditableFilm(null);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const onCloseFormAndRefresh = () => {
    setShowForm(false);
  };

  const startEditFilm = (film) => {
    setEditableFilm(film);
    setShowForm(true);
  };

  return (
    <div className="App">
      <Header />
      <h1>Filmdatabas</h1>
      <button onClick={() => { setShowForm(true); setEditableFilm(null); }}>Add New Film</button>
      {showForm && (
        <FilmForm
          filmToEdit={editableFilm}
          onAddFilm={addFilm}
          onEditFilm={handleEditFilm}
          onCancel={handleCancel}
          onCloseFormAndRefresh={onCloseFormAndRefresh}
        />
      )}
      <FilmList
        films={films}
        onDelete={deleteFilm}
        onEdit={startEditFilm}
      />
      <Footer />
    </div>
  );
}

export default App;
