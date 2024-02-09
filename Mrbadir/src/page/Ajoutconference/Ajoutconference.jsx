
import React from 'react';
import {  useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {sendConf} from '../../services/ConferenceService';
import {FormateursContext} from '../Lformateurs/Lformateurs';
import {getLisFor} from '../../services/ConferenceService';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import axios from "axios";
import {getAuthHeaders } from '../../services/ConferenceService';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '8px', // Utilisez des valeurs en pixels ou d'autres unités de mesure
    marginRight: '8px', // Selon vos besoins
    width: '200px',
  },
};
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

function Ajoutconference() {
  const [successAlert, setSuccessAlert] = useState(false);
    const [title, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [categorie, setCategorie] =useState('');
    const [language, setLangue] =useState('');
    const [niveau, setNiveau] =useState('');
    const [lieu, setPays] =useState('');
    const [ville, setVille] =useState('');
    const [accesAll, setAccesAll] = useState(false); 
    const [atelier, setAtelier] = useState(false); 
    const [capacite, setCapacite] =useState('');
    const [certificat, setCertificat] = useState(false);
    const [gratuit, setGratuit] = useState(true);
    const [image,  setImageDoc] = useState(null);
    const [ planning,  setFileDoc] = useState(null);
    // const [  idfor,  setIDFOR] = useState('');
    const [ date,  setDateTime] = useState("2024-01-24T10:30");
    const [  selectednom, setPersonName] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const pays="MAROC";
    
    // const rows = useContext(FormateursContext);
    // const names = rows.map(row => row.name);
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
      // Effectue une requête GET pour récupérer les données de l'API
      
      getLisFor().then(response => {
          // Met à jour l'état avec les données récupérées depuis l'API
          setRows(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
    }, []);
    const names = rows.map(row => row.email);
  
    //const mainFormateurId = 7;
//////comment faire 
    // const requestData = {
    //   conference: {
    //     title: 'Titre de la conférence',
    //     description: 'Description de la conférence',
    //     // Autres champs pour la conférence...
    //   },
    //   mainFormateurId: 1, // ID du formateur principal
    //   additionalFormateurIds: [2, 3], // Liste des IDs des formateurs supplémentaires
    // };
    const formConference = async(event) =>{
        event.preventDefault();
        const selectedIds = selectednom.map(selectedName =>
          rows.find(row => row.email === selectedName)?.id
        ).filter(Boolean);
        console.log("noms sélectionnés :", selectednom);
        console.log("IDs sélectionnés :", selectedIds);
        const headers = getAuthHeaders();
        // const tableau = [2];
        const mainFormateurId = localStorage.getItem("id");
        console.log(mainFormateurId);
        const conf ={title, description,image , capacite,planning,categorie,language,niveau,atelier,lieu,date,ville,pays,certificat,gratuit,accesAll};
       console.log(conf);
        const requestData = {
         conference: conf,
         //mainFormateurId :mainFormateurId,
   additionalFormateurIds: selectedIds
           // conference: {
           //   conf
           // },
           // additionalFormateurIds: [2, 3], // Liste des IDs des formateurs supplémentaires
         };
         // console.log(requestData);
        // const token = localStorage.getItem("token");
        try{
  const response = axios.post(`http://localhost:8080/api/formateurs/createconference/${mainFormateurId}`, requestData);
 // {
//   headers: {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// } 
          console.log('La conférence a été créée avec succès !', response);
          //alert("Conference Registation Successfully");
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
          //methode2 
          setSuccessAlert(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          await new Promise(resolve => setTimeout(resolve, 2000));
          navigate('/Etatconference');
       
        } catch (error) {

          <Alert variant="filled" severity="error">
          Erreur, veuillez vérifier les informations saisies !
        </Alert>
           window.scrollTo({ top: 0, behavior: 'smooth' });
          console.error('Erreur lors de la création de la conférence :', error.response);
        }
      }
        // sendConf(mainFormateurId,requestData).then((response) =>{
        //   console.log('La conférence a été créée avec succès !', response);
        //   console.log( conf);
        //   alert("Conference Registation Successfully");
        // })
        // .catch(error => {
        //   console.error('Erreur lors de la création de la conférence :', error.response.data);
        // });
      
      const handleChangeNames = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
      
  //       const { value } = event.target;
  //        // Récupérer les IDs correspondants aux noms sélectionnés
  // const personNameIds = value.map(selectedName =>
  //   names.find(name => name.nom === selectedName)?.id
  // ).filter(Boolean);

  // // Mettre à jour l'état avec les IDs correspondants
  // setSelectedIds(personNameIds);

      
   
      const handleChange = (event) => {
        const selectedValue = event.target.value; // Récupérer la valeur sélectionnée
  setCategorie(selectedValue);
      };
      const handleChangeLangue = (event) => {
        setLangue(event.target.value);
      };
      const handleChangeNiveau = (event) => {
        setNiveau(event.target.value);
      };
      const  handleChangeVille = (event) => {
        setVille(event.target.value);
      };
     
      // const handleAccesAllChange = (event) => {
      //   // Vérifier la valeur sélectionnée et mettre à jour l'état en conséquence
      //   setAccesAll(event.target.value === 'oui' ? true : false);
      // };
      const handleAccesAllChange = (event) => {
        // Mettre à jour l'état en fonction de la valeur sélectionnée
        setAccesAll(event.target.value === 'oui');
      };
      const handleAtelierChange = (event) => {
        // Vérifier la valeur sélectionnée et mettre à jour l'état en conséquence
        setAtelier(event.target.value === 'oui' ? true : false);
      };
      const handleCertificatChange = (event) => {
        // Vérifier la valeur sélectionnée et mettre à jour l'état en conséquence
        setCertificat(event.target.value === 'oui' ? true : false);
      };
      const handleGratuitChange = (event) => {
        // Vérifier la valeur sélectionnée et mettre à jour l'état en conséquence
        setGratuit(event.target.value === 'oui' ? true : false);
      };
      //vv222
    //   const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    // setImageDoc(file);
    //   };
//     const handleImageUpload = (event) => {
//       const file = event.target.files[0];
//      const imPath = URL.createObjectURL(file);
//      setImageDoc(imPath);
//  };
////v333
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
    setImageDoc(reader.result); // Stocker l'image dans l'état local
  }
  };


  if (file) {
    reader.readAsDataURL(file); // Lecture du fichier image en tant que data URL
  }
};
    //////v11
    // const handleImageUpload = (event) => {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    
    //   reader.onloadend = () => {
    //     const result = reader.result; // Récupère le résultat du lecteur de fichier
    
    //     if (typeof result === 'string') {
    //       setImageDoc(result); // Stocke l'URL de l'image dans le state
    //     } else {
    //       // Si ce n'est pas une chaîne de caractères, essayez de la convertir en chaîne
    //       setImageDoc(result.toString()); // Stocke l'URL de l'image dans le state
    //     }
    //   };
    
    //   if (file) {
    //     reader.readAsDataURL(file); // Convertit le fichier en URL
    //   }
    // };
    // const handleFileUpload= (event) => {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    
    //   reader.onloadend = () => {
    //     const result = reader.result; // Récupère le résultat du lecteur de fichier
    
    //     if (typeof result === 'string') {
    //       setFileDoc(result); // Stocke l'URL de l'image dans le state
    //     } else {
    //       // Si ce n'est pas une chaîne de caractères, essayez de la convertir en chaîne
    //       setFileDoc(result.toString()); // Stocke l'URL de l'image dans le state
    //     }
    //   };
       
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFileDoc(reader.result); // Stocker l'image dans l'état local
    }
    };
    if (file) {
      reader.readAsDataURL(file); // Lecture du fichier image en tant que data URL
    }

      
      };
      
    const handleChangeDate= (event) => {
      setDateTime(event.target.value); // Met à jour la valeur lorsque l'utilisateur modifie le champ
    };

    return (
      <div>
       {successAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">La conférence a été créée avec succès !</Alert>
        </Stack>
      )}
      
      

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
            <CreateOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter une Conference
          </Typography>
          <Box component="form" noValidate onSubmit={formConference}  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="categorie"
          value={categorie}
          label="Categorie"
          onChange={handleChange}
        >
              <MenuItem value={'Informatique et Technologies d Information'}>Informatique et Technologies de l'Information</MenuItem>
          <MenuItem value={'Sciences de la Vie et de la Santé'}>Sciences de la Vie et de la Santé</MenuItem>
          <MenuItem value={'Sciences Sociales et Humaines'}>Sciences Sociales et Humaines</MenuItem>
          <MenuItem value={'Ingénierie et Sciences Appliquées'}>Ingénierie et Sciences Appliquées</MenuItem>
          <MenuItem value={'Sciences Physiques et Mathématiques'}>Sciences Physiques et Mathématiques</MenuItem>
        </Select>
        </FormControl>
    </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                           autoComplete="title"
                           name="title"
                         
                           fullWidth
                           id="title"
                           label="Titre"
                           value={title}
          onChange={(event) => {
            setTitre(event.target.value);
          }}
          required
          
          />
            </Grid>   
            <Grid item xs={12} sm={6}>
                <TextField
                           autoComplete="description"
                           name="description"
                           required
                           fullWidth
                           id="description"
                           label="Description"
                           value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          />
            </Grid> 
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Langue</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="langue"
          value={language}
          label="Langue"
          onChange={handleChangeLangue }
        >
          <MenuItem value={'Arabe'}>Arabe</MenuItem>
          <MenuItem value={'Anglais'}>Anglais</MenuItem>
          <MenuItem value={'Francais'}>Francais</MenuItem>
          <MenuItem value={'Espagnol'}>Espagnol</MenuItem>
        </Select>
        </FormControl>
    </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                           autoComplete="lieu"
                           name="lieu"
                           required
                           fullWidth
                           id="lieu"
                           label="Lieu"
                           value={lieu}
          onChange={(event) => {
            setPays(event.target.value);
          }}
          />
            </Grid> 
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ville</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="ville"
          value={ville}
          label="ville"
          onChange={handleChangeVille }
        >
          <MenuItem value={'Tanger'}>Tanger</MenuItem>
          <MenuItem value={'Tetouan'}>Tetouan</MenuItem>
          <MenuItem value={'Marrakech'}>Marrakech</MenuItem>
          <MenuItem value={'Rabat'}>Rabat</MenuItem>
        </Select>
        </FormControl>
    </Box>
            </Grid>
            <div style={{ width: '100px', marginLeft: '5px', marginTop:'15px' }}>
            <Grid item xs={12} sm={6}>
            <form sx={styles.container} noValidate>
      <TextField
        id="datetime"
        label="Date"
        type="datetime-local"
        // defaultValue="2017-05-24T10:30"
        sx={styles.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={date} // Valeur contrôlée par l'état description
        onChange={handleChangeDate}
      />
    </form>
    </Grid>
    </div>
    {/* //////////////////////////////////////////////////////////////////////////////// */}
    <Grid item xs={12} sm={6}>
    <FormControl sx={{  width: 190, marginLeft:'100px' }}>
        <InputLabel id="demo-multiple-checkbox-label">Ajouter Formateurs</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectednom}
          onChange={handleChangeNames}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={selectednom.indexOf(name) > -1} /> 
              <ListItemText primary={name} />
            </MenuItem>
          ))}
       
        </Select>
      </FormControl>
      </Grid>
          {/* //////////////////////////////////////////////////////////////////////////////// */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Niveau</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="niveau"
          value={niveau}
          label="Niveau"
          onChange={handleChangeNiveau }
        >
          <MenuItem value={'Debutant'}>Debutant</MenuItem>
          <MenuItem value={'Debutant_Intermediere'}>Debutant_Intermediere</MenuItem>
          <MenuItem value={'Intermediere'}>Intermediaire</MenuItem>
          <MenuItem value={'avance'}>Avancé</MenuItem>
        </Select>
        </FormControl>
    </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                           autoComplete="Capacité"
                           name="capacite"
                           required
                           fullWidth
                           id="capacite"
                           label="Capacité"
                           value={capacite}
          onChange={(event) => {
            setCapacite(event.target.value);
          }}
          />
          </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Acces par tous</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Non"
        name="radio-buttons-group"
        value={accesAll ? 'oui' : 'non'}  
        onChange={handleAccesAllChange}
        
      >
         <FormControlLabel
            value="oui"
            control={<Radio color="primary" />}
            label="Oui"
          />
          <FormControlLabel
            value="non"
            control={<Radio color="primary" />}
            label="Non"
          />
      </RadioGroup>
    </FormControl>
    </Grid>
    <Grid item xs={12} sm={6}>
            <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Atelier</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Non"
        name="radio-buttons-group"
        value={atelier ? 'oui' : 'non'} 
        onChange={handleAtelierChange}
      >
       <FormControlLabel
            value="oui"
            control={<Radio color="primary" />}
            label="Oui"
          />
          <FormControlLabel
            value="non"
            control={<Radio color="primary" />}
            label="Non"
          />
      </RadioGroup>
    </FormControl>
    </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Certificat</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Non"
        name="radio-buttons-group"
        value={certificat ? 'oui' : 'non'} 
        onChange={handleCertificatChange}
      >
       <FormControlLabel
            value="oui"
            control={<Radio color="primary" />}
            label="Oui"
          />
          <FormControlLabel
            value="non"
            control={<Radio color="primary" />}
            label="Non"
          />
      </RadioGroup>
    </FormControl>
    </Grid>

    <Grid item xs={12} sm={6}>
            <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gratuit</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Oui"
        name="radio-buttons-group"
        value={gratuit ? 'oui' : 'non'} 
        onChange={handleGratuitChange}
      >
       <FormControlLabel
            value="oui"
            control={<Radio color="primary" />}
            label="Oui"
          />
          <FormControlLabel
            value="non"
            control={<Radio color="primary" />}
            label="Non"
          />
      </RadioGroup>
    </FormControl>
    </Grid>
          <Grid item xs={12} sm={6}>
  <label htmlFor="Imagedoc" className="custom-file-upload-button">
    <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />} // Icône d'upload
    >
      Télécharger une image
      <input
            type="file"
            id="Imagedoc"
            name="Imagedoc"
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
  <label htmlFor="Plandoc" className="custom-file-upload-button">
    <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />} // Icône d'upload
    >
      Télécharger le planning
      <input
        type="file"
        id="Plandoc"
        name="Plandoc"
        accept=".pdf, .doc, .docx, .png, .jpg"
        style={{ display: 'none' }} // Masquer le champ de fichier
        onChange={handleFileUpload}
      />
    </Button>
  </label>
</Grid>


            <Button
              type="submit"
              onClick={formConference}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,marginLeft:"15px"}}
            >
              Ajouter
            </Button>  
              </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
  }
  
  export default Ajoutconference;

