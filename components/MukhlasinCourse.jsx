import { useState, useEffect, useRef } from "react";

// ─── COLORS ───────────────────────────────────────────────────────
const C = {
  gold: "#8a7a5a", goldLight: "#c8b080", goldBg: "#f5f0e6",
  dark: "#0a0a0a", darkCard: "#111009", cream: "#f5f0e8",
  slate: "#c8c0b0", muted: "#6a6050", dim: "#2a2520",
  border: "#2a2520", borderLight: "#e0d8cc",
  green: "#4a7c5e", red: "#8b2020", white: "#ffffff",
  bg: "#faf8f5",
};

// ─── AUTHOR BIO ──────────────────────────────────────────────────
const BIO = `Amin Shabazz Muhammad was born and raised in St. Paul, Minnesota. In 1982 he founded Minnesota's first Hip-Hop B-Boy crew and was instrumental in promoting peace in the Twin Cities through culture rather than conflict. A community activist, martial artist, self-taught multi-instrumentalist, singer-songwriter, multi-linguist, and world traveler — he has dedicated his life to the upliftment of his people through knowledge of self. He assisted major recording artist Prince in his pursuit of spiritual and political consciousness, and has instructed many thousands more in the disciplines of martial arts, diet, language, history, culture, and self-knowledge. For over 30 years — now entering his fourth decade of practice — he has lived what others only study. What you see in his face at 57 years old is not a claim. It is a testimony.`;

