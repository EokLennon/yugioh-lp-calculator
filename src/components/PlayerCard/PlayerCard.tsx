import { useState } from 'react';

import { ScaleFade } from '@chakra-ui/react';
import ReactCardFlip, { ReactFlipCardProps } from 'react-card-flip';
import LifePointsCard from '@components/PlayerCard/LifePointsCard/LifePointsCard';
import EditPlayerInfoCard from '@components/PlayerCard/EditPlayerInfoCard/EditPlayerInfoCard';

import { PlayerId } from '@lib/interfaces/general';

type PlayerCardProps = Omit<ReactFlipCardProps, 'children'> & {
  playerNumber: PlayerId
  show?: boolean
}

const Height = '220px';

const PlayerCard = ({ playerNumber, show, ...props }: PlayerCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);

  return (
    <ScaleFade 
      in={show} 
      initialScale={0.8} 
    >
      <ReactCardFlip isFlipped={flipped} flipDirection='horizontal' {...props}>
        <LifePointsCard
          h={Height}
          playerNumber={playerNumber}
          hovered={hovering}
          onHover={setHovering}
          onOpen={() => setFlipped(true)}
        />
        <EditPlayerInfoCard
          h={Height}
          playerNumber={playerNumber}
          onClose={() => setFlipped(false)}
        />
      </ReactCardFlip>
    </ScaleFade>
  )
}

export default PlayerCard;