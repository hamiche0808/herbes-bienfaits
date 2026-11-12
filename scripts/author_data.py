import json
def r(a,b): return list(range(a,b+1))
ALL=r(1,12)
SYMPTOMS=[("digestion","Digestion"),("voies-respiratoires","Voies respiratoires"),("stress-sommeil","Stress & sommeil"),("tonus-memoire","Tonus & concentration"),("confort-urinaire","Confort urinaire")]
T,M,E="traditionnel","monographie","etudes"
CI,IT,PR,EI="contre-indication","interaction","precaution","effet-indesirable"
I,A,D="info","attention","danger"
INF,DEC,CUI,MAC,INH="infusion","decoction","cuisine","maceration","inhalation"
LAM_ALLERGY=(CI,A,"Allergie connue aux Lamiacées (menthe, thym, romarin, sauge, origan…).")
API_ALLERGY=(CI,A,"Allergie connue aux Apiacées (céleri, carotte, persil, fenouil…) : risque de réaction croisée.")
AST_ALLERGY=(CI,A,"Allergie connue aux Astéracées (armoise, ambroisie, camomille, chrysanthème…) : risque de réaction croisée.")
PREG=lambda t="Grossesse et allaitement : évitez les usages médicinaux répétés sans avis médical ; l'usage culinaire reste possible.":(PR,A,t)
HE=lambda n:(PR,D,f"Huile essentielle {n} : ne pas utiliser sans l'avis d'un professionnel de santé ; déconseillée chez l'enfant.")
def inf(g,t="Infusion",note=None,vol="150 ml"): return (INF,t,f"{g} pour {vol} d'eau chaude (frémissante, pas bouillante). Couvrir 10 minutes, filtrer.",note)
H=[]
def h(slug,name,latin,fam,summary,parts,princ,months,ben,prep,prec): H.append(dict(slug=slug,commonName=name,scientificName=latin,family=fam,summary=summary,parts=parts,activePrinciples=princ,months=months,
 benefits=[dict(symptom=s,evidence=e,text=t) for s,e,t in ben],
 preparations=[dict(method=m,title=t,steps=s,**({"note":n} if n else {})) for m,t,s,n in prep],
 precautions=[dict(kind=k,severity=v,text=t) for k,v,t in prec]))

h("thym","Thym","Thymus vulgaris","Lamiacées","Petit arbrisseau méditerranéen très aromatique, incontournable en cuisine et en tisane d'hiver.",["Feuilles","Sommités fleuries"],["Thymol","Carvacrol","Flavonoïdes","Acide rosmarinique"],r(5,9),
 [("voies-respiratoires",M,"Utilisé traditionnellement pour apaiser la toux et les irritations de la gorge lors d'un rhume."),("digestion",T,"Traditionnellement employé pour faciliter la digestion et atténuer les ballonnements légers.")],
 [inf("1 cuillère à café de feuilles séchées (ou quelques brins frais)","Infusion de thym","Quelques tasses par jour, sur une courte durée. Consultez si la toux dure plus d'une semaine."),(CUI,"En cuisine","Ajoutez les brins en début de cuisson (mijotés, rôtis, marinades) et retirez-les avant de servir.",None)],
 [LAM_ALLERGY,PREG(),HE("de thym")])
h("serpolet","Serpolet","Thymus serpyllum","Lamiacées","Thym sauvage rampant des pelouses sèches, au parfum plus doux que le thym commun.",["Sommités fleuries"],["Thymol","Carvacrol (variable)","Flavonoïdes","Tanins"],r(6,9),
 [("voies-respiratoires",M,"Utilisé traditionnellement en cas de toux liée à un rhume."),("digestion",T,"Employé traditionnellement pour les inconforts digestifs légers.")],
 [inf("1 à 2 cuillères à café de sommités séchées","Infusion de serpolet","Usage de courte durée ; avis médical si les symptômes persistent.")],
 [LAM_ALLERGY,PREG(),(PR,I,"Ne le cueillez pas en pleine nature sans identification certaine ni autorisation : l'espèce peut être protégée localement.")])
