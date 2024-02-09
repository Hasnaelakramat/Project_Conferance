import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Cv = ( {cvData}) => {
 
  const openPdfFile = () => {
    console.log(cvData);
    if (cvData) {
      return (
        <div className = "App">
          <a href = {cvData} target = "_blank">Download Pdf</a>
        </div>
    );
    }
    // if (cvData) {
    //   return (
    //     <iframe title="Document PDF" src={cvData} width="600" height="400"></iframe>
    //   );
    // } else {
    //   console.error("L'URL du fichier PDF n'est pas disponible.");
    // }
  };

  return (
    

    
    <Card sx={{ maxWidth: 300, boxShadow: "0px 0px 11px rgba(0, 0, 0, 0.2)", borderRadius: "10px",maxHeight:350 }}>

    <CardMedia component="img" height="250" image="https://thumb.ac-illust.com/a2/a2eb80ff08a23b6f4c828da0b0d74f5e_t.jpeg" alt="green iguana" />
    <CardContent>
      <Typography variant="body" sx={{ flex: 1, fontFamily: "Comic Sans MS" }}>
      
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
      CV Professionnel
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
{/*   
  <Button size="small" onClick={openPdfFile}>View File </Button> */}
  <a
        href={cvData}
        download="CV-PDF-document"
        target="_blank"
        rel="noreferrer"
      >
       <Button size="small">View File </Button>
      </a>
    </CardActions>

  </Card>
  
  );
}

export default Cv;

