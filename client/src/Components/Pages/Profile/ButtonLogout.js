import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogout = () => {
    const {logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <StyleButton>
            <button onClick={() => logout()}>
                <h2>Sign Out </h2>
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
        border-radius: 50%;
        padding: 10px;
        box-shadow: rgba(149, 157, 125, 1.2) 0px 10px 30px;
        :hover{
            box-shadow: rgba(149, 157, 165, 1.2) 0px 20px 70px;
            cursor: pointer;
        }
    }
    h2{
        all: unset;
        font-family: 'Indie Flower', cursive;
        font-size: 30px;
        font-weight: 700;
        padding: 10px;
    }
`;

export default ButtonLogout;