import React from 'react';
import { Link } from "react-router-dom";
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div>
      <h1>Register an account to begin your budget adventure!</h1>
      <Register />
      <div>Already have an account? Click <Link to='/'>here</Link> to log in</div>
    </div>
  )
}

export default RegisterPage;
