import Header from '../../compo/Header';
import List from "./listediplomes";
import ListByCategory from "./listeByCategory";
import { Box ,Stack} from "@mui/material";
import Header1 from '../../compo/Headers1';
import Category from './Category';

const Proposition = () => {
  return (
    <div>
      
       <Header title={"CITY CONFERENCES"} subtitle={"Here are the conferences scheduled in your city"}/>
    
    
      <Box sx={{ marginTop:7}}>
      <List/>
      </Box>
      <Box sx={{ marginTop:"-10px"}}>
      <Stack sx={{ gap: 99}} direction={"row"}>
      <Header1 title={"ALL CONFERENCES"} />
        <Category/>  

       </Stack>
      </Box>
      <Box >
      
      <ListByCategory/>
      </Box>
      
    </div>
  );
}

export default Proposition;
