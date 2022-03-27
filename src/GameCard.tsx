import React, { Dispatch, SetStateAction, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { VerbSelection } from "./utils/chooseVerbs";

export function GameCard({
  verbSelection,
  correct,
  setCorrect,
}: {
  verbSelection: VerbSelection;
  correct: boolean | undefined;
  setCorrect: Dispatch<SetStateAction<boolean | undefined>>;
}) {
  const [answer, setAnswer] = useState("");

  const { english, form, verbDetails } = verbSelection;

  return (
    <Card>
      <p>
        Enter {form} form for {english}:
      </p>
      <InputText value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <br />
      <Button
        label="Check!"
        className="p-button-outlined"
        onClick={() => setCorrect(answer === verbDetails.forms[form].join(""))}
      />
      {correct === true && <p>Yay!</p>}
      {correct === false && <p>Boo hiss</p>}
    </Card>
  );
}
