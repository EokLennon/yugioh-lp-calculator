import { Avatar, Tag, TagLabel, TagProps } from '@chakra-ui/react';

import { StatStyles } from './styles';

import Dark from '@assets/attributes/DARK.png';
import Divine from '@assets/attributes/DIVINE.png';
import Earth from '@assets/attributes/EARTH.png';
import Fire from '@assets/attributes/FIRE.png';
import Light from '@assets/attributes/LIGHT.png';
import Water from '@assets/attributes/WATER.png';
import Wind from '@assets/attributes/WIND.png';
import Spell from '@assets/attributes/SPELL.svg';
import Trap from '@assets/attributes/TRAP.svg';

import Level from '@assets/stats/Level.svg';
import Rank from '@assets/stats/Rank.svg';
import LMBottom from '@assets/stats/LM-Bottom.webp';
import LMBottomLeft from '@assets/stats/LM-BottomLeft.webp';
import LMBottomRight from '@assets/stats/LM-BottomRight.webp';
import LMLeft from '@assets/stats/LM-Left.webp';
import LMRight from '@assets/stats/LM-Right.webp';
import LMTop from '@assets/stats/LM-Top.webp';
import LMTopLeft from '@assets/stats/LM-TopLeft.webp';
import LMTopRight from '@assets/stats/LM-TopRight.webp';

import Aqua from '@assets/monsterTypes/Aqua-DG.webp';
import Beast from '@assets/monsterTypes/Beast-DG.webp';
import BeastWarrior from '@assets/monsterTypes/Beast-Warrior-DG.webp';
import Cyberse from '@assets/monsterTypes/Cyberse-MD.webp';
import Dinosaur from '@assets/monsterTypes/Dinosaur-MD.webp';
import DivineBeast from '@assets/monsterTypes/Divine-Beast-DG.webp';
import Dragon from '@assets/monsterTypes/Dragon-DG.webp';
import Fairy from '@assets/monsterTypes/Fairy-DG.webp';
import Fiend from '@assets/monsterTypes/Fiend-DG.webp';
import Fish from '@assets/monsterTypes/Fish-DG.webp';
import Insect from '@assets/monsterTypes/Insect-DG.webp';
import Machine from '@assets/monsterTypes/Machine-DG.webp';
import Plant from '@assets/monsterTypes/Plant-DG.webp';
import Psychic from '@assets/monsterTypes/Psychic-DG.webp';
import Pyro from '@assets/monsterTypes/Pyro-DG.webp';
import Reptile from '@assets/monsterTypes/Reptile-DG.webp';
import Rock from '@assets/monsterTypes/Rock-DG.webp';
import SeaSerpent from '@assets/monsterTypes/Sea_Serpent-DG.webp';
import Spellcaster from '@assets/monsterTypes/Spellcaster-DG.webp';
import Thunder from '@assets/monsterTypes/Thunder-DG.webp';
import Warrior from '@assets/monsterTypes/Warrior-DG.webp';
import WingedBeast from '@assets/monsterTypes/Winged_Beast-DG.webp';
import Wyrm from '@assets/monsterTypes/Wyrm-DG.webp';
import Zombie from '@assets/monsterTypes/Zombie-DG.webp';

type Props = TagProps & {
  type: string
  content: string | string[]
}

const Stat: React.FC<Props> = ({
  type,
  content
}) => {
  return (
    <Tag {...StatStyles.Tag}>
      <Avatar
        {...StatStyles.Avatar}
        src='stats/Level.svg'
      />
      <TagLabel>{content}</TagLabel>
    </Tag>
  )
}

export default Stat;