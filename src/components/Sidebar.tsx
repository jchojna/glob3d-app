import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import {
  Button,
  Collapse,
  ColorPicker,
  ConfigProvider,
  Drawer,
  Flex,
  Select,
  Slider,
} from 'antd';
import { useState } from 'react';

import { endpoints } from '../constants/endpoints';
import classes from './Sidebar.module.css';
import { WithLabel } from './WithLabel';

type SidebarProps = {
  dataset: string;
  setDataset: (value: string) => void;
  queryLimit: number;
  setQueryLimit: (value: number) => void;
  allCountries: string[];
  selectedCountries: string[];
  setSelectedCountries: (value: string[]) => void;
  globeColor: string;
  setGlobeColor: (color: string) => void;
};

function Sidebar({
  dataset,
  setDataset,
  queryLimit,
  setQueryLimit,
  allCountries,
  selectedCountries,
  setSelectedCountries,
  globeColor,
  setGlobeColor,
}: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Datasets',
      children: (
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
      ),
    },
    {
      key: '2',
      label: 'Globe Settings',
      children: (
        <Flex gap="middle" vertical align="flex-start">
          <ColorPicker
            defaultValue={globeColor}
            onChangeComplete={(color) => setGlobeColor(color.toHexString())}
            showText={() => 'Theme color'}
          />
        </Flex>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            contentPadding: 30,
            headerPadding: 20,
          },
        },
        token: {},
      }}
    >
      <Button
        onClick={() => setSidebarOpen(true)}
        className={classes.sidebarButton}
      >
        <MenuOutlined />
      </Button>
      <Drawer
        title="Settings"
        onClose={() => setSidebarOpen(false)}
        open={sidebarOpen}
        closeIcon={<LeftOutlined />}
        mask={false}
        placement="left"
        width={300}
        styles={{ body: { padding: 0 } }}
      >
        <Collapse
          items={collapseItems}
          defaultActiveKey={['1']}
          bordered={false}
        />
      </Drawer>
    </ConfigProvider>
  );
}

export default Sidebar;
