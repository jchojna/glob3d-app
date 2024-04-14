// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useRef, useState } from 'react';

import './App.css';
import { getCitiesData } from './citiesData';

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const data = getCitiesData();
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);

  useEffect(() => {
    if (!appRef.current) return;
    if (appRef.current.children.length === 0) {
      setGlobeInstance(
        new BarGlob3d(appRef.current, data, {
          debugMode: false,
          tooltipValueSuffix: 'people',
        })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div ref={appRef} style={{ width: '1200px', height: '800px' }}></div>
      <button
        onClick={() => globeInstance.update(data)}
        className="update-button"
      >
        Update
      </button>
    </>
  );
}

export default App;
