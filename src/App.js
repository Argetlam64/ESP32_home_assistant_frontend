import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Hours from "./components/skills/hours";
import NavBar from "./components/navbar";
import Tasks from "./components/tasks/tasks";
import Tracking from "./components/tracking";
import Calendar from "./components/calendar/calendar";

function App() {
    //const BACKEND_URL = "http://146.212.169.241:8080"; //public
    const BACKEND_URL = "http://localhost:8080";    
    
    
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({});
    const [pageArray, setPageArray] = useState([]);
    const [currentPageJsx, setCurrentPageJsx] = useState(<></>);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    //get users on load
    useEffect(() => {
        async function getUsers(){
            const response = await fetch(`${BACKEND_URL}/users`);
            const responseJson = await response.json();
            setUsers(responseJson.map(item => item.name));
            responseJson.forEach(item => {
                setUserData(prev => ({
                    ...prev,
                    [item.name]: {
                        points: item.points,
                        hours: item.hours
                    }
                }))
            })
            
        }   
        getUsers();
        
    }, []);
    
    //update page data when users update (otherwise you do not see users)
    useEffect(() => {
        const tasksJSX = <Tasks users={users} BACKEND_URL={BACKEND_URL} userData={userData} setUserData={setUserData}/>;
        const hoursJSX = <Hours users={users} BACKEND_URL={BACKEND_URL}/>;
        const trackingJSX = <Tracking/>;
        const callendarJSX = <Calendar/>;
        setPageArray([hoursJSX, tasksJSX, trackingJSX, callendarJSX]);
        setCurrentPageJsx(tasksJSX);
    }, [users])

    useEffect(() => {//update the page
        setCurrentPageJsx(pageArray[currentPageIndex]);
    }, [currentPageIndex]);

    return (
        <Box sx={{backgroundColor: "#d9edfc", pb: "2rem"}}>
            <NavBar currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex}/>
            {currentPageJsx}
        </Box>
    );
}

export default App;
