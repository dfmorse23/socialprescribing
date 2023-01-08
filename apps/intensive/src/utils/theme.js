import { extendTheme } from "@chakra-ui/react";


const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const theme = extendTheme({
  config,
  colors: {
    background: "#FFFFFF",
    primary: "#4361EE",
    secondary: "#7B8CEC",

    // PRIMARY TEXT COLOR
    text: "#363C57",
    

    gray: {

      10: "#363C57",
      // Icon Color
      20: "#535874",

      30: "#7F85A0",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;

