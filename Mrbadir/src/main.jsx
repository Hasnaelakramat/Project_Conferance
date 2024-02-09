import App from "./App";
// import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
import AcceuilG from "./page/AcceuilG/AcceuilG";
import Acceuil from "./page/Acceuil/Acceuil";
import Register from "./page/Auth/Register";
import RegisterAdmin from "./page/Auth/RegisterAdmin";

import RegisterUser from "./page/Auth/RegisterUser";
import CompteF from "./page/CompteF/CompteF";
import Ajoutconference from "./page/Ajoutconference/Ajoutconference";
import Etatconference from "./page/Etatconference/Etatconference";
import HistoriqueF from "./page/HistoriqueF/HistoriqueF";
import CompteA from "./page/CompteA/CompteA";
import Dconference from "./page/Dconference/Dconference";
import Dformateur from "./page/Dformateur/Dformateur";
import Lconferences from "./page/Lconferences/Lconferences";
import Lutilisateurs from "./page/Lutilisateurs.jsx/Lutilisateurs";
import Lformateurs from "./page/Lformateurs/Lformateurs";
import Logout from "./page/logout/logout";
import Proposition from "./page/Proposition/Proposition";
import Inscrit from "./page/Inscrit/Inscrit";
import HistoriqueU from "./page/HistoriqueU/HistoriqueU";
import CompteU from "./page/CompteU/CompteU";
import NotFound from "./page/NotFound/NotFound";
import Changepassword from "./page/Changepassword/Changepassword";
import DiplomeFormation from "./page/DiplomeFormation/DiplomeFormation";
import AcceuilF from "./page/AcceuilF/AcceuilF";
import AcceuilU from "./page/AcceuilU/AcceuilU";
import MoreConferance from "./page/MoreConf/MoreConferance";
import More from "./page/More/More";
import MoreConferceAdmin from "./page/MoreConferceAdmin/MoreConferceAdmin";
import Login from "./page/Auth/Login";
import InfoConfG from "./page/InfoConfG/InfoConfG";
const Root = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
        <Route index element={<AcceuilG />} />
        <Route path="Register" element={<Register />} />
        <Route path="RegisterAdmin" element={<RegisterAdmin />} />
        <Route path="Login" element={<Login />} />
          <Route path="/InfoConfG/:coID" element={<InfoConfG />} />
        <Route path="RegisterUser" element={<RegisterUser />} />
        <Route path="MoreConferance/:conferenceId" element={<MoreConferance />} />
          <Route path="/" element={<App />}>
          <Route path="Acceuil"  element={<Acceuil/>} />
          <Route path="MoreConferceAdmin/:confId" element={<MoreConferceAdmin/>} />
         <Route path="CompteF" element={<CompteF/>} />
         <Route path="Ajoutconference" element={<Ajoutconference />} />
         <Route path="Etatconference" element={<Etatconference/>} />
       <Route path="HistoriqueF" element={<HistoriqueF/>} />
       <Route path="CompteA" element={<CompteA/>} />
       <Route path="Dconference" element={<Dconference />} />
       <Route path="Dformateur" element={<Dformateur/>} />
       <Route path="Lconferences" element={<Lconferences/>} />
       <Route path="Lutilisateurs" element={<Lutilisateurs/>} />
       <Route path="Lformateurs" element={<Lformateurs/>} />
       <Route path="CompteU" element={<CompteU/>} />
       <Route path="HistoriqueU" element={<HistoriqueU />} />
      <Route path="Inscrit" element={<Inscrit/>} />
       <Route path="Proposition" element={<Proposition/>} />
       <Route path="logout" element={<Logout/>} />
       <Route path="Changepassword" element={<Changepassword/>} />
       <Route path="AcceuilF" element={<AcceuilF/>} />
       <Route path="AcceuilU" element={<AcceuilU/>} />
       <Route path="DiplomeFormation" element={<DiplomeFormation/>} />
       <Route path="More/:formID" element={<More/>} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Route pour les URL non trouvées */}
        </Routes>
      </Router>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
// ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//     <Route index  element={<AcceuilG />} />
//     </Route>
//     <Route path="/" element={<App/>}>
//       <Route path="Register" element={<Register />} />
//       <Route path="Login" element={<Login />} />
//       <Route path="Acceuil"  element={<Acceuil/>} />
//       <Route path="CompteF" element={<CompteF/>} />
//       <Route path="Ajoutconference" element={<Ajoutconference />} />
//       <Route path="Etatconference" element={<Etatconference/>} />
//       <Route path="HistoriqueF" element={<HistoriqueF/>} />
//       <Route path="CompteA" element={<CompteA/>} />
//       <Route path="Dconference" element={<Dconference />} />
//       <Route path="Dformateur" element={<Dformateur/>} />
//       <Route path="Lconferences" element={<Lconferences/>} />
//       <Route path="Lutilisateurs" element={<Lutilisateurs/>} />
//       <Route path="Lformateurs" element={<Lformateurs/>} />
//       <Route path="CompteU" element={<CompteU/>} />
//       <Route path="HistoriqueU" element={<HistoriqueU />} />
//       <Route path="Inscrit" element={<Inscrit/>} />
//       <Route path="Proposition" element={<Proposition/>} />
//       <Route path="logout" element={<Logout/>} />
//       <Route path="Changepassword" element={<Changepassword/>} />
//       <Route path="AcceuilF" element={<AcceuilF/>} />
//       <Route path="AcceuilU" element={<AcceuilU/>} />
//       <Route path="DiplomeFormation" element={<DiplomeFormation/>} />
//       <Route path="*" element={<NotFound />} /> 
//       <Route path="More" element={<More/>} />
//     </Route>
//   )
// );

// // @ts-ignore
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );