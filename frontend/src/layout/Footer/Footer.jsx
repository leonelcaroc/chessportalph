import { Flex } from "@chakra-ui/react";
import FooterNav from "../../components/FooterNav/FooterNav";
import "./footer.module.css";

const Footer = () => {
  return (
    <Flex
      bgColor="neutral.300"
      justifyContent="space-between"
      alignItems="center"
      paddingInline="1rem"
    >
      <Flex alignItems="center">
        Chess Portal PH © Copyright 2023, Inc. All rights reserved.
      </Flex>
      <Flex>
        <FooterNav buttonName="Home" />
        <FooterNav buttonName="About" />
        <FooterNav buttonName="Contact Us" />
        <FooterNav buttonName="FAQs" />
      </Flex>
    </Flex>
  );
};

export default Footer;
