import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import StudentForm from './components/StudentForm';
import Appbar from './components/Appbar';

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route
          path="/student-form/:id"
          element={
            <StudentForm />
          }
        />
      </Routes>
    </>
  );
}

export default App;
