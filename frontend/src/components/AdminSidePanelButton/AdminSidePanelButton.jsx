import { Flex } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const AdminSidePanelButton = ({
  buttonName,
  activeButton,
  setActiveButton,
  count,
  to,
}) => {
  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <ChakraLink as={ReachLink} to={to} _hover={{ textDecoration: "none" }}>
      <Flex
        justifyContent="center"
        px="1rem"
        py="0.6rem"
        borderRadius="10px"
        cursor="pointer"
        transition="ease-in 100ms"
        bgColor={activeButton === count ? "#3182ce" : "#F3F3F3"}
        color={activeButton === count ? "neutral.100" : "#000000"}
        onClick={() => handleClick(count)}
        _hover={
          activeButton === count
            ? null
            : { bgColor: "gray.300", transition: "ease" }
        }
      >
        {buttonName}
      </Flex>
    </ChakraLink>
  );
};

export default AdminSidePanelButton;