h("menthe-poivree","Menthe poivrée","Mentha × piperita","Lamiacées","Hybride fraîche et mentholée, référence des tisanes de digestion.",["Feuilles"],["Menthol","Menthone","Flavonoïdes","Acide rosmarinique"],r(6,9),
 [("digestion",M,"Soulage traditionnellement les troubles digestifs légers : ballonnements, sensation de lourdeur."),("voies-respiratoires",T,"La vapeur d'une infusion chaude procure une sensation de nez dégagé (adulte uniquement).")],
 [inf("1 à 2 cuillères à café de feuilles","Infusion de menthe","À prendre de préférence après le repas."),(CUI,"Fraîche en cuisine","Ciselée dans salades, taboulés, yaourts ou boissons froides, juste avant de servir.",None),(INH,"Vapeur chaude (adulte)","Laissez la vapeur d'une tasse d'infusion monter doucement, sans placer le visage trop près.",None)],
 [(PR,A,"Reflux gastro-œsophagien ou hernie hiatale : la menthe peut aggraver les symptômes."),(PR,A,"Calculs ou troubles des voies biliaires : demandez un avis médical."),(CI,D,"Ne jamais appliquer d'huile essentielle ou de menthol sur le visage d'un jeune enfant (risque de spasme respiratoire)."),(PR,I,"Allaitement : demandez conseil avant un usage régulier.")])
h("menthe-verte","Menthe verte","Mentha spicata","Lamiacées","Menthe douce et sucrée, celle du thé à la menthe et des boissons d'été.",["Feuilles"],["Carvone","Limonène","Flavonoïdes","Acide rosmarinique"],r(6,9),
 [("digestion",T,"Employée traditionnellement pour les digestions lourdes ; plus douce que la menthe poivrée.")],
 [inf("1 poignée de feuilles fraîches (ou 2 cuillères à café séchées)","Infusion douce"),(CUI,"Boissons et salades","Idéale en thé, limonade, taboulé, sauces au yaourt ou desserts de fruits.",None)],
 [LAM_ALLERGY,(PR,A,"Reflux gastro-œsophagien : peut aggraver les symptômes chez certaines personnes."),(PR,I,"Allaitement : avis recommandé avant une consommation régulière et abondante.")])
h("melisse","Mélisse","Melissa officinalis","Lamiacées","Plante douce au parfum citronné, associée depuis longtemps à la détente du soir.",["Feuilles"],["Acide rosmarinique","Flavonoïdes","Huile essentielle (citronellal, citral)"],r(5,9),
 [("stress-sommeil",M,"Utilisée traditionnellement pour atténuer les petits signes de stress et favoriser l'endormissement."),("digestion",M,"Soulage traditionnellement les petits troubles digestifs, notamment liés à la nervosité.")],
 [inf("1 à 2 cuillères à café de feuilles","Infusion du soir","Une somnolence est possible : évitez de conduire juste après."),(CUI,"Fraîche en cuisine","Ciselée dans les salades de fruits, sorbets, poissons ou boissons fraîches.",None)],
 [(IT,A,"Traitement thyroïdien ou médicaments sédatifs : demandez l'avis de votre médecin ou pharmacien."),(PR,I,"Grossesse et allaitement : avis médical recommandé avant un usage régulier.")])
h("romarin","Romarin","Salvia rosmarinus","Lamiacées","Arbuste persistant au parfum résineux, utilisé en cuisine et en tisane stimulante.",["Feuilles"],["1,8-cinéole","Camphre","α-pinène","Acide carnosique","Acide rosmarinique"],ALL,
 [("digestion",M,"Utilisé traditionnellement pour les digestions lentes et les inconforts digestifs légers."),("tonus-memoire",T,"Réputé traditionnellement pour soutenir le tonus lors de fatigues passagères.")],
 [inf("1 cuillère à café de feuilles","Infusion de romarin","Plutôt le matin ou à midi : peut être stimulant le soir."),(CUI,"Viandes, légumes rôtis, pains","Aiguilles entières ou hachées, seules ou avec de l'ail et de l'huile d'olive.",None)],
 [(CI,D,"Épilepsie : évitez les usages concentrés (huile essentielle, extraits)."),(IT,A,"Traitement anticoagulant : demandez l'avis de votre médecin ou pharmacien avant un usage médicinal régulier."),PREG("Grossesse : évitez les doses médicinales ; l'usage culinaire reste possible.")])
