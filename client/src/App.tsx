import * as React from "react";
import AppRoutes from "./AppRoutes";
import TransactionProvider from "./providers/TransactionProvider";

const App: React.FC = (): React.ReactElement => {
  return (
    <TransactionProvider>
      <AppRoutes />
    </TransactionProvider>
  );
};

export default App;
