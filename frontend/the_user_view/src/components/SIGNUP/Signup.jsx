// Import necessary libraries and components
import React from 'react';
import './Signup.css';
import { FaUserAlt } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Define the LoginForm component
export const Signup = () => {
  return (
    <div className='wrapper'>
      <form action=''>
        <h1>SIGN UP</h1>

        <div className='input-box'>
          <input type='text' placeholder='Enter Your Name' required />
          <MdDriveFileRenameOutline className='icon' />
        </div>

        <div className='input-box'>
          <input type='text' placeholder='Username' required />
          <FaUserAlt className='icon' />
        </div>

        <div className='input-box'>
          <input type='password' placeholder='Password' required />
          <FaLock className='icon' />
        </div>

        <button type='submit'>REGISTER</button>

        <div className='register-link'>
          <p>
            ALREADY HAVE AN ACCOUNT? <NavLink to="/Signin">LOGIN</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

// Export the LoginForm component as the default export
export default Signup;