h("basilic","Basilic","Ocimum basilicum","Lamiacées","Herbe d'été parfumée, reine de la cuisine méditerranéenne.",["Feuilles"],["Linalol","Eugénol","Estragole (variable)","Acide rosmarinique","Flavonoïdes"],r(6,9),
 [("digestion",T,"Employé traditionnellement pour les ballonnements et les spasmes digestifs légers."),("stress-sommeil",T,"Réputé traditionnellement pour sa légère action apaisante.")],
 [inf("5 à 6 feuilles fraîches","Infusion de basilic"),(CUI,"Cru, en fin de préparation","Déchirez les feuilles au dernier moment (pesto, salades, tomates) : la chaleur prolongée détruit l'arôme.",None)],
 [LAM_ALLERGY,HE("de basilic"),PREG()])
h("tulsi","Tulsi (basilic sacré)","Ocimum tenuiflorum","Lamiacées","Basilic sacré de la tradition ayurvédique, consommé en infusion.",["Feuilles"],["Eugénol","Acide rosmarinique","Acide ursolique","Flavonoïdes"],r(6,9),
 [("stress-sommeil",T,"Utilisé dans la tradition ayurvédique pour accompagner les périodes de tension."),("voies-respiratoires",T,"Consommé traditionnellement en infusion chaude lors des refroidissements."),("tonus-memoire",T,"Réputé en Ayurvéda pour soutenir le tonus.")],
 [inf("1 cuillère à café de feuilles séchées","Infusion de tulsi","Évitez la prise tardive si vous êtes sensible aux stimulants.")],
 [PREG("Grossesse et projet de grossesse : à éviter par précaution (des études sur l'animal suggèrent un effet sur la fertilité)."),(IT,A,"Traitement anticoagulant ou antidiabétique : avis médical préalable."),LAM_ALLERGY])
h("persil","Persil","Petroselinum crispum","Apiacées","Herbe de tous les jours, riche en vitamines, aussi utilisée en tisane pour le confort urinaire.",["Feuilles","Racine"],["Apiol","Myristicine","Flavonoïdes (apigénine)","Vitamines C et K"],r(5,10),
 [("confort-urinaire",T,"Employé traditionnellement pour augmenter le volume des urines et favoriser l'élimination d'eau."),("digestion",T,"Consommé traditionnellement pour stimuler l'appétit et la digestion."),("tonus-memoire",T,"Apporte des vitamines et du fer utiles à l'équilibre alimentaire.")],
 [(CUI,"Frais, en fin de cuisson","Ciselé sur les plats, en persillade ou en jus vert, pour conserver vitamines et arômes.",None),inf("1 poignée de persil frais","Infusion de persil","Usage ponctuel ; buvez suffisamment d'eau pendant la journée.")],
 [(CI,D,"Grossesse : évitez les doses médicinales, les graines et l'huile essentielle (apiol)."),(IT,A,"Anticoagulants (type warfarine) : sa richesse en vitamine K demande un apport régulier et un avis médical."),(PR,A,"Insuffisance rénale ou calculs : demandez un avis médical avant un usage médicinal."),API_ALLERGY])
h("ciboulette","Ciboulette","Allium schoenoprasum","Amaryllidacées","Petite herbe de la famille de l'oignon, douce et vivace.",["Feuilles","Fleurs"],["Composés soufrés","Vitamine C","Caroténoïdes","Flavonoïdes"],r(4,10),
 [("digestion",T,"Employée traditionnellement pour stimuler l'appétit et agrémenter les repas.")],
 [(CUI,"Crue et ciselée","Ajoutez-la juste avant de servir : omelettes, fromages blancs, pommes de terre, salades.",None)],
 [(CI,A,"Allergie connue aux Alliacées (ail, oignon, poireau)."),(PR,I,"Estomac sensible ou côlon irritable : peut provoquer des inconforts."),(PR,I,"Toxique pour les chiens et les chats : tenez-la hors de leur portée.")])
