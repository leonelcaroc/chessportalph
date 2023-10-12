import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import DataTable from "../../components/DataTable/DataTable";

const Ratings = () => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Heading as="h1">Local Ratings</Heading>
        <Text as="i">(based on September 2023)</Text>
      </Flex>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="search" placeholder="Search player or id" />
      </InputGroup>
      <DataTable />
    </Flex>
  );
};

export default Ratings;
