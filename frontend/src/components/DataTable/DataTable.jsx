import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
        <Tfoot>
          <Tr>
            <Th colSpan="3">To convert</Th>
            <Th colSpan="4" />
            <Th colSpan="3">Prev and Next</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
