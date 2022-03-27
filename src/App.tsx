import React, { useState } from "react";

import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { GameCard } from "./GameCard";
import { chooseVerbs } from "./utils/chooseVerbs";

function App() {
  const [verbSelection, setVerbSelection] = useState(chooseVerbs());
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);
  const [answer, setAnswer] = useState("");

  const newRound = (): void => {
    setVerbSelection(chooseVerbs());
    setCorrect(undefined);
    setAnswer("");
  };
  return (
    <div className="App">
      <div>
        <h1 className="app-heading">Tessa&#39;s Verb Conjugation</h1>
        <GameCard
          verbSelection={verbSelection}
          correct={correct}
          setCorrect={setCorrect}
          answer={answer}
          setAnswer={setAnswer}
          newRound={newRound}
        />
      </div>
    </div>
  );
}

export default App;
