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
  ButtonGroup,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useToast,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import DataTable from "../../components/DataTable/DataTable";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const Ratings = () => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const queryClient = useQueryClient();
  const { isOpen, onToggle } = useDisclosure();
  const [isLowerThan540] = useMediaQuery("(max-width: 540px)");
  const [isLowerThan355] = useMediaQuery("(max-width: 355px)");
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);
  const {
    data: ratingData,
    isLoading,
    isFetching,
    isError,
    error,
    isPreviousData,
    refetch,
  } = useQuery(["data", page], () => fetchData(searchTerm, page), {
    keepPreviousData: true,
    staleTime: 5000,
    onError: () => {
      toast({
        title: "Something went wrong...",
        status: "error",
        duration: 3000,
        position: "bottom-right",
      });
    },
    onSuccess: (data) => {
      if (data.items.length === 0) {
        toast({
          title: "No results Found",
          status: "error",
          duration: 3000,
          position: "bottom-right",
        });
        // setPage(0);
      }
      setTotalPages(data.totalPage);
    },
  });

  useEffect(() => {
    // if (page > 1) {
    //   refetch();
    // }
    return () => {
      queryClient.cancelQueries("data");
      queryClient.removeQueries("data");
    };
  }, [page]);

  const fetchData = async (searchWord, page) => {
    // if (searchWord === "") {
    //   searchWord = "a";
    // }
    // setPage(1);

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

    setPage(1);

    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setPage(1);
      buttonRef.current.click();
    }
  };

  return (
    <Flex flexDirection="column" marginInline="3rem">
      <Flex alignItems="center" margin="2rem 0 0">
        <Heading
          as="h1"
          fontSize={isLowerThan540 ? "1.4rem" : "1.875rem"}
          whiteSpace="nowrap"
        >
          Local Ratings
        </Heading>
        <Text
          alignSelf="end"
          as="i"
          fontSize={isLowerThan540 ? "1rem" : "1.2rem"}
          whiteSpace="nowrap"
        >
          {isLowerThan355 ? "(Septembers 2024)" : "(based on Septembers 2024)"}
        </Text>
      </Flex>
      <Flex marginBlock="1rem">
        {isAdvanceSearch ? (
          <>
            <Flex flexDirection="column" gap="3">
              <Flex>
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Last Name"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                  />
                </InputGroup>
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Last Name"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                  />
                </InputGroup>
              </Flex>
              <Flex>
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Local ID"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                  />
                </InputGroup>
                <Select
                  borderWidth="1.5px"
                  borderColor="gray.400"
                  maxWidth="15rem"
                  placeholder="Gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Flex>
            </Flex>
          </>
        ) : (
          <InputGroup maxWidth="20rem" marginRight="1rem">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search player or Local ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderWidth="1.5px"
              borderColor="gray.400"
              spellCheck="false"
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </InputGroup>
        )}

        {/* {!isOpen ? (
          <InputGroup maxWidth="20rem" marginRight="1rem">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search player or Local ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderWidth="1.5px"
              borderColor="gray.400"
              spellCheck="false"
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </InputGroup>
        ) : null}

        <Collapse in={isOpen} animateOpacity>
          <>
            <Flex flexDirection="column" gap="3">
              <Flex>
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Last Name"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                  />
                </InputGroup>
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Last Name"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                  />
                </InputGroup>
              </Flex>
              <Flex>
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Local ID"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                  />
                </InputGroup>
                <Select
                  borderWidth="1.5px"
                  borderColor="gray.400"
                  maxWidth="15rem"
                  placeholder="Gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Flex>
            </Flex>
          </>
        </Collapse> */}

        <Button
          bgColor="blue.200"
          type="submit"
          onClick={handleSearch}
          ref={buttonRef}
          isLoading={isFetching}
          border="1px solid #E2E8F0"
          _hover={{
            bgColor: "#E2E8F0",
            borderColor: "gray",
            borderStyle: "solid",
          }}
        >
          Search
        </Button>
        <ButtonGroup mx="1rem" isAttached variant="outline">
          <Button
            bgColor="gray.100"
            onClick={() => setIsAdvanceSearch((e) => !e)}
            // onClick={onToggle}
          >
            Advance Search
          </Button>
          <IconButton
            bgColor="gray.100"
            icon={isAdvanceSearch ? <MinusIcon /> : <AddIcon />}
            _hover={{}}
            cursor="auto"
            _active={{}}
            _focusVisible={{}}
          />
        </ButtonGroup>
      </Flex>

      <DataTable
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        ratingData={ratingData?.items}
        error={error}
      />
      <Flex justifyContent="end" marginBlock="2rem">
        <Button
          bgColor="gray.400"
          onClick={prevPage}
          isDisabled={isPreviousData || page === 1 || isFetching || isLoading}
        >
          Previous
        </Button>
        <Flex
          marginInline={isLowerThan355 ? "1rem" : "2rem"}
          alignItems="center"
        >
          <Text>
            Page {ratingData?.items?.length > 0 ? page : "0"} of {totalPages}
          </Text>
        </Flex>
        <Button
          bgColor="gray.400"
          onClick={nextPage}
          isDisabled={
            ratingData?.items?.length < 10 ||
            !ratingData?.items?.length ||
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
