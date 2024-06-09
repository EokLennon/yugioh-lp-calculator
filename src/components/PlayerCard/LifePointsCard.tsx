import { useCallback, useMemo, useState } from 'react';
import { 
  Box,
  Card, CardProps, 
  Grid, GridItem, 
  IconButton, 
  Image, 
  Input,
  Text, 
  useColorModeValue,
} from '@chakra-ui/react';
import LifePoints from '@components/LifePoints/LifePoints';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { 
  selectPlayerCardColor, selectPlayerCardReversed, selectPlayerDeckMaster, selectPlayerImageStatus, selectPlayerLifePoints, selectPlayerName, 
  setPlayerCurrentLifePoints, setPlayerPrevLifePoints
} from '@store/game/slice';

import { HiCog } from 'react-icons/hi';
import { MdRestartAlt } from 'react-icons/md';
import { PiPlus, PiMinus, PiImageSquare } from 'react-icons/pi';

import { PlayerId } from '@lib/interfaces/general';

type Props = CardProps & {
  playerNumber: PlayerId
  reversed?: boolean
  hovered?: boolean
  onHover: (v: boolean) => void
  onOpen: (v: boolean) => void
}

const IconButtonCss = {
  size: 'xs',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const ConfigButtonCss = {
  size: 'xs',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const LifePointsCard = ({
  playerNumber,
  hovered = false,
  onHover,
  onOpen,
  ...props
}: Props) => {
  const playerName = useAppSelector(selectPlayerName(playerNumber));
  const deckMaster = useAppSelector(selectPlayerDeckMaster(playerNumber));
  const showImage = useAppSelector(selectPlayerImageStatus(playerNumber));
  const reversed = useAppSelector(selectPlayerCardReversed(playerNumber));

  const deckmasterName = useMemo(() => deckMaster?.name ?? '', [deckMaster]);
  const deckmasterImg = useMemo(() => deckMaster?.card_images[0].image_url_cropped ?? '', [deckMaster]);

  const [lifePointsToOperate, setLifePointsToOperate] = useState('');

  const dispatch = useAppDispatch();
  const { prevLifePoints, currentLifePoints } = useAppSelector((state) => selectPlayerLifePoints(state, playerNumber));
  const cardColor = useAppSelector(selectPlayerCardColor(playerNumber));

  const onAddLifePoints = useCallback(() => {
    dispatch(setPlayerPrevLifePoints({ player: playerNumber, lifePoints: currentLifePoints }));
    const newLifePoints = currentLifePoints + Number(lifePointsToOperate);
    dispatch(setPlayerCurrentLifePoints({ player: playerNumber, lifePoints: newLifePoints }));
    setLifePointsToOperate('');
  }, [currentLifePoints, dispatch, lifePointsToOperate, playerNumber])

  const onMinusLifePoints = useCallback(() => {
    dispatch(setPlayerPrevLifePoints({ player: playerNumber, lifePoints: currentLifePoints }));
    const _newLifePoints = currentLifePoints - Number(lifePointsToOperate);
    const newLifePoints = _newLifePoints < 0 ? 0 : _newLifePoints;
    dispatch(setPlayerCurrentLifePoints({ player: playerNumber, lifePoints: newLifePoints }));
    setLifePointsToOperate('');
  }, [currentLifePoints, dispatch, lifePointsToOperate, playerNumber])

  const onResetLifePoints = useCallback(() => {
    dispatch(setPlayerPrevLifePoints({ player: playerNumber, lifePoints: currentLifePoints }));
    const newLifePoints = 8000;
    dispatch(setPlayerCurrentLifePoints({ player: playerNumber, lifePoints: newLifePoints }));
    setLifePointsToOperate('');
  }, [currentLifePoints, dispatch, playerNumber])

  // #region Styles
  // const Height = props.h ?? props.height;
  const Columns = `150px 1fr`;
  const ReverseColumns = `1fr 150px`;
  const Rows = '1fr 1fr 118px 30px';
  const TemplateAreas = `"name name"
                         "dmname dmname"
                         "image lp"
                         "image calculator"`;
  const ReverseTemplateAreas = `"name name"
                                "dmname dmname"
                                "lp image"
                                "calculator image"`;

  const bg = useColorModeValue(`${cardColor}.300`, `${cardColor}.700`);
  const bgLost = useColorModeValue('red.700', 'red.900');
  const phColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');
  const textShadow = useColorModeValue(
    undefined,
    `0 2px black`
  );
  const outline = useColorModeValue(
    `dashed 3px black`,
    `dashed 3px white`
  );
  // #endregion

  return (
    <Card 
      borderRadius={0}
      bg={currentLifePoints === 0 ? bgLost : bg}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      {...props}
    >
      <Grid 
        h='100%'
        templateAreas={reversed ? ReverseTemplateAreas : TemplateAreas}
        templateColumns={reversed ? ReverseColumns : Columns}
        templateRows={Rows}
        columnGap='8px'
      >
        <GridItem area='name'>
          <Box px='8px' textAlign={reversed ? 'right' : undefined} textShadow={textShadow}>
            <Text fontSize='28px' fontWeight={700}>{playerName}</Text>
          </Box>
        </GridItem>
        <GridItem area='dmname'>
          <Box px='8px' textAlign={reversed ? 'right' : undefined} textShadow={textShadow}>
            <Text fontSize='20px' fontWeight={600}>
              {deckmasterName || 'Not selected'}
            </Text>
          </Box>
        </GridItem>
        <GridItem area='image'>
          {(deckmasterImg && showImage)
            ? <Box 
                h='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <Image src={deckmasterImg} w='130px' h='130px' />
              </Box>
            : showImage ?
              <Box 
                h='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                outline={outline}
                outlineOffset='-12px'
              >
                <PiImageSquare fontSize='xxx-large' />
              </Box>
            : <></>
          }
        </GridItem>
        <GridItem area='lp'>
          <Box
            h='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <LifePoints 
              fontSize='54px'
              textShadow={textShadow}
              from={prevLifePoints}
              to={currentLifePoints}
            />
          </Box>
        </GridItem>
        <GridItem area='calculator'>
          <Box display='flex' px='8px'>
            <Input
              variant='unstyled'
              placeholder='Life Points'
              maxLength={6}
              value={lifePointsToOperate}
              onKeyPress={(e) => {
                const numeric = /[0-9]/;
                if (!numeric.test(e.key)) e.preventDefault();
              }}
              onChange={(e) => setLifePointsToOperate(e.target.value)}
              _placeholder={{ opacity: 1, color: phColor }}
            />
            <IconButton
              isRound
              icon={<PiPlus />}
              title={`Plus ${lifePointsToOperate} LP`}
              aria-label={`Plus LP`}
              isDisabled={!lifePointsToOperate}
              onClick={onAddLifePoints}
              {...IconButtonCss}
            />
            <IconButton
              isRound
              icon={<PiMinus />}
              title={`Minus ${lifePointsToOperate} LP`}
              aria-label={`Minus LP`}
              isDisabled={!lifePointsToOperate}
              onClick={onMinusLifePoints}
              {...IconButtonCss}
            />
            <IconButton
              isRound
              icon={<MdRestartAlt />}
              title={`Reset to 8000 LP`}
              aria-label={`Reset LP`}
              isDisabled={currentLifePoints === 8000}
              onClick={onResetLifePoints}
              {...IconButtonCss}
            />
          </Box>
        </GridItem>
      </Grid>
      <Box 
        display={hovered ? 'block' : 'none'}
        position='absolute'
        top='5px'
        left={reversed ? '5px' : undefined}
        right={!reversed ? '5px' : undefined}
      >
        <IconButton
          isRound
          icon={<HiCog />}
          title={`Edit Player information`}
          aria-label={`Edit player ${playerNumber} information`}
          onClick={() => onOpen(true)}
          {...ConfigButtonCss}
        />
      </Box>
    </Card>
  )
}

export default LifePointsCard;