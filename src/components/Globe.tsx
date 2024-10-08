// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useRef } from 'react';

type GlobeProps = {
  setGlobeInstance: (instance: BarGlob3d) => void;
  settings: SettingsState;
};

function Globe({
  setGlobeInstance,
  settings: { colorPrimary, colorBackground, globeOpacity },
}: GlobeProps) {
  const appRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (appRef.current && appRef.current.children.length === 0) {
      setGlobeInstance(
        new BarGlob3d(appRef.current, null, {
          tooltipValueSuffix: 'people',
          globeColor: colorBackground,
          barColor: '#b4afe8',
          barActiveColor: colorPrimary,
          tooltipActiveBackgroundColor: colorPrimary,
          globeOpacity: globeOpacity,
        })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={appRef}
      style={{
        height: '100vh',
        width: '100%',
      }}
    ></div>
  );
}

export default Globe;
