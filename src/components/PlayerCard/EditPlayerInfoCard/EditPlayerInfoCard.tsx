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

import { GeneralStackStyle, CardDirectionStyles, NameConfigStyles, DeckMasterConfigStyles } from './styles';
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';

import { CardColors, PlayerId } from '@lib/interfaces/general';
type Props = CardProps & {
  playerNumber: PlayerId
  onClose: () => void
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
      <Stack as={CardBody} {...GeneralStackStyle}>
        <InputGroup {...NameConfigStyles.InputGroup}>
          <InputLeftAddon children='Player Name' />
          <Input value={name} onChange={(e) => dispatch(setPlayerName({ player: playerNumber, name: e.target.value }))} />
        </InputGroup>

        <InputGroup {...DeckMasterConfigStyles.InputGroup}>
          <InputLeftAddon children='Deck Master' />
          <Input {...DeckMasterConfigStyles.Input} value={deckmasterName} placeholder='Not selected' readOnly />
          <InputRightElement {...DeckMasterConfigStyles.InputRightElement}>
            <Button {...DeckMasterConfigStyles.Button} onClick={() => dispatch(setActiveCard(playerNumber))}>
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
        </InputGroup>

        <HStack {...CardDirectionStyles.Stack}>
          <ButtonGroup {...CardDirectionStyles.ButtonGroup}>
            <Text fontSize='sm'>Image Direction</Text>
            <IconButton
              {...CardDirectionStyles.IconButton(reversed)}
              icon={<PiArrowLeft />}
              aria-label='Set direction to left'
              onClick={() => dispatch(setPlayerCardReversed({ player: playerNumber, reversed: false }))}
            />
            <IconButton
              {...CardDirectionStyles.IconButton(reversed)}
              icon={<PiArrowRight />}
              aria-label='Set direction to right'
              onClick={() => dispatch(setPlayerCardReversed({ player: playerNumber, reversed: true }))}
            />
          </ButtonGroup>
          <Button
            onClick={() => dispatch(setPlayerImageStatus({ player: playerNumber, status: !showImage }))}
            {...CardDirectionStyles.Button(showImage)}
          >
            {showImage ? 'Hide Image' : 'Show Image'}
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