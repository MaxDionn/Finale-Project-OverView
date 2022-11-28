import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Actors = () => {
    const [stateActors, setStateActors] =useState();

    useEffect(() => {
        fetch("/get-actors")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateActors(data.results)
                console.log(data.results)
            }
        })
        .catch(() => {
            setStateActors("error")
        })
    },[])

    return ( 
        <Home>
            {!stateActors ? 
            <LoadingCube/>
        :
            <div>
                <div>
                    <h2>Popular Actors</h2>
                </div>
                <MapSelec>
                {stateActors.map((actor, index) => {
                    let backdrop_url = "https://image.tmdb.org/t/p/w400";
                    return (
                        <div key={index}>
                            <ActorsInfo to={`/actors/${actor.id}`}>
                                <img src={backdrop_url+actor.profile_path}/>
                                <h3>- {actor.name} -</h3>
                            </ActorsInfo>
                            <div>
                                <h2>Known For </h2>
                                {actor.known_for.map((item) => {
                                    return(
                                        <Posters to={`/movies/${item.id}`}>
                                            <img src={backdrop_url+item.poster_path}/>
                                            <div>
                                                <h3>{item.title}</h3>
                                                <p><span>{item.vote_average}/10</span></p>
                                                <p>{item.release_date}</p>
                                            </div>
                                        </Posters>
                                    )
                                })}
                                <h5></h5>
                            </div>
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

    const ActorsInfo = styled(Link)`
    all: unset;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
        height: 400px;
        width: fit-content;
    }
    h3{
        font-size: 30px;
        width: 380px;
        margin-left: 10px;
        text-align: center;
    }
`;
const Posters = styled(Link)`
    all: unset;
    width: 400px;
    height:190px;
    display: flex;
    flex-direction: row;
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
        border: 3px solid red;
        border-radius: 50%;
        padding: 5px;
    }
`;
const MapSelec = styled.div`
    padding-top: 50px;
    display: grid;
    grid-template-columns: 400px 400px 400px 400px;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 20px;
    height: fit-content;
    h5{
        border-bottom: 5px solid black;
        border-radius: 70px;
        margin: 50px 0px;
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
    
    export default Actors;