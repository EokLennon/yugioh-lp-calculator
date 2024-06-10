import { BoxProps, HeadingProps, ImageProps, SpinnerProps, StackProps, useColorModeValue } from "@chakra-ui/react";

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
  HStack: Partial<StackProps>
  Image: Partial<ImageProps>
  Heading: Partial<HeadingProps>
}
export const CardViewStyle: CardViewStyleI = {
  HStack: {
    mt: '20px',
    gap: '16px',
    alignItems: 'flex-start'
  },
  Image: {
    width: '350px',
    height: 'auto'
  },
  Heading: {
    size: 'md'
  }
}