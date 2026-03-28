import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import { Trash2, Edit, Calendar } from 'lucide-react';
import gsap from 'gsap';

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');
    const containerRef = useRef(null);

    const getNotes = async (token) => {
        const res = await axios.get('/api/notes', {
            headers: { Authorization: token }
        });
        setNotes(res.data);
    };

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getNotes(token);
        }
    }, []);

    // Staggered enter animation for notes when they load
    useEffect(() => {
        if (notes.length > 0 && containerRef.current) {
            const cards = containerRef.current.querySelectorAll('.note-card');
            gsap.fromTo(cards, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
            );
        }
    }, [notes]);

    const deleteNote = async (id) => {
        try {
            if (token) {
                // Add a quick exit animation before deleting
                const card = document.getElementById(`note-${id}`);
                gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: async () => {
                    await axios.delete(`/api/notes/${id}`, {
                        headers: { Authorization: token }
                    });
                    getNotes(token);
                }});
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="note-grid" ref={containerRef}>
            {
                notes.map(note => (
                    <div className="note-card glass" key={note._id} id={`note-${note._id}`}>
                        <div className="note-card-header">
                            <h4 className="note-card-title" title={note.title}>{note.title}</h4>
                            <div className="note-actions">
                                <Link to={`edit/${note._id}`} className="icon-btn">
                                    <Edit size={16} />
                                </Link>
                                <button className="icon-btn delete" onClick={() => deleteNote(note._id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="note-content">
                            <p>{note.content}</p>
                        </div>
                        
                        <div className="note-footer">
                            <span className="author">{note.name}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Calendar size={14} /> {format(note.date)}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
