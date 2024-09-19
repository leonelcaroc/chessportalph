import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (status, message) => {
    toast({
      title: status === "error" ? "Error" : "Message",
      description: message,
      position: "bottom-right",
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useCustomToast;
