import { Paper, Typography, Box, Stack, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let hours = [];
for(let i = 1; i <= 24; i++){
    hours.push(i);
}
const callendarSize = 1;
const stackSpacing = 0.5; 
const gridSpacing = 0.7;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),     
}));


function CallendarCells(){
    return(
        <Box sx={{flexGrow: 1, p: "1rem"}} >
            {/**Days on top */}
            <Grid container spacing={gridSpacing} columns={8}>
                <Grid size={callendarSize}><Item>Time</Item></Grid>
                {days.map(day => <Grid size={callendarSize}><Item>{day.substring(0, 3)}</Item></Grid>)}
            </Grid>

            <Grid container spacing={gridSpacing} sx={{ mt: "0.8rem"}} direction={"row"} columns={8}>
                {/**Hours on the left */}
                <Grid size={callendarSize}>
                    <Stack spacing={stackSpacing}>
                        {hours.map(hour =><Item>{hour}:00</Item>)}
                    </Stack>
                </Grid>
                {/**Middle field */}
                {days.map( day =>
                    <Grid size={callendarSize}>
                        <Stack spacing={stackSpacing}>{hours.map(hour => <Item>-</Item>)}</Stack>
                </Grid>)}
            </Grid>
        </Box>
    )
}

export default CallendarCells;