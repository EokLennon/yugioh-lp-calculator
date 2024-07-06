import { BoxProps, GridProps, HeadingProps, ImageProps, SimpleGridProps, SpinnerProps, useColorModeValue } from "@chakra-ui/react";

type SearchStyleI = {
  Spinner: Partial<SpinnerProps>
  ResultsBox: () => Partial<BoxProps>
  ResultsBoxMd: () => Partial<BoxProps>
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
  },
  ResultsBoxMd: () => {
    return {
      gap: '10px',
      width: '100%',
      py: '10px',
      color: 'white',
      height: 'calc(100vh - 40px - 52px - 56px)',
      overflowY: 'auto',
      overflowX: 'hidden'
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

export const GridStyles: Partial<GridProps> = {
  h: '100%',
  templateAreas: '"search card"',
  templateColumns: '350px 1fr',
  templateRows: '1fr',
  columnGap: '20px',
}