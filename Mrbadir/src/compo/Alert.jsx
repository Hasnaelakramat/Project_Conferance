import Alert from '@mui/material/Alert';

const CustomAlert = ({ severity , message}) => {
  return (
    <Alert severity={severity}  variant="outlined" >
      {message}
    </Alert>
  );
}

export default CustomAlert;
