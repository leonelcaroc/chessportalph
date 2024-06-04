import {
  Box,
  Button,
  Flex,
  Drawer,
  Divider,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Table,
  TableContainer,
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Tfoot,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IoIosSearch,
  IoIosHeart,
  IoIosNotifications,
  IoIosLogOut,
} from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useRef, useState } from "react";
import images from "../../utils";
import EditPlayer from "../../components/EditPlayer/EditPlayer";

const Admin = () => {
  const data = Array.from({ length: 10 }, (_, index) => index + 1);
  const [activeButton, setActiveButton] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <>
      <Flex minHeight="100vh" backgroundColor="#F3F3F3">
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
            <Flex
              justifyContent="center"
              px="1rem"
              py="0.6rem"
              borderRadius="10px"
              cursor="pointer"
              transition="ease-in 100ms"
              bgColor={activeButton === 0 ? "#3182ce" : "#F3F3F3"}
              color={activeButton === 0 ? "neutral.100" : "#000000"}
              onClick={() => handleClick(0)}
              _hover={
                activeButton === 0
                  ? null
                  : { bgColor: "gray.300", transition: "ease" }
              }
            >
              Dashboard
            </Flex>
            <Flex
              justifyContent="center"
              px="1rem"
              py="0.6rem"
              borderRadius="10px"
              cursor="pointer"
              transition="ease-in 100ms"
              bgColor={activeButton === 1 ? "#3182ce" : "#F3F3F3"}
              color={activeButton === 1 ? "neutral.100" : "#000000"}
              onClick={() => handleClick(1)}
              _hover={
                activeButton === 1
                  ? null
                  : { bgColor: "gray.300", transition: "ease" }
              }
            >
              Tournaments
            </Flex>
            <Flex
              justifyContent="center"
              px="1rem"
              py="0.6rem"
              borderRadius="10px"
              cursor="pointer"
              transition="ease-in 100ms"
              bgColor={activeButton === 2 ? "#3182ce" : "#F3F3F3"}
              color={activeButton === 2 ? "neutral.100" : "#000000"}
              onClick={() => handleClick(2)}
              _hover={
                activeButton === 2
                  ? null
                  : { bgColor: "gray.300", transition: "ease" }
              }
            >
              Players
            </Flex>
          </Flex>
        </Flex>

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
                  Edward
                </MenuButton>
                <MenuList>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
          <Flex
            backgroundColor="F3F3F3"
            flex="1"
            borderBottom="1.5px solid #d6d6d6"
            alignItems="center"
            px="1rem"
            py="0.5rem"
            gap="0.5rem"
          >
            <InputGroup maxW="75%">
              <Input type="search" placeholder="Enter player or id" />
              <InputRightElement width="4.5rem">
                <Button colorScheme="blue">Search</Button>
              </InputRightElement>
            </InputGroup>

            {/* <Menu>
              <MenuButton
                as={Button}
                display="flex"
                rightIcon={<ChevronDownIcon />}
                leftIcon={<IoFilterSharp />}
                bgColor={"#dbdbdb"}
              >
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem>Title</MenuItem>
                <MenuItem>Gender</MenuItem>
                <MenuItem>FED</MenuItem>
              </MenuList>
            </Menu> */}
            <Menu>
              <MenuButton
                as={Button}
                display="flex"
                rightIcon={<ChevronDownIcon />}
                leftIcon={<TiArrowUnsorted />}
                bgColor={"#dbdbdb"}
              >
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem>A-Z</MenuItem>
                <MenuItem>Low to High</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Box
            backgroundColor="#F3F3F3"
            flex="7"
            borderBottom="1.5px solid #d6d6d6"
          >
            <TableContainer>
              <Table variant="simple">
                <Thead borderBottom="2px solid #d6d6d6">
                  <Tr>
                    <Th>Local ID</Th>
                    <Th>Title</Th>
                    <Th>Surname</Th>
                    <Th>Name</Th>
                    <Th>Gender</Th>
                    <Th>FED</Th>
                    <Th>Standard</Th>
                    <Th>Rapid</Th>
                    <Th>Blitz</Th>
                    <Th>F-60</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item) => (
                    <Tr
                      key={item}
                      cursor="pointer"
                      _hover={{ bgColor: "gray.300" }}
                      ref={btnRef}
                      onClick={onOpen}
                    >
                      <Td>A03353</Td>
                      <Td>GM</Td>
                      <Td>CAROC</Td>
                      <Td>Leonel</Td>
                      <Td>Male</Td>
                      <Td>PHI</Td>
                      <Td>1636</Td>
                      <Td>1636</Td>
                      <Td>1636</Td>
                      <Td>1636</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Flex
            backgroundColor="#F3F3F3"
            flex="1.5"
            alignItems="center"
            gap="2rem"
            px="4rem"
            py="1rem"
            justifyContent="end"
          >
            <IconButton
              bgColor="gray.300"
              aria-label="Previous"
              size="lg"
              icon={<ChevronLeftIcon />}
            />
            Page 1 of 10
            <IconButton
              bgColor="gray.300"
              aria-label="Next"
              size="lg"
              icon={<ChevronRightIcon />}
            />
          </Flex>
        </Flex>
      </Flex>
      <EditPlayer ref={btnRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Admin;
