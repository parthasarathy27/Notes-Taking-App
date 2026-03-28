import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, FileText, AlignLeft, Calendar as CalendarIcon } from 'lucide-react';
import gsap from 'gsap';

export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    });
    
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(formRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
        );
    }, []);

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    const createNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date } = note;
                const newNote = { title, content, date };

                await axios.post('/api/notes', newNote, {
                    headers: { Authorization: token }
                });

                gsap.to(formRef.current, {
                    opacity: 0, y: -30, duration: 0.4, onComplete: () => navigate('/')
                });
            }
        } catch (err) {
            console.error('Error creating note:', err);
            navigate('/');
        }
    };

    return (
        <div className="create-note-container">
            <div className="form-card glass" ref={formRef}>
                <h2><FileText color="#3b82f6" /> Create New Note</h2>
                <form onSubmit={createNote} autoComplete="off">
                    <div className="input-group">
                        <FileText className="input-icon" size={20} />
                        <input
                            type="text"
                            value={note.title}
                            id="title"
                            name="title"
                            placeholder="Note Title"
                            required
                            onChange={onChangeInput}
                        />
                    </div>

                    <div className="input-group">
                        <AlignLeft className="input-icon" size={20} style={{ alignSelf: 'flex-start', marginTop: '12px' }} />
                        <textarea
                            value={note.content}
                            id="content"
                            name="content"
                            placeholder="Write your note down here..."
                            required
                            rows="10"
                            onChange={onChangeInput}
                        />
                    </div>

                    <div className="input-group">
                        <CalendarIcon className="input-icon" size={20} />
                        <input
                            type="date"
                            id="date"
                            name="date"
                            onChange={onChangeInput}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" style={{marginTop: '2rem'}}>
                        <Save size={20} /> Save Note
                    </button>
                </form>
            </div>
        </div>
    );
}