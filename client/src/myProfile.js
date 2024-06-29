
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import user from './images/user_logo-removebg-preview.png'
import "./styles/styles.css";

const MyProfile = () => {
  const [data, setData] = useState(null);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      axios.get('https://developer-hub-tmuy.vercel.app/myprofile', {
        headers: {
          "x-token": localStorage.getItem('token')
        }
      }).then(res => {
        setData(res.data);
        console.log(res.data);
    })
    
        .catch(error => console.error("Error fetching profile:", error));

      axios.get('https://developer-hub-tmuy.vercel.app/myreview', {
        headers: {
          "x-token": localStorage.getItem('token')
        }
      }).then(res => setReview(res.data))
        .catch(error => console.error("Error fetching reviews:", error));
    }
  }, [navigate]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Logic for handling review submission goes here
  };

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
        <Link to="/dashboard" className='btn btn-light'>Back To Profiles</Link>
        {data && (
          <div className='profile-grid my-1'>
            <div className='profile-top bg-primary p-2'>
              <img
                className='round-img my-1'
                src={user}
                alt=""
              />
              <h1 className='large'>{data.fullname}</h1>
              <p className='lead'>{data.email}</p>
              <p>India</p>
            </div>

            <div className='profile-github'>
              <h2 className='text-primary my-1'>
                <i className='fab fa-github'></i> Review and Ratings
              </h2>
              {review ? 
  review.map(r => (
    <div className='repo bg-white p-1 my-1' key={r._id}>
      <h4><Link to="#">{r.taskprovider}</Link></h4>
      <p>{r.rating}/5</p>
    </div>
  ))
  : 
  <p>No reviews available</p>
}


            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyProfile;