import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogin = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <StyleButton>
            <button onClick={() => loginWithRedirect()}>
                <h2>Sign in or log in</h2>
            </button>
            </StyleButton>
        )
    )
}

const StyleButton = styled.div`
    width: fit-content;
    margin: 20px;
    button{
        border: 3px solid black;
        border-radius: 50px;
        background-color: #ccc5b9;
        padding: 10px;
        :hover{
            cursor: pointer;
        }
    }
    h2{
        all: unset;
        font-family: 'Montserrat Alternates', sans-serif;
        font-size: 30px;
        font-weight: 700;
        padding: 10px;
    }
`;

export default ButtonLogin;