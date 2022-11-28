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
                console.log(data.genres)
            }
        })
        .catch(() => {
            setStateMood("error")
        })
    },[])

    return ( 
        <Home>
            {!stateMood ? 
            <LoadingCube/>
        :
            <div>
                <div>
                    <h2>Moods</h2>
                </div>
                <MapSelec>
                {stateMood.map((mood, index) => {
                    return(
                        <div key={index}>
                                <Mood to={`/mood/${mood.id}`}><h4>{mood.name}</h4></Mood>
                            </div>
                    )
                })}
                </MapSelec>
            </div>
            }
        </Home>
    )
    }

const Home = styled.div`
margin: 5% 6%;
display: flex;
flex-direction: row;
font-family: 'Indie Flower', cursive;
h2{
    font-size: 40px;
    border-bottom: 2px solid black;
}
`;

const MapSelec = styled.div`
    padding-top: 50px;
    display: grid;
    grid-template-columns: 400px 400px 400px 400px;
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
    border-top-right-radius:50%;
    box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
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
                transition: 0.2s;
                border-bottom: 3px solid red;
                border-left: 1px solid red;
                border-right: 1px solid red;
                border-radius: 50%;
                width: 300px;
            }
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
    
    export default Moods;