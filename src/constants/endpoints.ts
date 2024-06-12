type Endpoints = {
  [key: string]: {
    label: string;
    url: string;
  };
};

export const endpoints: Endpoints = {
  cities: {
    label: 'Cities',
    url: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?order_by=population DESC&limit=100',
  },
  lessCities: {
    label: 'Less Cities',
    url: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?order_by=population DESC&limit=10',
  },
};
