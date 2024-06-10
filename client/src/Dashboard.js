import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import user from './images/user_logo-removebg-preview.png'
import './styles/styles.css'; // Assuming you have a separate CSS file for the Dashboard

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      axios.get('https://developer-hub-tmuy.vercel.app/allprofiles', {
        headers: {
          "x-token": localStorage.getItem('token')
        }
      }).then(res => setData(res.data))
        .catch(error => console.error("Error fetching profiles:", error));
    }
  }, [navigate]);

  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'><i className='fas fa-code'></i> Developers Hub</Link>
        </h1>
        <ul>
          <li><Link to="/myprofile">My Profile</Link></li>
          <li><Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link></li>
        </ul>
      </nav>
      <section className='container'>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with Developers
        </p>
        <div className='profiles'>
          {data.length >= 1 ?
            data.map(profile =>
              <div className='profile bg-light' key={profile._id}>
                <img
                  className='round-img'
                  src={user}
                  alt="Developer"
                />
                <div className='profile-info'>
                  <h2>{profile.fullname}</h2>
                  <p>{profile.email}</p>
                  <p>India</p>
                  <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className="btn btn-primary">View Profile</Link>
                </div>
                <ul>
                  {profile.skill.split(",").map(skill => 
                    <li className='text-primary'>
                      <i className='fas fa-check'></i> {skill}
                    </li>
                  )}
                </ul>
              </div>
            )
            : null}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
