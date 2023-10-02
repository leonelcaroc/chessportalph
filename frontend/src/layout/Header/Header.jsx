import { Box, Flex, Text } from "@chakra-ui/react";
import "./header.module.css";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <Flex
      as="header"
      w="full"
      h="5rem"
      bgColor="brand.100"
      justifyContent="space-between"
      alignItems="center"
      paddingInline="2rem"
    >
      <Box>
        <Text
          as="h2"
          fontSize="2rem"
          fontFamily="inter.700"
          color="neutral.100"
          textShadow="2px 3px 2px rgba(0,0,0,0.5)"
          cursor="pointer"
          _active={{ bgColor: "accent.400" }}
        >
          Chess Portal PH
        </Text>
      </Box>
      <Nav />
    </Flex>
  );
};

export default Header;