h("coriandre","Coriandre","Coriandrum sativum","Apiacées","Herbe fraîche aux feuilles parfumées et aux graines épicées.",["Feuilles","Graines"],["Linalol","Décénal","Flavonoïdes","Huile essentielle"],r(5,9),
 [("digestion",T,"Les graines sont utilisées traditionnellement pour les ballonnements et la digestion lente.")],
 [(INF,"Infusion de graines","1 cuillère à café de graines légèrement écrasées pour 150 ml d'eau chaude. Couvrir 10 minutes, filtrer.",None),(CUI,"Feuilles fraîches","Ajoutez-les crues en fin de préparation (currys, salades, guacamole, soupes).",None)],
 [API_ALLERGY,(PR,I,"Certaines personnes lui trouvent un goût de savon (variation génétique) : ce n'est pas un signe d'allergie."),PREG()])
h("sauge","Sauge officinale","Salvia officinalis","Lamiacées","Plante grise et veloutée, réputée pour la gorge et la sudation excessive.",["Feuilles"],["Thuyone","Camphre","1,8-cinéole","Acide carnosique","Acide rosmarinique"],r(5,9),
 [("voies-respiratoires",M,"Utilisée traditionnellement en gargarisme pour les irritations de la bouche et de la gorge."),("digestion",M,"Employée traditionnellement pour les inconforts digestifs légers.")],
 [inf("1 à 2 cuillères à café de feuilles","Infusion ou gargarisme","Quelques tasses par jour ; pour le gargarisme, laisser tiédir et ne pas avaler. Courte durée, pas de cure prolongée."),(CUI,"Beurre de sauge, viandes, pâtes","Faites revenir quelques feuilles dans du beurre ou de l'huile d'olive.",None)],
 [(CI,D,"Grossesse et allaitement : déconseillée aux doses médicinales (thuyone ; peut réduire la lactation)."),(CI,D,"Épilepsie : évitez les usages concentrés et l'huile essentielle."),(PR,A,"Cancers hormono-dépendants : demandez l'avis de votre médecin."),(PR,A,"Ne pas dépasser les durées habituelles d'usage (thuyone).")])
h("origan","Origan","Origanum vulgare","Lamiacées","Herbe de la pizza et de la cuisine méditerranéenne, très riche en composés aromatiques.",["Sommités fleuries"],["Carvacrol","Thymol","Flavonoïdes","Acide rosmarinique"],r(6,9),
 [("digestion",T,"Employé traditionnellement pour la digestion et les ballonnements."),("voies-respiratoires",T,"Consommé traditionnellement en infusion lors des refroidissements.")],
 [inf("1 cuillère à café de sommités séchées","Infusion d'origan"),(CUI,"Séché, en cuisine","Plus parfumé séché que frais : pizzas, sauces tomate, grillades.",None)],
 [(PR,D,"Huile essentielle d'origan : très irritante pour la peau et les muqueuses ; à n'utiliser que sur avis d'un professionnel."),LAM_ALLERGY,PREG()])
h("marjolaine","Marjolaine","Origanum majorana","Lamiacées","Cousine douce de l'origan, au parfum fleuri et légèrement camphré.",["Sommités fleuries"],["Terpinène-4-ol","Sabinène","Acide rosmarinique","Tanins"],r(6,9),
 [("digestion",T,"Employée traditionnellement pour les spasmes et ballonnements légers."),("stress-sommeil",T,"Réputée traditionnellement pour sa légère action apaisante.")],
 [inf("1 cuillère à café de sommités","Infusion de marjolaine"),(CUI,"Charcuteries, farces, légumes","Ajoutez-la en fin de cuisson pour préserver sa finesse.",None)],
 [LAM_ALLERGY,PREG()])
