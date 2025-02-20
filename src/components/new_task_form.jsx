import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, mergeSlotProps } from "@mui/material";

const MyForm = ({tasks, setTasks, users, BACKEND_URL}) => {
    const marginTopValue = "0.8rem";
    let numbers = [];
    for(let i = 1; i < 10; i++){
        numbers.push(i);
    }

    const [points, setPoints] = useState(numbers[0]);
    const [user, setUser] = useState(users[0]);
    const [taskName, setTaskName] = useState("");
    

    function handleTaskName({target}){
        setTaskName(target.value);
    }

    function handleUserChange({target}){
        setUser(target.value);
    }

    function handlePointsChange({target}){
        setPoints(target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();

        const jsonData = {user: user, taskName: taskName, points: points, finished: false};//makes an object to send to database and stuff

        fetch(BACKEND_URL + "/tasks", {//sends data to backend
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
            },
              body: JSON.stringify(jsonData),
          })


        setTasks(prev => {//adds the task to the current frontend
            return [ ...prev, jsonData]
        })
        //resets data in the form
        setPoints(1);
        setTaskName("");
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{boxShadow: 4, borderRadius: "10px", mt: "2rem", p: "1.2rem" ,backgroundColor: "white"}}>
                <Typography variant="h5" align="center">Make a new task</Typography>

                <form onSubmit={handleSubmit}>
                <Typography style={{marginTop: marginTopValue}}>Task name:</Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Input Task Name"
                    fullWidth
                    value={taskName}
                    onChange={handleTaskName}
                />

                <Typography style={{marginTop: marginTopValue}}>User:</Typography>
                <Select label="User" fullWidth value={user} onChange={handleUserChange}>
                    {users.map(currentUser => {
                        return <MenuItem value={currentUser} key={currentUser}>{currentUser}</MenuItem>
                    })}
                </Select>

                <Typography style={{marginTop: marginTopValue}}>Points:</Typography>
                <Select label="User" fullWidth value={points} onChange={handlePointsChange}>
                    {numbers.map(num => <MenuItem value={num} key={num}>{num}</MenuItem>)}
                </Select>

                <Button type="submit" variant="contained" style={{marginTop: marginTopValue}}>Add Task</Button>
                </form>
            </Box>  
        </Container>
  );
};

export default MyForm;
