import { FloatButton, Popover, Tooltip } from 'antd';
import React from 'react';

type FloatMenuItemProps = {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
};

const FloatMenuItem = ({ title, content, icon }: FloatMenuItemProps) => (
  <Popover
    title={title}
    trigger="click"
    placement="leftBottom"
    arrow={false}
    content={content}
  >
    <Tooltip title={title} placement="left" zIndex={900}>
      <FloatButton icon={icon} />
    </Tooltip>
  </Popover>
);

export default FloatMenuItem;
