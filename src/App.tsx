// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useRef } from 'react';

import './App.css';

import { getCitiesData } from './citiesData';

// const root = document.querySelector('#root');
// const updateButton = document.querySelector('.update-button');
// if (!root || !(root instanceof HTMLElement)) {
//   throw new Error('Root element not found');
// }

// updateButton &&
//   updateButton.addEventListener('click', async () => {
//     globeInstance.clean();
//     globeInstance.update(data);
//   });

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);

  const data = getCitiesData();

  useEffect(() => {
    if (!appRef.current) return;
    if (appRef.current.children.length === 0) {
      const globeInstance = new BarGlob3d(appRef.current, {
        debugMode: false,
        tooltipValueSuffix: 'people',
      });
      globeInstance.initialize(data);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={appRef} style={{ width: '1200px', height: '800px' }}></div>;
}

export default App;
