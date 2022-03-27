import React, { Dispatch, SetStateAction } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import zip from "lodash/zip";
import { VerbSelection } from "./utils/chooseVerbs";

export function GameCard({
  verbSelection,
  correct,
  setCorrect,
  answer,
  setAnswer,
  newRound,
}: {
  verbSelection: VerbSelection;
  correct: boolean | undefined;
  setCorrect: Dispatch<SetStateAction<boolean | undefined>>;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  newRound: () => void;
}) {
  const { english, form, verbDetails } = verbSelection;

  return (
    <Card>
      <p>
        Enter <strong>{form}</strong> form for <strong>{english}</strong>:
      </p>
      <div className="answer-box-container">
        <InputText
          value={answer}
          style={{ textAlign: "center" }}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      {correct === undefined && (
        <Button
          label="Check!"
          className="p-button-outlined"
          onClick={() =>
            setCorrect(answer === verbDetails.forms[form].join(""))
          }
        />
      )}
      {correct !== undefined && (
        <Button
          label=" Next!"
          className="p-button-outlined p-button-secondary"
          onClick={newRound}
        />
      )}
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
