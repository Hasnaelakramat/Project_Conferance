import { Box, Typography, useTheme } from "@mui/material";

const Header1 = ({title,isProfile="false"}) => {
  const theme =useTheme();
  return (
    <div>
      <Box mb={isProfile == "false"? 3 : null}>
        <Typography variant="h5" sx={{color: theme.palette.info.light ,fontWeightc:"bold" ,fontFamily: "Comic Sans MS"}} >{title}</Typography>
        
      </Box>
    </div>
  );
}

export default Header1;
