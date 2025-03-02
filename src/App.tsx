import React from "react";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import AppRouter from "./navigation/AppRouter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;