import { ThemeProvider, createTheme } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary& .Main,
//       main: '#ff4400',
//       // dark: will be calculated from palette.primary& .Main,
//       // contrastText: will be calculated to contrast with palette.primary& .Main
//     },
//     secondary: {
//       light: '#0066ff',
//       main: '#0044ff',
//       // dark: will be calculated from palette.secondary& .Main,
//       contrastText: '#ffcc00',
//     },
//      // Provide every color token (light, main, dark, and contrastText) when using
//      // custom colors for props in Material UI's components.
//      // Then you will be able to use it like this: `<Button color="custom">`
//      // (For TypeScript, you need to add module augmentation for the `custom` value)
//     custom: {
//       light: '#ffa726'
//       main: '#f57c00',
//       dark: '#ef6c00',
//       contrastText: 'rgba(0, 0, 0, 0.87)',
//     },
//     // Used by `getContrastText()` to maximize the contrast between
//     // the background and the text.
//     contrastThreshold: 3,
//     // Used by the functions below to shift a color's luminance by approximately
//     // two indexes within its tonal palette.
//     // E.g., shift from Red 500 to Red 300 or Red 700.
//     tonalOffset: 0.2,
//   },
// });

//   Card
//   CardActions
//   CardContent
//   CardMedia
//   Button contained outlined
//   Typography h1 h5 body2
//   Container
//   LinearProgress
//   TextField standard
//   Grid
//   InputLabel
//   Select
//   MenuItem
//   Tabs
//   Tab

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
  '& .MuiCardActions-root': {},
  '& .MuiCardContent-root': {},
  '& .MuiCardMedia-root': {},
  '& .MuiButton-root': {
    color: theme.palette.primary.contrastText,
    // '&:hover': {
    //   color: 'yellow',
    // },
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
    // mt: '20px',
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
    // '& .MuiTextField-root': { width: '280px' },
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
    // m: 'auto',
    // 'margin-left': 'auto', 'margin-right': 'auto',
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
  '.MuiBox-root': {
    // borderRadius: '10px',
    // padding: '5px',
    // maxWidth: 700,
    // '& .MuiTextField-root': { width: '280px' },
    // m: 'auto',
    // backgroundColor: theme.palette.secondary.main,
  },
};

export { styles, theme };
