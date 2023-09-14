import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import StudentForm from './components/StudentForm';
import Appbar from './components/Appbar';
import ResumeList from './components/ResumeList';

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route
          path="/student-form/:idn"
          element={
            <StudentForm />
          }
        />
      
      
      <Route path="/resume-list" element={<ResumeList />}/>
            
          
      </Routes>
      
    </>
  );
}

export default App;
