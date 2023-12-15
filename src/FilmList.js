import React, { useState } from 'react';
import './FilmList.css';

function FilmList({ films, onDelete, onEdit }) {
    const [selectedFilm, setSelectedFilm] = useState(null);

    const playVideo = (film) => {
        if (!film.video || film.video === '') {
            console.error('No video URL found for the film:', film.title);
            return;
        }
        setSelectedFilm({ ...film, videoUrl: `http://localhost:3000/uploads/${film.video}` });
    };


    return (
        <div className="film-list">
            {films.map(film => (
                <div key={film.id} className="film-item">
                    <div className="film-thumbnail">
                        { }
                        <p>Film title: {film.title}</p>
                        <button className="play-button" onClick={() => playVideo(film)}>Play</button>
                    </div>
                    <div className="rating">
                        <p>Description: {film.description}</p>
                        <p>Rating: {film.rating} stars</p>
                    </div>
                    <div className="form-actions">
                        <button onClick={() => onDelete(film.id)}>Delete</button>
                        <button onClick={() => onEdit(film)}>Edit</button>
                    </div>
                </div>
            ))}
            {selectedFilm && (
                <div className="video-player">
                    <video src={selectedFilm.videoUrl} controls autoPlay>
                        Your browser does not support the video tag.
                    </video>
                    <button onClick={() => setSelectedFilm(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default FilmList;


