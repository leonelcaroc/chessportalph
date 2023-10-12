import { Button, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const SideNavButton = ({ buttonName, route, closeSideNav }) => {
  return (
    <Link as={ReachLink} to={route} onClick={closeSideNav}>
      <Button
        _hover={{ bgColor: "brand.100", color: "neutral.100" }}
        fontSize="1.1rem"
        borderRadius="0"
        w="full"
      >
        {buttonName}
      </Button>
    </Link>
  );
};

export default SideNavButton;
