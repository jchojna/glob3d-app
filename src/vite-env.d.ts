/// <reference types="vite/client" />

// TODO: use types from glob3d
type GlobeData = {
  country: string;
  city: string;
  coordinates: {
    lon: number;
    lat: number;
  };
  value: number;
};