// ─── BOOK DATA ───────────────────────────────────────────────────
const BOOKS = [
  {
    id: "mukhlasin",
    title: "The Mukhlasin Diet",
    subtitle: "Al-Himiyat Al-Mukhlasin — 4th Edition",
    arabic: "الْحِمِيَةُ الْمُخْلَصِينَ",
    year: "2022",
    tagline: "Celebrating 30+ years of Fasting",
    description: "The foundational text of the Mukhlasin discipline — drawing on the Quran, Bible, Hadith, ancient Kemetic tradition, medical studies, and atmospheric science. A witness account of a practice thousands of years old.",
    chapters: [
      { id: 1, title: "Instruction", content: `This book is not merely a dietary guide. It is a witness account of a discipline practiced for thousands of years — one that purifies the mind, body, and spirit of the practitioner.\n\nThe Most Honorable Elijah Muhammad wrote in How To Eat To Live that we should eat once per day, or once every two to three days. These are not suggestions. They are prescriptions for a long and healthy life, drawn from divine revelation and confirmed by over thirty years of personal practice.\n\nWhat you hold in your hands is not theory. It is testimony.\n\nI did not invent this discipline. I only bear witness to its power. The practice of the Mukhlasin Diet has its roots in the Ancient Mystery Systems of Asia — traditions that predate modern medicine by millennia. Masters who practiced these disciplines were known to live into extreme old age, maintaining youthful appearance, mental agility, and brightness upon the face and countenance.\n\nTo the reader who approaches this text with skepticism: I ask only that you compare the results of those who practice with those who do not. The evidence is written on the faces of the practitioners.\n\nTo the believer who approaches with an open heart: welcome. This is a journey into the highest Self. Let us begin.` },
      { id: 2, title: "The Mukhlasin — The Purified Ones", content: `The word Mukhlasin (الْمُخْلَصِينَ) refers to those who have been purified — not merely cleansed of physical impurity, but elevated in consciousness, refined in character, and liberated from the enslavement of appetite.\n\nThe Quran speaks of the Mukhlasin as those who have been selected and drawn near — those whom Satan himself declared he could not lead astray. This is not a metaphor. It is a description of a physiological and spiritual state achieved through the disciplined practice of dietary restriction.\n\nEvery nation, culture, religion and people has a standard of purity. But when the process of purification is referenced, the term becomes lost in vague euphemisms. The language becomes weak in describing exactly how one is to become purified, and remain in a perpetual state of purity.\n\nThis writing seeks to demystify and reduce to an easy-to-understand, simplified, and teachable format the science of self-purification and self-mastery.\n\nThe Mukhlasin are not born. They are made — through discipline, patience, and an unwavering commitment to the natural laws of creation. The path is available to any who would walk it. The reward is written on the face of every practitioner who has walked it faithfully.` },
      { id: 3, title: "Ramadan", content: `Ramadan is the ninth month of the Islamic lunar calendar, observed by Muslims worldwide as a month of fasting, prayer, reflection, and community. The fast of Ramadan — from dawn to sunset — is one of the Five Pillars of Islam and is considered obligatory for adult Muslims.\n\nBut the significance of Ramadan extends far beyond religious observance. It is, at its core, a month-long training in the discipline of appetite control. The practitioner learns to subordinate the demands of the body to the commands of the will. This is the foundation of all mastery.\n\nThe Mukhlasin Diet uses Ramadan not as an endpoint but as a beginning — a gateway into a deeper and more sustained practice of dietary discipline. The student who completes Ramadan with integrity has demonstrated the capacity for one meal per day. From this foundation, the ascent to higher levels of practice becomes possible.\n\nFor those who are not Muslim, the principles of Ramadan translate directly: the capacity for prolonged fasting, the cultivation of spiritual awareness through hunger, and the community bond forged through shared discipline are universal gifts available to any sincere seeker.\n\nRamadan is not the ceiling. It is the floor.` },
      { id: 4, title: "Personal Experiences — Perfecting the Science of Eating", content: `I have been asked many times how I came to this practice. The answer is not a pleasant one, but it is an honest one.\n\nI was dying.\n\nAt nineteen years old, my health was ruined. I had broken my leg repeatedly. I learned to walk with a cane. I had a titanium rod and screws added to keep my bones from breaking. The pain was indescribable — I was often up throughout the nights, sobbing in excruciating pain, diagnosed with Osteoid Osteoma, an extremely painful bone tumor.\n\nIt was in this state that I encountered the discipline that would change my life. I went after it with my whole being. I changed my shopping habits. I changed where I purchased my food. I changed the people around me. I changed how and when I ate.\n\nI had absolutely no personal example to teach me. I learned by reading and practicing the words of great teachers. It was trial and error, until I learned to master the principles.\n\nWhenever someone said I was crazy for doing such an extreme practice, I told them: "Let's compare notes in 20 years."\n\nThirty years later, I look and feel younger than those who are ten to twenty years my junior. I have not changed much in physical appearance since I was 24. My weight has been constant.\n\nThis section is not written for the sake of boasting or arrogance. It is to humbly demonstrate the power of the Will.` },
      { id: 5, title: "Our Natural Beauty Appearance", content: `The discipline of the Mukhlasin Diet produces a visible and unmistakable effect upon the physical appearance of the practitioner. This is not cosmetic. It is biological.\n\nWhen the body is freed from the constant labor of processing excess food, it redirects its energy toward cellular repair, lymphatic cleansing, and the elimination of toxins that have accumulated over years of undisciplined eating. The result is what has been called "The Glow" — a brightness upon the face and countenance that is visible to all who encounter the practitioner.\n\nI first noticed this effect in others long before I understood its source. Later, I came to understand that the Glow is not a product that can be purchased. It cannot be manufactured with creams, surgeries, or supplements. It is the natural luminescence of a purified vessel.\n\nThe Glow is also not permanent. It must be continually renewed through the continued practice of the discipline. It is a daily testimony — a living proof written on the face of the practitioner.\n\nPrince once said of me that I always looked like I was standing under a spotlight. He saw the Glow. He was so inspired by it that he became a vegan. The Glow is that powerful.\n\nThis is what the Mukhlasin Diet offers: not the appearance of health, but actual health — visible, radiant, and undeniable.` },
      { id: 6, title: "Clarity", content: `One of the most consistent and immediate benefits reported by practitioners of the Mukhlasin Diet is a profound and unmistakable clarity of mind.\n\nWhen the body is not engaged in the energy-intensive process of digesting heavy meals multiple times per day, the energy that would otherwise be consumed by digestion is redirected to the brain. The practitioner experiences a heightened state of awareness, focus, and cognitive function that is difficult to describe to those who have not experienced it.\n\nI have described this as the mind becoming FAST — not merely quick in thought, but rapid in discernment, swift in perception, and clear in judgment. Problems that previously required extended deliberation resolve themselves almost instantaneously. The practitioner begins to operate from a higher plane of consciousness.\n\nThis is not metaphor. The enteric nervous system — often called the second brain — contains over 100 million nerve cells. When the digestive system is at rest, this second brain is free to communicate more efficiently with the primary brain. The result is a state of heightened sensory and cognitive function that ancient practitioners described as spiritual ascension.\n\nClarity is not a side effect of the Mukhlasin Diet. It is one of its primary gifts.` },
      { id: 7, title: "Depression", content: `Depression is one of the most prevalent and debilitating conditions in the modern world. It is also one of the most misunderstood.\n\nWestern medicine approaches depression primarily as a chemical imbalance — a deficiency of serotonin, dopamine, or other neurotransmitters that can be corrected through pharmaceutical intervention. This approach treats the symptom without addressing the cause.\n\nThe Mukhlasin Diet takes a fundamentally different view. Depression, from the perspective of this discipline, is largely a consequence of toxicity — the accumulation of toxic substances in the body and mind that cloud perception, distort emotion, and suppress the natural luminescence of the human spirit.\n\nWhen the body is engaged in the continuous process of eliminating these toxins through fasting, the fog of depression begins to lift. Practitioners consistently report improvements in mood, emotional stability, and overall sense of wellbeing that accompany the practice of the discipline.\n\nThis is not to suggest that the Mukhlasin Diet is a cure for clinical depression. Every individual's situation is unique, and the guidance of medical professionals should always be sought when needed.\n\nBut the connection between diet, toxicity, and mental health is undeniable. The food we eat is the primary source of the toxins that afflict us — and the discipline of regulated, restricted eating is the primary means of eliminating them.` },
      { id: 8, title: "Self Talk", content: `The quality of our inner dialogue determines the quality of our life. This is not a motivational platitude. It is a physiological fact.\n\nThe words we speak to ourselves — consciously and subconsciously — have measurable effects on our neurological function, our hormonal balance, and our overall health. Negative self-talk produces stress hormones that suppress immune function, accelerate aging, and increase susceptibility to disease. Positive, constructive inner dialogue produces the opposite effect.\n\nThe practice of the Mukhlasin Diet is, among other things, a practice of mastering the inner voice. The discipline of refusing food when the appetite demands it trains the practitioner to subordinate impulse to intention. This same capacity — the ability to override the lower self — is what makes it possible to transform the quality of one's inner dialogue.\n\nThe practitioner who has learned to tell the stomach "not yet" has also learned to tell the mind "not that thought." These are the same skill, practiced in different arenas.\n\nAs you develop your practice, pay attention to the voice within. Notice when it speaks from fear, from lack, from self-doubt. And practice responding with the same discipline you bring to your eating. The Mukhlasin Diet is a discipline of the whole self — not only the body.` },
      { id: 9, title: "Forgiveness", content: `No discipline of the spirit can reach its fullest expression without the practice of forgiveness. This is not merely a spiritual truth. It is a physiological one.\n\nUnforgiveness — the sustained harboring of resentment, anger, and bitterness toward those who have wronged us — produces a chronic state of stress in the body that undermines every other effort at self-improvement. The toxicity of unforgiveness is as real and as harmful as the toxicity of processed food.\n\nI have seen practitioners achieve significant results through the Mukhlasin Diet, only to find their progress limited by the toxicity of unresolved emotional wounds. The body and the spirit are not separate. What afflicts one afflicts the other.\n\nForgiveness does not mean condoning what was done. It does not mean forgetting. It means releasing the toxin of resentment from your own system — not for the sake of the one who wronged you, but for the sake of your own health and freedom.\n\nThe practice of forgiveness is, in this sense, a form of fasting — a deliberate and disciplined abstention from the poison of unforgiveness. It is one of the most powerful purifications available to the sincere seeker.\n\nBegin where you are. Forgive what you can. And trust that the discipline will carry you further than you can currently see.` },
      { id: 10, title: "Exercise", content: `Exercise is an essential component of the Mukhlasin lifestyle, but it must be understood in its proper context and proportion.\n\nIn the West, exercise has been marketed primarily as a means of weight loss and physical appearance — a corrective measure for the damage done by undisciplined eating. This is a fundamentally reactive approach that addresses symptoms rather than causes.\n\nThe Mukhlasin practitioner approaches exercise differently. When the diet is properly disciplined, the body's natural tendency toward health and vitality expresses itself naturally. The practitioner is not fighting excess weight. They are cultivating strength, flexibility, and endurance in a body that is already functioning at a high level.\n\nAt One Meal A Day, moderate exercise is appropriate and beneficial. Walking, swimming, yoga, and martial arts are particularly well-suited to the practitioner's lifestyle.\n\nAt One Meal Every Two Days, the approach to exercise must be adjusted. Heavy weightlifting and high-intensity cardio are not appropriate at this level. The practitioner's energy is better directed toward activities that cultivate awareness and precision rather than bulk and endurance.\n\nAt One Meal Every Three Days, exercise becomes almost unnecessary in the conventional sense. The practitioner's heightened state of physiological efficiency means that ordinary movement provides sufficient maintenance of the physical form.` },
      { id: 11, title: "Rest", content: `Rest is not the absence of activity. It is an active and essential component of the Mukhlasin practice.\n\nThe human body performs its most important repair work during sleep. The immune system strengthens, cellular damage is repaired, and the brain consolidates the learning and experience of the day. Insufficient rest undermines every other element of the practice.\n\nPractitioners of the Mukhlasin Diet consistently report changes in their sleep patterns as they progress through the levels of the discipline. At One Meal A Day, sleep tends to deepen and become more restorative. Many practitioners find that they require less sleep than before — not because they are sleeping poorly, but because the quality of their sleep has increased significantly.\n\nAt higher levels of the practice, some practitioners find that they can function effectively on four to six hours of sleep per night without any sense of deprivation. This is a natural consequence of the body's increased efficiency — not a goal to be pursued for its own sake.\n\nRest also includes mental and emotional rest — the discipline of disengaging from the constant stimulation of media, social interaction, and mental activity. The practice of silence and stillness is as important to the Mukhlasin practitioner as the practice of dietary restriction.\n\nHonor your rest. It is not laziness. It is preparation.` },
      { id: 12, title: "The Cumulative Effects of Toxicity and the Correlation to Sin", content: `The ancient teachers understood something that modern medicine is only beginning to rediscover: the accumulation of toxins in the body is not merely a physical phenomenon. It is a spiritual one.\n\nThe foods we consume, the thoughts we entertain, the behaviors we engage in — all of these leave residues in the body and spirit that, over time, accumulate into a burden that dims the Light of the practitioner and diminishes their capacity for clear perception and righteous action.\n\nThe Quran and the Bible both describe the consequences of transgression in terms that modern readers often interpret exclusively as moral or spiritual. But the ancient teachers understood these consequences to be physiological as well. The body and the spirit are one system. What corrupts one corrupts both.\n\nThe practice of the Mukhlasin Diet is, in part, a practice of sin management — not in the narrow sense of moral prohibition, but in the broader sense of toxicity reduction. As the body becomes lighter and cleaner through the discipline of restricted eating, the spirit becomes correspondingly clearer and more luminous.\n\nThis is the cumulative effect of the practice: not merely a healthier body, but a more refined and elevated human being — one who is increasingly capable of perceiving truth, acting rightly, and manifesting the Light that is the birthright of every human soul.` },
      { id: 13, title: "Waste Elimination", content: `The efficient elimination of waste is among the most important — and most neglected — aspects of human health.\n\nThe human body produces a continuous stream of metabolic waste: the byproducts of cellular respiration, the residue of digestion, the detritus of cellular repair and replacement. When this waste is efficiently eliminated through the skin, lungs, kidneys, and colon, the body functions optimally. When elimination is impaired, the waste accumulates — and this accumulation is the root cause of the majority of degenerative diseases.\n\nThe practice of One Meal A Day dramatically improves the efficiency of waste elimination. When the body is not continuously engaged in the process of digestion, it has significantly more energy available for the elimination of accumulated waste. Practitioners consistently report changes in their elimination patterns that indicate deep cleansing is occurring.\n\nAt higher levels of the practice, the process of waste elimination becomes even more pronounced. During extended fasting periods, the body enters a state of deep cellular cleansing — a process of autophagy in which damaged and dysfunctional cells are broken down and recycled. This process has been the subject of significant scientific research and was recognized with the 2016 Nobel Prize in Physiology or Medicine.\n\nThe ancient practitioners knew what modern science is now confirming: the empty vessel cleanses itself. The discipline of restricted eating is the most powerful tool available for the deep purification of the human body.` },
    ]
  },
  {
    id: "mastery",
    title: "Mastery Level Fasting",
    subtitle: "50 years old with 30 years of experience",
    arabic: "",
    year: "2019",
    tagline: "Intermittent Fasting · Caloric Restriction · OMAD · OME2-3D",
    description: "A step-by-step guide through the ascending levels of fasting discipline — from Intermittent Fasting through One Meal Every Three Days. Written from 30 years of personal practice, not theory.",
    chapters: [
      { id: 1, title: "Defining Fasting", content: `A great part of undertaking any form of discipline is clear definition. For a student may have a predetermined idea of a thing that may — or may not — be correct. Any person that desires to know a given subject should first take a moment to understand the terms that will be used in that study.\n\nLet us begin with the definitions that will guide this entire study:\n\nFast: means to move or produce at a high rate of speed. Speed is calculated as a measurement of Time.\n\nIntermittent: means occurring at irregular intervals; not continuous or steady. It is a break in an established routine.\n\nCaloric Restriction: means to impose a limit on nutrition, or to control the diametrical activity of a being, by withholding food.\n\nOMAD (One Meal A Day): means to eat one meal within a 24-hour period of time, with NOTHING between meals but water or coffee.\n\nOME2D (One Meal Every Two Days): means to eat one meal within a 48-hour period of time, with NOTHING between meals but water or coffee.\n\nOME3D (One Meal Every Three Days): means to eat one meal within a 72-hour period of time, with NOTHING between meals but water or coffee.\n\nThere is no human being that has good health and longevity in irregular, and unregulated eating habits. The diet of all that live long and healthy lives is regulated to a continuous regimen.\n\nThe greatest desire of any Teacher is the success of the student.` },
      { id: 2, title: "Caloric Restriction", content: `US Funded Studies into Caloric Restriction on Rhesus Macaque monkeys began circa 1935, with the goal of scientifically understanding how the application affects humans.\n\nThe main business goal of food production, distribution and administration is profit. Food Industries must be competitive globally to survive. To accomplish this goal, the nutritional value of foods has diminished. The nutritional value of foods today is not the same as it was prior to the mass industrialization of food industries.\n\nWhen we study the past 80 years of data, and compare it to today's population, we can determine that the nutritional value of the foods has been produced with a scientific composition of what industries have determined is sufficient. The unfortunate consequence of this has resulted in the masses' innate need to eat more of these foods to extract sufficient nutrients that satisfy the body's hunger. This has resulted in a population of unnaturally obese people.\n\nIn America, we have been conditioned to think of 3rd World Countries and babies with distended bellies as malnutrition. But a distended belly from eating nutrient-deficient foods grown using pesticides is actually what we are experiencing here in the West.\n\nAlthough the concept likely has its root in the desire to understand how fasting affects animals and inevitably people, the very basis of Caloric Restriction is devoid. Every creature first takes sufficient nutrition to sustain the body during periods without food. Suffering lack of adequate nutrition is not the basis of a healthy diet for longevity.` },
      { id: 3, title: "Intermittent Fasting", content: `The definition of the word "intermittent" is given as "occurring at irregular intervals; not continuous or steady. It is a break in an established routine." The term in and of itself is a misnomer for what we are truly attempting to accomplish.\n\nIn America (circa 1990) a change in foods and dietary recommendations occurred. Genetically Modified Organisms (GMOs) were widely distributed and marketed, and doctors were instructed to teach patients that a healthy diet consisted of 5 to 7 meals per day. The results are evident on the population, in the sharp decline in health and the rise of circulatory and digestive disorders.\n\nIn America, we believe that people reaching their 60s should prepare for the senior citizen's home. Whereas, when I reached the mountain top of the Sukur World Heritage site in Nigeria, I found a 109-year-old woman there farming. She complained in her native tongue that her 67-year-old son was too lazy to do the farming, so she was doing it herself.\n\nWherever a native people maintain their traditional diets, they maintain their health far better than when their diets are replaced by the Western style of eating.\n\nIntermittent Fasting is not to be considered a long-term practice. It is more so a step in the process of establishing the most basic and fundamental beginning level of Mastery Level Fasting — One Meal A Day. The key to understanding personal health is joined to understanding the value of foods, when taken at the proper intervals of time.` },
      { id: 4, title: "One Meal A Day (OMAD)", content: `One Meal A Day is the foundation of the Mukhlasin dietary practice. It is not extreme. It is the natural, designed function of the human body.\n\nThe human digestive system requires a minimum of 24 hours to fully process a properly composed meal and extract its nutritional value. When we interrupt this process by introducing new food before the previous meal has been fully processed, we create a condition of chronic digestive stress that over time manifests as disease.\n\nOMAD — practiced correctly — eliminates this stress. The body is given the time it needs to fully digest, absorb, and eliminate. The result is a dramatic improvement in all aspects of health: weight normalizes, energy increases, mental clarity sharpens, and the luminescence that we call The Glow begins to appear.\n\nThe meal at OMAD should be a proper, full meal — not a snack, not a light eating, but a complete and nutritious meal that provides all the nutrients the body requires for the following 24 hours. The timing of the meal is important: ideally taken in the afternoon or early evening, when the digestive fires are at their strongest.\n\nBetween meals: water and coffee only. Nothing else.\n\nThe practitioner who masters OMAD will find that what once seemed extreme becomes entirely natural — and what once seemed normal (eating multiple times per day) begins to seem as absurd as it actually is.` },
      { id: 5, title: "Fasting Effects on Chronic Injury & Pain", content: `I was encouraged to include my personal experiences with chronic injury and pain, and how fasting helped and still helps me maintain my health today.\n\nWhen I was a preteen, I discovered that I had the unique gift of Photographic Reflexes. This allowed me to become the first person in the state of Minnesota to learn, perform and teach Break Dancing at a professional level — at 13 years old.\n\nBy the time I was 19, my health was ruined. I broke my leg repeatedly. My doctors could not explain why it would not heal. The pain was diagnosed as Osteoid Osteoma — an extremely painful bone tumor. I learned to walk with a cane, following surgery to reconstruct my tibia with a titanium rod and screws.\n\nIt was during this time that I happened to learn of this discipline. I went after it with my whole being. I changed everything — my shopping habits, the people around me, how and when I ate.\n\nDuring my very first three-day fast, on the first three days of 1994, I noticed that I was completely pain free for the first time in years.\n\nThirty years later, I have practiced hard Martial Arts again. I look and feel younger than those who are ten to twenty years my junior.\n\nSuffering from severe injury is no reason to reject this practice. The discipline is far more effective than pain medication. The side-effects of fasting are good health, reduction of pain and inflammation, and long life.` },
      { id: 6, title: "One Meal Every Two Days (OME2D)", content: `One Meal Every Two Days is considered a higher level of practice. Practiced correctly, it results in the slowing of the aging process. It has a profound effect upon healing and pain management.\n\nThe number 12 is a Universal number, correlating to the microcosmic and macrocosmic dimensions. The human body produces the necessary digestive acids and mucosa to process One Meal A Day in a 24-hour period. At OME2D, we extend this to 48 hours — four intervals of 12. The body now has even more time to fully extract nutrition and remove toxic waste.\n\nAt One Meal Every Two Days, the speed of reflexes increases dramatically. The practitioner begins to develop heightened sensory perception. Prince once told The New Power Generation that I "always looks like he's standing under the spotlight." Once I transitioned to One Meal Every Three Days, Prince invited me to Paisley Park. He was so inspired by the Light he saw, that he became a Vegan.\n\nThe Glow is not an exclusive product. It can't be bought, and it can't be sold. It dwells within a vessel only so long as they are in harmony with the natural laws of Creation.\n\nThe key to success at OME2D is preparation. The meal must now sustain the practitioner for 48 hours — double the portions, double the meal time. Organic food at the highest quality you can afford. Room temperature water between meals.\n\nOne Meal Every Two Days is simultaneously easier to maintain than One Meal A Day — because the degree of focus required is itself sustaining.` },
      { id: 7, title: "One Meal Every Three Days (OME3D)", content: `One Meal Every Three Days is considered the level of complete Self Mastery. This discipline will increase the lifespan of the practitioners, reverse the apparent age of the person, and elevate them into the highest degree of consciousness and self-awareness.\n\nThe Prophet David practiced One Meal Every Two Days. The Prophet Jesus fasted for 40 days in the wilderness. The Buddha spent six years practicing various degrees of fasting as a means of purification. The ancient masters of the Eastern Mystery Systems practiced One Meal Every Three Days as their standard discipline.\n\nAt this level, the body's energy is almost entirely freed from the labor of digestion. This energy is redirected to the highest functions of the human organism: cellular repair, lymphatic cleansing, neurological refinement, and the elevation of consciousness.\n\nThe practitioner who reaches OME3D consistently will notice changes that are difficult to describe to those who have not experienced them. Sleep requirements decrease. Mental acuity increases dramatically. The sense of time changes. The practitioner begins to operate from a fundamentally different plane of awareness.\n\nA word of caution: this level is not a starting point. The practitioner must master each level before ascending to the next. Attempting OME3D without a proper foundation in OMAD and OME2D is dangerous. The discipline has a Cause & Effect on the practitioner. Be kind to yourself. Ascend gradually.\n\nDon't hurt yourself. Be wise and humble enough to take a step back in your degree of fasting when the body requires it.` },
      { id: 8, title: "Epilogue", content: `At the present time, I am 57 years old. I have practiced this discipline for over 30 years. I have documented my successes, failures, scientific and spiritual insights. I have documented my observations for the clinical practitioner whose interest may be for scientific research, and for the layperson whose interest is solely personal.\n\nI look and feel younger than those who are ten to twenty years my junior. I have not changed much in physical appearance since I was 24. My weight has been constant, and it only fluctuates based on the degree of my fasting regimen.\n\nI strive not to hurt myself. I take great care to prevent unnecessary injuries. I temper all physical practice with gratitude.\n\nThe Glow is not mine alone. It is the birthright of every human being who is willing to do what is required to receive it. The Light that is in me is also in every human being. It simply needs the proper cultivation to grow.\n\nIt is possible that those who suffer from chronic disease and injury have more to gain from reading these words than those who simply want to look and feel young again.\n\nI have presented this writing in the broadest possible language, as an invitation to study and evaluate the efficacy of this discipline. What was once a closely guarded secret of the Highest Order of the Ancient Mystery Systems of Asia is now available to any who would desire to benefit from this wisdom.\n\nSeeking to give no rise to the passions that cause rejection, please accept this offering, as a literary "meal" that will help you to improve your health and longevity.\n\n— Amin Shabazz Muhammad` },
    ]
  }
];

