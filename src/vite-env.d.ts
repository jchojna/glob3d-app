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

type SettingsState = {
  colorPrimary: string;
  colorBackground: string;
  globeOpacity: number;
  autoRotate: boolean;
};

type SettingsAction = {
  type: string;
  color?: string;
  opacity?: number;
  autoRotate?: boolean;
};
