import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "../../ErrorPage";

const AllTvShows = () => {
    const [stateLatest, setStateLatest] = useState()
    const [statePop, setStatePop] = useState()
    const [stateTop, setStateTop] = useState()
    let backdrop_url = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
    
        fetch("/get-tv-latest")
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
                setStateLatest(data)
            }
        })
        .catch(() => {
            setStateLatest("error")
        })
    
        fetch("/get-tv-popular")
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
                setStatePop(data.results)
            }
        })
        .catch(() => {
            setStatePop("error")
        })

        fetch("/get-tv-topRated")
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
                setStateTop(data.results)
            }
        })
        .catch(() => {
            setStateTop("error")
        })
    },[])

    if (statePop === "error") {
        return <ErrorPage/>
    }else{
        
        return (
            <Home>
            {!stateLatest || !statePop || !stateTop  ? 
            <Err>
                <LoadingCube/>
            </Err>
                :
                <div>
                    <All>
                        <MapSelec>
                        <Title>
                            <h2>Latest Movies</h2>
                        </Title>
                            <Posters to={`/tvShows/${stateLatest.id}`}>
                                {stateLatest.poster_path && 
                                <img src={backdrop_url+stateLatest.poster_path}/>}
                                <div>
                                    <h3>{stateLatest.name}</h3>
                                    <p>Rated : <span>{Math.floor(stateLatest.vote_average)}</span></p>
                                    <p>Release : {stateLatest.first_air_date}</p>
                                </div>
                            </Posters>
                        </MapSelec>
                        <MapSelec>
                        <Title>
                        <h2>Popular Tv Shows</h2>
                        </Title>
                                {statePop.map((pop) => {
                                    return (
                                        <Posters key={Math.floor(Math.random() * 140000)} to={`/tvShows/${pop.id}`}>
                                            {pop.poster_path &&
                                            <img src={backdrop_url+pop.poster_path}/>}
                                            <div>
                                                <h3>{pop.name}</h3>
                                                <p>Rated : <span>{Math.floor(pop.vote_average)}</span></p>
                                                <p>Release : {pop.first_air_date}</p>
                                            </div>
                                        </Posters>
                                    )
                                })}
                        </MapSelec>
                        <MapSelec>
                        <Title>
                        <h2>Top Rated Movies</h2>
                        </Title>    
                            {stateTop.map((top) => {
                                return (
                                    <Posters key={Math.floor(Math.random() * 140000)} to={`/tvShows/${top.id}`}>
                                        {top.poster_path &&
                                        <img src={backdrop_url+top.poster_path}/>}
                                        <div>
                                            <h3>{top.name}</h3>
                                            <p>Rated : <span>{Math.floor(top.vote_average)}</span></p>
                                            <p>Rlease : {top.first_air_date}</p>
                                        </div>
                                    </Posters>
                                )
                            })}
                        </MapSelec>
                    </All>
                </div>
            }
            </Home>
        )
    }
}

const All = styled.div`
display: flex;
`;

const Title = styled.div`
display: flex;
justify-content: space-between;
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
    display: flex;
    flex-direction: column;
    color: #fffcf2;
}
`;

const MapSelec = styled.div`
    display: grid;
    grid-template-columns: 400px ;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 20px;
    height: fit-content;
    margin: 0% 7%;
`;

const Posters = styled(Link)`
    all: unset;
    width: 400px;
    height:190px;
    display: flex;
    flex-direction: row;
    border-radius: 50px;
    background-color: #ccc5b9;
    overflow: hidden;
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
        width: fit-content;
        height: 150px;
    }
    h3{
        font-size: 30px;
        border-bottom: 1px solid black;
        width: fit-content;
        margin-left: 10px;
        margin-top: 10px;
    }
    p{
        font-size: 20px;
        margin-top: -10px;
        margin-left: 10px;
        font-weight: 600;
        border-bottom: 1px solid black;
        width: fit-content;
    }
    span{
        border: 3px solid red;
        border-radius: 50%;
        padding: 5px;
    }
`;

const Err = styled.div`
    background-color: #252422;
    height: 1000px;
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

    export default AllTvShows;