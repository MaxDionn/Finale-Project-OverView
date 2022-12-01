/*
import { useAuth0 } from "@auth0/auth0-react";

export const AddFavoriteMovie = (movieId) => {
    const {user} = useAuth0();

    fetch(`/add-favorite/${user}`, {
        method: "POST",
        body: JSON.stringify({
        id: movieId
        }),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
        if (data.status === 200) {
            window.alert("Added To db!");
            window.location.reload();
        } else {
            window.alert("Unable To Add To the db");
        }
    })
        .catch(() => {
        window.alert("Error, please try again.");
    });
    };
    */