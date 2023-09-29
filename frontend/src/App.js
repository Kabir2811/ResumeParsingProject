import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import StudentForm from './components/StudentForm';
import Appbar from './components/Appbar';
import ResumeList from './components/ResumeList';
import JDUpload from "./components/JDUpload";
import JDForm from "./components/JDForm";
import JDList from "./components/JDList";

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
          }/>
        <Route
            path="/jd-form/:idn"
            element={
                <JDForm />
            }
        />
          <Route path="/jdupload" element={<JDUpload/>}/>
      <Route path="/resume-list" element={<ResumeList />}/>
            <Route path="/jdlist" element={<JDList/>}/>
          
      </Routes>
      
    </>
  );
}

export default App;
