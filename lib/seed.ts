import type { Herb, Symptom, Tip } from './types';

export const SYMPTOMS: Symptom[] = [
  { slug: 'digestion', label: 'Digestion' },
  { slug: 'voies-respiratoires', label: 'Voies respiratoires' },
  { slug: 'stress-sommeil', label: 'Stress & sommeil' },
  { slug: 'tonus-memoire', label: 'Tonus & concentration' },
];

// ⚠️ Contenu de départ à faire valider avec des sources officielles
// (monographies EMA/HMPC, ANSM, ESCOP) avant toute mise en ligne publique.
export const HERBS: Herb[] = [
  {
    slug: 'thym',
    commonName: 'Thym',
    scientificName: 'Thymus vulgaris',
    family: 'Lamiacées',
    summary:
      "Petit arbrisseau méditerranéen très aromatique, incontournable en cuisine et en tisane d'hiver.",
    parts: ['Feuilles', 'Sommités fleuries'],
    activePrinciples: ['Thymol', 'Carvacrol', 'Flavonoïdes', 'Acide rosmarinique'],
    months: [5, 6, 7, 8, 9],
    benefits: [
      { symptom: 'voies-respiratoires', evidence: 'monographie',
        text: "Utilisé traditionnellement pour apaiser la toux et les irritations de la gorge lors d'un rhume." },
      { symptom: 'digestion', evidence: 'traditionnel',
        text: 'Traditionnellement employé pour faciliter la digestion et atténuer les ballonnements légers.' },
    ],
    preparations: [
      { method: 'infusion', title: 'Infusion de thym',
        steps: "1 cuillère à café de feuilles séchées (ou quelques brins frais) pour 150 ml d'eau frémissante. Couvrir 10 minutes, filtrer.",
        note: "Quelques tasses par jour, sur une courte durée. Consultez si la toux dure plus d'une semaine." },
      { method: 'cuisine', title: 'En cuisine',
        steps: 'Ajoutez les brins en début de cuisson (mijotés, rôtis, marinades) et retirez-les avant de servir.' },
    ],
    precautions: [
      { kind: 'contre-indication', severity: 'attention', text: 'Allergie connue aux Lamiacées (menthe, romarin, sauge, origan…).' },
      { kind: 'precaution', severity: 'attention', text: "Grossesse et allaitement : évitez les usages médicinaux répétés sans avis médical." },
      { kind: 'precaution', severity: 'danger', text: "Huile essentielle de thym : ne pas utiliser sans avis d'un professionnel de santé ; déconseillée chez l'enfant." },
    ],
  },
  {
    slug: 'menthe-poivree',
    commonName: 'Menthe poivrée',
    scientificName: 'Mentha × piperita',
    family: 'Lamiacées',
    summary: 'Hybride fraîche et mentholée, référence des tisanes de digestion.',
    parts: ['Feuilles'],
    activePrinciples: ['Menthol', 'Menthone', 'Flavonoïdes', 'Acide rosmarinique'],
    months: [6, 7, 8, 9],
    benefits: [
      { symptom: 'digestion', evidence: 'monographie',
        text: 'Soulage traditionnellement les troubles digestifs légers : ballonnements, sensation de lourdeur.' },
      { symptom: 'voies-respiratoires', evidence: 'traditionnel',
        text: "La vapeur d'une infusion chaude procure une sensation de nez dégagé (adulte uniquement)." },
    ],
    preparations: [
      { method: 'infusion', title: 'Infusion de menthe',
        steps: "1 à 2 cuillères à café de feuilles pour 150 ml d'eau chaude (pas bouillante). Couvrir 5 à 10 minutes.",
        note: 'À prendre de préférence après le repas.' },
      { method: 'cuisine', title: 'Fraîche en cuisine',
        steps: 'Ciselée dans les salades, taboulés, yaourts ou boissons froides, juste avant de servir.' },
      { method: 'inhalation', title: 'Vapeur chaude (adulte)',
        steps: "Laissez la vapeur d'une tasse d'infusion monter doucement, sans placer le visage trop près." },
    ],
    precautions: [
      { kind: 'precaution', severity: 'attention', text: 'Reflux gastro-œsophagien ou hernie hiatale : la menthe peut aggraver les symptômes.' },
      { kind: 'precaution', severity: 'attention', text: 'Calculs ou troubles des voies biliaires : demandez un avis médical.' },
      { kind: 'contre-indication', severity: 'danger', text: "Ne jamais appliquer d'huile essentielle ou de menthol sur le visage d'un jeune enfant (risque de spasme respiratoire)." },
      { kind: 'precaution', severity: 'info', text: "Allaitement : demandez conseil à un professionnel de santé avant un usage régulier." },
    ],
  },
  {
    slug: 'melisse',
    commonName: 'Mélisse',
    scientificName: 'Melissa officinalis',
    family: 'Lamiacées',
    summary: 'Plante douce au parfum citronné, associée depuis longtemps à la détente du soir.',
    parts: ['Feuilles'],
    activePrinciples: ['Acide rosmarinique', 'Flavonoïdes', 'Huile essentielle (citronellal, citral)'],
    months: [5, 6, 7, 8, 9],
    benefits: [
      { symptom: 'stress-sommeil', evidence: 'monographie',
        text: "Utilisée traditionnellement pour atténuer les petits signes de stress et favoriser l'endormissement." },
      { symptom: 'digestion', evidence: 'monographie',
        text: 'Soulage traditionnellement les petits troubles digestifs, notamment liés à la nervosité.' },
    ],
    preparations: [
      { method: 'infusion', title: 'Infusion du soir',
        steps: "1 à 2 cuillères à café de feuilles pour 150 ml d'eau chaude. Couvrir 10 minutes, boire en soirée.",
        note: 'Une somnolence est possible : évitez de conduire juste après.' },
      { method: 'cuisine', title: 'Fraîche en cuisine',
        steps: 'Ajoutez les feuilles ciselées aux salades de fruits, sorbets, poissons ou boissons fraîches.' },
    ],
    precautions: [
      { kind: 'interaction', severity: 'attention', text: 'Traitement thyroïdien ou médicaments sédatifs : demandez l’avis de votre médecin ou pharmacien.' },
      { kind: 'precaution', severity: 'info', text: 'Grossesse et allaitement : avis médical recommandé avant un usage régulier.' },
    ],
  },
  {
    slug: 'romarin',
    commonName: 'Romarin',
    scientificName: 'Salvia rosmarinus',
    family: 'Lamiacées',
    summary: 'Arbuste persistant au parfum résineux, utilisé en cuisine et en tisane stimulante.',
    parts: ['Feuilles'],
    activePrinciples: ['1,8-cinéole', 'Camphre', 'α-pinène', 'Acide carnosique', 'Acide rosmarinique'],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    benefits: [
      { symptom: 'digestion', evidence: 'monographie',
        text: 'Utilisé traditionnellement pour les digestions lentes et les inconforts digestifs légers.' },
      { symptom: 'tonus-memoire', evidence: 'traditionnel',
        text: 'Réputé traditionnellement pour soutenir le tonus lors de fatigues passagères.' },
    ],
    preparations: [
      { method: 'infusion', title: 'Infusion de romarin',
        steps: "1 cuillère à café de feuilles pour 150 ml d'eau chaude. Couvrir 10 minutes.",
        note: 'Plutôt le matin ou à midi : peut être stimulant le soir.' },
      { method: 'cuisine', title: 'Viandes, légumes rôtis, pains',
        steps: "Utilisez les aiguilles entières ou hachées, seules ou avec de l'ail et de l'huile d'olive." },
    ],
    precautions: [
      { kind: 'contre-indication', severity: 'danger', text: "Épilepsie : évitez les usages concentrés (huile essentielle, extraits)." },
      { kind: 'interaction', severity: 'attention', text: 'Traitement anticoagulant : demandez l’avis de votre médecin ou pharmacien avant un usage médicinal régulier.' },
      { kind: 'precaution', severity: 'attention', text: 'Grossesse : évitez les doses médicinales ; l’usage culinaire reste possible.' },
    ],
  },
];

export const TIPS: Tip[] = [
  { slug: 'menthe-en-pot', category: 'culture', title: 'Cultiver la menthe en pot',
    body: "La menthe est envahissante : plantez-la dans un pot ou un seau enterré. Sol frais, mi-ombre, arrosage régulier. Taillez souvent pour garder un feuillage tendre." },
  { slug: 'thym-soleil', category: 'culture', title: 'Un thym heureux : soleil et drainage',
    body: "Plein soleil, sol pauvre et très drainant, peu d'eau. Taillez légèrement après la floraison pour éviter qu'il ne se dégarnisse." },
  { slug: 'secher-herbes', category: 'conservation', title: 'Sécher ses herbes',
    body: "Récoltez le matin après la rosée, puis suspendez-les en petits bouquets, à l'ombre et dans un endroit aéré. Conservez-les ensuite dans des bocaux opaques, loin de la chaleur et de l'humidité." },
  { slug: 'glacons-herbes', category: 'quotidien', title: 'Des glaçons d’herbes',
    body: "Hachez des herbes tendres (menthe, mélisse, persil), répartissez-les dans un bac à glaçons, couvrez d'eau ou d'huile d'olive et congelez : pratique pour les plats et les boissons." },
];
