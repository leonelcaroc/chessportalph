import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { TiArrowUnsorted } from "react-icons/ti";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import EditPlayer from "../../components/EditPlayer/EditPlayer";
import { debounce } from "lodash";
import { useDeferredValue } from "react";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";

const AdminPlayers = () => {
  const [search, setSearch] = useState("");
  const [player, setPlayer] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: allPlayers,
    isLoading: isLoadingPlayers,
    refetch: refetchPlayers,
  } = useQuery(
    ["players", page],
    () => AdminService.getPlayers(search, page, limit),
    {
      onSuccess: (data) => {
        setTotalPage(data.totalPage);
      },
    },
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleNextPage = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = async () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const previewPlayer = (player) => {
    setPlayer(player);
    onOpen();
    // console.log(id);
  };

  return (
    <>
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
          <Input
            type="search"
            placeholder="Enter player or id"
            value={search}
            onChange={handleSearchChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              colorScheme="blue"
              onClick={() => {
                setPage(1);
                refetchPlayers();
              }}
            >
              Search
            </Button>
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
                <Th>F-960</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allPlayers?.items.map((item) => (
                <Tr
                  key={item._id}
                  cursor="pointer"
                  _hover={{ bgColor: "gray.300" }}
                  onClick={() => previewPlayer(item)}
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
                  <Td>{item["F-960"]}</Td>
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
          onClick={handlePreviousPage}
          isDisabled={isLoadingPlayers}
        />
        Page {page} of {totalPage}
        <IconButton
          bgColor="gray.300"
          aria-label="Next"
          size="lg"
          icon={<ChevronRightIcon />}
          onClick={handleNextPage}
          isDisabled={isLoadingPlayers || page === totalPage}
        />
      </Flex>
      <EditPlayer
        isOpen={isOpen}
        onClose={onClose}
        player={player}
        setPlayer={setPlayer}
      />
    </>
  );
};

export default AdminPlayers;
