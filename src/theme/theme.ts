import { StyleFunctionProps, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      'html, body': {
        background: mode('gray.100', 'gray.800')(props),  //mode(light mode color, dark mode color)
      },
    }),
  },
  colors: {
    normal: {
      50: "#FEF1BE",
      100: "#FEEFB4",
      200: "#FDEBA0",
      300: "#FDE68A",
      400: "#FCDE64",
      500: "#FCD436",
      600: "#FBC904",
      700: "#F1C104",
      800: "#E7B904",
      900: "#DDB104",
    },
    effect: {
      50: "#FFD6C2",
      100: "#FFCCB3",
      200: "#FFB18A",
      300: "#FF8B53",
      400: "#FF7E3D",
      500: "#FF6D24",
      600: "#FA5300",
      700: "#EB4E00",
      800: "#D64700",
      900: "#BD3F00",
    
    },
    ritual: {
      50: "#E8EDF3",
      100: "#DDE6EE",
      200: "#C9D7E3",
      300: "#B5C7D9",
      400: "#9DB5CC",
      500: "#90ACC5",
      600: "#809FBD",
      700: "#6F93B4",
      800: "#5E86AB",
      900: "#4F7497"
    },
    fusion: {
      50: "#EDE9F2",
      100: "#E3DCEA",
      200: "#D2C5DD",
      300: "#BBA9CC",
      400: "#A086B7",
      500: "#9B7FB3",
      600: "#9375AD",
      700: "#8C6CA7",
      800: "#8462A2",
      900: "#775893"
    },
    synchro: {
      50: "#F2F2F2",
      100: "#F0F0F0",
      200: "#EBEBEB",
      300: "#E8E8E8",
      400: "#E3E3E3",
      500: "#E0E0E0",
      600: "#D9D9D9",
      700: "#D6D6D6",
      800: "#D1D1D1",
      900: "#CCCCCC"
    },
    xyz: {
      50: "#919191",
      100: "#878787",
      200: "#787878",
      300: "#666666",
      400: "#545454",
      500: "#454545",
      600: "#333333",
      700: "#212121",
      800: "#121212",
      900: "#000000"
    },
    link: {
      50: "#B8B8FF",
      100: "#9E9EFF",
      200: "#7070FF",
      300: "#4242FF",
      400: "#1414FF",
      500: "#0000E6",
      600: "#0000B8",
      700: "#00008B",
      800: "#000070",
      900: "#000052",
    },
    spell: {
      50: "#B6F2DE",
      100: "#8FEACC",
      200: "#26CF97",
      300: "#1D9E74",
      400: "#1C976E",
      500: "#1A8E68",
      600: "#198A64",
      700: "#18815E",
      800: "#167958",
      900: "#157052",
      950: "#146C4E"
    },
    trap: {
      50: "#EACCD9",
      100: "#E6C1D1",
      200: "#DFAFC4",
      300: "#D699B4",
      400: "#CA7C9E",
      500: "#BC5A84",
      600: "#BD5C86",
      700: "#BD5C86",
      800: "#BD5C86",
      900: "#BD5C86"
    }
  }
})

export default theme;