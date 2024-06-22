import { useQuery } from '@tanstack/react-query';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useState } from 'react';

import './App.css';
import Globe from './components/Globe';
import Sidebar from './components/Sidebar';
import { addQueryLimit, endpoints } from './constants/endpoints';
import { prepareCitiesData } from './utils/citiesData';

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataset, setDataset] = useState('cities');
  const [queryLimit, setQueryLimit] = useState<number>(100);

  const { data, error } = useQuery({
    queryKey: ['dataset', dataset, queryLimit],
    queryFn: async () => {
      const response = await fetch(
        addQueryLimit(endpoints[dataset].url, queryLimit)
      );
      return response.json();
    },
  });

  useEffect(() => {
    if (globeInstance) {
      globeInstance.onLoading();
    }
  }, [dataset, queryLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (globeInstance && data) {
      setTimeout(() => {
        globeInstance.onUpdate(prepareCitiesData(data.results));
      }, 300);
    }
  }, [data, queryLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    globeInstance.onError();
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar
        processedData={data && prepareCitiesData(data.results)}
        dataset={dataset}
        setDataset={setDataset}
        queryLimit={queryLimit}
        setQueryLimit={setQueryLimit}
      />
      <Globe setGlobeInstance={setGlobeInstance} />
    </div>
  );
}

export default App;
