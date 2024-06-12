import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Button, Collapse, Drawer, Flex, Select } from 'antd';
import { useState } from 'react';

import { endpoints } from '../constants/endpoints';
import classes from './Sidebar.module.css';

type SidebarProps = {
  dataset: string;
  setDataset: (value: string) => void;
};

function Sidebar({ dataset, setDataset }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Datasets',
      children: (
        <Flex gap="middle" vertical>
          <Select
            defaultValue={dataset}
            onChange={(value) => setDataset(value)}
            options={Object.entries(endpoints).map(([value, label]) => ({
              value,
              label: label.label,
            }))}
          />
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
