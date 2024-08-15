import { GlobalOutlined } from '@ant-design/icons';
import { ColorPicker, Flex, Slider, Switch } from 'antd';

import { WithLabel } from '../WithLabel';
import FloatMenuItem from './FloatMenuItem';

type SettingsPanelProps = {
  state: SettingsState;
  dispatch: (value: SettingsAction) => void;
};

const SettingsPanel = ({
  state: { colorPrimary, colorBackground, globeOpacity, autoRotate },
  dispatch,
}: SettingsPanelProps) => {
  const handlePrimaryColorChange = (color: string) => {
    dispatch({
      type: 'changed_primary_color',
      color,
    });
  };

  const handleBackgroundColorChange = (color: string) => {
    dispatch({
      type: 'changed_background_color',
      color,
    });
  };

  const handleGlobeOpacityChange = (opacity: number) => {
    dispatch({
      type: 'changed_globe_opacity',
      opacity,
    });
  };

  const handleAutoRotateChange = (autoRotate: boolean) => {
    dispatch({
      type: 'changed_auto_rotate',
      autoRotate,
    });
  };

  return (
    <FloatMenuItem
      title="Globe Settings"
      content={
        <Flex gap="middle" vertical>
          <ColorPicker
            defaultValue={colorPrimary}
            onChangeComplete={(color) =>
              handlePrimaryColorChange(color.toHexString())
            }
            showText={() => 'Primary color'}
          />
          <ColorPicker
            defaultValue={colorBackground}
            onChangeComplete={(color) =>
              handleBackgroundColorChange(color.toHexString())
            }
            showText={() => 'Background color'}
          />
          <WithLabel label="Globe opacity">
            <Slider
              defaultValue={globeOpacity}
              min={0}
              max={1}
              step={0.05}
              onChangeComplete={handleGlobeOpacityChange}
            />
          </WithLabel>
          <WithLabel label="Auto Rotate" horizontal>
            <Switch checked={autoRotate} onChange={handleAutoRotateChange} />
          </WithLabel>
        </Flex>
      }
      icon={<GlobalOutlined />}
    />
  );
};

export default SettingsPanel;
