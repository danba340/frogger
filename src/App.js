import React from "react";
import { RecoilRoot } from "recoil";
import Frogger from "./components/Frogger";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <h1>Frogger</h1>
        <Frogger />
      </div>
    </RecoilRoot>
  );
}

export default App;
