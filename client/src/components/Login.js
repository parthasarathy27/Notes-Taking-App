import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import gsap from 'gsap';

export default function Login({ setIsLogin }) {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [err, setErr] = useState('');
    const [onLogin, setOnLogin] = useState(true);

    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const containerRef = useRef(null);

    // Initial mount animation
    useEffect(() => {
        gsap.fromTo(containerRef.current, 
            { opacity: 0, scale: 0.9, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    // Switch between Login and Register with animation
    useEffect(() => {
        if (onLogin) {
            gsap.to(registerRef.current, { opacity: 0, x: 50, duration: 0.4, display: 'none', ease: "power2.in" });
            gsap.fromTo(loginRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.4, delay: 0.2, display: 'flex', ease: "power2.out" });
        } else {
            gsap.to(loginRef.current, { opacity: 0, x: -50, duration: 0.4, display: 'none', ease: "power2.in" });
            gsap.fromTo(registerRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.4, delay: 0.2, display: 'flex', ease: "power2.out" });
        }
    }, [onLogin]);


    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    }

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password
            });
            setUser({ name: '', email: '', password: '' });
            setErr(res.data.msg);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    }

    const loginSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            });
            setUser({ name: '', email: '', password: '' });
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    }

    return (
        <section className="login-page">
            <div className="auth-card glass" ref={containerRef}>
                
                {/* LOGIN FORM */}
                <div ref={loginRef} style={{flexDirection: 'column', gap: '1rem'}}>
                    <h2>Welcome Back</h2>
                    <form onSubmit={loginSubmit}>
                        <div className="input-group">
                            <Mail className="input-icon" />
                            <input type="email" name="email" id="login-email"
                                placeholder="Email Address" required value={user.email}
                                onChange={onChangeInput} />
                        </div>

                        <div className="input-group">
                            <Lock className="input-icon" />
                            <input type="password" name="password" id="login-password"
                                placeholder="Password" required value={user.password} autoComplete="true"
                                onChange={onChangeInput} />
                        </div>

                        <button type="submit" className="submit-btn">
                            <LogIn size={20} /> Login
                        </button>
                        
                        <div className="auth-footer">
                            <p>Don't have an account? <span onClick={() => {setOnLogin(false); setErr('');}}>Register Now</span></p>
                        </div>
                        {err && <h3>{err}</h3>}
                    </form>
                </div>

                {/* REGISTER FORM */}
                <div ref={registerRef} style={{flexDirection: 'column', gap: '1rem', display: 'none'}}>
                    <h2>Create Account</h2>
                    <form onSubmit={registerSubmit}>
                        <div className="input-group">
                            <User className="input-icon" />
                            <input type="text" name="name" id="register-name"
                                placeholder="Username" required value={user.name}
                                onChange={onChangeInput} />
                        </div>

                        <div className="input-group">
                            <Mail className="input-icon" />
                            <input type="email" name="email" id="register-email"
                                placeholder="Email Address" required value={user.email}
                                onChange={onChangeInput} />
                        </div>

                        <div className="input-group">
                            <Lock className="input-icon" />
                            <input type="password" name="password" id="register-password"
                                placeholder="Password" required value={user.password} autoComplete="true"
                                onChange={onChangeInput} />
                        </div>

                        <button type="submit" className="submit-btn">
                            <UserPlus size={20} /> Register
                        </button>
                        
                        <div className="auth-footer">
                            <p>Already have an account? <span onClick={() => {setOnLogin(true); setErr('');}}>Login Now</span></p>
                        </div>
                        {err && <h3>{err}</h3>}
                    </form>
                </div>
                
            </div>
        </section>
    );
}