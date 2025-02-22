import { ListItem, Box, ListItemText, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Skill({skillName, user, currentHours, goalHours, BACKEND_URL}){
    const [currentHourValue, setCurrentHourValue] = useState(currentHours);

    async function increment(incrementValue){ 
        try{
            console.log(BACKEND_URL + "/skills");
            const data = {
                user: user,
                skillName: skillName,
                increment: incrementValue
            };
            console.log(BACKEND_URL + "/skills");

            fetch( BACKEND_URL + "/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            
            setCurrentHourValue(current => current + incrementValue);
        }
        catch(err){
            console.error("Failoure incrementing skill: "  + err);
        }
    }

    async function deleteSkill(){

    }

    return(
        <ListItem sx={{boxShadow: 3, borderRadius: "0.8rem", mt: "0.8rem"}}>
            <ListItemText>{skillName}</ListItemText>
            
            <Box>
                {currentHourValue} / {goalHours}
                <Button variant="contained" sx={{backgroundColor: "#edaaa8", ml: "0.4rem"}} onClick={() => {increment(-1)}}>-</Button>
                <Button variant="contained" sx={{backgroundColor: "#b1f2c7", ml: "0.4rem"}} onClick={() => {increment(1)}}>+</Button>
            </Box>
        </ListItem>
    );
}

export default Skill;