import {useEffect, useState} from "react";
import {json, useParams} from "react-router-dom";
import styled from "styled-components";

const ActorsDetails = () => {
    const {id} = useParams();
    const [stateActorsById, setStateActorsById] = useState();

    useEffect(() => {

        fetch(`/get-actorById/${id}`)
        .then(res => json())
        .then((data) => {
            if(data.status===400||data.status===500){
                return new Error(data.message)
            }
            else{
                setStateActorsById(data)
                console.log(data)
            }    
        })
        .catch(() => {
            setStateActorsById("error")
        })
    },[])

        return ( 
        <div>
            {!stateActorsById ? 
            <LoadingCube/>
            :
            <div>
                <div>hello there actors details</div>
            </div>
            }
        </div>
)
}

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