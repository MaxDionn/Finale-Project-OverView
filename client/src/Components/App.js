import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from "./Header";
import AllMovies from "./Pages/Movies/AllMovies";
import AllTvShows from "./Pages/TvShows/AllTvShows";
import Actors from "./Pages/Actors/Actors";
import HomePage from "./Pages/HomePage";
import Moods from "./Pages/Mood/Moods";
import Providers from "./Pages/Providers/Providers";
import About from "./Pages/About";
import Login from "./Pages/Profile/Login";
import Profile from "./Pages/Profile/Profile";
import MoviesDetails from "./Pages/Movies/MoviesDetails";
import TvShowsDetails from "./Pages/TvShows/TvShowsDetails";
import ProvidersDetails from "./Pages/Providers/ProviderDetails";
import ActorsDetails from "./Pages/Actors/ActorsDetails";
import MoodsDetails from "./Pages/Mood/MoodsDetails";
import MoodsTvDetails from "./Pages/Mood/MoodsTvDetails";
import SearchBar2 from "./SearchBar2";
import styled from "styled-components";

const App = () =>  {
  return (
    <All>
    <Router>
      <Header/>
      <SearchBar2/>
      <Routes>
        <Route path="/movies" element={<AllMovies />}/>
        <Route path="/tvShows" element={<AllTvShows />}/>
        <Route path="/actors" element={<Actors />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/moods" element={<Moods />}/>
        <Route path="/providers" element={<Providers />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/movies/:id" element={<MoviesDetails/>}/>
        <Route path="/tvShows/:id" element={<TvShowsDetails/>}/>
        <Route path="/providers/:id" element={<ProvidersDetails />}/>
        <Route path="/actors/:id" element={<ActorsDetails />}/>
        <Route path="/mood/:id" element={<MoodsDetails />}/>
        <Route path="/moodTv/:id" element={<MoodsTvDetails />}/>
      </Routes>
    </Router>
    </All>
  );
}

const All = styled.div`
  background-color: #252422;
`;

export default App;
