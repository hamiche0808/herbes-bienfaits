import herbsJson from "@/data/herbs.json";
import symptomsJson from "@/data/symptoms.json";
import tipsJson from "@/data/tips.json";
import type { Herb, Symptom, Tip } from "./types";

// Données locales : elles servent de source par défaut et de repli si Supabase est indisponible.
export const LOCAL_HERBS = herbsJson as unknown as Herb[];
export const SYMPTOMS = symptomsJson as Symptom[];
export const TIPS = tipsJson as Tip[];
