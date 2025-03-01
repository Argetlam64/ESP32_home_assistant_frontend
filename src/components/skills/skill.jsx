import { ListItem, Box, ListItemText, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField } from "@mui/material";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';



function Skill({skillName, user, currentHours, goalHours, BACKEND_URL, setData, archived}){
    const [currentHourValue, setCurrentHourValue] = useState(currentHours);
    //For background
    const [percentage, setPercentage] = useState((currentHourValue / goalHours) * 100);
    //for opening dialog (edit value option in MenuOptions)
    const [popupOpen, setPopupOpen] = useState(false);
    //for editing values -> saves form data
    const [editName, setEditName] = useState(skillName);
    const [editHours, setEditHours] = useState(currentHourValue);
    const [editGoal, setEditGoal] = useState(goalHours);

    const [titleName, setTitleName] = useState(skillName);
    const [goalValue, setGoalValue] = useState(goalHours);


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
                setPercentage((newValue / goalValue) * 100);
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

    async function handleEdit(e){
        e.preventDefault();
        const data = {
            editName,
            editHours,
            editGoal,
            skillName,
            user
        }

        fetch( BACKEND_URL + "/skills/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        
        setTitleName(editName);
        setCurrentHourValue(editHours);
        setGoalValue(editGoal);
        setPercentage((editHours / editGoal) * 100);
    }



    return(
        <ListItem sx={{boxShadow: 3, borderRadius: "0.8rem", mt: "0.8rem", background: `linear-gradient(to right, #b1f2c7 ${percentage}%, #edaaa8 ${percentage}%)`}}>
            <ListItemText>{titleName}</ListItemText>
            
            <Box>
                {currentHourValue} / {goalValue}
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
                MenuListProps={{
                    'aria-labelledby': 'settings-button',
                    disableListWrap: true, // Prevents arrow key & letter-based selection
                    autoFocus: false, // Prevents auto-focusing items
                }}
                disableAutoFocusItem
            >
                <MenuItem onClick={() => setPopupOpen(true)}>•Edit values</MenuItem>
                <Dialog open={popupOpen} onClose={() => {setPopupOpen(false)}} disableAutoFocus disableEnforceFocus>
                    <DialogTitle>Edit skill</DialogTitle>
                    <form onSubmit={handleEdit}>

                        <Box sx={{pr: "1rem", pl: "1rem"}}> 
                            <Typography>Skill name:</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="Input Skill Name"
                                value={editName}
                                onChange={({target}) => {setEditName(target.value);}}
                                sx={{mt:"0.8rem", mb: "0.4rem"}}
                            />
                        </Box>

                        <Box sx={{pr: "1rem", pl: "1rem"}}>
                            <Typography>Goal hours:</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="Input number of hours:"
                                value={editGoal}
                                sx={{mt:"0.8rem", mb: "0.4rem"}}
                                onChange={({target}) => {
                                    const data = target.value;
                                    if(data === ""){
                                        setEditGoal("");
                                    }
                                    else if(!isNaN(data)){
                                        const intData = parseInt(data);
                                        if(intData >= 0){
                                            setEditGoal(data);
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{pr: "1rem", pl: "1rem"}}>
                            <Typography>Current hours:</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="Input number of hours:"
                                value={editHours}
                                sx={{mt:"0.8rem", mb: "0.4rem"}}
                                onChange={({target}) => {
                                    const data = target.value;
                                    if(data === ""){
                                        setEditHours("");
                                    }
                                    else if(!isNaN(data)){
                                        const intData = parseInt(data);
                                        if(intData >= 0){
                                            setEditHours(intData);
                                        }
                                    }
                                }}
                            />
                        </Box>

                    <DialogActions>
                    <Button onClick={() => setPopupOpen(false)}>Close</Button>
                        <Button onClick={() => {setPopupOpen(false); handleClose();}} type="submit">Finish</Button>
                    </DialogActions>
                    </form>
                    
                </Dialog>

                <MenuItem onClick={() => {handleArchive(); handleClose();}}>{archived ? "•Move to active" : "•Archive skill"}</MenuItem>

                <MenuItem onClick={() => {handleDelete(); handleClose();}}>•Delete skill</MenuItem>

            </Menu>

                <Button variant="contained" sx={{backgroundColor: "#b1f2c7", ml: "0.4rem"}} onClick={() => {increment(1)}}>+</Button>
            </Box>
        </ListItem>
    );
}

export default Skill;