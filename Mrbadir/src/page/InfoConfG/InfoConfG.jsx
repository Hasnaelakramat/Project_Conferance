






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
import Listediplomes from "../More/listediplomes";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Cv from "../More/Cv";
import { useNavigate, useParams } from "react-router-dom";
import Planning from "../MoreConferceAdmin/Plannig";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Header1 from "../../compo/Headers1";
import axios from 'axios';
import {getform1} from '../../services/ConferenceService';
import ACPbar from '../../compo/ACPbar';



const steps = [
  'Gratuit',
  'accesAll',
  'certificat',
];



const InfoConfG = () => {
    const { coID } = useParams();
    console.log("ID de la conférence :", coID);
  const idc= coID;
  
  const navigate = useNavigate();
  const [conference, setConference] = useState([]);
  const [formateurIDs, setformateurIDS] = useState([]);
  const [formateur, setformateur] = useState([]);
  //le main for
  const [formateurmain, setformateurmain] = useState([]);
  // l id du main for
  const [mainformateur, setmainformateur] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/conferences/${coID}`);
        console.log(response.data);

        // Mettre à jour le state avec les données du formateur
        setConference(response.data);
   // Mettre à jour le state avec les ids du formateur
   setformateurIDS(response.data.formateursId);

        // Mettre à jour le state avec les conférences du formateur
        setmainformateur(response.data.formateurId);
        //setConferences(response.data.conferences);
      } catch (error) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération des données du formateur :", error);
      }
    };

    // Effectuer la requête pour obtenir les données du formateur
    fetchData();
  }, [ coID]);

  if (!conference) {
    return <div>Chargement en cours...</div>;
  }
 
   console.log(conference.data);
   const getFormateurById = async (formId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/formateurs/${formId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données du formateur :", error);
      return null;
    }
  };


  useEffect(() => {

    const fetchData = async () => {
      try {
        // Mettre à jour le state avec les données du formateur pour chaque ID
        const formateursData = await Promise.all(formateurIDs.map(async (formateurId) => {
          return await getFormateurById(formateurId);
        }));
  
        // Filtrer les formateurs non nuls (en cas d'erreur lors de la récupération)
        const filteredFormateurs = formateursData.filter((formateur) => formateur !== null);
  
        // Mettre à jour le state avec les données des formateurs
        setformateur(filteredFormateurs);
        console.log(filteredFormateurs);
        if (filteredFormateurs.length > 0) {
          const mainFormateurData = await getFormateurById(mainformateur);
          // Mettre à jour le state 'mainformateur' avec les données du formateur principal
          setformateurmain(mainFormateurData);
          console.log(mainFormateurData);
        }

      } catch (error) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération des données du formateur :", error);
      }
    };

    // Effectuer la requête pour obtenir les données du formateur
    fetchData();
  }, [formateurIDs]);

  const AcceptButton = () => {
      // Récupérer le token depuis le localStorage
      const storedToken = localStorage.getItem('token');
  
      // Vérifier si le token est vide ou non
      if (storedToken) {
        const role = localStorage.getItem("role");
       
      
        if (role === "ROLE_USER") {
          navigate('/AcceuilU');
        } else if (role === "ROLE_FORMATEUR") {
          navigate('/AcceuilF');
        } else {
          navigate('/Acceuil'); 
        }

        // Le token existe, vous pouvez effectuer d'autres logiques si nécessaire
        console.log('Token existant :', storedToken);
      } else {
        // Le token est vide, rediriger vers la page de connexion
        navigate('/Login');
      }

  }
  
  const dateObj = new Date(conference.date);

  // Options de formatage de date
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

  // Formater la date en utilisant les options
  const formattedDate = dateObj.toLocaleDateString('fr-FR', options);


  return (
    <>
    <ACPbar />
      <Stack sx={{ gap: 1, justifyContent: 'flex-end', width: "1300px" ,marginTop: "40px" }} direction="row" spacing={6}>
        <div>
          <div className="container">
            <div className="d-flex  mt-2">
              <div className="col-8 " >
                <Stack sx={{ margin: 1, gap: 1, marginTop: '30px' }} direction={'row'}>
                  <Header1 title= {conference.title} />
                </Stack>
                <Box sx={{ display: "flex", flexDirection: 'row', gap: 1, width: "1000px" }}>
                  <img
                    width="370px"
                    alt="Remy Sharp"
                    src={conference.image} sx={{ width: 350, height: 250, margin: 2 }}
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
                          <LocalPhoneOutlinedIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                          Niveau
                        </Typography>
                        <Typography>{conference.niveau}</Typography>
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
                          Capacite
                        </Typography>
                        <Typography>{conference.capacite}</Typography>
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
                          Lieu
                        </Typography>
                        <Typography>{conference.pays}-{conference.ville}-{conference.lieu}</Typography>
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
                          Date
                        </Typography>
                        <Typography>{formattedDate}</Typography>
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
          <Box sx={{ marginTop: 4 }}>
            <Planning   
            categorie={conference.categorie}
            langue={conference.language}
            planning={conference.planning}
       />
          </Box>

          

        </div>

      </Stack>
      <div className="container">
        <div className="d-flex justify-content-center mt-2">
          <div className="col-12 " >
            <Stack sx={{ marginLeft: "20px", gap: 1, marginTop: 7 }} direction={'row'}>
              <Header1 title={"DESCRIPTION :"} />
            </Stack>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="col-12">
            <Stack sx={{ marginLeft: 7, gap: 1, marginTop: 0 }} direction={'row'}>
             {conference.description}
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={3} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        </div>
      </div>
    


      <div className="container">
        <div className="d-flex justify-content-center mt-2">
          <div className="col-12 " >
            <Stack sx={{ marginLeft: "20px", gap: 1, marginTop: 7 }} direction={'row'}>
              <Header1 title={"FORMATEURS :"} />
            </Stack>
          </div>
        </div>
      </div>
      <Stack sx={{ gap: 10 , marginLeft:23}} direction={"row"}>
      <div>
                <Avatar
                    alt="Remy Sharp"
                    src={formateurmain.imagePath}
                    sx={{ width: 250, height: 250, margin: 2 }}
                  />
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>{formateurmain.email}</Typography>
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>{formateurmain.nom} {formateurmain.prenom}</Typography>
              </div>
      {formateur.map((formateur) => (
        <div key={formateur.id}>
       
              <Avatar
                    alt="Remy Sharp"
                    src={formateur.imagePath}
                    sx={{ width: 250, height: 250, margin: 2 }}
                  />
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>{formateur.email}</Typography>
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>{formateur.nom} {formateur.prenom}</Typography>
              </div>
                ))}
               
                </Stack>
              
             
             

<div className="container" >
            <div className="col-12" >
              <hr />
            </div>
          </div>
          <Stack
        sx={{gap: 1,marginTop: 5,justifyContent: 'center', alignItems: 'center',marginBottom: 5}}
        direction="row"
        spacing={2}
         >
              
          
          </Stack>
    </>

  );
}
export default InfoConfG;




