import Tasks from "./components/tasks";
import NavBar from "./components/navbar";
import Hours from "./components/hours";
import Tracking from "./components/tracking";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

function App() {
    //const BACKEND_URL = "http://192.168.1.100:8080";
    const BACKEND_URL = "http://localhost:8080";    

    
    const users = ["Maj", "Masa"]
    
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    

    const tasksJSX = <Tasks users={users} BACKEND_URL={BACKEND_URL}/>;
    const hoursJSX = <Hours users={users} BACKEND_URL={BACKEND_URL}/>;
    const trackingJSX = <Tracking/>;
    const pageArray = [hoursJSX, tasksJSX, trackingJSX];//order of pages

    const [currentPageJsx, setCurrentPageJsx] = useState(tasksJSX);

    

    useEffect(() => {//update the page
        setCurrentPageJsx(pageArray[currentPageIndex]);
    }, [currentPageIndex])

    return (
        <Box sx={{backgroundColor: "#d9edfc", pb: "2rem"}}>
            <NavBar currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex}/>
            {currentPageJsx}
        </Box>
    );
}

export default App;
