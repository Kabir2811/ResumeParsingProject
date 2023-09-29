import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams, Navigate } from 'react-router-dom';

function JDForm() {
    const { idn } = useParams();
    const [formData, setFormData] = useState({
        gender: '',
        knownLanguages: '',
        skills: '',
    });
    // eslint-disable-next-line
    const [isSaved, setIsSaved] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/jd/data/${idn}`)
            .then((response) => {
                const studentData = response.data;
                setFormData(studentData);
            })
            .catch((error) => {
                console.error('Error fetching JD data:', error);
            });
    }, [idn]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        axios
            .post(`http://localhost:8080/jd/add`, formData)
            .then((response) => {
                console.log('JD data updated:', response.data);
                alert('Data uploaded successfully....');
                setIsSaved(true);
                setShouldNavigate(true);
            })
            .catch((error) => {
                console.error('Error updating JD data:', error);
            });
    };

    if (shouldNavigate) {
        return <Navigate to="/" replace />;
    }
    const styles = `
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f0f0f0;
    }

    .form {
      width: 80%;
      max-width: 100vw;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: white;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
      color: #333;
    }

    .input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 14px;
    }

    .submit-button {
      margin-top: 20px;
      padding: 10px 20px;
      background: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
    }
  `;

    return (
        <div className="form-container">
            <h2>Edit JD Data</h2>
            <form className="form">

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="knownLanguages">Known Languages:</label>
                    <input
                        type="text"
                        id="knownLanguages"
                        name="knownLanguages"
                        value={formData.knownLanguages || ''}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skills">Skills:</label>
                    <textarea
                        id="skills"
                        name="skills"
                        value={formData.skills ? formData.skills.replace(/\[|\]/g, '').split(', ').join(', ') : ''}
                        onChange={handleChange}
                        className="input"
                        rows="4"
                    />
                </div>
                <button type="button" onClick={handleSave} className="submit-button">
                    Save
                </button>
            </form>
            <style>
                {styles}
            </style>
        </div>
    );
}

export default JDForm;
