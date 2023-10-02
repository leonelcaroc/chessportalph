import { Center } from "@chakra-ui/react";

const FooterNav = ({ buttonName }) => {
  return (
    <Center
      padding="0 1rem"
      marginBlock="1rem"
      cursor="pointer"
      color="brand.200"
      fontFamily="inter.300"
      fontSize="1rem"
      _hover={{ textShadow: "none" }}
      _active={{ color: "neutral.100" }}
    >
      {buttonName}
    </Center>
  );
};

export default FooterNav;
