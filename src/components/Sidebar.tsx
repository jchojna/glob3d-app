import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Select } from 'antd';
import { useState } from 'react';

import { endpoints } from '../constants/endpoints';
import classes from './Sidebar.module.css';

type SidebarProps = {
  dataset: string;
  setDataset: (value: string) => void;
};

function Sidebar({ dataset, setDataset }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      </Drawer>
    </>
  );
}

export default Sidebar;
