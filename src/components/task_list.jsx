import React, { useState, useEffect } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Switch, IconButton, Select, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({tasks, setTasks, users, BACKEND_URL}){
    const [currentUser, setCurrentUser] = useState(users[0]);
    useEffect(() => {//get data from the backend to show it
        console.log("User changed to " + currentUser);
        async function getData(){
            try{
                const data = await fetch(`${BACKEND_URL}/tasks?user=${currentUser}`);
                const jsonData = await data.json();
                setTasks(jsonData);
            }
            catch(err){
                alert("Unable to fetch data from the server...");
                console.error(err);
            }
            
        }

        getData();//call the async function only when app is loaded  
    }, [currentUser])
    

    //updates the value, gets data back, sets everything again
    function handleChange(id){
        const updatedTask = { 
            user: tasks[id].user, 
            taskName: tasks[id].taskName, 
            finished: !tasks[id].finished 
        };
    
        fetch( BACKEND_URL + "/tasks", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        });
        
        setTasks(prev => {
            return prev.map((task, index) => id === index ? {...task, finished: !task.finished} : task);//changes the .finished data of the task on the current index
        });
    }

    //deletes the item from database
    function handleDelete(id){
        const taskNameDelete = tasks[id].taskName;
        const userDelete = tasks[id].user;
        fetch(`${BACKEND_URL}/tasks?taskName=${taskNameDelete}&user=${userDelete}`, {method: "DELETE"});
        setTasks(prev => {
            return prev.filter((item, index) => id != index)
        })
    }

    function handleUserChange({target}){    
        console.log(target.value);
        setCurrentUser(target.value);
    };

    return (
    <Container maxWidth="sm">
        
        <Box sx={{mt: "1rem", boxShadow: 3, p:"1rem", mb: "1.6rem", backgroundColor: "white", borderRadius: "10px"}}>
        <Typography variant="h4" style={{marginTop: "0.8rem"}}>Current tasks:</Typography>
        <Select value={currentUser} onChange={handleUserChange}>
            {users.map(user => <MenuItem value={user} key={user}>{user}</MenuItem>)}
        </Select>
            <List>
                {tasks.map((task, id) => {
                    const bgColor = task.finished ? "#b1f2c7" : "#edaaa8";
                    return(
                    <ListItem sx={{borderRadius: "0.8rem", boxShadow: 2, mt: "0.8rem", backgroundColor: bgColor}} key={`listItem-${id}`}>
                        <ListItemText primary={task.taskName} secondary={`${task.user}: ${task.points}`}></ListItemText>
                        <Box>
                            <IconButton aria-label="delete" onClick={() => handleDelete(id)}><DeleteIcon /></IconButton>
                            <Switch checked={task.finished} onChange={() => handleChange(id)}></Switch>
                        </Box>
                    </ListItem>);
                })}
            </List>
        </Box>
    </Container>
    );
}

export default TaskList;