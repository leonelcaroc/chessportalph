/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
// import DataTable from "../../components/DataTable/DataTable";
import { useSearchQuery } from "../../store/searchSlice";
import { useQuery, QueryClient } from "react-query";
import axios from "axios";

const Ratings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const controller = new AbortController();
  const { signal } = controller;
  const queryClient = new QueryClient();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: ratingData,
    isLoading,
    isFetching,
    isError,
    error,
    isPreviousData,
    refetch,
  } = useQuery(["data", page], () => fetchData(searchTerm, page), {
    enabled: false,
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    if (page > 1) {
      refetch();
    }
    return () => {
      controller.abort();
    };
  }, [page]);

  const fetchData = async (searchWord, page = 1) => {
    const { data } = await axios.get(
      `api/search/ratings?query=${searchWord}&page=${page}`
    );
    return data;
  };

  const prevPage = () => setPage((prev) => prev - 1);
  const nextPage = () => {
    setPage((next) => next + 1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    controller.abort();
    setPage(1);
    refetch({ force: true });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Heading as="h1">Local Ratings</Heading>
        <Text as="i">(based on September 2023)</Text>
      </Flex>
      <Flex>
        <InputGroup maxWidth="20rem">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search player or id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button bgColor="gray" type="submit" onClick={handleSearch}>
          Search
        </Button>
      </Flex>
      {/* ------Data Table------- */}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Surname</Th>
              <Th>First Name</Th>
              <Th>M.I.</Th>
              <Th>Gender</Th>
              <Th>Fed</Th>
              <Th>Standard</Th>
              <Th>Rapid</Th>
              <Th>Blitz</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading && !isFetching && ratingData
              ? ratingData?.map((player) => (
                  <Tr key={player._id}>
                    <Td>{player.TITLE}</Td>
                    <Td>{player.SURNAME}</Td>
                    <Td>{player.NAME}</Td>
                    <Td>T.</Td>
                    <Td>{player.SEX}</Td>
                    <Td>{player.Fed}</Td>
                    <Td>{player.STD_}</Td>
                    <Td>{player.Rapid}</Td>
                    <Td>{player.Blitz}</Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      {/* ------Data Table------- */}

      <Flex justifyContent="center">
        <Button
          bgColor="gray"
          onClick={prevPage}
          isDisabled={isPreviousData || page === 1}
        >
          Previous Page
        </Button>
        <Text marginInline="2rem">Page {page}</Text>
        <Button
          bgColor="gray"
          onClick={nextPage}
          isDisabled={ratingData?.length < 10 || !ratingData?.length}
        >
          Next Page
        </Button>
      </Flex>
    </Flex>
  );
};

export default Ratings;
