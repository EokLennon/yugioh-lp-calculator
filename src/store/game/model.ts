import ICard from '@lib/interfaces/card'
import { CardColors, PlayerId } from '@lib/interfaces/general'

export interface PlayerState {
  name: string
  prevLifePoints: number
  currentLifePoints: number
  deckmaster?: ICard
  showDMImage: boolean
  color: string
  reversed: boolean,
  chromaKey: boolean
}

interface GameState {
  activeCard: 0|PlayerId
  numOfPlayers: number
  chroma: boolean
  players: {
    1: PlayerState
    2: PlayerState
    3: PlayerState
    4: PlayerState
  }
}

interface PlayerPayload { 
  player: PlayerId
}

export interface PlayerGameStatePayload extends PlayerPayload { 
  state: PlayerState 
}

export interface PlayerNamePayload extends PlayerPayload { 
  name: string
}

export interface PlayerLifePointsPayload extends PlayerPayload { 
  lifePoints: number
}

export interface PlayerDeckMasterPayload extends PlayerPayload { 
  deckmaster: ICard 
}

export interface PlayerImageStatusPayload extends PlayerPayload { 
  status: boolean 
}

export interface PlayerCardColorPayload extends PlayerPayload { 
  color: CardColors
}

export interface PlayerCardReversedPayload extends PlayerPayload { 
  reversed: boolean 
}

export interface PlayerCardChromaKeyPayload extends PlayerPayload { 
  chromaKey: boolean 
}

export default GameState