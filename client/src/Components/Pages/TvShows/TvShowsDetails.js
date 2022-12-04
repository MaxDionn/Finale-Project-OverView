import {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "../../ErrorPage";
import { FavoriteTvShow } from "../../Favorite/FavoriteTvShow";
import { useAuth0 } from "@auth0/auth0-react";

const TvShowsDetails = () => {
    let backdrop_url = "https://image.tmdb.org/t/p/w500";
    const {id} = useParams();
    const {user} = useAuth0();
    const [stateTv, setStateTv] = useState();
    const [stateCredits, setStateCredits] =useState();
    const [stateSimilar, setStateSimilar] =useState();

//--add movie to favorite by Id--//
const AddFavoriteTvShow = (tvShowId) => {
    fetch(`/add-tvShowFavorite/${user.name}`, {
        method: "POST",
        body: JSON.stringify({
        id: tvShowId
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

//--delete movie of favorite by Id--//
const DeleteFavoriteTvShow = (tvShowId) => {
    fetch(`/delete-tvShowFavorite/${user.name}`, {
        method: "DELETE",
        body: JSON.stringify({
        id: tvShowId
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

useEffect(() => {
    //--get tv by Id --//
        fetch(`/get-tvById/${id}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
                setStateTv(data)
            }
        })
        .catch(() => {
            setStateTv("error")
        })
    //--get credits by Id --//
        fetch(`/get-tvById/${id}/aggregate_credits`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
            setStateCredits(data)
            }
        })
        .catch(() => {
            setStateCredits("error")
        })
    //--GET similar tv by Id --//
        fetch(`/get-tvById/${id}/similar`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
            setStateSimilar(data.results)
            }
        })
        .catch(() => {
            setStateSimilar("error")
        })
    },[id])

    if (stateTv === "error") {
        return <ErrorPage/>
    }else{

        return ( 
            <Home>
                {!stateTv || !stateCredits || !stateSimilar ? 
                <LoadingCube/>
                :
                <All>
                    <Left>
                    <Poster>
                        <div>
                            {stateTv.poster_path &&
                        <img src={backdrop_url+stateTv.poster_path}/>}
                        <FavoriteTvShow tvShowId={stateTv.id} AddFavoriteTvShow={AddFavoriteTvShow} DeleteFavoriteTvShow={DeleteFavoriteTvShow}/>
                        </div>
                        <Detail>
                            <h4>{stateTv.name}</h4>
                            <h1>Release : {stateTv.first_air_date}</h1>
                            <Genre>
                                <h1>Genres : </h1>
                            {stateTv.genres.map((genre, index)=>{
                            return<MoodLink key={index} to={`/mood/${genre.id}`}><h5>{genre.name} ,</h5> </MoodLink>})}
                            </Genre>
                        <h1>Number of seasons : <span>{stateTv.number_of_seasons}</span></h1>
                        <h1>Rate : <span>{Math.floor(stateTv.vote_average)}/10</span></h1>
                        <h5> - {stateTv.overview}</h5>
                    </Detail>
                </Poster>
                <div>
                    <div>
                        <h2>Cast : </h2>
                    </div>
                    <MapSelec>
                    {stateCredits.cast.map((cast, index2) => {
                        let backdrop_url = "https://image.tmdb.org/t/p/w500";
                        return (
                            <Casting key={index2} to={`/actors/${cast.id}`}>
                                {cast.profile_path && 
                                <img src={backdrop_url+cast.profile_path}/>}
                                <div>
                                    <h3>{cast.name}</h3>
                                    <h5>Played as : </h5>
                                    {cast.roles.map((role, index3)=> {
                                        return  <p key={index3}>{role.character}</p>
                                    })}
                                </div>
                            </Casting>
                        )
                    })}
                    </MapSelec>
                </div>
                </Left>
                <Right>
                    <div>
                        <h2>Similar Tv Shows</h2>
                    {stateSimilar.map((similar, index4) => {
                        let backdrop_url = "https://image.tmdb.org/t/p/w500";
                        return (
                            <Casting key={index4} to={`/tvShows/${similar.id}`}>
                                {similar.poster_path &&
                                <img src={backdrop_url+similar?.poster_path}/>}
                                <div>
                                    <h3>{similar.name}</h3>
                                    <p>Rate : <span>{Math.floor(similar.vote_average)}/10</span></p>
                                </div>
                            </Casting>
                        )
                    })}
                    </div>
                </Right>
            </All>
            }
        </Home>
    )
}
}
const Right = styled.div`
    margin-left: 3%;
    padding-left: 3%;
    border-left: 1px dotted black;
`;

const All= styled.div`
display: flex;
`;

const Left = styled.div`
display: flex;
flex-direction: column;
`;

const MapSelec = styled.div`
    display: grid;
    grid-template-columns: 400px 400px 400px;
    text-align: center;
    align-items: center;
    gap: 20px;
    height: fit-content;
`;

const Casting = styled(Link)`
    all: unset;
    overflow: hidden;
    width: 400px;
    height:160px;
    display: flex;
    border-radius: 50px;
    border-bottom: 10px solid #252422;
    background-color: #ccc5b9;
    :hover{
        img{
            box-shadow:#ccc5b9 0px 10px 5px;
            transition: 0.3s;
            cursor: pointer;
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
        margin-top: -20px;
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
    h5{
        border-bottom: 1px solid red;
        width: fit-content;
        margin-top: -20px;
        margin-left: 10px;
        font-size: 15px;
    }
`;

const Home = styled.div`
margin: 5% 5%;
font-family: 'Montserrat Alternates', sans-serif;
h2{
    font-size: 40px;
    border-bottom: 1px solid #fffcf2;
    color: #fffcf2;
    width: fit-content;
    margin-left: 20px;
}
`;

const Genre = styled.div`
    display: flex;
    align-items: center;
`;

const MoodLink = styled(Link)`
    all: unset;
    font-size: 20px;
    margin-left: 10px;
    font-weight: bolder;
    cursor: pointer;
        :hover::first-letter{
            color :red;
        }
`;

const Poster = styled.div`
    width: 1150px;
    height: 600px;
    display: flex;
    border-radius: 50px;
    background-color: #ccc5b9;
    img{
        border-radius: 50px;
        box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
        width: fit-content;
        height: 400px;
    }
`;

const Detail = styled.div`
margin-left: 10px;
    p{
        all: unset;
        font-size: 30px;
        margin-left: 50px;
        text-align: left;
        border: 3px solid red;
        border-radius: 50%;
        width: fit-content;
        padding: 5px;
    }
    h5{
        font-size: 20px;
        width: fit-content;
        height: fit-content;
    }
    h1{
        border-bottom: 1px solid black;
        width: fit-content;
        font-size: 20px;
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
    h4{
        font-size: 40px;
        width: fit-content;
        border-bottom: 3px solid black;
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

export default TvShowsDetails;