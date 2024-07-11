import {
  Button,
  Flex,
  Divider,
  Icon,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useEditable,
} from "@chakra-ui/react";
import {
  IoIosSearch,
  IoIosHeart,
  IoIosNotifications,
  IoIosLogOut,
} from "react-icons/io";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import images from "../imagesList";
import EditPlayer from "../components/EditPlayer/EditPlayer";
import AdminSidePanel from "./AdminSidePanel/AdminSidePanel";
import { Outlet, useNavigate } from "react-router-dom";
import useAdminStore from "../store/store";

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAdminStore();
  const [activeButton, setActiveButton] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef();

  useEffect(() => {
    setActiveButton(2);
  }, []);

  return (
    <>
      <Flex minHeight="100vh" backgroundColor="#F3F3F3">
        <AdminSidePanel
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        <Flex flexDirection="column" flex="1">
          <Flex
            backgroundColor="F3F3F3"
            flex="1"
            alignItems="center"
            justifyContent="space-between"
            px="2rem"
            borderBottom="1.5px solid #d6d6d6"
          >
            <Text fontWeight="bold" fontSize="18px">
              Players
            </Text>

            <Stack direction="row" p={4} alignItems="center">
              <Icon as={IoIosSearch} boxSize={6} />
              <Icon as={IoIosHeart} boxSize={6} />
              <Icon as={IoIosNotifications} boxSize={6} />
              <Divider orientation="vertical" />

              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {JSON.parse(localStorage.getItem("adminInfo")).firstName}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      logout();
                      navigate("/adminlogin");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};

export default Admin;
