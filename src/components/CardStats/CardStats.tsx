import { Avatar, Tag, TagLabel, TagProps, Image, HStack, TagLeftIcon, WrapItem } from '@chakra-ui/react';

import { AtkDefStatStyles, AttributeStatStyles, LevelRankLinkStatStyles, TypeStatStyles, TypingStatStyles } from './styles';

import { LuSwords, LuShield } from "react-icons/lu";

import Dark from '@assets/attributes/DARK.png';
import Divine from '@assets/attributes/DIVINE.png';
import Earth from '@assets/attributes/EARTH.png';
import Fire from '@assets/attributes/FIRE.png';
import Light from '@assets/attributes/LIGHT.png';
import Water from '@assets/attributes/WATER.png';
import Wind from '@assets/attributes/WIND.png';
import Spell from '@assets/attributes/SPELL.png';
import Trap from '@assets/attributes/TRAP.png';

import Level from '@assets/stats/Level.webp';
import Rank from '@assets/stats/Rank.webp';
import LMBottom from '@assets/stats/LM-Bottom.webp';
import LMBottomLeft from '@assets/stats/LM-BottomLeft.webp';
import LMBottomRight from '@assets/stats/LM-BottomRight.webp';
import LMLeft from '@assets/stats/LM-Left.webp';
import LMRight from '@assets/stats/LM-Right.webp';
import LMTop from '@assets/stats/LM-Top.webp';
import LMTopLeft from '@assets/stats/LM-TopLeft.webp';
import LMTopRight from '@assets/stats/LM-TopRight.webp';

import Aqua from '@assets/types/Aqua-DG.webp';
import Beast from '@assets/types/Beast-DG.webp';
import BeastWarrior from '@assets/types/Beast-Warrior-DG.webp';
import Cyberse from '@assets/types/Cyberse-MD.webp';
import Dinosaur from '@assets/types/Dinosaur-DG.webp';
import DivineBeast from '@assets/types/Divine-Beast-DG.webp';
import Dragon from '@assets/types/Dragon-DG.webp';
import Fairy from '@assets/types/Fairy-DG.webp';
import Fiend from '@assets/types/Fiend-DG.webp';
import Fish from '@assets/types/Fish-DG.webp';
import Insect from '@assets/types/Insect-DG.webp';
import Machine from '@assets/types/Machine-DG.webp';
import Plant from '@assets/types/Plant-DG.webp';
import Psychic from '@assets/types/Psychic-DG.webp';
import Pyro from '@assets/types/Pyro-DG.webp';
import Reptile from '@assets/types/Reptile-DG.webp';
import Rock from '@assets/types/Rock-DG.webp';
import SeaSerpent from '@assets/types/Sea_Serpent-DG.webp';
import Spellcaster from '@assets/types/Spellcaster-DG.webp';
import Thunder from '@assets/types/Thunder-DG.webp';
import Warrior from '@assets/types/Warrior-DG.webp';
import WingedBeast from '@assets/types/Winged_Beast-DG.webp';
import Wyrm from '@assets/types/Wyrm-DG.webp';
import Zombie from '@assets/types/Zombie-DG.webp';

import Normal from '@assets/types/Normal.png';
import Continuous from '@assets/types/Continuous.png';
import Equip from '@assets/types/Equip.png';
import QuickPlay from '@assets/types/Quick-Play.png';
import Field from '@assets/types/Field.png';
import Ritual from '@assets/types/Ritual.png';
import Counter from '@assets/types/Counter.png';

type TypeStatProps = TagProps & {
  frame: string
  type: string
  withWrap?: boolean
}

type AttributeStatProps = TagProps & {
  frame: string
  attribute: string
  withWrap?: boolean
}

type LevelRankLinkStatProps = TagProps & {
  frame: string
  content: string
  linkRating?: number
  linkMarkers?: string[]
  withWrap?: boolean
}

type TypingStatProps = TagProps & {
  frame: string
  race: string
  withWrap?: boolean
}

type AtkDefStatProps = TagProps & {
  mode: 'atk'|'def'
  value?: number
  withWrap?: boolean
}

