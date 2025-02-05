// Signup.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard');
    } else {
      setError('Please provide email and password.');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('token', credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify({
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture
    }));
    navigate('/dashboard');
  };

  const handleGoogleError = () => {
    setError('Google sign up was unsuccessful.');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}
    >
      <Typography variant="h4">Signup</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <TextField 
        label="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <TextField 
        label="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <Button type="submit" variant="contained">
        Signup
      </Button>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
      </Box>
    </Box>
  );
}

export default Signup;