import {  useState } from "react";
import axios from "axios";
import './SignUp.css';
// import { FaUser} from "react-icons/fa";
// import { FaLock } from "react-icons/fa6";

// import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';

// import * as React from 'react';
import React, { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {sendformat } from '../../services/ConferenceService';
import ACPbar from '../../compo/ACPbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      ConferenceS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();
function Register() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [NonsuccessAlert, setNonSuccessAlert] = useState(false);
    const [nom, setUsername] = useState("");
    const [prenom, setUserprename] = useState("");
    const [ville, setUserville] = useState("");
    const [email, setUseremail] = useState("");
    const [motDePasse, setUserpass] = useState("");
    const [tele, setUserAge] = useState("");
    const [domaine, setUserspecl] = useState("");
    const navigate = useNavigate();
    // const [role, setRole] = useState("");
    // const [diplome1, setFile1] = useState(null);
    const [cv, setFile2] = useState(null);1
    const [image, setIm] = useState(null);
    async function save(event) {
        event.preventDefault();
        const formateur ={nom, prenom,email,motDePasse,tele,image,ville,domaine,cv};
        console.log(formateur);
        // try {
        //   sendformat(formateur).then((response) => {
        //     console.log(response.data);
        //   });

        //   setSuccessAlert(true);
        //   window.scrollTo({ top: 0, behavior: 'smooth' });
        //    new Promise(resolve => setTimeout(resolve, 2000));
         
        //   navigate('/Login');
       
        // } catch (err) {
        //   //alert(err);
        //   setNonSuccessAlert(true);
        //   window.scrollTo({ top: 0, behavior: 'smooth' });
        // }
        try {
          const response = await sendformat(formateur);
          console.log(response.data);
      
          setSuccessAlert(true);
          setNonSuccessAlert(false);
         
        } catch (err) {
          //alert(err);
          setSuccessAlert(false);
          setNonSuccessAlert(true);
          
         
        }
      }
      useEffect(() => {
        if (successAlert || NonsuccessAlert) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Si successAlert est true, alors afficher l'alerte
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }, [successAlert, NonsuccessAlert, navigate]);
    /////////solution autre//////
      const handleFileUpload = (event) => {
    //     // const file = event.target.files[0];
    //     const files = event.target.files;
    //     const filePath = URL.createObjectURL(files[0]);
    // if (files && files.length === 1) {
    //   setFile2(filePath);
      
    // } 
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFile2(reader.result); // Stocker l'image dans l'état local
    }
    };
    if (file) {
      reader.readAsDataURL(file); // Lecture du fichier image en tant que data URL
    }

  };
