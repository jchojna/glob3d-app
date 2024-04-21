// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useRef, useState } from 'react';

import './App.css';
import { getCitiesData } from './utils/citiesData';

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const data = getCitiesData();
  const [globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);

  useEffect(() => {
    if (!appRef.current) return;
    if (appRef.current.children.length === 0) {
      setGlobeInstance(
        new BarGlob3d(appRef.current, data, {
          tooltipValueSuffix: 'people',
          globeColor: '#120e36',
          barColor: '#b4afe8',
          barActiveColor: '#e5a110',
          tooltipActiveBackgroundColor: '#e5a110',
        })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div ref={appRef} className="glob3d"></div>
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
