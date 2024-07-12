import { Flex, Typography } from 'antd';
const { Text } = Typography;

export const WithLabel = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex vertical>
      <Text>{label}</Text>
      {children}
    </Flex>
  );
};
