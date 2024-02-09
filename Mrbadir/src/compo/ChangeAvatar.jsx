import { PhotoCamera } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

const ChangeAvatar = ({img}) => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(img);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Avatar
        sx={{
          width: 200,
          height: 200,
        }}
        alt="Avatar"
        src={imageSrc}

      />
    {/* <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="image-input"
      />
      <label htmlFor="image-input"
       style={{
        position: 'absolute',
          }}>
        <IconButton
          color="primary"
          component="span"
        >
          <PhotoCamera />
          <Typography sx={{fontFamily: "Comic Sans MS", color: "#757575",mx:1}} variant="body1">Change your picture</Typography>
        </IconButton>
        </label>*/}  
        
      
    </div>
  );
}

export default ChangeAvatar;
