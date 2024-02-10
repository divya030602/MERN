import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    dob: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({}); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    let valid = true;
    const newErrors = {};

    if (!formData.age) {
      valid = false;
      newErrors.age = "Age is required";
    }
    if (!formData.gender) {
      valid = false;
      newErrors.gender = "Gender is required";
    }
    if (!formData.dob) {
      valid = false;
      newErrors.dob = "Date of Birth is required";
    }
    if (!formData.mobile) {
      valid = false;
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      valid = false;
      newErrors.mobile = "Mobile Number must be 10 digits";
    }

    if (!valid) {
      setErrors(newErrors);
      return; 
    }

    try {
      const response = await axios.post("", formData);
      console.log(response.data);
      
      
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update profile");
    }

    if (valid) {
        navigate("/home");
      }
  };

  return (
    <div className="container profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            <strong>Age</strong>
          </label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className={`form-control ${errors.age && "is-invalid"}`}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            <strong>Gender</strong>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`form-control ${errors.gender && "is-invalid"}`}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            <strong>Date of Birth</strong>
          </label>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
            className={`form-control ${errors.dob && "is-invalid"}`}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            <strong>Mobile Number</strong>
          </label>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className={`form-control ${errors.mobile && "is-invalid"}`}
          />
          {errors.mobile && (
            <div className="invalid-feedback">{errors.mobile}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
        <Link to="/login">
          <button className="btn-primary">Log out</button>
        </Link>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Profile;
