type CityData = {
  country: string;
  population: number;
  coordinates: {
    lon: number;
    lat: number;
  };
  name: string;
};

export const prepareCitiesData = (data: CityData[]) => {
  return data.map(({ country, population, coordinates, name }: CityData) => ({
    city: name,
    country,
    coordinates,
    value: population,
  }));
};
