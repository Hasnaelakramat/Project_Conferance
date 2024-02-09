

import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { rowsData } from './data';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Header from '../../compo/Header';
import { indigo, pink } from '@mui/material/colors';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { Link } from 'react-router-dom';
import {listFor0,Valformat, Rejformat} from '../../services/ConferenceService';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Dformateur= () => {
  const [rows, setRows] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlert2, setSuccessAlert2] = useState(false);

  useEffect(() => {
    // Effectue une requête GET pour récupérer les données de l'API
    
    listFor0().then(response => {
        // Met à jour l'état avec les données récupérées depuis l'API
        setRows(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);

  const handleDeleteVal = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
    console.log('ID de la conférence à supprimer :', id);
    Valformat(id)
    .then(response => {
      // Gérer la réponse si nécessaire
      console.log('Conférence validée avec succès !');
      setSuccessAlert(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(() => {
            setSuccessAlert(false);
          }, 2000);
        })
          
   
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la validation de la conférence :', error);
    });
  };
 
  const handleDeleteRej = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
    console.log('ID de la conférence à supprimer :', id);
    Rejformat(id)
    .then(response => {
      // Gérer la réponse si nécessaire
      console.log('Conférence rejetee avec succès !');
      setSuccessAlert2(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setSuccessAlert2(false);
      }, 2000);
    })
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de rejet de la conférence :', error);
    });
  };
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
    {
      field: "col6",
      headerName: "More",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {

        return (
          <div>
         <Link to= {`/More/${params.row.id}`}>
            <IconButton
              size="large"
              sx={{ color: indigo[400] }}
            >
            <AutoStoriesOutlinedIcon/>
            </IconButton>
            </Link> 

          </div>
        );
      }
    },
    {
      field: "status",
      headerName: "Validation",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {

        return (
          <div>
           
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                handleDeleteVal(params.row.id);
              }}
              color="success"

            >
                <DoneOutlineIcon />
            </IconButton>


            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDeleteRej(params.row.id)}
              sx={{ color: pink[500] }}

            >
              <DeleteIcon />
            </IconButton>

          </div>
        );
      },
    },
  ];
  
  return (

    <div>
        {successAlert && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
          <Alert severity="success">Formateur validée avec succès !</Alert>
        </Stack>
      )}
        {successAlert2 && (
        <Stack sx={{ width: '100%', height:'50px' }} spacing={2}>
         <Alert severity="success" color="warning">Conférence rejetee avec succès !</Alert>
        </Stack>
      )}
      <Header title={"INSTRUCTOR REQUEST"} subtitle={"instructor request"} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "80vw" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>


  );
}





export default Dformateur;
