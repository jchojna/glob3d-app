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
import { initialSettings, settingsReducer } from './reducers/settings';
import { getCountriesArray, prepareCitiesData } from './utils/citiesData';

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataset, setDataset] = useState('cities');
  const [queryLimit, setQueryLimit] = useState<number>(100);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [settings, setSettings] = useReducer(settingsReducer, initialSettings);

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
    document.body.style.backgroundColor = Color(settings.colorBackground)
      .lighten(0.15)
      .hex();
    if (globeInstance) {
      globeInstance.setActiveColor(settings.colorPrimary);
      globeInstance.setGlobeColor(settings.colorBackground);
      globeInstance.setGlobeOpacity(settings.globeOpacity);
      globeInstance.setAutoRotate(settings.autoRotate);
    }
  }, [settings]); // eslint-disable-line react-hooks/exhaustive-deps

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
          colorPrimary: settings.colorPrimary,
        },
      }}
    >
      <div style={{ minHeight: '100vh' }}>
        <Globe setGlobeInstance={setGlobeInstance} settings={settings} />
        <FloatMenu
          dataset={dataset}
          setDataset={setDataset}
          queryLimit={queryLimit}
          setQueryLimit={setQueryLimit}
          allCountries={allCountries}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
    </ConfigProvider>
  );
}

export default App;
