
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

const CardContainer = ({ cardData }) => {
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
  useEffect(() => {
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
  return (
    <Slider {...settings} className="slider-container">
      {cardData.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 300, boxShadow: "0px 0px 11px rgba(0, 0, 0, 0.2)", borderRadius: "10px" }}>

          <CardMedia component="img" height="250" image={card.image} alt="green iguana" />
          <CardContent>
            <Typography variant="body" sx={{ flex: 1, fontFamily: "Comic Sans MS" }}>
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              categorie : {cardData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              Language : English
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              ville : Tanger
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              lieu : ENSA Tanger
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              date : 15/02/2024
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              20(membres)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" }}>
              ------------Gratuit-------------
            </Typography>
            <Stack direction="row" >
            <IconButton aria-label="share"sx={{ marginLeft:"-30px" }} >

            <FavoriteIcon sx={{ color: 'red' }} />
            </IconButton>


          
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Comic Sans MS" ,marginTop:"10px"}}>
              20 likes
            </Typography>
             

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
