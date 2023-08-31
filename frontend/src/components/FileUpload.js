import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('resumeFile', selectedFile);

            try {
                const response = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data); // Handle the response from the backend
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default FileUpload;
