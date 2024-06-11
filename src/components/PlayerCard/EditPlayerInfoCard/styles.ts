import { ButtonGroupProps, ButtonProps, IconButtonProps, InputGroupProps, InputProps, InputRightElementProps, StackProps } from "@chakra-ui/react";

export const GeneralStackStyle: Partial<StackProps> = {
  p: 3,
  spacing: 2
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