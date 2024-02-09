// import {  useState } from "react";
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
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//       ConferenceS
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
// const defaultTheme = createTheme();

// function Login() {
   
//     const [email, setUseremail] = useState("");
//     const [mot_de_passe, setUserpass] = useState("");
//     const navigate = useNavigate();


//     async function login(event) {
//         event.preventDefault();
//         try {
//           await axios.post("http://localhost:8080/api/auth/", {
//             email: email,
//             mot_de_passe: mot_de_passe,
//             }).then((res) => 
//             {
//              console.log(res.data);
             
//              if (res.data.message == "Email not exits") 
//              {
//                alert("Email not exits");
//              } 
//              else if(res.data.message == "Login Success")
//              { 
                
//                 navigate('/Acceuil');
//              } 
//               else 
//              { 
//                 alert("Incorrect Email and Password not match");
//              }
//           }, fail => {
//            console.error(fail); // Error!
//   });
//         }

 
//          catch (err) {
//           alert(err);
//         }
      
//       }

//     return (
//       <div>
//       <ButtonAppBar />

//       <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Se connecter
//           </Typography>
//           <Box component="form" noValidate onSubmit={login}  sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                            autoComplete="email"
//                            name="email"
//                            required
//                            fullWidth
//                            id="email"
//                            label="Email"
//                            value={email}
//                            onChange={(event) => {
//                              setUseremail(event.target.value);
//                            }}
                           
//                            />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField
//                            autoComplete="mot_de_passe"
//                            name="mot_de_passe"
//                            required
//                            fullWidth
//                            id="mot_de_passe"
//                            label="Mot de passe"
//                            value={mot_de_passe}
//           onChange={(event) => {
//             setUserpass(event.target.value);
//           }}
          
//           />
//             </Grid>   
//             <Button
//               type="submit"
//               onClick={login}
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Se connecter
//             </Button>  
// <Grid item>
//                 <Link href="register.jsx" variant="body2">
//                   {"Vous n'avez pas un compte? S'inscrire"}
//                 </Link>
//               </Grid>
//               </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//     </div>
//   );
//   }
  
//   export default Login;
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from '../../compo/ACPbar';
import {getAuthHeaders } from '../../services/ConferenceService';
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
      // const token = localStorage.getItem("token");
      // const headers = {
      //   "Authorization": token
      // };
      const headers = getAuthHeaders();
      try {
        const response1 = await axios.get("http://localhost:8080/api/token/id", { headers: headers });
        localStorage.setItem("id", response1.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response1 = await axios.get("http://localhost:8080/api/token/role", { headers: headers });
        console.log(response1.data);
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
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  


  useEffect(() => {
    Login();
  }, [email, mot_de_passe]);



  

  

  return (
    <div>
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                <Grid item>
                  <Link href="register.jsx" variant="body2">
                    {"Vous n'avez pas un compte? S'inscrire"}
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