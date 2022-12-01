import {useEffect, useState} from "react";
import styled from "styled-components";
import {Link, useParams} from "react-router-dom";

const MoodsDetails = () => {
    let backdrop_url = "https://image.tmdb.org/t/p/w500";
    const [state, setState] =useState();
    const {id} = useParams()

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

    const [stateTop, setStateTop] =useState();

    useEffect(() => {
        fetch("/get-movie-topRated")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
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

    const [stateLatest, setStateLatest] =useState();

    useEffect(() => {
        fetch("/get-movie-topRated")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateLatest(data.results)
            }
        })
        .catch(() => {
            setStateLatest("error")
        })
    },[])

return (
    <Home>
            {!state || !stateTop || !stateLatest ? 
            <LoadingCube/>
            :
            <div>
                <All>
                    <div>
                    <Title>
                    <h2>Popular Movies</h2>
                    </Title>
                        {state.map((item, index) => {
                            return item.genre_ids.map((genre) => {
                                if(id == genre){
                                    return (
                                    <Casting key={index} to={`/movies/${item.id}`}>
                                        <img src={backdrop_url+item?.poster_path}/>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.release_date}</p>
                                            <p><span>{Math.floor(item.vote_average)}/10</span></p>
                                        </div>
                                    </Casting>
                                    )
                                }else{
                                    return <div>{""}</div>
                                }
                            })
                        })}
                    </div>
                    <Right>
                    <Title>
                    <h2>Top Rated Movies</h2>
                    </Title>
                        {stateTop.map((item2, index2) => {
                            return item2.genre_ids.map((genre) => {
                                if(id == genre){
                                    return (
                                    <Casting key={index2} to={`/movies/${item2.id}`}>
                                        <img src={backdrop_url+item2?.poster_path}/>
                                        <div>
                                            <h3>{item2.title}</h3>
                                            <p>{item2.release_date}</p>
                                            <p><span>{Math.floor(item2.vote_average)}/10</span></p>
                                        </div>
                                    </Casting>
                                    )
                                }else{
                                    return <div>{""}</div>
                                }
                            })
                        })}
                    </Right>
                    <Right>
                    <Title>
                    <h2>Latest Movies</h2>
                    </Title>
                        {stateLatest.map((item3, index3) => {
                            return item3.genre_ids.map((genre) => {
                                if(id == genre){
                                    return (
                                    <Casting key={index3} to={`/movies/${item3.id}`}>
                                        <img src={backdrop_url+item3?.poster_path}/>
                                        <div>
                                            <h3>{item3.title}</h3>
                                            <p>{item3.release_date}</p>
                                            <p><span>{Math.floor(item3.vote_average)}/10</span></p>
                                        </div>
                                    </Casting>
                                    )
                                }else{
                                    return <div>{""}</div>
                                }
                            })
                        })}
                    </Right>
                </All>
            </div>
}
</Home>
)
}

const Right = styled.div`
margin-left: 20%;
`;

const Title = styled.div`
display: flex;
justify-content: space-evenly;
`;

const All = styled.div`
display: flex;
`;

const Home = styled.div`
margin: 5% 3%;
display: flex;
flex-direction: row;
font-family: 'Indie Flower', cursive;
h2{
    font-size: 40px;
    border-bottom: 2px solid black;
}
`;

const Casting = styled(Link)`
    all: unset;
    width: 400px;
    height:200px;
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
        margin-top: 20px;
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

export default MoodsDetails;