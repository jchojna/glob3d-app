import { useQuery } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import Color from 'color';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useReducer, useRef, useState } from 'react';

import './App.css';
import Globe from './components/Globe';
import FloatMenu from './components/Menu/FloatMenu';
import { addQueryLimit, endpoints } from './constants/endpoints';
import { dataFiltersReducer, initialDataFilters } from './reducers/dataFilters';
import { initialSettings, settingsReducer } from './reducers/settings';
import { getCountriesArray, prepareCitiesData } from './utils/citiesData';

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataFilters, setDataFilters] = useReducer(
    dataFiltersReducer,
    initialDataFilters
  );
  const [settings, setSettings] = useReducer(settingsReducer, initialSettings);
  const isDataReady = useRef(false);

  const { dataset, queryLimit, selectedCountries } = dataFilters;
  const { data, isLoading, error } = useQuery({
    queryKey: ['dataset', dataset, queryLimit],
    queryFn: async () => {
      const response = await fetch(
        addQueryLimit(endpoints[dataset].url, queryLimit)
      );
      isDataReady.current = false;
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      const allCountries = getCountriesArray(
        prepareCitiesData(data.results)
      ).sort();
      setDataFilters({
        type: 'changed_all_countries',
        countries: allCountries,
      });
      isDataReady.current = true;
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

  if (data && isDataReady.current) {
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
          dataFilters={dataFilters}
          setDataFilters={setDataFilters}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
    </ConfigProvider>
  );
}

export default App;
