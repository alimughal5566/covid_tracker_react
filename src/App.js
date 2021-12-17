
import { FormControl,MenuItem,Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[countries,setCountries]=useState([])
  const[country,setCountry]=useState('worldwide')
  useEffect(() => {
    const getData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response=>response.json())
      .then(data => {
// console.log(data);
      const countries =  data.map(item =>(
          {
            name:  item.country,
            value: item.countryInfo.iso2
          }
        ))
        setCountries(countries)
      })
    }
    getData()
  } , [])
  const onCountryChange = e => {
    setCountry(e.target.value)
  }
  return (
    <div className="app">
    <div className='app__header'>

   <h1>COVID 19 tracker </h1>
      <FormControl className='app__dropdown'>
          <Select variant="outlined" value={country} onChange={onCountryChange}> 
          <MenuItem value='worldwide'>WorldWide</MenuItem>
          {countries.map(country=> <MenuItem value={country.value} >{country.name}</MenuItem>)}
          </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
