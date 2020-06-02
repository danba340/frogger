import React from "react";
import { RecoilRoot } from "recoil";
import ScoreBar from "./components/ScoreBar";
import Frogger from "./components/Frogger";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ScoreBar />
        <h1>
          <span role="img" aria-label="flag">
            🏁
          </span>
          FROGGER
          <span role="img" aria-label="flag">
            {" "}
            🏁
          </span>
        </h1>
        <Frogger />
      </div>
    </RecoilRoot>
  );
}

export default App;
