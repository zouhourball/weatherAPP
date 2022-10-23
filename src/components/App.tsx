import { Header, WeatherCard , Chart } from ".";
import { WeatherProvider } from "../context/WeatherContext"; 
import Slick, { Settings ,CustomArrowProps } from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import styled from "styled-components";

 
function App() {  

  // Slick Arrows Need To Know CurrentSlide And Slide Count or else you get Console error
  
  // Wrapping Slick Buttons
  const PrevArrow = ({currentSlide, slideCount, ...props}: CustomArrowProps) => ( 
        <img src={`${process.env.PUBLIC_URL}/icons/prev.png`} alt="prev" {...props} /> 
    );

  // Wrapping Slick Buttons
  const NextArrow = ({currentSlide, slideCount, ...props}: CustomArrowProps) => ( 
    <img src={`${process.env.PUBLIC_URL}/icons/next.png`} alt="next" {...props} /> 
  );

 let slickSettings: Settings = {
    lazyLoad: "ondemand",
    accessibility: false,
    draggable: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,    
    centerMode: true,
    prevArrow:  <PrevArrow /> ,
    nextArrow:  <NextArrow /> ,
  };

  const renderItems = (itemsNumber : number )=> {
    let allCards = []
    for (let index = 0; index < itemsNumber; index++) {
      allCards.push(<WeatherCard key={index} id={index} />) 
    }
    return allCards
  }
  return ( 
    <AppContainer> 
      <WeatherProvider>
        <Header />
        <CardContainer> 
        <Slick {...slickSettings}>  
          {renderItems(5)}
        </Slick>  
        </CardContainer> 
        <Chart  />
      </WeatherProvider> 
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: relative;
`;
   
const CardContainer = styled.div` 
  margin: 20px;
`;
 
export default App;
