import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
   
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let valid = true;
    const newErrors = { ...errors };
    if (!formData.email) {
      valid = false;
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      valid = false;
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (valid) {
   
      navigate("/profile");
    }
  };

  return (
    <div className="container profile-container"> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="profile-form"> 
        <div className="mb-3">
          <label htmlFor="email" className="form-label"> 
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control rounded-0 ${errors.email && 'is-invalid'}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"> 
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="*******"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control rounded-0 ${errors.password && 'is-invalid'}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 rounded-0"> 
          Log in
        </button>
      </form>
      <p>Don't have an Account?<Link
        to="/register"
        className="btn-primary"
      >
        Sign Up
      </Link></p> 
      
    </div>
  );
}

export default Login;
