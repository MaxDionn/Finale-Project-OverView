import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Pages/Profile/Login"

const SearchBar2 = () => {
    let backdrop_url = "https://image.tmdb.org/t/p/w500";
    const [value, setValue] = useState("");
    const [items, setItems] = useState([""]);

useEffect(()=>{
    fetch(`/get-searchBar?name=${value}`)
    .then(res => res.json())
    .then((data) => {
        if(data.status===400||data.status===500){
            return new Error(data.message)
        }
        else{
            setItems(data.results)
        }
    })
    .catch(() => {
        setItems("error")
    })
},[value])

    const handleSelect = () => {
    setValue("");
    };

    return (
    <>
        {items.length === 0 ? 
        <LoadingCube/>
            : 
        <StyleForm>
            <input
            type="search"
            placeholder="Search..."
            onChange={(ev) => {
                setValue(ev.target.value);
            }}
            onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                handleSelect(ev.target.value);
                }
            }}
            />
            <i onClick={() => setValue("")}></i>
            <div>
            {items.length > 0 && (
                <SuggestionsList 
                style={{display: value.length >=2 ? "block" : "none"}}>

                {items.map((suggestion, _id) => {
                    const genre = {movie:"movies", person:"actors", tv:"tvShows"}

                    const query = suggestion.media_type
                    return (
                    // We made this a clickable link to go to each item by its id
                    <Suggestion
                        key={_id}
                        onClick={() => handleSelect(suggestion)}
                    >
                        <li>
                            
                        <Prediction to={`/${genre[query]}/${suggestion.id}`}>
                            {suggestion.poster_path && 
                            <img src={backdrop_url+suggestion?.poster_path}/>}
                            {suggestion.profile_path &&
                            <img src={backdrop_url+suggestion?.profile_path}/>}
                            <h3>{suggestion?.name}</h3>
                            <h3>{suggestion?.title}</h3>
                        </Prediction>
                        </li>
                    </Suggestion>
                    );
                })}
                </SuggestionsList>
            )}
            </div>
        </StyleForm>
        }
    </>
    );
};


const StyleForm = styled.form`
    font-family: 'Montserrat Alternates', sans-serif;
    width: fit-content;
    margin: 10px;
        input{
            border: 2px solid #fffcf2;
            border-radius: 50px;
            width: 400px;
            font-size: 20px;
            background: transparent;
            padding: 5px;
            color: #fffcf2;
        }
`;

const SuggestionsList = styled.ul`
    width: fit-content;
    height: fit-content;
`;

const Suggestion = styled.div`
    width: 350px;
    li{
        all: unset;
        }
`;

const Prediction = styled(Link)`
    all: unset;
    background: lightgray;
    font-weight: bold;
    display: flex;
    align-items: center;
    box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
        h3{
            margin-left: 5%;
            border-bottom: 1px solid black;
            width: fit-content;
        }
        img{
            width: 100px;
            border-radius: 50px;
        }
            :hover{
                cursor: pointer;
                transition: 0.5s;
                border: 2px solid black;
                border-radius: 50px;
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

export default SearchBar2;