h("lavande","Lavande vraie","Lavandula angustifolia","Lamiacées","Arbrisseau des garrigues aux fleurs violettes, symbole de détente.",["Fleurs"],["Linalol","Acétate de linalyle","Flavonoïdes","Tanins"],r(6,8),
 [("stress-sommeil",M,"Utilisée traditionnellement pour atténuer les petits signes de stress et favoriser l'endormissement."),("digestion",T,"Employée traditionnellement pour les inconforts digestifs liés à la nervosité.")],
 [inf("1 cuillère à café de fleurs séchées","Infusion de fleurs","Utilisez de la lavande vraie (L. angustifolia) de qualité alimentaire, pas du lavandin ni des fleurs de décoration."),(CUI,"Pointe en cuisine","Quelques fleurs seulement dans un sucre, une crème, un miel ou une marinade.",None)],
 [(PR,D,"Huile essentielle : ne pas avaler sans avis professionnel ; usage cutané déconseillé chez le jeune enfant sans avis."),PREG(),(PR,I,"Fleurs vendues pour la décoration ou traitées : ne pas consommer.")])
h("camomille","Camomille matricaire","Matricaria chamomilla","Astéracées","Petites fleurs blanches au cœur jaune, la tisane de détente la plus connue.",["Capitules floraux"],["Bisabolol","Chamazulène","Apigénine","Flavonoïdes"],r(5,8),
 [("digestion",M,"Soulage traditionnellement les spasmes et inconforts digestifs légers."),("stress-sommeil",T,"Employée traditionnellement pour favoriser la détente du soir.")],
 [inf("1 à 2 cuillères à café de capitules","Infusion de camomille","Couvrir pour garder les huiles volatiles.")],
 [AST_ALLERGY,(IT,A,"Anticoagulants : des cas d'interaction ont été rapportés, demandez l'avis de votre pharmacien."),(PR,I,"Éviter les compresses près des yeux si vous êtes allergique : risque de réaction.")])
h("verveine-citronnelle","Verveine citronnelle","Aloysia citrodora","Verbénacées","Arbuste au parfum citronné intense, star des tisanes du soir (à ne pas confondre avec la verveine officinale).",["Feuilles"],["Citral","Géraniol","Verbascoside","Flavonoïdes"],r(6,9),
 [("digestion",T,"Employée traditionnellement pour faciliter la digestion."),("stress-sommeil",T,"Réputée traditionnellement pour la détente du soir.")],
 [inf("1 cuillère à café de feuilles","Infusion de verveine"),(CUI,"Desserts et boissons","Infusez les feuilles dans du lait, une crème ou un sirop.",None)],
 [(PR,I,"Usage prolongé en grande quantité : peut irriter l'estomac chez les personnes sensibles."),PREG()])
h("estragon","Estragon","Artemisia dracunculus","Astéracées","Herbe fine à la saveur anisée, essentielle de la sauce béarnaise.",["Feuilles"],["Estragole","Méthyleugénol","Flavonoïdes","Coumarines"],r(5,9),
 [("digestion",T,"Employé traditionnellement pour stimuler l'appétit et la digestion.")],
 [(CUI,"Sauces, volailles, œufs","Ajoutez-le haché en fin de cuisson pour conserver son arôme anisé.",None)],
 [AST_ALLERGY,(PR,A,"Riche en estragole : pas d'usage médicinal prolongé ni d'huile essentielle sans avis professionnel."),PREG()])
h("aneth","Aneth","Anethum graveolens","Apiacées","Herbe plumeuse aux notes anisées, parfaite avec le poisson.",["Feuilles","Graines"],["Carvone","Limonène","Phellandrène","Flavonoïdes"],r(6,9),
 [("digestion",T,"Les graines sont utilisées traditionnellement pour les ballonnements et la digestion difficile.")],
 [(INF,"Infusion de graines","1 cuillère à café de graines légèrement écrasées pour 150 ml d'eau chaude. Couvrir 10 minutes, filtrer.",None),(CUI,"Poisson, concombres, yaourt","Ajoutez les frondes ciselées au dernier moment.",None)],
 [API_ALLERGY,PREG("Grossesse et allaitement : évitez les doses médicinales et l'huile essentielle ; l'usage culinaire reste possible.")])
