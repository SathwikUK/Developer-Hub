import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import user from './images/user_logo-removebg-preview.png'

const Indprofile = () => {
  const { fullname, email } = useParams();
  const [rating, setRating] = useState('');
  const [taskprovider, setTaskprovider] = useState('');

  useEffect(() => {
    axios.get('https://developer-hub-tmuy.vercel.app/myprofile', {
      headers: {
        "x-token": localStorage.getItem('token')
      }
    })
    .then(res => setTaskprovider(res.data.fullname))
    .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const review = {
      taskprovider,
      taskworker: fullname,
      rating
    };

    axios.post('https://developer-hub-tmuy.vercel.app/addreview', review, {
      headers: {
        "x-token": localStorage.getItem('token')
      }
    })
    .then(res => alert(res.data))
    .catch(err => console.error('Error submitting review:', err));
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
        
        <div className='profile-grid my-1'>
          <div className='profile-top bg-primary p-2'>
            <img 
              className='round-img my-1'
              src={user}
              alt=""
            />
            <h1 className='large'>{fullname}</h1>
            <p className='lead'>{email}</p>
            <p>India</p>
          </div>
          
          <div className='profile-github'>
            <h2 className='text-primary my-1'>
              <i className='fab fa-github'></i> Review and Ratings
            </h2>

            <div className='repo bg-white p-1 my-1'>
              <div>
                <h4>Enter Your Reviews</h4>
                <form className='form' autoComplete='off' onSubmit={submitHandler}>
                  <div className='form-group'>
                    <input
                      type="text"
                      placeholder='Enter your rating out of 5'
                      name="rating"
                      value={rating}
                      onChange={e => setRating(e.target.value)}
                      required
                    />
                  </div>
                  <input type="submit" className='btn btn-primary' value="Add Rating" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Indprofile;