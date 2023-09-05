import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import React from "react";
import "./header.module.css";

const Header = () => {
  return (
    <Menu h="100rem" w="100rem">
      <MenuButton
        h="10rem"
        w="10rem"
        bgGradient="linear(to-r, green.200, pink.500)"
        rightIcon={<BiChevronDown />}
      >
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Header;
