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
} from "@chakra-ui/react";

function EditPlayer({ ref, isOpen, onClose, player, setPlayer }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Edit Player</DrawerHeader>

          <DrawerBody>
            <Card>
              <CardBody>
                <Flex flexDirection="column" gap="1rem">
                  <Box>
                    <Text>Local ID</Text>
                    <Input
                      defaultValue={player?.ID_No}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          ID_No: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Title</Text>
                    <Select
                      placeholder="Select option"
                      defaultValue={player?.TITLE}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          TITLE: e.target.value,
                        }))
                      }
                    >
                      <option value="NM">NM</option>
                      <option value="CM">CM</option>
                      <option value="FM">FM</option>
                      <option value="IM">IM</option>
                      <option value="GM">GM</option>
                      <option value="ACM">ACM</option>
                      <option value="AFM">AFM</option>
                      <option value="AIM">AIM</option>
                      <option value="AGM">AGM</option>
                    </Select>
                  </Box>

                  <Box>
                    <Text>First Name</Text>
                    <Input
                      defaultValue={player?.NAME}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          NAME: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Last Name</Text>
                    <Input
                      defaultValue={player?.SURNAME}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          SURNAME: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Gender</Text>
                    <Select
                      placeholder="Select option"
                      value={player?.SEX}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          SEX: e.target.value,
                        }))
                      }
                    >
                      <option value="">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text>Federation</Text>
                    <Input
                      placeholder="Enter Federation"
                      defaultValue={player?.Fed}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          Fed: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Standard</Text>
                    <Input
                      defaultValue={player?.STD_}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          STD_: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Rapid</Text>
                    <Input
                      defaultValue={player?.Rapid}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          Rapid: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Blitz</Text>
                    <Input
                      defaultValue={player?.Blitz}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          Blitz: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box>
                    <Text>Fischer Random</Text>
                    <Input
                      defaultValue={player?.["F-960"]}
                      onChange={(e) =>
                        setPlayer((prev) => ({
                          ...prev,
                          "F-960": e.target.value,
                        }))
                      }
                    />
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setPlayer(null);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => console.log(player)}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default EditPlayer;
