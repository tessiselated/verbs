import sample from "lodash/sample";
import verbs from "../data/verb-source.json";

export function chooseVerbs(): VerbSelection {
  const english = sample(Object.keys(verbs)) as keyof typeof verbs;

  const verbDetails = verbs[english];

  const form = sample(
    Object.keys(verbDetails.forms)
  ) as keyof typeof verbDetails.forms;

  return { english, verbDetails, form };
}

export interface VerbSelection {
  english: string;
  form: keyof VerbDetails["forms"];
  verbDetails: VerbDetails;
}

interface VerbDetails {
  furigana?: string[];
  forms: {
    jisho: string[];
    masu: string[];
    て: string[];
    "short, past": string[];
    "short, negative": string[];
    "short, past, negative": string[];
    potential: string[];
    volitional: string[];
    "volitional, negative (masen)": string[];
  };
}
