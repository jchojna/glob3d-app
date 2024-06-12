import { useQuery } from '@tanstack/react-query';
// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useRef, useState } from 'react';

import './App.css';
import Sidebar from './components/Sidebar';
import { prepareCitiesData } from './utils/citiesData';

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);

  const { data, error, isPending } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(
        'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?order_by=population DESC&limit=100'
      );
      return response.json();
    },
  });

  useEffect(() => {
    if (
      appRef.current &&
      appRef.current.children.length === 0 &&
      preparedData
    ) {
      setGlobeInstance(
        new BarGlob3d(appRef.current, preparedData, {
          tooltipValueSuffix: 'people',
          globeColor: '#120e36',
          barColor: '#b4afe8',
          barActiveColor: '#e5a110',
          tooltipActiveBackgroundColor: '#e5a110',
        })
      );
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isPending) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const preparedData = prepareCitiesData(data.results);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar globe={globeInstance} preparedData={preparedData} />
      <div
        ref={appRef}
        style={{
          height: '100vh',
          width: '100%',
        }}
      ></div>
    </div>
  );
}

export default App;
