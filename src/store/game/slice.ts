import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import GameState, { 
  PlayerCardChromaKeyPayload,
  PlayerCardColorPayload, PlayerCardReversedPayload, 
  PlayerDeckMasterPayload, PlayerGameStatePayload, 
  PlayerImageStatusPayload, PlayerLifePointsPayload, 
  PlayerNamePayload 
} from "@store/game/model";
import { RootState } from '@store/store';
import { PlayerId } from "@lib/interfaces/general";

const initialState: GameState = {
  activeCard: 0,
  numOfPlayers: 1,
  chroma: false,
  players: {
    1: {
      name: 'Player 1',
      prevLifePoints: 8000,
      currentLifePoints: 8000,
      deckmaster: undefined,
      showDMImage: false,
      color: 'blue',
      reversed: false,
      chromaKey: false
    },
    2: {
      name: 'Player 2',
      prevLifePoints: 8000,
      currentLifePoints: 8000,
      deckmaster: undefined,
      showDMImage: false,
      color: 'red',
      reversed: true,
      chromaKey: false
    },
    3: {
      name: 'Player 3',
      prevLifePoints: 8000,
      currentLifePoints: 8000,
      deckmaster: undefined,
      showDMImage: false,
      color: 'green',
      reversed: false,
      chromaKey: false
    },
    4: {
      name: 'Player 4',
      prevLifePoints: 8000,
      currentLifePoints: 8000,
      deckmaster: undefined,
      showDMImage: false,
      color: 'purple',
      reversed: true,
      chromaKey: false
    },
  }
}

// Slice
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<PlayerId|0>) => {
      state.activeCard = action.payload
    },
    setNumOfPlayers: (state, action: PayloadAction<number>) => {
      state.numOfPlayers = action.payload
    },
    setChroma: (state, action: PayloadAction<boolean>) => {
      state.chroma = action.payload
    },
    setPlayerGameState: (state, action: PayloadAction<PlayerGameStatePayload>) => {
      state.players[action.payload.player] = action.payload.state
    },
    setPlayerName: (state, action: PayloadAction<PlayerNamePayload>) => {
      state.players[action.payload.player].name = action.payload.name
    },
    setPlayerPrevLifePoints: (state, action: PayloadAction<PlayerLifePointsPayload>) => {
      state.players[action.payload.player].prevLifePoints = action.payload.lifePoints
    },
    setPlayerCurrentLifePoints: (state, action: PayloadAction<PlayerLifePointsPayload>) => {
      state.players[action.payload.player].currentLifePoints = action.payload.lifePoints
    },
    setPlayerDeckMaster: (state, action: PayloadAction<PlayerDeckMasterPayload>) => {
      state.players[action.payload.player].deckmaster = action.payload.deckmaster
    },
    setPlayerImageStatus: (state, action: PayloadAction<PlayerImageStatusPayload>) => {
      state.players[action.payload.player].showDMImage = action.payload.status
    },
    setPlayerCardColor: (state, action: PayloadAction<PlayerCardColorPayload>) => {
      state.players[action.payload.player].color = action.payload.color
    },
    setPlayerCardReversed: (state, action: PayloadAction<PlayerCardReversedPayload>) => {
      state.players[action.payload.player].reversed = action.payload.reversed
    },
    setPlayerCardChromaKey: (state, action: PayloadAction<PlayerCardChromaKeyPayload>) => {
      state.players[action.payload.player].chromaKey = action.payload.chromaKey
    }
  }
})

// Actions
export const {
  setActiveCard,
  setNumOfPlayers,
  setChroma,
  setPlayerGameState,
  setPlayerName,
  setPlayerPrevLifePoints,
  setPlayerCurrentLifePoints,
  setPlayerDeckMaster,
  setPlayerImageStatus,
  setPlayerCardColor,
  setPlayerCardReversed,
  setPlayerCardChromaKey
} = gameSlice.actions;

// Selectors Aux
const selectPlayers = (state: RootState) => state.game.players;
const selectPlayerNumber = (state: RootState, id: PlayerId) => id;

// Selectors
export const selectActiveCard = (state: RootState) => state.game.activeCard;
export const selectNumOfPlayers = (state: RootState) => state.game.numOfPlayers;
export const selectChroma = (state: RootState) => state.game.chroma;
export const selectPlayerGameState = (id: PlayerId) => (state: RootState) => state.game.players[id];
export const selectPlayerName = (id: PlayerId) => (state: RootState) => state.game.players[id].name;
export const selectPlayerDeckMaster = (id: PlayerId) => (state: RootState) => state.game.players[id].deckmaster;
export const selectPlayerImageStatus = (id: PlayerId) => (state: RootState) => state.game.players[id].showDMImage;
export const selectPlayerCardColor = (id: PlayerId) => (state: RootState) => state.game.players[id].color;
export const selectPlayerLifePoints = createSelector(
  [selectPlayers, selectPlayerNumber],
  (players, id) => ({ 
    prevLifePoints: players[id].prevLifePoints, 
    currentLifePoints: players[id].currentLifePoints 
  })
)
export const selectPlayerCardReversed = (id: PlayerId) => (state: RootState) => state.game.players[id].reversed;
export const selectPlayerCardChromaKey = (id: PlayerId) => (state: RootState) => state.game.players[id].chromaKey;

export default gameSlice.reducer;