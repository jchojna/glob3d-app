import { Flex, Typography } from 'antd';
const { Text } = Typography;

export const WithLabel = ({
  label,
  children,
  horizontal = false,
}: {
  label: string;
  children: React.ReactNode;
  horizontal?: boolean;
}) => {
  return horizontal ? (
    <Flex align="center" gap={10}>
      {children}
      <Text>{label}</Text>
    </Flex>
  ) : (
    <Flex vertical>
      <Text>{label}</Text>
      {children}
    </Flex>
  );
};
