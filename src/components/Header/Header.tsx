import { useContext, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import styled from "styled-components";
import { Loader } from "..";

const Header = () => {


  const { handleSubmit, handleCityChange, handleUnitChange,init, loading } =
    useContext(WeatherContext);

  useEffect(()=>{
    init()
  }, [])
 
  return (
    <Form onSubmit={handleSubmit}>
      <Label>City Name: </Label>
        <Input
          type="text"
          name="city"
          placeholder="City"
          onChange={(e) => handleCityChange(e)}
          defaultValue={'Tunisia'}
        />
     

      <Select name="unit" onChange={(e) => handleUnitChange(e)}>
        <Option value="metric">°C</Option>
        <Option value="imperial">°F</Option>
        <Option value="standard"> K</Option>
      </Select>
      <Button type="submit">Search</Button>
      {loading ? <Loader /> : null}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
  margin-top: 30px;
`;

const Label = styled.div`
  font-size: 25px; 
  color: #5be8f3;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease-in-out;
  &:focus {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Select = styled.select`
  font-size: 18px;
  padding: 9px 5px;
  height: 41px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Option = styled.option`
  border: none;
  border-radius: 5px;
  background-color: rgba(70, 130, 240, 0.4);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 15px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export default Header;
