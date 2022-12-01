import {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Providers = () => {

    const [stateProviders, setStateProviders] =useState();

    useEffect(() => {
        fetch("/get-providers")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateProviders(data.results)
            }
        })
        .catch(() => {
            setStateProviders("error")
        })
    },[])

    return ( 
        <Home>
            {!stateProviders ? 
                <LoadingCube/>
                :
                    <div>
                        <div>
                            <h2>Providers</h2>
                        </div>
                        <MapSelec>
                        {stateProviders.map((provider, index) => {
                            let backdrop_url = "https://image.tmdb.org/t/p/w300";
                            return(
                                <Posters key={index} to={`/providers/${provider.provider_id}`}>
                                    <img src={backdrop_url+provider.logo_path}/>
                                    <h3>{provider.provider_name}</h3>
                                </Posters>
                                )
                            })}
                        </MapSelec>
                    </div>
            }
        </Home>
    )
}

const Home = styled.div`
margin: 5% 8%;
display: flex;
flex-direction: row;
font-family: 'Indie Flower', cursive;
h2{
    font-size: 40px;
    border-bottom: 2px solid black;
}
`;

const Posters = styled(Link)`
    all: unset;
    width: 300px;
    margin: 0px;
    padding: 0px;
    height: 400px;
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
    }
    h3{
        font-size: 30px;
        width: 280px;
        margin-left: 10px;
        border-bottom: 1px solid black;
    }
`;

const MapSelec = styled.div`
    padding-top: 50px;
    display: grid;
    grid-template-columns: 300px 300px 300px 300px 300px;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 20px;
    height: fit-content;
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
    
    export default Providers;