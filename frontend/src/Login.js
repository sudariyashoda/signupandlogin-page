import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [errors, setError] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setError(validationErrors);
    if (!validationErrors.email && !validationErrors.password) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") { 
            alert("No record existed");
          } else {
            navigate('/home');
          }
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div className='bg-white d-flex justify-content-center align-items-center bg-primary vh-100' style={{ background: 'linear-gradient(#808080, #808080), #007BFF' }}>
      <div className='bg-white p-3 rounded w-25'>
      <h2 className="text-center " >Log In</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong> </label>
            <input type="email" placeholder='Enter Email here' name='email' value={values.email} onChange={handleInput} className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong> </label>
            <input type="password" placeholder='Enter password here' name='password' value={values.password} onChange={handleInput} className='form-control rounded-0' />
          </div>
          {errors.email && <p className='text-danger'>{errors.email}</p>}
          {errors.password && <p className='text-danger'>{errors.password}</p>}

          <button type="submit" className='btn btn-outline-dark w-100 rounded-0'>
            <strong>Login</strong>
          </button>

          <p>Do you agree to our terms and policies?</p>
          <Link to="/signup" className='btn btn-outline-dark w-100 rounded-0 text-decoration-none'>
            <strong>Create Account</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
