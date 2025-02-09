import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:5050/user/login', // Modify this URL as needed
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Login successful', response.data);
        localStorage.setItem('token', response.data.token);
        alert('Login SuccessFull');
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error(error.request);
        setError('No response received from server');
      } else {
        console.error('Error', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="hidden lg:flex lg:w-1/2 h-full">
        <img src="https://img.freepik.com/free-vector/flat-design-family-tree-silhouette_23-2150410119.jpg?t=st=1721142642~exp=1721146242~hmac=f1ea39c126026dcaf7aa850274a6e7d42a51c49855e57553da961ac87f32efbc&w=740" alt="Description" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 ">
      
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg "

        >
          <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Pop<span className='text-red-800'>Zup</span></h1>
          <h1 className="text-xl text-orange-900 font-sans">Login for a seamless experience</h1>
        </div>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900 mb-4"
          >
            Login
          </button>
          <div className="flex justify-between">
          <Link to="/resetpwd">
            <button
              type="button"
              className="text-slate-800 hover:underline"
            >
              Forgot Password?
            </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="text-slate-800 hover:underline"
              >
                Create Account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