// ─── CONSULTATION SERVICES ────────────────────────────────────────
const CONSULTATIONS = [
  { id: "email", label: "Email Consultation", duration: "Written response within 48hrs", publicPrice: 49, memberPrice: 35 },
  { id: "phone30", label: "30-Min Phone Session", duration: "30 minutes", publicPrice: 97, memberPrice: 75 },
  { id: "phone60", label: "60-Min Phone Session", duration: "60 minutes", publicPrice: 175, memberPrice: 125 },
  { id: "video60", label: "60-Min Video Session", duration: "60 minutes via video call", publicPrice: 197, memberPrice: 150 },
];

// ─── PRICING TIERS ────────────────────────────────────────────────
const TIERS = [
  {
    id: "books",
    name: "Books Only",
    price: "$9.99/mo",
    altPrice: "$79/yr",
    oneTime: false,
    stripe: "https://buy.stripe.com/fZubJ10Nn0eG5uUfqu77O0b",
    stripeYear: "https://buy.stripe.com/cNi14ngMl5z01eE5PU77O0c",
    features: [
      "Both books — full digital reader",
      "Read-aloud on every chapter",
      "Progress tracking",
      "Monthly 72-Hour Fast community",
      "New editions automatically included",
    ],
    highlight: false,
  },
  {
    id: "course",
    name: "Course Only",
    price: "$297",
    altPrice: "one time · lifetime access",
    oneTime: true,
    stripe: "https://buy.stripe.com/00wbJ153D9Pg7D2a6a77O08",
    features: [
      "Complete Mukhlasin Diet Course",
      "All 25 chapters with slides",
      "Course Q&A",
      "Master of Fasting",
      "Lifetime access",
    ],
    highlight: false,
  },
  {
    id: "complete",
    name: "Complete Library",
    price: "$19.99/mo",
    altPrice: "$149/yr",
    oneTime: false,
    stripe: "https://buy.stripe.com/3cI8wPbs18Lc6yY3HM77O0d",
    stripeYear: "https://buy.stripe.com/7sYcN50Nnf9AbTi2DI77O0e",
    features: [
      "Both books — full digital reader",
      "Read-aloud on every chapter",
      "Complete Mukhlasin Diet Course",
      "All certificates",
      "Monthly 72-Hour Fast community",
      "Ramadan seasonal content",
      "Author articles & teachings",
      "Member consultation rates",
    ],
    highlight: true,
  },
  {
    id: "lifetime",
    name: "Complete Library",
    badge: "Lifetime",
    price: "$497",
    altPrice: "one time · never pay again",
    oneTime: true,
    stripe: "https://buy.stripe.com/7sYcN50NnaTk3mM4LQ77O0f",
    features: [
      "Everything in Complete Library",
      "Lifetime access — no recurring billing",
      "One complimentary 30-min consultation",
      "Discounted consultation rates forever",
      "Early access to all new titles",
      "Priority author Q&A",
    ],
    highlight: false,
  },
];

