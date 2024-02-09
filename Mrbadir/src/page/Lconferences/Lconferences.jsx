

import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from 'react';
import { rowsData } from '../Dconference/data';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Header from '../../compo/Header';
import { pink } from '@mui/material/colors';
import {getLisConf} from '../../services/ConferenceService';
import { Box, Typography } from '@mui/material';




const Lconferences= () => {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    // Effectue une requête GET pour récupérer les données de l'API
    
    getLisConf().then(response => {
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
    {
      field: "formateurName",
      headerName: "Responsable",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    
  ];
  return (

    <div>
      <Header title={"CONFERENCE LIST"} subtitle={"Conference list"} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "80vw" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>


  );
}



export default Lconferences;
