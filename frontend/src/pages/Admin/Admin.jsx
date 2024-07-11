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
import { useEffect, useRef, useState } from "react";
import images from "../../imagesList";
import EditPlayer from "../../components/EditPlayer/EditPlayer";
import AdminSidePanel from "../../layout/AdminSidePanel/AdminSidePanel";
import AdminService from "../../services/adminService";
import { useQuery, useQueryClient } from "react-query";

const Admin = () => {
  const sampleData = Array.from({ length: 10 }, (_, index) => index + 1);
  const [activeButton, setActiveButton] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef();

  const { data: allPlayers, isLoading: isLoadingPlayers } = useQuery(
    "players",
    () => AdminService.getPlayers(page, limit),
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong.",
          status: error.response.data.status,
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      },
    }
  );

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
                  Edward s
                </MenuButton>
                <MenuList>
                  <MenuItem>Logout ow</MenuItem>
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
                    {/* <Th>F-60</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {allPlayers?.items.map((item) => (
                    <Tr
                      key={item._id}
                      cursor="pointer"
                      _hover={{ bgColor: "gray.300" }}
                      // ref={btnRef}
                      onClick={onOpen}
                    >
                      <Td>{item.ID_No}</Td>
                      <Td>{item.TITLE}</Td>
                      <Td>{item.SURNAME}</Td>
                      <Td>{item.NAME}</Td>
                      <Td>{item.SEX}</Td>
                      <Td>{item.Fed}</Td>
                      <Td>{item.STD_}</Td>
                      <Td>{item.Rapid}</Td>
                      <Td>{item.Blitz}</Td>
                      {/* <Td>{item}</Td> */}
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
      <EditPlayer
        // ref={btnRef}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Admin;
