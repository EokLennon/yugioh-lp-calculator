import { BoxProps, HeadingProps, ImageProps, SimpleGridProps, SpinnerProps, useColorModeValue } from "@chakra-ui/react";

type SearchStyleI = {
  Spinner: Partial<SpinnerProps>
  ResultsBox: () => Partial<BoxProps>
}
export const SearchStyle: SearchStyleI = {
  Spinner: {
    size: 'sm'
  },
  ResultsBox: () => {
    const bg = useColorModeValue('gray.100', 'gray.800');
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      position: 'absolute',
      maxWidth: '726px',
      width: '100%',
      p: '10px',
      bg: bg,
      color: 'white',
      zIndex: 10
    }
  }
}

type CardViewStyleI = {
  SimpleGrid: Partial<SimpleGridProps>
  Image: Partial<ImageProps>
  Heading: Partial<HeadingProps>
}
export const CardViewStyle: CardViewStyleI = {
  SimpleGrid: {
    mt: '20px',
  },
  Image: {
    width: '350px',
    height: 'auto'
  },
  Heading: {
    mb: '1rem',
    size: 'md'
  }
}