h("fenouil","Fenouil","Foeniculum vulgare","Apiacées","Plante à feuilles en plumes dont on consomme les graines, le bulbe et les frondes.",["Fruits (graines)","Feuilles"],["Anéthole","Fenchone","Estragole","Flavonoïdes"],r(8,10),
 [("digestion",M,"Utilisé traditionnellement pour les ballonnements et les spasmes digestifs légers."),("voies-respiratoires",M,"Employé traditionnellement en cas de toux liée à un rhume.")],
 [inf("1 cuillère à café de graines légèrement écrasées","Infusion de fenouil","Quelques tasses par jour sur une courte durée (pas plus de deux semaines sans avis)."),(CUI,"Graines et frondes","Graines dans pains, poissons, charcuteries ; frondes en fin de cuisson.",None)],
 [API_ALLERGY,(PR,A,"Grossesse, allaitement, jeunes enfants : évitez les usages médicinaux prolongés (estragole)."),(PR,A,"Cancers hormono-dépendants : demandez l'avis de votre médecin."),HE("de fenouil")])
h("anis-vert","Anis vert","Pimpinella anisum","Apiacées","Petite graine sucrée et parfumée, utilisée en infusion, pâtisserie et boissons.",["Fruits (graines)"],["Anéthole","Estragole","Flavonoïdes","Coumarines"],r(8,9),
 [("digestion",M,"Utilisé traditionnellement pour les ballonnements et les troubles digestifs légers."),("voies-respiratoires",M,"Employé traditionnellement pour apaiser la toux.")],
 [inf("1 cuillère à café de graines légèrement écrasées","Infusion d'anis"),(CUI,"Biscuits, pains, desserts","Ajoutez les graines entières ou moulues à la pâte.",None)],
 [API_ALLERGY,(PR,A,"Jeunes enfants, grossesse, allaitement : évitez les usages médicinaux prolongés (estragole)."),(PR,A,"Cancers hormono-dépendants : demandez l'avis de votre médecin.")])
h("carvi","Carvi","Carum carvi","Apiacées","Graine épicée et chaude des pains, fromages et choucroutes d'Europe centrale.",["Fruits (graines)"],["Carvone","Limonène","Flavonoïdes","Huile essentielle"],r(7,9),
 [("digestion",M,"Utilisé traditionnellement pour les ballonnements, spasmes et digestions lentes.")],
 [inf("1 cuillère à café de graines légèrement écrasées","Infusion de carvi","Après le repas, jusqu'à quelques tasses par jour."),(CUI,"Pains, fromages, choux","Idéal avec les plats lourds ou les légumes du genre chou.",None)],
 [API_ALLERGY,PREG(),(PR,I,"Huile essentielle : déconseillée chez le jeune enfant.")])
h("laurier-sauce","Laurier-sauce","Laurus nobilis","Lauracées","Arbuste méditerranéen dont les feuilles parfument les plats mijotés.",["Feuilles"],["1,8-cinéole","Eugénol","Linalol","Flavonoïdes"],ALL,
 [("digestion",T,"Employé traditionnellement pour faciliter la digestion des plats riches.")],
 [(CUI,"Plats mijotés","Ajoutez 1 à 2 feuilles à la cuisson et retirez-les avant de servir.",None),(DEC,"Décoction légère","1 feuille dans 150 ml d'eau, frémir 5 minutes, filtrer.","Usage occasionnel.")],
 [(PR,D,"Ne jamais avaler une feuille entière : bords coupants, risque de lésion digestive."),(PR,D,"Ne le confondez pas avec le laurier-rose, très toxique : vérifiez l'espèce avant toute cueillette."),(CI,A,"Allergie aux Lauracées (cannelle, avocat…) ou à l'eugénol.")])
h("sarriette","Sarriette","Satureja hortensis","Lamiacées","Herbe poivrée des légumineuses, surnommée « herbe aux haricots ».",["Sommités fleuries"],["Carvacrol","Thymol","Acide rosmarinique","Tanins"],r(6,9),
 [("digestion",T,"Employée traditionnellement pour limiter les ballonnements après les légumineuses.")],
 [(CUI,"Avec haricots et lentilles","Ajoutez un brin à l'eau de cuisson des légumineuses.",None),inf("1 cuillère à café de sommités","Infusion de sarriette")],
 [LAM_ALLERGY,(PR,D,"Huile essentielle : irritante pour la peau ; à n'utiliser que sur avis professionnel."),PREG()])
