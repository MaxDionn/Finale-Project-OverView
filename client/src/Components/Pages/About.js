import styled from "styled-components";
import logo from "../images/TMDB.webp"
import {GiBeard} from "react-icons/gi"

const About = () => {
return ( 
    <Style>
        
        <h1>Welcome to my paradise !</h1>
        <div>
            <h2>The legend said that in a past life I used to 
                watch 300 movies and Shows per year.. 
                Who knows if it's a reality or not..</h2><GiBeard size={30}/>
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
    margin-left: 50px;
}
`;

export default About;