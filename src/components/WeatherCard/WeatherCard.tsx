import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { convertDate, getWeatherIcon } from "../../utils";
import styled from "styled-components";

interface Props {
  id: number;
}

const WeatherCard = ({ id }: Props) => {
  const { cityData, weatherData } = useContext(WeatherContext);

  return (
    <>
      {cityData && weatherData ? (
        <Card>
          <CardHeader>
            <h1>
              {cityData.name}, {cityData.country}
            </h1>
            <h3>{convertDate(id, weatherData)}</h3> 
          <TemperatureContainer>
            <DayTemperature>
              {weatherData.daily[id].temp.day.toFixed(1)}
              {weatherData.unit.symbol}
            </DayTemperature>
            <MaxMinContainer>
              <img src={`${process.env.PUBLIC_URL}/icons/arrows.png`} alt="arrows" width="32" height="32" />
              <MaxMinData>
                <p>
                  {weatherData.daily[id].temp.max.toFixed(1)}
                  {weatherData.unit.symbol}
                </p>
                <p>
                  {weatherData.daily[id].temp.min.toFixed(1)}
                  {weatherData.unit.symbol}
                </p>
              </MaxMinData>
            </MaxMinContainer>
          </TemperatureContainer>
          <Description>
            <h2>{weatherData.daily[id].weather[0].description}</h2>
          </Description>
          </CardHeader>

          <img
              src={getWeatherIcon(weatherData.daily[id].weather[0].id)}
              width="100"
              height="100"
              alt=""
            />

        </Card>
      ) : null}
    </>
  );
};

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 300px;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  color : black;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: rgba(46, 222, 240, 0.75);
    cursor: pointer;
    transform: scale(1.05);
  }
`;
const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`



const TemperatureContainer = styled.div`
  margin-top: auto;
  margin-bottom: 10px;
  display: flex;
`;

const DayTemperature = styled.h1`
font-size: 50px;
`;

const Description = styled.div`
margin-top: auto;
`;

const MaxMinContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  img {
    justify-self: end;
  }
`;

const MaxMinData = styled.div`
  justify-self: start;
  p {
    font-size: 18px;
  }
`;

export default WeatherCard;
