import {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Moods = () => {
    const [stateMood, setStateMood] =useState();

    useEffect(() => {
        fetch("/get-moods")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateMood(data.genres)
            }
        })
        .catch(() => {
            setStateMood("error")
        })
    },[])

    const [stateTvMood, setStateTvMood] =useState();

    useEffect(() => {
        fetch("/get-Tvmoods")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateTvMood(data.genres)
            }
        })
        .catch(() => {
            setStateTvMood("error")
        })
    },[])

    return ( 
        <Home>
            {!stateMood || !stateTvMood ? 
            <Err>
                <LoadingCube/>
            </Err>
        :
            <div>
                    <Title>
                        <h2>Movie Genres</h2>
                        <h2>Tv Shows Genres</h2>
                    </Title>
                    <All>
                        <MapSelec>
                        {stateMood.map((mood) => {
                            return(
                                <div key={Math.floor(Math.random() * 140000)}>
                                        <Mood to={`/mood/${mood.id}`}><h4>{mood.name}</h4></Mood>
                                    </div>
                            )
                        })}
                        </MapSelec>
                        <Right>
                        <MapSelec>
                        {stateTvMood.map((mood2) => {
                            return(
                                <div key={Math.floor(Math.random() * 140000)}>
                                        <Mood to={`/moodTv/${mood2.id}`}><h4>{mood2.name}</h4></Mood>
                                    </div>
                            )
                        })}
                        </MapSelec>
                        </Right>
                    </All>
            </div>
            }
        </Home>
    )
    }
const Right = styled.div`
    margin-left: 10%;
    padding-left: 10%;
    border-left:  1px dotted black;
`;

const Title = styled.div`
display: flex;
justify-content: space-between;
margin-left: 20%;
`;

const All = styled.div`
display: flex;
`;

const Home = styled.div`
margin: 5% 6%;
display: flex;
flex-direction: row;
font-family: 'Montserrat Alternates', sans-serif;
h2{
    font-size: 40px;
    border-bottom: 2px solid #fffcf2;
    color: #fffcf2;
}
`;

const MapSelec = styled.div`
    padding-top: 50px;
    display: grid;
    grid-template-columns: 300px 300px ;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 50px;
    height: fit-content;
`;

    const Mood = styled(Link)`
    all: unset;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 50px;
    background-color: #ccc5b9;
    cursor: pointer;
    font-size: 30px;
    align-items: center;
        h4{
            margin-top: 0px;
            width: fit-content;
            border-bottom: 3px solid transparent;
        }
        :hover{
            h4{
                transition: 0.5s;
                border-bottom: 1px solid red;
                width: fit-content;
            }
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
    
    export default Moods;