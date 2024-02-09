
import Slider from "react-slick";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import EuroSymbolOutlinedIcon from '@mui/icons-material/EuroSymbolOutlined';
import { useEffect, useState } from "react";
import { cardData } from "./cardData";
import { Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { getCategoryLisConf, getVilleLisConf ,getLisConf } from "../../services/ConferenceService";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Categorie from "./Category";

const CardContainer = ({ cardData }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 3}, background: #222; color: #bada55`
      );

    },

  };


  const List = () => {
    localStorage.setItem("affiche","false");
    const category = localStorage.getItem("category");
    const categoryMappings = {
      "Informatique et Technologies de l'Information": "Informatique%20et%20Technologies%20d%20Information",
      "Sciences de la Vie et de la Santé": "Sciences%20de%20la%20Vie%20et%20de%20la%20Santé",
      "Sciences Sociales et Humaines": "Sciences%20Sociales%20et%20Humaines",
      "Ingénierie et Sciences Appliquées": "Ingénierie%20et%20Sciences%20Appliquées",
      "Sciences Physiques et Mathématiques": "Sciences%20Physiques%20et%20Mathématiques"
  };
  const categorie = categoryMappings[category] || "";
   
  
    if (categorie === null) {
      // La clé "category" n'existe pas
      getLisConf().then(response => {
        // Met à jour l'état avec les données récupérées depuis l'API
        setRows(response.data);
  
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
    } else {
    
      // La clé "category" existe
      getCategoryLisConf(categorie).then(response => {
        setRows(response.data);
        console.log(response.data);
      });
    }
  };



  useEffect(() => {
    List();
    
    const handleResize = () => {

      if (window.innerWidth <= 717) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 990) {
        setSlidesToShow(2);
      }
      else if (window.innerWidth <= 1240) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 2024) {
        setSlidesToShow(4);
      }
      else {
        setSlidesToShow(5);
      }
    };


    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);


    };
  }, []);
  const [isClicked, setClicked] = useState(false);

  const handleClick = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/conferences/${id}/like`);
      
      setClicked(!isClicked);

    } catch (error) {
      console.log(error.message);

    }

  };

  const Participer = async (id) => {
    const idUser = localStorage.getItem('id');
    
    try {
        const response = await axios.post(`http://localhost:8080/api/users/${idUser}/participate/${id}`);
        navigate("/Inscrit");
    } catch (error) {
        console.log(error.message);
    }
}


  return (

    <Slider {...settings} className="slider-container">
      {rows.map((row, index) => (
        <Card key={index} sx={{ maxWidth: 300, boxShadow: "0px 0px 11px rgba(0, 0, 0, 0.2)", borderRadius: "10px" }}>
<Link to={`/ConferenceMore/${row.id}`} key={index} className="clickable-card-link" onClick={() => localStorage.setItem("rowId", row.id)}>
       <CardMedia component="img" height="250" image={row.image} alt="green iguana" />
       </Link>  <CardContent>
            <Typography variant="body" sx={{ flex: 1, fontFamily: "Comic Sans MS" }}>
              {row.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              categorie : {row.categorie}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              Language : {row.language}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              ville : {row.ville}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              lieu : {row.lieu}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              date : {row.date}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              {row.capacite}(membres)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              {row.gratuit ? " ------------Gratuit-------------" : "------------payant-------------"}
            </Typography>
            <Stack direction="row" >
            <Button
                aria-label="share"
                sx={{ marginLeft: "-60px" }}
                onClick={() => handleClick(row.id)}
              >
                <FavoriteIcon sx={{ color :'red'  }} />
              </Button>



              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS", marginTop: "10px" }}>
                {row.numLikes} likes
              </Typography>
              <Button type="submit" variant="contained" sx={{
                width: '100px', height: '30px'
                , top: '7px',       
                left: '50px'         
              }} onClick={() => Participer(row.id)}>
                <Typography variant="body2" sx={{ fontFamily: "Comic Sans MS" }}  >
                  Participer
                </Typography>
              </Button>


            </Stack>



          </CardContent>

          <CardActions disableSpacing>

          </CardActions>

        </Card>
      ))}
    </Slider>
  );
};


export default CardContainer;
