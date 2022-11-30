import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
    const [stateProfile, setStateProfile] = useState()
    const [stateUser, setStateUser] = useState()
    const {client_id} = useParams();
    console.log("FE",client_id)
    

    //const {user} = useAuth0()
/*
    useEffect(() => {
        
        fetch("/get-user")
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500) {
                return new Error(data.message)
            }
            else{
                setStateUser(data)
                console.log("testuser" , data)
            }
        })
        .catch((err) => {
            window.alert(err)
        })
    },[])
*/

    useEffect(() => {
        
        fetch(`/get-user/${client_id}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status===400||data.status===500) {
                return new Error(data.message)
            }
            else{
                setStateProfile(data)
                console.log("FE2",data.client_id)
            }
        })
        .catch((err) => {
            window.alert(err)
        })
    },[])

        return (
            <Home>
            {!stateProfile  ? 
            <LoadingCube/>
            :
            <>
                <h1>Profile</h1>
            </>
            }
            </Home>
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