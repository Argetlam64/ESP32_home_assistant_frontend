import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, mergeSlotProps } from "@mui/material";
import capitaliseFirst from "../functions";

const MyForm = ({ setTasks, users, BACKEND_URL, categories, currentUser}) => {
    const marginTopValue = "0.8rem";
    let numbers = [];
    for(let i = 1; i < 10; i++){
        numbers.push(i);
    }

    const [points, setPoints] = useState(numbers[0]);
    const [user, setUser] = useState(users[0]);
    const [taskName, setTaskName] = useState("");
    const [category, setCategory] = useState("daily");

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const jsonData = {user: user, taskName: taskName, points: points, finished: false, category: category};//makes an object to send to database and stuff

            await fetch(BACKEND_URL + "/tasks", {//sends data to backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(jsonData),
            })
            
            //resets data in the form
            setPoints(1);
            setTaskName("");

            //get new data
        
            const response = await fetch(`${BACKEND_URL}/tasks?user=${currentUser}`);
            const responseJson = await response.json();
            console.log(responseJson);
            setTasks(responseJson);
        }
        catch(err){
            alert("Unable to fetch data from the server...");
            console.error(err);
        }  
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{boxShadow: 4, borderRadius: "10px", mt: "2rem", p: "1.2rem", backgroundColor: "white"}}>
                <Typography variant="h5" align="center">Make a new task</Typography>

                <form onSubmit={async (e) => {await handleSubmit(e)}}>
                <Typography style={{marginTop: marginTopValue}}>Task name:</Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Input Task Name"
                    fullWidth
                    value={taskName}
                    onChange={({target}) => setTaskName(target.value)}
                />

                <Typography style={{marginTop: marginTopValue}}>User:</Typography>
                <Select label="User" fullWidth value={user} onChange={({target}) => setUser(target.value)}>
                    {users.map(currentUser => {
                        return <MenuItem value={currentUser} key={currentUser}>{currentUser}</MenuItem>
                    })}
                </Select>

                <Typography style={{marginTop: marginTopValue}}>Points:</Typography>
                <Select label="User" fullWidth value={points} onChange={({target}) => setPoints(target.value)}>
                    {numbers.map(num => <MenuItem value={num} key={num}>{num}</MenuItem>)}
                </Select>
                
                <Typography style={{marginTop: marginTopValue}}>Category:</Typography>
                <Select value={category} fullWidth onChange={({target}) => setCategory(target.value)}>
                    {categories.map(item =>{ 
                            if(item.name != "all"){
                                return( <MenuItem value={item.name} key={"cat-" + item.name}>{capitaliseFirst(item.name)}</MenuItem>)
                            }
                        })}
                </Select>

                <Button type="submit" variant="contained" style={{marginTop: marginTopValue}}>Add Task</Button>
                </form>
            </Box>  
        </Container>
  );
};

export default MyForm;
