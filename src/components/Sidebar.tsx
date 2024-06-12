import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useState } from 'react';

import classes from './Sidebar.module.css';

function Sidebar({ globe, preparedData }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setSidebarOpen(true)}
        className={classes.sidebarButton}
      >
        <MenuOutlined />
      </Button>
      <Drawer
        title="Sidebar"
        onClose={() => setSidebarOpen(false)}
        open={sidebarOpen}
        closeIcon={<LeftOutlined />}
        mask={true}
        placement="left"
      >
        <Button
          onClick={() => globe.update(preparedData)}
          className="update-button"
          type="primary"
        >
          Update
        </Button>
      </Drawer>
    </>
  );
}

export default Sidebar;
