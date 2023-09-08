import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams } from 'react-router-dom';

function StudentForm() {
  const { idn } = useParams(); // Get the 'id' from the URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    maritalStatus: '',
    knownLanguages: '',
    skills: '',
  });
  
  // Fetch student data based on the 'id' from the URL
  useEffect(() => {
    axios
      .get(`http://localhost:8080/student/data/${idn}`) // Use ${idn} instead of {id}
      .then((response) => {
        const studentData = response.data;
        setFormData(studentData);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
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
    // Send a PUT request to update the student data in the database
    axios
      .post(`http://localhost:8080/student/add`, formData)
      .then((response) => {
        console.log('Student data updated:', response.data);
        // Optionally, you can redirect to another page or show a success message
      })
      .catch((error) => {
        console.error('Error updating student data:', error);
        // Optionally, you can show an error message to the user
      });
  };

  return (
    <div>
      <h2>Edit Student Data</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Marital Status:</label>
          <input
            type="text"
            name="maritalStatus"
            value={formData.maritalStatus || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Known Languages:</label>
          <input
            type="text"
            name="knownLanguages"
            value={formData.knownLanguages || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills || ''}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
