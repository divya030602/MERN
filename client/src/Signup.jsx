import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { ...errors };
    if (!formData.name) {
      valid = false;
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      valid = false;
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      valid = false;
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) {
      valid = false;
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      valid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);

    if (valid) {
      navigate("/login");
    }
  };

  return (
    <div className="container profile-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control rounded-0 ${errors.name && "is-invalid"}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
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
            className={`form-control rounded-0 ${errors.email && "is-invalid"}`}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
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
            className={`form-control rounded-0 ${
              errors.password && "is-invalid"
            }`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            <strong>Confirm Password</strong>
          </label>
          <input
            type="password"
            placeholder="*******"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-control rounded-0 ${
              errors.confirmPassword && "is-invalid"
            }`}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100 rounded-0">
          Register
        </button>
      </form>
      <p>
        Already Have an Account?
        <Link to="/login" className="btn-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
