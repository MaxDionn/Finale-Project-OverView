import {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "../../ErrorPage";
import { Favorite } from "../../Favorite/Favorite";
import { useAuth0 } from "@auth0/auth0-react";

const MoviesDetails = () => {
    const {id} = useParams()
    const [stateMovie, setStateMovie] =useState();
    let backdrop_url = "https://image.tmdb.org/t/p/w500";
    const {user} = useAuth0();

        const AddFavoriteMovie = (movieId) => {
    
        fetch(`/add-favorite/${user.name}`, {
            method: "POST",
            body: JSON.stringify({
            id: movieId
            }),
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
            if (data.status === 200) {
                window.alert("Added To db!");
                window.location.reload();
            } else {
                window.alert("Unable To Add To the db");
            }
        })
            .catch(() => {
            window.alert("Error, please try again.");
        });
        };

    useEffect(() => {
        fetch(`/get-movieById/${id}`)
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.status === 500){
                return new Error(data.message)
            }
            else{
                setStateMovie(data)
            }
        })
        .catch(() => {
            setStateMovie("error")
        })
    },[id])

    const [stateCredits, setStateCredits] =useState();

    useEffect(() => {
        fetch(`/get-movieById/${id}/credits`)
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.status === 500){
                return new Error(data.message)
            }
            else{
                setStateCredits(data)
            }
        })
        .catch(() => {
            setStateCredits("error")
        })
    },[id])

    const [stateSimilar, setStateSimilar] =useState();

    useEffect(() => {
        fetch(`/get-movieById/${id}/similar`)
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.status === 500){
                return new Error(data.message)
            }
            else{
                setStateSimilar(data.results)
            }
        })
        .catch(() => {
            setStateSimilar("error")
        })
    },[id])

    if (stateCredits  === "error") {
        return <ErrorPage/>
    }else{

        return ( 
            <Home>
            {!stateMovie || !stateCredits || !stateSimilar ? 
            <LoadingCube/>
            :
            <All>
                <Left>
                <Poster>
                    <div>
                    <img src={backdrop_url+stateMovie?.backdrop_path}/>
                    <Favorite movieId={stateMovie.id} AddFavoriteMovie={AddFavoriteMovie}/>
                    </div>
                    <Detail>
                        <h2>{stateMovie.title}</h2>
                        <h1>Release : {stateMovie.release_date}</h1>
                        <Genre>
                            <h1>moods : </h1>
                        {stateMovie.genres.map((item, index) => {
                            return <MoodLink key={index} to={`/mood/${item.id}`}>{item.name} ,</MoodLink>})}
                            </Genre>
                        <p>{stateMovie.runtime} min.</p>
                        <h5>Rate : </h5>
                        <p>{Math.floor(stateMovie.vote_average)}/10</p>
                        <h5> - {stateMovie.overview}</h5>
                    </Detail>
                </Poster>
                <div>
                    <div>
                        <h2>Cast : </h2>
                    </div>
                    <MapSelec>
                    {stateCredits.cast.map((cast, index2) => {
                        let backdrop_url = "https://image.tmdb.org/t/p/w500";
                        return (
                            <Casting key={index2} to={`/actors/${cast.id}`}>
                                <img src={backdrop_url+cast?.profile_path}/>
                                <div>
                                    <h3>{cast.name}</h3>
                                    <p>{cast.character}</p>
                                </div>
                            </Casting>
                        )
                    })}
                    </MapSelec>
                </div>
                </Left>
                <Right>
                    <div>
                        <h2>Similar Movies</h2>
                    {stateSimilar.map((similar, index3) => {
                        let backdrop_url = "https://image.tmdb.org/t/p/w500";
                        return (
                            <Casting key={index3} to={`/movies/${similar.id}`}>
                                <img src={backdrop_url+similar?.poster_path}/>
                                <div>
                                    <h3>{similar.title}</h3>
                                    <p><span>{Math.floor(similar.vote_average)}/10</span></p>
                                </div>
                            </Casting>
                        )
                    })}
                    </div>
                </Right>
            </All>
            }
        </Home>
    )
}
}

const Right = styled.div`
    margin-left: 5%;
`;

const All= styled.div`
display: flex;
`;

const Left = styled.div`
display: flex;
flex-direction: column;
`;

const MapSelec = styled.div`
    display: grid;
    grid-template-columns: 400px 400px 400px;
    text-align: center;
    align-items: center;
    gap: 20px;
    height: fit-content;
`;

const Casting = styled(Link)`
    all: unset;
    width: 400px;
    height:160px;
    display: flex;
    border-bottom: 5px solid lightgray;
    border-radius: 50px;
    border-top-right-radius:50%;
    box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
    cursor: pointer;
    :hover{
        img{
            box-shadow:rgba(149, 157, 165, 1.2) 0px 20px 70px;
            transition: 0.3s;
        }
    }
    img{
        border-bottom-left-radius:50%;
        border-top-right-radius:50%;
        box-shadow: 0px 10px 10px;
        width: fit-content;
        height: 150px;
    }
    h3{
        font-size: 30px;
        border-bottom: 1px solid black;
        width: fit-content;
        margin-left: 10px;
    }
    p{
        font-size: 20px;
        margin-top: -20px;
        margin-left: 10px;
        font-weight: 600;
    }
    span{
        font-size: 20px;
        margin-top:-30px;
        margin-left: 15px;
        text-align: left;
        border: 3px solid red;
        border-radius: 50%;
        width: fit-content;
        padding: 5px;
    }
`;

const Home = styled.div`
margin: 5% 5%;
font-family: 'Indie Flower', cursive;
h2{
    font-size: 40px;
    border-bottom: 2px solid black;
    width: fit-content;
    margin-left: 20px;
}
`;

const Genre = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const MoodLink = styled(Link)`
    all: unset;
    font-size: 20px;
    margin-left: 10px;
    font-weight: bolder;
        :hover::first-letter{
            color :red;
            font-size: 25px;
        }
`;

const Poster = styled.div`
    width: 1150px;
    height: 600px;
    display: flex;
    border-radius: 50px;
    border-top-right-radius:50%;
    box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
    img{
        border-radius: 50px;
        box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
        width: fit-content;
        height: fit-content;
    }
`;

const Detail = styled.div`
margin-left: 10px;
    p{
        font-size: 30px;
        margin-top:-30px;
        margin-left: 15px;
        text-align: left;
        border: 3px solid red;
        border-radius: 50%;
        width: fit-content;
        padding: 5px;
    }
    h5{
        font-size: 20px;
        width: fit-content;
        margin-top: -20px;
    }
    h2{
        width: fit-content;
    }
`;

    const LoadingCube = styled.div`
    margin-top: 400px;
    margin-left: 400px;
    width: 20px;
    height: 20px;
    background: purple;
    position: fixed;
    animation: mymove 1s infinite;
    border-radius: 50%;
    @keyframes mymove{
        0%   {top: 0px; left: 0px; background: red; transition:0.5s}
        25%  {top: 0px; left: 50px; background: blue; transition:0.5s}
        50%  {top: 50px; left: 50px; background: yellow; transition:0.5s}
        75%  {top: 50px; left: 0px; background: green; transition:0.5s}
        100% {top: 0px; left: 0px; background: red; transition:0.5s}
    }
    `;
    
    export default MoviesDetails;