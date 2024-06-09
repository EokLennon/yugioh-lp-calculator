import { useMemo } from 'react';
import { 
  Stack, HStack,
  Card, CardBody, CardProps,
  Input, InputLeftAddon, InputGroup, Select,
  IconButton, Button, ButtonGroup, InputRightElement,
  Text
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { 
  selectPlayerCardColor, selectPlayerCardReversed, selectPlayerDeckMaster, selectPlayerImageStatus, selectPlayerName, 
  setActiveCard, setPlayerCardColor, setPlayerCardReversed, setPlayerImageStatus, setPlayerName 
} from '@store/game/slice';

import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';

import { CardColors, PlayerId } from '@lib/interfaces/general';

type Props = CardProps & {
  playerNumber: PlayerId
  onClose: () => void
}

const IconButtonCss = {
  size: 'xs',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const EditPlayerInfoCard = ({
  playerNumber,
  onClose,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectPlayerName(playerNumber));
  const deckMaster = useAppSelector(selectPlayerDeckMaster(playerNumber));
  const cardColor = useAppSelector(selectPlayerCardColor(playerNumber));
  const showImage = useAppSelector(selectPlayerImageStatus(playerNumber));
  const reversed = useAppSelector(selectPlayerCardReversed(playerNumber));

  const deckmasterName = useMemo(() => deckMaster?.name ?? '', [deckMaster]);

  return (
    <Card {...props}>
      <Stack as={CardBody} p={3} spacing={2}>
        <InputGroup size='sm'>
          <InputLeftAddon children='Player Name' />
          <Input value={name} onChange={(e) => dispatch(setPlayerName({ player: playerNumber, name: e.target.value }))} />
        </InputGroup>

        <InputGroup size='sm'>
          <InputLeftAddon children='Deck Master' />
          <Input value={deckmasterName} placeholder='Not selected' pr='3.6rem' textOverflow='ellipsis' readOnly />
          <InputRightElement w='3.5rem'>
            <Button h='1.4rem' size='xs' onClick={() => dispatch(setActiveCard(playerNumber))}>
              Select
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size='sm'>
          <InputLeftAddon children='Card Color' />
          <Select value={cardColor} onChange={(e) => dispatch(setPlayerCardColor({ player: playerNumber, color: e.target.value as CardColors }))}>
            <option value='red'>Red</option>
            <option value='orange'>Orange</option>
            <option value='yellow'>Yellow</option>
            <option value='green'>Green</option>
            <option value='teal'>Teal</option>
            <option value='blue'>Blue</option>
            <option value='cyan'>Cyan</option>
            <option value='purple'>Purple</option>
            <option value='pink'>Pink</option>
          </Select>
          {/* <Input value={playerName} onChange={(e) => onEditPlayerName(e.target.value)} /> */}
        </InputGroup>

        <HStack>
          <Button
            variant='ghost'
            size='sm'
            colorScheme={showImage ? 'red' : 'green'}
            onClick={() => dispatch(setPlayerImageStatus({ player: playerNumber, status: !showImage }))}
          >
            {showImage ? 'Hide Image' : 'Show Image'}
          </Button>
          <ButtonGroup size='sm' alignItems='center'>
            <IconButton
              {...IconButtonCss}
              color={!reversed ? 'green.500' : undefined}
              icon={<PiArrowLeft />}
              aria-label='Set direction to left'
              onClick={() => dispatch(setPlayerCardReversed({ player: playerNumber, reversed: false }))}
            />
            <Text fontSize='sm'>Image Direction</Text>
            <IconButton
              {...IconButtonCss}
              color={reversed ? 'green.500' : undefined}
              icon={<PiArrowRight />}
              aria-label='Set direction to right'
              onClick={() => dispatch(setPlayerCardReversed({ player: playerNumber, reversed: true }))}
            />
          </ButtonGroup>
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