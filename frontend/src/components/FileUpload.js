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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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

        // Assuming the server responds with the 'id' of the uploaded file
        const uploadedId = response.data.id; // Replace 'id' with the actual property name

        // Use the 'uploadedId' to navigate to the StudentForm component
        navigate(`/student-form/${uploadedId}`); // Use backticks for template string
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Optionally, show an error message to the user
      });
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
