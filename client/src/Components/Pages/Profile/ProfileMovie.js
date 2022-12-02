import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


const ProfileMovie = () => {
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

        const [stateMovie, setStateMovie] = useState()

        
            fetch(`/get-movieById/${id}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status===400||data.status===500) {
                return new Error(data.message)
            }
            else{
                setStateMovie(data.data)
                console.log(data.data)
            }
        })
        .catch((err) => {
            window.alert(err)
        })

}

export default ProfileMovie;
