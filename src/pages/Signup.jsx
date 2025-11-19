import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://notekeeper-dz6x.onrender.com/api/auth/register', { name, email, password });
      if(response.data.success){
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='border shadow p-6 w-80 bg-white rounded-xl'>
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Name' required />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Email Address' required />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border' placeholder='******' required />
          </div>
          <div className='mb-4'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2 cursor-pointer active:scale-95'>Signup</button>
            <p className='text-center mt-2'>Already Have Account? <Link to='/login' className='text-teal-600 font-semibold'>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup