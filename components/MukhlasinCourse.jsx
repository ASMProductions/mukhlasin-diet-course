import { useState, useEffect } from "react";

const C = {
  gold: "#8a7a5a", goldLight: "#c8b080",
  dark: "#0a0a0a", cream: "#f5f0e8",
  slate: "#c8c0b0", muted: "#6a6050",
  border: "#2a2520", borderLight: "#e0d8cc",
  green: "#4a7c5e", white: "#ffffff", bg: "#faf8f5",
};

const MUKHLASIN_COVER = "/mukhlasin-cover.jpg";
const MASTERY_COVER = "/mastery-cover.jpg";

const BIO = `Amin Shabazz Muhammad was born and raised in St. Paul, Minnesota. In 1982 he founded Minnesota's first Hip-Hop B-Boy crew and was instrumental in promoting peace in the Twin Cities through culture rather than conflict. A community activist, martial artist, self-taught multi-instrumentalist, singer-songwriter, multi-linguist, and world traveler — he has dedicated his life to the upliftment of his people through knowledge of self. He assisted major recording artist Prince in his pursuit of spiritual and political consciousness, and has instructed many thousands more in the disciplines of martial arts, diet, language, history, culture, and self-knowledge. For over 30 years — now entering his fourth decade of practice — he has lived what others only study. What you see in his face at 57 years old is not a claim. It is a testimony.`;

const PROTECTIVE = [
  { ey:"Important — please read", ti:"This is a spiritual discipline. It is not medical advice.", bo:"What you will learn in this course reflects over thirty years of one man's personal spiritual practice and testimony. It is not a prescription for anyone else. It is not medical advice. It is an invitation to study." },
  { ey:"Medical disclaimer", ti:"Consult a physician before beginning any fasting practice.", bo:"Extended fasting affects the body in significant ways. Before changing your diet substantially — especially if you have existing health conditions — please consult a qualified medical professional. This course does not replace that guidance." },
  { ey:"This course is not suitable for everyone", ti:"Please do not proceed if any of the following apply to you.", list:["Currently pregnant or nursing","Have or have had an eating disorder","Have diabetes or blood sugar conditions","Are under 18 years of age","Have been advised by a doctor not to fast"] },
  { ey:"The only correct starting point", ti:"There is only one correct path of progression.", list:["Begin at one meal a day — mandatory entry point","One meal every two days only after months or years at level one","One meal every three days is advanced — the teacher took decades","There is no shortcut. There is no rush."] },
];

const WELCOME = [
  { ey:"The Mukhlasin Diet — 4th Edition", ar:"الْمُخْلَصِينَ", ti:"The Diet of the Purified Ones", bo:"Celebrating 30+ years of fasting. An ancient discipline practiced for thousands of years. Now available to all." },
  { ey:"Welcome", ti:"Whoever you are — you are welcome here.", bo:"This discipline comes from an ancient spiritual tradition. But its fruits belong to any sincere seeker of health, clarity, and long life." },
  { ey:"The teacher", ti:"I did not invent this discipline.", bo:"I only bear witness to its power." },
  { ey:"The invitation", qt:"What was once a closely guarded secret of the Highest Order of the Ancient Mystery Systems of Asia is now available to any who would desire to benefit from this wisdom.", at:"— Amin Shabazz Muhammad" },
  { ey:"Three sections. Three levels.", ti:"Section I — Spiritual\nSection II — Personal Experience\nSection III — Counteraction", bo:"This book was written in three parts to be studied separately." },
  { ey:"The Mukhlasin Diet — 4th Edition", ti:"Let us begin.", bo:"Section I — Spiritual" },
];

const CHAPTERS = [
  { id:"ch1", sec:"Section I — Spiritual", label:"Chapter I — The Mukhlasin",
    slides:[
      { ey:"Chapter I", ti:"The Mukhlasin — The Purified Ones", bo:"Who are they? Where are they? And what does their diet have to do with your inheritance?" },
      { ey:"Quran 7:42", ti:"We impose not on any soul a duty beyond its scope.", bo:"They are the Owners of the Garden — those who believe and do good. The qualification is discipline, not mystery." },
      { ey:"The prophecy", ti:"Enslaved for four hundred years. In a land not their own.", bo:"Genesis 15:13–15 and Quran 28:44–46. A people raised from the lowest stratum of society — into a Heavenly condition." },
      { ey:"The title given 7 times", ti:"Al-Mukhlasin appears in the Quran exactly seven times.", bo:"Those who have undergone purification and qualification to survive the attack of Iblis. Seven — the number of completeness." },
      { ey:"Bilal and Paradise", ti:"The Prophet heard Bilal's footsteps ahead of him in Paradise.", bo:"Sahih al-Bukhari — a sign that the people from whom Bilal descended would precede the Arabs and call them to follow their path." },
      { ey:"Quran 7:16–17 — Iblis", ti:"I will lie right in the straight path.", bo:"From before them and from behind them. From their right and from their left. All except the Purified Ones." },
      { ey:"Quran 80:38–41", ti:"Faces on that day will be bright, laughing, joyous.", bo:"And faces on that day will have dust on them — darkness covering them. The discipline — or its rejection — is written on the face." },
      { ey:"The fast of Prophet David", ti:"Fast one day. Break one day. There is no better fasting than that.", bo:"Sahih al-Bukhari Vol. 3 — the highest fasting recognized by Prophet Muhammad. The Mukhlasin are called to go further still." },
      { ey:"The purification cycle", ti:"As above, so below. The Earth purifies itself. So do we.", bo:"Both the Earth and the human body are 75% water. As the Earth's water is purified ascending through fire, so is the body purified through the discipline." },
      { refl:true, ey:"Reflection — Chapter I", ti:"Before continuing, sit with this.", bo:'"What does it mean for you personally to claim the title al-Mukhlasin — and does your daily practice reflect what that title requires?"' },
    ],
    qa:[
      { q:"How many times does the title al-Mukhlasin appear in the Holy Quran — and what does the number signify?", a:"Seven times. Seven is the number of completeness. The title refers to those who have undergone a process of purification and qualification that exempts them from the attack of Iblis." },
      { q:"Quran 7:16–17 records Iblis declaring he will attack from every direction. Which group is explicitly exempted?", a:"Al-Mukhlasin — the Purified Ones. Iblis himself acknowledged he has no authority over those who have attained this level of purification through the discipline." },
      { q:"What does Quran 80:38–41 teach about the visible evidence of the dietary practice?", a:"Faces on that day will be bright, laughing, and joyous — while faces that rejected the practice will have dust on them. The discipline — or its rejection — is written on the countenance of the practitioner." },
      { q:"What is the fast of Prophet David — and what level are the Mukhlasin called beyond it?", a:"One day eating, one day fasting — recognized by Prophet Muhammad in Sahih al-Bukhari Vol. 3 as the highest fasting. The Mukhlasin are called further: to one meal every two days, and ultimately one meal every three days." },
      { q:"The purification cycle connects the Earth to the human body. What do they have in common?", a:"Both the Earth and the human body are 75 percent water. As the Earth's water is purified by ascending through atmospheric fire, the human body undergoes the same process through the discipline." },
    ]
  },
  { id:"ch2", sec:"Section I — Spiritual", label:"Chapter II — Ramadan",
    slides:[
      { ey:"Chapter II", ti:"Ramadan", bo:"The month of fire. The prescription written ahead of time." },
      { ey:"Quran 2:183", ar:"يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ", bo:"O you who believe, fasting is prescribed for you, as it was prescribed for those before you, so that you may guard against evil." },
      { ey:"What does 'prescribe' mean?", ti:"To prescribe is to write ahead of time.", bo:"From the Latin praescribere — to direct in writing before the event. The Quran was written fifteen thousand, one hundred years ago. This prescription was written for you before you arrived." },
      { ey:"400 years of missed Ramadans", ti:"The Black former slaves have been on a very long journey.", bo:"400 years × 30 days = 12,000 days — or 32 years of fasting owed. Those who fast outside the lunar month are perfectly within their right to fast 'a like number of other days.'" },
      { ey:"How To Eat To Live — Chapter 16", qt:"I have chosen, for quite a few years, the month of December for my followers to fast as in the month of Ramadan. It serves as a sign that we — the Lost and Found Nation — are the end of all signs pertaining to the pilgrimage and fasting in the month of Ramadan.", at:"— The Most Honorable Elijah Muhammad" },
      { ey:"Who needs the monthly fast", ti:"The monthly fast purifies those at one meal a day.", bo:"It is not emphasized for those who practice one meal every two or three days — because they are in a constant state of purification that prevents toxin accumulation." },
      { ey:"Ramadan — the month of fire", ti:"Fire used to purify.", bo:"Ramadan means 'the month of fire.' The fire is the striving against the horizontal plain of one's own existence — to burn away the dross of carnal impurities and live a truly upright existence." },
      { refl:true, ey:"Reflection — Chapter II", ti:"Before continuing, sit with this.", bo:'"How many months of Ramadan have I missed — and what does the prescription of fasting ask of me specifically, given the journey I have been on?"' },
    ],
    qa:[
      { q:"What does it mean for fasting to be 'prescribed' — and what does the Latin root reveal?", a:"To prescribe comes from Latin praescribere — to direct in writing before the event. The Holy Quran was written fifteen thousand, one hundred years ago. The dietary prescription was written ahead of its fulfillment." },
      { q:"How does the course calculate the fasting owed by the Lost and Found Nation?", a:"400 years of slavery multiplied by 30 days of Ramadan equals 12,000 days — or 32 years of fasting owed. Quran 2:184 states that whoever is sick or on a journey shall fast a like number of other days." },
      { q:"Who is required to take the three-day monthly fast — and who is not, and why?", a:"The three-day monthly fast is prescribed for those at the level of one meal a day. It is not emphasized for those practicing one meal every two or three days, because they are in a constant state of purification." },
      { q:"What does the word Ramadan mean?", a:"Ramadan means the month of fire. The fire is the striving against the horizontal plain of one's existence — to burn away the dross of carnal impurities and live a truly upright existence." },
    ]
  },
  { id:"ch3", sec:"Section I — Spiritual", label:"Chapter III — Perfecting the Science",
    slides:[
      { ey:"Chapter III", ti:"Perfecting the Science of Eating", bo:"We appear not to have had enough living examples of the proper daily practice to establish uniformity." },
      { ey:"The correct meal — in courses", ti:"The meal is taken in courses, like school.", bo:"First: raw organic milk. Second: organic fruits. Third: organic vegetable navy bean soup with whole wheat bread. Optional: small salad, small dessert." },
      { ey:"The first point of deviation", ti:"Chewing gum and snacking between meals destroys the digestive system.", bo:"Chewing gum, mints, sodas, and smoothies activate the salivary amylase and stimulate gastric juices unnecessarily — wearing away the stomach lining." },
      { ey:"The second point of deviation", ti:"Purchasing GMO, processed, or pasteurized foods negates the discipline.", bo:"One may practice the discipline and still suffer declining health because of what is in that meal. Avoid fast foods, frozen meals, GMO fruits, and all pasteurized industrial milk." },
      { ey:"Blood sugar management", ti:"Hot water with lemon and honey — or coffee.", bo:"Water with honey and salts corrects blood sugar and salt levels outside of mealtimes without activating the full digestive process." },
      { ey:"Simple foods are best", qt:"Allah wants to show you in the example that He makes of me, that I have suffered the same afflictions that you have, so that you will not have this as an excuse for your disbelieving.", at:"— How To Eat To Live, Book Two, Chapter Twenty" },
      { refl:true, ey:"Reflection — Chapter III", ti:"Before continuing, sit with this.", bo:'"Are you practicing the discipline correctly — or have you unknowingly introduced deviations that are preventing you from experiencing the true benefits?"' },
    ],
    qa:[
      { q:"What is the correct order of courses for the prescribed meal?", a:"First: raw organic milk. Second: organic fruits. Third: organic navy bean soup with whole wheat bread. Optional: small salad. Optional: small dessert." },
      { q:"What are the two most common points of deviation?", a:"First: chewing gum, mints, sodas or smoothies between meals. Second: purchasing GMO, pasteurized, or processed foods — which negate the benefits of the discipline." },
      { q:"What does the course recommend for managing blood sugar?", a:"Hot water with lemon and honey — or coffee. This corrects blood sugar and salt levels without activating the full digestive process." },
    ]
  },
  { id:"ch4", sec:"Section II — Personal Experience", label:"Chapter IV — Natural Beauty",
    slides:[
      { ey:"Chapter IV", ti:"Our Natural Beauty Appearance", bo:"Quran 83:24 — Thou recognizest in their faces the brightness of bliss. The discipline is written on the face of the practitioner." },
      { ey:"The mirror — December 1993", ti:"A bright pair of glowing eyes in the mirror.", bo:"Unfamiliar. Three days of water only. Skin glowing. Teeth bright. Eyes clear. Features sharp. Looking at himself — for the first time in memory." },
      { ey:"The calendar", ti:"Eight years of smoking addiction — broken in three days without food.", bo:"Each day of discipline marked with an X. The calendar still exists today." },
      { ey:"The Master Teacher", qt:"Beauty appearance is destroyed in us — not just our facial appearance. The most beautiful appearance about us is our characteristics — the way we act and practice our way of life. We achieve the spiritual beauty through practicing the spiritual laws.", at:"— How To Eat To Live, Book One, Chapter 35" },
      { refl:true, ey:"Reflection — Chapter IV", ti:"Before continuing, sit with this.", bo:'"What does my face currently testify about my practice — and what would I like it to say?"' },
    ],
    qa:[
      { q:"What physical changes were observed after the first three-day fast — and what addiction was broken?", a:"Skin glowing, teeth bright, eyes clear and no longer puffy, features well defined and sharp. Eight years of smoking and alcohol addiction were broken in three days without food." },
      { q:"What does the Master Teacher say is the most beautiful appearance?", a:"Not facial — it is our characteristics: the way we act and practice our way of life. We achieve spiritual beauty through practicing the spiritual laws. How To Eat To Live, Book One, Chapter 35." },
    ]
  },
  { id:"ch5", sec:"Section II — Personal Experience", label:"Chapter V — Clarity",
    slides:[
      { ey:"Chapter V", ti:"Clarity", bo:"Middle English — from Latin claritas: glory, divine splendor. The quality of transparency or purity. This is the documented fruit of the discipline." },
      { ey:"At one meal every two days", ti:"Others have commented that I appear otherworldly.", bo:"The mind pierces the veil of matter — seeing into times, circumstances, and events far better than at the carnal level." },
      { ey:"At one meal every three days", ti:"Supreme Balance. Complete harmony.", bo:"Despite external turmoil. The Quickening Spirit comes across the Consciousness. The ego dies off. We begin to turn back the hands of Time." },
      { ey:"The Master Teacher's testimony", qt:"I also tried eating one meal every 72 hours. I felt better than I felt when I was eating one meal every 48 hours. My whole body felt light and my head was clear. I could almost hear insects crawling.", at:"— How To Eat To Live, Book Two, Chapter 10" },
      { refl:true, ey:"Reflection — Chapter V", ti:"Before continuing, sit with this.", bo:'"When have I experienced moments of true mental clarity — and what was my diet like at that time?"' },
    ],
    qa:[
      { q:"How does the course describe the difference in mental clarity between the levels?", a:"At one meal a day the carnal level remains. At one meal every two days the mind pierces the veil of matter. At one meal every three days: supreme balance, complete harmony, the ego dies off, the Quickening Spirit comes across the Consciousness." },
      { q:"What does the Master Teacher personally document?", a:"How To Eat To Live, Book Two, Chapter 10 — I felt better than when eating one meal every 48 hours. My whole body felt light and my head was clear. I could almost hear insects crawling." },
    ]
  },
  { id:"ch6", sec:"Section II — Personal Experience", label:"Chapter VI — Depression",
    slides:[
      { ey:"Chapter VI", ti:"Depression", bo:"A drug-free pathway observed through personal testimony and community practice." },
      { ey:"Animal training science", ti:"The lower brain can be trained to obey the higher brain.", bo:"Through consistent reinforcement of stimuli, the animal brain is trained to obey upon command. The same principle applies to our own instinctive lower animal brain functions." },
      { ey:"Romans 8:6–8", ti:"To be carnally minded is death. To be spiritually minded is life and peace.", bo:"The carnal mind is enmity against God. But if the Spirit of God dwell in you — the Spirit is life because of righteousness." },
      { ey:"At one meal every two days", ti:"I do not suffer depression.", bo:"Though I may be angry — under control. Though I hunger — under control. It is a wonderful feeling to be at peace and in contentment." },
      { ey:"Quran 21:18", ti:"Nay, We hurl the Truth against falsehood, so it knocks out its brains, and lo! it vanishes.", bo:"There is no need for pills to relieve the stresses we encounter in life. The Truth — the discipline — is the remedy." },
      { refl:true, ey:"Reflection — Chapter VI", ti:"Before continuing, sit with this.", bo:'"Have I ever noticed a connection between what I was eating and the state of my emotional life?"' },
    ],
    qa:[
      { q:"How does the discipline train the lower brain?", a:"By building the will to refrain, the lower brain is trained to obey the higher brain — exactly as animal training science demonstrates. This is the foundation of overcoming depression through the discipline." },
      { q:"What does the course identify as the remedy for depression?", a:"The discipline itself. Quran 21:18 — We hurl the Truth against falsehood. The Truth — the practice of the divine dietary law — is the remedy." },
    ]
  },
  { id:"ch7", sec:"Section II — Personal Experience", label:"Chapter VII — Self Talk",
    slides:[
      { ey:"Chapter VII", ti:"Self Talk", bo:"One's inner conversations have a profound effect on development, spirituality, health, and growth." },
      { ey:"Masaru Emoto", ti:"Water exposed to loving words forms brilliant crystal patterns.", bo:"Water exposed to negative thoughts forms incomplete, asymmetrical patterns. The human body is 75% water. What you speak to yourself — you speak to every cell." },
      { ey:"Proverbs 23:7", ti:'"As a man thinketh in his heart, so is he."', bo:"The inner voice is not separate from the body. It is the body." },
      { ey:"The declaration", ti:"I can do whatever I will.", bo:"The impossible becomes reality when the inner voice stops arguing against itself and begins to affirm the discipline." },
      { refl:true, ey:"Reflection — Chapter VII", ti:"Before continuing, sit with this.", bo:'"What does my inner voice say when I attempt to practice discipline — and whose voice is that really?"' },
    ],
    qa:[
      { q:"What does Masaru Emoto's research reveal about self-talk and the human body?", a:"Water exposed to loving words forms brilliant crystal patterns. Water exposed to negative thoughts forms dull patterns. Since the human body is 75 percent water, what you speak to yourself you speak to every cell." },
      { q:"What does the course identify as the most powerful decision a person makes each day?", a:"What they say to themselves in the quiet of their own mind. Proverbs 23:7 — As a man thinketh in his heart, so is he. The inner voice governs the body." },
    ]
  },
  { id:"ch8", sec:"Section II — Personal Experience", label:"Chapter VIII — Forgiveness",
    slides:[
      { ey:"Chapter VIII", ti:"Forgiveness", bo:"Forgiveness is not a feeling. It is a physical process. Without it, the body cannot fully heal." },
      { ey:"The energy of injury", ti:"The energy of injury is retained in the body like a battery retains energy.", bo:"The Chi — the body's energy — is blocked at the site of injury. Without circulation, the tissue begins to decay. To heal, one must let go." },
      { ey:"Quran 9:31", ti:"They take their doctors for lords besides Allah.", bo:"When the root injury is not fully healed — symptoms persist until the death of the patient." },
      { ey:"The true healer", ti:"Healing is faith. And faith is healing.", bo:"The amount of energy required to heal is equal to or greater than the energy of the injury. The higher the discipline, the greater the healing force available." },
      { refl:true, ey:"Reflection — Chapter VIII", ti:"Before continuing, sit with this.", bo:'"Is there an injury — physical, spiritual, or emotional — that I have accepted as permanent?"' },
    ],
    qa:[
      { q:"How does the course explain forgiveness as a physical process?", a:"When injured, the energy is retained in the body. The Chi is blocked at the site, cutting it off from circulation. Without circulation, tissue decays. Forgiveness restores the flow. Healing is faith, and faith is healing." },
      { q:"What does the course teach about the diagnosis of 'permanent injury'?", a:"The diagnosis of permanent creates a condition in the mind that suspends belief and faith. The higher the discipline, the greater the healing force available. Permanent is a diagnosis — not a prophecy." },
    ]
  },
  { id:"ch9to12", sec:"Section II — Personal Experience", label:"Chapters IX–XII — Exercise, Rest, Toxicity, Elimination",
    slides:[
      { ey:"Chapter IX", ti:"Exercise", bo:"Exercise is always about health and life. It is never about vanity or ego. Know your threshold. Balance in all things." },
      { ey:"Chapter X", ti:"Rest", bo:"At one meal every two days — two to three hours of rest per day is sufficient. At one meal every three days — one hour." },
      { ey:"Chapter XI", ti:"The Cumulative Effects of Toxicity and the Correlation to Sin", bo:"Toxins retained by the body manifest as sin, both overtly and subtly. As discipline ascends, the toxins are flushed." },
      { ey:"Chapter XII", ti:"Waste Elimination", bo:"The elimination of waste bears a direct correlation to the degree of one's spirituality. 70% of the body's waste products are eliminated via the lungs." },
      { refl:true, ey:"Reflection — Chapters IX–XII", ti:"Before continuing, sit with this.", bo:'"What behaviors or patterns in my life might be connected to toxicity I have not yet addressed?"' },
    ],
    qa:[
      { q:"What does the course teach about rest requirements at the higher levels?", a:"At one meal every two days: two to three hours per day is sufficient. At one meal every three days: only one hour of lying down is needed." },
      { q:"What is the connection between retained toxins and sin?", a:"Toxins retained at one meal a day manifest as sin — both overtly and subtly. As the discipline ascends, toxins are flushed. Once completely flushed and areas of injury healed, one is free from sin." },
    ]
  },
  { id:"ch13", sec:"Section II — Foods for Good Health and Long Life", label:"Chapter XIII — The Navy Bean",
    slides:[
      { ey:"Chapter XIII", ar:"الفاصوليا البيضاء", ti:"The Navy Bean", bo:"The food prescribed by the Great Mahdi for good health and long life. The favorite food of the Prophet Daniel." },
      { ey:"Quran 5:114", ti:'"O Allah, send down to us food from heaven — an ever-recurring happiness."', bo:"Allah said: Surely I will send it down to you. The food from heaven is prescribed. It is available. It is affordable." },
      { ey:"The two prescribed beans", ti:"The Navy Bean and the Lentil. All others are cattle food.", bo:"The Navy Bean is preferred. The Lentil is permitted. Most other beans are too hard on the human digestive system." },
      { ey:"Heart health", ti:"82% reduction in heart attack risk with higher legume consumption.", bo:"A 25-year study of over 16,000 men across 7 countries. One cup of navy beans provides 63.7% of daily recommended folate intake." },
      { ey:"Correct soaking method", ti:"12 to 30 hours. Until cloudy water and aroma of fermentation.", bo:"Insufficient soaking is the cause of gas. Cook in the soak water — it contains valuable nutrients." },
      { refl:true, ey:"Reflection — Chapter XIII", ti:"Before continuing, sit with this.", bo:'"The food prescribed for good health and long life is affordable and available year-round. What has kept me from making it the foundation of my table?"' },
    ],
    qa:[
      { q:"What are the two prescribed beans — and what does the course teach about all other beans?", a:"The Navy Bean — preferred — and the Lentil — permitted. Most other beans are cattle food: too hard on the human digestive system." },
      { q:"What is the correct procedure for soaking navy beans?", a:"Soak a minimum of 12 hours — ideally up to 30 hours at room temperature. Ready when the water is cloudy and there is an aroma of fermentation. Cook in the soak water." },
      { q:"What does the 25-year study conclude?", a:"A 25-year study of over 16,000 men across seven countries found that higher legume consumption was associated with an 82 percent reduction in heart attack risk." },
    ]
  },
  { id:"ch14", sec:"Section II — Foods for Good Health and Long Life", label:"Chapter XIV — Milk & Honey",
    slides:[
      { ey:"Chapter XIV", ti:"Milk & Honey", bo:"Referenced across Exodus, Leviticus, Deuteronomy, Joshua, the Quran, and the Hadith. A daily practice — not a distant reward." },
      { ey:"Quran 16:66 and 47:15", ti:"Rivers of milk whereof the taste changes not.", bo:"Pure milk — from between the feces and the blood — agreeable to the drinkers. In the Garden: rivers of milk and rivers of honey clarified." },
      { ey:"Dr. J.R. Crewe — Mayo Foundation, 1929", qt:"The results obtained in various types of disease have been so uniformly excellent that one's conception of disease and its alleviation is necessarily changed. The chief fault of the treatment is that it is too simple.", at:"— Dr. J.R. Crewe, Mayo Foundation" },
      { ey:"The milk protocol", ti:"Milk first. Always milk first.", bo:"As the highest value food, raw milk is taken first before any other food. It activates and flushes the digestion. Milk has a rapid transit time — 6 hours to elimination." },
      { refl:true, ey:"Reflection — Chapter XIV", ti:"Before continuing, sit with this.", bo:'"What has been taken from our diet that was once considered the most perfect food on Earth — and who benefited from its removal?"' },
    ],
    qa:[
      { q:"What did Dr. J.R. Crewe document about raw milk in 1929?", a:"Dr. Crewe documented 15 years of treating patients with raw milk as the primary remedy with uniformly excellent results. Conditions treated included tuberculosis, cardiovascular disease, hypertension, obesity, cancer, and diabetes." },
      { q:"What is the correct order for taking milk at a meal?", a:"Milk must always be taken first — before any other food. It activates and flushes the digestion. After sufficient milk, the desire for other food is greatly reduced." },
    ]
  },
  { id:"ch15to17", sec:"Section II — Foods for Good Health and Long Life", label:"Chapters XV–XVII — Bread, Fruits, Coffee",
    slides:[
      { ey:"Chapter XV", ti:"Our Daily Bread", bo:"Bread is the Staff of Life. Let us pool our resources to cultivate Our Daily Bread." },
      { ey:"Whole Wheat Bread Recipe", ti:"Muhammad Farms Whole Wheat Flour.", bo:"3½ cups whole wheat flour · 1 packet active dry yeast · ¼ cup honey or molasses · ¼ cup milk · Bake at 350°F for 40 minutes.\nRecipe by Lisa Muhammad." },
      { ey:"Chapter XVI", ti:"Fruit & Vegetable Nutritional Facts", bo:"When we eat fruit, we are eating the energy of the frequency of Sunlight on which each fruit was nurtured." },
      { ey:"Vegetables", ti:"Virtually all vegetables are good — with exceptions.", bo:"No collard greens · No kale · No sweet potatoes · No white potatoes · No black-eyed peas or field peas · Garlic and onion — as much as you like." },
      { ey:"Chapter XVII", ti:"Coffee", bo:"The only drink prescribed for outside the meal, besides water. The oils in coffee contain the only vegetable lecithin available for use in the human body." },
      { refl:true, ey:"Reflection — Chapters XV–XVII", ti:"Before continuing, sit with this.", bo:'"The prescription is simple: navy beans, bread, raw milk, organic fruit, and coffee. What complexity have you added that may be working against your health?"' },
    ],
    qa:[
      { q:"Which specific vegetables should not be eaten — and what is the historical reason given?", a:"No collard greens, no kale, no sweet potatoes, no white potatoes, no black-eyed peas, no field peas. These were cheap slave foods used to feed the enslaved for labor capacity — not for long life." },
      { q:"What does the course teach about coffee?", a:"Coffee was prescribed as the only drink to take outside the meal, besides water. The oils in coffee contain the only vegetable lecithin available for use in the human body." },
    ]
  },
  { id:"ch18to19", sec:"Section III — Counteraction", label:"Chapters XVIII–XIX — Life Extension & Calorie Restriction",
    slides:[
      { ey:"Section III", ti:"Counteraction", bo:"The war via food and medicine is very old and must be learned, taught, and disseminated accurately." },
      { ey:"Chapter XVIII — Li Qing Yuen", ti:"Born 1677. Died May 6, 1933. Age: approximately 256 years.", bo:"His longevity due to exercises practiced regularly for 120 years — and dietary recommendations from a 500-year-old hermit. A vegetarian." },
      { ey:"Chapter XIX — The Calorie Restriction Study", ti:"The enemy began studying 'caloric restriction' in 1935.", bo:"Exactly five years after a Wise Traveler began teaching Islam in Detroit in 1930. The studies confirm: dietary restriction leads to longer life." },
      { ey:"Wisconsin primate study — 2009", ti:"80% survival in calorie-restricted monkeys vs. 50% in controls.", bo:"Caloric restriction reduced the incidence of diabetes, cancer, cardiovascular disease, and brain atrophy over 20 years." },
      { refl:true, ey:"Reflection — Chapters XVIII–XIX", ti:"Before continuing, sit with this.", bo:'"The calorie restriction studies achieved partial results with no spiritual practice. What do you have available that the laboratory subjects did not?"' },
    ],
    qa:[
      { q:"Who was Li Qing Yuen and to what did he attribute his longevity?", a:"A Chinese tactical advisor. Imperial records congratulate him on his 150th birthday in 1827. Born 1677, died 1933 — approximately 256 years. He attributed his longevity to exercises practiced every day for 120 years and to dietary recommendations from a 500-year-old hermit." },
      { q:"What did the Wisconsin primate study conclude?", a:"Published in Science, 2009. 80 percent of calorie-restricted animals survived vs 50 percent of controls. Caloric restriction reduced diabetes, cancer, cardiovascular disease, and brain atrophy." },
    ]
  },
  { id:"ch20to24", sec:"Section III — Counteraction", label:"Chapters XX–XXIV — Warfare & Counteraction",
    slides:[
      { ey:"Chapter XX", ti:"Profiteering Through the Ignorance of Dieters", bo:"There is no long-term profit in cures. The residual income is derived from creating life-long patients." },
      { ey:"Chapter XXI", ti:"Response Time and Premature Death", bo:"University of Edinburgh — 5,134 adults followed 15 years. Each standard deviation of slower response time increased likelihood of death by 25%." },
      { ey:"Chapter XXII", ti:"Clandestine Biological Warfare via Hygiene Products", bo:"Most commercial hygiene products break down the immune system, cause cancer, and adversely affect the reproductive systems." },
      { ey:"Chapter XXIII", ti:"Intentional Pork Worm Infestation", bo:"Consumer Reports: 69% of all raw pork samples tested were contaminated with dangerous bacteria. There is no safe level of consumable pork." },
      { ey:"Chapter XXIV — NSSM 200", ti:"Food as a Weapon", bo:"December 10, 1974 — Kissinger's classified 200-page plan. Food identified explicitly as an instrument of national power." },
      { ey:"4th Edition — Pestilence from Heaven", ti:"This is the Time of fulfillment — COVID-19.", bo:"Quran 2:59 — We sent upon the wrongdoers a pestilence from heaven, because they transgressed." },
      { refl:true, ey:"Reflection — Chapters XX–XXIV", ti:"Before continuing, sit with this.", bo:'"What is in my home right now that was put there by someone who profits from my illness? What will I change this week?"' },
    ],
    qa:[
      { q:"What does Quran 2:59 teach — and how does the 4th Edition apply it?", a:"Quran 2:59 — We sent upon the wrongdoers a pestilence from heaven, because they transgressed. The 4th Edition identifies COVID-19 as that pestilence — the Time of fulfillment." },
      { q:"What was NSSM 200?", a:"A classified 200-page study completed December 10, 1974 under Henry Kissinger. Adopted as official US policy in 1975. Food identified explicitly as an instrument of national power." },
      { q:"What three things do most commercial hygiene products have in common?", a:"They break down the immune system. They cause cancer. They adversely affect the reproductive systems." },
    ]
  },
  { id:"ch25", sec:"Section III — Counteraction", label:"Chapter XXV — Owners of Paradise & Conclusion",
    slides:[
      { ey:"Chapter XXV", ti:"The Owners of Paradise", bo:"Heaven does not grow in the sky — it grows beneath our feet. Let us make Heaven on Earth." },
      { ey:"Will Allen — Growing Power, Milwaukee", ti:"A quarter million dollars worth of food on two acres.", bo:"10,000 urbanites fed. Scores employed. Worm composting. Aquaponics. We need 50 million more people growing food." },
      { ey:"Muhammad Farms", ti:"1,556 acres purchased in December 1994 in Bronwood, Georgia.", bo:"Through the Three Year Economic Saving Program. The Economic Blueprint of the Most Honorable Elijah Muhammad." },
      { ey:"Conclusion", qt:"IT IS NOT so much what you eat when you begin eating one meal every day, or every two or three days, it is just that you do not eat foods that are against your health... He prescribed for us, dry navy beans, bread and milk.", at:"— How To Eat To Live, Book Two, Chapter 10" },
      { ey:"As salaam alaikum", ti:"Peace be upon you.", bo:"May Allah bless you with the Light of His Understanding. The discipline is ancient. The path is clear. Begin.\n\n— Amin Shabazz Muhammad" },
    ],
    qa:[
      { q:"What practical steps does the course prescribe for building Heaven on Earth?", a:"Cultivate Our Daily Bread — pool resources to acquire land and grow wheat. Support Muhammad Farms and the Three Year Economic Saving Program. Practice urban agriculture. Bring the knowledge to youth and in schools." },
      { q:"What is the closing prescription of the course?", a:"Dry navy beans, bread, and milk. It is not so much what you eat when you begin — it is just that you do not eat foods that are against your health. — How To Eat To Live, Book Two, Chapter 10." },
    ]
  },
];

const BOOKS = [
  {
    id: "mukhlasin", cover: MUKHLASIN_COVER,
    title: "The Mukhlasin Diet", subtitle: "Al-Himiyat Al-Mukhlasin — 4th Edition",
    arabic: "الْحِمِيَةُ الْمُخْلَصِينَ", year: "2022",
    tagline: "Celebrating 30+ years of Fasting",
    description: "The foundational text of the Mukhlasin discipline — drawing on the Quran, Bible, Hadith, ancient Kemetic tradition, medical studies, and atmospheric science.",
    chapters: [
      { id: 1, title: "Instruction", content: "This book is not merely a dietary guide. It is a witness account of a discipline practiced for thousands of years — one that purifies the mind, body, and spirit of the practitioner.\n\nThe Most Honorable Elijah Muhammad wrote in How To Eat To Live that we should eat once per day, or once every two to three days. These are not suggestions. They are prescriptions for a long and healthy life, drawn from divine revelation and confirmed by over thirty years of personal practice.\n\nWhat you hold in your hands is not theory. It is testimony.\n\nI did not invent this discipline. I only bear witness to its power.\n\nTo the believer who approaches with an open heart: welcome. This is a journey into the highest Self. Let us begin." },
      { id: 2, title: "The Mukhlasin — The Purified Ones", content: "The word Mukhlasin refers to those who have been purified — not merely cleansed of physical impurity, but elevated in consciousness, refined in character, and liberated from the enslavement of appetite.\n\nThe Quran speaks of the Mukhlasin as those who have been selected and drawn near — those whom Satan himself declared he could not lead astray. This is not a metaphor. It is a description of a physiological and spiritual state achieved through the disciplined practice of dietary restriction.\n\nThe Mukhlasin are not born. They are made — through discipline, patience, and an unwavering commitment to the natural laws of creation." },
      { id: 3, title: "Ramadan", content: "Ramadan is the ninth month of the Islamic lunar calendar, observed by Muslims worldwide as a month of fasting, prayer, reflection, and community.\n\nBut the significance of Ramadan extends far beyond religious observance. It is, at its core, a month-long training in the discipline of appetite control.\n\nThe Mukhlasin Diet uses Ramadan not as an endpoint but as a beginning — a gateway into a deeper and more sustained practice of dietary discipline.\n\nRamadan is not the ceiling. It is the floor." },
      { id: 4, title: "Personal Experiences", content: "I have been asked many times how I came to this practice. The answer is not a pleasant one, but it is an honest one.\n\nI was dying.\n\nAt nineteen years old, my health was ruined. I had broken my leg repeatedly. The pain was diagnosed as Osteoid Osteoma — an extremely painful bone tumor.\n\nThirty years later, I look and feel younger than those who are ten to twenty years my junior. This is written to humbly demonstrate the power of the Will." },
      { id: 5, title: "Our Natural Beauty Appearance", content: "The discipline of the Mukhlasin Diet produces a visible and unmistakable effect upon the physical appearance of the practitioner. This is not cosmetic. It is biological.\n\nWhen the body is freed from the constant labor of processing excess food, it redirects its energy toward cellular repair, lymphatic cleansing, and the elimination of toxins. The result is what has been called The Glow.\n\nPrince once said of me that I always looked like I was standing under a spotlight. He saw the Glow. He was so inspired by it that he became a vegan." },
      { id: 6, title: "Clarity", content: "One of the most consistent and immediate benefits reported by practitioners of the Mukhlasin Diet is a profound and unmistakable clarity of mind.\n\nI have described this as the mind becoming FAST — not merely quick in thought, but rapid in discernment, swift in perception, and clear in judgment.\n\nClarity is not a side effect of the Mukhlasin Diet. It is one of its primary gifts." },
      { id: 7, title: "Depression", content: "Depression is one of the most prevalent and debilitating conditions in the modern world. It is also one of the most misunderstood.\n\nThe Mukhlasin Diet takes a fundamentally different view. Depression, from the perspective of this discipline, is largely a consequence of toxicity — the accumulation of toxic substances in the body and mind.\n\nWhen the body is engaged in the continuous process of eliminating these toxins through fasting, the fog of depression begins to lift." },
      { id: 8, title: "Self Talk", content: "The quality of our inner dialogue determines the quality of our life. This is not a motivational platitude. It is a physiological fact.\n\nThe practice of the Mukhlasin Diet is, among other things, a practice of mastering the inner voice. The discipline of refusing food when the appetite demands it trains the practitioner to subordinate impulse to intention.\n\nThe practitioner who has learned to tell the stomach 'not yet' has also learned to tell the mind 'not that thought.'" },
      { id: 9, title: "Forgiveness", content: "No discipline of the spirit can reach its fullest expression without the practice of forgiveness.\n\nUnforgiveness produces a chronic state of stress in the body that undermines every other effort at self-improvement. The toxicity of unforgiveness is as real and as harmful as the toxicity of processed food.\n\nForgiveness does not mean condoning what was done. It means releasing the toxin of resentment from your own system." },
      { id: 10, title: "Exercise", content: "Exercise is an essential component of the Mukhlasin lifestyle, but it must be understood in its proper context.\n\nWhen the diet is properly disciplined, the body's natural tendency toward health and vitality expresses itself naturally. At One Meal A Day, moderate exercise is appropriate and beneficial. Walking, swimming, yoga, and martial arts are particularly well-suited to the practitioner's lifestyle." },
      { id: 11, title: "Rest", content: "Rest is not the absence of activity. It is an active and essential component of the Mukhlasin practice.\n\nPractitioners consistently report changes in their sleep patterns as they progress. At One Meal A Day, sleep tends to deepen and become more restorative. Many practitioners find that they require less sleep — not because they are sleeping poorly, but because the quality of their sleep has increased significantly.\n\nHonor your rest. It is not laziness. It is preparation." },
      { id: 12, title: "Cumulative Effects of Toxicity", content: "The ancient teachers understood something that modern medicine is only beginning to rediscover: the accumulation of toxins in the body is not merely a physical phenomenon. It is a spiritual one.\n\nAs the body becomes lighter and cleaner through the discipline of restricted eating, the spirit becomes correspondingly clearer and more luminous.\n\nThis is the cumulative effect of the practice: not merely a healthier body, but a more refined and elevated human being." },
      { id: 13, title: "Waste Elimination", content: "The efficient elimination of waste is among the most important — and most neglected — aspects of human health.\n\nThe practice of One Meal A Day dramatically improves the efficiency of waste elimination. During extended fasting periods, the body enters a state of deep cellular cleansing — a process of autophagy recognized with the 2016 Nobel Prize in Physiology or Medicine.\n\nThe ancient practitioners knew what modern science is now confirming: the empty vessel cleanses itself." },
    ]
  },
  {
    id: "mastery", cover: MASTERY_COVER,
    title: "Mastery Level Fasting", subtitle: "50 years old with 30 years of experience",
    arabic: "", year: "2019",
    tagline: "Intermittent Fasting · Caloric Restriction · OMAD · OME2-3D",
    description: "A step-by-step guide through the ascending levels of fasting discipline — from Intermittent Fasting through One Meal Every Three Days. Written from 30 years of personal practice.",
    chapters: [
      { id: 1, title: "Defining Fasting", content: `A great part of undertaking any form of discipline is clear definition. For a student may have a predetermined idea of a thing, that may (or may not) be correct. Any person that desires to know a given subject, should first take a moment to understand the terms that will be used in that study. A single word can have many definitions. If a student applies an incorrect definition to a term, they will form an understanding on a completely wrong idea of that study. And thus, their application of the formula will produce completely “unintended” results.

It may be surmised that one reading this study intends to practice the various forms of disciplines taught in this book. Whatever the motives of the individual may be, my desire is to give a CLEAR understanding to the reader. I will say that as the reader progresses in their practice of disciplines, they will gain greater and deeper incite into the intentions and the MIND of the writer. The greatest desire of any Teacher is the success of the student. If we are to gain the benefit of one who demonstrates high proficiency in a discipline, we should first learn to understand the perspective from which one speaks.

With this, let us familiarize ourselves with some terms. These are the main definitions of the words that we will concern ourselves with. Fast; means to move or produce at a high rate of speed. Speed is calculated as a measurement of Time. Intermittent; means occurring at irregular intervals; not continuous or steady. It is a break in an established routine. Caloric Restriction; means to impose a limit on nutrition, or to control diametrical activity of a being, by withholding food. OMAD (One Meal A Day); means to eat one meal within a 24 hour period of time, with NOTHING between meals but water or coffee.

OME2D (One Meal Every Two Days); means to eat one meal within a 48 hour period of time, with NOTHING between meals but water or coffee. OME3D (One Meal Every Three Days); means to eat one meal within a 72 hour period of time, with NOTHING between meals but water or coffee. There is no human being that has good health & longevity in irregular, and unregulated eating habits. The diet of all that live long and healthy lives is regulated to a continuous regimen. To understand the thinking of these who coined the terminologies of fasting regimens like “Caloric Restriction,” “Intermittent Fasting, & “One Meal A Day” (OMAD), we must look into their perspective on the medical trials they based their understandings and observations upon.

This means that the doctors (who are likely to have had unregulated dietary practices themselves) performed animal testing to note the health and longevity of animals in captivity, under their studies. They noted that restriction of calories, in conjunction with intervals of time, produced a variety of results. Although science was well aware of the existence of Masters in the East, who could have answered their questions on the effect of such practice with humans (without animal trials), we don’t often find public references to their input upon the scientific finding of US funded studies.

This omission of data sources is further compounded by the daily conflicting health study reports that are constantly released and updated. Those who value the validity and efficacy of these scientific reports, may want to begin weighing them against the longevity of those who provide(d) that data. The terms that the scientists coined are based upon their studies of restricting food to animals and recording their findings in medical and scientific journals. The practice of restriction was further compounded by giving food to animals intermittently.

The term “intermittent” is possibly a more easily acceptable term, as the undisciplined dietary practices of the Western societies are very far removed from any form of disciplined life. In fact, Western cultures are extremely disciplined in being undisciplined. Therefore, an intermittent approach may be considered as the first step towards understanding the principles of human regulatory digestive cycles. “Every nation, culture, religion and people has a standard of purity. But when the process of purification is referenced, the term becomes lost in vague euphemisms.

The language becomes weak in describing exactly how one is to become purified, and remain in a perpetual state of purity. This world seems to glory in the vain attempt (that is feigned from the start). A false effort to achieve the seemingly unobtainable is dismissed with statements like, “I’m only human…” and, “No one is perfect”. It is time to take a hard look into the science of self-purification; of self-mastery. It is time that such concepts are demystified and reduced to an easy to understand, simplified and teachable format”."` },
      { id: 2, title: "Caloric Restriction", content: `US funded Studies into Caloric Restriction on Rhesus Macaque monkeys began circa 1935, with the goal of scientifically understanding how the application affects humans. The US funded studies had multiple motives for application. One goal was to extract the medical health benefits of increased health and longevity, without suffering the hard effects of hunger. The other was to understand the implications of applying it within the contexts of Social Engineering. Once we understand that over 80 years has been devoted to this science in America, we can apply our understanding the policies of food production, distribution and administration.

The main business goal of food production, distribution and administration is profit. Food Industries must be competitive globally to survive. To accomplish this goal, the nutritional value of foods has diminished. The nutritional value of foods today, is not the same as it was, prior to the mass industrialization of food industries. As a result, not only is there less nutrition in foods but packaging sizes have increased; while the contents have decreased. Foods prices have simultaneously increased with the decline in quality of the foods.

Good health now requires a highly informed and proactive population. Our information must be accompanied by practical application. Dr. Alim Muhammad wrote, “Calorie Restriction Extends Life The life-extending effect of reduced calorie diets was reported in 1935 along with the observation that CR stunted body size.[1] Since then, CR has been proven to extend the average and maximum life span for many species including yeasts, worms, mice, rats, etc. Animal experiments on calorie restriction after maturity indicate that adult-onset CR also increases longevity.[2] Experimental animals have the advantage that they are kept in sanitary cages, given regular meals, and not subjected to stress, infectious diseases, accidents, and predation that would reduce their life span in the wild.

“Many mechanisms have been proposed to try to explain why CR increases life span. Studies at the molecular level have shown that several genes in the sirtuin class, including SIRT1, SIRT3, and SIRT4, create enzymes that increase the activity of the mitochondria and slow the cell's aging process.[21] Many years of study and experimentation will be required to elucidate the complex molecular processes that result in longevity and, also perhaps, to develop nutritional supplements that extend lifespan without having to suffer the rigors of hunger. There has not been sufficient research to determine if humans on calorie restricted diets will live longer, but preliminary observations of the physiological changes caused by CR indicate that life-extending effects will probably be observable in humans also.[3] However, a 25-year study in rhesus monkeys by the National Institute on Aging (NIA) [29] suggests that genetics and dietary composition matter more for longevity than the degree of calorie restriction for primates.

The NIA study found that the monkeys on the lower calorie diet did not live longer, but had less incidence of cancer”. ~ The purpose of the studies was to see the effects on reduction of various nutrients in foods to isolate what was observed to benefit the health and longevity of primates. “PMID NIH, NLM, PubMed access to MEDLINE citations Dietary Protocol … pelleted, semi-purifed diet (Teklad, Madison, WI), which contains 15% lactalbumin, 10% corn oil and approximately 65% carbohydrate in the form of sucrose and corn starch (Table 1). The macronutrient composition of the restricted and control diets is similar, but the restricted diet is supplemented with an additional 30% of the vitamin and mineral content to ensure that the groups, on average, consume a similar amount of micronutrients.6 2003: Obesity and Diabetes Research Center, Department of Physiology, School of Medicine, University of Maryland7 Mortality and morbidity in laboratory-maintained Rhesus monkeys and effects of long-term dietary restriction.

Bodkin NL, Alexander TM, Ortmeyer HK, Johnson E, Hansen BC”. ~ Lactalbumin is a blood protein found in milk. The composition of the food pellets did not increase longevity to rhesus macaques (macaca mulatta), but it was successful in reducing cancers. When we study the past 80 years of data, and compare it to today’s population, we can determine that the nutritional value of the foods has also been produced with a scientific composition of what industries have determined is sufficient. The unfortunate consequence of this has resulted in the masses innate need to eat more of these foods to extract sufficient nutrients that satisfy the body’s hunger.

This has resulted in a population of unnaturally obese people. Food portion sizes have increased to meet this need, and this exacerbates and compounds the problem. The effect of this unnaturally produced social engineering is a reduction of longevity, due to prolonged malnutrition. In America, we have been conditioned to think of 3rd World Countries and babies with distended bellies as malnutrition. But a distended belly from eating nutrient deficient foods that were grown using pesticides that cause the stomachs of insects to explode, is actually what we are experiencing here in the West.

With this as the foundation for our basis for reviewing the diet called “Caloric Restriction”, we can determine the absurdity of further restricting of nutrients in an already nutrient deprived society, as the means by which Malnutrition Obesity can be alleviated. Although the concept likely has its root in the desire to understand how fasting affects animals and inevitably people, the very basis of the concept (like the term itself) is devoid. Every creature first takes sufficient nutrition to sustain the body during periods without food.

Suffering lack of adequate nutrition is not the basis of a healthy diet for longevity.` },
      { id: 3, title: "Intermittent Fasting", content: `The definition of the word “intermittent” is given as “… occurring at irregular intervals; not continuous or steady. It is a break in an established routine”. The term in and of itself is a misnomer, which (as understood by the public) is actually the antonym of the word. The term developed as an offshoot of US funded studies into what was term “Caloric restriction”. The goal of Intermittent Fasting in Western culture appears to be primarily weight loss and a more attractive appearance. The population has become obese and unhealthy, and increasingly unable to correlate their dietary practices to their health conditions.

This means that the masses cannot understand that how they ate, affects how they feel. But a growing number of people are realizing that medicinal and surgical side-effects may not be the answer to the good health and long life that they desire. Fasting as a principle of life is now being marketed as a “new” solution to the growing health problems of Western populations. However, in every society on Earth from which fasting principles are derived, it is taught and practice as a component of that group’s spirituality.

The West is generally considered to be devoid of spirituality, and I am old enough to recall when Eastern Medicines and Practices were literally scoffed at and mocked by Western doctors and scientists. We are now seeing a reversal of that practice, and therefore may also wish to reassess Western views of Eastern spirituality. The appropriation of a single aspect of any Holistic practice (thinking that it will result in the intended Holistic benefit) is not the Path to Success in any realm. “The East” is not a singular culture, religion, race, creed or color.

However, all Civilization and life on the Planet Earth originates from that source. And time proven principles should be studied with the proper regard. All “Light” begins in the East and spreads Westward; whether we are referring to the literal Sun, or we refer to religion and philosophy. The proper approach to any discipline is the Path to Success in every realm. Intermittent Fasting to the lay person, equivocates to “not eating breakfast” and gorging themselves from lunch to bedtime. The Intermittence really is the beginning stage of a regulated and disciplined dietary regimen.

The term is used to “trick” the believer into practicing what the culture teaches cannot be accomplished by mortals. The society teaches a tradition of complete lack of discipline. As a result, the population finds their health declining at a much faster pace than they should. And so, “Intermittent” or unregulated eating, appears to trick the believer out of the “regular” dietary practices of an unregulated society. [You may want to read that phrase again.] In reality Intermittent Fasting is the beginning stage of what becomes a “Continuous Fasting” regimen.

It is “intermittent," to a person who is acclimated to eating three or more meals per day. And so, skipping BREAK-FAST, staggers the diet that most eaters are accustomed to. Rather than breaking the fast (which was really only sleeping, and not intentional fasting) the new practitioner “breaks” the routine of eating when they rise from sleep. In Western culture, we are taught from birth that“ breakfast is the most important meal of the day”. The question then becomes “… Who is the breaking of a fast most important to”?

For a discipline to be readily acceptable to the masses, it must appear to be easily obtainable. And so, once the masses of Westerners were disciplined towards the practice of eating 5 to 7 times per day (beginning circa skipping breakfast became a Herculean accomplishment. When “breakfast” is delayed past noon, it becomes “lunch”. Then breakfast, lunch and dinner are crammed into a time slot before sleeping; which becomes detrimental in an of itself. The practice can be taught in a simple word. But today’s highly informed and technical readers want high-level views of granular details.

They want the ability to quickly dissect and understand information that will give them a deeper perspective into themselves. If a person can understand internal obstacles to their higher Self, they can unlock aspects of Self that really is the stuff of fantasy. Do you want “Intermittence” as a solution to a long-term health problem? Can Intermittence resolve PERSISTENT health problems, longterm? If we apply the term to drug and alcohol abuse, how well does the concept of not drinking alcohol, smoking or taking drugs between certain hours hold up?

How does that resolve longterm addiction and health problems? Today, we must learn to understand that the food truly is a drug, and that all foods (regardless of the quality) contains some degree of toxic poisons that build up in the body systems. These toxins must be removed from the body, for the body to be in good health. And the process by which this is done, is call “Fasting”. As a teen, I drank alcohol, smoked heavily and abused drugs. Learning a disciplined form of eating taught me the method by which (when applied across all addictions) allowed me to break them all, simultaneously.

Fasting allowed me to master nicotine, drug, alcohol and sexual addictions. From my personal experience, regulated fasting builds the will. And so, coming to terms with the concept of “Intermittent Fasting” requires an evaluation of norms. In America, we believe that a people reaching their 60’s should prepare for the senior citizen’s home for convalescent care. Whereas, when I reached the mountain top of the Sukur World Heritage site in Nigeria, I found a 109 year old woman there farming. She complained in her native tongue that her 67 year old son was too lazy to do the farming, so she was doing it herself.

In America, we have whatever food we can dream of at that moment, readily available. In underdeveloped countries, meals take time to gather and prepare with no electricity. The food in America is highly processed and devoid of life, even if it is organically grown, it is likely from soil that was depleted of nutrients. But in other parts of the world, soil cultivation is more easily understood, and relative to living and personal health care. Mount Dalondo, Sukur Nigeria 109 year old woman As the Western diet is exported with the culture, Western maladies are beginning to occur in areas of the world that have adopted non-traditional diets.

Wherever a native people maintain their traditional diets, they maintain their health far better than when their diets are replaced by the Western style of eating.# Amin Shabazz Muhammad in Jimeta Nigeria 2009 Age: 40 101 year old woman Mount Dalondo, Sukur Nigeria ! Where the people live in extreme poverty, “Intermittent Fasting” is involuntary. Children may not know what morning breakfast is, in a home that can only produce one meal per day for its members. Even in America, I often went hungry, if I was unable to afford the cost of a meal at school.

I often had no breakfast, because my family was very poor and could not afford to feed me breakfast at home or school. In under-developed countries, a distended belly is the mark of malnutrition. This is due to the lack of nutrients in the little that one has to eat. Whereas, in America, the distended bellies of the obese are filled with “fillers” that are devoid of nutrition. Therefore, the key to understanding the condition of one’s health does not simply revolve around “skipping breakfast, and pigging out from lunch through dinner”.

The key to understanding personal health is joined to understanding the value of foods, when taken at the proper intervals of time. If understood in its proper context, “Fasting” is a principle in understanding the science of the optimal conditioning of the human body. Everything in existence functions within the confines of time, and cycles of time. The Planet Earth maintains its orbit as the third Planet in the Solar System of 9 Planets; of which the Sun is the 10th. The human body consists of 9 major body systems, of which the 10th is the Mind.

The Planets move at a constant speed of miles per hour. The Earth Revolves on its axis, 23 degrees to the plane of its orbit, every 23 hours, 56 minutes. This constitutes one Earth Day. The Earth completes one revolution in days. All beings on the Planet live within this context of time and time cycles. However, we do not all live the same length of time; nor do we live in equal health. What is the time and time cycle of humans? This is an interesting question, because of its direct relevance to us. Just as it takes Light 500 seconds to reach the Earth from the Sun, it takes approximately 500 seconds for our blood to completely cycle throughout our bodies.

The average speed of Thought is over times faster than the speed of Light. Light moves everything within its sphere of influence. Just as Light moves physical objects, Thought shapes physical matter. One writing states, “As a man thinkith, so is he”. When the mind can produce the thought necessary to change the condition of the body, it changes reality. This is a complex way of saying that one must change their way of thinking about a problem they have not solved, if they are to find the solution. [Read again] With this, let us take our first step into understanding the importance of the various forms of “Fasting," as we develop and cultivate our ability to transform our own personal reality.

We can use this simple concept to become an example to others and give hope to those who a prey to the whims of self-indulgence. Although the concept may be a misnomer, we can make “Intermittence” our continuous practice, until we break the cycle of being subject to the nether regions. “Caloric Restriction & Intermittent Fasting” can be viewed as a step towards developing the discipline of OMAD (One Meal A Day). And OMAD can be viewed as the path to the higher degrees of fasting disciplines that lead to true Self Mastery.

The key to any discipline is understanding what is right for an individual at a particular time in their own development. And also, when we find that we have gone too far ahead of a discipline that we have not mastered, we would be wise and humble enough to take a step back in our degree of fasting for our own health benefit and longevity. In America (circa 1990) a change in foods and dietary recommendations occurred. Genetically Modified Organisms (GMOs) were widely distributed and marketed, and doctors were instructed to teach patients that a healthy diet consisted of 5 to 7 meals per day.

The results are evident on the population, in the sharp decline in health and the rise of circulatory and digestive disorders and deaths. Obesity has skyrocketed and childhood disorders are commonplace, that were once in the exclusive realm of the elderly. These 5 to 7 meals consist of Breakfast, Brunch, Lunch, Dinner, Supper, Latenight Snacks, and something in between all of these meals. The only time when the stomach is left to rest from all this work, is when the body is horizontal and the individual is asleep.

However, the body requires gravity to aid in the digestion of foods. And so digestion is suspended until the sleeper awakens and becomes perpendicular. A new meal is immediately introduced to a system that has not even had the necessary time to process the previous meal. The result is constipation and the regurgitation of stomach acids. It is the body’s way of telling the eater, to stop eating until it has had a chance to perform its natural functions. Compounded by eating GMO foods, those who continue this unhealthy practice soon manifest some form of circulatory and digestive related maladies.

Enter the concept of “The Intermittent Fast”. Those who are eating 5 to 7 meals per day, (with snacks in-between these meals) have trained their stomachs into calling for foods at all times of the day and the night. The GMO filler foods are depleted of sustenance, and thus only fill the stomach, but never satisfy the innate craving for the nutrition that the body has been starved from. The stomach (when compared to a wild animal) must be trained into submission. “The animal brain controls our lower functions, and can be trained to obey the higher brain function, much the same as one trains a wild beast.

Wild animals are never tamed, but they can perform as the trainer desires, using a form of rewards and reinforcements”. ~ The first step in breaking this cycle, is to discipline the Will, to establish obedience in the stomach. This requires a significant change in the food buying habits of the consumer. GMO foods, combined with unregulated eating created the condition by literally starving the eater of nutrients and poisoning the eater with pesticides. Thus, one must purchase the very highest quality foods one can afford, prior to the process of breaking the stomach’s addiction to eating at all times of the day and the night.

The very act of purchasing high quality organic food (although more expensive) will give the body the nutrition it craves, and thus make the process easier and the likelihood of success achievable. People often say that their stomach is talking to them. They speak as if the stomach actually has a brain and the ability to speak. This is more true than they may know. The enteric nervous system has been described as a "second brain" for several reasons. The enteric nervous system can operate autonomously.

It normally communicates with the central nervous system (CNS) through the parasympathetic (e.g., via the vagus nerve) and sympathetic (e.g., via the prevertebral ganglia) nervous systems. However, vertebrate studies show that when the vagus nerve is severed, the enteric nervous system continues to function. [SOURCE: Wikipedia] The key to establishing a relationship to the enteric system that begins to obey the voluntary higher brain commands, is to begin systematically breaking the cycle that has been taught to the body. A person eating 5 to 7 meals a day, (with snacks between each meal) should first remove the snacks between meals and replace them with a glass of water.

The stomach cannot use words to communicate with the higher brain; so, it will cause the brain to have “headaches”. The first day is usually the worst. Those who begin this regimen should expect headaches. The headaches will diminish until they disappear completely, after one week. Snacking includes any liquids other than water or coffee that is not mostly milk and sugars. The body cannot distinguish chewing gum or breath mints from an actual meal. “Chewing gum, eating mints or cloves, and drinking sodas, juices, smoothies, etc… activates the salivary amylase and stimulates the production of gastric juices (hydrochloric acid and pepsin) in preparation for the digestion of a meal.

The act of stimulating this process, without actually taking a meal, is harmful to the longevity of the digestive system. Although one may take only one true meal during a twenty-four (24) hour period, the act of placing anything in the mouth to chew on begins the digestive process. “The act of stimulating the digestive system unnecessarily begins to wear away the lining of the stomach and results in premature aging, sickness and untimely demise, due to the stomach’s inability to distinguish false alarms.

Peristalsis on an empty stomach, or after stomach mucus has been exhausted, produces digestive acids and causes a wearing away of the gastric mucosa (lining of the walls of the stomach). This may result in soars that develop into polyps and later into cancers”. ~ After the individual has established one full week without snacking between meals, they should remove breakfast. A good breakfast begins of a glass of room temperature water, and if the person is a coffee drinker, then a cup of coffee that is not mostly milk and sugars.

Coffee is well known to be a hunger suppressant, and it will tide the drinker over until the stomach calls for food at the time that it was next trained to be fed. The stomach considers juices to be a meal and defeats the purpose of removing the meal. (A meal is a meal) to the stomach. It will initiate the process of digestion when nutrition is introduced. So be advised that it is not correct to replace a solid meal with a liquid breakfast; for they are both the same thing to the digestive system, and this is a selfdefeating practice.

The body will require one week to train the stomach into this practice. After one week, the body will not call for a meal at breakfast time. This step should immediately follow the week that snacks are removed from the diet. After the practitioner has successfully completed one full week without snacks or breakfast, the next meal to remove is the mid-morning or lunchtime meal. This meal should also be replaced with a glass of water and a cup of coffee. The coffee will suppress hunger pangs and headaches.

The social aspect s of lunch can easily be navigated by telling associates that you are on a diet (smile). If they insist, return the insistence, that you maintain your diet and ask them not to try to thwart your attempts at good health, before you’ve had the chance to succeed. Training the stomach in to good habits requires disciplined adherence. Once again, it will take one week to establish this discipline of skipping lunch. Immediately following the week without lunch, the next meal to break should be the one eaten before laying down to sleep.

This should be nothing more than a glass of water and no coffee, as drinking coffee late in the day will interrupt the sleep cycles. The body must have proper rest to digest meals. And this too will take one week to establish. Once the student has accomplished the goal of removing snacks, breakfast, lunch and bedtime meals, they will no longer be considered a practitioner of Intermittent Fasting. Their discipline will have taken over one month; and since we know that it takes 21 days to establish a habit, the student will have accomplished this goal.

They will now be a practitioner of One Meal A Day (OMAD), and it will be time to advance into the first stage of mastery at that level.` },
      { id: 4, title: "One Meal A Day (OMAD)", content: `“I am 70 years of age, I have dedicated 55 years of my life to the martial arts and I fight like a young man. I live by four laws, and they are Spiritual Law, Dietary Law, Fitness Law and Skill Law. I eat one meal a day consisting of a vegetarian diet and I train everyday. I have found that these four laws must be given equal time and will aid you in being successful in whatever you do. “~Sijo Steven Muhammad (a.k.a Sanders) “(Ron) Van Clief then reminded Muhammad that (Bruce) Lee said that Muhammad had the fastest hands he6d ever seen.” Life and health require adherence to a diet that is in harmony with the cyclical intervals of our body’s circulation, at all stages of human development and maturity.

This means that, (for us to maintain our health) we must regulate our body in accordance with our ability to process what we eat. The body can only function correctly, when it has sufficient sustenance. This does not refer only to food; it also refers to that nature in which the body is created. When we are outside of the nature of creation, we begin to suffer the effects of rebellion to the laws of nature. An example is to climb to an altitude where there is no oxygen. The natural effect is altitude sickness and, (if not placed into a hyperbaric chamber to recover), death ensues.

If that same person were to jump from such a height into gravity, the natural law of falling from such a height is terminal velocity. Natural laws are taught in every culture. But they are not always taught in relation to Self. The natural laws of Cause & Effect must be thoroughly understood, if one is to become a successful practitioner of the principles that undergird SelfMastery. Although the natural result of correctly practicing the discipline of fasting is an increase in the natural beauty of the practitioner, vanity plays no part in attainment of this degree.

What is the nature of the human body? How far outside of the natural laws are most of the human family? What is the effect of rebellion to natural laws? We should develop the omniscience of Self awareness. But most do not. Selfprolonged and painful descent into demise, could be called “The Suicide Effect”. It has been said that we dig our own graves with our teeth, or “… he couldn’t help himself”. These statements may have different meanings, depending on the perspective. A person must have the will to survive, if they are to overcome.

The will is an innate force of nature. It can be strengthened, much like the physical body is strengthened; by means of certain forms of exercise. The discipline of fasting is the exercise by which the Will is developed. Therefore, the focus of fasting is the cultivation and development of the Will. I once discussed the benefits of teaching fasting and proper diet to patients, with a prominent leading Brain Surgeon at the Mayo Clinic, in Rochester Minnesota. The doctor was leading FDA funded research into the efficacy of drugs that affect the brain.

Her own daughter suffered from brain injuries. She told me that“… a very small portion of the population has Will-Power; for the rest of them, there’s PillPower”. This was an astonishing admission to me, at the time. I do believe that allopathy has its place in the healing process. And I also believe that prevention medicine could be better applied to the population. It is necessary and vital to find the balance between them. The discipline of eating One Meal A Day begins to build the Will to regulate the natural cycles of the digestive system.

The body takes 24 to 72 hours to fully digest one meal. When we eat more than once within a 24 hour period of time, we CAUSE the body to expel the contents of the digestive system. The new meal will literally push the former meals from our body. However, when the digestive system is overburdened, it will expand tissue internally and cause blockages. These blockages force the toxins (poisons) that the body normally expels, into pockets that are formed in the digestive systems. There, the toxic poisons begin to affect the health of the individual.

We literally make ourselves sick. Until the poison is expelled from the body, we remain sick. The body does an amazing job of isolating toxic poisons within. But once the body is overwhelmed, it succumbs to sickness. We can begin to EFFECT longterm improvements in our health, by the establishment of regularity in our diet. This is the formula for internal Cause & Effect. Social, physical, mental and spiritual maturity all occur at different ages and different stages of life. We are socialized into our dietary practices long before mental and spiritual maturity occur.

We are not socialized into the Cause & Effect of diet on digestion and circulation. The lack of understanding of the principles of Cause & Effect upon Self, means that the vast majority of the public are completely ignorant of their own actions. And the public has no knowledge of how to eat to live. When a person lacks knowledge, they can rely upon those who claim to know how to help them. But the proof of scholarship should be more than a document. In many cases, a person with certifications may be in worse condition than the person they are attending.

Theoretical medicine should be applied to Self, (first) before others. Most doctors don’t live any longer than their patients, and many die before their patients. This should be exactly the reverse. But due to the stressful nature of taking on the problems of so many suffering patients, doctors must also learn and practice selfhealing. Many patients are finding that they themselves must be more knowledgeable of their own condition than their doctors, in order to gain the benefits of a doctor’s expertise.

The axiom “Heal Thyself” grows in relevance as we grow in maturity. As we have developed into an allopathic culture, we are also embracing homeopathy as a modern solution. The boom of designer drug and genomic medicines are still experimental. And as the field of genetic experimentation increases speed, there appears to be an equal movement towards natural time-tested solutions. The poor are often left out of the benefits of well-funded studies that precisely target specific health problems of those who can afford better care.

However, the practice in this book is targeted towards all strata of humanity. The poor can benefit from this scientific approach to good health and longevity. The poor can invest in learning this practice, and the rich can learn and help the author to make this writing accessible to the poor. The poor don’t attend medical symposiums. The poor often don’t or won’t read self-improvement based studies. The rich can help to place the information in this book into media platforms that target the poor specifically.

The result of such actions would be the direct alleviation of cases on an already over-burdened and crumbling healthcare industry. With the cost of healthcare skyrocketing (and no end to it in sight), helping the masses of poor to understand their personal role in healthcare becomes a tremendous benefit and responsibility. The axiom, “As above, so below” means that we can never hoard knowledge without suffering the effects of intellectual constipation. For knowledge to be of benefit, it must flow freely.

This means that those who are able, must aid an assist in the spreading of knowledge, to improve the condition of the whole body of society. Up to this point in time, the stomach cannot be replaced. Once it is damaged to an irreparable state, there is no cure. It behooves us to care for our stomach, tenderly and vigilantly. We must love our stomach, and be careful of abusing it. The stomach can be worn away by constant use. The stomach requires rest from it’s function, to heal and recover. The stomach is not infinite; it will wear away.

Putting anything in the mouth, stimulates the salivary amylase and peristalsis of the digestive system to prepare for a meal. Over stimulation is equivalent to keeping an engine running at all times, without proper and sufficient lubrication. The engine soon wears out and breaks down. The stomach is akin to the engine of the body. The stomach digests one meal per day, with the necessary acids and mucosa to perform correctly, without harm. After the digestive juices are depleted, they require time to regenerate.

Digestion on a stomach that has been depleted of the necessary digestive juices, causes irritations, which cause ulcers, which cause polyps, which cause cancers, which cause death. Understanding the significance of caring for the digestive system is vital. We must learn and teach the value of the stomach, and when and how we should eat, to avoid injuring our stomachs. This begins with Self, and extends to our families and loved ones. We establish this practice in our homes, and extend it out into the general society.

It requires a change in norms, because traditions take offense to rejection of norms. But offending traditions should never take precedence over our personal healthcare. We should learn how to cause the least offense to traditions, while gaining the benefits of learning to establish new norms. The general window of 4pm to 6pm is given as the optimal timeframe for meals. Meal times should not vary. The meal time should be adhered to religiously. Variations in meal times will manifest harmful gases on the stomach at the time the stomach has been trained to eat.

Thus, the stomach will call for food at that time. The timeframe of 4pm to 6 pm is given for several reasons. The average workday ends during this time, and yet it is early enough to permit adequate digestion, prior to sleeping. It is a time when the family is generally able to gather to partake of the same meal, together. Therefore, if the family is able to practice a healthy diet together, it promotes the general atmosphere that is conducive to success. [NOTE: Children are completely excluded from One Meal A Day and should not even attempt to begin the practice of this discipline until they are at the very least 16 years old.

Even at this age, they should only go to the extent of their ability and eat when they need to. They should never be forced to adhere to this stringency. The very best way to teach children is by correctly practicing it yourself. For they will watch you, and naturally attempt to emulate you. However, as the guardian of their wellbeing, be wise and compassionate. Never allow children to do more than what is safe for their development. They should be brought up gradually. They should only begin to develop into the practice upon reaching physical maturity.] A Vegetarian Diet is best, as there is no meat that is good for the longterm health of the eater.

Meat is very hard to digest, and as we have noted in previous paragraphs, the stomach should be guarded and treated with tenderness and care. This Western culture attaches pride to having the ability to eat any and everything. This is the nature of a scavenger; a wild beast. This is not the nature of the most highly developed species. We see taste judged by the Scoville scale (a measure of the concentration of the chemical compound capsaicin), and salts. Many people eat their meat raw, and glory in the taste of blood; then wonder at the appearance of cancer, and how their lives are cut short.

The human body is no respecter of persons, nor vanities. It you treat your body right, it will carry you for a very long time. It will carry you through hardships and deprivations. It will carry you through the trauma of injury. But it does have a limit. We should not be ones who like to test that limit; for we will soon find it. and when we do, there is no going back. So, eat the best quality of organic vegetarian foods that you can afford. Learn to prepare your meals according to health; not cooking all of the nutrition out of your foods.

A Raw Diet is not recommended either. Some salads are good. But do not make a diet of Raw vegetables only. Fruit (however) are healthiest when eaten uncooked and naturally raw. Learn to prepare your juices to take with meals, or as a meal. “It is well known that there is no time in the life of practically any mammal, but especially of the human, when the body is so beautiful and perfect as during the period when milk is the only food. It will be admitted that there is no period in life when the body is so perfect as in infancy, the infant being fed on milk from a healthy mother.”~ Real Milk Cures Many Diseases by J.

R. Crewe, MD The debates over the efficacy of drinking milk is an interesting one. I am not an advocate of milk from GMO’s (passed off as “cows”). I am not an advocate of milk from industrial sources. I do not advocate cancer causing milk substitutes, like soy products. I have personally found that lactose intolerance coincided with the manufacture and distribution of GMO dairy products. I prefer Raw Milk from local small dairy farms. I recall the time before the manufacture of GMO products. I recall what food was like in America, prior to GMO foods.

I have travelled abroad and tasted foods recently, that (although sold in America as Organic) lack any comparison in taste, nutrition and quality to what I had during the same time period abroad. When we first begin, it is not as important “what” we eat, as WHEN we eat. The structure of one’s personal diet can be developed over time. But it is important to remember that foods should be eaten in the order of the value it has to the body (highest value first). Also, structure meals in accord with the body’s ability to digest each meal course (easiest to digest first).

This general guideline can be applied in a manner that is more relaxed and less stringent to the eater. What does the value of foods look like? Below is an example of a six course meal. Example: 1st Course is organic Milk 2nd Course is organic Fruits 3rd Course is organic Soup & Bread 4th Course is a organic Vegetable Salad 5th Course is a organic Main Course Dish 6th Course is organic Dessert “We call a person who has no sickness in their body ‘Happy’…” TMHEM Eat in courses; like you study in courses in school.

All of your curriculum are separated and taught in different classes at separate times. One Meal A Day is taken in a similar fashion. The meal is not scarfed down in a hungry rush. Take milk to start the digestive processes and flush the previous meal from the body. Milk is a natural laxative; taking milk at the beginning of a meal will ease the inconvenient social consequences of taking it at the wrong times. Rest after drinking a glass of milk. After 15 minutes or so, enjoy a fruit salad. Wait 15 minutes or so, and have a soup & vegetable course.

Wait 15 minutes and enjoy a your main course. Then after 15 minutes, finish with a light dessert. Your One Meal A Day should take 2 hours each day. It is something you should plan for. It should never be rushed through or brushed off. If one misses a meal, it can be dismissed until the correct time the next day, without harming the person. Plan your day around and prepare your meals in advance. This way, meals can be set on time each day, with no delay. The practice will begin to teach the student the importance of planning and forethought.

The practice will instill the concept of Cause & Effect in the personal life of the practitioner. When done as a family unit, the practice will reinstate the lost tradition of “family dinner”. The unifying effect will become something that is anticipated and enjoyed as a group, on a daily basis. This also has positive social consequences. It will take one week to acclimate the body to the practice of eating One Meal A Day. At the end of 30 days, the student should attempt their first 3 day fast. One may be wondering why I would call this the “first 3 day fast”.

It is because an actual “FAST” does not occur until 72 hours without food. The scientific reason is that it takes 72 hours to digest and eliminate a meal. The person is said to be fasting through this time period and beyond, if they are able. But one should only do what is comfortable for them to do. If one cannot achieve the intended goal of fasting for 72 hours with only water the first month… they can fast 48 hours and try again in 30 days. One should continue this interval as a regular practice until they are able to accomplish a 3 day fast each month, for one year.

The purpose for the 3 day fast, (following 30 days of One Meal A Day) is to rid the body of the toxic poisons that accumulated in the body over that time period. This act of preventative medicine will hold sickness and disease far off. But even so, the practitioner will eventually accumulate sufficient poison to become sick. This may occur once or possibly twice a year. The cure for this illness is to rise to the higher degrees of the discipline. Rising to the practice of a monthly 3 day fast, purifies the mind, body and spirituality of the practitioner.

Remember, the goal is to establish the cycles of regular intervals of time, in harmony with our nature. At One Meal A Day, one should fast the first weekend of every month for 72 hours, with only water or coffee in the evening time; or before dawn. A student should practice this form of the discipline for a number of years, prior to attempting higher degrees. Alternating between cycles is a sure recipe for illness. Regularity is the lesson that must be learned. Find your “orbit” and stay there. Many people find that eating One Meal A Day will carry them for 100 years, or more.

Never eat before bed. Only eat more than once a day when you are sick and need the strength to make it through the day to your next meal. “Let you medicine be your food, and your food be your medicine”~ Hippocrates# Notes Notes# FASTING AFFECTS ON CHRONIC INJURY & PAIN Amin Shabazz Muhammad I was encouraged to include my personal experiences with chronic injury and pain, and how fasting helped and still helps me maintain my health today. Perhaps people who are dealing with chronic health conditions do not believe that they have the physical ability to attempt such a lofty ascent, and as a result they suffer needlessly in silent pain.

Perhaps there are not enough prominently known examples of triumph, to inspire the chronically injured or sick; and to give them the motivation that they too have a reward waiting for them. And so, it is with this motive that I will attempt just that. I will show by my personal examples of longterm struggle against severe physical injury, that seemingly unbelievable progress can be attained and kept. With this I hope to inspire not only the injured, to begin to initiate this discipline as a part of the process of their recovery; but also those who do not have limitations to begin to make unlimited progress.

When I was a preteen, I discovered that I had the unique gift of Photographic Reflexes. This means that I can do whatever I see done, literally. It allowed me to perform incredible feats. It aided me greatly in the learning of the Martial Arts (under Sensei Clifford Moody, student of Ninjutsu Grand Master Ronald Duncan), which I began in Ninjutsu Grand Master Ronald Duncan 1979. It allowed me to & Sensei Clifford Moody become the first person in the state of Minnesota to learn, perform and teach Break Dancing at a professional level, although I was only 13 years old, when I started.

I personally taught everyone who was considered talented in the Minnesota Hip-Hop culture of that time period. And my Breakdance groups (WildStyle & the Capital City Breakers) beat the legendary RockSteady Crew, at The 7th Street Entry of First Avenue nightclub in 1983. Photographic Reflexes made me an instant gymnast in high school. The Olympic Silver Medalist John Roethlisberger was afraid to compete with us “ghetto kids," while he was my junior classmate, at Saint Paul Central High School. I could literally do whatever the pros were doing then.

However, I was extremely poor, and this ill-affected me greatly. My home was infested with roaches and rodents. They ate our food before we had a chance to eat. If I didn’t eat at school, I often times did not eat at all. I bathed at school, because our electricity and water were often cut off by the utility companies. I was kept awake by rodents all night, every night. By morning, I was completely exhausted when it was time for school. My motivation for going to school was mainly food. Amin Shabazz Muhammad When I began Breakdancing, I became an overnight celebrity in Minnesota.

Thousands of kids would literally follow me around to venues. A friend once said I had “The Glow”. Although I grew up hating cigarettes, alcohol and drugs; with celebrity came throngs of people and cultures I was never accustomed to. This began my experience with them. I was one of the Black children who desegregated white schools. Blacks, Mexicans and Whites did not mingle after school. But when celebrity was thrust upon me, I was invited to homes and neighborhoods where people would have called the police on me, just for being seen there otherwise.

Suddenly, I was being pressured to drink, smoke and take drugs. I was not good at it, and I often embarrassed myself. This, combined with a toxic home environment and a poor diet, soon manifested in a strange pain inside my bones. I never told anyone that I was hurting, and I continued to take whatever drugs and alcohol were offered to me.# # # Amin Shabazz Muhammad Domino’s Pizza sponsored my event By the time I was 19 years old, my health was ruined and my brief celebrity was gone, when the Hip-Hop culture when out of style.

I broke my leg during this time, and my doctors could not explain why it would not heal. I broke my leg repeatedly. It was not a pain that I can describe with words. I was often up throughout the nights sobbing in excruciating pain. The pain was soon diagnosed as Osteoid Osteoma (an extremely painful bone tumor). I never knew where it came from. But in retrospect, I understand that it manifested from a toxic environment.` },
      { id: 5, title: "Fasting Effects on Chronic Injury & Pain", content: `Although I take great care to prevent injury, I have been hit by cars repeatedly. This injured my spine, and has resulted in a degenerative disc disease. My first chiropractor in the early 1990’s (Dr. Ted Mazurek), often attempted to dissuade me from eating One Meal A Day, or fasting. I spent many tens of thousands of dollars treating the injuries to my spine, never knowing the true extent of the problem. Throughout the past 30 years, I noticed that pain disappeared completely, depending upon my degree of fasting discipline.

And so, I would much rather treat myself by eating properly, than to take addictive narcotic pain medicines. One Meal A Day was not sufficient to affect the pain I feel. However, during my very first 3 day fast, the first 3 days of 1994, I noticed that I was completely pain free for the first time in years. I had been practicing One Meal A Day for 4 years, and I knew of a higher form of the discipline that purported to cure chronic illness. And so, I used my very first fast of 3 days as my launch into the stratosphere of One Meal Every Two Days.

I still have the calendar that I marked daily, throughout that year. During this time, I made amazing physical, mental, spiritual, social and economic progress. I was introduced to amazing people, like the legendary god of music (Prince). Although I’d performed for him at First Avenue as a child, he didn’t recognize me from then. He told The New Power Generation “… he always looks like he’s standing under the spotlight”. I had attained “The Glow” again. Once I transitioned to One Meal Every Three Days, Prince invited me to Paisley Park.

There were thousands of people in line, but Morris Hayes (Prince’s Musical Director & Keyboardist) saw me and said “Brother Muhammad, you don’t have to wait in no lines. Come on with me.” He led me through a separate entrance to an equipment storage room, where Prince was waiting for me alone. He jumped down from a huge amp when he saw me, and he ran over to greet and hug me. “ 0:;<' =23” I said. “ ”, he replied. I was later told that he NEVER did that with anyone. It was considered odd behavior. But it made me feel welcomed, as a brother and a friend .

Amin Shabazz Muhammad Prince asked me if I wanted to go hear some Rock & Roll, and led me through a door. We were in a quiet private room, but when he opened the door, there were thousands of people standing there waiting to hear him. They were all cordoned off, behind a rope barrier. And there was one chair next to the stage under a spot light. It was reserved for me, and he ushered me to the chair in front of everyone, as an honored guest. I was the only person with a seat. Everyone appeared to wonder who I was, and why Prince would treat me with such dignity, honor and respect.

It was due to the Light that he saw upon my face. He was so inspired by it, that he became a Vegan. But he soon changed again to a simple Vegetarian. I wish that I’d had the chance to speak to him again. I wish that he could have had more time to grow in his mastery of Self. I hope that his life will inspire others to seek their Light within. He certainly inspired me with his. “The Glow” is not an exclusive product. It can’t be bought, and it can’t be sold. It dwells within a vessel, only so long as they are in harmony with the natural laws of Creation.

One has a natural tendency to become vain over the increase in one’s own natural beauty, when it appears. But the Light will soon vanish like ether. It must be continually rediscovered each day; like the coming of the Dawn. It is a constant ascent into the Higher Self. It is a journey that will take the practitioner throughout their entire life. Even with this wonderful “Glow," it is not a miracle cure, by itself. I have had great help at times from Chiropractic doctors and Massage Therapists. But, I was unable to resolve my spine injuries, because I did not have the knowledge to reverse the damage that was caused, at that time.

I was however able to greatly reduce the inflammation and pain by my dietary practice. After 25 years, I visited Dr. Ted Mazurek again, and he lamented that he had developed cancer. Yet, aside from my injuries from car accidents, I looked exactly the same. He asked if I would teach him more about my dietary practices, and I did. Without a comprehensive understanding of my spine injuries, I was never able to find adequate care to better address the injuries, than chiropractic. After 30 years, I began heavy Yoga practice every morning and evening.

But it was not until I received comprehensive MRI results, that I was able to truly understand the condition of my spinal degeneration. Amin Shabazz Muhammad After 30 years, I reduced my fasting discipline to One Meal A Day, and stopped all exercise, until I could learn if I was in fact hurting myself without knowing it. This led me to the Disc Centers of America in Brooklyn Center, Minnesota. I went to inquire about the procedure, but was skeptical whether or not it would be effective. Dr. Jason Stadther , DC keyed in on one phrase, during my consultation with him (Intermittent Fasting).

He was so interested in the discipline, that he kept changing the subject of my consultation from my spine injury, back to my experience with the diet. My depth of knowledge, and brevity with which I was able to convey my experience, moved the good doctor to offer his services for free, in exchange for teaching him this discipline. Spinal Decompression is very expensive, and yet, within 5 to 10 minutes of our meeting, he saw that the Light I possessed was of equal or greater value to him in his life.

Learning precisely what the source of my spine condition is, has allowed me to use the most effective approach in dealing with the problem. Decompression is my friend (smile). I have benefitted from his expertise, and I hope that he will be blessed with good health and long life, from his interaction with me. Dr. Stadther immediately jumped to eating One Meal Every Two Days. I noted that he was able to complete two cycles of the fast. But by the following Monday, he Dr. Jason Stadther, DC complained that he needed Disc Centers of America to come down from the practice.

A day later he said he felt ill, and then the next day he was fine. I pointed out to him that discipline has a Cause & Effect on the practitioner. The poison in the body (which could be lodged in the digestive tract for long periods of time) is often dislodged during the fasting process. As that poison makes its way through the body, it can cause sickness. The body wants and needs to expel the toxic poison to be well again. I reiterated to him that he should master each level of discipline before attempting higher degrees.

One Meal Every Two Days is not something one would use as a starting point. However, the decompression techniques he had been providing for me were successful. I felt that I should return to One Meal Every Two Days. I went back to eating that way after I was certain I was not hurting myself. I demonstrated to the doctor, how it is done. The ecstasy of the Fasting High has a “Pendulum Effect”. The good doctor pushed too hard, too fast. When the pendulum swung back in the other direction, he crashed. This helped him understand the wisdom of the gradual ascent.

Suffering from severe injury is no reason to reject learning the practice of Mastery Level Fasting. The discipline is far more effective than pain medication. The side-effects of fasting are good health, reduction of pain and inflammation, and long life. The practitioners feel far better than one taking opioids and NSAIDS. The return of youthful beauty upon the faces of those who practice is a daily encouragement to continue growing in this discipline. There are many, many more experiences that I could recite, that have helped me and others.

I never mention my physical struggles publicly. I have never referred to myself as a “Survivor”. But watching others struggle with what I was able to overcome has moved me to include a brief word about my own experiences, not for the sake of boasting or arrogance. But it is to humbly demonstrate the power of the Will. If I were to hide the Light that was gifted to me, I would be guilty of a crime. And I freely give the knowledge to anyone that desires to learn. For, the Light that is in me, is also in every human being.

It simply needs the proper cultivation to grow. It’s possible that those who suffer from chronic disease and injury have more to gain from reading these words, than those who simply want to look and feel young again. I hope this section is received in the spirit of love and humility with which it has been given. And I would be greatly honored to hear from anyone who benefits from reading these words.` },
      { id: 6, title: "One Meal Every Two Days (OME2D)", content: `The number 12 is a Universal number, which correlates to the microcosmic and macrocosmic dimensions. 12 is used as a system of measurement of distance and time. 12 is broken into 6 to specify genetics. 12 is an interval against a 24 hour day, that divides the Day & the Night. 12 Major Constellations guide navigation. 12 Rulers guide Civilization. The correlations to Self are numerous, and it should be learned and understood that we function as a part of a Universal System. Our personal role is Chaos, without a proper understanding.

The First Law is Movement. The Second Law is Order. Once we have a proper foundation of knowledge, we can begin to Master what we have learned. The human body produces the necessary digestive acids and mucosa to process One Meal A Day, to remain in optimal health. This is a 24 hour period of time. We take two 12 hour intervals of time (equaling 24), and we could add one 12 hour interval to this number (giving us 36 hours), but we do not normally function this way. Thus, when we seek to take a step beyond the degree of One Meal A Day and monthly 3 day fast, we naturally go to One Meal Every Two Days.

This period of time allows the stomach even more time to digest the meal that was taken, and extract the nutrition which (otherwise) would be pushed out of the system before it has the ability to be fully utilized. This is 4 intervals of 12 hours. Understand that the human body takes 24 to 72 hours to fully extract the nutrients from our food; and then to remove the toxic poison waste from our body systems. The excess period of time and energy that the body does not need to spend processing food, is now applied to other areas of the body’s systems.

The body is now able to purify toxic poisons in the blood and lymphatic systems, far easier and more thoroughly than before. When we look at the fact that the human body is 75% Water, we can better comprehend the drinking of water on a completely empty stomach. Room temperature water is always best, unless we live in an extremely hot climate. Cold water shocks the systems and causes the contents of the stomach to solidify on contact. You can test this by heating any foods and pouring cold water on it; then try to force it down the drain.

It is similar and yet more harmful to attempt this with your own body. The effect instantly makes our food harder to digest. Room temperature water flushes the body of impurities, during fasting. “You must be shapeless, formless, like water. When you pour water in a cup, it becomes the cup. When you pour water in a bottle, it becomes the bottle. When you pour water in a teapot, it becomes the teapot. Water can drip and it can crash. Become like water my friend.”~ Bruce Lee We can easily see that even water can have a harmful effect on our health, depending upon its state.

We can learn to ebb & flow with the tide of our own nature, once we are able to feel the effect of a glass of water on our system. We can feel how it affects and purifies the empty vessel. The vessel that is filled, deadens the senses and dulls the purifying effect of clean water. When combined with salt, water can produce electricity (energy). Maintaining our blood salt/sugar levels can produce the necessary energy to carry us between meals, when practiced correctly. And yet, there is a difference between low blood salt/sugar and hunger.

This is the hardship that dissuades many from fasting. Once we understand how to produce the energy we need with our water, we no longer suffer from the effect of low blood salt/sugar levels. My blood pressure and heart rates have always been perfect, during medical check ups. Once we have the proper knowledge, we produce all the energy we need; so much that we require less sleep than we do at One Meal A Day. We have boundless energy, because our body’s energy that was used to process food, is not needed for that task.

The surplus energy illuminates the Mind, and gives us the inspiration needed to accomplish a manifold degree of progress. Our discernment multiplies, and we can solve problems in shorter periods of time, because our internal connections are unimpeded (i.e.,; they are FASTer). At One Meal Every Two Days, the speed of our reflexes increases dramatically. So much, that one can often “see” and resolve an impending accident, in mid-thought. To extrapolate more of this concept, it implies that one could begin to push a glass off of a level surface (accidentally), and yet stop the body’s inertia upon the first touch; negating the inertia and never pushing the glass.

This never begins the fall, and never breaks the glass. In the movie the Matrix, the character “NEO” broke the vase. What I am referring to, is the “Oracle Effect” of knowing the Cause & Effect of actions in a fictional sense. But in a very real sense, this is the effect of eating One Meal Every Two Days. Many times, I have even accidentally knocked something off a surface, or dropped something, and snatched it immediately out of the air, before it fell past my grasp (instinctively without looking). I have the natural ability to intuit (or read) people, to the point where some may find it uncomfortable.

Some have told me that they feel as if I am able to literally read their mind. This is because our Sensory Perception increases, as a natural effect of the practice. We begin to soar increasingly higher in our nature. And then, just as we begin to enjoy the ecstasy of the Elevated Places, it is time to descend back to the carnal level to feed again. Although this may seem to be fantasy, to the reader who has never had these experiences, we often remark that humanity uses an infinitely small percentage of our brain’s capacity.

Perhaps the practice of Fasting unlocks more of our potential than known to the masses. This can be proven to an individual at no limit of time, by their own practice of this discipline and Self discovery. I have seen many practitioners caught up in the rapture of fasting; unable to sleep and trying to retain what they were able to clearly articulate (while fasting), and it slipped away when they broke their fast. Concepts and references that came easily to the faster were like trying to grasp water, once they returned to the carnal level.

I have learned to read the condition of the heart & mind by the complexion and Light upon the face of individuals. The degree of Light is not always qualitative of the degree of purity, but it can be in context to the degree of striving against internal and external obstacles that Light can shine upon one’s face. The energy one uses to battle internal demons, can determine the energy required to achieve Balance. This “Energy” is visible in the complexion of the striver. They become beautiful and highly attractive in mind, body & spirit.

Those who practice this discipline become extremely youthful in appearance. When we practice this level of discipline, we feel GOOD all the time. In religious terms, it is called Ascension. It is the process of elevating the human to the Higher Self. It is not quite the Christian term “Transfiguration”; that is a higher degree than this. In Hindu philosophies, one who raises their Kundalini (lower self) to the Sahasara (higher self), experiences Nirvikalpa. In the Islamic sense it is Al-Mukhlasin (The Purified One).

It is not exclusive to any people; it is a law of nature. Once that Law is correctly followed, the effect is a free gift to the one who has submitted to that principle. This is the division between “Gods & Mortals”. Those who unlock the secret path of ascending into their Higher Self, begin to master the laws that govern their environment. The one who practices One Meal Every Two Days begins to develop and cultivate their own “Atmosphere”. The Earth’s atmosphere has many layers, that perform different tasks.

One of those tasks is to burn up foreign bodies that enter from the wrong trajectory.The atmosphere produces weather patterns, and moves rain to produce and renew life. Those who practice One Meal Every Two Days begin to learn the principles the govern their own life, and the lives of those with whom they interact. These people begin to learn the principles of mastering the Forces of Nature. “… What is the position of him who observes fast for a day and breaks on the other day? Thereupon he (the Holy Prophet ?) said: That is the fast of (the Prophet King ) David ?….” [Sahih Muslim Book 6, Number 2602] The Buddha is said to have spent six years practicing various degrees of fasting, as a means of torturing his body.

He became a vegetarian; He went to One Meal A Day; he went to One Meal Every Two Days; he went to One Meal Every Three Days; he went to eating once a week; he renounced food and lived on water; and then he renounced water to live on air, he almost died. This is a lesson for those who are searching for knowledge of Self. Don’t hurt yourself. Be kind to yourself. Treat yourself as the most important person in this life. Then treat others as you treat yourself. Be kind. “Although many Buddhists are vegetarians and highly trained monks are said to fast with only water for eighteen (18) to seventy-two (72) days, the Buddha himself is said to have died from eating “tainted pork” ~ The Prophet Jesus ? is well-known to have fasted in the wilderness for 40 days.

This story has many interpretations, but we will concern ourselves with the literal word. During this hardship, he was approached by Satan and offered the whole world, if he would worship him. He was able to turn stone to bread, and the Angels would not permit him to come to harm. We are led to believe these stories are all true, and yet simultaneously unobtainable for mere mortals. It is a difficult assignment, to make this knowledge so easy that even a baby would have a hard time making a mistake. One Meal Every Two Days is difficult, and yet… it is simultaneously easier to maintain than One Meal A Day.

I personally have found that the degree of focus is what makes the diet one that I have maintained for over 25 years. It allows me to gain the health benefits of toxin purification, and removal of inflammation. It gives me heightened mental and spiritual acuity. And yet, I am not as far removed from the common person that I am unable to reach them. Although I am much further than the practitioner of One Meal A Day, the higher discipline is normal for me. I have gained my balance at this degree of practice.

In deed, it is harder for others to watch me perform this level of discipline than it is for me to practice it myself. I have learned that the key to success in the practice of One Meal Every Two Days is preparation for the coming meal. As a strict vegetarian, one should understand the value of staple foods. There are staple foods that should always be a part of one’s meal, because of the nutritional value of those foods. At this level, we must not only be concerned with the taste of our meals, but the nutritional values of the foods has greater importance.

The meal must last for 48 hours. There are parts of the meal course that can be prepared ahead of time and refrigerated until the meal is prepared. The meal courses are exactly the same as I laid out in the section on One Meal A Day. But we must now eat and drink sufficient portions to take us through 48 hours. So we double our portions, and we double the length of time we take our meal. This means that our meal is no longer 2 hours (4pm to 6pm). Our meal now becomes 4 hours, and we can begin taking our meal from 2pm to 6pm, every other day.

We allow nothing to interfere with our mealtime. It is much harder to skip a meal at this level. Therefore our meal is something that is planned and anticipated. Example: 1st Course is organic Milk 2nd Course is organic Fruits 3rd Course is organic Soup & Bread 4th Course is a organic Vegetable Salad 5th Course is a organic Main Course Dish 6th Course is organic Dessert When making preparation to do this as a single person, it is not as difficult as then one must account for family meal time. Therefore, the first and second courses can be taken alone, or with family, if one is home.

And then soup, salad & bread; main course dish and dessert can follow the normal time with family, every other day. The time that is now freed up to accomplish other tasks will be something that one will enjoy finding ways to address. In the West, our busy lives often leave us wishing for more hours in the day. With this discipline, one will find that they have more time and more energy to devote to whatever pursuits they desire. Exercising at One Meal Every Two Days is not the same as One Meal A Day.

A person will not pursue this discipline while working a manual labor job. Athletes will want to consider their goals, prior to undertaking this discipline. One cannot maintain large body mass on this diet. If you compare Bruce Lee during older footage, to Bruce Lee in “Enter the Dragon," you will see the difference I am referring too. One will definitely wear a smaller frame, but that frame will be far more refined. It does not take as much work to gain the benefits of exercise at One Meal Every Two Days.

But if you burn up all your energy exercising, you will have none left to carry you through to your next meal. And you will not be able to maintain the discipline. This does not mean that one will be a lethargic weakling at One Meal Every Two Days. But if you glance at the photos I have added, you will see what you can expect. Keep in mind that (when you are looking at the photos of me) you are looking at someone who survived multiple bone-tumor surgeries and spinal degeneration. Even with such injuries, I am able to do far more than a person at 3 meals per day, who never suffered any injuries.

Can you imagine the potential of one with no health obstacles? Walking is the best form of exercise. Good health is a matter of good circulation. Poison is removed from the body via respiration. These simple principles will take a practitioner well into their life’s journey. There is great wisdom behind the practice of rituals like Salat; Yoga and Tai Chi Chu’an. The hard (Yang) energy is necessary to balance one’s life. But the soft (Yin) energy becomes more valuable with age. Learn the balance between the two.

Balance means learning not to push so hard that one injures themselves. Injury affects circulation and produces inflammation. Massage therapy is a very good life long practice. Stretching is more important than resistance training. Daily decompression techniques will increase circulation. The name of a technique and the language used to describe it is not important. Learning the principles that undergird philosophies and how to recognize them, that is the goal of the student practitioner. One Meal Every Two Days will give individuals a knowledge of themselves.

The practice will develop and cultivate sensitivity between Self & Environment. This practice can carry a practitioner well into their hundreds of years. There is no need to fast for 3 days (72 hours) each month, at this level of discipline. For the practice itself keeps the person in a state of purity. But when the practitioner finds that One Meal Every Two Days has become normal for them and they wish to strive for a higher level they will begin to study and practice One Meal Every Three Days.` },
      { id: 7, title: "One Meal Every Three Days (OME3D)", content: `“Defraud you not one the other, except it be with consent for a time, that you may give yourselves to fasting and prayer; and come together again, that Satan tempt you not for your incontinency.” 1 Corinthians 5 King James Version of the Bible It has been said that when one achieves mastery, waste elimination smells like fresh fruit. I can attest that at one meal every three days, I have had this experience. Indeed, the elimination of waste is a recurring spiritual experience.

“The True Man breathes with his heels; the mass of men breathe with their throats” ~By Taoist philosopher Chuang Tzu “70% of our body’s waste products are eliminated via our lungs and the rest through the urine, skin and feces. When the efficiency of our lungs is reduced due to poor breathing less oxygen is available to our cells, it slows down the flow of blood which carries wastes from the kidneys and lungs. Our lymphatic system which fights off viral and bacterial invaders is weakened along with a slower digestive process.” [The Tao Of Breathing by Dennis Lewis] I begin this section with transcendent perspective.

This section will only be philosophical to those who are not engaged in the practice of this discipline. This means that it will only be etherial words that contain no substantive value, unless one is practicing the discipline. “Faith Without Works Is Dead”~Bible James 2:17 My Father and Mother separated when I was 12 years old. I looked for him for 14 years, but I never saw my Father again… until we received word that he was in a coma and dying of AIDS. He was dropped off at a hospital in Bakersfield California and left to die.

My family rushed to California to try to save him, but we were too late. In retrospect, I would say that he left a void in my life that I tried to fill. My teenage years definitely reflect his absence to guide my actions. Just as I was gaining the upper hand in my self-balance, his death dealt an extremely harsh blow to our shattered family. I did not deal with this tragedy by devolving; instead I Evolved to One Meal Every Three Days. My eyes became like flaming swords. My words were extremely concise and mathematically accurate.

I began speaking in the Past, Present, Future and Perfect Tense without need for thought or effort. I did not need to “try” to accomplish any tasks. I was simply able to “do” whatever I imagined, extraordinarily fast. An example is that I decided to study my life in it’s entirety, and to do this, I needed to write out every memory I could recall. I was 28 years old. I wrote my autobiography in 7 days in a leather book and I purchased the finest quality I could afford. I study this book at the beginning of every year after that.

This is to teach me of my past accomplishments and to know the signs of past mistakes that I could unconsciously relive. I am able to avoid duplicating most of my past mistakes with the application of mathematical wisdom. This is my personal “Study Guide”. While at this level of discipline, I attracted attention in opposite extremes of both inspiration and envy. Those who were inspired, knew that what we were witnessing was special, and they made offerings of assistance to me personally. This is how I met with the musical God “Prince”.

I have been told that his final and uncompleted music project was written in 740 Hz. This is especially relevant for such a beautiful singer and song writer. It is the vibrational frequency of the throat Chakra “Vishuddhi," which corresponds to the Ether and Akashic Records. “The throat wheel is an important center in the Highest Yoga traditions of Vajrayana. It is described as being circular, blue, with 16 upward-pointing petals or channels. It is of particular importance for the practice of dream yoga.

Correctly meditating upon it before going to sleep is thought to produce lucid dreams, within which one can continue to practice yoga. “Western occultists make various differing Kabbalistic associations with Vishuddha. Some associate it with the hidden sephirah Da'at, where "wisdom" and "understanding" are balanced in the supernal realm by the aspect of "knowledge," a tangible idea which is then expressed, leading to the act of the creation. Others associate it with the sephirah Chesed and Geburah (mercy and strength) which are intimately associated with morality and the concept that both expansion, as expressed by Chesed, and limitation, as expressed by Geburah, are necessary for the creation of individual beings.

In terms of ethics, this is expressed by the yamas and niyamas (do's and do not's) of yoga. “In the system of the Sufi Lataif-e-sitta, there are no Lataif in the throat, but there are three in the region of the heart that are arranged horizontally and not vertically. They are the Qalb, or heart, which is the battleground between the lower forces of the Nafs and the higher forces of the Ruh, or spirit; the Ruh, which is said by some to be situated on the righthand side of the chest; and Sirr, or secret, which is between them both in the middle of the chest.

“In Taoism, the position of Lalana chakra in the roof of the mouth corresponds with a point known as 'The Heavenly Pool”. “In Hindu astrology or jyotish, the graha (planet) ruling the throat chakra is Buddha or Mercury…” [Source Wikipedia] There is a level of existence so highly elevated that the body is neither able to comprehend, nor “keep up” with the mind. At One Meal Every Three Days, the body will need to be rested for approximately 2 hours per day, but the mind will not sleep. There is little need for sleep at this level of discipline.

If one who practices One Meal A Day were to double their experiences, this could be considered One Meal Every Two Days; and if we double the experiences of One Meal Every Two Days, we will have One Meal Every Three Days. everything appears to be moving in extremely slow motion all the time, when we are at the level of One Meal Every Three Days. We can see the thoughts, motives and intentions of people forming in their hearts and minds, in realtime. We are able to compute and present mathematically accurate answers, before the questions are finished being uttered.

We literally feel connected with the Creator and Sustainer of all Life, in a very tangible way. At One Meal Every Three Days, we are aware of every breath, without needing to perform “Eastern Breathing Techniques”. I took one breath a minute, for days at a time. I practiced one breath every 5 minutes for hours, without the need to meditate on what I was doing. Within each breath is the Atom of Life. All creatures respirate and create Atomic reactions that turn the Atoms into fusion that powers the body.

At One Meal Every Three Days we are aware of that process and extract the power from the Atoms, before they are expelled as wasted energy. This fusion reaction and photosynthesis are quantified to the extreme. We literally “eat” Light. This is not to be confused with Sun-gazing philosophy. For photosynthesis is the nature of most people on the Planet. But the process is multiplied at One Meal Every Three Days. It literally feels like being One with God. I do not want any reader to confuse this with the taking of deities other than the One True Creator and Sustainer of all Life.

To do this may cause one to immediately disregard any truths that may appear to conflict with their personal believes. This would be a self-defeating vanity that nullifies my own efforts; and I do not believe in wasted effort. So I must emphatically state that there is only One Life on the Planet Earth; it is the Breath of Life. Without the Atmosphere of the Planet, no life would exist as we know it. As individuals, we all take in the Atmosphere to survive. And yet we all move seemingly independently of it.

At One Meal Every Three Days, we are always aware of our interconnectedness to all living beings, Past, Present and Future. This is called Universal Language; no one is excluded from it. One Meal Every Three Days takes 6 hours to complete one meal. We can take the meal beginning at 12pm to 6pm. It is the same as the other meals in structure, but again we increase the portions of each meal to give us enough nutritional value to carry us through 72 hours of fasting. Example: 1st Course is organic Milk 2nd Course is organic Fruits 3rd Course is organic Soup & Bread 4th Course is a organic Vegetable Salad 5th Course is a organic Main Course Dish 6th Course is organic Dessert Again, when making preparation to do this as a single person, it is not as difficult as when one must account for family meal time.

Therefore, the first and second courses can be taken alone, or with family, if one is home. And then soup, salad & bread; main course dish and dessert can follow the normal time with family, every three days. When I began this practice I had to learn “why” we do not hear of those who practice this degree of discipline. We do not know of their presence among us, for they do not make their presence known. It is said that those who practice this discipline live as long as they want to; and when they desire, they take on a lower form of diet that will soon cause illness and take them into death.

“History records the life of a man named $%& Li Qing Yuen. He said that he was born in 1736, but records suggest that he was actually born even earlier; in 1677. Li Qing Yuen was a Tactical advisor and was from Qijiang County, Sichuan, China. Professor Wu Chung-chief of the Chengdu University discovered Imperial Chinese government records from 1827, congratulating Li ChingYuen on his 150th birthday. $%& Li Qing Yuen “One of his disciples, the Taijiquan Master Da Liu told of Master Li's story: at 130 years old Master Li encountered an older hermit, over 500 years old [Here is where we can note the brief reference of one of the Holy Wise Scientists, who taught Li Qing Yuen the secret knowledge that allowed him longevity], in the mountains who taught him Baguazhang and a set of Qigong with breathing instructions, movements training coordinated with specific sounds, and dietary recommendations.

Da Liu reports that his master said that his longevity ‘is due to the fact that I performed the exercises every day, regularly, correctly, and with sincerity, for 120 years. ‘Returning home, he died a year later, some say of natural causes; others claim that he told friends that, ‘I have done all I have to do in this world. I will now go home.’ After Li's death, General Yang Sen investigated the truth about his claimed background and age and wrote a report about his findings that was later published. “Tortoise-Pigeon-Dog article LIFE Magazine $%& Li Qing Yuen “The article ‘Tortoise-Pigeon-Dog,’ from the May 15, 1933 issue of LIFE Magazine (now called Time) corresponds to the appearance of a Wise Traveler in Detroit, Michigan.

As do the teachings that He subsequently disseminated. Those Lessons taught of techniques that (if properly and correctly practiced) would improve the health and longevity of the practitioner. “Li Qing Yuen gave a series of lectures at the University of Sinkiang when he was well over the age of 200. Even though he was well into advanced years of age, witnesses testified that he appeared no older than a 50 or 60 year old man. He was a vegetarian. Although no public articles detail any information regarding his practice outside of foods, herbs and Martial Arts techniques, I am inclined to believe that a primary component of his discipline was the practice of regular fasting at the advanced levels known by titles such as ‘The Fast of King David”, which I have practiced for over twenty (20) years.”` },
      { id: 8, title: "Epilogue", content: `At the present time, I am 50 years old. I have practiced these disciplines for over 30 years. Although I was blessed to read the monumental writings of the books “How To Eat To Live 1 & 2” at an early age, I had no actual practitioners of the higher degrees of the discipline that I could question about certain aspects of the practice, and what to expect. There are many theorists, but I have never been interested in theory. I have attempted to place answers to those questions I had during my experiences in this writing.

Perhaps others will continue to expound upon this Foundation in later generations, until the discipline is widely known and practiced. I intentionally refrained from telling readers specifics about what foods to eat, as that subject can easily fill volumes by itself (and there are many sources on foods). But there are not many books on the disciplines I have elucidated. Instead I have focused on the need to purchase Organic Whole Foods, and I hope that readers will become inspired to grow their own foods.

This is not an academic study; it is Practical Application. Without practice, the information in this book is useless. Do not feel obligated to any degree of discipline. Do not feel that you have failed, when you attempt a discipline and fail (and you will fail over and over again). But if you keep trying, you will learn. Perhaps you will find that your failures are greater than what most would call their high. Keep striving; and in your striving, you will find the Path to your Higher Self. In Ancient Kemet (Egypt) it is written in the Ma’at, that it takes 42 years for man to become God.

In this present time, most of the population has burned their body out and they have begun winding down their lives into their eternal graves. It has been said that it takes 70 years to learn how to live. Most are dead before they ever reached that point. Our lives are akin to the sperm cell from which we all evolved. We became a fish, swimming in a pool of water inside our Mother’s womb. We evolved into an air breathing mammal that went prone upon it’s face. We grew to a four legged animal. We stood erect upon the Earth and began to seek our Mental maturity. 85% of the masses stopped at this point.

But the rest began our Spiritual Ascent. According to this philosophy, I still have another generation before I truly understand “How to Live”. I first heard of the concept at 19 years old. I began living then, to be one who might be able to bear witness to the truth of this statement. Even with the physical setbacks of injury, I believe that I am still able to make this my reality. I fast and Pray daily that I will behold this reality with you, as One. This book has taken me 3 days to write and an additional week to proofread, format and publish.

It was written while practicing One Meal Every Two Days (OME2D). I was able to accomplish this goal while working full-time and preparing for the impending arrival of our newest bundle of joy. I was inspired to write this book by recent interactions with those who sincerely wanted to learn to practice this discipline correctly. I hope that I have performed my duty adequately, and I am happy to offer personal guidance to any who seek knowledge of Self. I thank you for taking the time out of your life to read these words.

And I hope that by doing so, you will gain many more years than you spent studying this book. You are now obligated to pass on this tradition. You have become a link in the chain of an Ancient Discipline. May others look back upon your striving with inspiration and remember your name with kindness and love. Thank you very much. ~Amin Shabazz Muhammad A@# ABOUT THE AUTHOR Amin Shabazz Muhammad was born and raised in St. Paul, Minnesota. In 1982 he founded Minnesota’s first Hip-Hop B-Boy (BreakDance) Crews, “WildStyle and the Capital City Breakers” and was a key figure in establishing the Hip-Hop Culture in that area.

He was instrumental in promoting peace in the Twin Cities during the establishment of the Hip-Hop community, by instructing the youth how to settle their differences using the Five Elements of Hip-Hop, rather than resorting to gang violence. He has instructed many in the disciplines of Martial Arts, diet, language, history and culture and knowledge of self discipline. He has worked as a community activist and was a key figure in community socio-political movements, locally and nationally. He assisted major recording artist Prince in his pursuit of spiritual and political consciousness, and many thousands more.

He is a self-taught multi-instrumentalist, singer/songwriter, multi-linguist and world traveler. For contact, media and public engagement: contact@masterylevelfasting.com` }
    ]
  }
];

const CONSULTATIONS = [
  { id: "email",   label: "Email Consultation",   duration: "Written response within 48hrs", publicPrice: 49,  memberPrice: 35,  stripe: "https://buy.stripe.com/5kQ8wPbs10eGcXmguy77O0i" },
  { id: "phone30", label: "30-Min Phone Session", duration: "30 minutes",                   publicPrice: 97,  memberPrice: 75,  stripe: "https://buy.stripe.com/14A00jcw5aTkf5u7Y277O0h" },
  { id: "phone60", label: "60-Min Phone Session", duration: "60 minutes",                   publicPrice: 175, memberPrice: 125, stripe: "https://buy.stripe.com/3cIbJ11Rr2mOg9yemq77O0g" },
  { id: "video60", label: "60-Min Video Session", duration: "60 minutes via video call",    publicPrice: 197, memberPrice: 150, stripe: "https://buy.stripe.com/3cI14ncw5e5w0aAdim77O0j" },
];

const TIERS = [
  { id: "books", name: "Books Only", price: "$9.99/mo", altPrice: "$79/yr", oneTime: false, stripe: "https://buy.stripe.com/fZubJ10Nn0eG5uUfqu77O0b", features: ["Both books — full digital reader", "Read-aloud on every chapter", "Progress tracking", "Monthly 72-Hour Fast community", "New editions automatically included"], highlight: false },
  { id: "course", name: "Course Only", price: "$297", altPrice: "one time · lifetime access", oneTime: true, stripe: "https://buy.stripe.com/00wbJ153D9Pg7D2a6a77O08", features: ["Complete Mukhlasin Diet Course", "All 9 modules with slides", "Course Q&A", "Master of Fasting", "Lifetime access"], highlight: false },
  { id: "complete", name: "Complete Library", price: "$19.99/mo", altPrice: "$149/yr", oneTime: false, stripe: "https://buy.stripe.com/3cI8wPbs18Lc6yY3HM77O0d", features: ["Both books — full digital reader", "Read-aloud on every chapter", "Complete Mukhlasin Diet Course", "All certificates", "Monthly 72-Hour Fast community", "Ramadan seasonal content", "Author articles & teachings", "Member consultation rates"], highlight: true },
  { id: "lifetime", name: "Complete Library", badge: "Lifetime", price: "$497", altPrice: "one time · never pay again", oneTime: true, stripe: "https://buy.stripe.com/7sYcN50NnaTk3mM4LQ77O0f", features: ["Everything in Complete Library", "Lifetime access — no recurring billing", "One complimentary 30-min consultation", "Discounted consultation rates forever", "Early access to all new titles", "Priority author Q&A"], highlight: false },
];

const BYPASS_CODES = ["admin","bismillah","gift","mukhlasin2024","sadaqah","admintest"];
function checkBypass() {
  if (typeof window === "undefined") return false;
  try { const p = new URLSearchParams(window.location.search); return BYPASS_CODES.includes((p.get("access") || "").toLowerCase()); }
  catch(e) { return false; }
}
function isRamadan() {
  if (typeof window === "undefined") return false;
  const now = new Date(), y = now.getFullYear();
  const w = { 2025:{s:new Date("2025-03-01"),e:new Date("2025-03-30")}, 2026:{s:new Date("2026-02-18"),e:new Date("2026-03-20")} };
  const d = w[y]; return d ? now >= d.s && now <= d.e : false;
}
const FREE_CODES = { "SADAQAH": true, "ADMINTEST": true };


// ── SLIDE COMPONENT ──────────────────────────────────────────
function PhoneSlide({ s, current, total }) {
  return (
    <div style={{ width:"100%", height:"100%", background:s.refl?"#0d0b08":"#0a0a0a", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"2rem 1.25rem", textAlign:"center", position:"relative", boxSizing:"border-box", overflow:"hidden" }}>
      {s.refl && <div style={{ fontSize:22, color:"#8a7a5a", marginBottom:10 }}>◈</div>}
      {s.ar && <div style={{ width:"100%", fontSize:14, color:"#8a7a5a", marginBottom:8, direction:"rtl", fontFamily:"serif", lineHeight:1.6 }}>{s.ar}</div>}
      {s.ey && <div style={{ width:"100%", fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:8, fontFamily:"sans-serif" }}>{s.ey}</div>}
      {s.ti && <div style={{ width:"100%", fontSize:15, fontWeight:600, color:"#f5f0e8", lineHeight:1.35, fontFamily:"Georgia, serif", marginBottom:8, whiteSpace:"pre-line", wordBreak:"break-word" }}>{s.ti}</div>}
      {!s.refl && !s.ti && <div style={{ width:28, height:2, background:"#8a7a5a", margin:"0 auto 8px" }} />}
      {s.qt && <div style={{ width:"100%", fontSize:11, color:"#c8c0b0", lineHeight:1.8, fontStyle:"italic", fontFamily:"Georgia, serif", borderLeft:"2px solid #8a7a5a", paddingLeft:10, textAlign:"left", wordBreak:"break-word" }}>{s.qt}</div>}
      {s.at && <div style={{ width:"100%", fontSize:10, color:"#6a6050", marginTop:6, textAlign:"left", fontFamily:"sans-serif" }}>{s.at}</div>}
      {s.bo && <div style={{ width:"100%", fontSize:12, color:"#c8c0b0", lineHeight:1.75, fontFamily:"sans-serif", whiteSpace:"pre-line", wordBreak:"break-word" }}>{s.bo}</div>}
      {s.list && <div style={{ width:"100%", marginTop:4 }}>{s.list.map((item,i)=><div key={i} style={{ fontSize:11, color:"#c8c0b0", lineHeight:1.6, textAlign:"left", padding:"3px 0", borderBottom:i<s.list.length-1?"0.5px solid #3a3530":"none", wordBreak:"break-word" }}>• {item}</div>)}</div>}
      <div style={{ position:"absolute", bottom:10, right:14, fontSize:9, color:"#3a3530", fontFamily:"sans-serif" }}>{current+1} / {total}</div>
      <div style={{ position:"absolute", bottom:0, left:0, height:2, background:"#8a7a5a", width:`${((current+1)/total)*100}%`, transition:"width 0.3s" }} />
    </div>
  );
}

