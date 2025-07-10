// src/pages/SignupPage.jsx
import React from 'react';
import Signup from '../components/auth/Signup';

const SignupPage = () => {
  const handleSignup = (data) => {
    console.log('Signup data:', data);
    // Add API call here
  };

  return (
    <div>
      <Signup onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
