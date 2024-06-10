import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/styles.css';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://developer-hub-tmuy.vercel.app/login', data);
            localStorage.setItem('token',res.data.token)
            // Assuming a successful login redirects to the dashboard or homepage
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to='/'><i className='fas fa-code'></i> Developers Hub</Link>
                </h1>
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <section className="container">
                <h1 className='large text-primary'>Sign In</h1>
                <p className='lead'><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className='form' onSubmit={submitHandler} autoComplete='off'>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder='Email Address'
                            name="email"
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder="Password"
                            name="password"
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <input type='submit' className='btn btn-primary' value="Login" />
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </section>
        </div>
    );
}

export default Login;
