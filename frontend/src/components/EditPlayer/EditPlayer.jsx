import {
  Box,
  Text,
  Flex,
  Card,
  CardBody,
  Button,
  Input,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerCloseButton,
  DrawerOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

function EditPlayer({ ref, isOpen, onClose }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" finalFocusRef={ref} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => onClose()} />
          <DrawerHeader>Edit Player</DrawerHeader>

          <DrawerBody>
            <Card>
              <CardBody>
                <Flex flexDirection="column" gap="1rem">
                  <Box>
                    <Text>Local ID</Text>
                    <Input value="A03656" />
                  </Box>
                  <Box>
                    <Text>Title</Text>
                    <Select placeholder="Select option" value="nm">
                      <option value="nm">NM</option>
                      <option value="cm">CM</option>
                      <option value="fm">FM</option>
                      <option value="im">IM</option>
                      <option value="gm">GM</option>
                    </Select>
                  </Box>

                  <Box>
                    <Text>First Name</Text>
                    <Input value="Leonel" />
                  </Box>
                  <Box>
                    <Text>Last Name</Text>
                    <Input value="Caroc" />
                  </Box>
                  <Box>
                    <Text>Gender</Text>
                    <Select placeholder="Select option" value="male">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text>Federation</Text>
                    <Input placeholder="Enter Federation" value="PHI" />
                  </Box>
                  <Box>
                    <Text>Standard</Text>
                    <Input value="2048" />
                  </Box>
                  <Box>
                    <Text>Rapid</Text>
                    <Input value="2048" />
                  </Box>
                  <Box>
                    <Text>Blitz</Text>
                    <Input value="2048" />
                  </Box>
                  <Box>
                    <Text>Fischer Random</Text>
                    <Input defaultValue="2048" />
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default EditPlayer;
