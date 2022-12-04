import {useEffect, useState} from "react";
import styled from "styled-components";
import {Link, useParams} from "react-router-dom";

const MoodsTvDetails = () => {
    let backdrop_url = "https://image.tmdb.org/t/p/w500";
    const {id} = useParams()

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

    const [stateRated, setStateRated] =useState();

useEffect(() => {
        fetch("/get-tv-topRated")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateRated(data.results)
            }
        })
        .catch(() => {
            setStateRated("error")
        })
    },[])

    const [stateLatest, setStateLatest] =useState();

    useEffect(() => {
        fetch("/get-tv-latest")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateLatest(data)
            }
        })
        .catch(() => {
            setStateLatest("error")
        })
    },[])

return (
    <Home>
            {!stateTv || !stateRated || !stateLatest ? 
            <Err>
                <LoadingCube/>
            </Err>
            :
            <div>
                <All>
                    <div>
                        <Title>
                    <h2>Popular Tv Shows</h2>
                    </Title>
                    {stateTv.map((itemTv) => {
                        return (
                            <div key={Math.floor(Math.random() * 140000)}>
                            {itemTv.genre_ids.map((genre2) => {
                            if(id == genre2){
                                return (
                                <Casting key={Math.floor(Math.random() * 140000)} to={`/tvShows/${itemTv.id}`}>
                                    {itemTv.poster_path &&
                                    <img src={backdrop_url+itemTv.poster_path}/>}
                                    <div>
                                        <h3>{itemTv.name}</h3>
                                        <p>Rate : <span>{Math.floor(itemTv.vote_average)}</span></p>
                                        <p>Release : {itemTv.first_air_date}</p>
                                    </div>
                                </Casting>
                                )
                            }else{
                                return <div key={Math.floor(Math.random() * 140000)}>{""}</div>
                            }
                        })}
                        </div>
                        )
                    })}
                </div>
                <Right>
                <Title>
                <h2>Top Rated Tv Shows</h2>
                </Title>
                    {stateRated.map((itemTv2) => {
                        return (
                            <div key={Math.floor(Math.random() * 140000)}>
                            {itemTv2.genre_ids.map((genre2) => {
                            if(id == genre2){
                                return (
                                <Casting key={Math.floor(Math.random() * 140000)} to={`/tvShows/${itemTv2.id}`}>
                                    {itemTv2.poster_path &
                                    <img src={backdrop_url+itemTv2.poster_path}/>}
                                    <div>
                                        <h3>{itemTv2.name}</h3>
                                        <p>Rate : <span>{Math.floor(itemTv2.vote_average)}</span></p>
                                        <p>Release : {itemTv2.first_air_date}</p>
                                    </div>
                                </Casting>
                                )
                            }else{
                                return <div key={Math.floor(Math.random() * 140000)}>{""}</div>
                            }
                        })}
                        </div>
                        )
                    })}
                </Right>
                <Right>
                <Title>
                <h2>Latest Tv Shows</h2>
                </Title>
                    {stateLatest.genres.map((genre2) => {
                            if(id == genre2){
                                return (
                                <Casting key={Math.floor(Math.random() * 140000)} to={`/tvShows/${stateLatest.id}`}>
                                    {stateLatest.poster_path &&
                                    <img src={backdrop_url+stateLatest.poster_path}/>}
                                    <div>
                                        <h3>{stateLatest.name}</h3>
                                        <p>Rate : <span>{Math.floor(stateLatest.vote_average)}</span></p>
                                        <p>Release : {stateLatest.first_air_date}</p>
                                    </div>
                                </Casting>
                                )
                            }else{
                                return <div key={Math.floor(Math.random() * 140000)}>{""}</div>
                            }
                        })
                    }
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
border-left: 1px dotted black;
`;

const Title = styled.div`
display: flex;
justify-content: space-evenly;
width: 400px;
`;

const All = styled.div`
display: flex;
`;

const Home = styled.div`
margin: 5% 3%;
display: flex;
flex-direction: row;
font-family: 'Montserrat Alternates', sans-serif;
h2{
    font-size: 40px;
    border-bottom: 1px solid #fffcf2;
    color: #fffcf2;
}
`;

const Casting = styled(Link)`
    all: unset;
    width: 400px;
    height:200px;
    display: flex;
    border-bottom: 10px solid #252422;
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

export default MoodsTvDetails;