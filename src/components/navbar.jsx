import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import AddchartRoundedIcon from '@mui/icons-material/AddchartRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';

function NavBar({currentPageIndex, setCurrentPageIndex}){

    return(
        <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={currentPageIndex}
          onChange={(event, newValue) => {
            setCurrentPageIndex(newValue);
          }}
        >
          <BottomNavigationAction label="Hours" icon={<AlarmRoundedIcon/>} />
          <BottomNavigationAction label="Tasks" icon={<ChecklistRoundedIcon/>} />
          <BottomNavigationAction label="Tracking" icon={<AddchartRoundedIcon />} />
          <BottomNavigationAction label="Calendar" icon={<CalendarMonthIcon />} />
        </BottomNavigation>
      </Box>
    );
}


export default NavBar;