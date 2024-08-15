import {
  DatabaseOutlined,
  GlobalOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ColorPicker, Flex, FloatButton, Select, Slider, Switch } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { endpoints } from '../constants/endpoints';
import FloatMenuItem from './FloatMenuItem';
import { WithLabel } from './WithLabel';

type FloatMenuProps = {
  dataFilters: DataFiltersState;
  setDataFilters: (value: DataFiltersAction) => void;
  settings: SettingsState;
  setSettings: (value: SettingsAction) => void;
};

const FloatMenu = ({
  dataFilters: { dataset, queryLimit, selectedCountries, allCountries },
  setDataFilters,
  settings: { colorPrimary, colorBackground, globeOpacity, autoRotate },
  setSettings,
}: FloatMenuProps) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const menuRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (menuRef.current && !isMounted.current) {
      isMounted.current = true; // subscribe only once
      (menuRef.current as HTMLElement).addEventListener('click', function (e) {
        const isOpen = this.querySelector('.ant-float-btn-group-wrap');
        if (isOpen && isOpen.contains(e.target as Node)) return;
        setIsGroupOpen(!isOpen);
      });
    }
  }, []);

  const handleDatasetChange = (dataset: string) => {
    setDataFilters({
      type: 'changed_dataset',
      dataset,
    });
  };
  const handleQueryLimitChange = (queryLimit: number) => {
    setDataFilters({
      type: 'changed_query_limit',
      queryLimit,
    });
  };
  const handleSelectedCountriesChange = (countries: string[]) => {
    setDataFilters({
      type: 'changed_selected_countries',
      countries,
    });
  };

  const handlePrimaryColorChange = (color: string) => {
    setSettings({
      type: 'changed_primary_color',
      color,
    });
  };
  const handleBackgroundColorChange = (color: string) => {
    setSettings({
      type: 'changed_background_color',
      color,
    });
  };
  const handleGlobeOpacityChange = (opacity: number) => {
    setSettings({
      type: 'changed_globe_opacity',
      opacity,
    });
  };
  const handleAutoRotateChange = (autoRotate: boolean) => {
    setSettings({
      type: 'changed_auto_rotate',
      autoRotate,
    });
  };

  return (
    <div ref={menuRef}>
      <FloatButton.Group
        trigger="click"
        style={{ right: 50, bottom: 50 }}
        icon={<SettingOutlined />}
        open={isGroupOpen}
        tooltip="Settings"
      >
        <FloatMenuItem
          title="Data Filters"
          content={
            <Flex gap="middle" vertical>
              <WithLabel label="Select dataset">
                <Select
                  defaultValue={dataset}
                  onChange={handleDatasetChange}
                  options={Object.entries(endpoints).map(([value, label]) => ({
                    value,
                    label: label.label,
                  }))}
                />
              </WithLabel>
              <WithLabel label={`Results limit [${queryLimit}]`}>
                <Slider
                  defaultValue={queryLimit}
                  min={0}
                  max={100}
                  onChangeComplete={handleQueryLimitChange}
                />
              </WithLabel>
              <WithLabel label="Filter countries">
                <Select
                  mode="multiple"
                  maxTagCount={1}
                  value={selectedCountries}
                  onChange={handleSelectedCountriesChange}
                  placeholder="All countries"
                  options={allCountries.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                />
              </WithLabel>
            </Flex>
          }
          icon={<DatabaseOutlined />}
        />
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
                <Switch
                  checked={autoRotate}
                  onChange={handleAutoRotateChange}
                />
              </WithLabel>
            </Flex>
          }
          icon={<GlobalOutlined />}
        />
      </FloatButton.Group>
    </div>
  );
};

export default FloatMenu;
