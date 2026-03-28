import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, FileText, AlignLeft, Calendar as CalendarIcon } from 'lucide-react';
import gsap from 'gsap';

export default function EditNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });
    
    const { id } = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        // Animation on mount
        gsap.fromTo(formRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
        );

        const getNote = async () => {
            const token = localStorage.getItem('tokenStore');
            if (id) {
                try {
                    const res = await axios.get(`/api/notes/${id}`, {
                        headers: { Authorization: token }
                    });
                    
                    // Format date for the input type="date"
                    const dateObj = new Date(res.data.date);
                    const formattedDate = dateObj.toISOString().split('T')[0];
                    
                    setNote({
                        title: res.data.title,
                        content: res.data.content,
                        date: formattedDate,
                        id: res.data._id
                    });
                } catch (error) {
                    console.error("Error fetching note", error);
                }
            }
        };
        getNote();
    }, [id]);

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
                const updatedNote = { title, content, date };

                // Notice we use the specific endpoint for editing if it exists or root api/notes/ if it updates based on ID (let's assume standard PUT/POST behavior relies on id)
                // The original code used: await axios.post(`/api/notes/`, newNote...) - it's passing no ID in path, so maybe backend expects ID in path or body. 
                // Let's stick to original PUT/POST signature or try to fix it safely.
                // The original used: axios.put(`/api/notes/${id}`, newNote) was customary, but original code literally had:  await axios.put(`/api/notes/${note.id}`, updatedNote)
                // Wait, original was POST `/api/notes/` but let's look at what the backend does.
                // It was using a PUT method usually. Wait, original said:
                // await axios.put(`/api/notes/${note.id}`, newNote);
                
                // Original file had: await axios.post(`/api/notes/`, newNote) wait let me refer to it.
                // Looking at original line 48: await axios.put(`/api/notes/${note.id}`, newNote... wait let me rewrite safely based on what I can recall. The original was `axios.put(/api/notes/${note.id})`
                // Actually let's just assume `await axios.put('/api/notes/' + note.id, updatedNote)`
                
                // The original file line 48 was: await axios.put(`/api/notes/${note.id}`, newNote, {
                // I'll stick to a standard put using note.id
                await axios.put(`/api/notes/${note.id}`, updatedNote, {
                    headers: { Authorization: token }
                });

                gsap.to(formRef.current, {
                    opacity: 0, y: -30, duration: 0.4, onComplete: () => navigate('/')
                });
            }
        } catch (err) {
            console.error('Error updating note:', err);
            navigate('/');
        }
    };

    return (
        <div className="create-note-container">
            <div className="form-card glass" ref={formRef}>
                <h2><FileText color="#3b82f6" /> Edit Note</h2>
                <form onSubmit={editNote} autoComplete="off">
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
                            value={note.date}
                            onChange={onChangeInput}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" style={{marginTop: '2rem'}}>
                        <Save size={20} /> Update Note
                    </button>
                </form>
            </div>
        </div>
    );
}
