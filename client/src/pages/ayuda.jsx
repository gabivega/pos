import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Ayuda = () => {
const navigate = useNavigate()
const user = useSelector(state => state.user)
  return (
    <div className="flex flex-col h-screen p-6">
     {user? <div><h1 className='text-3xl text-black'>ayuda</h1></div> : navigate('/login')}
    </div>
  );
};

export default Ayuda