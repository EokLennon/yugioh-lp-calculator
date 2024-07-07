import { Routes, Route, Navigate } from 'react-router-dom'

import ScreenLayout from '@screens/Layout/Layout';
import GameCalculator from '@screens/GameCalculator/GameCalculator';

import { ROUTES } from '@lib/helpers/constants';
import CardSearching from '@screens/CardSearch/CardSearch';

const App = () => (
  <Routes>
    <Route path={ROUTES.ROOT.path} element={<Navigate to={ROUTES.CALCULATOR.path} replace />} />
    <Route element={<ScreenLayout />}>
      <Route path={ROUTES.CALCULATOR.path} element={<GameCalculator flexGrow={1} />} />
      <Route path={ROUTES.CARD_VIEWER.path} element={<CardSearching flexGrow={1} />} />
    </Route>
  </Routes>
)

export default App;
