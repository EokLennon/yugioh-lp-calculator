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
      display='inline-block'
      lineHeight='0.75em'
      letterSpacing='5px'
      {...props}
    >
      <animated.span>
        {val.to(Math.floor)}
      </animated.span>
    </Text>
  )
}

export default LifePoints;