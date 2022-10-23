import axios, {AxiosResponse} from "axios";
import { City, Weather } from "./types";

const API_KEY = '762385c71cb82e47ad4fdd68f06f6271';

export const getCityData = async (city: string): Promise<City[]> => {
  return axios(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  ).then((res:AxiosResponse) => { 
      return res.data; 
  });
};

export const getCityWeather = async (
  city: City,
  unit: string
): Promise<Weather> => {
  const lat = city.lat;
  const lon = city.lon;

  return axios(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=alerts,minutely,current&appid=${API_KEY}`
  ).then((res:AxiosResponse) => {
      return res.data; 
  });
};

export const getData = async (city: string, unit: string) => {
  const cityData = await getCityData(city);
  if (cityData === undefined || cityData.length === 0) {
    alert("City data not found.");
    return;
  }
  const weatherData = await getCityWeather(cityData[0], unit);
  if (weatherData === undefined) {
    alert("Weather data not found.");
    return;
  }
  return { cityData, weatherData };
};
