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
            <StyleLink to={"/actors"}>Actors</StyleLink>
            <StyleLink to={"/moods"}>Genres</StyleLink>
            <StyleLink to={"/about"}>About</StyleLink>
            <StyleLink to={"/"}><h1>OverView</h1></StyleLink>
            <StyleLink to={"/tvShows"}>Tv Shows</StyleLink>
            <StyleLink to={"/providers"}>Providers</StyleLink>
            <StyleLink to={"/login"}>Log in</StyleLink>
            <ProfileLink to={`/profile/${user?.name}`}>
            <GiBodySwapping size={50}style={{background: "transparent", color:"white"}} />
            </ProfileLink>
        </Head>
    )
}

const ProfileLink = styled(Link)`
padding: 0px 20px;
:hover{
        cursor: pointer;
        border-bottom: 1px solid #fffcf2;
        transition: 0.4s;
    }
`;

const StyleLink = styled(NavLink)`
all: unset;
position: relative;
font-size: 30px;
padding: 10px;
color: #fffcf2;
    :hover{
        cursor: pointer;
        border-bottom: 1px solid #fffcf2;
        transition: 0.4s;
    }

    h1{
        all: unset;
        font-family: 'Secular One', sans-serif;
        font-size: 50px;
        color: white;
        padding: 0px 30px;
        border-radius: 50%;
        border-bottom: 1px solid #fffcf2;
        border-left: 3px solid #fffcf2;
        border-right: 3px solid #fffcf2;
    }
`;

const Head = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
background-image: url("/seats.jpg");
font-family: 'Montserrat Alternates', sans-serif;
`;



export default Header;