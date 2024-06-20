import { useQuery } from '@tanstack/react-query';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useState } from 'react';

import './App.css';
import Globe from './components/Globe';
import Sidebar from './components/Sidebar';
import { endpoints } from './constants/endpoints';
import { prepareCitiesData } from './utils/citiesData';

function App() {
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const [dataset, setDataset] = useState<string>('cities');

  const { data, error } = useQuery({
    queryKey: ['dataset', dataset],
    queryFn: async () => {
      const response = await fetch(endpoints[dataset].url);
      return response.json();
    },
  });

  useEffect(() => {
    if (globeInstance) {
      globeInstance.onLoading();
    }
  }, [dataset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (globeInstance && data) {
      setTimeout(() => {
        globeInstance.onUpdate(prepareCitiesData(data.results));
      }, 300);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    globeInstance.onError();
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar
        processedData={data && prepareCitiesData(data.results)}
        dataset={dataset}
        setDataset={setDataset}
      />
      <Globe setGlobeInstance={setGlobeInstance} />
    </div>
  );
}

export default App;
