import { useQuery } from '@tanstack/react-query';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useState } from 'react';

import './App.css';
import Globe from './components/Globe';
import Sidebar from './components/Sidebar';
import { addQueryLimit, endpoints } from './constants/endpoints';
import { prepareCitiesData } from './utils/citiesData';

const getCountriesArray = (data: GlobeData[]) => {
  const countriesSet = new Set<string>();
  data.forEach((d: GlobeData) => countriesSet.add(d.country));
  return [...countriesSet];
};

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataset, setDataset] = useState('cities');
  const [queryLimit, setQueryLimit] = useState<number>(100);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

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
    globeInstance.onError();
  }

  if (data) {
    const results = prepareCitiesData(data.results).filter((d) =>
      selectedCountries.length > 0 ? selectedCountries.includes(d.country) : d
    );
    globeInstance.onUpdate(results);
  }

  useEffect(() => {
    if (data) {
      const allCountries = getCountriesArray(prepareCitiesData(data.results));
      setAllCountries(allCountries);
    }
  }, [data]);

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
      />
      <Globe setGlobeInstance={setGlobeInstance} />
    </div>
  );
}

export default App;
