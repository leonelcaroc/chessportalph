import { Box, HStack } from "@chakra-ui/react";
import NavButton from "../../components/NavButton/NavButton";

const Nav = () => {
  return (
    <Box as="nav">
      <HStack spacing="3rem">
        <NavButton buttonName="Home" />
        <NavButton buttonName="Ratings" />
        <NavButton buttonName="Contact us" />
      </HStack>
    </Box>
  );
};

export default Nav;
