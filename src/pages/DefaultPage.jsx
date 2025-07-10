import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Default from '../components/auth/Default';

const DefaultPage = () => {


  const handleLogin = (credentials) => {
    console.log('Login data:', credentials);
    // Add API call here
  };

  return (
    <div>
      <Default onSubmit={handleLogin} />
    </div>
  );
};


export default DefaultPage;