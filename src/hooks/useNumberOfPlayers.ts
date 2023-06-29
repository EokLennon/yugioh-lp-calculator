import { useContext } from "react"
import { PlayersContext } from "../contexts/PlayersContext"


const useNumberOfPlayers = () => {
  const { players, setPlayers } = useContext(PlayersContext);

  return {
    players,
    setPlayers
  }
}

export default useNumberOfPlayers