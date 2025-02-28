import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, mergeSlotProps } from "@mui/material";

function AddSkillForm({users, BACKEND_URL}){
    const [skillName, setSkillName] = useState("");
    const [goalHours, setGoalHours] = useState(20);
    const [user, setUser] = useState(users[0]);
    const marginTopValue = "0.8rem";

    function handleSubmit(e){
        e.preventDefault();
        const data = {
            skillName,
            goalHours,
            user,
            currentHours: 0
        }
        
        console.log(`User: ${data.user}, skill: ${data.skillName} for ${data.goalHours} hours on ${BACKEND_URL + "/skills"}`);
        
        fetch(BACKEND_URL + "/skills", {//sends data to backend
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });
    }

    return(
        <Container>
            <Box sx={{ boxShadow:4, borderRadius: "10px", p: "1rem", backgroundColor: "white", mt: "1rem"}}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5">Add a new skill</Typography>

                    <Typography style={{marginTop: marginTopValue}}>Skill name:</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Input Skill Name"
                        fullWidth
                        value={skillName}
                        onChange={({target}) => {setSkillName(target.value);}}
                    />

                    <Typography style={{marginTop: marginTopValue}}>Goal hours:</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Input Number of hours:"
                        fullWidth
                        value={goalHours}
                        onChange={({target}) => {
                            const data = target.value;
                            if(data === ""){
                                setGoalHours("");
                            }
                            else if(!isNaN(data)){
                                const intData = parseInt(data);
                                if(intData > 0){
                                    setGoalHours(intData);
                                }
                            }
                        }}
                    />

                    <Typography style={{marginTop: marginTopValue}}>User:</Typography>
                    <Select label="User" fullWidth value={user} onChange={({target}) => {setUser(target.value)}}>
                        {users.map(currentUser => {
                            return <MenuItem value={currentUser} key={currentUser}>{currentUser}</MenuItem>
                        })}
                    </Select>

                    <Button type="submit" variant="contained" sx={{mt: "1rem"}}>Add a skill</Button>
                </form>
            </Box>
        </Container>
    );
}

export default AddSkillForm;