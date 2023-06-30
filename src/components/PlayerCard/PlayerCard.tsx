import { useMemo, useState } from 'react';
import { ScaleFade } from '@chakra-ui/react';
import ReactCardFlip, { ReactFlipCardProps } from 'react-card-flip';
import LifePointsCard from './LifePointsCard';
import EditPlayerInfoCard from './EditPlayerInfoCard';

import ICard from '../../interfaces/card';

type PlayerCardProps = Omit<ReactFlipCardProps, 'children'> & {
  playerNumber: number
  onSearch: (playerNumber: number) => void
  deckMaster?: ICard
  show?: boolean
}

const Height = '220px';

const PlayerCard = ({ playerNumber, onSearch, deckMaster, show, ...props }: PlayerCardProps) => {
  const defaultReversed = useMemo(() => playerNumber % 2 === 0, [playerNumber])
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reversed, setReversed] = useState(defaultReversed);
  const [hideImage, setHideImage] = useState(true);

  const [playerName, setPlayerName] = useState(`Player ${playerNumber}`);
  const dmName = useMemo(() => deckMaster?.name ?? '', [deckMaster]);
  const dmImg = useMemo(() => deckMaster?.card_images[0].image_url_cropped ?? '', [deckMaster]);

  return (
    <ScaleFade 
      in={show} 
      initialScale={0.8} 
      onAnimationStart={console.log}
      onAnimationEnd={console.log}
    >
      <ReactCardFlip isFlipped={flipped} flipDirection='horizontal' {...props}>
        <LifePointsCard
          h={Height}
          playerNumber={playerNumber}
          playerName={playerName}
          deckmasterName={dmName}
          deckmasterImg={dmImg}
          reversed={reversed}
          hovered={hovering}
          hideImg={hideImage}
          onOpen={() => setFlipped(true)}
          onHover={setHovering}
        />
        <EditPlayerInfoCard
          h={Height}
          playerName={playerName}
          deckmasterName={dmName}
          reversed={reversed}
          hideImg={hideImage}
          onClose={() => setFlipped(false)}
          onEditPlayerName={setPlayerName}
          onSelectDeckmaster={() => onSearch(playerNumber)}
          onReverse={setReversed}
          onHideImage={setHideImage}
        />
      </ReactCardFlip>
    </ScaleFade>
  )
}

export default PlayerCard;