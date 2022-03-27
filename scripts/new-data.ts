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
  "volitional",
  "potential, negative (masen)",
];

const formQuestions = forms.map((form) => {
  return {
    type: "input",
    name: form,
    message: `Please enter ${form} form separated by a space`,
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
  const newVerbDetails: VerbDetails = {
    forms: {
      jisho: answers.jisho.split("　"),
      masu: answers.masu.split("　"),
      て: answers["て"].split("　"),
      "short, past": answers["short, past"].split("　"),
      "short, negative": answers["short, negative"].split("　"),
      "short, past, negative": answers["short, past, negative"].split("　"),
      potential: answers.potential.split("　"),
      volitional: answers.volitional.split("　"),
      "potential, negative (masen)":
        answers["volitional, negative (masen)"].split("　"),
    },
  };
  if (answers.furigana) {
    newVerbDetails.furigana = answers.furigana.split(" ");
  }
  const newVerb: Record<string, VerbDetails> = {};

  newVerb[newVerbKey] = newVerbDetails;

  writeFileSync("./src/data/attempt.json", JSON.stringify(newVerb));
});
