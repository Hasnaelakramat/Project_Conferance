// import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import './LoginForm.css';
// // import { FaUser} from "react-icons/fa";
// // import { FaLock } from "react-icons/fa6";
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import LockIcon from '@mui/icons-material/Lock';
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ButtonAppBar from '../../compo/ACPbar';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         ConferenceS
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
// const defaultTheme = createTheme();

// function Login() {

//   const [email, setUseremail] = useState("");
//   const [mot_de_passe, setUserpass] = useState("");
//   const [role, setRole] = useState("");
//   const [NonsuccessAlert, setNonSuccessAlert] = useState(false);
//   const navigate = useNavigate();

//   const Login = async (event) => {
//     event.preventDefault();
//     const params = {
//       email: email,
//       password: mot_de_passe,
//     };
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/signin", params);
//       localStorage.setItem("token", response.data.accessToken);
//       const token = localStorage.getItem("token");
//       const headers = {
//         "Authorization": token
//       };
//       try {
//         const response1 = await axios.get("http://localhost:8080/api/token/role", { headers: headers });
     
//         localStorage.setItem("role", response1.data);
//         if (localStorage.getItem("role") === "ROLE_ADMIN") {
//           navigate('/Acceuil'); 
//         } else if (localStorage.getItem("role") === "ROLE_USER") {
//           navigate('/AcceuilU');
//         } else {
//           navigate('/AcceuilF');
//         }
//       } catch (error) {
//         console.log(error.message);
//         setNonSuccessAlert(true);
//           window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//       try {
//         const response1 = await axios.get("http://localhost:8080/api/token/email", { headers: headers });
     
//         localStorage.setItem("email", response1.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//       try {
//         const response1 = await axios.get("http://localhost:8080/api/token/id", { headers: headers });
//         localStorage.setItem("id", response1.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//     SetItem();
//   };
//   const SetItem = async () => {
//     const id = localStorage.getItem("id");
//     const role = localStorage.getItem("role");
//     let type = "";
  
//     if (role === "ROLE_USER") {
//       type = "users";
//     } else if (role === "ROLE_FORMATEUR") {
//       type = "formateurs";
//     } else {
//       type = "admin";
//     }
  
//     try {
//       const response = await axios.get(`http://localhost:8080/api/${type}/${id}`);
//       localStorage.setItem("image",response.data.imagePath);
//       localStorage.setItem("nom",response.data.nom);
//       localStorage.setItem("prenom",response.data.prenom);
//       localStorage.setItem("tele",response.data.tele);
//       localStorage.setItem("ville",response.data.ville);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }

//   }
  





  

  

//   return (
//     <div>
//        {NonsuccessAlert && (
//         <Stack sx={{ width: '100%' , marginTop: '50px'}} spacing={2}>
//           <Alert severity="success">Probleme , informations d'identification incorrecte !</Alert>
//         </Stack>
//       )}
//       <ButtonAppBar />

//       <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Se connecter
//             </Typography>
//             <Box component="form" noValidate onSubmit={Login} sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="email"
//                     name="email"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email"
//                     value={email}
//                     onChange={(event) => {
//                       setUseremail(event.target.value);
//                     }}

//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="mot_de_passe"
//                     name="mot_de_passe"
//                     required
//                     fullWidth
//                     id="mot_de_passe"
//                     label="Mot de passe"
//                     type="password"
//                     value={mot_de_passe}
//                     onChange={(event) => {
//                       setUserpass(event.target.value);
//                     }}

//                   />
//                 </Grid>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Se connecter
//                 </Button>
//                 <Grid item>
//                   <Link href="register.jsx" variant="body2">
//                     {"Vous n'avez pas un compte? S'inscrire"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 5 }} />
//         </Container>
//       </ThemeProvider>
//     </div>
//   );
// }

// export default Login;
import { useState, useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import './LoginForm.css';
// import { FaUser} from "react-icons/fa";
// import { FaLock } from "react-icons/fa6";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import * as React from 'react';
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
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from '../../compo/ACPbar';
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

function Login() {

  const [email, setUseremail] = useState("");
  const [mot_de_passe, setUserpass] = useState("");
  const [role, setRole] = useState("");
  const [NonsuccessAlert, setNonSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const Login = async (event) => {
    event.preventDefault();
    const params = {
      email: email,
      password: mot_de_passe,
    };
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", params);
      localStorage.setItem("token", response.data.accessToken);
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": token
      };
      try {
        const response1 = await axios.get("http://localhost:8080/api/token/role", { headers: headers });

        localStorage.setItem("role", response1.data);
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
          navigate('/Acceuil');
        } else if (localStorage.getItem("role") === "ROLE_USER") {
          navigate('/AcceuilU');
        } else {
          navigate('/AcceuilF');
        }
      } catch (error) {
        console.log(error.message);
        setNonSuccessAlert(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      try {
        const response1 = await axios.get("http://localhost:8080/api/token/email", { headers: headers });

        localStorage.setItem("email", response1.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response1 = await axios.get("http://localhost:8080/api/token/id", { headers: headers });
        localStorage.setItem("id", response1.data);
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    SetItem();
  };
  const SetItem = async () => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    let type = "";

    if (role === "ROLE_USER") {
      type = "users";
    } else if (role === "ROLE_FORMATEUR") {
      type = "formateurs";
    } else {
      type = "admin";
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/${type}/${id}`);
      localStorage.setItem("image", response.data.imagePath);
      localStorage.setItem("nom", response.data.nom);
      localStorage.setItem("prenom", response.data.prenom);
      localStorage.setItem("tele", response.data.tele);
      localStorage.setItem("ville", response.data.ville);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);








  return (
    <div>
      {NonsuccessAlert && (
        <Stack sx={{ width: '100%', marginTop: '50px' }} spacing={2}>
          <Alert severity="success">Probleme , informations d'identification incorrecte !</Alert>
        </Stack>
      )}
      <ButtonAppBar />

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
              Se connecter
            </Typography>
            <Box component="form" noValidate onSubmit={Login} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
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
                    }}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="mot_de_passe"
                    name="mot_de_passe"
                    required
                    fullWidth
                    id="mot_de_passe"
                    label="Mot de passe"
                    type="password"
                    value={mot_de_passe}
                    onChange={(event) => {
                      setUserpass(event.target.value);
                    }}

                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 ,marginLeft:"15px"}}
                >
                  Se connecter
                </Button>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    The email or password is incorrect!
                  </Alert>
                </Snackbar>
                <Grid item>
                  <Link to="/RegisterUser" variant="body2" sx={{}}>
                    {"Vous n'avez pas un compte? S'inscrire"}
                  </Link>
                  <br />
                  <Link to="/Register" variant="body2" sx={{}}>
                    {" S'inscrire comme un formateur"}
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

export default Login;