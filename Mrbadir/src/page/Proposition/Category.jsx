import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Categorie() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("category", category);  // Sauvegarder directement la catégorie dans le LocalStorage
    handleClose();
    location.reload()
    // Vous pouvez également ajouter d'autres logiques ici en fonction de la catégorie sélectionnée.
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Choisir Une Catégorie
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleCategorySelect("Informatique et Technologies de l'Information")}>Informatique et Technologies de l'Information</MenuItem>
        <MenuItem onClick={() => handleCategorySelect('Sciences de la Vie et de la Santé')}>Sciences de la Vie et de la Santé</MenuItem>
        <MenuItem onClick={() => handleCategorySelect('Sciences Sociales et Humaines')}>Sciences Sociales et Humaines</MenuItem>
        <MenuItem onClick={() => handleCategorySelect('Ingénierie et Sciences Appliquées')}>Ingénierie et Sciences Appliquées</MenuItem>
        <MenuItem onClick={() => handleCategorySelect('Sciences Physiques et Mathématiques')}>Sciences Physiques et Mathématiques</MenuItem>
      </Menu>

    
    </div>
  );
}
