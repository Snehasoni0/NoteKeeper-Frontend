import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import axiosInstance from '../../lib/axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      alert("Incorrect username and password")
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='border shadow p-6 w-80 bg-white rounded-xl'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Email Address' required />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border' placeholder='******' required />
          </div>
          <div className='mb-4'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2 cursor-pointer active:scale-95'>Login</button>
            <p className='text-center mt-2'>Don't Have Account? <Link to='/register' className='text-teal-600 font-semibold'>Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login