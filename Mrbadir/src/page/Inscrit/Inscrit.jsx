import Header from '../../compo/Header';
import List from "./listediplomes";
import { Box } from "@mui/material";

const Inscrit = () => {
  return (
    <div>
    <Header title={"PROCHAINES CONFERENCES"} subtitle={"your futures conferences"} isProfile="true" />
    <Box sx={{ marginTop:7}}>
    <List/>
    </Box>
  
  </div>
  );
}

export default Inscrit;
