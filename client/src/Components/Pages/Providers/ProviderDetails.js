import {useEffect, useState} from "react";
import styled from "styled-components";
import { useParams} from "react-router-dom";

const ProvidersDetails = () => {
    const {id} = useParams()
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
            <Err>
                <LoadingCube/>
            </Err>
                :
                    <div>
                        <div>
                            <h2>Provider</h2>
                        </div>
                        <Logo>
                        {stateProviders.map((provider) => {
                            let backdrop_url = "https://image.tmdb.org/t/p/w300";
                            if(id == provider.provider_id){
                            return(
                                <Posters key={Math.floor(Math.random() * 140000000000)}>
                                    <img src={backdrop_url+provider?.logo_path}/>
                                    <h3>{provider.provider_name}</h3>
                                </Posters>
                                )
                            }else{
                                return <div key={Math.floor(Math.random() * 140000000000)}>{""}</div>
                            }
                            })}
                        </Logo>
                    </div>
            }
        </Home>
    )
}

const Logo = styled.div`
    padding-bottom: 200px;
`;

const Home = styled.div`
margin: 5% 8%;
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

const Posters = styled.div`
    all: unset;
    width: 300px;
    margin: 0px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50px;
    border-top-right-radius:50px;
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
        width: fit-content;
        border-bottom: 1px solid black;
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

export default ProvidersDetails;