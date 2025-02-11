import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getByEmailAndPassword } from '../api/user';
import { AppContext } from '../api/AppContext';

export default function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {user, setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      alert('Please fill missing field');
      return;
    }
    const res = await getByEmailAndPassword({email, password});
    if (res.data != null) {
      setUser(() => res.data);
      navigate('/chat');
    }else{
      alert('Login failed');
    }
  }


  return (
    <div className='login_registation'>
        <form action="">
            <h1>Login</h1>
            <label htmlFor="" >Email</label>
            <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} />
            <label htmlFor="">If you don't have account ? <Link to={'/registration'}>Registration</Link></label>
            <button onClick={(e)=>login(e)}>Sign in</button>
        </form>
    </div>
  )
}
