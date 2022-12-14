import {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import ErrorPage from "../ErrorPage";



const HomePage = () => {
    const [state, setState] =useState();

    useEffect(() => {
        fetch("/get-movie-popular")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setState(data.results)
            }
        })
        .catch(() => {
            setState("error")
        })
    },[])

    const [stateTv, setStateTv] =useState();

    useEffect(() => {
        fetch("/get-tv-popular")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateTv(data.results)
            }
        })
        .catch(() => {
            setStateTv("error")
        })
    },[])

    if (stateTv === "error") {
        return <ErrorPage/>
    }else{

        return (
            <Home>
            {!state || !stateTv ? 
            <Err>
                <LoadingCube/>
            </Err>
            :
            <div>
                <Title>
                    <h2>Most Popular Movies</h2>
                    <h2>Most Popular Tv Shows</h2>
                </Title>

                <All>
                    <MapSelec>
                    {state.map((item, index) => {
                        let backdrop_url = "https://image.tmdb.org/t/p/w500";
                        return (
                            <Posters key={index} to={`/movies/${item.id}`}>
                                {item.backdrop_path && 
                                <img src={backdrop_url+item.backdrop_path}/>}
                                <p>{Math.floor(item.vote_average)}/10</p>
                                <h3>{item.title}</h3>
                                <h5>Release : {item.release_date}</h5>
                                </Posters>
                            )
                        })}
                    </MapSelec>
                    <MapSelec2>
                    {stateTv.map((tv, index) => {
                        let backdrop_url = "https://image.tmdb.org/t/p/w500";
                        return (
                            <Posters key={index} to={`/tvShows/${tv.id}`}>
                                {tv.backdrop_path && 
                                <img src={backdrop_url+tv.backdrop_path}/>}
                                <p>{Math.floor(tv.vote_average)}/10</p>
                                <h3>{tv.name}</h3>
                                <h5>Release : {tv.first_air_date}</h5>
                            </Posters>
                            )
                        })}
                    </MapSelec2>
                </All>
            </div>
            }
        </Home>
    )
}
}

const Err = styled.div`
    background-color: #252422;
    height: 1000px;
`;

const All = styled.div`
display: flex;
`;

const Title = styled.div`
display: flex;
justify-content: space-around;
`;

const Home = styled.div`
margin: 5% 3%;
display: flex;
flex-direction: row;
font-family: 'Montserrat Alternates', sans-serif;
h2{
    font-size: 40px;
    border-bottom: 1px solid #fffcf2;
    width: fit-content;
    color: #fffcf2;
}
`;

const Posters = styled(Link)`
    all: unset;
    height: 400px;
    display: flex;
    flex-direction: column;
    border-radius: 50px;
    border-top-right-radius:50%;
    background-color: #ccc5b9;
    cursor: pointer;
    :hover{
        img{
            box-shadow:#ccc5b9 0px 10px 5px;
            transition: 0.3s;
        }
    }
    img{
        border-bottom-left-radius:50%;
        border-top-right-radius:50%;
        box-shadow: 0px 10px 10px;
    }
    h3{
        font-size: 30px;
        border-bottom: 1px solid black;
        margin-top: -30px;
        width: fit-content;
        margin-left: 10px;
    }
    h5{
        all: unset;
        font-size: 20px;
        margin-top: -20px;
        font-weight: 600;
        border-bottom: 1px solid black;
        width: fit-content;
        margin-left: 10px;
    }
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
`;

const MapSelec = styled.div`
    display: grid;
    grid-template-columns: 400px 400px ;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 20px 30px;
    height: fit-content;
`;

const MapSelec2 = styled.div`
    padding-left: 50px;
    border-left: 1px dotted black;
    margin-left: 50px;
    display: grid;
    grid-template-columns: 400px 400px ;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 20px 30px;
    height: fit-content;
`;

const LoadingCube = styled.div`
    margin-top: 400px;
    margin-left: 400px;
    width: 20px;
    height: 20px;
    background-color: #ccc5b9;
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

export default HomePage;