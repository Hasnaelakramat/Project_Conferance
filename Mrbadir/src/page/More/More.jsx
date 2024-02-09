import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import Header from "../../compo/Header";
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';

import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Listediplomes from "./listediplomes";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Cv from "./Cv";
import { useNavigate,useParams } from "react-router-dom";
import {Valformat, Rejformat} from '../../services/ConferenceService';
import axios from 'axios';
import Alert from '@mui/material/Alert';


const More = () => {
  const [successAlert2, setSuccessAlert2] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [formateur, setFormateur] = useState(null);
  const [conferences, setConferences] = useState([]);
 
     
  const { formID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/formateurs/${formID}`);
        console.log(response.data);

        // Mettre à jour le state avec les données du formateur
        setFormateur(response.data);

        // Mettre à jour le state avec les conférences du formateur
        setConferences(response.data.conferences);
      } catch (error) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération des données du formateur :", error);
      }
    };

    // Effectuer la requête pour obtenir les données du formateur
    fetchData();
  }, [formID]);

  if (!formateur) {
    return <div>Chargement en cours...</div>;
  }
 
   console.log(formateur.data);
   
  const RefuseButton = () => {
    console.log('ID de la conférence à supprimer :', formateur.id);
    Rejformat(formateur.id)
    .then(response => {
      // Gérer la réponse si nécessaire
      console.log('Conférence rejetee avec succès !');
      setSuccessAlert2(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        navigate('/Dformateur');
      }, 2000);
    
    })
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de rejet de la conférence :', error);
    });
  }
  
  const AcceptButton = () => {
    console.log('ID de la conférence à supprimer :', formateur.id);
    Valformat(formateur.id)
    .then(response => {
      // Gérer la réponse si nécessaire
      console.log('Conférence validée avec succès !');
      setSuccessAlert(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        navigate('/Dformateur');
      }, 2000);
    
    })
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la validation de la conférence :', error);
    });

  }



  return (
    <>
     {successAlert2 && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
         <Alert severity="success" color="warning">Formateur rejetee avec succès !</Alert>
        </Stack>
          )}
     {successAlert && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
          <Alert severity="success">Formateur validée avec succès !</Alert>
        </Stack>
      )}
     
      <Stack sx={{ gap: 1, justifyContent: 'flex-end' }} direction="row" spacing={6}>
        <div>
          <div className="container">
            <div className="d-flex  mt-2">
              <div className="col-8 " >
                <Stack sx={{ margin: 1, gap: 1, marginTop: 0 }} direction={'row'}>
                  <Header title={`${formateur.nom} ${formateur.prenom}`} subtitle={"profile"} />
                </Stack>
                <Box sx={{ display: "flex", flexDirection: 'row', gap: 1,  width: "900px" }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={formateur.imagePath}
                    sx={{ width: 250, height: 250, margin: 2 }}
                  />


                  <Timeline sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined">
                          <MarkunreadOutlinedIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                          Email
                        </Typography>
                        <Typography>{formateur.email}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined">
                          <LocalPhoneOutlinedIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                          Tele
                        </Typography>
                        <Typography>{formateur.tele}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined">
                          <AlternateEmailOutlinedIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                          Address
                        </Typography>
                        <Typography>{formateur.ville}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined">
                          <WorkOutlineOutlinedIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                          Domaine
                        </Typography>
                        <Typography>{formateur.domaine} </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Box >



              </div>
            </div>
          </div>


          <div className="container" >
            <div className="col-12" >
              <hr />
            </div>
          </div>

          

        </div>

        <div>
          <Box sx={{marginTop: 9}}>
          <Cv  cvData={formateur.cv}/>
          </Box>
      
        <Stack sx={{ gap: 1, marginTop: 2, justifyContent: 'flex-end' }} direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={AcceptButton}>
              Accept
            </Button>
            <Button variant="contained" color="error" onClick={RefuseButton}>
              Refuse
            </Button>
          </Stack>
      
        </div>
        
      </Stack>
     
      

     
    </>
  );
}


export default More;
