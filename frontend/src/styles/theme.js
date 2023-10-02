import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#394867",
      200: "#212A3E",
      300: "#9BA4B5",
    },
    accent: {
      100: "#3D0C11",
      200: "#D80032",
      300: "#004225",
    },
    neutral: {
      100: "#F1F6F9",
    },
  },
  fonts: {
    inter: {
      100: "Inter-Thin",
      200: "Inter-ExtraLight",
      300: "Inter-Light",
      400: "Inter-Medium",
      500: "Inter-Regular",
      600: "Inter-SemiBold",
      700: "Inter-Bold",
      800: "Inter-ExtraBold",
      900: "Inter-Black",
    },
  },
});

export default theme;
