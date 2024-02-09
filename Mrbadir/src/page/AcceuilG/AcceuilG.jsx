import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link,  useNavigate } from 'react-router-dom';
import ACPbar from '../../compo/ACPbar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {listConferencep , listConferenceComming, getform1} from '../../services/ConferenceService';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MoreConferance from "../MoreConf/MoreConferance";
import {  Stack } from "@mui/material";


// export const  RecipeReviewCard = () => {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="/static/images/cards/paella.jpg"
//         alt="Paella dish"
//       />
      
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the mussels,
//           if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//       </CardActions>
//     </Card>
//   );

// }

export const AcceuilG = () => {
  const [rows, setRows] = useState([]);
  const [rowse, setRows2] = useState([]);

  useEffect(() => {
    // Effectue une requête GET pour récupérer les données de l'API
    
    listConferencep().then(response => {
        // Met à jour l'état avec les données récupérées depuis l'API
        setRows(response.data);
      })
     
      listConferenceComming().then(response => {
        // Met à jour l'état avec les données récupérées depuis l'API
        setRows2(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []); 
  const styleLieuVille = {
    width: '100px', // Remplacez par la largeur souhaitée pour le lieu
    height: '20px', // Remplacez par la hauteur souhaitée pour le lieu
    display: 'inline-block', // Pour que les éléments lieu et ville soient alignés horizontalement
    // Ajoutez d'autres styles au besoin
  };
const backgroundStyle = {
  position: 'absolute',
  top: '30px',
  left: 0,
  width: '100%',
  height: '90%',
  objectFit: 'cover',
  zIndex: -1,
};
const navigate = useNavigate();
const [anchorEl, setAnchorEl] = useState(null);

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

const handleDetailsClick = (id) => {
  navigate(`/InfoConfG/${id}`);
  handleMenuClose();
};

  return (
    <div>
      <ACPbar />
     
      <img
     src="src/assets/acceuilimage.PNG"
     alt="Image de fond floue"
     style={backgroundStyle}
   />  
<div style={{ textAlign: 'center' , marginLeft: '600px' , marginTop: '250px'}}>
  {/* <h2 style={{ color: '#168ce5', maxWidth: '600px' }}>
    Explorez notre plateforme pour découvrir des conférences scientifiques passionnantes et enrichissantes. Rejoignez-nous dans l'exploration du savoir et de l'innovation!!
  </h2> */}
   <Typography variant="h6" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}> Explorez notre plateforme pour découvrir des conférences  
   </Typography>
  <br />
  <Typography variant="h6" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}>  scientifiques passionnantes et enrichissantes.
  </Typography>
  <br />
  <Typography variant="h6" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}>  Rejoignez-nous dans l'exploration du savoir et de l'innovation!!
  </Typography>
  

  
  <div style={{marginTop: '50px'}}>
    <Link to="/Login" style={{ textDecoration: 'none', color: 'white'}}>
      <Button variant="contained">Rejoignez-nous</Button>
    </Link>
    </div>
</div>
<div style={{color: '#168ce5', marginLeft: '10px' , marginTop: '350px'}}>
<h2>Conférences de premier plan </h2>
</div>
<div style={{color: '#5f90a8', marginLeft: '10px' , marginTop: '10px'}}>
<p>Avancées scientifiques d'exception </p>
</div>
  <div style={{ display: 'flex', flexWrap: 'wrap' , marginTop: '50px', backgroundColor: '#e7f5fc', borderRadius: '10px'}}>
  {rows.map((row, index) => (
   
        <Card key={index} sx={{ maxWidth: 345, width: 300,height:350, margin: '16px' }}>
          <CardHeader
          
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <div>
      <IconButton aria-label="settings" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        key={row.id} 
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDetailsClick(row.id)}>Plus de détails</MenuItem>
      </Menu>
    </div>
            }
          //  title={row.title} // Remplacez 'row.title' par le champ approprié contenant le titre de la conférence
          //   subheader={`${new Date(row.date).toLocaleString('fr-FR', {
          //     year: 'numeric',
          //     month: 'long',
          //     day: 'numeric',
          //   })} ${row.lieu},${row.ville}`}// Remplacez 'row.date' par le champ approprié contenant la date de la conférence
          // />
          subheader={
            <div>
              {new Date(row.date).toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              
              <Typography variant="body2" color="text.secondary" style={{ maxWidth: '500px', height: '30px'}}>
                {row.lieu} , {row.ville}
              </Typography>
            </div>
          }
        />
          <CardMedia
            component="img"
            height="194"
            image={row.image} // Remplacez 'row.image' par le champ approprié contenant l'URL de l'image de la conférence
            alt="Image de la conférence"
            style={{ objectFit: 'cover', height: '150px' }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" style={{ height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {row.title} {/* Remplacez 'row.description' par le champ approprié contenant la description de la conférence */}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Orateur : {row.formateurName} {/* Remplacez 'row.description' par le champ approprié contenant la description de la conférence */}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
      <Box display="flex" alignItems="center" style={{ position: 'absolute'}}>
      <span>{row.numLikes}</span>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
    </Box>
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
        </Card>
      ))}
     </div>
     <div style={{color: '#168ce5', marginLeft: '10px' , marginTop: '50px'}}>
<h2>Rejoignez Nos Conférences Innovantes </h2>
</div>
<div style={{color: '#5f90a8', marginLeft: '10px' , marginTop: '10px'}}>
<p>Trouvez les conférences de l'année </p>
</div>

{/* ///////////////////////////////////////////////////////////////////////////////// */}
<div style={{ display: 'flex', flexWrap: 'wrap' , marginTop: '50px', backgroundColor: '#e7f5fc', borderRadius: '10px'}}>
  {rowse.map((row, index) => (
        <Card key={index} sx={{ maxWidth: 345,height: 350, width: 300, margin: '16px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <div>
      <IconButton aria-label="settings" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDetailsClick(row.id)}>Plus de détails</MenuItem>
      </Menu>
    </div>
            }
          //  title={row.title} // Remplacez 'row.title' par le champ approprié contenant le titre de la conférence
          subheader={
            <div>
              {new Date(row.date).toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              
              <Typography variant="body2" color="text.secondary" style={{ maxWidth: '500px', height: '30px'}}>
                {row.lieu} , {row.ville}
              </Typography>
            </div>
          }
          />
          <CardMedia
            component="img"
            height="194"
            image={row.image} // Remplacez 'row.image' par le champ approprié contenant l'URL de l'image de la conférence
            alt="Image de la conférence"
            style={{ objectFit: 'cover', height: '150px' }}
          />
          <CardContent>
          <Typography variant="body2" color="text.secondary" style={{ height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {row.title} {/* Remplacez 'row.description' par le champ approprié contenant la description de la conférence */}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Orateur : {row.formateurName} {/* Remplacez 'row.description' par le champ approprié contenant la description de la conférence */}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
      <Box display="flex" alignItems="center">
      <span>{row.numLikes}</span>
      <IconButton aria-label="add to favorites">
        <PeopleOutlineIcon />
      </IconButton>
      <Box mx={1}></Box>
{row.gratuit ? (
  <label style={{
    color: 'white',
    backgroundColor: 'green',
    padding: '4px 8px',
    borderRadius: '4px',
  }}>
    Gratuit !
  </label>
) : (
  <label style={{
    color: 'white',
    backgroundColor: '#611ed7',
    padding: '4px 8px',
    borderRadius: '4px',
  }}>Payant $</label>
)}
 <Box mx={1}></Box>
 <Link to={`/MoreConferance/${row.id}`}>
 <Button variant="contained" size="small" style={{ marginTop: '-5px' }}>
          Rejoindre
        </Button>
        </Link>
    </Box>
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
        </Card>
      ))}
     </div>
  </div>
  )
}
export default AcceuilG
