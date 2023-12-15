import React, { useState, useEffect } from 'react';
import './FilmForm.css';

function FilmForm({ filmToEdit, onAddFilm, onEditFilm, onCancel, onCloseFormAndRefresh }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (filmToEdit) {
            setTitle(filmToEdit.title);
            setDescription(filmToEdit.description);
            setRating(filmToEdit.rating);

        } else {
            clearForm();
        }
    }, [filmToEdit]);

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setRating(0);
        setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const filmData = filmToEdit ? { title, description, rating } : { title, description, rating, file };

        if (filmToEdit) {
            onEditFilm({ ...filmData, id: filmToEdit.id });
        } else {

            onAddFilm(filmData);
        }

        clearForm();
        onCloseFormAndRefresh();
    };

    return (
        <div className="film-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Film title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating (stars)"
                />
                {
                    !filmToEdit && (
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                    )
                }
                <div className="form-actions">
                    <button type="submit">{filmToEdit ? 'Save Changes' : 'Add Film'}</button>
                    <button type="button" onClick={() => { onCancel(); onCloseFormAndRefresh(); }}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default FilmForm;
