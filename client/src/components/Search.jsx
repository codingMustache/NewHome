import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  TextField,
  ThemeProvider,
  createTheme,
  Grid,
  Autocomplete,
} from '@mui/material';
import Adoption from './Adoption.jsx';
import styles from '../styles.jsx';
import { UserContext } from '../UserContext.jsx';
import { breeds } from '../breeds.js';

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

function Search() {
  const { search, setSearch } = useContext(UserContext);
  const [breed, setVal] = useState(() => (search ? search.breed : ''));
  const [hairLength, setHairLength] = useState(() => (search ? search.hairLength : ''));
  const [species, setSpecies] = useState(() => (search ? search.species : ''));
  const [age, setAge] = useState(() => (search ? search.age : ''));
  const [gender, setGender] = useState(() => (search ? search.gender : ''));
  const [size, setSize] = useState(() => (search ? search.size : ''));
  const [submitted, setSubmit] = useState(() => false);
  const [pets, setPets] = useState([]);

  const submit = (event) => {
    event.preventDefault();
    const searchBy = {
      breed,
      hairLength,
      species,
      age,
      gender,
      size,
    };
    setSearch(searchBy);
    const config = {
      method: 'post',
      url: 'http://localhost:8080/feed/api/search',
      headers: {
        'Content-Type': 'application/json',
      },
      data: searchBy,
    };
    axios(config)
      .then((response) => {
        submitUpdate();
        setPets(response.data.animals);
      })
      .catch((error) => {
        console.error(error);
        alert(`${error.response.data} / Invalid Breed`);
      });
  };
  const renderPets = () => (
    <Grid
      container
      xs={8}
      xl={8}
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={8}
    >
      {pets.map((animal) => (
        <Grid item key={JSON.stringify(animal)} xs={6} xl={6}>
          <Adoption animalData={animal} />
        </Grid>
      ))}
    </Grid>
  );
  const breedUpdate = (event, value) => {
    setVal(value);
  };
  const submitUpdate = () => {
    setSubmit(!submitted);
  };
  const hairUpdate = (event) => {
    setHairLength(event.target.value);
  };
  const speciesUpdate = (event) => {
    setSpecies(event.target.value);
  };
  const ageUpdate = (event) => {
    setAge(event.target.value);
  };
  const genderUpdate = (event) => {
    setGender(event.target.value);
  };
  const sizeUpdate = (event) => {
    setSize(event.target.value);
  };

  // what renders the component
  return (
    <Box>
      <Grid
        component="form"
        onSubmit={submit}
        container
        spacing={2}
        xs={6}
        sx={{ mb: '20px' }}
      >
        <Grid item xs={12}>
          <Autocomplete
            value={breed}
            onChange={breedUpdate}
            options={breeds}
            sx={{ width: '20vw' /* mx: 'auto' to center breed field input */ }}
            renderInput={(breeds) => (
              <TextField
                {...breeds}
                label="Breed"
                type="text"
                InputLabelProps={{
								  style: { color: 'primary.contrastText' },
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="Hair-Length">Hair Length</InputLabel>
          <Select
            labelId="Hair-Length"
            label="Hair length"
            value={hairLength}
            onChange={hairUpdate}
          >
            <MenuItem value="short">Short</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="long">Long</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="Species">Species</InputLabel>
          <Select
            labelId="Species"
            label="Species"
            value={species}
            onChange={speciesUpdate}
          >
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="dog">Dog</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="Age">Age</InputLabel>
          <Select labelId="Age" label="Age" value={age} onChange={ageUpdate}>
            <MenuItem value="baby">Baby</MenuItem>
            <MenuItem value="young">Young</MenuItem>
            <MenuItem value="adult">Adult</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="Gender">Gender</InputLabel>
          <Select
            labelId="Gender"
            label="Gender"
            value={gender}
            onChange={genderUpdate}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="Size">Size</InputLabel>
          <Select
            labelId="Size"
            label="Size"
            value={size}
            onChange={sizeUpdate}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
            <MenuItem value="xlarge">X-Large</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
      {submitted ? renderPets() : <div />}
    </Box>
  );
}
export default Search;
