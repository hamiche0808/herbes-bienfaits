export type Method = "infusion" | "decoction" | "cuisine" | "maceration" | "inhalation";
export type Evidence = "traditionnel" | "monographie" | "etudes";
export type Severity = "info" | "attention" | "danger";
export type PrecautionKind = "contre-indication" | "interaction" | "precaution" | "effet-indesirable";

export interface Symptom { slug: string; label: string }

export interface Herb {
  slug: string;
  commonName: string;
  scientificName: string;
  family: string;
  summary: string;
  parts: string[];
  activePrinciples: string[];
  months: number[]; // mois de pleine saison / de récolte (1-12)
  benefits: { symptom: string; text: string; evidence: Evidence }[];
  preparations: { method: Method; title: string; steps: string; note?: string }[];
  precautions: { kind: PrecautionKind; severity: Severity; text: string }[];
}

export interface Tip {
  slug: string;
  category: "culture" | "conservation" | "quotidien";
  title: string;
  body: string;
}

export const METHOD_LABEL: Record<Method, string> = {
  infusion: "Infusion",
  decoction: "Décoction",
  cuisine: "En cuisine",
  maceration: "Macération",
  inhalation: "Inhalation",
};

export const EVIDENCE_LABEL: Record<Evidence, string> = {
  traditionnel: "Usage traditionnel",
  monographie: "Monographie officielle (EMA/HMPC)",
  etudes: "Études scientifiques",
};

export const KIND_LABEL: Record<PrecautionKind, string> = {
  "contre-indication": "Contre-indication",
  interaction: "Interaction",
  precaution: "Précaution",
  "effet-indesirable": "Effet indésirable",
};

export const MONTH_NAMES = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
