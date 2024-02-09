import { Box, Typography, useTheme } from "@mui/material";

const Header = ({title,subtitle,isProfile="false"}) => {
  const theme =useTheme();
  return (
    <div>
      <Box mb={isProfile == "false"? 3 : null}>
        <Typography variant="h5" sx={{color: theme.palette.info.light ,fontWeightc:"bold" ,fontFamily: "Comic Sans MS"}} >{title}</Typography>
        <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161"}}>Welcome to {subtitle}</Typography>
      </Box>
    </div>
  );
}

export default Header;
