import {TbFaceIdError} from "react-icons/tb"
import {FaHandHoldingHeart} from "react-icons/fa"
import styled from "styled-components";

const ErrorPage = () => {
return (
    <Error>
        <TbFaceIdError size={80}/>
        <h2>Oopsie Doopsie ! </h2>
        <h2>There was an Error...</h2>
        <h2>I'll give you a free hint :</h2>
        <h2>Try to refresh the page.</h2>
        <FaHandHoldingHeart size={80} />
    </Error>
)
}

const Error = styled.div`
margin: 5% 5%;
display: flex;
flex-direction: column;
font-family: 'Indie Flower', cursive;
align-items: center;
h2{
    font-size: 40px;
    width: fit-content;
}
`;

export default ErrorPage;