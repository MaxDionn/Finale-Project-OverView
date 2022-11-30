import {FaRegHeart} from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";

export const Favorite = () => {

    const [color, setColor] = useState();
    const [isClicked, setIsClicked] = useState();

    const handleClick = () => {
        setIsClicked(!isClicked);
        
        if(!isClicked) {
            setColor("red")
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