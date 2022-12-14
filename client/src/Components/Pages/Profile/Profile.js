import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {

    const [stateProfile, setStateProfile] = useState()
    const {id} = useParams();

    useEffect(() => {
        fetch(`/get-user/${id}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500) {
                return new Error(data.message)
            }
            else{
                setStateProfile(data.data)
                console.log(data.data)
            }
        })
        .catch((err) => {
            window.alert(err)
        })
    },[])

        return (
            <Home>
            {!stateProfile ? 
                <div>
            <h4>Please sign up or log in</h4>
            <h4>to your account</h4>
            <LoadingCube/>
            </div>
            : 
            <div>
                
                <h2> Profile of : </h2>
                <h3><span>-</span>{id}<span>-</span></h3>
                <Section>    
                    <h1>Favorite Actors : </h1>
                    {stateProfile.actorId.map((actor)=> {
                        return(
                            <Posters to={`/actors/${actor}`} key={Math.floor(Math.random() * 140000000000)}>
                                <p><span>-</span> {actor} <span>-</span></p>
                            </Posters>
                        )
                    })}
                </Section>
                <Section>  
                    <h1>Favorite Movies : </h1>  
                    {stateProfile.movieId.map((movie)=> {
                        return(
                            <Posters to={`/movies/${movie}`} key={Math.floor(Math.random() * 140000000000)}>
                                <p><span>-</span> {movie} <span>-</span></p>
                            </Posters>
                        )
                    })}
                </Section>
                <Section>    
                    <h1>Favorite Tv Shows : </h1>
                    {stateProfile.tvShowId.map((tvShow)=> {
                        return(
                            <Posters to={`/tvShows/${tvShow}`} key={Math.floor(Math.random() * 140000000000)}> 
                                <p><span>-</span> {tvShow} <span>-</span></p>
                            </Posters>
                        )
                    })}
                </Section>
            </div>
            }
            </Home>
        )
}

const Section = styled.div`
border-bottom: 1px solid #fffcf2;
`;

const Posters = styled(Link)`
all: unset;
font-size: 30px;
    span{
        font-size: 50px;
        color: transparent;
    }
        :hover{
            cursor: pointer;
            span{
                color: red;
                }
        }
`;

const Home = styled.div`
height: 1000px;
margin: 5% 40%;
text-align: center;
font-family: 'Montserrat Alternates', sans-serif;
color: #fffcf2;
h2{
    font-size: 40px;
    width: fit-content;
    margin-left: 25%;
    margin-top: -50px;
}
h3{
    font-size: 40px;
    margin-top: -20px;
    margin-bottom: 50px;
    border-bottom: 1px solid lightgray;
    span{
        color: red;
        font-size: 50px;
        }
}
h4{
    font-size: 40px;
}
`;

const Err = styled.div`
    background-color: #252422;
    height: 1000px;
`;

const LoadingCube = styled.div`
margin: 6% 85%;
    width: 20px;
    height: 20px;
    position: absolute;
    animation: mymove 1s infinite;
    border-radius: 50%;
    @keyframes mymove{
        0%   {top: 0px; left: 0px; background: red;}
        25%  {top: 0px; left: 50px; background: blue;}
        50%  {top: 50px; left: 50px; background: yellow;}
        75%  {top: 50px; left: 0px; background: green;}
        100% {top: 0px; left: 0px; background: red;}
    }
    `;

    export default Profile;