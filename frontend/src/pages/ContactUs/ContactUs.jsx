import contactImage from "../../assets/images/contact-us.png";
import { Box, Flex, Image, Input, Textarea } from "@chakra-ui/react";

const ContactUs = () => {
  return (
    <Flex my="5rem" gap="3rem">
      <Flex flexDirection="column" maxWidth="50rem">
        <Box fontSize="3xl" fontWeight="extrabold">
          Get in Touch
        </Box>
        <Box>
          Contact or send us a message and our team would reply within 24hrs.
        </Box>
        <Box my="3">
          <Box>Full Name</Box>
          <Input placeholder="Enter name"></Input>
        </Box>
        <Box my="3">
          <Box>Email Address</Box>
          <Input placeholder="abc@gmail.com"></Input>
        </Box>
        <Box my="3">
          <Box>Message</Box>
          <Textarea placeholder="Type your message..."></Textarea>
        </Box>
      </Flex>
      <Box>
        <Image src={contactImage} />
      </Box>
    </Flex>
  );
};

export default ContactUs;
