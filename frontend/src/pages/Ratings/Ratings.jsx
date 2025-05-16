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
  const [isLowerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [isLowerThan540] = useMediaQuery("(max-width: 540px)");
  const [isLowerThan355] = useMediaQuery("(max-width: 355px)");
  const [isLowerThan450] = useMediaQuery("(max-width: 450px)");
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [localId, setLocalId] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);
  const [titles, setTitles] = useState([
    "NM",
    "CM",
    "FM",
    "IM",
    "GM",
    "WNM",
    "WCM",
    "WFM",
    "WIM",
    "WGM",
    "ACM",
    "AFM",
    "AIM",
    "AGM",
  ]);
  const {
    data: ratingData,
    isLoading,
    isFetching,
    isError,
    error,
    isPreviousData,
    refetch,
  } = useQuery(
    ["data", page],
    () =>
      fetchData(
        isAdvanceSearch,
        searchTerm,
        page,
        firstName,
        lastName,
        localId,
        gender,
        title
      ),
    {
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
    }
  );

  useEffect(() => {
    // if (page > 1) {
    //   refetch();
    // }
    return () => {
      queryClient.cancelQueries("data");
      queryClient.removeQueries("data");
    };
  }, [page]);

  const resetAdvanceSearchFields = () => {
    setFirstName("");
    setLastName("");
    setLocalId("");
    setGender("");
    setTitle("");
  };

  const fetchData = async (
    isAdvanceSearch,
    searchWord,
    page,
    firstname,
    lastname,
    localId,
    gender,
    title
  ) => {
    const { data } = await axios.get("api/search/ratings", {
      params: {
        isAdvanceSearch,
        query: searchWord,
        page: page,
        firstname: firstname,
        lastname: lastname,
        localId: localId,
        gender: gender,
        title: title,
      },
    });

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
          {ratingData?.currentMonth && ratingData?.currentYear
            ? isLowerThan355
              ? `(${
                  ratingData.currentMonth.charAt(0).toUpperCase() +
                  ratingData.currentMonth.slice(1)
                } ${ratingData.currentYear})`
              : `(based on ${
                  ratingData.currentMonth.charAt(0).toUpperCase() +
                  ratingData.currentMonth.slice(1)
                } ${ratingData.currentYear})`
            : "..."}
        </Text>
      </Flex>
      <Flex
        marginBlock="1rem"
        flexDirection={isLowerThan1200 ? "column" : "row"}
      >
        {isAdvanceSearch ? (
          <>
            <Flex flexDirection="column" gap="3">
              <Flex gap="0.5rem" marginInline="auto">
                <InputGroup maxWidth={isLowerThan450 ? "10rem" : "15rem"}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                  />
                </InputGroup>
                <InputGroup
                  maxWidth={isLowerThan450 ? "10rem" : "15rem"}
                  marginRight="0.5rem"
                >
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                  />
                </InputGroup>
              </Flex>
              <Flex
                maxWidth={isLowerThan450 ? "20rem" : null}
                // marginInline={isLowerThan450 ? "auto" : null}
              >
                <InputGroup maxWidth="15rem" marginRight="0.5rem">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Local ID"
                    value={localId}
                    onChange={(e) => setLocalId(e.target.value)}
                    borderWidth="1.5px"
                    borderColor="gray.400"
                    spellCheck="false"
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                  />
                </InputGroup>
                <Select
                  borderWidth="1.5px"
                  borderColor="gray.400"
                  maxWidth="15rem"
                  placeholder="Gender"
                  marginRight="0.5rem"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>

                <Select
                  borderWidth="1.5px"
                  borderColor="gray.400"
                  maxWidth="15rem"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                >
                  {titles.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
          </>
        ) : (
          <InputGroup maxWidth="20rem">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search player or Local ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              marginRight={!isLowerThan1200 ? "1rem" : null}
              borderWidth="1.5px"
              borderColor="gray.400"
              spellCheck="false"
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </InputGroup>
        )}

        <Flex my={isLowerThan1200 ? "1rem" : null} justifyContent="start">
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
          {isAdvanceSearch ? (
            <Button
              bgColor="gray.100"
              border="1px solid #E2E8F0"
              mx="0.5rem"
              _hover={{
                bgColor: "#E2E8F0",
                borderColor: "gray",
                borderStyle: "solid",
              }}
              onClick={resetAdvanceSearchFields}
            >
              Reset
            </Button>
          ) : null}

          {isLowerThan450 && isAdvanceSearch ? null : (
            <ButtonGroup
              mx="0.5rem"
              isAttached
              variant="outline"
              display={isLowerThan450 ? null : null}
            >
              <Button
                bgColor="gray.100"
                onClick={() => {
                  resetAdvanceSearchFields();
                  setSearchTerm("");
                  setIsAdvanceSearch((e) => !e);
                }}
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
          )}
        </Flex>
        {isLowerThan450 && isAdvanceSearch ? (
          <ButtonGroup
            mx="0.5rem"
            isAttached
            variant="outline"
            display={isLowerThan450 ? null : null}
          >
            <Button
              bgColor="gray.100"
              onClick={() => {
                resetAdvanceSearchFields();
                setSearchTerm("");
                setIsAdvanceSearch((e) => !e);
              }}
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
        ) : null}
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
