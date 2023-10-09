import { Flex } from "@chakra-ui/react";
import Header from "./layout/Header/Header.jsx";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />
      <Home />
      <Footer />
    </Flex>
  );
};

export default App;
