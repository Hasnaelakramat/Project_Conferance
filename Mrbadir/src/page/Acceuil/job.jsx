import React from 'react';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box } from '@mui/material';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';

const cardDataAdmin = [
  { icon: <GroupsSharpIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#0B42EE' }} />, title: 'Conférences', link: '/Lconferences' },
  { icon: <SupervisedUserCircleIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#F1D95F' }} />, title: 'Formateurs', link: '/Lformateurs' },
  { icon: <PeopleAltSharpIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#F07D6B' }} />, title: 'Participants', link: '/Lutilisateurs' },
  { icon: <ChecklistIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#46CEC8' }} />, title: 'Demandes conférences', link: '/Dconference' },
  { icon: <DoneAllIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#D262DE' }} />, title: 'Demandes formateurs', link: '/Dformateur' },
];

const cardDataFormateur = [
  { icon: <EditNoteIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#0B42EE' }} />, title:   'Nouvelle conférence', link: '/AjoutConference' },
  { icon: <GroupsSharpIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#F1D95F' }} />, title: 'Mes Conférences', link: '/EtatConference' },
  { icon: <ManageSearchIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#46CEC8' }} />, title: 'Etat conférence', link: '/EtatConference' },
  
];
const cardDataUser = [
  { icon: <EditNoteIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#0B42EE' }} />, title:   'Prochaines conférences', link: '/Inscrit' },
  { icon: <ManageHistoryOutlinedIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#F1D95F' }} />, title: 'Mes Historiques', link: '/HistoriqueU' },
  { icon: <ManageSearchIcon fontSize="large" style={{ fontSize: 80, marginBottom: 10, color: '#46CEC8' }} />, title: 'Conférences proposées', link: '/Proposition' },
  
];
const StyledCard = styled(Card)({
  width: 200,
  height: 210,
  marginBottom: 20,
  marginRight: 20,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffff',
  transition: 'background-color 0.3s, box-shadow 0.3s',
  '&:hover': {
    backgroundColor: '#9FD1F0',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transform: 'translateY(-5px)',
  },
  marginTop: "10px"
});

const innerDivStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '15px',
  zIndex: 1,
  maxWidth: '1200px',
  marginTop: '5px',
  padding: '20px',
};



const job = () => {

  return (
    <Box sx={{ marginTop: "12px", backgroundColor: localStorage.getItem("currentMode") === "dark" ? '#212121' : '#f5f5f5', borderRadius: "22px", height: "260px", alignItems: "center", justifyContent: "center", display: "flex" }} >
      {localStorage.getItem("role") === "ROLE_ADMIN" && (

        <div style={innerDivStyle}>
          {cardDataAdmin.map((card, index) => (
            <Link
              key={index}
              style={{ textDecoration: 'none', filter: 'blur(0px)' }}
              component={RouterLink}
              to={card.link}
            >
              <StyledCard style={{ backgroundColor: localStorage.getItem("currentMode") === "dark" ? '#212121' : '#f5f5f5' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {card.icon}
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Link>
          ))}
        </div>
      )}


      {localStorage.getItem("role") === "ROLE_USER" && (

        <div style={innerDivStyle}>
          {cardDataUser.map((card, index) => (
            <Link
              key={index}
              style={{ textDecoration: 'none', filter: 'blur(0px)' }}
              component={RouterLink}
              to={card.link}
            >
              <StyledCard style={{ backgroundColor: localStorage.getItem("currentMode") === "dark" ? '#212121' : '#f5f5f5' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {card.icon}
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Link>
          ))}
        </div>
      )}

      {localStorage.getItem("role") === "ROLE_FORMATEUR" && (

        <div style={innerDivStyle}>
          {cardDataFormateur.map((card, index) => (
            <Link
              key={index}
              style={{ textDecoration: 'none', filter: 'blur(0px)' }}
              component={RouterLink}
              to={card.link}
            >
              <StyledCard style={{ backgroundColor: localStorage.getItem("currentMode") === "dark" ? '#212121' : '#f5f5f5' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {card.icon}
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Link>
          ))}
        </div>
      )}

    </Box >
  );
};

export default job;
