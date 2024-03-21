import { Center, Heading, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Center h="100vh">
      <div>
        <Heading as="h1" mb={4} fontSize="6xl" textAlign="center">
          404
        </Heading>
        <Heading as="h2" fontSize="xl" mb={8} textAlign="center">
          Page Not Found
        </Heading>
        <Center>
          <Link as={ReachLink} to="/" color="blue.500" fontSize="lg">
            Go back to Home
          </Link>
        </Center>
      </div>
    </Center>
  );
};

export default NotFound;
