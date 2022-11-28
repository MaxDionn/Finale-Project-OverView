import {Link, NavLink} from "react-router-dom"
import styled from "styled-components";
import SearchBar from "./SearchBar";
import {GiBodySwapping} from "react-icons/gi";

const Header = () => {
    return (
        <Head>
            <SearchBar/>
            <StyleLink to={"/movies"}>Movies</StyleLink>
            <StyleLink to={"/tvShows"}>Tv Shows</StyleLink>
            <StyleLink to={"/actors"}>Actors</StyleLink>
            <StyleLink to={"/"}><h1>W.M.T.</h1></StyleLink>
            <StyleLink to={"/moods"}>Moods</StyleLink>
            <StyleLink to={"/providers"}>Providers</StyleLink>
            <StyleLink to={"/about"}>About</StyleLink>
            <ProfileLink to={"/profile"}>
            <GiBodySwapping size={50}style={{background: "transparent", color:"white"}} />
            </ProfileLink>
        </Head>
    )
}

const ProfileLink = styled(Link)`
padding: 0px 10px;
:hover{
        cursor: pointer;
        border-radius: 50%;
        border-bottom: 7px solid white;
        border-left: 3px solid white;
        border-right: 3px solid white;
        transition: 0.2s;
    }
`;

const StyleLink = styled(NavLink)`
position: relative;
font-size: 30px;
padding: 10px;
color: white;
    :hover{
        cursor: pointer;
        border-radius: 50%;
        border-bottom: 7px solid white;
        border-left: 3px solid white;
        border-right: 3px solid white;
        transition: 0.2s;
    }

    h1{
        font-size: 50px;
        font-weight: lighter;
        color: white;
        padding: 0px 30px;
    }
`;

const Head = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
background-image: url("/seats.jpg");
font-family: 'Lobster', cursive;
box-shadow: rgba(149, 157, 165, 1.2) 0px 50px 70px;
border-radius: 50%;
`;



export default Header;