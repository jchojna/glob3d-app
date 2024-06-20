import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import {
  Button,
  Collapse,
  Drawer,
  Flex,
  Select,
  Slider,
  Typography,
} from 'antd';
import { useMemo, useState } from 'react';

import { endpoints } from '../constants/endpoints';
import classes from './Sidebar.module.css';

type SidebarProps = {
  processedData: GlobeData[] | null;
  dataset: string;
  setDataset: (value: string) => void;
};

const { Text } = Typography;

function WithLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Flex vertical>
      <Text>{label}</Text>
      {children}
    </Flex>
  );
}

function Sidebar({ processedData, dataset, setDataset }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const countries: string[] = useMemo(() => {
    if (!processedData) return [];
    const countries = new Set<string>();
    processedData.forEach((city: GlobeData) => countries.add(city.country));
    return Array.from(countries);
  }, [processedData]);
  console.log(countries);

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
          <WithLabel label="Results limit">
            <Slider defaultValue={30} min={10} max={10000} step={10} />
          </WithLabel>
          {/* <WithLabel label="Filter countries">
            <Select
              // defaultValue={dataset}
              // onChange={(value) => setDataset(value)}
              options={Object.entries(endpoints).map(([value, label]) => ({
                value,
                label: label.label,
              }))}
            />
          </WithLabel> */}
        </Flex>
      ),
    },
    {
      key: '2',
      label: 'Globe Settings',
      children: <p>Placeholder</p>,
    },
  ];

  return (
    <>
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
      >
        <Collapse
          items={collapseItems}
          defaultActiveKey={['1']}
          bordered={false}
        />
      </Drawer>
    </>
  );
}

export default Sidebar;
