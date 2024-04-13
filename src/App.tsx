import { BarGlob3d, Glob3d } from 'glob3d';
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
  const appRef = useRef();

  const data = getCitiesData();

  useEffect(() => {
    if (appRef.current.children.length === 0) {
      const globeInstance = new BarGlob3d(appRef.current, {
        debugMode: false,
      });
      globeInstance.initialize(data);
    }
  }, []);

  return <div ref={appRef}></div>;
}

export default App;
