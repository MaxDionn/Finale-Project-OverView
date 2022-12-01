import {useEffect, useState} from "react";

export const F1TvShows = () => {
    const [stateF1Tv, setStateMovieF1Tv] =useState();

    useEffect(() => {
        fetch("/get-tv-popular")
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400 || data.statut === 500){
                return new Error(data.message)
            }
            else{
                setStateMovieF1Tv(data)
            }
        })
        .catch(() => {
            setStateMovieF1Tv("error")
        })
    },[])
    return <h1>hello there</h1>;
}