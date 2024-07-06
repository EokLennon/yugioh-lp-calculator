import { selectChroma, selectPlayerCardChromaKey, selectPlayerCardColor } from "@store/game/slice";
import { useAppSelector } from "@store/hooks";

import { 
  BoxProps, CardProps, 
  GridItemProps, GridProps, 
  IconButtonProps, ImageProps, 
  InputProps, TextProps, 
  useColorModeValue 
} from "@chakra-ui/react";

import { PlayerId } from "@lib/interfaces/general";
import { IconType } from "react-icons";

export const CardStyles = (lp: number, player: PlayerId): Partial<CardProps> => {
  const cardColor = useAppSelector(selectPlayerCardColor(player));
  const showChromaKey = useAppSelector(selectChroma);
  const showPlayerChromaKey = useAppSelector(selectPlayerCardChromaKey(player));
  const bg = useColorModeValue(`${cardColor}.300`, `${cardColor}.700`);
  const bgLost = useColorModeValue('red.700', 'red.900');
  const textColor = showPlayerChromaKey ? '#fff' : undefined

  return {
    boxShadow: (showChromaKey && showPlayerChromaKey) ? 'none' : undefined,
    borderRadius: 0,
    bg: showPlayerChromaKey ? '#00b140' : lp === 0 ? bgLost : bg,
    textColor: textColor
  }
}

const Columns = `150px 1fr`;
const ReverseColumns = `1fr 150px`;
const Rows = '1fr 1fr 140px 30px';
const TemplateAreas = `"name name"
                        "dmname dmname"
                        "image lp"
                        "calculator calculator"`;
const ReverseTemplateAreas = `"name name"
                              "dmname dmname"
                              "lp image"
                              "calculator calculator"`;

const chromaShadow = `2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
                      0px 2px #000, 0px -2px #000, 0px -2px #000, 0px 2px #000`;

export const GridStyles = (reversed: boolean): Partial<GridProps> => ({
  h: '100%',
  templateAreas: reversed ? ReverseTemplateAreas : TemplateAreas,
  templateColumns: reversed ? ReverseColumns : Columns,
  templateRows: Rows,
  columnGap: '8px',
})

type NameGridStylesI = {
  GridItem: Partial<GridItemProps>
  Box: (reversed: boolean, chromaKey: boolean) => Partial<BoxProps>
  Text: Partial<TextProps>
}
export const NameGridStyles: NameGridStylesI = {
  GridItem: { area: 'name' },
  Box: (reversed, chromaKey) => {
    const textShadow = useColorModeValue(undefined, `0 2px black`);
    return {
      px: '8px',
      textAlign: reversed ? 'right' : undefined,
      textShadow: chromaKey ? chromaShadow : textShadow
    }
  },
  Text: {
    fontSize: '28px',
    fontWeight: 700,
  }
}

type DmNameGridStylesI = {
  GridItem: Partial<GridItemProps>
  Box: (reversed: boolean, chromaKey: boolean) => Partial<BoxProps>
  Text: Partial<TextProps>
}
export const DmNameGridStyles: DmNameGridStylesI = {
  GridItem: { area: 'dmname' },
  Box: (reversed, chromaKey) => {
    const textShadow = useColorModeValue(undefined, `0 2px black`);
    return {
      px: '8px',
      textAlign: reversed ? 'right' : undefined,
      textShadow: chromaKey ? chromaShadow : textShadow
    }
  },
  Text: {
    fontSize: '20px', 
    fontWeight: 600
  }
}

type ImageGridStylesI = {
  GridItem: Partial<GridItemProps>
  ImageBox: Partial<BoxProps>
  Image: Partial<ImageProps>
  NoImageBox: () => Partial<BoxProps>
  NoImage: Partial<IconType>
}
export const ImageGridStyles: ImageGridStylesI = {
  GridItem: { area: 'image' },
  ImageBox: {
    h: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Image: {
    w: '130px',
    h: '130px'
  },
  NoImageBox: () => {
    const outline = useColorModeValue(`dashed 3px black`, `dashed 3px white`);
    return {
      h: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      outline: outline,
      outlineOffset: '-12px'
    }
  },
  NoImage: {
    fontSize: 'xxx-large'
  }
}

type LifePointsGridStylesI = {
  GridItem: Partial<GridItemProps>
  Box: Partial<BoxProps>
  Text: (chromaKey: boolean) => Partial<TextProps>
}
export const LifePointsGridStyles: LifePointsGridStylesI = {
  GridItem: { area: 'lp' },
  Box: {
    h: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: (chromaKey) => {
    const textShadow = useColorModeValue(undefined, `0 2px black`);
    return {
      fontSize: '54px',
      textShadow: chromaKey ? chromaShadow : textShadow
    }
  }
}

type CalculatorGridStylesI = {
  GridItem: Partial<GridItemProps>
  Box: Partial<BoxProps>
  Input: (chromaKey: boolean) => Partial<InputProps>
  IconButton: Partial<IconButtonProps>
}
export const CalculatorGridStyles: CalculatorGridStylesI = {
  GridItem: { area: 'calculator' },
  Box: {
    display: 'flex',
    px: '8px'
  },
  Input: (chromaKey) => {
    const phColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');

    return {
      variant: 'unstyled',
      // maxWidth: '80px',
      _placeholder: {
        opacity: 1,
        color: chromaKey ? '#ffffff70' : phColor
      }
    }
  },
  IconButton: {
    isRound: true,
    size: 'xs',
    fontSize: 'lg',
    variant: 'ghost',
    color: 'current',
  }
}

type ConfigSwitchStylesI = {
  Box: (hovered: boolean, reversed: boolean) => Partial<BoxProps>
  IconButton: Partial<IconButtonProps>
}
export const ConfigSwitchStyles: ConfigSwitchStylesI = {
  Box: (hovered, reversed) => ({
    display: hovered ? 'block' : 'none',
    position: 'absolute',
    top: '5px',
    left: reversed ? '5px' : undefined,
    right: !reversed ? '5px' : undefined
  }),
  IconButton: {
    isRound: true,
    size: 'xs',
    fontSize: 'lg',
    variant: 'ghost',
    color: 'current',
  }
}