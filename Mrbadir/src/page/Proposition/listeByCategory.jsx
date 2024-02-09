import { Box, Stack } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
// @ts-ignore
import { cardData } from './cardData';
import { useForm } from "react-hook-form"
//ajoute carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardContainer from './ByCatregorie';
import "./style.css";





// @ts-ignore
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Listediplomes = () => {
  return (
    <div >
     
        <Stack sx={{ margin: 1, gap: 2, marginTop: 2 }} direction={'row'}>
        <Stack sx={{ margin: 2,ml:"-70px" }} direction={'column'}>
        
        <div className="carousel" style={{ marginTop: '-100px', marginLeft: "0px" }}>
        <CardContainer cardData={cardData} />
        </div>
      </Stack >
        </Stack>
 
    </div>
  );
}

export default Listediplomes;
