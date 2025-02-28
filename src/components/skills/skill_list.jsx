import Skill from "./skill";
import { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, List } from "@mui/material";

function SkillList({users, BACKEND_URL}){
    const [data, setData] = useState([]);
    const [user, setUser] = useState(users[0]);
    const [archived, setArchived] = useState(false);

    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch(BACKEND_URL + "/skills?user=" + user);
                const responseJson = await response.json();
                //console.log(responseJson);
                setData(responseJson);
            }
            catch(err){
                console.error("Failed fetching skills data, error: " + err);
            }
        }

        getData();
    }, [user]);

    return(
        <Container>
            <Box sx={{ boxShadow:4, borderRadius: "10px", p: "1rem", backgroundColor: "white", mt: "1rem"}}>

                <Select label="User" value={user} onChange={({target}) => {setUser(target.value)}}>
                    {users.map(currentUser => {
                        return <MenuItem value={currentUser} key={currentUser}>{currentUser}</MenuItem>
                    })}
                </Select>

                <Select 
                    label="Archived"    
                    value={archived ? "Archived" : "Current"} 
                    onChange={({target}) => target.value == "Archived" ? setArchived(true) : setArchived(false)}
                >
                    <MenuItem value={"Archived"} key={"archivedActive"}>Archived</MenuItem>
                    <MenuItem value={"Current"} key={"currentActive"}>Current</MenuItem>
                </Select>

                <List>
                    {data.map((item, id) => {
                        if(item.archived === archived){
                            return <Skill 
                                skillName={item.skillName} 
                                user={item.user} 
                                goalHours={item.goalHours} 
                                currentHours={item.currentHours} 
                                key={"skillItem" + id}
                                BACKEND_URL={BACKEND_URL}
                                setData={setData}
                                archived={item.archived}
                            />
                        }
                    })}
                </List>
            </Box>
        </Container>
    );
}

export default SkillList;