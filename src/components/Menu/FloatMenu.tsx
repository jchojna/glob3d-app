import { SettingOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useEffect, useRef, useState } from 'react';

import FiltersPanel from './FiltersPanel';
import SettingsPanel from './SettingsPanel';

type FloatMenuProps = {
  dataFilters: DataFiltersState;
  setDataFilters: (value: DataFiltersAction) => void;
  settings: SettingsState;
  setSettings: (value: SettingsAction) => void;
};

const FloatMenu = ({
  dataFilters,
  setDataFilters,
  settings,
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

  return (
    <div ref={menuRef}>
      <FloatButton.Group
        trigger="click"
        style={{ right: 50, bottom: 50 }}
        icon={<SettingOutlined />}
        open={isGroupOpen}
        tooltip="Settings"
      >
        <FiltersPanel state={dataFilters} dispatch={setDataFilters} />
        <SettingsPanel state={settings} dispatch={setSettings} />
      </FloatButton.Group>
    </div>
  );
};

export default FloatMenu;
