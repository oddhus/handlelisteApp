import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
        100: "#086F83",
        200: "#81E6D9",
        300: "#4FD1C5",
        400: "#38B2AC",
        500: "#2C7A7B",
        600: "#285E61",
        700: "#285E61",
        800: "#234E52",
        900: "#1D4044"
    },
  },
})

export default theme