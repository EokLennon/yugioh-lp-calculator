import { useCallback, useState } from 'react';
import { 
  Box,
  Card, CardProps, 
  Grid, GridItem, 
  IconButton, 
  Image, 
  Input,
  Text, 
  useColorModeValue,
  useToken
} from '@chakra-ui/react'
import LifePoints from '../LifePoints/LifePoints';

import { HiCog } from 'react-icons/hi';
import { PiPlus, PiMinus, PiImageSquare } from 'react-icons/pi';

type Props = CardProps & {
  playerNumber: number
  playerName: string
  deckmasterName: string
  deckmasterImg?: string
  reversed?: boolean
  hovered?: boolean
  hideImg?: boolean
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
  playerName,
  deckmasterName,
  deckmasterImg,
  reversed = false,
  hovered = false,
  hideImg = false,
  onHover,
  onOpen,
  ...props
}: Props) => {
  const [prevLifePoints, setPrevLifePoints] = useState(8000);
  const [currentLifePoints, setCurrentLifePoints] = useState(8000);
  const [lifePointsToOperate, setLifePointsToOperate] = useState('');

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
  const colorsLight = useToken('colors', ['blue.300', 'red.300', 'green.300', 'purple.300']);
  const colorsDark = useToken('colors', ['blue.700', 'red.700', 'green.700', 'purple.700']);

  const bg = useColorModeValue(
    colorsLight[playerNumber - 1],
    colorsDark[playerNumber - 1]
  );
  const bgLost = useColorModeValue('red.700', 'red.1000');
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
          {(deckmasterImg && !hideImg)
            ? <Box 
                h='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <Image src={deckmasterImg} w='130px' h='130px' />
              </Box>
            : !hideImg ?
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
        display={hovered ? 'block' : 'none'}
        position='absolute'
        top='5px'
        left={reversed ? '5px' : undefined}
        right={!reversed ? '5px' : undefined}
      >
        <IconButton
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