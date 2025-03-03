import React from "react";
import { Provider } from "react-redux";
import { SignalRProvider } from './providers/SignalRProvider';
import { store } from "./stores/store";
import AppRouter from "./navigation/AppRouter";

const App: React.FC = () => {
  return (
    <SignalRProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </SignalRProvider>
  );
};

export default App;