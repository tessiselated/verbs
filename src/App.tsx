import React, { useState } from "react";
import { Card } from "primereact/card";

import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { GameCard } from "./GameCard";
import { chooseVerbs } from "./utils/chooseVerbs";
// import "./App.css";

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
      <Card title="Tessa's Verb Conjugation" />
      <GameCard
        verbSelection={verbSelection}
        correct={correct}
        setCorrect={setCorrect}
        answer={answer}
        setAnswer={setAnswer}
        newRound={newRound}
      />
    </div>
  );
}

export default App;
