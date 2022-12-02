import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {IoSearchSharp} from "react-icons/io"


const SearchBar = () => {
    const [value, setValue] = useState("")
    const [stateSearch, setStateSearch] = useState([])

    const handleSelect =()=>{
        setValue("")
    }

    useEffect(() => {
        fetch(`/get-searchBar?name=${value}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
                setStateSearch(data.results)
                console.log(data.results)
            }
        })
        .catch(() => {
            setStateSearch("error")
        })
    }, []);

    return (
        <>
        {!stateSearch === 0 ? 
            <LoadingCube/>
            :
            <div>
                <h1>SearchBar</h1>
                <div>
                    <div>
                        <Input type="text" 
                        value={value} 
                        onChange= {(event) => setValue(event.target.value)}
                        placeholder="Search"
                        onKeyDown={(e) => {
                            if(e.key ==="Enter"){
                            handleSelect(e.target.value)
                        }}}
                        />
                        <button onClick={()=> setValue(" ")}>Search</button>
                        <Dropdown style={{display: value.length >=2 ? "block":"none"}}>
                            {stateSearch.filter(item=>{
                                const word = value?.toLowerCase();
                                const name = item?.name.toLowerCase();
                                return word && name?.startsWith(word)
                            }).slice(0, 10).map((item, index) =>{
                                return (
                                    <DropLink 
                                    key={index}
                                    onClick={()=> handleSelect(item)}
                                    >
                                    <li>
                                    {item?.name}
                                    </li>
                                    </DropLink>
                                )
                            })}
                        </Dropdown>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

const DropLink = styled(Link)``;

const Input = styled.input``;

const Dropdown = styled.ul``;

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

export default SearchBar;