// ─── FREE ACCESS CODES ────────────────────────────────────────────
const FREE_CODES = { "SADAQAH": true, "ADMINTEST": true };

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function MukhlasinPlatform() {
  const [view, setView] = useState("landing"); // landing | paywall | library | reader | consult
  const [hasAccess, setHasAccess] = useState(false);
  const [accessTier, setAccessTier] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [activeBook, setActiveBook] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState({});
  const [consultForm, setConsultForm] = useState({ name: "", email: "", service: "", message: "" });
  const [consultSent, setConsultSent] = useState(false);

  useEffect(() => {
    const access = sessionStorage.getItem("ml_access");
    const tier = sessionStorage.getItem("ml_tier");
    if (access === "true") { setHasAccess(true); setAccessTier(tier); setView("library"); }
    const saved = sessionStorage.getItem("ml_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (bookId, chapterId) => {
    const updated = { ...progress, [bookId]: chapterId };
    setProgress(updated);
    sessionStorage.setItem("ml_progress", JSON.stringify(updated));
  };

  const grantAccess = (tier = "complete") => {
    sessionStorage.setItem("ml_access", "true");
    sessionStorage.setItem("ml_tier", tier);
    setHasAccess(true);
    setAccessTier(tier);
    setView("library");
  };

  const handleCodeSubmit = () => {
    const upper = code.trim().toUpperCase();
    if (FREE_CODES[upper]) { grantAccess("complete"); }
    else { setMsg("Invalid access code. Please try again."); }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) { setMsg("Please enter your email address."); return; }
    setSending(true); setMsg("");
    try {
      const res = await fetch("/api/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (data.sent) { setMsg("A magic link has been sent to " + email + ". Check your inbox and click the link to enter."); }
      else { setMsg(data.error || "No purchase found. Please enroll below or use your access code."); }
    } catch { setMsg("Connection error. Please try again."); }
    finally { setSending(false); }
  };

  const stopSpeech = () => { window.speechSynthesis.cancel(); setSpeaking(false); };

  const speak = (text) => {
    if (!window.speechSynthesis) { alert("Your browser does not support read-aloud."); return; }
    stopSpeech();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92; utt.pitch = 1.0;
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  };

  const handleConsult = async () => {
    if (!consultForm.name || !consultForm.email || !consultForm.service) {
      alert("Please fill in all required fields."); return;
    }
    setConsultSent(true);
  };

  // ─── VIEWS ──────────────────────────────────────────────────────
  if (view === "reader" && activeBook && activeChapter !== null) {
    const book = BOOKS.find(b => b.id === activeBook);
    const chapter = book.chapters[activeChapter];
    const isFirst = activeChapter === 0;
    const isLast = activeChapter === book.chapters.length - 1;

    return (
      <div style={{ minHeight: "100vh", background: C.dark, color: C.slate, fontFamily: "Georgia, serif" }}>
        {/* Header */}
        <div style={{ background: "#0d0b08", borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => { stopSpeech(); setView("library"); }} style={{ background: "none", border: `1px solid ${C.gold}`, color: C.gold, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>← Library</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>{book.title}</div>
            <div style={{ fontSize: "15px", color: C.goldLight }}>{chapter.title}</div>
          </div>
          <button
            onClick={() => speaking ? stopSpeech() : speak(chapter.content)}
            style={{ background: speaking ? C.gold : "transparent", border: `1px solid ${C.gold}`, color: speaking ? C.dark : C.gold, padding: "6px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}
          >
            {speaking ? "⏹ Stop" : "▶ Read Aloud"}
          </button>
        </div>

        {/* Chapter Content */}
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Chapter {activeChapter + 1} of {book.chapters.length}
          </div>
          <h1 style={{ color: C.goldLight, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2.5rem", fontWeight: "normal" }}>{chapter.title}</h1>
          {chapter.content.split("\n\n").map((para, i) => (
            <p key={i} style={{ lineHeight: 1.9, marginBottom: "1.5rem", color: C.slate, fontSize: "clamp(15px, 2vw, 17px)" }}>{para}</p>
          ))}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
            <button
              onClick={() => { stopSpeech(); if (!isFirst) { saveProgress(activeBook, activeChapter - 1); setActiveChapter(activeChapter - 1); } }}
              disabled={isFirst}
              style={{ background: "none", border: `1px solid ${isFirst ? C.dim : C.gold}`, color: isFirst ? C.dim : C.gold, padding: "10px 20px", borderRadius: "20px", cursor: isFirst ? "default" : "pointer", fontSize: "14px" }}
            >← Previous</button>
            {!isLast ? (
              <button
                onClick={() => { stopSpeech(); saveProgress(activeBook, activeChapter + 1); setActiveChapter(activeChapter + 1); }}
                style={{ background: C.gold, border: "none", color: C.dark, padding: "10px 24px", borderRadius: "20px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
              >Next Chapter →</button>
            ) : (
              <button
                onClick={() => { stopSpeech(); setView("library"); }}
                style={{ background: C.green, border: "none", color: C.white, padding: "10px 24px", borderRadius: "20px", cursor: "pointer", fontSize: "14px" }}
              >✓ Complete</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === "library") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
        {/* Library Header */}
        <div style={{ background: C.dark, borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>Mastery Level Fasting Platform</div>
            <div style={{ color: C.goldLight, fontSize: "16px" }}>Your Library</div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setView("consult")} style={{ background: "none", border: `1px solid ${C.gold}`, color: C.gold, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }}>Book Consultation</button>
            <button onClick={() => { sessionStorage.clear(); setHasAccess(false); setView("landing"); }} style={{ background: "none", border: `1px solid ${C.dim}`, color: C.muted, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }}>Sign Out</button>
          </div>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          {/* Monthly Fast Banner */}
          <div style={{ background: "#0d0b08", border: `1px solid ${C.gold}`, borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ fontSize: "28px" }}>🌙</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.goldLight, fontWeight: "bold", marginBottom: "2px" }}>Monthly 72-Hour Community Fast</div>
              <div style={{ color: C.muted, fontSize: "13px" }}>First Friday–Sunday of every month · Fast together, grow together</div>
            </div>
            <div style={{ background: C.gold, color: C.dark, padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>Active Community</div>
          </div>

          {/* Books */}
          <h2 style={{ color: C.dark, fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: "normal" }}>Your Books</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {BOOKS.map(book => {
              const lastChapter = progress[book.id] || 0;
              const pct = Math.round((lastChapter / book.chapters.length) * 100);
              return (
                <div key={book.id} style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ background: C.dark, padding: "1.5rem", textAlign: "center" }}>
                    {book.arabic && <div style={{ color: C.gold, fontSize: "20px", marginBottom: "8px" }}>{book.arabic}</div>}
                    <div style={{ color: C.goldLight, fontSize: "1rem", fontWeight: "bold" }}>{book.title}</div>
                    <div style={{ color: C.muted, fontSize: "12px", marginTop: "4px" }}>{book.subtitle}</div>
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ color: "#444", fontSize: "13px", lineHeight: 1.6, marginBottom: "1rem" }}>{book.description}</p>
                    {/* Progress bar */}
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: C.muted, marginBottom: "4px" }}>
                        <span>Progress</span><span>{pct}%</span>
                      </div>
                      <div style={{ height: "4px", background: C.borderLight, borderRadius: "2px" }}>
                        <div style={{ width: pct + "%", height: "100%", background: C.gold, borderRadius: "2px", transition: "width 0.3s" }} />
                      </div>
                    </div>
                    {/* Chapter list */}
                    <div style={{ maxHeight: "180px", overflowY: "auto", marginBottom: "1rem" }}>
                      {book.chapters.map((ch, i) => (
                        <button
                          key={ch.id}
                          onClick={() => { setActiveBook(book.id); setActiveChapter(i); setView("reader"); }}
                          style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", background: "none", border: "none", textAlign: "left", padding: "6px 4px", cursor: "pointer", borderBottom: `1px solid ${C.borderLight}`, color: i <= lastChapter ? C.dark : "#999", fontSize: "13px" }}
                        >
                          <span style={{ color: i < lastChapter ? C.green : C.muted, fontSize: "12px", width: "16px" }}>{i < lastChapter ? "✓" : (i + 1) + "."}</span>
                          {ch.title}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { setActiveBook(book.id); setActiveChapter(lastChapter); setView("reader"); }}
                      style={{ width: "100%", background: C.dark, color: C.gold, border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}
                    >
                      {lastChapter === 0 ? "Start Reading →" : `Continue — Chapter ${lastChapter + 1}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Course Access */}
          <h2 style={{ color: C.dark, fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: "normal" }}>The Course</h2>
          <div style={{ background: C.dark, borderRadius: "12px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.goldLight, fontSize: "1.1rem", marginBottom: "4px" }}>The Mukhlasin Diet — Complete Course</div>
              <div style={{ color: C.muted, fontSize: "13px" }}>25 chapters · Slides · Q&A · Master of Fasting</div>
            </div>
            <a href="/" style={{ background: C.gold, color: C.dark, padding: "10px 20px", borderRadius: "20px", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>Enter Course →</a>
          </div>

          {/* Consultations */}
          <h2 style={{ color: C.dark, fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: "normal" }}>Consultations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {CONSULTATIONS.map(c => (
              <div key={c.id} style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: "10px", padding: "1.25rem" }}>
                <div style={{ color: C.dark, fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>{c.label}</div>
                <div style={{ color: C.muted, fontSize: "12px", marginBottom: "12px" }}>{c.duration}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: C.muted, fontSize: "11px", textDecoration: "line-through" }}>${c.publicPrice} public</div>
                    <div style={{ color: C.green, fontWeight: "bold" }}>${c.memberPrice} member</div>
                  </div>
                  <button onClick={() => setView("consult")} style={{ background: C.dark, color: C.gold, border: "none", padding: "6px 14px", borderRadius: "16px", cursor: "pointer", fontSize: "12px" }}>Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "consult") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
        <div style={{ background: C.dark, borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setView(hasAccess ? "library" : "landing")} style={{ background: "none", border: `1px solid ${C.gold}`, color: C.gold, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>←</button>
          <div style={{ color: C.goldLight, fontSize: "16px" }}>Book a Consultation</div>
        </div>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
          {consultSent ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: "48px", marginBottom: "1rem" }}>✓</div>
              <div style={{ color: C.dark, fontSize: "1.3rem", marginBottom: "1rem" }}>Request Received</div>
              <p style={{ color: "#555", lineHeight: 1.7 }}>Thank you. Your consultation request has been submitted. You will receive a response within 48 hours at the email address provided.</p>
              <button onClick={() => setView(hasAccess ? "library" : "landing")} style={{ marginTop: "2rem", background: C.dark, color: C.gold, border: "none", padding: "12px 28px", borderRadius: "24px", cursor: "pointer" }}>Return</button>
            </div>
          ) : (
            <>
              <h1 style={{ color: C.dark, fontSize: "1.5rem", fontWeight: "normal", marginBottom: "0.5rem" }}>Personal Consultation</h1>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7, marginBottom: "2rem" }}>Amin Shabazz Muhammad offers one-on-one consultations by email, phone, and video. All responses are personalized and draw on 30+ years of direct practice experience.</p>

              {/* Pricing Table */}
              <div style={{ background: C.dark, borderRadius: "12px", padding: "1.25rem", marginBottom: "2rem" }}>
                <div style={{ color: C.goldLight, fontSize: "14px", marginBottom: "1rem" }}>Consultation Rates</div>
                {CONSULTATIONS.map(c => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: "13px" }}>
                    <div>
                      <span style={{ color: C.slate }}>{c.label}</span>
                      <span style={{ color: C.muted, marginLeft: "8px" }}>({c.duration})</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ color: C.muted, textDecoration: "line-through", marginRight: "8px" }}>${c.publicPrice}</span>
                      <span style={{ color: C.goldLight, fontWeight: "bold" }}>Member ${c.memberPrice}</span>
                    </div>
                  </div>
                ))}
                <div style={{ color: C.muted, fontSize: "12px", marginTop: "12px" }}>Lifetime members receive one complimentary 30-min consultation. Additional sessions at member rates.</div>
              </div>

              {/* Form */}
              {["name", "email"].map(field => (
                <div key={field} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#444", fontSize: "13px", marginBottom: "6px", textTransform: "capitalize" }}>{field} *</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={consultForm[field]}
                    onChange={e => setConsultForm({ ...consultForm, [field]: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borderLight}`, borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "Georgia, serif" }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#444", fontSize: "13px", marginBottom: "6px" }}>Service *</label>
                <select
                  value={consultForm.service}
                  onChange={e => setConsultForm({ ...consultForm, service: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borderLight}`, borderRadius: "8px", fontSize: "14px", fontFamily: "Georgia, serif" }}
                >
                  <option value="">Select a service...</option>
                  {CONSULTATIONS.map(c => <option key={c.id} value={c.id}>{c.label} — ${hasAccess ? c.memberPrice : c.publicPrice}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", color: "#444", fontSize: "13px", marginBottom: "6px" }}>Your Question or Topic</label>
                <textarea
                  value={consultForm.message}
                  onChange={e => setConsultForm({ ...consultForm, message: e.target.value })}
                  rows={4}
                  style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borderLight}`, borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "Georgia, serif", resize: "vertical" }}
                  placeholder="Briefly describe your situation or what you'd like to discuss..."
                />
              </div>
              <button onClick={handleConsult} style={{ width: "100%", background: C.dark, color: C.gold, border: "none", padding: "14px", borderRadius: "10px", cursor: "pointer", fontSize: "15px" }}>
                Submit Request →
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── LANDING PAGE ─────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>

      {/* Hero */}
      <div style={{ background: C.dark, color: C.slate, padding: "4rem 1.5rem 5rem", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: C.muted, marginBottom: "1rem" }}>
          Celebrating 30+ Years of Fasting
        </div>
        <div style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.gold, fontFamily: "serif", marginBottom: "0.5rem" }}>
          الْحِمِيَةُ الْمُخْلَصِينَ
        </div>
        <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: C.cream, fontWeight: "normal", marginBottom: "1rem" }}>
          Mastery Level Fasting Platform
        </h1>
        <p style={{ maxWidth: "560px", margin: "0 auto 2.5rem", color: C.muted, lineHeight: 1.8, fontSize: "15px" }}>
          Two books. One course. A monthly community fast. Personal consultations. All in one place.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setView("paywall")} style={{ background: C.gold, color: C.dark, border: "none", padding: "14px 32px", borderRadius: "30px", cursor: "pointer", fontSize: "15px", fontWeight: "bold" }}>
            Access the Platform →
          </button>
          <button onClick={() => setView("consult")} style={{ background: "transparent", color: C.gold, border: `1px solid ${C.gold}`, padding: "14px 32px", borderRadius: "30px", cursor: "pointer", fontSize: "15px" }}>
            Book a Consultation
          </button>
        </div>
      </div>

      {/* What's Inside */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h2 style={{ textAlign: "center", color: C.dark, fontWeight: "normal", fontSize: "1.5rem", marginBottom: "3rem" }}>What's Inside</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {[
            { icon: "📖", title: "Two Books", desc: "The Mukhlasin Diet 4th Edition and Mastery Level Fasting — full text, chapter by chapter." },
            { icon: "▶", title: "Read Aloud", desc: "Every chapter can be read aloud to you by your device. Listen while you cook, drive, or rest." },
            { icon: "🎓", title: "Complete Course", desc: "25 chapters of video-style course content with slides, Q&A, and Master of Fasting." },
            { icon: "🌙", title: "Monthly Community Fast", desc: "Join the 72-hour fast every first Friday–Sunday. Share your experience. Grow together." },
            { icon: "📝", title: "Author Teachings", desc: "Articles and reflections from Amin Shabazz Muhammad, published through the platform." },
            { icon: "📞", title: "Personal Consultations", desc: "One-on-one email, phone, or video sessions with the author. Members receive discounted rates." },
          ].map(item => (
            <div key={item.title} style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "28px", marginBottom: "0.75rem" }}>{item.icon}</div>
              <div style={{ color: C.dark, fontWeight: "bold", marginBottom: "6px" }}>{item.title}</div>
              <div style={{ color: "#666", fontSize: "13px", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <h2 style={{ textAlign: "center", color: C.dark, fontWeight: "normal", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Choose Your Path</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginBottom: "2.5rem" }}>Every entry point. Every budget. One discipline.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          {TIERS.map(tier => (
            <div key={tier.id} style={{ background: tier.highlight ? C.dark : C.white, border: `2px solid ${tier.highlight ? C.gold : C.borderLight}`, borderRadius: "14px", padding: "1.5rem", position: "relative", boxShadow: tier.highlight ? "0 4px 20px rgba(138,122,90,0.2)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
              {tier.badge && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: C.gold, color: C.dark, padding: "3px 14px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold", whiteSpace: "nowrap" }}>{tier.badge}</div>}
              <div style={{ color: tier.highlight ? C.goldLight : C.dark, fontWeight: "bold", fontSize: "15px", marginBottom: "4px" }}>{tier.name}</div>
              <div style={{ color: tier.highlight ? C.gold : C.gold, fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2px" }}>{tier.price}</div>
              <div style={{ color: tier.highlight ? C.muted : "#888", fontSize: "12px", marginBottom: "1.25rem" }}>{tier.altPrice}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem" }}>
                {tier.features.map(f => (
                  <li key={f} style={{ color: tier.highlight ? C.slate : "#444", fontSize: "13px", lineHeight: 1.6, marginBottom: "6px", paddingLeft: "18px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: C.gold }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={tier.stripe.startsWith("http") ? tier.stripe : "#"} onClick={e => { if (!tier.stripe.startsWith("http")) { e.preventDefault(); setView("paywall"); } }} style={{ display: "block", textAlign: "center", background: tier.highlight ? C.gold : C.dark, color: tier.highlight ? C.dark : C.gold, padding: "11px", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>
                {tier.oneTime ? "Enroll Now" : "Start Free Month →"}
              </a>
            </div>
          ))}
        </div>

        {/* Author */}
        <div style={{ background: C.dark, borderRadius: "16px", padding: "2.5rem", textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1rem" }}>About the Author</div>
          <h2 style={{ color: C.goldLight, fontWeight: "normal", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Amin Shabazz Muhammad</h2>
          <p style={{ color: C.slate, lineHeight: 1.9, maxWidth: "620px", margin: "0 auto 1.5rem", fontSize: "14px" }}>{BIO}</p>
        </div>

        {/* Monthly Fast */}
        <div style={{ background: "#0d0b08", border: `1px solid ${C.gold}`, borderRadius: "14px", padding: "2rem", textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "32px", marginBottom: "1rem" }}>🌙</div>
          <h2 style={{ color: C.goldLight, fontWeight: "normal", fontSize: "1.3rem", marginBottom: "0.75rem" }}>Monthly Community 72-Hour Fast</h2>
          <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 1.5rem" }}>
            Every first Friday through Sunday of the month, members fast together. Share your experience. Read others'. Grow in community. This is what separates a subscription from a practice.
          </p>
          <button onClick={() => setView("paywall")} style={{ background: C.gold, color: C.dark, border: "none", padding: "12px 28px", borderRadius: "24px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>
            Join the Fast →
          </button>
        </div>

        {/* Footer CTA */}
        <div style={{ textAlign: "center", paddingBottom: "3rem" }}>
          <button onClick={() => setView("consult")} style={{ background: "none", border: `1px solid ${C.borderLight}`, color: "#888", padding: "10px 24px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>
            Book a Consultation
          </button>
          <div style={{ color: C.muted, fontSize: "12px", marginTop: "1.5rem" }}>
            Already enrolled? <span style={{ color: C.gold, cursor: "pointer", textDecoration: "underline" }} onClick={() => setView("paywall")}>Sign in here</span>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {view === "paywall" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
          <div style={{ background: C.dark, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "2.5rem", maxWidth: "420px", width: "100%", position: "relative" }}>
            <button onClick={() => setView("landing")} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: C.muted, fontSize: "20px", cursor: "pointer" }}>×</button>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ color: C.gold, fontSize: "22px", marginBottom: "4px" }}>الْمُخْلَصِينَ</div>
              <div style={{ color: C.cream, fontSize: "1.1rem" }}>Access the Platform</div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEmailSubmit()} style={{ width: "100%", padding: "12px 16px", background: "#1a1612", border: `1px solid ${C.border}`, borderRadius: "8px", color: C.cream, fontSize: "14px", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
            </div>
            <button onClick={handleEmailSubmit} disabled={sending} style={{ width: "100%", background: C.gold, color: C.dark, border: "none", padding: "12px", borderRadius: "8px", cursor: sending ? "wait" : "pointer", fontSize: "14px", fontWeight: "bold", marginBottom: "1rem" }}>
              {sending ? "Sending..." : "Send Magic Link →"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1rem 0" }}>
              <div style={{ flex: 1, height: "1px", background: C.border }} />
              <span style={{ color: C.muted, fontSize: "12px" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: C.border }} />
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
              <input type="text" placeholder="Access code" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && handleCodeSubmit()} style={{ flex: 1, padding: "12px 16px", background: "#1a1612", border: `1px solid ${C.border}`, borderRadius: "8px", color: C.cream, fontSize: "14px", fontFamily: "Georgia, serif" }} />
              <button onClick={handleCodeSubmit} style={{ background: "#1a1612", border: `1px solid ${C.border}`, color: C.gold, padding: "12px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Enter</button>
            </div>
            {msg && <div style={{ color: msg.includes("sent") ? C.green : "#c08080", fontSize: "13px", marginBottom: "1rem", lineHeight: 1.5 }}>{msg}</div>}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.25rem", marginTop: "0.5rem" }}>
              <div style={{ color: C.muted, fontSize: "12px", textAlign: "center", marginBottom: "1rem" }}>Not enrolled yet?</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {TIERS.map(tier => (
                  <a key={tier.id} href={tier.stripe.startsWith("http") ? tier.stripe : "#"} style={{ display: "block", background: "#1a1612", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 8px", textDecoration: "none", textAlign: "center" }}>
                    <div style={{ color: C.goldLight, fontSize: "12px", fontWeight: "bold" }}>{tier.name}{tier.badge ? " " + tier.badge : ""}</div>
                    <div style={{ color: C.gold, fontSize: "13px" }}>{tier.price}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
