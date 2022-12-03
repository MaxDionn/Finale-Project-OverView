import {Link, NavLink, useParams} from "react-router-dom"
import styled from "styled-components";
import {GiBodySwapping} from "react-icons/gi";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    //const {id} = useParams()
    const {user} = useAuth0()
    return (
        <Head>
            <StyleLink to={"/movies"}>Movies</StyleLink>
            <StyleLink to={"/tvShows"}>Tv Shows</StyleLink>
            <StyleLink to={"/actors"}>Actors</StyleLink>
            <StyleLink to={"/"}><h1>B. View</h1></StyleLink>
            <StyleLink to={"/moods"}>Genres</StyleLink>
            <StyleLink to={"/providers"}>Providers</StyleLink>
            <StyleLink to={"/about"}>About</StyleLink>
            <StyleLink to={"/login"}>Log</StyleLink>
            <ProfileLink to={`/profile/${user?.name}`}>
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
        border-bottom: 1px solid white;
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
        border-bottom: 1px solid white;
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