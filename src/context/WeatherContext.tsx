import React, { createContext, useState, ReactNode } from "react";
import { City, Unit, Weather } from "../types";
import { getData } from "../api";

interface Context {
  cityData: City | null;
  weatherData: Weather | null;
  loading: boolean;
  init: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUnitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}

const initialState = {
  cityData: null,
  weatherData: null,
  loading: false,
  init: () => {},
  handleSubmit: () => {},
  handleCityChange: () => {},
  handleUnitChange: () => {}, 
};

interface Props {
  children: ReactNode;
}

export const WeatherContext = createContext<Context>(initialState);

export const WeatherProvider = ({ children }: Props) => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [unit, setUnit] = useState<Unit>({ type: "metric", symbol: "°C" });
  const [loading, setLoading] = useState(false);
   

  const init = async ()=>{
    setLoading(true);
    const data = await getData('tunisia', unit.type);
    if (data !== undefined) {  
      setCityData(data.cityData[0]);
      setCity(data.cityData[0].name)
      setWeatherData({ ...data.weatherData, unit: unit });
    }
    setLoading(false);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = await getData(city, unit.type);
    if (data !== undefined) { 
      setCityData(data.cityData[0]);
      setWeatherData({ ...data.weatherData, unit: unit });
    }
    setLoading(false);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    const symbol = e.target.options[e.target.selectedIndex].text;
    setUnit({ type: type, symbol: symbol });
  };

  return (
    <WeatherContext.Provider
      value={{
        cityData,
        weatherData,
        loading,
        handleSubmit,
        handleCityChange,
        handleUnitChange,
        init,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
