import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState([]); // Array for holding multiple files
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sanitizeFileName = (fileName) => {
    // Replace any character that is not alphanumeric, dash, or underscore with an underscore
    return fileName.replace(/[^a-zA-Z0-9-_\.]/g, '_');
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files).map(file => {
      const sanitizedFileName = sanitizeFileName(file.name); // applying sanitization to every file via mapping
      return new File([file], sanitizedFileName, { type: file.type });
    });

    setFiles(fileList); // Store the array of files
    setUploadStatus('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.length) {
      setErrorMessage('Please select file(s) to upload.');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file); // Adjust 'files' to match your backend, might need to be 'file[]' or similar
    });

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(`File upload successful. Uploaded ${files.length} files.`);
      console.log('File upload successful', response.data);
      setFiles([]); // Clear files after upload
    } catch (error) {
      setErrorMessage('File upload failed. Please try again.');
      console.error('File upload error', error.response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} multiple /> {/* Added the multiple attribute */}
        <button type="submit">Upload Files</button> {/* Changed to plural */}
      </form>
      {uploadStatus && <div style={{ color: 'green', marginTop: '10px' }}>{uploadStatus}</div>}
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </div>
  );
};

export default FileUpload;
