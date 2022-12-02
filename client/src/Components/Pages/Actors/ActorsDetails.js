import {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "../../ErrorPage";
import { FavoriteActor } from "../../Favorite/FavoriteActor";
import { useAuth0 } from "@auth0/auth0-react";

const ActorsDetails = () => {
    const [stateActorsById, setStateActorsById] = useState();
    const [stateActMovCred, setStateActMovCred] = useState();
    const {id} = useParams();
    let backdrop_url = "https://image.tmdb.org/t/p/w500";
    const {user} = useAuth0();

//--add actor to favorite by Id--//
const AddFavoriteActor = (actorId) => {
    fetch(`/add-actorFavorite/${user.name}`, {
        method: "POST",
        body: JSON.stringify({
        id: actorId
        }),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
        if (data.status === 200) {
            window.alert("Added To Favorite!");
        } else {
            window.alert("Unable To Add To the db");
        }
    })
        .catch(() => {
        window.alert("Error, please try again.");
    });
    };

//--delete actor of favorite by Id--//
const DeleteFavoriteActor = (actorId) => {
    
    fetch(`/delete-actorFavorite/${user.name}`, {
        method: "DELETE",
        body: JSON.stringify({
        id: actorId
        }),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
        if (data.status === 200) {
            window.alert("Delete From Favorite!");
        } else {
            window.alert("Unable To delete To the db");
        }
    })
        .catch(() => {
        window.alert("Error, please try again.");
    });
    };

//--get actor by Id--//
useEffect(() => {
//-- get actor by id --//
    fetch(`/get-actorById/${id}`)
    .then(res => res.json())
    .then((data) => {
        if(data.status===400||data.status===500){
            return new Error(data.message)
        }
        else{
        setStateActorsById(data)
        }    
    })
    .catch(() => {
        setStateActorsById("error")
    })
//-- get credit for actor--//
    fetch(`/get-actorById/${id}/movie_credits`)
    .then(res => res.json())
    .then((data) => {
        if(data.status===400||data.status===500){
            return new Error(data.message)
        }
        else{
        setStateActMovCred(data)
        }    
    })
    .catch(() => {
        setStateActMovCred("error")
    })
},[id])

    if (stateActMovCred  === "error") {
        return <ErrorPage/>
    }else{

        return ( 
        <Home>
            {!stateActorsById || !stateActMovCred ? 
            <LoadingCube/>
            :
            <div>
            <Poster>
                <div>
                    <img src={backdrop_url+stateActorsById?.profile_path}/>
                    <FavoriteActor actorId={stateActorsById.id} AddFavoriteActor={AddFavoriteActor} DeleteFavoriteActor={DeleteFavoriteActor}/>
                </div>
                <Detail>
                    <h2>{stateActorsById.name}</h2>
                    <h5><span>Career : </span>{stateActorsById.known_for_department}</h5>
                    <h5><span>Born : </span>{stateActorsById.birthday}</h5>
                    <h5><span>Death : </span>{stateActorsById.deathday}</h5>
                    <h5><span>Born in : </span>{stateActorsById.place_of_birth}</h5>
                    <p>{stateActorsById.biography}</p>
                </Detail>
            </Poster>
            <Title>
                <h2>As Cast</h2>
                <h2>As Crew</h2>
            </Title>
            <Under>
            <Cast>
                {stateActMovCred.cast.map((castItem, index) => {
                    return (
                        <Casting key={index} to={`/movies/${castItem.id}`}>
                            <img src={backdrop_url+castItem?.poster_path} />
                            <div>
                                <h3>{castItem.title}</h3>
                                <p>Character - {castItem.character}</p>
                                <p>Release - {castItem.release_date}</p>
                                <p><span>{Math.floor(castItem.vote_average)}/10</span></p>
                            </div>
                        </Casting>
                    )
                })}
            </Cast>
            <Crew>
                {stateActMovCred.crew.map((crewItem, index2) => {
                    return (
                        <Casting key={index2} to={`/movies/${crewItem.id}`}>
                            <img src={backdrop_url+crewItem?.poster_path} />
                            <div>
                                <h3>{crewItem.title}</h3>
                                <p>Job - {crewItem.job}</p>
                                <p>Release - {crewItem.release_date}</p>
                                <p><span>{Math.floor(crewItem.vote_average)}/10</span></p>
                            </div>
                        </Casting>
                    )
                })}
            </Crew>
            </Under>
            </div>
            }
        </Home>
)
}
}


const Title = styled.div`
display: flex;
justify-content: space-around;
`;

const Under = styled.div`
display: flex;
`;

const Casting = styled(Link)`
    all: unset;
    width: 400px;
    height:220px;
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
        font-size: 25px;
        border-bottom: 1px solid black;
        width: fit-content;
        margin-left: 10px;
        margin-top: 0px;
    }
    p{
        font-size: 20px;
        margin-top: -10px;
        margin-left: 10px;
        font-weight: 600;
    }
    span{
        font-size: 20px;
        border: 3px solid red;
        border-radius: 50%;
        width: fit-content;
        padding: 5px;
    }
`;

const Cast = styled.div`
display: grid;
    grid-template-columns: 400px 400px;
    text-align: center;
    align-items: center;
    gap: 20px 30px;
    height: fit-content;
`;

const Crew = styled.div`
margin-left: 90px;
display: grid;
    grid-template-columns: 400px 400px;
    text-align: center;
    align-items: center;
    gap: 20px 30px;
    height: fit-content;
`;

const Home = styled.div`
margin: 5% 5%;
font-family: 'Indie Flower', cursive;
width: fit-content;
h2{
    font-size: 40px;
    border-bottom: 3px solid black;
    width: fit-content;
    margin-left: 20px;
}
`;

const Detail = styled.div`
margin-left: 10px;
    h5{
        font-size: 25px;
        width: fit-content;
        margin-top: -20px;
        margin-left: 10px;
        span{
            border-bottom: 1px solid black;
            font-size: 20px;
            margin-right: 10px;
        }
    }
    p{
        font-size: 20px;
        ::first-letter{
            font-size: 30px;
            color:red;
        }
    }
`;

const Poster = styled.div`
    height: fit-content;
    display: flex;
    border-radius: 50px;
    border-top-right-radius:50%;
    box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
    img{
        border-radius: 50px;
        box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
        width: 300px;
        height: fit-content;
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

export default ActorsDetails;