import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const TvShowsDetails = () => {
    const {id} = useParams();
    const [stateTv, setStateTv] = useState();

    useEffect(() => {
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
    },[])
    return ( 
        <div>
            {!stateTv ? 
            <LoadingCube/>
            :
            <div>
                <p>{id}</p>
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

export default TvShowsDetails;