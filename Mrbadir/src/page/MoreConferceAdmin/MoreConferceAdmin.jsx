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
import Planning from "./Plannig";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Header1 from "../../compo/Headers1";
import axios from 'axios';
import {Valconf, Rejconf} from '../../services/ConferenceService';
import Alert from '@mui/material/Alert';


const steps = [
  'Gratuit',
  'accesAll',
  'certificat',
];


const MoreConferceAdmin = () => {
  const { confId } = useParams();
  const navigate = useNavigate();
  const [conference, setConference] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlert2, setSuccessAlert2] = useState(false);
  const [formateurIDs, setformateurIDS] = useState([]);
  const [formateur, setformateur] = useState([]);
  //le main for
  const [formateurmain, setformateurmain] = useState([]);
  // l id du main for
  const [mainformateur, setmainformateur] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/conferences/${confId}`);
        console.log(response.data);

        // Mettre à jour le state avec les données du formateur
        setConference(response.data);
        setformateurIDS(response.data.formateursId);

        // Mettre à jour le state avec les conférences du formateur
        setmainformateur(response.data.formateurId);
        // Mettre à jour le state avec les conférences du formateur
        //setConferences(response.data.conferences);
      } catch (error) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération des données du formateur :", error);
      }
    };

    // Effectuer la requête pour obtenir les données du formateur
    fetchData();
  }, [ confId]);

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

  const RefuseButton = () => {
    console.log('ID de la conférence à supprimer :', conference.id);
    Rejconf(conference.id)
    .then(response => {
      // Gérer la réponse si nécessaire
      console.log('Conférence rejetee avec succès !');
      setSuccessAlert2(true);
      setTimeout(() => {
        navigate('/Dconference');
      }, 2000);
    })
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de rejet de la conférence :', error);
    });
  }
  useEffect(() => {
    if (successAlert2) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Si successAlert est true, alors afficher l'alerte
      setTimeout(() => {
        setSuccessAlert2(false);
      }, 2000);
    }
  }, [successAlert2]);
  const AcceptButton = () => {
    console.log('ID de la conférence à supprimer :', conference.id);
    Valconf(conference.id)
    .then(response => {
      // Gérer la réponse si nécessaire
      console.log('Conférence validée avec succès !');
      setSuccessAlert(true);
      setTimeout(() => {
        navigate('/Dconference');
      }, 2000);
    

      //navigate('/Dconference')
    })
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la validation de la conférence :', error);
    });

  }
  useEffect(() => {
    if (successAlert) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Si successAlert est true, alors afficher l'alerte
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    }
  }, [successAlert]);
  const dateObj = new Date(conference.date);

  // Options de formatage de date
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

  // Formater la date en utilisant les options
  const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

  return (
    <>
    {successAlert && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
          <Alert severity="success">Conference validée avec succès !</Alert>
        </Stack>
      )}
      {successAlert2 && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
         <Alert severity="success" color="warning">Conference rejetee avec succès !</Alert>
        </Stack>
      )}
      <Stack sx={{ gap: 1, justifyContent: 'flex-end', width: "1300px" }} direction="row" spacing={6}>
        <div>
          <div className="container">
            <div className="d-flex  mt-2">
              <div className="col-8 " >
                <Stack sx={{ margin: 1, gap: 1, marginTop: 0 }} direction={'row'}>
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
              {/* <div>
              <Avatar
                    alt="Remy Sharp"
                    src="https://www.francaisauthentique.com/wp-content/uploads/2023/09/decrire-une-personne-en-francais.jpg"
                    sx={{ width: 250, height: 250, margin: 2 }}
                  />
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>testFor@gmail.com</Typography>
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>testFor1</Typography>
              </div>
              <div>
              <Avatar
                    alt="Remy Sharp"
                    src="https://media.istockphoto.com/id/980122992/photo/portrait-of-young-man-looking-at-camera-studio-shot-on-the-grey-background.jpg?s=612x612&w=0&k=20&c=Keq1BcDGLYxpyBgcounW1GZBEGzZXVwAEXNxLXTLhCw="
                    sx={{ width: 250, height: 250, margin: 2 }}
                  />
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>testFor2@gmail.com</Typography>
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>testFor2</Typography>
              </div>
              <div>
              <Avatar
                    alt="Remy Sharp"
                    src="https://media.istockphoto.com/id/1389348844/fr/photo/plan-de-studio-dune-belle-jeune-femme-souriante-debout-sur-un-fond-gris.jpg?s=612x612&w=0&k=20&c=VGipX3a8xrbYuXTNm_61pFuzpGdAO9lwt2xnVUd7Khs="
                    sx={{ width: 250, height: 250, margin: 2 }}
                  />
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>testFor3@gmail.com</Typography>
                   <Typography variant="body1" sx={{fontFamily: "Comic Sans MS", color: "#616161",marginLeft:"67px"}}>testFor3</Typography>
              </div> */}

<div className="container" >
            <div className="col-12" >
              <hr />
            </div>
          </div>
          <Stack sx={{ gap: 1, marginTop: 2, justifyContent: 'flex-end' }} direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={AcceptButton}>
              Accept
            </Button>
            <Button variant="contained" color="error" onClick={RefuseButton}>
              Refuse
            </Button>
          </Stack>
    </>

  );
}

export default MoreConferceAdmin;
