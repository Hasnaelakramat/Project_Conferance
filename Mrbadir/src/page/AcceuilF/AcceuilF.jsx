import Job from '../Acceuil/job';
import Search1 from '../Acceuil/Search1';
import { Typography, useTheme } from "@mui/material";

import Element from "../Acceuil/element"

const AcceuilF = () => {
  const theme = useTheme()
  return (
    <div>


      <Search1 />
      <div className="container">
        <div className="d-flex justify-content-center mt-4">
          <div className="col-12 " >
            <Typography variant="h5" sx={{ marginTop: "12px", fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>Start your job !</Typography>
          </div>
        </div>
      </div>

      <Job/>

      <div className="container">
        <div className="d-flex justify-content-center mt-4">
          <div className="col-12 " >
            <Typography variant="h5" sx={{ marginTop: "12px", fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>How does it work ?</Typography>
          </div>
        </div>
      </div>


      <Element />







    </div>
  );
}

export default AcceuilF;
