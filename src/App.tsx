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
  const [verbSelection, _setVerbSelection] = useState(chooseVerbs());
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);
  return (
    <div className="App">
      <Card title="Tessa's Verb Conjugation" />
      <GameCard
        verbSelection={verbSelection}
        correct={correct}
        setCorrect={setCorrect}
      />
    </div>
  );
}

export default App;
