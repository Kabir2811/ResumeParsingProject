// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// function FileUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate(); // Get the navigate function from react-router-dom

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       return; // Prevent uploading without a selected file
//     }

//     const formData = new FormData();
//     formData.append('resumeFile', selectedFile);

//     axios.post('http://localhost:8080/student/parse-file', formData)
//       .then((response) => {
//         console.log('File uploaded:', response.data);
        
//         navigate('/student-form/'); // Redirect to the StudentForm component
//       })
//       .catch((error) => {
//         console.error('Error uploading file:', error);
//         // Optionally, show an error message to the user
//       });
//   };

//   return (
//     <div>
//       <h2>Upload Resume</h2>
//       <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
//       <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
//     </div>
//   );
// }

// export default FileUpload;

import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (!selectedFile) {
      return; // Prevent uploading without a selected file
    }

    const formData = new FormData();
    formData.append('resumeFile', selectedFile);

    axios
      .post('http://localhost:8080/student/parse-file', formData)
      .then((response) => {
        console.log('File uploaded:', response.data);
        const idn = response.data;

        navigate(`/student-form/${idn}`);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',

  };

  const dropzoneStyle = {
    width: '300px',
    height: '200px',
    borderWidth: '2px',
    borderColor: isDragActive ? 'green' : 'gray',
    borderStyle: 'dashed',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor:'gray'
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <h2>Upload Resume</h2>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} accept=".pdf,.doc,.docx" />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop a resume file here, or click to select one</p>
        )}
      </div>
      {selectedFile && (
        <p>Selected File: {selectedFile.name}</p>
      )}
      <button onClick={handleUpload} disabled={!selectedFile} style={buttonStyle}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;


