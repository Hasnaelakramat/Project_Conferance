
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { rowsData } from './data';
import Header from '../../compo/Header';

import { Box, Typography } from '@mui/material';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {getAllConfFormateur , getAuthHeaders} from '../../services/ConferenceService';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
const Etatconference = () => {
  const headers = getAuthHeaders();
  const mainFormateurId = localStorage.getItem("id");
  console.log(mainFormateurId);
const [rows, setRows] = useState([]);
  
useEffect(() => {
  // Effectue une requête GET pour récupérer les données de l'API
  
  getAllConfFormateur(mainFormateurId).then(response => {
      // Met à jour l'état avec les données récupérées depuis l'API
      setRows(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}, []);
const columns = [
  {

    field: "title",
    headerName: "Titre",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "categorie",
    headerName: "Categorie",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "niveau",
    headerName: "Niveau",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "lieu",
    headerName: "Lieu",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => {
      const { date } = row;
      const formattedDate = date
        ? new Date(date).toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Date non définie';
  
      return (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">{formattedDate}</Typography>
        </Box>
      );
    },
  },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: ({ row }) => { // Utiliser "row" au lieu de "rows: { Status }"
    //     const { Status } = row.status; // Accéder à la propriété "Status" de "row"
    //     return (
    //       <Box
    //         sx={{
    //           p: "5px",
    //           width: "99px",
    //           borderRadius: "3px",
    //           textAlign: "center",
    //           display: "flex",
    //           justifyContent: "space-evenly",

    //           backgroundColor:
    //           Status === "en attente"
    //               ? theme.palette.primary.dark
    //               :   Status === "annulée"
    //               ? theme.palette.error.dark
    //               : "#3da58a",
    //         }}
    //       >
    //         {Status === "confirmée" && (
    //           <CheckOutlinedIcon
    //             sx={{ color: "#fff" }}
    //             fontSize="small"
    //           />
    //         )}

    //         {Status === "annulée"&& (
    //           <DoDisturbOnOutlinedIcon sx={{ color: "#fff" }} fontSize="small" />
    //         )}

    //         {Status === "en attente" && (
    //           <HourglassTopTwoToneIcon sx={{ color: "#fff" }} fontSize="small" />
    //         )}

    //         <Typography sx={{ fontSize: "13px", color: "#fff" }}>
    //           {Status}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        const { status } = row;
        const statusMapping = {
          1: { text: "confirmée", color: "#328432", icon: <CheckOutlinedIcon sx={{ color: "#fff" }} fontSize="small" /> },
          0: { text: "en attente", color: "#0F52BA", icon: <HourglassTopTwoToneIcon sx={{ color: "#fff" }} fontSize="small" /> },
          '-1': { text: "annulée", color: "#DC143C", icon: <DoDisturbOnOutlinedIcon sx={{ color: "#fff" }} fontSize="small" /> },
        };
        const mappedStatus = statusMapping[status];
      
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: mappedStatus.color,
            }}
          >
            {mappedStatus.icon}
            <Typography variant="body2" sx={{ color: "#fff" }}>{mappedStatus.text}</Typography>
          </Box>
        );
      }
    },
  ];
  return (
    <div >
      <Header title={"Status Conference"} subtitle={"Status for your Conference"} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "80vw" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>

    </div>
  );
}

export default Etatconference;
