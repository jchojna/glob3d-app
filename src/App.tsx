import { useQuery } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import Color from 'color';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useReducer, useState } from 'react';

import './App.css';
import FloatMenu from './components/FloatMenu';
import Globe from './components/Globe';
import { addQueryLimit, endpoints } from './constants/endpoints';
import { getCountriesArray, prepareCitiesData } from './utils/citiesData';

const reducer = (
  state: { primary: string; background: string },
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case 'SET_PRIMARY_COLOR': {
      return {
        primary: action.payload,
        background: state.background,
      };
    }
    case 'SET_BACKGROUND_COLOR': {
      return {
        primary: state.primary,
        background: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataset, setDataset] = useState('cities');
  const [queryLimit, setQueryLimit] = useState<number>(100);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [colors, setColors] = useReducer(reducer, {
    primary: '#DD176D',
    background: '#201A7E',
  });
  const [globeOpacity, setGlobeOpacity] = useState(0.85);
  const [isAutoRotate, setAutoRotate] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dataset', dataset, queryLimit],
    queryFn: async () => {
      const response = await fetch(
        addQueryLimit(endpoints[dataset].url, queryLimit)
      );
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      const allCountries = getCountriesArray(
        prepareCitiesData(data.results)
      ).sort();
      setAllCountries(allCountries);
    }
  }, [data]);

  useEffect(() => {
    document.body.style.backgroundColor = Color(colors.background)
      .lighten(0.15)
      .hex();
    if (globeInstance) {
      globeInstance.setActiveColor(colors.primary);
      globeInstance.setGlobeColor(colors.background);
    }
  }, [colors]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (globeInstance) {
      globeInstance.setAutoRotate(isAutoRotate);
    }
  }, [isAutoRotate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (globeInstance) {
      globeInstance.setGlobeOpacity(globeOpacity);
    }
  }, [globeOpacity]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    globeInstance && globeInstance.onLoading();
  }

  if (error) {
    globeInstance && globeInstance.onError();
  }

  if (data) {
    const results = prepareCitiesData(data.results).filter((d) =>
      selectedCountries.length > 0 ? selectedCountries.includes(d.country) : d
    );
    globeInstance.onUpdate(results);
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            contentPadding: 30,
            headerPadding: 20,
          },
        },
        token: {
          colorPrimary: colors.primary,
        },
      }}
    >
      <div style={{ minHeight: '100vh' }}>
        <Globe
          setGlobeInstance={setGlobeInstance}
          colors={colors}
          globeOpacity={globeOpacity}
        />
        <FloatMenu
          dataset={dataset}
          setDataset={setDataset}
          queryLimit={queryLimit}
          setQueryLimit={setQueryLimit}
          allCountries={allCountries}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          colors={colors}
          setColors={setColors}
          globeOpacity={globeOpacity}
          setGlobeOpacity={setGlobeOpacity}
          isAutoRotate={isAutoRotate}
          setAutoRotate={setAutoRotate}
        />
      </div>
    </ConfigProvider>
  );
}

export default App;