// ── CHAPTER VIEWER ───────────────────────────────────────────
function ChapterViewer({ chapter }) {
  const [slide, setSlide] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [scores, setScores] = useState({});
  const [tab, setTab] = useState("slides");
  const slides = chapter.slides;
  const total = slides.length;
  const correct = chapter.qa.filter((_,i)=>scores[i]===true).length;
  const answered = chapter.qa.filter((_,i)=>scores[i]!==undefined).length;
  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {["slides","Q&A"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:"6px 16px", borderRadius:20, border:`1.5px solid ${tab===t?"#8a7a5a":"#ddd"}`, background:tab===t?"#8a7a5a":"white", color:tab===t?"white":"#666", fontSize:12, fontWeight:tab===t?700:400, cursor:"pointer" }}>
            {t==="slides"?"📱 Slides":`❓ Q&A${answered>0?` (${correct}/${chapter.qa.length})`:""}`}
          </button>
        ))}
      </div>
      {tab==="slides" && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ width:280, maxWidth:"100%", height:497, borderRadius:28, border:"2px solid #2a2a2a", overflow:"hidden", flexShrink:0 }}>
            <PhoneSlide s={slides[slide]} current={slide} total={total} />
          </div>
          <div style={{ display:"flex", gap:4, marginTop:10, flexWrap:"wrap", justifyContent:"center", maxWidth:280 }}>
            {slides.map((_,i)=><div key={i} onClick={()=>setSlide(i)} style={{ width:5, height:5, borderRadius:"50%", background:i===slide?"#8a7a5a":"#ddd", cursor:"pointer" }} />)}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginTop:12 }}>
            <button onClick={()=>setSlide(s=>s>0?s-1:total-1)} style={{ width:38, height:38, borderRadius:"50%", border:"0.5px solid #ddd", background:"white", cursor:"pointer", fontSize:16 }}>‹</button>
            <div style={{ fontSize:12, color:"#aaa" }}>{slide+1} / {total}</div>
            <button onClick={()=>setSlide(s=>s<total-1?s+1:0)} style={{ width:38, height:38, borderRadius:"50%", border:"0.5px solid #ddd", background:"white", cursor:"pointer", fontSize:16 }}>›</button>
          </div>
        </div>
      )}
      {tab==="Q&A" && (
        <div>
          {chapter.qa.map((item,qi)=>{
            const isOpen=!!revealed[qi]; const mark=scores[qi];
            return (
              <div key={qi} style={{ border:`1.5px solid ${isOpen?"#8a7a5a":"#e0e0e0"}`, borderRadius:12, marginBottom:12, overflow:"hidden" }}>
                <div style={{ padding:"0.875rem 1rem", background:"white" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:10 }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:mark===true?"#4a7c5e":mark===false?"#c0392b":isOpen?"#8a7a5a":"#eee", color:"white", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{mark===true?"✓":mark===false?"✗":qi+1}</div>
                    <div style={{ flex:1, fontSize:13, lineHeight:1.55, color:"#1a1a1a", fontWeight:500 }}>{item.q}</div>
                  </div>
                  {!isOpen && <button onClick={()=>setRevealed(r=>({...r,[qi]:true}))} style={{ marginLeft:32, padding:"6px 16px", borderRadius:20, background:"#8a7a5a", color:"white", border:"none", fontSize:11, fontWeight:700, cursor:"pointer" }}>▼ Reveal Answer</button>}
                </div>
                {isOpen && (
                  <div style={{ padding:"0.75rem 1rem 0.875rem", background:"#f5f0e6", borderTop:"1px solid #8a7a5a44" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#8a7a5a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Answer</div>
                    <p style={{ fontSize:13, color:"#333", lineHeight:1.75, marginBottom:12 }}>{item.a}</p>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ fontSize:11, color:"#777" }}>Did you get it right?</span>
                      <button onClick={()=>{ setScores(s=>({...s,[qi]:true})); setRevealed(r=>({...r,[qi]:false})); }} style={{ padding:"4px 12px", borderRadius:20, border:"1.5px solid #4a7c5e", background:mark===true?"#4a7c5e":"white", color:mark===true?"white":"#4a7c5e", fontSize:11, fontWeight:700, cursor:"pointer" }}>✓ Yes</button>
                      <button onClick={()=>{ setScores(s=>({...s,[qi]:false})); setRevealed(r=>({...r,[qi]:false})); }} style={{ padding:"4px 12px", borderRadius:20, border:"1.5px solid #c0392b", background:mark===false?"#c0392b":"white", color:mark===false?"white":"#c0392b", fontSize:11, fontWeight:700, cursor:"pointer" }}>✗ Review again</button>
                      <button onClick={()=>setRevealed(r=>({...r,[qi]:false}))} style={{ padding:"4px 12px", borderRadius:20, border:"1.5px solid #ddd", background:"white", color:"#888", fontSize:11, cursor:"pointer" }}>▲ Close</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── PROTECTIVE SLIDES ────────────────────────────────────────
function ProtectiveSlides({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const total = PROTECTIVE.length;
  const s = PROTECTIVE[slide];
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"1.5rem 0" }}>
      <div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"#c0392b", marginBottom:12, fontWeight:700 }}>⚠ Please read before beginning</div>
      <div style={{ width:280, maxWidth:"100%", height:497, background:"#0f0808", borderRadius:28, border:"2px solid #3a1a1a", overflow:"hidden", position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"2rem 1.25rem", textAlign:"center", boxSizing:"border-box" }}>
        <div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"#c0392b", marginBottom:12, fontFamily:"sans-serif" }}>{s.ey}</div>
        {s.ti && <div style={{ fontSize:17, fontWeight:600, color:"#f5f0e8", lineHeight:1.35, fontFamily:"Georgia, serif", marginBottom:10 }}>{s.ti}</div>}
        {s.bo && <div style={{ fontSize:12, color:"#c8c0b0", lineHeight:1.75 }}>{s.bo}</div>}
        {s.list && <div style={{ width:"100%", marginTop:4 }}>{s.list.map((item,i)=><div key={i} style={{ fontSize:11, color:"#c8c0b0", lineHeight:1.6, textAlign:"left", padding:"4px 0", borderBottom:i<s.list.length-1?"0.5px solid #3a2a2a":"none" }}>• {item}</div>)}</div>}
        <div style={{ position:"absolute", bottom:10, right:14, fontSize:9, color:"#5a3030", fontFamily:"sans-serif" }}>{slide+1} / {total}</div>
        <div style={{ position:"absolute", bottom:0, left:0, height:2, background:"#c0392b", width:`${((slide+1)/total)*100}%`, transition:"width 0.3s" }} />
      </div>
      <div style={{ display:"flex", gap:12, marginTop:16, alignItems:"center" }}>
        {slide>0 && <button onClick={()=>setSlide(s=>s-1)} style={{ padding:"8px 16px", borderRadius:20, border:"0.5px solid #ddd", background:"white", cursor:"pointer", fontSize:12 }}>← Back</button>}
        {slide<total-1
          ? <button onClick={()=>setSlide(s=>s+1)} style={{ padding:"8px 20px", borderRadius:20, background:"#c0392b", color:"white", border:"none", cursor:"pointer", fontSize:12, fontWeight:700 }}>Next →</button>
          : <button onClick={onComplete} style={{ padding:"8px 20px", borderRadius:20, background:"#8a7a5a", color:"white", border:"none", cursor:"pointer", fontSize:12, fontWeight:700 }}>I understand — Begin the course →</button>
        }
      </div>
    </div>
  );
}

// ── WELCOME VIEWER ───────────────────────────────────────────
function WelcomeViewer({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const total = WELCOME.length;
  const s = WELCOME[slide];
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"1rem 0 1.5rem" }}>
      <div style={{ width:280, maxWidth:"100%", height:497, background:"#0a0a0a", borderRadius:28, border:"2px solid #2a2a2a", overflow:"hidden", position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"2rem 1.25rem", textAlign:"center", boxSizing:"border-box" }}>
        {s.ar && <div style={{ fontSize:18, color:"#8a7a5a", marginBottom:8, direction:"rtl", fontFamily:"serif" }}>{s.ar}</div>}
        {s.ey && <div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:10, fontFamily:"sans-serif" }}>{s.ey}</div>}
        {s.ti && <div style={{ fontSize:19, fontWeight:600, color:"#f5f0e8", lineHeight:1.35, fontFamily:"Georgia, serif", marginBottom:10, whiteSpace:"pre-line" }}>{s.ti}</div>}
        {s.qt && <div style={{ fontSize:11, color:"#c8c0b0", lineHeight:1.85, fontStyle:"italic", fontFamily:"Georgia, serif", borderLeft:"2px solid #8a7a5a", paddingLeft:10, textAlign:"left" }}>{s.qt}</div>}
        {s.at && <div style={{ fontSize:10, color:"#6a6050", marginTop:6, textAlign:"left" }}>{s.at}</div>}
        {s.bo && <div style={{ fontSize:12, color:"#c8c0b0", lineHeight:1.75 }}>{s.bo}</div>}
        <div style={{ position:"absolute", bottom:10, right:14, fontSize:9, color:"#3a3530" }}>{slide+1} / {total}</div>
        <div style={{ position:"absolute", bottom:0, left:0, height:2, background:"#8a7a5a", width:`${((slide+1)/total)*100}%`, transition:"width 0.3s" }} />
      </div>
      <div style={{ display:"flex", gap:4, marginTop:10, flexWrap:"wrap", justifyContent:"center" }}>
        {WELCOME.map((_,i)=><div key={i} onClick={()=>setSlide(i)} style={{ width:5, height:5, borderRadius:"50%", background:i===slide?"#8a7a5a":"#ddd", cursor:"pointer" }} />)}
      </div>
      <div style={{ display:"flex", gap:12, marginTop:14, alignItems:"center" }}>
        <button onClick={()=>setSlide(s=>s>0?s-1:total-1)} style={{ width:38, height:38, borderRadius:"50%", border:"0.5px solid #ddd", background:"white", cursor:"pointer", fontSize:16 }}>‹</button>
        <div style={{ fontSize:11, color:"#aaa" }}>{slide+1} / {total}</div>
        <button onClick={()=>setSlide(s=>s<total-1?s+1:0)} style={{ width:38, height:38, borderRadius:"50%", border:"0.5px solid #ddd", background:"white", cursor:"pointer", fontSize:16 }}>›</button>
      </div>
      {slide===total-1 && <button onClick={onComplete} style={{ marginTop:14, padding:"10px 24px", borderRadius:20, background:"#8a7a5a", color:"white", border:"none", cursor:"pointer", fontSize:13, fontWeight:700 }}>Begin Section I →</button>}
    </div>
  );
}

