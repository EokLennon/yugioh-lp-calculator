import { Text, TextProps } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';

import { TextStyle } from './styles';

type LifePointsProps = TextProps & {
  from: number
  to: number
  duration?: number
}

const LifePoints = ({ from, to, ...props }: LifePointsProps) => {
  const { val } = useSpring({ val: to, from: { val: from } });

  return (
    <Text {...TextStyle} {...props}>
      <animated.span>
        {val.to(Math.floor)}
      </animated.span>
    </Text>
  )
}

export default LifePoints;