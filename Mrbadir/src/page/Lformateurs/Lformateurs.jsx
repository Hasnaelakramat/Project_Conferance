

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { pink } from '@mui/material/colors';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import {getLisFor} from '../../services/ConferenceService';
import { DataGrid } from '@mui/x-data-grid';

import Header from '../../compo/Header';



export const FormateursContext = createContext(null);

const Lformateurs= () => {
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
  
  const columns = [
    {

      field: "nom",
      headerName: "Nom",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prenom",
      headerName: "Prenom",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "domaine",
      headerName: "Domaine",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    
  ];
  return (

    <div>
      <Header title={"Formateur LIST"} subtitle={"Formateur list"} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "80vw" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
      <FormateursContext.Provider value={rows} />
    </div>

  );
}



export default Lformateurs;