h("cerfeuil","Cerfeuil","Anthriscus cerefolium","Apiacées","Herbe fine délicate, composante des « fines herbes » classiques.",["Feuilles"],["Estragole (traces)","Flavonoïdes","Vitamine C","Huile essentielle"],r(4,9),
 [("digestion",T,"Consommé traditionnellement pour stimuler l'appétit."),("confort-urinaire",T,"Employé traditionnellement pour favoriser l'élimination urinaire.")],
 [(CUI,"Cru, en fin de préparation","Ajoutez-le ciselé au dernier moment (omelettes, soupes, sauces) : la chaleur lui fait perdre son arôme.",None)],
 [(CI,D,"Ne le cueillez jamais en pleine nature sans identification certaine : risque de confusion avec la ciguë, mortelle."),API_ALLERGY])
h("liveche","Livèche","Levisticum officinale","Apiacées","Grande plante au goût de céleri très marqué, aussi appelée « céleri perpétuel ».",["Feuilles","Racine"],["Phtalides","Furocoumarines","Huile essentielle","Flavonoïdes"],r(5,9),
 [("digestion",T,"Employée traditionnellement pour stimuler l'appétit et la digestion."),("confort-urinaire",T,"La racine est employée traditionnellement pour augmenter le volume des urines.")],
 [(CUI,"Bouillons et soupes","Une petite feuille suffit pour parfumer un bouillon, une soupe ou un plat mijoté.",None),inf("1 cuillère à café de feuilles","Infusion de livèche","Courte durée ; buvez de l'eau au cours de la journée.")],
 [(CI,D,"Inflammation des reins ou œdèmes liés à une insuffisance cardiaque ou rénale : ne pas utiliser."),(PR,A,"Photosensibilisation possible (furocoumarines) : évitez l'exposition au soleil après un usage médicinal."),PREG(),API_ALLERGY])
h("citronnelle","Citronnelle","Cymbopogon citratus","Poacées","Herbe tropicale aux tiges parfumées de citron, base de la cuisine thaïe.",["Tiges","Feuilles"],["Citral","Géraniol","Myrcène","Flavonoïdes"],r(6,10),
 [("digestion",T,"Employée traditionnellement pour les digestions lentes et les ballonnements."),("stress-sommeil",T,"Réputée traditionnellement pour la détente.")],
 [inf("1 tige émincée (ou 1 cuillère à café de feuilles séchées)","Infusion de citronnelle"),(CUI,"Soupes, currys, bouillons","Écrasez la tige pour libérer l'arôme, faites mijoter, puis retirez-la avant de servir.",None)],
 [PREG("Grossesse : évitez les usages médicinaux ; l'usage culinaire reste possible."),(PR,A,"Huile essentielle : risque d'irritation de la peau ; ne pas utiliser pure.")])
h("hysope","Hysope","Hyssopus officinalis","Lamiacées","Sous-arbrisseau aux fleurs bleues, utilisé en tisane pour les voies respiratoires.",["Sommités fleuries"],["Pinocamphone (huile essentielle)","Flavonoïdes","Tanins","Acide rosmarinique"],r(6,9),
 [("voies-respiratoires",T,"Utilisée traditionnellement en tisane lors des refroidissements."),("digestion",T,"Employée traditionnellement pour les digestions lentes.")],
 [inf("1 cuillère à café de sommités","Infusion d'hysope","Usage occasionnel et de courte durée.")],
 [(CI,D,"Épilepsie : à éviter, l'huile essentielle est neurotoxique à doses élevées."),(CI,D,"Grossesse, allaitement et enfants : déconseillée."),LAM_ALLERGY])
