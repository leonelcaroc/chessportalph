import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const DataTable = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Title</Th>
            <Th>Surname</Th>
            <Th>First Name</Th>
            <Th>M.I.</Th>
            <Th>Gender</Th>
            <Th>Fed</Th>
            <Th>Standard</Th>
            <Th>Rapid</Th>
            <Th>Blitz</Th>
            <Th>Fischer-960</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>GM</Td>
            <Td>Antonio</Td>
            <Td>Joey</Td>
            <Td>T.</Td>
            <Td>Male</Td>
            <Td>PHI</Td>
            <Td>2436</Td>
            <Td>2387</Td>
            <Td>2512</Td>
            <Td>2417</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
