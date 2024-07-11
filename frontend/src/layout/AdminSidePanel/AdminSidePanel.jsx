import { Box, Flex, Image } from "@chakra-ui/react";
import images from "../../imagesList";
import AdminSidePanelButton from "../../components/AdminSidePanelButton/AdminSidePanelButton";

const AdminSidePanel = ({ activeButton, setActiveButton }) => {
  return (
    <Flex
      backgroundColor="#F3F3F3"
      minW="15rem"
      borderRight="1.5px solid #d6d6d6"
      py="1.5rem"
      px="1rem"
      flexDirection="column"
      alignItems="center"
    >
      <Box boxSize="5rem" mb="4rem">
        <Image src={images.mainlogo} alt="Dan Abramov" />
      </Box>
      <Flex flexDirection="column" gap="5px" width="100%">
        {/* <AdminSidePanelButton
          buttonName="Dashboard"
          count={0}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          to="/admin/dashboard"
        />
        <AdminSidePanelButton
          buttonName="Tournaments"
          count={1}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          to="/admin/tournaments"
        /> */}
        <AdminSidePanelButton
          buttonName="Players"
          count={2}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          to="/admin/players"
        />
      </Flex>
    </Flex>
  );
};

export default AdminSidePanel;
