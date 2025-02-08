import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registration } from '../api/user';
import { AppContext } from '../api/AppContext';

export default function RegisterPage() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const {user, setUser} = useContext(AppContext);
  
  const handle = async (e) => {
    e.preventDefault();
    if (!password || !email || !username) {
      alert('Please fill missing field');
      return;
    }
    const res = await registration({email, username, password});
    if (res.data != null) {
      setUser(() => res.data);
      navigate('/chat');
    }else{
      alert('email has already existed');
    }
  }
  return (
    <div className='login_registation'>
        <form action="">
            <h1>Register</h1>
            <label htmlFor="">Username</label>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <label htmlFor="">If you don't have account ? <Link to={'/'}>Login</Link></label>
            <button onClick={(e)=>handle(e)}>Register</button>
        </form>
    </div>
  )
}
