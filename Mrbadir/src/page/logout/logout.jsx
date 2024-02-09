
import { Box, Button,  Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const Logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('newimage');
    localStorage.removeItem('role');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('image');
    localStorage.removeItem('tele');
    localStorage.removeItem('ville');
    localStorage.removeItem('conferenceData');
    localStorage.removeItem('category');
  navigate('/'); 
        
    
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <Box sx={{ ml: 0, backgroundColor: localStorage.getItem("currentMode") === "dark" ? theme.palette.background.default : '#f5f5f5', borderRadius: "22px", height: "300px", width: "450px",border: "0.5px solid #ccc" }}>
        <Stack sx={{ gap: 3 }} direction="column">
          <Typography variant="h4" sx={{ marginTop: 10, fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main, ml: 1 }}> Are you sure you want to </Typography>
          <Typography variant="h4" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main, ml: 20 ,mt:-4}}>  sign out?</Typography>

      
          
              <Button sx={{ width: '250px', margin: "auto" ,mt:4}} variant="outlined"   type="submit" onClick={Logout}>
                Sign out
              </Button>
              
        
          
        </Stack>
      </Box>
    </div>
  );
}

export default Logout;
