import { useCallback, useMemo, useState } from 'react';
import { 
  Box,
  Card, CardProps, 
  Grid, GridItem, 
  IconButton, 
  Image, 
  Input,
  Text, 
} from '@chakra-ui/react';
import LifePoints from '@components/LifePoints/LifePoints';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { 
  selectPlayerCardReversed, selectPlayerDeckMaster, selectPlayerImageStatus, selectPlayerLifePoints, selectPlayerName, 
  setPlayerCurrentLifePoints, setPlayerPrevLifePoints
} from '@store/game/slice';

import { CalculatorGridStyles, CardStyles, ConfigSwitchStyles, DmNameGridStyles, GridStyles, ImageGridStyles, LifePointsGridStyles, NameGridStyles } from './styles';
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

const LifePointsCard = ({
  playerNumber,
  hovered = false,
  onHover,
  onOpen,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();
  const playerName = useAppSelector(selectPlayerName(playerNumber));
  const deckMaster = useAppSelector(selectPlayerDeckMaster(playerNumber));
  const showImage = useAppSelector(selectPlayerImageStatus(playerNumber));
  const reversed = useAppSelector(selectPlayerCardReversed(playerNumber));
  const { prevLifePoints, currentLifePoints } = useAppSelector((state) => selectPlayerLifePoints(state, playerNumber));

  const deckmasterName = useMemo(() => deckMaster?.name ?? '', [deckMaster]);
  const deckmasterImg = useMemo(() => deckMaster?.card_images[0].image_url_cropped ?? '', [deckMaster]);

  const [lifePointsToOperate, setLifePointsToOperate] = useState('');

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

  return (
    <Card 
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      {...CardStyles(currentLifePoints, playerNumber)}
      {...props}
    >
      <Grid {...GridStyles(reversed)}>
        <GridItem {...NameGridStyles.GridItem}>
          <Box {...NameGridStyles.Box(reversed)}>
            <Text {...NameGridStyles.Text}>{playerName}</Text>
          </Box>
        </GridItem>
        <GridItem {...DmNameGridStyles.GridItem}>
          <Box {...DmNameGridStyles.Box(reversed)}>
            <Text {...DmNameGridStyles.Text}>
              {deckmasterName || 'Not selected'}
            </Text>
          </Box>
        </GridItem>
        <GridItem {...ImageGridStyles.GridItem}>
          {(deckmasterImg && showImage)
            ? <Box {...ImageGridStyles.ImageBox}>
                <Image {...ImageGridStyles.Image} src={deckmasterImg}  />
              </Box>
            : showImage 
              ? <Box {...ImageGridStyles.NoImageBox()}>
                  <PiImageSquare {...ImageGridStyles.NoImage} />
                </Box>
              : <></>
          }
        </GridItem>
        <GridItem {...LifePointsGridStyles.GridItem}>
          <Box {...LifePointsGridStyles.Box}>
            <LifePoints 
              {...LifePointsGridStyles.Text()}
              from={prevLifePoints}
              to={currentLifePoints}
            />
          </Box>
        </GridItem>
        <GridItem {...CalculatorGridStyles.GridItem}>
          <Box {...CalculatorGridStyles.Box}>
            <Input
              placeholder='Life Points'
              maxLength={6}
              value={lifePointsToOperate}
              onKeyPress={(e) => {
                const numeric = /[0-9]/;
                if (!numeric.test(e.key)) e.preventDefault();
              }}
              onChange={(e) => setLifePointsToOperate(e.target.value)}
              {...CalculatorGridStyles.Input()}
            />
            <IconButton
              icon={<PiPlus />}
              title={`Plus ${lifePointsToOperate} LP`}
              aria-label={`Plus LP`}
              isDisabled={!lifePointsToOperate}
              onClick={onAddLifePoints}
              {...CalculatorGridStyles.IconButton}
            />
            <IconButton
              icon={<PiMinus />}
              title={`Minus ${lifePointsToOperate} LP`}
              aria-label={`Minus LP`}
              isDisabled={!lifePointsToOperate}
              onClick={onMinusLifePoints}
              {...CalculatorGridStyles.IconButton}
            />
            <IconButton
              icon={<MdRestartAlt />}
              title={`Reset to 8000 LP`}
              aria-label={`Reset LP`}
              isDisabled={currentLifePoints === 8000}
              onClick={onResetLifePoints}
              {...CalculatorGridStyles.IconButton}
            />
          </Box>
        </GridItem>
      </Grid>
      <Box {...ConfigSwitchStyles.Box(hovered, reversed)}>
        <IconButton
          icon={<HiCog />}
          title={`Edit Player information`}
          aria-label={`Edit player ${playerNumber} information`}
          onClick={() => onOpen(true)}
          {...ConfigSwitchStyles.IconButton}
        />
      </Box>
    </Card>
  )
}

export default LifePointsCard;