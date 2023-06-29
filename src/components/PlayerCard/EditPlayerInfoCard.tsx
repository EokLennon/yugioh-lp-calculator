import { Card, CardProps, Stack, CardBody, InputGroup, InputLeftAddon, Input, ButtonGroup, IconButton, Button } from '@chakra-ui/react'
import React from 'react'
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi'

type Props = CardProps & {
  reversed?: boolean
  playerName: string
  deckmasterName: string
  onEditPlayerName: (name: string) => void
  onEditDeckMasterName: (name: string) => void
  onReverse: (reverse: boolean) => void
  onClose: () => void
}

const IconButtonCss = {
  size: 'xs',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const EditPlayerInfoCard = ({
  reversed,
  playerName,
  deckmasterName,
  onEditPlayerName,
  onEditDeckMasterName,
  onReverse,
  onClose,
  ...props
}: Props) => {
  return (
    <Card {...props}>
      <Stack as={CardBody} p={3} spacing={3}>
        <InputGroup size='sm' flexGrow={1}>
          <InputLeftAddon children='Player Name' />
          <Input name='playerName' value={playerName} onChange={(e) => onEditPlayerName(e.target.value)} />
        </InputGroup>
        <InputGroup size='sm' flexGrow={1}>
          <InputLeftAddon children='Deck Master' />
          <Input name='deckMaster' value={deckmasterName} placeholder='Not selected' onChange={(e) => onEditDeckMasterName(e.target.value)} />
        </InputGroup>
        <Stack direction='row'>
          <ButtonGroup size='sm' alignItems='center' flexGrow={1}>
            <IconButton
              {...IconButtonCss}
              color={!reversed ? 'green.200' : undefined}
              icon={<PiArrowLeft />}
              aria-label='Set direction to left'
              onClick={() => onReverse(true)}
            />
            <IconButton
              {...IconButtonCss}
              color={reversed ? 'green.200' : undefined}
              icon={<PiArrowRight />}
              aria-label='Set direction to right'
              onClick={() => onReverse(true)}
            />
          </ButtonGroup>
          <ButtonGroup size='sm'>
            <Button
              variant='ghost'
              colorScheme='red'
              onClick={() => onClose()}
            >
              Close
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Card>
  )
}

export default EditPlayerInfoCard