import { ListItem, Box, ListItemText, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

function Skill({skillName, user, currentHours, goalHours, BACKEND_URL, setData, archived}){
    const [currentHourValue, setCurrentHourValue] = useState(currentHours);
    const [percentage, setPercentage] = useState((currentHourValue / goalHours) * 100);

    //Menu opening logic
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function increment(incrementValue){ 
        try{
            //console.log(BACKEND_URL + "/skills");
            const data = {
                user: user,
                skillName: skillName,
                increment: incrementValue
            };

            if(currentHourValue <= 0 && incrementValue <= 0){
                return;
            }
            fetch( BACKEND_URL + "/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            
            setCurrentHourValue(current => {
                const newValue = current + incrementValue;
                setPercentage((newValue / goalHours) * 100);
                return newValue;
            });
            
        }
        catch(err){
            console.error("Failoure incrementing skill: "  + err);
        }
    }

    async function handleArchive(){
        try{
            const data = {
                user,
                skillName,
                archived: !archived
            }
            await fetch( BACKEND_URL + "/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const response = await fetch(BACKEND_URL + "/skills?user=" + user);
            const responseJson = await response.json();
            setData(responseJson);
        }
        catch(err){
            console.error("Failoure archiving a skill: " + err);
        }
    }

    async function handleDelete(){
        const response = await fetch(`${BACKEND_URL}/skills?user=${user}&skillName=${skillName}&currentHours=${currentHourValue}`, {method: "DELETE"});
        console.log(response);
        if(response.statusText == "OK"){
            setData(prev => {//delete item from current items
                return prev.filter(item => (item.skillName != skillName || item.currentHours != currentHours));
            })
        }
        else{
            console.log("Deletion failed");
        }
    }



    return(
        <ListItem sx={{boxShadow: 3, borderRadius: "0.8rem", mt: "0.8rem", background: `linear-gradient(to right, #b1f2c7 ${percentage}%, #edaaa8 ${percentage}%)`}}>
            <ListItemText>{skillName}</ListItemText>
            
            <Box>
                {currentHourValue} / {goalHours}
                <Button 
                    variant="contained" 
                    sx={{backgroundColor: "#3cd0dc", ml: "0.4rem"}} 
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick} id="settings-button"
                >
                    <SettingsIcon/>
                </Button>

                <Menu 
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{'aria-labelledby': 'settings-button',}}
                >
                    <MenuItem onClick={handleClose}>Edit values</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete skill</MenuItem>
                    <MenuItem onClick={handleArchive}>{archived ? "Move to active" : "Archive skill"}</MenuItem>
                </Menu>
                <Button variant="contained" sx={{backgroundColor: "#b1f2c7", ml: "0.4rem"}} onClick={() => {increment(1)}}>+</Button>
            </Box>
        </ListItem>
    );
}

export default Skill;