import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { 
  ScaleFade,
  Grid, GridItem, 
  Card, CardProps,
  Box, 
  Text,
  Input,
  IconButton,
  Stack,
  InputGroup,
  InputLeftAddon,
  CardBody,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import ReactCardFlip from 'react-card-flip';
import LifePoints from '../LifePoints/LifePoints';

import { PiPlus, PiMinus, PiArrowLeft, PiArrowRight } from 'react-icons/pi'
import { HiCog } from 'react-icons/hi';

import ICard from '../../interfaces/card';
import EditPlayerInfoCard from './EditPlayerInfoCard';

type PlayerCardProps = CardProps & {
  playerNumber: number
  onSearch: (playerNumber: number, search: string) => void
  show?: boolean
  loading?: boolean
  options: ICard[]
}

const IconButtonCss = {
  size: 'xs',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const ConfigButtonCss = {
  size: 'xs',
  fontSize: 'md',
  variant: 'ghost',
  color: 'current',
}

const Height = '150px';
const Columns = `${Height} 1fr`;
const ReverseColumns = `1fr ${Height}`;
const Rows = '24px 18px 1fr 30px';
const TemplateAreas = `"image name" "image dmname" "image lp" "image calculator"`;                  
const ReverseTemplateAreas = `"name image" "dmname image" "lp image" "calculator image"`;

const PlayerCard = ({ playerNumber, onSearch, show, ...props }: PlayerCardProps) => {
  const defaultReversed = useMemo(() => playerNumber % 2 === 0, [playerNumber])
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reversed, setReversed] = useState(defaultReversed);

  const [playerName, setPlayerName] = useState(`Player ${playerNumber}`);
  // const [dmToSearch, setDmToSearch] = useState('');
  // const [deckMaster, setDeckMaster] = useState<ICard>();
  const [dmName, setDmName] = useState('');

  const [prevLifePoints, setPrevLifePoints] = useState(8000);
  const [currentLifePoints, setCurrentLifePoints] = useState(8000);
  const [lifePointsToOperate, setLifePointsToOperate] = useState('');

  // useEffect(() => {
  //   if (!dmToSearch) return;
  //   onSearch(playerNumber, dmToSearch);
  // }, [dmToSearch, onSearch, playerNumber])

  const onAddLifePoints = useCallback(() => {
    setPrevLifePoints(currentLifePoints);
    const newLifePoints = currentLifePoints + Number(lifePointsToOperate);
    setCurrentLifePoints(newLifePoints);
    setLifePointsToOperate('');
  }, [currentLifePoints, lifePointsToOperate])

  const onMinusLifePoints = useCallback(() => {
    setPrevLifePoints(currentLifePoints);
    const _newLifePoints = currentLifePoints - Number(lifePointsToOperate);
    const newLifePoints = _newLifePoints < 0 ? 0 : _newLifePoints;
    setCurrentLifePoints(newLifePoints);
    setLifePointsToOperate('');
  }, [currentLifePoints, lifePointsToOperate])

  return (
    <ScaleFade 
      in={show} 
      initialScale={0.8} 
      onAnimationStart={console.log}
      onAnimationEnd={console.log}
    >
      <ReactCardFlip isFlipped={flipped} flipDirection='horizontal'>
        <Card 
          h={Height}
          borderRadius={0}
          bg={currentLifePoints === 0 ? 'red.700' : 'linear-gradient(0deg, #00000044 0%, #ffffff 75%)'}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}

          {...props}
        >
          <Grid 
            h='100%'
            templateAreas={reversed ? ReverseTemplateAreas : TemplateAreas}
            templateColumns={reversed ? ReverseColumns : Columns}
            templateRows={Rows}
            columnGap='8px'
          >
            <GridItem area='image'>
              <div>
                Deck Master Image
              </div>
            </GridItem>
            <GridItem area='name'>
              <Box 
                h='100%' 
                // textAlign={reversed ? 'right' : undefined}
                textAlign='center'
              >
                <Text fontSize='18px'>
                  {playerName}
                </Text>
              </Box>
            </GridItem>
            <GridItem area='dmname'>
              <Box 
                h='100%' 
                // textAlign={reversed ? 'right' : undefined}
                textAlign='center'
              >
                <Text fontSize='12px'>
                  {/* {deckMaster?.name ?? 'Not selected'} */}
                  {dmName}
                </Text>
              </Box>
            </GridItem>
            <GridItem area='lp'>
              <Box
                h='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                overflow='hidden'
              >
                <LifePoints fontSize='50px' from={prevLifePoints} to={currentLifePoints} />
              </Box>
            </GridItem>
            <GridItem area='calculator'>
              <Box 
                display='flex'
                pl={reversed ? '10px' : undefined}
                pr={!reversed ? '10px' : undefined}
              >
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
                  _placeholder={{ opacity: 1, color: 'black' }}
                />
                <IconButton
                  icon={<PiPlus />}
                  title={`Plus ${lifePointsToOperate} LP`}
                  aria-label={`Plus LP`}
                  disabled={!lifePointsToOperate}
                  onClick={onAddLifePoints}
                  {...IconButtonCss}
                />
                <IconButton
                  icon={<PiMinus />}
                  title={`Minus ${lifePointsToOperate} LP`}
                  aria-label={`Minus LP`}
                  disabled={!lifePointsToOperate}
                  onClick={onMinusLifePoints}
                  {...IconButtonCss}
                />
              </Box>
            </GridItem>
          </Grid>
          <Box 
            display={hovering ? 'block' : 'none'}
            position='absolute'
            top='0'
            left={!reversed ? '0' : undefined}
            right={reversed ? '0' : undefined}
          >
            <IconButton
              icon={<HiCog />}
              title={`Edit Player information`}
              aria-label={`Edit player ${playerNumber} information`}
              onClick={() => setFlipped(true)}
              {...ConfigButtonCss}
            />
          </Box>
        </Card>
        <EditPlayerInfoCard
          h={Height}
          playerName={playerName}
          deckmasterName={dmName}
          onClose={() => setFlipped(false)}
          onEditPlayerName={setPlayerName}
          onEditDeckMasterName={setDmName}
          onReverse={setReversed}
        />
      </ReactCardFlip>
    </ScaleFade>
  )
}

export default PlayerCard;