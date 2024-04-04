import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const MainLayout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />
      <Flex justifyContent="center" flex="1">
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
