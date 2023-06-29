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
})

export default theme;