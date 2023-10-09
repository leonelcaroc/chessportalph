import { Button } from "@chakra-ui/react";

const SideNavButton = ({ buttonName }) => {
  return (
    <Button
      _hover={{ bgColor: "brand.100", color: "neutral.100" }}
      fontSize="1.1rem"
      borderRadius="0"
      w="full"
    >
      {buttonName}
    </Button>
  );
};

export default SideNavButton;