// ── NAME ENTRY ───────────────────────────────────────────────
function NameEntry({ onComplete }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const validate = () => {
    const e={};
    if(name.trim().length<2) e.name="Please enter your full name.";
    if(!email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email="Please enter a valid email address.";
    return e;
  };
  const handleSubmit = async () => {
    const e=validate(); if(Object.keys(e).length>0){setErrors(e);return;}
    setSubmitting(true);
    onComplete(name.trim(), email.trim().toLowerCase());
  };
  const ready = name.trim().length>1 && email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"2rem 0 1rem", textAlign:"center" }}>
      <div style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:14 }}>The Mukhlasin Diet — 4th Edition</div>
      <div style={{ fontSize:20, fontWeight:600, fontFamily:"Georgia, serif", color:"#111", marginBottom:8 }}>Welcome, student.</div>
      <div style={{ fontSize:13, color:"#666", lineHeight:1.75, maxWidth:320, marginBottom:24 }}>Please enter your name and email. Your name will appear on your Certificate of Completion.</div>
      <div style={{ width:"100%", maxWidth:320, textAlign:"left" }}>
        <label style={{ display:"block", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8a7a5a", marginBottom:6 }}>Your Full Name</label>
        <input type="text" value={name} onChange={e=>{setName(e.target.value);setErrors(v=>({...v,name:""}));}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Enter your full name" style={{ width:"100%", padding:"12px 16px", fontSize:15, fontFamily:"Georgia, serif", border:`1.5px solid ${errors.name?"#c0392b":name.trim().length>1?"#8a7a5a":"#ddd"}`, borderRadius:10, outline:"none", color:"#111", background:"white", marginBottom:4, boxSizing:"border-box" }} />
        {errors.name && <div style={{ fontSize:12, color:"#c0392b", marginBottom:8 }}>{errors.name}</div>}
        <label style={{ display:"block", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8a7a5a", marginBottom:6, marginTop:14 }}>Email Address</label>
        <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErrors(v=>({...v,email:""}));}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Enter your email address" style={{ width:"100%", padding:"12px 16px", fontSize:15, fontFamily:"sans-serif", border:`1.5px solid ${errors.email?"#c0392b":email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?"#8a7a5a":"#ddd"}`, borderRadius:10, outline:"none", color:"#111", background:"white", marginBottom:4, boxSizing:"border-box" }} />
        {errors.email && <div style={{ fontSize:12, color:"#c0392b", marginBottom:8 }}>{errors.email}</div>}
        <button onClick={handleSubmit} disabled={submitting} style={{ width:"100%", padding:"13px", borderRadius:10, background:ready&&!submitting?"#8a7a5a":"#ddd", color:ready&&!submitting?"white":"#aaa", border:"none", fontSize:14, fontWeight:700, cursor:ready&&!submitting?"pointer":"default", marginTop:16 }}>
          {submitting?"Starting...":"Begin the Course →"}
        </button>
      </div>
    </div>
  );
}

// ── CERTIFICATE ──────────────────────────────────────────────
function Certificate({ name, date, onReturn }) {
  return (
    <div style={{ padding:"1rem 0" }}>
      <div style={{ background:"white", border:"2px solid #8a7a5a", borderRadius:16, padding:"2.5rem 2rem", textAlign:"center", position:"relative", overflow:"hidden", maxWidth:560, margin:"0 auto" }}>
        <div style={{ position:"absolute", top:10, left:14, fontSize:18, color:"#8a7a5a", opacity:0.4 }}>✦</div>
        <div style={{ position:"absolute", top:10, right:14, fontSize:18, color:"#8a7a5a", opacity:0.4 }}>✦</div>
        <div style={{ position:"absolute", bottom:10, left:14, fontSize:18, color:"#8a7a5a", opacity:0.4 }}>✦</div>
        <div style={{ position:"absolute", bottom:10, right:14, fontSize:18, color:"#8a7a5a", opacity:0.4 }}>✦</div>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
          <img src="/mukhlasin-logo.png" alt="The Mukhlasin Diet" style={{ width:80, height:"auto" }} />
        </div>
        <div style={{ fontSize:28, color:"#8a7a5a", direction:"rtl", fontFamily:"serif", marginBottom:4 }}>الْمُخْلَصِينَ</div>
        <div style={{ fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:20 }}>The Mukhlasin Diet — 4th Edition · 2022</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:"linear-gradient(to right, transparent, #8a7a5a)" }} />
          <div style={{ fontSize:12, color:"#8a7a5a" }}>✦</div>
          <div style={{ flex:1, height:1, background:"linear-gradient(to left, transparent, #8a7a5a)" }} />
        </div>
        <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#888", marginBottom:14 }}>Certificate of Completion</div>
        <div style={{ fontSize:13, color:"#666", marginBottom:10 }}>This certifies that</div>
        <div style={{ fontSize:28, fontWeight:700, fontFamily:"Georgia, serif", color:"#111", marginBottom:10, padding:"0 1rem", borderBottom:"1.5px solid #8a7a5a", paddingBottom:12, marginLeft:"10%", marginRight:"10%" }}>{name}</div>
        <div style={{ fontSize:13, color:"#666", marginTop:14, lineHeight:1.8 }}>has successfully completed the full course of study of</div>
        <div style={{ fontSize:17, fontWeight:700, fontFamily:"Georgia, serif", color:"#111", margin:"10px 0 4px" }}>The Mukhlasin Diet</div>
        <div style={{ fontSize:12, color:"#888", marginBottom:20 }}>Celebrating 30+ Years of Fasting · A Complete Course in the Divine Dietary Discipline</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:"linear-gradient(to right, transparent, #8a7a5a)" }} />
          <div style={{ fontSize:12, color:"#8a7a5a" }}>✦</div>
          <div style={{ flex:1, height:1, background:"linear-gradient(to left, transparent, #8a7a5a)" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", padding:"0 1rem" }}>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:13, fontFamily:"Georgia, serif", fontStyle:"italic", color:"#333", borderTop:"1px solid #ddd", paddingTop:6, minWidth:160 }}>Amin Shabazz Muhammad</div>
            <div style={{ fontSize:10, color:"#aaa", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:3 }}>Instructor & Author</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:13, fontFamily:"Georgia, serif", color:"#333", borderTop:"1px solid #ddd", paddingTop:6, minWidth:140 }}>{date}</div>
            <div style={{ fontSize:10, color:"#aaa", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:3 }}>Date of Completion</div>
          </div>
        </div>
        <div style={{ marginTop:20, fontSize:13, color:"#8a7a5a", fontFamily:"serif", direction:"rtl" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>As salaam alaikum</div>
      </div>
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:18, flexWrap:"wrap" }}>
        <button onClick={()=>window.print()} style={{ padding:"10px 22px", borderRadius:20, background:"#8a7a5a", color:"white", border:"none", fontSize:13, fontWeight:700, cursor:"pointer" }}>🖨 Print / Save Certificate</button>
        <button onClick={onReturn} style={{ padding:"10px 22px", borderRadius:20, background:"white", color:"#666", border:"0.5px solid #ddd", fontSize:13, cursor:"pointer" }}>← Return to Course</button>
      </div>
    </div>
  );
}

