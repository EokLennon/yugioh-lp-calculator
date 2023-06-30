import { 
  Stack, HStack,
  Card, CardBody, CardProps,
  Input, InputLeftAddon, InputGroup,
  IconButton, Button, ButtonGroup, InputRightElement,
  Text
} from '@chakra-ui/react'

import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';

type Props = CardProps & {
  reversed?: boolean
  hideImg?: boolean
  playerName: string
  deckmasterName: string
  onEditPlayerName: (name: string) => void
  onSelectDeckmaster: () => void
  onReverse: (reverse: boolean) => void
  onHideImage: (hide: boolean) => void
  onClose: () => void
}

const IconButtonCss = {
  size: 'xs',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const EditPlayerInfoCard = ({
  playerName,
  deckmasterName,
  reversed,
  hideImg,
  onEditPlayerName,
  onSelectDeckmaster,
  onReverse,
  onHideImage,
  onClose,
  ...props
}: Props) => {
  return (
    <Card {...props}>
      <Stack as={CardBody} p={3} spacing={3}>
        <InputGroup size='sm'>
          <InputLeftAddon children='Player Name' />
          <Input value={playerName} onChange={(e) => onEditPlayerName(e.target.value)} />
        </InputGroup>
        <InputGroup size='sm'>
          <InputLeftAddon children='Deck Master' />
          <Input value={deckmasterName} placeholder='Not selected' pr='3.6rem' textOverflow='ellipsis' readOnly />
          <InputRightElement w='3.5rem'>
            <Button h='1.4rem' size='xs' onClick={() => onSelectDeckmaster()}>
              Select
            </Button>
          </InputRightElement>
        </InputGroup>
        <ButtonGroup size='sm' alignItems='center'>
          <IconButton
            {...IconButtonCss}
            color={!reversed ? 'green.500' : undefined}
            icon={<PiArrowLeft />}
            aria-label='Set direction to left'
            onClick={() => onReverse(false)}
          />
          <Text fontSize='sm'>Image Direction</Text>
          <IconButton
            {...IconButtonCss}
            color={reversed ? 'green.500' : undefined}
            icon={<PiArrowRight />}
            aria-label='Set direction to right'
            onClick={() => onReverse(true)}
          />
        </ButtonGroup>
        <HStack>
          <Button
            variant='ghost'
            size='sm'
            colorScheme={hideImg ? 'green' : 'red'}
            onClick={() => onHideImage(!hideImg)}
          >
            {hideImg ? 'Show Image' : 'Hide Image'}
          </Button>
        </HStack>
        
        <HStack justify='end'>
          <Button
            variant='ghost'
            colorScheme='red'
            size='sm'
            onClick={() => onClose()}
          >
            Close
          </Button>
        </HStack>
      </Stack>
    </Card>
  )
}

export default EditPlayerInfoCard