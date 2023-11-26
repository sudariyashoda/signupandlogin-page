import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      axios
        .post('http://localhost:8081/signup', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log("Data inserted successfully:", res.data);
          // Redirect to login page after successful signup
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100' style={{ background: 'linear-gradient(#808080, #808080), #007BFF' }}>
      <div className='bg-white p-3 rounded w-25'>
      <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Name</strong>{' '}
            </label>
            <input type='text' placeholder='Enter Name here' name='name' onChange={handleInput} className='form-control rounded-0' />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>{' '}
            </label>
            <input type='email' placeholder='Enter Email here' name='email' onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>{' '}
            </label>
            <input type='password' placeholder='Enter password here' name='password' onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          
          <button type='submit' className='btn btn-success w-100 rounded-0 bg-dark border-dark'>
            <strong>Signup</strong>
          </button>

          <p>Do you agree to our terms and policies?</p>
          <Link to='/' className='btn btn-outline-dark w-100 rounded-0 text-decoration-none'>
            <strong>Log In</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
