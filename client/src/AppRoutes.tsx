import { MemoryRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TransactionsPage from "./pages/TransactionsPage";

const AppRoutes: React.FC = (): React.ReactElement => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

export default AppRoutes;
