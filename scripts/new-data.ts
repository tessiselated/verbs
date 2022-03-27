/* eslint-disable import/no-extraneous-dependencies */
import inquirer from "inquirer";
import { writeFileSync } from "fs";
import { VerbDetails } from "../src/utils/chooseVerbs";

const forms = [
  "jisho",
  "masu",
  "て",
  "short, past",
  "short, negative",
  "short, past, negative",
  "potential",
  "potential, negative (masen)",
  "volitional",
];

const formQuestions = forms.map((form) => {
  return {
    type: "input",
    name: form,
    message: `Please enter kana portion of ${form}`,
  };
});

const otherQuestions = [
  {
    type: "input",
    name: "english",
    message: "Please type in the english meaning",
    validate(value: string) {
      return value !== "" ? true : "Please type in the english meaning";
    },
  },
  {
    type: "input",
    name: "kanji",
    message: "Please enter the kanji component separated by a space",
  },
  {
    type: "input",
    name: "furigana",
    message: "Please enter furigana pronunciation separated by a space",
  },
];

const questions: inquirer.QuestionCollection = [
  ...otherQuestions,
  ...formQuestions,
];

inquirer.prompt(questions).then((answers) => {
  const newVerbKey: string = answers.english;
  const kanjiComponent: string[] =
    answers.kanji !== "" ? answers.kanji.split("　") : [];
  const newVerbDetails: VerbDetails = {
    forms: {
      jisho: [...kanjiComponent, answers.jisho],
      masu: [...kanjiComponent, answers.masu],
      て: [...kanjiComponent, answers["て"]],
      "short, past": [...kanjiComponent, answers["short, past"]],
      "short, negative": [...kanjiComponent, answers["short, negative"]],
      "short, past, negative": [
        ...kanjiComponent,
        answers["short, past, negative"],
      ],
      potential: [...kanjiComponent, answers.potential],
      volitional: [...kanjiComponent, answers.volitional],
      "potential, negative (masen)": [
        ...kanjiComponent,
        answers["potential, negative (masen)"],
      ],
    },
  };
  if (answers.furigana) {
    newVerbDetails.furigana = answers.furigana.split("　");
  }
  const newVerb: Record<string, VerbDetails> = {};

  newVerb[newVerbKey] = newVerbDetails;

  writeFileSync("./src/data/attempt.json", JSON.stringify(newVerb));
});