//   const handleImageUpload = (event) => {
//      const file = event.target.files[0];
//     const imPath = URL.createObjectURL(file);
//     setIm(imPath);
// };
// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onloadend = () => {
//     if (typeof reader.result === 'string') {
//       setIm(reader.result); // Stocker l'image dans l'état local
//   }
//   };
//   if (file) {
//     reader.readAsDataURL(file); // Lecture du fichier image en tant que data URL
//   }
// };
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
      setIm(reader.result); // Stocker l'image dans l'état local
  }
  };


  if (file) {
    reader.readAsDataURL(file); // Lecture du fichier image en tant que data URL
  }
};
        // const reader = new FileReader();
      
        // reader.onloadend = () => {
        //   const result = reader.result; // Récupère le résultat du lecteur de fichier
      
        //   if (typeof result === 'string') {
        //     setExperienceDoc(result); // Stocke l'URL de l'image dans le state
        //   } else {
        //     // Si ce n'est pas une chaîne de caractères, essayez de la convertir en chaîne
        //     setExperienceDoc(result.toString()); // Stocke l'URL de l'image dans le state
        //   }
        // };
      
        // if (file) {
        //   reader.readAsDataURL(file); // Convertit le fichier en URL
        // }
      
  return (
    <div>
       {successAlert && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
          <Alert severity="success">Votre inscription a été enregistrée avec succès !</Alert>
        </Stack>
      )}
       {NonsuccessAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Erreur ! Veuillez vérifier vos informations .</Alert>
        </Stack>
      )}
    <ACPbar />
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          S'inscrire
        </Typography>
        <Box component="form" noValidate onSubmit={save}  sx={{ mt: 3 }}>
        <Grid container spacing={2}>
       
            <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="nom"
                         name="nom"
                         required
                         fullWidth
                         id="nom"
                         label="Nom"
                         value={nom}
                         onChange={(event) => setUsername(event.target.value)}

          />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="role"
                         name="role"
                         required
                         fullWidth
                         id="role"
                         label="Role"
                         value={role}
                         onChange={(event) => setRole(event.target.value)}

          />
          </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="prenom"
                         name="prenom"
                         required
                         fullWidth
                         id="prenom"
                         label="Prenom"
                         value={prenom}
                         onChange={(event) => setUserprename(event.target.value)}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="tele"
                         name="tele"
                         required
                         fullWidth
                         id="tele"
                         label="TEL"
                         value={tele}
                         onChange={(event) => {
                           setUserAge(event.target.value);
                         }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="ville"
                         name="ville"
                         required
                         fullWidth
                         id="ville"
                         label="Ville"
                         value={ville}
                         onChange={(event) => {
                           setUserville(event.target.value);
                         }}/>
          </Grid>
          <Grid item xs={12} sm={6} >
              <TextField
                         autoComplete="doamine"
                         name="doamine"
                         required
                         fullWidth
                         id="doamine"
                         label="Domaine"
                         value={domaine}
                         onChange={(event) => {
                           setUserspecl(event.target.value);
                         }}/>

                         
          </Grid>
      
          {/* <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
  <label htmlFor="experiencedoc" className="custom-file-upload-button">
    <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />} // Icône d'upload
    >
      Télécharger votre image 
      <input
        type="file"
        id="Image"
        name="Image"
        accept=".png, .jpg"
        style={{ display: 'none' }} // Masquer le champ de fichier
        onChange={handleImageUpload}
        multiple 
      />
    </Button>
  </label>
  {Image && (
        <div>
          <h2>Image téléchargée :</h2>
          <img src={Image} alt="Image téléchargée" style={{ maxWidth: '100%' }} />
        </div>
      )}
</Grid> */}
{/* //////////// */}
<Grid item xs={12} sm={6}>
  <label htmlFor="image" className="custom-file-upload-button">
    <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />} // Icône d'upload
    >
      Télécharger une image
      <input
            type="file"
            id="image"
            name="image"
            accept=".png, .jpg" // Accepte les fichiers image
            style={{ display: 'none' }} // Masquer le champ de fichier
            onChange={handleImageUpload }
          />
    </Button>
  </label>
  {image && (
        <div>
          <h2>Image téléchargée :</h2>
          <img src={image} alt="Image téléchargée" style={{ maxWidth: '100%' }} />
        </div>
      )}
</Grid>
         
          <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="email"
                         name="email"
                         required
                         fullWidth
                         id="email"
                         label="Email"
                         value={email}
                         onChange={(event) => {
                           setUseremail(event.target.value);
                         }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                         autoComplete="motDePasse"
                         type="password"
                         name="motDePasse"
                         required
                         fullWidth
                         id="motDePasse"
                         label="Mot de passe"
                         value={motDePasse}
                         onChange={(event) => {
                           setUserpass(event.target.value);
                          
                         }}/>
          </Grid>
          
          
          <Grid item xs={12} sm={6} justifyContent="center"  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'100px' }}>
  <label htmlFor="cv" className="custom-file-upload-button">
    <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />} // Icône d'upload
      
    >
      Importer votre CV
      <input
        type="file"
        id="cv"
        name="cv"
        accept=".pdf, .doc, .docx"
        style={{ display: 'none' }} // Masquer le champ de fichier
        onChange={handleFileUpload}
        multiple 
      />
    </Button>
  </label>
</Grid>


    {/* <div className="input-box">
    <label htmlFor="experience-doc" className="custom-file-upload-button">
      <span>Télécharger un document</span>
      <input
        type="file"
        id="experience-doc"
        name="experiencedoc"
        accept=".pdf, .doc, .docx"
        onChange={handleFileUpload}
      />
    </label>
      </div> */}
      </Grid>
            <Button
              type="submit"
              onClick={save}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: '50%', // Largeur personnalisée
                height: '40px', // Hauteur personnalisée
                marginLeft: '97px',
              }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end" sx={{
               
               marginLeft: '30px',
             }} >
              <Grid item sx={{
    
               marginLeft: '30px',
             }}>
                <Link to="/Login"  >
                  Avez vous un compte? Se connecter
                </Link>
              </Grid>
            </Grid>
           </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
    
}

export default Register