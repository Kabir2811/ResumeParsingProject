import React , { useState , useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Student() {
    const[name,setName] = useState("")
    const[address,setAddress] = useState("")
    const handleClick=(e)=>{
        e.preventDefault()
        const student = {name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)}).then(()=>{
            console.log("New Student Added...")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/show")
        .then(res => res.json())
        .then((result) => {
            setStudents(result);
        });
    }, []);
    
  return (
    
    <Box
      sx={{
        display: "flex",
        justifyContent: 'center', // Center the container horizontally
        alignItems: 'baseline', // Center the container vertically
        height: '100vh', // Set the height to fill the viewport
      }}
    >
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '60%' },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(e)=>setName(e.target.value)} />
          <TextField id="standard-basic" label="Address" variant="standard" value={address} onChange={(e)=>setAddress(e.target.value)} />
          <Button variant="contained" onClick={handleClick}>Submit</Button>
        </Box>
        
      </Paper>
    </Box>
    
  );
}

