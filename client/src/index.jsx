import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import AdoptionFeed from './components/AdoptionFeed.jsx';
import PostFeed from './components/PostFeed.jsx';
import Search from './components/Search.jsx';
import PostForms from './components/PostForms.jsx';
import PetView from './components/PetView.jsx';
import TheWheel from './components/V2/Roulette/TheWheel.jsx';
import RoulettePick from './components/V2/Roulette/RoulettePick.jsx';
import { UserContextProvider } from './UserContext.jsx';
import PetMap from './components/V2/PetMap/PetMap.jsx';
import BreedInfo from './components/v2/BreedInfo.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<Search />} />
          <Route path="home" element={<AdoptionFeed />} />
          <Route path="postfeed" element={<PostFeed />} />
          <Route path="postforms" element={<PostForms />} />
          <Route path="petview" element={<PetView />} />
          <Route path="breedInfo" element={<BreedInfo />} />
          <Route path="roulette" element={<RoulettePick />} />
          <Route path="wheel" element={<TheWheel />} />
          <Route path="PetMap" element={<PetMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserContextProvider>,
);
