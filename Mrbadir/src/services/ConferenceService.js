import axios from 'axios';
// const REST_API_BASE_URL= 'http://localhost:8080/api/conferences/withStatusZero';
// export const listConferenceV = () => axios.get(REST_API_BASE_URL);
const REST_API_BASE_URL = 'http://localhost:8080/api/';
const GET_CONFERENCES_WITH_STATUS_ZERO = 'conferences/withStatusZero';
const OTHER_API_ENDPOINT = 'formateurs/createconference';
const OTHER_API_dformat = 'auth/signup/formateur';
const OTHER_API_duser = 'auth/signup/user';
const OTHER_API_dadmin = 'auth/signup/admin';
const OTHER_API_Valconf = 'conferences/validate/{conferenceId}';
const OTHER_API_Rejconf = 'conferences/reject/{conferenceId}';
const OTHER_API_ListFor = 'formateurs/all';
const OTHER_API_ListConf = 'conferences/allConferences';
const OTHER_API_List0For = 'formateurs/statusZero';
const OTHER_API_ListConfAV = 'conferences/availableConferences';
const OTHER_API_Login = 'auth/signin';
const OTHER_API_ListConfp = 'conferences/past';
const OTHER_API_ListConfComming = 'conferences/upcoming';
const OTHER_API_ListUsers = 'users/all';

// Fonction pour récupérer les conférences avec statut zéro
export const listConferenceV = () => {
  return axios.get(`${REST_API_BASE_URL}${GET_CONFERENCES_WITH_STATUS_ZERO}`);
};
export const listUsers = () => {
  return axios.get(`${REST_API_BASE_URL}${OTHER_API_ListUsers}`);
};
export const listConferencep = () => {
  return axios.get(`${REST_API_BASE_URL}${OTHER_API_ListConfp}`);
};
export const listConferenceComming = () => {
  return axios.get(`${REST_API_BASE_URL}${OTHER_API_ListConfComming}`);
};
export const listFor0 = () => {
  return axios.get(`${REST_API_BASE_URL}${OTHER_API_List0For}`);
};
export const ListConfAV = () => {
  return axios.get(`${REST_API_BASE_URL}${OTHER_API_ListConfAV}`);
};
// Autre fonction pour appeler une autre API
export const sendConf = (mainFormateurId,conf) => {
    return axios.post(`${REST_API_BASE_URL}formateurs/createconference/${mainFormateurId}`, conf);
  };
  export const sendLogin = (info) => {
    return axios.post(`${REST_API_BASE_URL}${OTHER_API_Login}`, info);
  };
  export const getLisFor = () => {
    return axios.get(`${REST_API_BASE_URL}${OTHER_API_ListFor}`);
  };
  /*export const getLisConf = () => {
    return axios.get(`${REST_API_BASE_URL}${OTHER_API_ListConf}`);
  };*/
  export const getLisConf = () => {
    return axios.get("http://localhost:8080/api/conferences/availableConferences");
  };

  export const sendformat = (formateur) => {
    return axios.post(`${REST_API_BASE_URL}${OTHER_API_dformat}`, formateur);
  };
  export const senduser = (user) => {
    return axios.post(`${REST_API_BASE_URL}${OTHER_API_duser}`, user);
  };
  export const sendadmin = (admin) => {
    return axios.post(`${REST_API_BASE_URL}${OTHER_API_dadmin}`, admin);
  };
//   export const valFor = () => {
//     return axios.post(`${REST_API_BASE_URL}${OTHER_API_Valconf}`);
//   };
export const Valconf= (id) => {
    return axios.put(`${REST_API_BASE_URL}conferences/validate/${id}`);
  };
  export const Rejconf= (id) => {
    return axios.put(`${REST_API_BASE_URL}conferences/reject/${id}`);
  };
  export const Valformat= (id) => {
    return axios.put(`${REST_API_BASE_URL}admin/validate/formateur/${id}`);
  };
  export const Rejformat= (id) => {
    return axios.put(`${REST_API_BASE_URL}admin/reject/formateur/${id}`);
  };
  export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Authorization": token
    };
    return headers;
  };
  export const getConfId = (conferenceId) => {
    return axios.get(`${REST_API_BASE_URL}conferences/${conferenceId}`);
  };
  export const getAllConfFormateur = (formateurId) => {
    return axios.get(`${REST_API_BASE_URL}conferences/formateur/${formateurId}`);
  };
  export const getform1 = (formId) => {
    return axios.get(`${REST_API_BASE_URL}formateurs/${formId}`);
  };


  export const getFuturLisConf = (id) => {
    return axios.get(`http://localhost:8080/api/conferences/userFuturConf/${id}`);
  };
  export const getPastLisConf = (id) => {
    return axios.get(`http://localhost:8080/api/conferences/userPastConf/${id}`);
  };
  export const getVilleLisConf = (ville) => {
    return axios.get(`http://localhost:8080/api/conferences/byVille/${ville}`);
  };
  export const getCategoryLisConf = (category) => {
    return axios.get(`http://localhost:8080/api/conferences/categorie/${category}`);
  };
  
  
  
  