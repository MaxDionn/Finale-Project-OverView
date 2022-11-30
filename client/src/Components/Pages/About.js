import styled from "styled-components";
import logo from "../images/TMDB.webp"

const About = () => {
return ( 
    <Style>
        <h1>Welcome to our paradise !</h1>
        <div>
            <h2></h2>
        </div>
        <h2>Everything here is possible thanks to The movie DB.</h2>
        <img src={logo} />
    </Style>
)
}

const Style = styled.div`
margin: 5% 30%;
text-align: center;
font-family: 'Indie Flower', cursive;
h1{
    font-size: 60px;
    border-bottom: 2px solid black;
    width: fit-content;
}
`;

export default About;