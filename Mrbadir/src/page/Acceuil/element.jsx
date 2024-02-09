import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LoyaltySharpIcon from '@mui/icons-material/LoyaltySharp';


export const Element = () => {
  const theme = useTheme();

  return (
    <Box >
      <Typography variant="h5" sx={{ marginTop: "12px", fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}></Typography>
      <Box sx={{ backgroundColor: localStorage.getItem("currentMode") === "dark" ? '#212121' : '#f5f5f5',borderRadius: "22px", height: "18vh" }} >
        <Stack divider={<Divider orientation="vertical" flexItem />} sx={{ margin: 3, gap: 6 }} direction={'row'} alignItems={"center"}>
          <Mybox icon={<StarsSharpIcon sx={{color: localStorage.getItem("currentMode") === "dark" ? '#1e88e5' : '#1565c0'}} fontSize="large" />} title={"Best choise"} subTitle={"An unrivaled selection of conferances for whatever you want"} />
          <Mybox icon={< AutoGraphIcon sx={{color: localStorage.getItem("currentMode") === "dark" ? '#1e88e5' : '#1565c0'}}  fontSize="large" />} title={"User reviews"} subTitle={"Decommendations and reviews from apowerful community"} />


          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 1, py: 1 }}>
            <EventAvailableOutlinedIcon sx={{color: localStorage.getItem("currentMode") === "dark" ? '#1e88e5' : '#1565c0'}}  fontSize="large" />
            <Box>
              <Typography sx={{ width: 170, fontFamily: "Comic Sans MS", color: localStorage.getItem("currentMode") === "dark" ? '#1e88e5' : '#1565c0' }} variant="body1">Easy participation</Typography>
              <Typography
                sx={{ fontWeight: 300, color: localStorage.getItem("currentMode") === "dark" ? '#bdbdbd' : '#616161' }}
                variant="body2"
                marginTop={"10px"}>free in Morroco !!!!!</Typography>
            </Box>

          </Box>

          <Mybox icon={<LoyaltySharpIcon sx={{color: localStorage.getItem("currentMode") === "dark" ? '#1e88e5' : '#1565c0'}}  fontSize="large" />} title={"Exclusive benefits"} subTitle={"Offers for many formateurs and lots of other benefits with our loyalty program"} />

        </Stack>

      </Box>
    </Box>
  );
}

export default Element;



const Mybox = ({ icon, title, subTitle }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 1, py: 1 }}>
      {icon}
      <Box>
        <Typography sx={{ fontFamily: "Comic Sans MS", color: localStorage.getItem("currentMode") === "dark" ? '#1e88e5' : '#1565c0' }} variant="body1">{title}</Typography>
        <Typography
          sx={{ fontWeight: 300, color: localStorage.getItem("currentMode") === "dark" ? '#bdbdbd' : '#616161' }}
          variant="body2"
          marginTop={"10px"}>{subTitle}</Typography>
      </Box>

    </Box>
  );
}




