import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful", response.data);

      if (response.status === 201) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} required /> <br /> <br />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> <br /> <br />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required /> <br /> <br />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /> <br /> <br />
          
          <button type="submit">Sign up</button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};
