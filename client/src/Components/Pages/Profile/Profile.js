import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMovie from "./ProfileMovie"


const Profile = () => {
    /*
    const [stateProfile, setStateProfile] = useState()
    const {id} = useParams();

    useEffect(() => {
        fetch(`/get-user/${id}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500) {
                return new Error(data.message)
            }
            else{
                setStateProfile(data.data)
                console.log(data.data)
            }
        })
        .catch((err) => {
            window.alert(err)
        })
    },[])
*/
        return (
            <>
                <h1>Profile</h1>
                <ProfileMovie/>
            </>
        )
}

const Home = styled.div``;

const LoadingCube = styled.div`
    margin-top: 400px;
    width: 20px;
    height: 20px;
    background: purple;
    position: relative;
    animation: mymove 1s infinite;
    border-radius: 50%;
    @keyframes mymove{
        0%   {top: 0px; left: 0px; background: red;}
        25%  {top: 0px; left: 50px; background: blue;}
        50%  {top: 50px; left: 50px; background: yellow;}
        75%  {top: 50px; left: 0px; background: green;}
        100% {top: 0px; left: 0px; background: red;}
    }
    `;

    export default Profile;