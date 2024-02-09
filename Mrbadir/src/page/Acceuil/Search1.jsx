import Container from '@mui/material/Container'
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from 'react';

const Search1 = () => {
  const theme = useTheme();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");


 /* const getInfos = async () => {
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
      setNom(response.data.nom);
      setPrenom(response.data.prenom);
      localStorage.setItem("image",response.data.imagePath);
      localStorage.setItem("nom",response.data.nom);
      localStorage.setItem("prenom",response.data.prenom);
      localStorage.setItem("tele",response.data.tele);
      localStorage.setItem("ville",response.data.ville);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  getInfos();*/



  return (

    <Box sx={{ backgroundColor: localStorage.getItem("currentMode") === "dark" ? '#212121' : '#f5f5f5', borderRadius: "22px", height: "500px", alignItems: "center" }} >
      <Stack sx={{ margin: 2, gap: 1, marginTop: 1 }} direction={'row'}>
        <Box >
          <img
            src="https://www.formation-adulte.info/wp-content/uploads/2019/07/Formation-professionnelle.png"
            alt="Image"
            style={{ width: '75%', height: 'auto' }}
          />
        </Box>

        <Box flexGrow={"10"} flexDirection={"column"}>
          <Container>
          {localStorage.getItem("role") === "ROLE_ADMIN" && (
              <Typography variant="h3" sx={{ margin:"-200px",marginTop: "200px", fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>
                 WELCOM TO OUR SITE
                <Typography variant="h5" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>  - Scientific Conference Coordinator! -</Typography>
  
              </Typography>
        
      )}
      {localStorage.getItem("role") ===  "ROLE_USER" && (
              <Typography variant="h3" sx={{ margin:"-200px",marginTop: "200px", fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>
              WELCOM TO OUR SITE
                <Typography variant="h6" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>  - Discover a seamless  experience on our platform ! -</Typography>
  
              </Typography>
        
      )}
       {localStorage.getItem("role") ===  "ROLE_FORMATEUR" && (
              <Typography variant="h3" sx={{ margin:"-200px",marginTop: "200px", fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>
              WELCOM TO OUR SITE
                <Typography variant="h6" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main }}>  - Discover a seamless experience on our platform ! -</Typography>
  
              </Typography>
        
      )}
          

          </Container>
        </Box>

      </Stack >
    </Box >
  );
}

export default Search1;

