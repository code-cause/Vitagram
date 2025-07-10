// src/pages/LoginPage.jsx
import {useEffect} from 'react';
import Login from '../components/auth/Login.jsx';
import {instance} from '../services/Api.js';

const LoginPage = () => {
useEffect(()=>{
instance.get('/auth/zuku').then((res)=>
console.log(res.data)).catch((err)=>
console.log(err)) 
},[])

  const handleLogin = (credentials) => {
    console.log('Login data:', credentials);
    // Add API call here
  };

  return (
    <div>
      <Login onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
