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
                        {stateProviders.map((provider) => {
                            let backdrop_url = "https://image.tmdb.org/t/p/w300";
                            return(
                                <Posters key={Math.floor(Math.random() * 140000000000)} to={`/providers/${provider.provider_id}`}>
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
font-family: 'Montserrat Alternates', sans-serif;
h2{
    font-size: 40px;
    border-bottom: 1px solid #fffcf2;
    color: #fffcf2;
    width: fit-content;
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
    align-items: center;
    border-radius: 50px;
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
        border-top-right-radius:50px;
        box-shadow: 0px 10px 10px;
    }
    h3{
        font-size: 30px;
        width:fit-content;
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