import { useQuery } from '@tanstack/react-query';
import Color from 'color';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useState } from 'react';

import './App.css';
import Globe from './components/Globe';
import Sidebar from './components/Sidebar';
import { addQueryLimit, endpoints } from './constants/endpoints';
import { getCountriesArray, prepareCitiesData } from './utils/citiesData';

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataset, setDataset] = useState('cities');
  const [queryLimit, setQueryLimit] = useState<number>(100);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [globeColor, setGlobeColor] = useState('#211f3e');

  const { data, isLoading, error } = useQuery({
    queryKey: ['dataset', dataset, queryLimit],
    queryFn: async () => {
      const response = await fetch(
        addQueryLimit(endpoints[dataset].url, queryLimit)
      );
      return response.json();
    },
  });

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

  useEffect(() => {
    if (data) {
      const allCountries = getCountriesArray(
        prepareCitiesData(data.results)
      ).sort();
      setAllCountries(allCountries);
    }
  }, [data]);

  useEffect(() => {
    document.body.style.backgroundColor = globeColor;
    if (globeInstance) {
      globeInstance.setGlobeColor(Color(globeColor).darken(0.15).hex());
    }
  }, [globeColor]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar
        dataset={dataset}
        setDataset={setDataset}
        queryLimit={queryLimit}
        setQueryLimit={setQueryLimit}
        allCountries={allCountries}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        globeColor={globeColor}
        setGlobeColor={setGlobeColor}
      />
      <Globe setGlobeInstance={setGlobeInstance} />
    </div>
  );
}

export default App;
