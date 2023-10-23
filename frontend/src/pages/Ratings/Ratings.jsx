/* eslint-disable operator-linebreak */
/* eslint-disable no-promise-executor-return */
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
  const abortController = new AbortController();
  const { signal } = abortController.signal;
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
      abortController.abort();
    };
  }, [page]);

  const fetchData = async (searchWord, page = 1) => {
    const { data } = await axios.get(
      `api/search/ratings?query=${searchWord}&page=${page}`,
      { signal }
    );
    return data;
  };

  const prevPage = () => setPage((prev) => prev - 1);
  const nextPage = () => {
    setPage((next) => next + 1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    abortController.abort();

    setPage(1);

    await new Promise((resolve) => setTimeout(resolve, 20));

    refetch();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Flex flexDirection="column" marginInline="3rem">
      <Flex alignItems="center" margin="2rem 0 0">
        <Heading as="h1">Local Ratings</Heading>
        <Text alignSelf="end" as="i" fontSize="1.2rem">
          (based on October 2023)
        </Text>
      </Flex>
      <Flex marginBlock="1rem">
        <InputGroup maxWidth="20rem" marginRight="1rem">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search player or id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderWidth="1.5px"
            borderColor="gray.400"
            spellCheck="false"
          />
        </InputGroup>
        <Button
          bgColor="gray"
          type="submit"
          onClick={handleSearch}
          border="1px solid #E2E8F0"
          _hover={{
            bgColor: "#E2E8F0",
            borderColor: "gray",
            borderStyle: "solid",
          }}
        >
          Search
        </Button>
      </Flex>
      {/* ------Data Table------- */}
      <TableContainer border="1px solid #d6d6d6" borderRadius="5px">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Local ID</Th>
              <Th>Title</Th>
              <Th>Surname</Th>
              <Th>First Name</Th>
              <Th>Gender</Th>
              <Th>Fed</Th>
              <Th>Standard</Th>
              <Th>Rapid</Th>
              <Th>Blitz</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading && !isFetching && ratingData?.length !== 0 ? (
              ratingData?.map((player) => (
                <Tr key={player._id}>
                  <Td>{player.ID_No}</Td>
                  <Td>
                    <Text
                      fontWeight="bold"
                      className={
                        player.TITLE.toLowerCase() === "gm" ||
                        player.TITLE.toLowerCase() === "wgm"
                          ? "gm-title"
                          : player.TITLE.toLowerCase() === "im" ||
                            player.TITLE.toLowerCase() === "wim"
                          ? "im-title"
                          : player.TITLE.toLowerCase() === "fm" ||
                            player.TITLE.toLowerCase() === "wfm"
                          ? "fm-title"
                          : player.TITLE.toLowerCase() === "cm" ||
                            player.TITLE.toLowerCase() === "wcm"
                          ? "cm-title"
                          : player.TITLE.toLowerCase() === "nm" ||
                            player.TITLE.toLowerCase() === "wnm"
                          ? "nm-title"
                          : player.TITLE.toLowerCase() === "agm"
                          ? "agm-title"
                          : player.TITLE.toLowerCase() === "aim"
                          ? "aim-title"
                          : player.TITLE.toLowerCase() === "afm"
                          ? "afm-title"
                          : player.TITLE.toLowerCase() === "acm"
                          ? "acm-title"
                          : null
                      }
                    >
                      {player.TITLE}
                    </Text>
                  </Td>
                  <Td>{player.SURNAME}</Td>
                  <Td>{player.NAME}</Td>
                  <Td>
                    {player.SEX.toLowerCase() === "f"
                      ? "Female"
                      : player.SEX.toLowerCase() === ""
                      ? "Male"
                      : null}
                  </Td>
                  <Td>{player.Fed}</Td>
                  <Td>{player.STD_}</Td>
                  <Td>{player.Rapid}</Td>
                  <Td>{player.Blitz}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td textAlign="center" colSpan="9">
                  No Results Found...
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* ------Data Table------- */}

      <Flex justifyContent="end" marginBlock="2rem">
        <Button
          bgColor="gray"
          onClick={prevPage}
          isDisabled={isPreviousData || page === 1 || isFetching || isLoading}
        >
          Previous
        </Button>
        <Flex marginInline="2rem" alignItems="center">
          ... Page {page} ...
        </Flex>
        <Button
          bgColor="gray"
          onClick={nextPage}
          isDisabled={
            ratingData?.length < 10 ||
            !ratingData?.length ||
            isFetching ||
            isLoading
          }
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default Ratings;
