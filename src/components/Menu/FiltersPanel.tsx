import { DatabaseOutlined } from '@ant-design/icons';
import { Flex, Select, Slider } from 'antd';

import { endpoints } from '../../constants/endpoints';
import { WithLabel } from '../WithLabel';
import FloatMenuItem from './FloatMenuItem';

type FiltersPanelProps = {
  state: DataFiltersState;
  dispatch: (value: DataFiltersAction) => void;
};

const FiltersPanel = ({
  state: { dataset, queryLimit, selectedCountries, allCountries },
  dispatch,
}: FiltersPanelProps) => {
  const handleDatasetChange = (dataset: string) => {
    dispatch({
      type: 'changed_dataset',
      dataset,
    });
  };

  const handleQueryLimitChange = (queryLimit: number) => {
    dispatch({
      type: 'changed_query_limit',
      queryLimit,
    });
  };

  const handleSelectedCountriesChange = (countries: string[]) => {
    dispatch({
      type: 'changed_selected_countries',
      countries,
    });
  };

  return (
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
  );
};

export default FiltersPanel;
