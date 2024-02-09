
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { pink } from '@mui/material/colors';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import {listUsers} from '../../services/ConferenceService';
import { DataGrid } from '@mui/x-data-grid';

import Header from '../../compo/Header';



export const FormateursContext = createContext(null);

const  Lutilisateurs= () => {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    // Effectue une requête GET pour récupérer les données de l'API
    
    listUsers().then(response => {
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
      field: "specialite",
      headerName: "Specialite",
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
      <Header title={"Users LIST"} subtitle={"Users list"} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "80vw" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
      <FormateursContext.Provider value={rows} />
    </div>

  );
}



export default Lutilisateurs;




