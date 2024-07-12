type CityData = {
  cou_name_en: string;
  population: number;
  coordinates: {
    lon: number;
    lat: number;
  };
  name: string;
};

export const prepareCitiesData = (data: CityData[]) => {
  return data.map(
    ({ cou_name_en, population, coordinates, name }: CityData) => ({
      city: name,
      country: cou_name_en,
      coordinates,
      value: population,
    })
  );
};
