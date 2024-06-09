import { Routes, Route, Navigate } from 'react-router-dom'

import ScreenLayout from '@screens/Layout/Layout';
import GameCalculator from '@screens/GameCalculator/GameCalculator';

import { ROUTES } from '@lib/helpers/constants';
import CardSearching from '@screens/CardSearch/CardSearch';

const App = () => (
  <Routes>
    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.CALCULATOR} replace />} />
    <Route element={<ScreenLayout />}>
      <Route path={ROUTES.CALCULATOR} element={<GameCalculator flexGrow={1} />} />
      <Route path={ROUTES.CARD_VIEWER} element={<CardSearching flexGrow={1} />} />
    </Route>
  </Routes>
)

export default App;
