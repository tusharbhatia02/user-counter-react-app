import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Box, Typography } from '@mui/material';

// Get the Client ID from the environment variable
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    // Check if we received a token and profile data
    if (response.tokenId) {
      // Save the token and user name in localStorage
      localStorage.setItem('token', response.tokenId);
      if (response.profileObj?.name) {
        localStorage.setItem('userName', response.profileObj.name);
      }
      navigate('/dashboard');
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google SignIn error', response);
    // Optionally, display an error message here
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Login</Typography>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign In with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  );
}

export default Login;