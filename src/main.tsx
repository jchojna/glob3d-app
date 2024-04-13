import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import cities from './data/cities100.json';

export const getCitiesData = () => {
  const { results } = cities;
  return prepareCitiesData(results);
};

type CityData = {
  country: string;
  population: number;
  coordinates: {
    lon: number;
    lat: number;
  };
  name: string;
};

const prepareCitiesData = (data: CityData[]) => {
  return data.map(({ country, population, coordinates, name }: CityData) => ({
    city: name,
    country,
    coordinates,
    value: population,
  }));
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
