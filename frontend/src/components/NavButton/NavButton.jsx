import { Center } from "@chakra-ui/react";

const NavButton = ({ buttonName }) => {
  return (
    <Center
      padding="0 1rem"
      marginBlock="1rem"
      cursor="pointer"
      color="neutral.100"
      textShadow="2px 3px 2px rgba(0,0,0,0.5)"
      fontFamily="inter.300"
      fontSize="1.2rem"
    >
      {buttonName}
    </Center>
  );
};

export default NavButton;
