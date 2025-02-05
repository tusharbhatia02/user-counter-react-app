import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [isDirty, setIsDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setIsDirty(true);
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: Date.now().toString(), ...formData };

    let users = JSON.parse(localStorage.getItem('userData') || '[]');
    users.push(user);
    localStorage.setItem('userData', JSON.stringify(users));
    setIsDirty(false);
    setSaved(true);
    setFormData({ name: '', address: '', email: '', phone: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">User Data Form</Typography>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Address" name="address" value={formData.address} onChange={handleChange} required />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" />
      <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {saved && <Typography color="primary">Data saved successfully!</Typography>}
    </Box>
  );
}

export default UserForm;