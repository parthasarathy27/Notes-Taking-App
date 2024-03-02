import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditNote({ match, history }) {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore');
            if (match && match.params && match.params.id) {
                    const res = await axios.get(`/api/notes/${match.params.id}`, {
                        headers: { Authorization: token }
                    });
                    setNote({
                        title: res.data.title,
                        content: res.data.content,
                        date: new Date(res.data.date).toLocaleDateString(),
                        id: res.data._id
                    });
            }
        };
        getNote()
    }, [match])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };


    const editNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date } = note;
                const newNote = {
                    title,
                    content,
                    date
                };

                await axios.post(`/api/notes/`, newNote, {
                    headers: { Authorization: token }
                });

                // Redirect to the home page
                window.location.href = '/';
            }
        } catch (err) {
            // Handle errors, if any, and redirect to home page
            console.error('Error creating note:', err);
            window.location.href = '/';
        }
    };

    return (
        <div className="create-note">
            <h2>Edit Note</h2>
            <form onSubmit={editNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={note.title}
                        id="title"
                        name="title"
                        required
                        onChange={onChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea
                        type="text"
                        value={note.content}
                        id="content"
                        name="content"
                        required
                        rows="10"
                        onChange={onChangeInput}
                    />
                </div>

                <label htmlFor="date">Date: {note.date} </label>
                <div className="row">
                    <input type="date" id="date" name="date" onChange={onChangeInput} />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
