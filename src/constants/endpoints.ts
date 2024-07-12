type Endpoints = {
  [key: string]: {
    label: string;
    url: string;
  };
};

export const endpoints: Endpoints = {
  cities: {
    label: 'Cities',
    url: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=population DESC',
  },
  lessCities: {
    label: 'Less Cities',
    url: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=population DESC',
  },
};

export const addQueryLimit = (url: string, limit: number): string => {
  return `${url}&limit=${limit}`;
};
