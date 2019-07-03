import React from 'react';
import logo from './logo.svg';
import './style.scss';
import LiveData from './components/LiveData'
import PageWithScene from "./components/Babylon";
import { StoreProvider } from "./Store/useStore";

function App() {
  return (
      <StoreProvider>
          <div className="App">
            <header className="App-header">
            </header>
            <LiveData/>
            <PageWithScene/>
        </div>
      </StoreProvider>
  );
}

export default App;
