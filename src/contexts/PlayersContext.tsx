import { ReactNode, createContext, useMemo, useState } from 'react';

type IContext = {
  players: number
  setPlayers: (p: number) => void
}

type ContextProps = {
  children: ReactNode
}

export const PlayersContext = createContext<IContext>({
  players: 1,
  setPlayers: () => {}
});

const PlayersContextProvider = ({ children }: ContextProps) => {
  const [numOfPlayers, setNumOfPlayers] = useState(1);
  const value: IContext = useMemo(() => ({
    players: numOfPlayers,
    setPlayers: setNumOfPlayers
  }), [numOfPlayers]);

  return (
    <PlayersContext.Provider value={value}>
      {children}
    </PlayersContext.Provider>
  );
}

export default PlayersContextProvider;