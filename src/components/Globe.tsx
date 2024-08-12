// @ts-expect-error ignore missing glob3d types
import { BarGlob3d } from 'glob3d';
import { useEffect, useRef } from 'react';

type GlobeProps = {
  setGlobeInstance: (instance: BarGlob3d) => void;
  colors: { primary: string; background: string };
  globeOpacity: number;
};

function Globe({
  setGlobeInstance,
  colors: { primary, background },
  globeOpacity,
}: GlobeProps) {
  const appRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (appRef.current && appRef.current.children.length === 0) {
      setGlobeInstance(
        new BarGlob3d(appRef.current, null, {
          tooltipValueSuffix: 'people',
          globeColor: background,
          barColor: '#b4afe8',
          barActiveColor: primary,
          tooltipActiveBackgroundColor: primary,
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