const getAvatar = (type: string, frame: string): string | undefined => {
  if (type === 'level') {
    switch (frame) {
      case 'link':
        return undefined;
      case 'xyz':
        return Rank;
      default:
        return Level;
    }
  } else if (type === 'type') {
    switch (frame) {
      case "Aqua":
        return Aqua;
      case "Beast":
        return Beast;
      case "Beast-Warrior":
        return BeastWarrior;
      case "Cyberse":
        return Cyberse;
      case "Dinosaur":
        return Dinosaur;
      case "DivineBeast":
        return DivineBeast;
      case "Dragon":
        return Dragon;
      case "Fairy":
        return Fairy;
      case "Fiend":
        return Fiend;
      case "Fish":
        return Fish;
      case "Insect":
        return Insect;
      case "Machine":
        return Machine;
      case "Plant":
        return Plant;
      case "Psychic":
        return Psychic;
      case "Pyro":
        return Pyro;
      case "Reptile":
        return Reptile;
      case "Rock":
        return Rock;
      case "Sea Serpent":
        return SeaSerpent;
      case "Spellcaster":
        return Spellcaster;
      case "Thunder":
        return Thunder;
      case "Warrior":
        return Warrior;
      case "Winged Beast":
        return WingedBeast;
      case "Wyrm":
        return Wyrm;
      case "Zombie":
        return Zombie;
      case "Normal":
        return Normal;
      case "Continuous":
        return Continuous;
      case "Equip":
        return Equip;
      case "Quick-Play":
        return QuickPlay;
      case "Field":
        return Field;
      case "Ritual":
        return Ritual;
      case "Counter":
        return Counter;
      default:
        return undefined;
    }
  } else if (type === 'attribute') {
    switch (frame) {
      case "DARK":
        return Dark;
      case "DIVINE":
        return Divine;
      case "EARTH":
        return Earth;
      case "FIRE":
        return Fire;
      case "LIGHT":
        return Light;
      case "WATER":
        return Water;
      case "WIND":
        return Wind;
      case "SPELL":
        return Spell;
      case "TRAP":
        return Trap;
      default:
        return undefined;
    }
  }
}

const getMarker = (marker: string): string => {
  switch (marker) {
    case "Top-Left":
      return LMTopLeft;
    case "Top":
      return LMTop;
    case "Top-Right":
      return LMTopRight;
    case "Left":
      return LMLeft;
    case "Right":
      return LMRight;
    case "Bottom-Left":
      return LMBottomLeft;
    case "Bottom":
      return LMBottom;
    case "Bottom-Right":
      return LMBottomRight;
    default:
      return '';
  }
}

const TypeStat: React.FC<TypeStatProps> = ({ 
  frame, 
  type, 
  withWrap 
}) => {
  const tag =
    <Tag {...TypeStatStyles.Tag('type', frame)}>
      <TagLabel>{type}</TagLabel>
    </Tag>;

  return withWrap ? <WrapItem>{tag}</WrapItem> : tag;
}

const AttributeStat: React.FC<AttributeStatProps> = ({
  frame,
  attribute,
  withWrap
}) => {
  if (['spell', 'trap'].includes(frame)) return <></>;
  const tag =
    <Tag {...AttributeStatStyles.Tag('type', frame)}>
      <Avatar
        {...AttributeStatStyles.Avatar('type', frame)}
        name={frame.toUpperCase()}
        src={getAvatar('attribute', attribute)}
      />
      <TagLabel>{attribute}</TagLabel>
    </Tag>;

  return withWrap ? <WrapItem>{tag}</WrapItem> : tag;
}

const LevelRankLinkStat: React.FC<LevelRankLinkStatProps> = ({
  frame,
  content,
  linkRating,
  linkMarkers,
  withWrap
}) => {
  if (['spell', 'trap'].includes(frame)) return <></>;
  const tag = 
    <Tag {...LevelRankLinkStatStyles.Tag('level', frame)}>
      <Avatar
        {...LevelRankLinkStatStyles.Avatar('level', frame)}
        name={linkRating ? `${linkRating}` : frame.toUpperCase()}
        src={getAvatar('level', frame)}
      />
      <TagLabel>
        {linkMarkers 
          ? <HStack {...LevelRankLinkStatStyles.HStack}>
              {linkMarkers.map((m, i) => <Image key={i} src={getMarker(m)} alt={m} {...LevelRankLinkStatStyles.LinkRating} />)}
            </HStack>
          : content
        }
      </TagLabel>
    </Tag>;

  return withWrap ? <WrapItem>{tag}</WrapItem> : tag;
}

const TypingStat: React.FC<TypingStatProps> = ({
  frame,
  race,
  withWrap
}) => {
  const tag =
    <Tag {...TypingStatStyles.Tag('type', frame)}>
      <Avatar
        {...TypingStatStyles.Avatar('type', frame)}
        name={frame.toUpperCase()}
        src={getAvatar('type', race)}
      />
      <TagLabel>{race}</TagLabel>
    </Tag>;

  return withWrap ? <WrapItem>{tag}</WrapItem> : tag;
}

const AtkDefStat: React.FC<AtkDefStatProps> = ({
  mode,
  value,
  withWrap
}) => {
  if (value === undefined || value === null) return <></>;
  const Icon = mode === 'atk' ? LuSwords : LuShield;
  const tag =
    <Tag {...AtkDefStatStyles.Tag}>
      <TagLeftIcon as={Icon} />
      <TagLabel>{value}</TagLabel>
    </Tag>;

  return withWrap ? <WrapItem>{tag}</WrapItem> : tag;
}

export {
  TypeStat,
  AttributeStat,
  LevelRankLinkStat,
  TypingStat,
  AtkDefStat
}