type Endpoints = {
  [key: string]: string;
};

export const endpoints: Endpoints = {
  cities:
    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?order_by=population DESC&limit=100',
  lessCities:
    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?order_by=population DESC&limit=10',
};
