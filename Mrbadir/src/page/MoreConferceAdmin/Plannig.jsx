import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Planning = ({ categorie, langue, planning }) => {

  

  return (
    

    
    <Card sx={{ maxWidth: 300, boxShadow: "0px 0px 11px rgba(0, 0, 0, 0.2)", borderRadius: "10px",maxHeight:410 }}>

    <CardMedia component="img" height="250" image="https://thumb.ac-illust.com/a2/a2eb80ff08a23b6f4c828da0b0d74f5e_t.jpeg" alt="green iguana" />
    <CardContent>
      <Typography variant="body" sx={{ flex: 1, fontFamily: "Comic Sans MS" }}>
      
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
      Planning 
    
    
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
    
      Categorie : {categorie}
    
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
    
      Language :  {langue}
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
  
  
  <a
        href={planning }
        download="Planning-PDF-document"
        target="_blank"
        rel="noreferrer"
      >
       <Button size="small">View File </Button>
      </a>
    </CardActions>
    
  </Card>
  
  );
}

export default Planning;

