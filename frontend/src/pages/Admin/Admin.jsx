import { Box, Flex } from "@chakra-ui/react";

const Admin = () => {
  return (
    <Flex
      minHeight="100vh"
      backgroundColor="aqua"
      padding="3rem 5rem"
      gap="1rem"
    >
      <Box backgroundColor="red" minW="15rem">
        Side Panel
      </Box>
      <Flex flexDirection="column" gap="1rem" flex="1">
        <Box backgroundColor="yellow" flex="1">
          Header
        </Box>
        <Box backgroundColor="green" flex="3">
          Section 1
        </Box>
        <Box backgroundColor="purple" flex="2">
          Section 2
        </Box>
      </Flex>
    </Flex>
  );
};

export default Admin;
