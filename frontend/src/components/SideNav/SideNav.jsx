import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Icon,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SideNavButton from "./SideNavButton";

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Box padding="0.5rem">
        <Icon
          as={RxHamburgerMenu}
          w={8}
          h={8}
          color="#fff"
          cursor="pointer"
          ref={btnRef}
          onClick={onOpen}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerHeader fontSize="1.5rem">Chess Portal PH</DrawerHeader>
          <DrawerBody>
            <VStack spacing="0rem">
              <SideNavButton buttonName="Home" />
              <SideNavButton buttonName="Ratings" />
              <SideNavButton buttonName="Contact us" />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
