import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B7D5E6',
      light: '#B7C4CF',
      contrastText: '#375E3D',
    },
    secondary: {
      main: '#EEE3CB',
      dark: '#967E76',
    },
  },
});

const styles = {
  '& .MuiCard-root': {},
  '& .MuiCardActions-root': {
    bgcolor: '#A64B2A',
  },
  '& .MuiCardContent-root': {},
  '& .MuiCardMedia-root': {},
  '& .MuiButton-root': {
    color: theme.palette.primary.contrastText,
    '&:active': {
      color: theme.palette.primary.contrastText,
    },
  },
  '& .MuiButton-contained': {
    bgcolor: '#5D473D',
    color: theme.palette.secondary.main,
    '&:hover': {
      bgcolor: '#695247',
    },
  },
  '& .MuiButton-outlined': {},
  '& .MuiTypography-h3': {
    textAlign: 'center',
    p: '20px',
    bgcolor: theme.palette.primary.light,
    width: '40vw',
    mx: 'auto',
    mb: '20px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '10px',
  },
  '& .MuiTypography-h5': {},
  '& .MuiTypography-body2': {},
  '& .MuiContainer-root': {},
  '& .MuiLinearProgress-root': {},
  '& .MuiTextField-root': {},
  '& .MuiGrid-root': {},
  '& .MuiGrid-container': {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '10px',
    mx: 'auto',
    mt: 'auto',
    p: '20px',
    backgroundColor: theme.palette.secondary.main,
  },
  '& .MuiGrid-item': {},
  '& .MuiInputLabel-root': {},
  '& .MuiSelect-select': {
    width: 100,
    maxWidth: 200,
  },
  '& .MuiMenuItem-root': {},

  // & .Mui-selected styles the currently selected tab of a tabs group
  '& .MuiTabs-root': {
    bgcolor: theme.palette.secondary.dark,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '5px',
    display: 'inline-flex',
  },

  // color is for text color
  // &:hover is for style on hovering
  // backgroundColor is for background color
  '& .MuiTab-root': {
    color: 'black',
    bgcolor: theme.palette.primary.light,
    border: '2px solid black',
    borderRadius: '10px',
    mx: '20px',
    my: '10px',
    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
  '.MuiBox-root': {},
  '& .MuiList-root': {
    bgcolor: '#5D473D',
    color: theme.palette.secondary.main,
  },
  '& .MuiListItem-root': {
    bgcolor: '#5D473D',
    color: theme.palette.secondary.main,
  },
  '& .MuiListItemText-root': {
    bgcolor: '#5D473D',
    color: theme.palette.secondary.main,
  },
};

export { styles, theme };
