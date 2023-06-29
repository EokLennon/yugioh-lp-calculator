import { Text, TextProps } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';

type LifePointsProps = TextProps & {
  from: number
  to: number
  duration?: number
}

const LifePoints = ({ from, to, ...props }: LifePointsProps) => {
  const { val } = useSpring({ val: to, from: { val: from } });

  return (
    <Text
      className='life-points'
      fontWeight={650}
      letterSpacing='5px'
      {...props}
    >
      <animated.i>
        {val.to(Math.floor)}
      </animated.i>
    </Text>
  )
}

export default LifePoints;