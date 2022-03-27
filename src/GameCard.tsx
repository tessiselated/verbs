import React, { Dispatch, SetStateAction, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import zip from "lodash/zip";
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
      <InputText
        value={answer}
        style={{ textAlign: "center" }}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <Button
        label="Check!"
        className="p-button-outlined"
        onClick={() => setCorrect(answer === verbDetails.forms[form].join(""))}
      />
      {correct === true && (
        <p className="success-text">
          <ruby>
            正<rt>ただ</rt>しい！！
          </ruby>
          - {furiganadVerb(verbDetails.forms[form], verbDetails.furigana)}
        </p>
      )}
      {correct === false && (
        <p className="failure-text">
          <ruby>
            違<rt>ちが</rt>う
          </ruby>
          - {furiganadVerb(verbDetails.forms[form], verbDetails.furigana)}
        </p>
      )}
    </Card>
  );
}

function furiganadVerb(verb: string[], furigana: string[] = []) {
  const verbAndFurigana = zip(verb, furigana);
  return (
    <ruby>
      {verbAndFurigana.map(([verbPortion, pronunciation]) => {
        return (
          <>
            {verbPortion} {pronunciation && <rt>{pronunciation}</rt>}
          </>
        );
      })}
    </ruby>
  );
}
