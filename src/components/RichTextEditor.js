import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Typography, Box } from '@mui/material';

function RichTextEditor() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('userData') || '[]');
    if (users.length) {
      const latestUser = users[users.length - 1];
      const formattedContent = `
        <h2>User Profile</h2>
        <p><strong>ID:</strong> ${latestUser.id}</p>
        <p><strong>Name:</strong> ${latestUser.name}</p>
        <p><strong>Address:</strong> ${latestUser.address}</p>
        <p><strong>Email:</strong> ${latestUser.email}</p>
        <p><strong>Phone:</strong> ${latestUser.phone}</p>
      `;
      setContent(formattedContent);
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent'
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile Rich Text Editor
      </Typography>
      <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} theme="snow" />
    </Box>
  );
}

export default RichTextEditor;