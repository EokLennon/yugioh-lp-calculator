import { ButtonGroupProps, ButtonProps, CardBodyProps, IconButtonProps, InputGroupProps, InputProps, InputRightElementProps, SelectProps, StackProps } from "@chakra-ui/react";

export const CardBodyStyle: Partial<CardBodyProps> = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

export const GeneralStackStyle: Partial<StackProps> = {
  spacing: 2,
}

type NameConfigStylesI = { InputGroup: Partial<InputGroupProps> }
export const NameConfigStyles: NameConfigStylesI = { InputGroup: { size: 'sm' } }

type DeckMasterConfigStylesI = { 
  InputGroup: Partial<InputGroupProps> 
  Input: Partial<InputProps>
  InputRightElement: Partial<InputRightElementProps>
  Button: Partial<ButtonProps>
}
export const DeckMasterConfigStyles: DeckMasterConfigStylesI = { 
  InputGroup: { size: 'sm' },
  InputRightElement: { w: '3.5rem' },
  Input: {
    pr: '3.6rem',
    textOverflow: 'ellipsis'
  },
  Button: { 
    h: '1.4rem', 
    size: 'xs' 
  }
}

type ColorConfigStylesI = {
  InputGroup: Partial<InputGroupProps> 
  Select: Partial<SelectProps>
  InputRightElement: Partial<InputRightElementProps>
  Button: (chromaKey: boolean) => Partial<ButtonProps>
}
export const ColorConfigStyles: ColorConfigStylesI = { 
  InputGroup: { size: 'sm' },
  InputRightElement: { 
    w: '3.5rem',
    marginRight: '2rem'
  },
  Select: {},
  Button: (chromaKey) => {
    return { 
      h: '1.4rem', 
      size: 'xs',
      colorScheme: chromaKey ? 'green' : undefined
    }
  }
}

type ImageConfigStylesI = { 
  Stack: Partial<StackProps>
  ButtonGroup: Partial<ButtonGroupProps>
  IconButton: (reversed: boolean) => Partial<IconButtonProps>
  Button: (show: boolean) => Partial<ButtonProps>
}
export const CardDirectionStyles: ImageConfigStylesI = {
  Stack: {
    justifyContent: 'space-between'
  },
  ButtonGroup: {
    size: 'sm',
    alignItems: 'center'
  },
  IconButton: (reversed) => ({
    size: 'xs',
    fontSize: 'lg',
    variant: 'ghost',
    color: !reversed ? 'green.500' : 'current'
  }),
  Button: (show) => ({
    variant: 'ghost',
    size: 'sm',
    colorScheme: show ? 'red' : 'green'
  })
} 