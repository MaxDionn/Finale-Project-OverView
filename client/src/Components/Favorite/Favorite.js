import {FaRegHeart} from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

export const Favorite = ({movieId, AddFavoriteMovie}) => {
    const {id} = useParams()
    const [color, setColor] = useState();
    const [isClicked, setIsClicked] = useState();
    const [state, setState] = useState()
    const {user, isAuthenticated} = useAuth0();

    useEffect(() => {
        
        if(isAuthenticated){
        fetch(`/get-movfav/${user.name}`) 
        .then(res => res.json())
        .then(data => {
            if(data.status===400||data.status===500) {
                return new Error(data.message)
            }
            else{
                setState(data)
                if(data.data.movieId.includes(movieId)){
                    setColor("red")
                }else{
                    setColor("black")
                }
            }
        })
        .catch(() => {
            setState("error")
        })}
    },[color, isAuthenticated, movieId])

    const handleClick = () => {
        setIsClicked(!isClicked);
        
        if(!isClicked) {
            setColor("red")
            AddFavoriteMovie(movieId)
        }else
        {
            setColor("black")
        }
    }

    return (
        <Fav>
            <p>Add to favorite</p>
            <button onClick={() => handleClick()} >
                <FaRegHeart size={50} style={{ fill : color}}/>
            </button>
        </Fav>
    )
};

const Fav = styled.div`
    p{
        font-size: 30px;
    }
    button{
        all: unset;
        margin-top: -40px;
        cursor: pointer;
    }
`;