export default function MukhlasinCourse() {
  const [view, setView] = useState("landing");
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [activeBook, setActiveBook] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeMod, setActiveMod] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState({});
  const [consultForm, setConsultForm] = useState({ name: "", email: "", service: "", message: "" });
  const [consultSent, setConsultSent] = useState(false);
  const [consultPaidService, setConsultPaidService] = useState(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const hasBypass = checkBypass();
  const [coursePhase, setCoursePhase] = useState(hasBypass ? "name" : "paywall");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [openSections, setOpenSections] = useState({ "Section I — Spiritual": true });
  const [introDone, setIntroDone] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    const access = sessionStorage.getItem("ml_access");
    if (access === "true") { setHasAccess(true); setView("library"); }
    const saved = sessionStorage.getItem("ml_progress");
    if (saved) setProgress(JSON.parse(saved));
    const introFlag = sessionStorage.getItem("ml_course_intro_done");
    if (introFlag === "true") {
      setIntroDone(true);
      setStudentName(sessionStorage.getItem("ml_student_name") || "");
      setStudentEmail(sessionStorage.getItem("ml_student_email") || "");
    }
    const savedCourseProgress = sessionStorage.getItem("ml_course_progress");
    if (savedCourseProgress) setCourseProgress(parseInt(savedCourseProgress, 10));
  }, []);

  useEffect(() => {
    if (activeMod > courseProgress) {
      setCourseProgress(activeMod);
      sessionStorage.setItem("ml_course_progress", String(activeMod));
    }
  }, [activeMod]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [activeChapter, activeMod]);

  const saveProgress = (bookId, chIdx) => {
    const updated = { ...progress, [bookId]: chIdx };
    setProgress(updated);
    sessionStorage.setItem("ml_progress", JSON.stringify(updated));
  };

  const grantAccess = () => {
    sessionStorage.setItem("ml_access", "true");
    setHasAccess(true);
    setPaywallOpen(false);
    setView("library");
  };

  const handleCodeSubmit = () => {
    const upper = code.trim().toUpperCase();
    if (FREE_CODES[upper]) { grantAccess(); }
    else { setMsg("Invalid access code. Please try again."); }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) { setMsg("Please enter your email address."); return; }
    setSending(true); setMsg("");
    try {
      const res = await fetch("/api/send-magic-link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase() }) });
      const data = await res.json();
      if (data.sent) { setMsg("A magic link has been sent to " + email + ". Check your inbox."); }
      else { setMsg(data.error || "No purchase found. Please enroll below or use your access code."); }
    } catch { setMsg("Connection error. Please try again."); }
    finally { setSending(false); }
  };

  const stopSpeech = () => { if (typeof window !== "undefined" && window.speechSynthesis) { window.speechSynthesis.cancel(); } setSpeaking(false); };

  const speak = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) { alert("Your browser does not support read-aloud."); return; }
    stopSpeech();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92; utt.pitch = 1.0;
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  };

  // READER
  if (view === "reader" && activeBook && activeChapter !== null) {
    const book = BOOKS.find(b => b.id === activeBook);
    const chapter = book.chapters[activeChapter];
    const isFirst = activeChapter === 0;
    const isLast = activeChapter === book.chapters.length - 1;
    return (
      <div style={{ minHeight: "100vh", background: C.dark, color: C.slate, fontFamily: "Georgia, serif" }}>
        <div style={{ background: "#0d0b08", borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => { stopSpeech(); setView("library"); }} style={{ background: "none", border: `1px solid ${C.gold}`, color: C.gold, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>← Library</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>{book.title}</div>
            <div style={{ fontSize: "15px", color: C.goldLight }}>{chapter.title}</div>
          </div>
          <button onClick={() => speaking ? stopSpeech() : speak(chapter.content)} style={{ background: speaking ? C.gold : "transparent", border: `1px solid ${C.gold}`, color: speaking ? C.dark : C.gold, padding: "6px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>
            {speaking ? "⏹ Stop" : "▶ Read Aloud"}
          </button>
        </div>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Chapter {activeChapter + 1} of {book.chapters.length}</div>
          <h1 style={{ color: C.goldLight, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2.5rem", fontWeight: "normal" }}>{chapter.title}</h1>
          {chapter.content.split("\n\n").map((para, i) => (
            <p key={i} style={{ lineHeight: 1.9, marginBottom: "1.5rem", color: C.slate, fontSize: "clamp(15px, 2vw, 17px)" }}>{para}</p>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
            <button onClick={() => { stopSpeech(); if (!isFirst) { saveProgress(activeBook, activeChapter - 1); setActiveChapter(activeChapter - 1); } }} disabled={isFirst} style={{ background: "none", border: `1px solid ${isFirst ? C.border : C.gold}`, color: isFirst ? C.border : C.gold, padding: "10px 20px", borderRadius: "20px", cursor: isFirst ? "default" : "pointer", fontSize: "14px" }}>← Previous</button>
            {!isLast ? (
              <button onClick={() => { stopSpeech(); saveProgress(activeBook, activeChapter + 1); setActiveChapter(activeChapter + 1); }} style={{ background: C.gold, border: "none", color: C.dark, padding: "10px 24px", borderRadius: "20px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>Next Chapter →</button>
            ) : (
              <button onClick={() => { stopSpeech(); setView("library"); }} style={{ background: C.green, border: "none", color: C.white, padding: "10px 24px", borderRadius: "20px", cursor: "pointer", fontSize: "14px" }}>✓ Complete</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // COURSE
  if (view === "course") {
    // Paywall
    if (coursePhase === "paywall") {
      return (
        <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh" }}>
          <div style={{ background:"#0a0a0a", padding:"1rem 1.25rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:3 }}>4th Edition · 2022</div>
            <div style={{ fontSize:16, fontWeight:700, color:"#f5f0e8", fontFamily:"Georgia, serif" }}>الْمُخْلَصِينَ — The Mukhlasin Diet</div>
          </div>
          <div style={{ padding:"1.25rem", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", paddingTop:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:8 }}>The Mukhlasin Diet — 4th Edition</div>
            <div style={{ fontSize:22, fontWeight:700, fontFamily:"Georgia, serif", color:"#111", marginBottom:6 }}>Complete Course</div>
            <div style={{ fontSize:13, color:"#666", lineHeight:1.75, maxWidth:340, marginBottom:28 }}>25 chapters · Slides · Full Q&A review · Certificate of Completion</div>
            <div style={{ width:"100%", maxWidth:360, display:"flex", flexDirection:"column", gap:12 }}>
              {isRamadan() && (
                <div style={{ border:"2px solid #c0392b", borderRadius:14, overflow:"hidden", background:"#fff8f8" }}>
                  <div style={{ background:"#c0392b", padding:"6px 16px" }}><div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"white", fontWeight:700 }}>☽ Ramadan Special</div></div>
                  <div style={{ padding:"16px 20px" }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:6 }}><span style={{ fontSize:34, fontWeight:800, color:"#c0392b" }}>$97</span><span style={{ fontSize:14, color:"#aaa", textDecoration:"line-through" }}>$197</span></div>
                    <a href="https://buy.stripe.com/00wbJ153D9Pg7D2a6a77O08" target="_blank" rel="noreferrer" style={{ display:"block", width:"100%", padding:"13px", borderRadius:10, background:"#c0392b", color:"white", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", textDecoration:"none", boxSizing:"border-box", textAlign:"center" }}>Enroll — $97 →</a>
                  </div>
                </div>
              )}
              <div style={{ border:"2px solid #8a7a5a", borderRadius:14, overflow:"hidden", background:"white" }}>
                <div style={{ background:"#8a7a5a", padding:"6px 16px" }}><div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"white", fontWeight:700 }}>✦ Launch Price — Save $100</div></div>
                <div style={{ padding:"16px 20px" }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:6 }}><span style={{ fontSize:34, fontWeight:800, color:"#111" }}>$197</span><span style={{ fontSize:14, color:"#aaa", textDecoration:"line-through" }}>$297</span></div>
                  <div style={{ fontSize:12, color:"#888", marginBottom:14 }}>Introductory pricing — will increase to $297</div>
                  <a href="https://buy.stripe.com/00wbJ153D9Pg7D2a6a77O08" target="_blank" rel="noreferrer" style={{ display:"block", width:"100%", padding:"13px", borderRadius:10, background:"#8a7a5a", color:"white", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", textDecoration:"none", boxSizing:"border-box", textAlign:"center" }}>Enroll — $197 →</a>
                </div>
              </div>
              <div style={{ fontSize:11, color:"#aaa" }}>Regular price: $297 · One-time payment · Lifetime access</div>
            </div>
            <div style={{ marginTop:24, fontSize:12, color:"#888" }}>Already enrolled? <button onClick={()=>setCoursePhase("protective")} style={{ background:"none", border:"none", color:"#8a7a5a", fontWeight:700, fontSize:12, cursor:"pointer", textDecoration:"underline" }}>Enter your access code</button></div>
            <button onClick={()=>setView("library")} style={{ marginTop:16, background:"none", border:"none", color:"#aaa", fontSize:12, cursor:"pointer" }}>← Back to Library</button>
          </div>
        </div>
      );
    }
    if (coursePhase === "name") return <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh", padding:"1.25rem" }}><NameEntry onComplete={(n,e)=>{ setStudentName(n); setStudentEmail(e); sessionStorage.setItem("ml_student_name", n); sessionStorage.setItem("ml_student_email", e); setCoursePhase("welcome"); }} /></div>;
    if (coursePhase === "welcome") return <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh", padding:"1.25rem" }}><WelcomeViewer onComplete={()=>{ sessionStorage.setItem("ml_course_intro_done", "true"); setIntroDone(true); setCoursePhase("chapters"); }} /></div>;
    if (coursePhase === "certificate") return <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh", padding:"1.25rem" }}><Certificate name={studentName||"Student"} date={completionDate} onReturn={()=>setCoursePhase("chapters")} /></div>;

    // Chapters
    const sections = [...new Set(CHAPTERS.map(c=>c.sec))];
    return (
      <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh" }}>
        <div style={{ background:"#0a0a0a", padding:"1rem 1.25rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:3 }}>4th Edition · 2022</div>
            <div style={{ fontSize:16, fontWeight:700, color:"#f5f0e8", fontFamily:"Georgia, serif" }}>الْمُخْلَصِينَ — The Mukhlasin Diet</div>
          </div>
          <button onClick={()=>setView("library")} style={{ background:"none", border:"1px solid #8a7a5a", color:"#8a7a5a", padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:12 }}>← Library</button>
        </div>
        <div style={{ padding:"1.25rem" }}>
          {/* Disclaimer — collapsible, never blocks access */}
          <div style={{ marginBottom:14, border:"1px solid #c0392b44", borderRadius:12, overflow:"hidden", background:"#fff8f8" }}>
            <button onClick={()=>setDisclaimerOpen(o=>!o)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#c0392b" }}>⚠ Important — Please Read</span>
              <span style={{ fontSize:13, color:"#c0392b", transform:disclaimerOpen?"rotate(180deg)":"none", transition:"transform 0.2s", display:"inline-block" }}>▾</span>
            </button>
            {disclaimerOpen && (
              <div style={{ padding:"4px 14px 14px", borderTop:"0.5px solid #c0392b33" }}>
                {PROTECTIVE.map((s,i)=>(
                  <div key={i} style={{ marginBottom:i<PROTECTIVE.length-1?14:0 }}>
                    <div style={{ fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c0392b", marginBottom:4 }}>{s.ey}</div>
                    {s.ti && <div style={{ fontSize:13, fontWeight:600, color:"#333", marginBottom:4, fontFamily:"Georgia, serif" }}>{s.ti}</div>}
                    {s.bo && <div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{s.bo}</div>}
                    {s.list && <div style={{ marginTop:4 }}>{s.list.map((item,li)=><div key={li} style={{ fontSize:11, color:"#555", lineHeight:1.5, padding:"2px 0" }}>• {item}</div>)}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Course progress */}
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#888", marginBottom:4 }}><span>Course Progress</span><span>{Math.round(((courseProgress+1)/CHAPTERS.length)*100)}%</span></div>
            <div style={{ height:4, background:"#e0d8cc", borderRadius:2 }}>
              <div style={{ width:`${Math.round(((courseProgress+1)/CHAPTERS.length)*100)}%`, height:"100%", background:"#8a7a5a", borderRadius:2 }} />
            </div>
          </div>
          {/* Section navigator */}
          <div style={{ marginBottom:16, border:"0.5px solid #e0d8cc", borderRadius:12, overflow:"hidden", background:"white" }}>
            {sections.map((sec,si)=>{
              const isOpen=!!openSections[sec];
              const chaptersInSec=CHAPTERS.filter(c=>c.sec===sec);
              const activeInSec=chaptersInSec.some(c=>CHAPTERS.indexOf(c)===activeMod);
              return (
                <div key={sec}>
                  <button onClick={()=>setOpenSections(prev=>({...prev,[sec]:!prev[sec]}))} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", background:activeInSec?"#f5f0e6":"white", border:"none", borderTop:si>0?"0.5px solid #e0d8cc":"none", cursor:"pointer", textAlign:"left" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:activeInSec?"#8a7a5a":"#ccc" }} />
                      <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:activeInSec?"#8a7a5a":"#666" }}>{sec}</span>
                    </div>
                    <span style={{ fontSize:13, color:"#8a7a5a", transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.2s", display:"inline-block" }}>▾</span>
                  </button>
                  {isOpen && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:5, padding:"8px 14px 12px", borderTop:"0.5px solid #e0d8cc", background:"#f5f0e6" }}>
                      {chaptersInSec.map(ch=>{
                        const idx=CHAPTERS.indexOf(ch); const isActive=activeMod===idx;
                        return <button key={ch.id} onClick={()=>setActiveMod(idx)} style={{ fontSize:10, padding:"5px 11px", borderRadius:20, cursor:"pointer", border:`1.5px solid ${isActive?"#8a7a5a":"#d0c8bc"}`, background:isActive?"#8a7a5a":"white", color:isActive?"white":"#555", fontWeight:isActive?700:400, whiteSpace:"nowrap" }}>{ch.label}</button>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Active chapter */}
          <div style={{ background:"white", borderRadius:12, padding:"1.25rem", border:"0.5px solid #e0d8cc" }}>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, color:"#8a7a5a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>{CHAPTERS[activeMod].sec}</div>
              <div style={{ fontSize:18, fontWeight:700, fontFamily:"Georgia, serif", color:"#111" }}>{CHAPTERS[activeMod].label}</div>
            </div>
            <ChapterViewer key={activeMod} chapter={CHAPTERS[activeMod]} />
          </div>
          {/* Nav */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:14 }}>
            <button onClick={()=>setActiveMod(i=>Math.max(0,i-1))} disabled={activeMod===0} style={{ padding:"8px 16px", borderRadius:20, border:"0.5px solid #e0d8cc", background:"white", cursor:activeMod===0?"not-allowed":"pointer", fontSize:12, color:activeMod===0?"#ccc":"#444" }}>← Previous</button>
            {activeMod < CHAPTERS.length-1
              ? <button onClick={()=>setActiveMod(i=>i+1)} style={{ padding:"8px 16px", borderRadius:20, border:"0.5px solid #e0d8cc", background:"#8a7a5a", cursor:"pointer", fontSize:12, color:"white", fontWeight:700 }}>Next Chapter →</button>
              : <button onClick={async()=>{ const d=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}); setCompletionDate(d); setCoursePhase("certificate"); }} style={{ padding:"10px 22px", borderRadius:20, background:"#8a7a5a", border:"none", cursor:"pointer", fontSize:13, color:"white", fontWeight:700 }}>✦ Complete the Course</button>
            }
          </div>
        </div>
      </div>
    );
  }

  // CERTIFICATE
  if (view === "certificate") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ maxWidth: "600px", width: "100%", background: C.dark, border: `2px solid ${C.gold}`, borderRadius: "16px", padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: C.muted, marginBottom: "1rem" }}>Certificate of Completion</div>
          <div style={{ color: C.gold, fontSize: "28px", marginBottom: "0.5rem" }}>الْمُخْلَصِينَ</div>
          <h1 style={{ color: C.cream, fontWeight: "normal", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Master of Fasting</h1>
          <div style={{ color: C.muted, fontSize: "13px", marginBottom: "2rem" }}>The Mukhlasin Diet Course — 4th Edition</div>
          <p style={{ color: C.slate, lineHeight: 1.8, marginBottom: "2rem", fontSize: "14px" }}>This certifies the completion of The Mukhlasin Diet Course and the acceptance of its discipline. The real certificate is written on the face of the practitioner.</p>
          <div style={{ color: C.goldLight, fontSize: "15px", marginBottom: "2rem", fontStyle: "italic" }}>— Amin Shabazz Muhammad</div>
          <button onClick={() => setView("library")} style={{ background: C.gold, color: C.dark, border: "none", padding: "12px 28px", borderRadius: "24px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>Return to Library</button>
        </div>
      </div>
    );
  }

  // CONSULT
  if (view === "consult") {
    return (
      <div style={{ minHeight:"100vh", background:"#faf8f5", fontFamily:"sans-serif" }}>
        <div style={{ background:"#0a0a0a", borderBottom:"1px solid #2a2520", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <button onClick={()=>setView(hasAccess?"library":"landing")} style={{ background:"none", border:"1px solid #8a7a5a", color:"#8a7a5a", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px" }}>←</button>
          <div style={{ color:"#c8b080", fontSize:16 }}>Book a Consultation</div>
        </div>
        <div style={{ maxWidth:600, margin:"0 auto", padding:"2.5rem 1.5rem" }}>
          {consultSent ? (
            <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
              <div style={{ fontSize:48, marginBottom:"1rem" }}>✓</div>
              <div style={{ color:"#111", fontSize:"1.3rem", marginBottom:"1rem" }}>Details Received</div>
              <p style={{ color:"#555", lineHeight:1.7 }}>Your consultation details have been submitted. The author will be in touch to confirm your appointment.</p>
              <button onClick={()=>setView(hasAccess?"library":"landing")} style={{ marginTop:"2rem", background:"#0a0a0a", color:"#8a7a5a", border:"none", padding:"12px 28px", borderRadius:"24px", cursor:"pointer" }}>Return</button>
            </div>
          ) : !consultPaidService ? (
            <div>
              <h1 style={{ color:"#111", fontSize:"1.5rem", fontWeight:"normal", marginBottom:"0.5rem", fontFamily:"Georgia, serif" }}>Personal Consultation</h1>
              <p style={{ color:"#555", fontSize:13, lineHeight:1.75, marginBottom:"1.5rem" }}>Select your session below and complete payment. Once paid, click "I've already paid" to submit your details and question.</p>
              <div style={{ background:"#0a0a0a", borderRadius:12, padding:"1rem", marginBottom:"1.5rem" }}>
                <div style={{ fontSize:11, color:"#8a7a5a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Why payment first?</div>
                <div style={{ fontSize:12, color:"#6a6050", lineHeight:1.65 }}>The author's time is his most valuable resource. Payment confirms your commitment and ensures your session is prepared specifically for you.</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:"1.5rem" }}>
                {CONSULTATIONS.map(c=>(
                  <div key={c.id} style={{ background:"white", border:"1.5px solid #e0d8cc", borderRadius:12, padding:"1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, color:"#111", marginBottom:2 }}>{c.label}</div>
                      <div style={{ fontSize:12, color:"#6a6050" }}>{c.duration}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:11, color:"#aaa", textDecoration:"line-through" }}>${c.publicPrice} public</div>
                        <div style={{ fontSize:16, fontWeight:700, color:"#4a7c5e" }}>${c.memberPrice} member</div>
                      </div>
                      <a href={c.stripe} target="_blank" rel="noreferrer" style={{ display:"inline-block", padding:"10px 18px", background:"#8a7a5a", color:"white", borderRadius:20, textDecoration:"none", fontSize:13, fontWeight:700, whiteSpace:"nowrap" }}>Pay Now →</a>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:20, textAlign:"center" }}>
                <button onClick={()=>setConsultPaidService("paid")} style={{ background:"none", border:"none", color:"#8a7a5a", fontSize:12, cursor:"pointer", textDecoration:"underline" }}>I've already paid — continue to form</button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ background:"#f5f0e6", border:"1px solid #8a7a5a", borderRadius:10, padding:"0.875rem 1rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ fontSize:18, color:"#4a7c5e" }}>✓</div>
                <div style={{ fontSize:13, color:"#333" }}>Payment confirmed. Please fill in your details below.</div>
              </div>
              <h2 style={{ color:"#111", fontSize:"1.1rem", fontWeight:"normal", marginBottom:"1rem", fontFamily:"Georgia, serif" }}>Your Consultation Details</h2>
              <div style={{ marginBottom:"1rem" }}>
                <label style={{ display:"block", color:"#444", fontSize:13, marginBottom:6 }}>Full Name *</label>
                <input type="text" value={consultForm.name} onChange={e=>setConsultForm({...consultForm,name:e.target.value})} style={{ width:"100%", padding:"10px 14px", border:"1px solid #e0d8cc", borderRadius:8, fontSize:14, boxSizing:"border-box", fontFamily:"sans-serif" }} />
              </div>
              <div style={{ marginBottom:"1rem" }}>
                <label style={{ display:"block", color:"#444", fontSize:13, marginBottom:6 }}>Email Address *</label>
                <input type="email" value={consultForm.email} onChange={e=>setConsultForm({...consultForm,email:e.target.value})} style={{ width:"100%", padding:"10px 14px", border:"1px solid #e0d8cc", borderRadius:8, fontSize:14, boxSizing:"border-box", fontFamily:"sans-serif" }} />
              </div>
              <div style={{ marginBottom:"1rem" }}>
                <label style={{ display:"block", color:"#444", fontSize:13, marginBottom:6 }}>Service Purchased *</label>
                <select value={consultForm.service} onChange={e=>setConsultForm({...consultForm,service:e.target.value})} style={{ width:"100%", padding:"10px 14px", border:"1px solid #e0d8cc", borderRadius:8, fontSize:14, fontFamily:"sans-serif" }}>
                  <option value="">Select the service you paid for...</option>
                  {CONSULTATIONS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:"1rem" }}>
                <label style={{ display:"block", color:"#444", fontSize:13, marginBottom:6 }}>Preferred Days / Times</label>
                <input type="text" value={consultForm.preferred||""} onChange={e=>setConsultForm({...consultForm,preferred:e.target.value})} placeholder="e.g. Weekday mornings, Saturday afternoons" style={{ width:"100%", padding:"10px 14px", border:"1px solid #e0d8cc", borderRadius:8, fontSize:14, boxSizing:"border-box", fontFamily:"sans-serif" }} />
              </div>
              <div style={{ marginBottom:"1.5rem" }}>
                <label style={{ display:"block", color:"#444", fontSize:13, marginBottom:6 }}>Your Question or Topic *</label>
                <textarea value={consultForm.message} onChange={e=>setConsultForm({...consultForm,message:e.target.value})} rows={5} style={{ width:"100%", padding:"10px 14px", border:"1px solid #e0d8cc", borderRadius:8, fontSize:14, boxSizing:"border-box", fontFamily:"sans-serif", resize:"vertical" }} placeholder="Describe your situation or what you'd like to discuss..." />
              </div>
              <button onClick={()=>{ if(!consultForm.name||!consultForm.email||!consultForm.message){ alert("Please fill in your name, email, and question."); return; } setConsultSent(true); }} style={{ width:"100%", background:"#0a0a0a", color:"#8a7a5a", border:"none", padding:"14px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700 }}>Submit Details →</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // LIBRARY
  if (view === "library") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
        <div style={{ background: C.dark, borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>Mastery Level Fasting Platform</div>
            <div style={{ color: C.goldLight, fontSize: "16px" }}>Your Library</div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={() => setView("consult")} style={{ background: "none", border: `1px solid ${C.gold}`, color: C.gold, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }}>Book Consultation</button>
            <button onClick={() => { sessionStorage.clear(); setHasAccess(false); setView("landing"); }} style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }}>Sign Out</button>
          </div>
        </div>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ background: "#0d0b08", border: `1px solid ${C.gold}`, borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ fontSize: "28px" }}>🌙</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.goldLight, fontWeight: "bold", marginBottom: "2px" }}>Monthly 72-Hour Community Fast</div>
              <div style={{ color: C.muted, fontSize: "13px" }}>First Friday–Sunday of every month · Fast together, grow together</div>
            </div>
            <a href="/community" style={{ background: C.gold, color: C.dark, padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}>Active Community →</a>
          </div>

          <h2 style={{ color: C.dark, fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: "normal" }}>Your Books</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {BOOKS.map(book => {
              const lastChapter = progress[book.id] || 0;
              const pct = Math.round((lastChapter / book.chapters.length) * 100);
              return (
                <div key={book.id} style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <img src={book.cover} alt={book.title} style={{ width: "100%", height: "auto", display: "block" }} />
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ color: C.dark, fontWeight: "bold", fontSize: "15px", marginBottom: "2px" }}>{book.title}</div>
                    <div style={{ color: C.muted, fontSize: "12px", marginBottom: "10px" }}>{book.subtitle}</div>
                    <p style={{ color: "#444", fontSize: "13px", lineHeight: 1.6, marginBottom: "1rem" }}>{book.description}</p>
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: C.muted, marginBottom: "4px" }}><span>Progress</span><span>{pct}%</span></div>
                      <div style={{ height: "4px", background: C.borderLight, borderRadius: "2px" }}>
                        <div style={{ width: pct + "%", height: "100%", background: C.gold, borderRadius: "2px" }} />
                      </div>
                    </div>
                    <div style={{ maxHeight: "160px", overflowY: "auto", marginBottom: "1rem" }}>
                      {book.chapters.map((ch, i) => (
                        <button key={ch.id} onClick={() => { setActiveBook(book.id); setActiveChapter(i); setView("reader"); }} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", background: "none", border: "none", textAlign: "left", padding: "6px 4px", cursor: "pointer", borderBottom: `1px solid ${C.borderLight}`, color: i <= lastChapter ? C.dark : "#999", fontSize: "13px" }}>
                          <span style={{ color: i < lastChapter ? C.green : C.muted, fontSize: "12px", width: "16px" }}>{i < lastChapter ? "✓" : (i + 1) + "."}</span>
                          {ch.title}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => { setActiveBook(book.id); setActiveChapter(lastChapter); setView("reader"); }} style={{ width: "100%", background: C.dark, color: C.gold, border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
                      {lastChapter === 0 ? "Start Reading →" : `Continue — Chapter ${lastChapter + 1}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 style={{ color: C.dark, fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: "normal" }}>The Course</h2>
          <div style={{ background: C.dark, borderRadius: "12px", padding: "1.5rem", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.goldLight, fontSize: "1.1rem", marginBottom: "4px" }}>The Mukhlasin Diet — Complete Course</div>
                <div style={{ color: C.muted, fontSize: "13px" }}>{CHAPTERS.length} chapters · Slides · Q&A · Certificate of Completion</div>
              </div>
              <button onClick={() => { setActiveMod(0); setActiveSlide(0); setCoursePhase(introDone ? "chapters" : "name"); setView("course"); }} style={{ background: C.gold, color: C.dark, border: "none", padding: "10px 20px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>Enter Course →</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
              {CHAPTERS.map((m, i) => (
                <button key={m.id} onClick={() => { setActiveMod(i); setView("course"); setCoursePhase("chapters"); }} style={{ background: "#1a1612", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "0.75rem", textAlign: "left", cursor: "pointer" }}>
                  <div style={{ color: C.gold, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Module {m.id}</div>
                  <div style={{ color: C.slate, fontSize: "12px", lineHeight: 1.4 }}>{m.title}</div>
                </button>
              ))}
            </div>
          </div>

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

  // LANDING
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
      <div style={{ background: C.dark, color: C.slate, padding: "4rem 1.5rem 5rem", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: C.muted, marginBottom: "1rem" }}>Celebrating 30+ Years of Fasting</div>
        <div style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.gold, fontFamily: "serif", marginBottom: "0.5rem" }}>الْحِمِيَةُ الْمُخْلَصِينَ</div>
        <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: C.cream, fontWeight: "normal", marginBottom: "1rem" }}>Mastery Level Fasting Platform</h1>
        <p style={{ maxWidth: "560px", margin: "0 auto 2.5rem", color: C.muted, lineHeight: 1.8, fontSize: "15px" }}>Two books. One course. A monthly community fast. Personal consultations. All in one place.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPaywallOpen(true)} style={{ background: C.gold, color: C.dark, border: "none", padding: "14px 32px", borderRadius: "30px", cursor: "pointer", fontSize: "15px", fontWeight: "bold" }}>Access the Platform →</button>
          <button onClick={() => setView("consult")} style={{ background: "transparent", color: C.gold, border: `1px solid ${C.gold}`, padding: "14px 32px", borderRadius: "30px", cursor: "pointer", fontSize: "15px" }}>Book a Consultation</button>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Book Covers - FULL images, no cropping */}
        <h2 style={{ textAlign: "center", color: C.dark, fontWeight: "normal", fontSize: "1.4rem", marginBottom: "2rem" }}>The Books</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {BOOKS.map(book => (
            <div key={book.id} style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <img src={book.cover} alt={book.title} style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "1.5rem" }}>
                <div style={{ color: C.dark, fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}>{book.title}</div>
                <div style={{ color: C.muted, fontSize: "12px", marginBottom: "10px" }}>{book.tagline}</div>
                <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6, marginBottom: "1.25rem" }}>{book.description}</p>
                <button onClick={() => setPaywallOpen(true)} style={{ width: "100%", background: C.dark, color: C.gold, border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Read Now →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <h2 style={{ textAlign: "center", color: C.dark, fontWeight: "normal", fontSize: "1.5rem", marginBottom: "0.5rem" }}>What's Inside</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginBottom: "2.5rem" }}>Everything in one place.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {[
            { icon: "📖", title: "Two Books", desc: "The Mukhlasin Diet 4th Edition and Mastery Level Fasting — full text, chapter by chapter." },
            { icon: "▶", title: "Read Aloud", desc: "Every chapter and every course slide can be read aloud. Listen while you cook, drive, or rest." },
            { icon: "🎓", title: "Complete Course", desc: "9 modules with slides, Q&A, and Master of Fasting certificate." },
            { icon: "🌙", title: "Monthly Community Fast", desc: "Join the 72-hour fast every first Friday–Sunday. Share your experience." },
            { icon: "📝", title: "Author Teachings", desc: "Articles and reflections from Amin Shabazz Muhammad." },
            { icon: "📞", title: "Personal Consultations", desc: "One-on-one email, phone, or video sessions. Members receive discounted rates." },
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
              <div style={{ color: C.gold, fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2px" }}>{tier.price}</div>
              <div style={{ color: tier.highlight ? C.muted : "#888", fontSize: "12px", marginBottom: "1.25rem" }}>{tier.altPrice}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem" }}>
                {tier.features.map(f => (
                  <li key={f} style={{ color: tier.highlight ? C.slate : "#444", fontSize: "13px", lineHeight: 1.6, marginBottom: "6px", paddingLeft: "18px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: C.gold }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={tier.stripe} style={{ display: "block", textAlign: "center", background: tier.highlight ? C.gold : C.dark, color: tier.highlight ? C.dark : C.gold, padding: "11px", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>
                {tier.oneTime ? "Enroll Now" : "Subscribe →"}
              </a>
            </div>
          ))}
        </div>

        {/* Author */}
        <div style={{ background: C.dark, borderRadius: "16px", padding: "2.5rem", textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1rem" }}>About the Author</div>
          <h2 style={{ color: C.goldLight, fontWeight: "normal", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Amin Shabazz Muhammad</h2>
          <p style={{ color: C.slate, lineHeight: 1.9, maxWidth: "620px", margin: "0 auto", fontSize: "14px" }}>{BIO}</p>
        </div>

        <div style={{ textAlign: "center", paddingBottom: "3rem" }}>
          <button onClick={() => setView("consult")} style={{ background: "none", border: `1px solid ${C.borderLight}`, color: "#888", padding: "10px 24px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", marginBottom: "1rem" }}>Book a Consultation</button>
          <div style={{ color: C.muted, fontSize: "12px" }}>Already enrolled? <span style={{ color: C.gold, cursor: "pointer", textDecoration: "underline" }} onClick={() => setPaywallOpen(true)}>Sign in here</span></div>
        </div>
      </div>

      {/* Paywall Modal */}
      {paywallOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
          <div style={{ background: C.dark, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "2.5rem", maxWidth: "420px", width: "100%", position: "relative" }}>
            <button onClick={() => setPaywallOpen(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: C.muted, fontSize: "20px", cursor: "pointer" }}>×</button>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ color: C.gold, fontSize: "22px", marginBottom: "4px" }}>الْمُخْلَصِينَ</div>
              <div style={{ color: C.cream, fontSize: "1.1rem" }}>Access the Platform</div>
            </div>
            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEmailSubmit()} style={{ width: "100%", padding: "12px 16px", background: "#1a1612", border: `1px solid ${C.border}`, borderRadius: "8px", color: C.cream, fontSize: "14px", boxSizing: "border-box", fontFamily: "Georgia, serif", marginBottom: "1rem" }} />
            <button onClick={handleEmailSubmit} disabled={sending} style={{ width: "100%", background: C.gold, color: C.dark, border: "none", padding: "12px", borderRadius: "8px", cursor: sending ? "wait" : "pointer", fontSize: "14px", fontWeight: "bold", marginBottom: "1rem" }}>
              {sending ? "Sending..." : "Send Magic Link →"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1rem 0" }}>
              <div style={{ flex: 1, height: "1px", background: C.border }} />
              <span style={{ color: C.muted, fontSize: "12px" }}>or enter access code</span>
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
                  <a key={tier.id} href={tier.stripe} style={{ display: "block", background: "#1a1612", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 8px", textDecoration: "none", textAlign: "center" }}>
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
