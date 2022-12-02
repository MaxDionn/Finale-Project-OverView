import {FaRegHeart} from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

export const FavoriteActor = ({actorId, AddFavoriteActor, DeleteFavoriteActor}) => {
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
                if(data.data.actorId.includes(actorId)){
                    setColor("red")
                }
                else{
                    setColor("black")
                }
            }
        })
        .catch(() => {
            setState("error")
        })}
    },[color, isAuthenticated, actorId])

    const handleClick = () => {
        setIsClicked(!isClicked);
        
        if(!isClicked) {
            setColor("red")
            AddFavoriteActor(actorId)
        }else
        {
            setColor("black")
            DeleteFavoriteActor(actorId)
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