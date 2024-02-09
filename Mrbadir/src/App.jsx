import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import TopBar from "./compo/TopBar";
import SideBar from "./compo/SideBar";
import { Box, createTheme, styled, ThemeProvider } from "@mui/material";
import { getDesignTokens } from "./theme";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = React.useState((localStorage.getItem("currentMode")) ? localStorage.getItem("currentMode") : "light");

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  React.useEffect(() => {
    localStorage.setItem("open", JSON.stringify(open));
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />

        {/*<Box sx={{visibility:"hidden"}} >
          <SideBar open={open} handleDrawerClose={handleDrawerClose} />
          
  </Box >*/}
  <SideBar open={open} handleDrawerClose={handleDrawerClose} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet/>
        </Box>
      </Box>
    </ThemeProvider>

  );
}
