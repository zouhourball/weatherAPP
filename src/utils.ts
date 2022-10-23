import { Weather } from "./types";

export const convertDate = (id: number, weatherData: Weather) => {
  if (weatherData !== undefined && weatherData.daily?.[id].dt) {
    const date = new Date(weatherData.daily[id].dt * 1000);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
};

export const dateFromDT =  (dt:number) => { 
  // this function convert it to days for echarts Fromat
  let days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let date = new Date(dt * 1000);  
  return days[date.getDay()] + " " + date.getDate()
}


// SOURCE https://openweathermap.org/weather-conditions
export const getWeatherIcon = (id: number) => {
  if (id >= 200 && id <= 232) {
    return `${process.env.PUBLIC_URL}/icons/weather/thunder.png`;
  }
  if (id >= 300 && id <= 321) {
    return `${process.env.PUBLIC_URL}/icons/weather/moderate-rain.png`;
  }
  if (id === 500) {
    return `${process.env.PUBLIC_URL}/icons/weather/light-rain.png`;
  }
  if (id === 501) {
    return `${process.env.PUBLIC_URL}/icons/weather/moderate-rain.png`;
  }
  if (id === 511) {
    return `${process.env.PUBLIC_URL}/icons/weather/freezing-rain.png`;
  }
  if ((id >= 502 && id <= 504) || (id >= 520 && id <= 531)) {
    return `${process.env.PUBLIC_URL}/icons/weather/heavy-rain.png`;
  }
  if (id === 600 || id === 615) {
    return `${process.env.PUBLIC_URL}/icons/weather/light-snow.png`;
  }
  if (id === 601 || id === 616) {
    return `${process.env.PUBLIC_URL}/icons/weather/moderate-snow.png`;
  }
  if (id === 602 || (id >= 620 && id <= 622)) {
    return `${process.env.PUBLIC_URL}/icons/weather/heavy-snow.png`;
  }
  if (id >= 611 && id <= 613) {
    return `${process.env.PUBLIC_URL}/icons/weather/freezing-rain.png`;
  }
  if (id >= 701 && id <= 781) {
    return `${process.env.PUBLIC_URL}/icons/weather/mist.png`;
  }
  if (id === 800) {
    return `${process.env.PUBLIC_URL}/icons/weather/sun.png`;
  }
  if (id >= 801 && id <= 802) {
    return `${process.env.PUBLIC_URL}/icons/weather/cloud-sun.png`;
  }
  if (id >= 803 && id <= 804) {
    return `${process.env.PUBLIC_URL}/icons/weather/clouds.png`;
  }
};
