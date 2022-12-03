import styled from "styled-components";
import ButtonLogin from "./ButtonLogin";
import ButtonLogout from "./ButtonLogout";
import Profile from "./Profile"
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { isLoading, error} = useAuth0();
    const {user, isAuthenticated} = useAuth0();

    //--- Send Item to cart ---//
    const postTomongo = () => {
    fetch(`/add-userInfos`, {
        method: "POST",
        body: JSON.stringify({
        ...user,
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
    
    return ( 
        <Home>
            <h1>Profile</h1>
            {error && <p>Login Error</p>}
            {!error && isLoading && <LoadingCube/>}
            {!error && !isLoading && (
                <>
                    <ButtonLogin postTomongo={postTomongo}/>
                    <ButtonLogout/>
                    {isAuthenticated && (
                    <UserStyle>
                        <img src={user.picture}/>
                        <h2><span>-</span> {user.name} <span>-</span></h2>
                    </UserStyle>
                    )}
                </>
            )}
        </Home>
    )
    }


const Home = styled.div`
margin: 5% -10%;
display: flex;
flex-direction: column;
align-items: center;
margin-left: -10%;
font-family: 'Indie Flower', cursive;
h1{
    font-size: 60px;
    border-bottom: 1px solid black;
}
`;

const UserStyle = styled.div`
    display: flex;
    flex-direction: column;
    img{
        border-radius: 50%;
        border: 3px solid black;
        box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
    }
    h2{
        font-size: 40px;
        span{
            color: red;
            font-size: 50px;
        }
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
    
    export default Login;