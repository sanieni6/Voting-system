import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, Fragment } from 'react';


const SnackbarFeedback = ({openStatus, message}) => {

  const [open, setOpen] = useState(openStatus);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  return (
    <div>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  )
}

export default SnackbarFeedback