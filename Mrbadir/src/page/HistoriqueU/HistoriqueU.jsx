import Header from '../../compo/Header';
import List from "./listediplomes";
import { Box } from "@mui/material";

const HistoriqueU = () => {
  return (
    <div>
      <Header title={"HISTORIQUE"} subtitle={"your historiques"} isProfile="true" />
      <Box sx={{ marginTop:7}}>
      <List/>
      </Box>
    
    </div>
  );
}

export default HistoriqueU;