h("oseille","Oseille","Rumex acetosa","Polygonacées","Feuille acidulée à la saveur citronnée, utilisée en soupes et sauces.",["Feuilles"],["Acide oxalique","Vitamine C","Tanins","Flavonoïdes"],r(4,9),
 [("digestion",T,"Consommée traditionnellement pour stimuler l'appétit grâce à son acidité.")],
 [(CUI,"Soupes, sauces, poissons","Cuisez-la brièvement : elle fond en purée. Associez-la à de la crème ou à des œufs.",None)],
 [(CI,D,"Calculs rénaux (oxalate), goutte ou insuffisance rénale : à éviter ou à limiter fortement."),(PR,A,"Consommation en grande quantité déconseillée (acide oxalique)."),(PR,I,"Évitez de la consommer en même temps que des aliments riches en calcium si vous êtes sujet aux calculs.")])

TIPS=[
("menthe-en-pot","culture","Cultiver la menthe en pot","La menthe est envahissante : plantez-la dans un pot ou un seau enterré. Sol frais, mi-ombre, arrosage régulier. Taillez souvent pour garder un feuillage tendre."),
("thym-soleil","culture","Un thym heureux : soleil et drainage","Plein soleil, sol pauvre et très drainant, peu d'eau. Taillez légèrement après la floraison pour éviter qu'il ne se dégarnisse."),
("basilic-chaleur","culture","Réussir son basilic","Semez après les derniers gels, au chaud et en plein soleil. Pincez les têtes pour le faire ramifier et retirez les boutons floraux pour prolonger la récolte."),
("persil-germination","culture","Faire germer le persil","Sa germination est lente (3 à 6 semaines). Semez en place dans un sol frais, car il supporte mal la transplantation."),
("romarin-hiver","culture","Romarin : sec et ensoleillé","Il craint l'excès d'eau plus que le froid. Offrez-lui un sol drainant ; en pot, évitez la soucoupe pleine en hiver."),
("secher-herbes","conservation","Sécher ses herbes","Récoltez le matin après la rosée, puis suspendez-les en petits bouquets, à l'ombre dans un endroit aéré. Conservez-les dans des bocaux opaques, loin de la chaleur et de l'humidité."),
("glacons-herbes","conservation","Congeler en glaçons","Hachez des herbes tendres (menthe, mélisse, persil, ciboulette), répartissez-les dans un bac à glaçons, couvrez d'eau ou d'huile d'olive et congelez."),
("tiges-eau","conservation","Garder les herbes fraîches au frigo","Les herbes tendres (persil, coriandre, menthe) tiennent plus longtemps debout dans un verre d'eau, au frais. Le basilic, lui, déteste le froid : gardez-le à température ambiante."),
("labelliser","conservation","Étiqueter et dater","Notez le nom et la date de séchage sur chaque bocal. Les herbes séchées gardent leurs arômes environ un an ; au-delà, renouvelez-les."),
("infusion-couvrir","quotidien","Une infusion réussie","Couvrez la tasse pendant l'infusion pour garder les huiles volatiles, et utilisez une eau frémissante plutôt que bouillante pour les feuilles tendres."),
("fraiches-ou-seches","quotidien","Fraîches ou sèches ?","Les herbes robustes (thym, romarin, laurier, origan) s'ajoutent en début de cuisson. Les herbes tendres (basilic, persil, ciboulette, cerfeuil) se glissent à la fin."),
("pas-de-cueillette-sauvage","quotidien","Cueillette sauvage : prudence","Certaines plantes toxiques ressemblent à des herbes comestibles (ciguë et cerfeuil, laurier-rose et laurier-sauce). N'utilisez que des plantes identifiées avec certitude."),
("avis-pro","quotidien","Quand demander conseil","Grossesse, allaitement, enfants, traitement en cours ou maladie chronique : parlez-en à votre médecin ou à votre pharmacien avant tout usage médicinal régulier."),
]
json.dump([dict(slug=s,label=l) for s,l in SYMPTOMS],open("data/symptoms.json","w"),ensure_ascii=False,indent=1)
json.dump(H,open("data/herbs.json","w"),ensure_ascii=False,indent=1)
json.dump([dict(slug=a,category=b,title=c,body=d) for a,b,c,d in TIPS],open("data/tips.json","w"),ensure_ascii=False,indent=1)
print(len(H),"plantes",len(TIPS),"conseils")
