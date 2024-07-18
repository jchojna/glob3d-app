import {
  DatabaseOutlined,
  GlobalOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ColorPicker, Flex, FloatButton, Popover, Select, Slider } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { endpoints } from '../constants/endpoints';
import { WithLabel } from './WithLabel';

type FloatMenuProps = {
  dataset: string;
  setDataset: (value: string) => void;
  queryLimit: number;
  setQueryLimit: (value: number) => void;
  allCountries: string[];
  selectedCountries: string[];
  setSelectedCountries: (value: string[]) => void;
  colorBg: string;
  setColorBg: (color: string) => void;
  colorPrimary: string;
  setColorPrimary: (color: string) => void;
  globeOpacity: number;
  setGlobeOpacity: (opacity: number) => void;
};

const FloatMenu = ({
  dataset,
  setDataset,
  queryLimit,
  setQueryLimit,
  allCountries,
  selectedCountries,
  setSelectedCountries,
  colorBg,
  setColorBg,
  colorPrimary,
  setColorPrimary,
  globeOpacity,
  setGlobeOpacity,
}: FloatMenuProps) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const menuRef = useRef(null);
  const isMounted = useRef(false);

  // comment here...
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

  return (
    <div ref={menuRef}>
      <FloatButton.Group
        trigger="click"
        style={{ right: 50, bottom: 50 }}
        icon={<SettingOutlined />}
        open={isGroupOpen}
        tooltip="Settings"
      >
        <Popover
          title="Dataset"
          content={
            <Flex gap="middle" vertical>
              <WithLabel label="Select dataset">
                <Select
                  defaultValue={dataset}
                  onChange={(value) => setDataset(value)}
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
                  onChangeComplete={(value) => setQueryLimit(value)}
                />
              </WithLabel>
              <WithLabel label="Filter countries">
                <Select
                  mode="multiple"
                  maxTagCount={1}
                  value={selectedCountries}
                  onChange={(value) => setSelectedCountries(value)}
                  placeholder="All countries"
                  options={allCountries.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                />
              </WithLabel>
            </Flex>
          }
          trigger="click"
          placement="leftBottom"
          arrow={false}
        >
          <FloatButton icon={<DatabaseOutlined />} tooltip="Dataset" />
        </Popover>
        <Popover
          title="Globe Settings"
          content={
            <Flex gap="middle" vertical>
              <ColorPicker
                defaultValue={colorPrimary}
                onChangeComplete={(color) =>
                  setColorPrimary(color.toHexString())
                }
                showText={() => 'Primary color'}
              />
              <ColorPicker
                defaultValue={colorBg}
                onChangeComplete={(color) => setColorBg(color.toHexString())}
                showText={() => 'Background color'}
              />
              <WithLabel label="Globe opacity">
                <Slider
                  defaultValue={globeOpacity}
                  min={0}
                  max={1}
                  step={0.05}
                  onChangeComplete={(value) => setGlobeOpacity(value)}
                />
              </WithLabel>
            </Flex>
          }
          trigger="click"
          placement="leftBottom"
          arrow={false}
        >
          <FloatButton icon={<GlobalOutlined />} tooltip="Globe Settings" />
        </Popover>
      </FloatButton.Group>
    </div>
  );
};

export default FloatMenu;