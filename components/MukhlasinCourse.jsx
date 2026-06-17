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
      { id: 1, title: "Defining Fasting", content: "A great part of undertaking any form of discipline is clear definition.\n\nFast: means to move or produce at a high rate of speed.\n\nOMAD (One Meal A Day): means to eat one meal within a 24-hour period, with NOTHING between meals but water or coffee.\n\nOME2D (One Meal Every Two Days): means to eat one meal within a 48-hour period.\n\nOME3D (One Meal Every Three Days): means to eat one meal within a 72-hour period.\n\nThere is no human being that has good health and longevity in irregular, and unregulated eating habits." },
      { id: 2, title: "Caloric Restriction", content: "US Funded Studies into Caloric Restriction on Rhesus Macaque monkeys began circa 1935, with the goal of scientifically understanding how the application affects humans.\n\nThe nutritional value of foods today is not the same as it was prior to the mass industrialization of food industries.\n\nIn America, we have been conditioned to think of 3rd World Countries and babies with distended bellies as malnutrition. But a distended belly from eating nutrient-deficient foods grown using pesticides is actually what we are experiencing here in the West." },
      { id: 3, title: "Intermittent Fasting", content: "The term intermittent fasting is a misnomer for what we are truly attempting to accomplish.\n\nIn America circa 1990, doctors were instructed to teach patients that a healthy diet consisted of 5 to 7 meals per day. The results are evident on the population.\n\nWherever a native people maintain their traditional diets, they maintain their health far better than when their diets are replaced by the Western style of eating.\n\nIntermittent Fasting is a step in the process of establishing the most basic beginning level of Mastery Level Fasting — One Meal A Day." },
      { id: 4, title: "One Meal A Day (OMAD)", content: "One Meal A Day is the foundation of the Mukhlasin dietary practice. It is not extreme. It is the natural, designed function of the human body.\n\nThe human digestive system requires a minimum of 24 hours to fully process a properly composed meal. When we interrupt this process by introducing new food before the previous meal has been fully processed, we create chronic digestive stress.\n\nOMAD — practiced correctly — eliminates this stress. Between meals: water and coffee only. Nothing else." },
      { id: 5, title: "Fasting Effects on Chronic Injury & Pain", content: "When I was a preteen, I discovered that I had the unique gift of Photographic Reflexes. This allowed me to become the first person in Minnesota to learn, perform and teach Break Dancing at a professional level — at 13 years old.\n\nBy the time I was 19, my health was ruined. I broke my leg repeatedly. The pain was diagnosed as Osteoid Osteoma — an extremely painful bone tumor.\n\nDuring my very first three-day fast, on the first three days of 1994, I noticed that I was completely pain free for the first time in years." },
      { id: 6, title: "One Meal Every Two Days (OME2D)", content: "One Meal Every Two Days is considered a higher level of practice. Practiced correctly, it results in the slowing of the aging process and has a profound effect upon healing and pain management.\n\nPrince once told The New Power Generation that I always look like I am standing under the spotlight. Once I transitioned to One Meal Every Three Days, Prince invited me to Paisley Park. He was so inspired by the Light he saw, that he became a Vegan.\n\nThe Glow dwells within a vessel only so long as they are in harmony with the natural laws of Creation." },
      { id: 7, title: "One Meal Every Three Days (OME3D)", content: "One Meal Every Three Days is considered the level of complete Self Mastery. This discipline will increase the lifespan of the practitioners, reverse the apparent age of the person, and elevate them into the highest degree of consciousness.\n\nThe Prophet David practiced One Meal Every Two Days. The Prophet Jesus fasted for 40 days in the wilderness. The Buddha spent six years practicing various degrees of fasting as a means of purification.\n\nA word of caution: this level is not a starting point. The practitioner must master each level before ascending to the next." },
      { id: 8, title: "Epilogue", content: "At the present time, I am 57 years old. I have practiced this discipline for over 30 years.\n\nI look and feel younger than those who are ten to twenty years my junior. I have not changed much in physical appearance since I was 24. My weight has been constant.\n\nThe Glow is not mine alone. It is the birthright of every human being who is willing to do what is required to receive it.\n\nWhat was once a closely guarded secret of the Highest Order of the Ancient Mystery Systems of Asia is now available to any who would desire to benefit from this wisdom.\n\n— Amin Shabazz Muhammad" },
    ]
  }
];

const CONSULTATIONS = [
  { id: "email", label: "Email Consultation", duration: "Written response within 48hrs", publicPrice: 49, memberPrice: 35 },
  { id: "phone30", label: "30-Min Phone Session", duration: "30 minutes", publicPrice: 97, memberPrice: 75 },
  { id: "phone60", label: "60-Min Phone Session", duration: "60 minutes", publicPrice: 175, memberPrice: 125 },
  { id: "video60", label: "60-Min Video Session", duration: "60 minutes via video call", publicPrice: 197, memberPrice: 150 },
];

const TIERS = [
  { id: "books", name: "Books Only", price: "$9.99/mo", altPrice: "$79/yr", oneTime: false, stripe: "https://buy.stripe.com/fZubJ10Nn0eG5uUfqu77O0b", features: ["Both books — full digital reader", "Read-aloud on every chapter", "Progress tracking", "Monthly 72-Hour Fast community", "New editions automatically included"], highlight: false },
  { id: "course", name: "Course Only", price: "$297", altPrice: "one time · lifetime access", oneTime: true, stripe: "https://buy.stripe.com/00wbJ153D9Pg7D2a6a77O08", features: ["Complete Mukhlasin Diet Course", "All 9 modules with slides", "Course Q&A", "Master of Fasting", "Lifetime access"], highlight: false },
  { id: "complete", name: "Complete Library", price: "$19.99/mo", altPrice: "$149/yr", oneTime: false, stripe: "https://buy.stripe.com/3cI8wPbs18Lc6yY3HM77O0d", features: ["Both books — full digital reader", "Read-aloud on every chapter", "Complete Mukhlasin Diet Course", "All certificates", "Monthly 72-Hour Fast community", "Ramadan seasonal content", "Author articles & teachings", "Member consultation rates"], highlight: true },
  { id: "lifetime", name: "Complete Library", badge: "Lifetime", price: "$497", altPrice: "one time · never pay again", oneTime: true, stripe: "https://buy.stripe.com/7sYcN50NnaTk3mM4LQ77O0f", features: ["Everything in Complete Library", "Lifetime access — no recurring billing", "One complimentary 30-min consultation", "Discounted consultation rates forever", "Early access to all new titles", "Priority author Q&A"], highlight: false },
];

const FREE_CODES = { "SADAQAH": true, "ADMINTEST": true };


// ── SLIDE COMPONENT ──────────────────────────────────────────
function PhoneSlide({ s, current, total }) {
  return (
    <div style={{ width:"100%", height:"100%", background:s.refl?"#0d0b08":"#0a0a0a", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"2rem 1.5rem", textAlign:"center", position:"relative" }}>
      {s.refl && <div style={{ fontSize:22, color:"#8a7a5a", marginBottom:10 }}>◈</div>}
      {s.ar && <div style={{ fontSize:14, color:"#8a7a5a", marginBottom:8, direction:"rtl", fontFamily:"serif", lineHeight:1.6 }}>{s.ar}</div>}
      {s.ey && <div style={{ fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"#8a7a5a", marginBottom:8, fontFamily:"sans-serif" }}>{s.ey}</div>}
      {s.ti && <div style={{ fontSize:17, fontWeight:600, color:"#f5f0e8", lineHeight:1.35, fontFamily:"Georgia, serif", marginBottom:8, whiteSpace:"pre-line" }}>{s.ti}</div>}
      {!s.refl && !s.ti && <div style={{ width:28, height:2, background:"#8a7a5a", margin:"0 auto 8px" }} />}
      {s.qt && <div style={{ fontSize:11, color:"#c8c0b0", lineHeight:1.8, fontStyle:"italic", fontFamily:"Georgia, serif", borderLeft:"2px solid #8a7a5a", paddingLeft:10, textAlign:"left" }}>{s.qt}</div>}
      {s.at && <div style={{ fontSize:10, color:"#6a6050", marginTop:6, textAlign:"left", fontFamily:"sans-serif" }}>{s.at}</div>}
      {s.bo && <div style={{ fontSize:12, color:"#c8c0b0", lineHeight:1.75, fontFamily:"sans-serif", whiteSpace:"pre-line" }}>{s.bo}</div>}
      {s.list && <div style={{ width:"100%", marginTop:4 }}>{s.list.map((item,i)=><div key={i} style={{ fontSize:11, color:"#c8c0b0", lineHeight:1.6, textAlign:"left", padding:"3px 0", borderBottom:i<s.list.length-1?"0.5px solid #3a3530":"none" }}>• {item}</div>)}</div>}
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
          <div style={{ width:280, height:497, borderRadius:28, border:"2px solid #2a2a2a", overflow:"hidden" }}>
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
      <div style={{ width:280, height:497, background:"#0f0808", borderRadius:28, border:"2px solid #3a1a1a", overflow:"hidden", position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"2rem 1.5rem", textAlign:"center" }}>
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
      <div style={{ width:280, height:497, background:"#0a0a0a", borderRadius:28, border:"2px solid #2a2a2a", overflow:"hidden", position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"2rem 1.5rem", textAlign:"center" }}>
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
          <img src="/mukhlasin-cover.jpg" alt="The Mukhlasin Diet" style={{ width:80, height:"auto", borderRadius:8 }} />
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
  const [paywallOpen, setPaywallOpen] = useState(false);
  const hasBypass = checkBypass();
  const [coursePhase, setCoursePhase] = useState(hasBypass ? "protective" : "paywall");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const access = sessionStorage.getItem("ml_access");
    if (access === "true") { setHasAccess(true); setView("library"); }
    const saved = sessionStorage.getItem("ml_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

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
              {RAMADAN_ACTIVE && (
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
    if (coursePhase === "protective") return <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh", padding:"1.25rem" }}><ProtectiveSlides onComplete={()=>setCoursePhase("name")} /></div>;
    if (coursePhase === "name") return <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh", padding:"1.25rem" }}><NameEntry onComplete={(n,e)=>{ setStudentName(n); setStudentEmail(e); setCoursePhase("welcome"); }} /></div>;
    if (coursePhase === "welcome") return <div style={{ maxWidth:680, margin:"0 auto", fontFamily:"sans-serif", background:"#faf8f5", minHeight:"100vh", padding:"1.25rem" }}><WelcomeViewer onComplete={()=>setCoursePhase("chapters")} /></div>;

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
              <p style={{ color: "#555", lineHeight: 1.7 }}>Thank you. Your consultation request has been submitted. You will receive a response within 48 hours.</p>
              <button onClick={() => setView(hasAccess ? "library" : "landing")} style={{ marginTop: "2rem", background: C.dark, color: C.gold, border: "none", padding: "12px 28px", borderRadius: "24px", cursor: "pointer" }}>Return</button>
            </div>
          ) : (
            <>
              <h1 style={{ color: C.dark, fontSize: "1.5rem", fontWeight: "normal", marginBottom: "0.5rem" }}>Personal Consultation</h1>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7, marginBottom: "2rem" }}>One-on-one consultations by email, phone, and video. All responses draw on 30+ years of direct practice experience.</p>
              <div style={{ background: C.dark, borderRadius: "12px", padding: "1.25rem", marginBottom: "2rem" }}>
                <div style={{ color: C.goldLight, fontSize: "14px", marginBottom: "1rem" }}>Consultation Rates</div>
                {CONSULTATIONS.map(c => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: "13px" }}>
                    <div><span style={{ color: C.slate }}>{c.label}</span><span style={{ color: C.muted, marginLeft: "8px" }}>({c.duration})</span></div>
                    <div><span style={{ color: C.muted, textDecoration: "line-through", marginRight: "8px" }}>${c.publicPrice}</span><span style={{ color: C.goldLight, fontWeight: "bold" }}>Member ${c.memberPrice}</span></div>
                  </div>
                ))}
                <div style={{ color: C.muted, fontSize: "12px", marginTop: "12px" }}>Lifetime members receive one complimentary 30-min consultation.</div>
              </div>
              {["name", "email"].map(field => (
                <div key={field} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#444", fontSize: "13px", marginBottom: "6px", textTransform: "capitalize" }}>{field} *</label>
                  <input type={field === "email" ? "email" : "text"} value={consultForm[field]} onChange={e => setConsultForm({ ...consultForm, [field]: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borderLight}`, borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
                </div>
              ))}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#444", fontSize: "13px", marginBottom: "6px" }}>Service *</label>
                <select value={consultForm.service} onChange={e => setConsultForm({ ...consultForm, service: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borderLight}`, borderRadius: "8px", fontSize: "14px", fontFamily: "Georgia, serif" }}>
                  <option value="">Select a service...</option>
                  {CONSULTATIONS.map(c => <option key={c.id} value={c.id}>{c.label} — ${hasAccess ? c.memberPrice : c.publicPrice}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", color: "#444", fontSize: "13px", marginBottom: "6px" }}>Your Question or Topic</label>
                <textarea value={consultForm.message} onChange={e => setConsultForm({ ...consultForm, message: e.target.value })} rows={4} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borderLight}`, borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "Georgia, serif", resize: "vertical" }} placeholder="Briefly describe your situation or what you'd like to discuss..." />
              </div>
              <button onClick={() => { if (!consultForm.name || !consultForm.email || !consultForm.service) { alert("Please fill in all required fields."); return; } setConsultSent(true); }} style={{ width: "100%", background: C.dark, color: C.gold, border: "none", padding: "14px", borderRadius: "10px", cursor: "pointer", fontSize: "15px" }}>Submit Request →</button>
            </>
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
          <div style={{ display: "flex", gap: "0.75rem" }}>
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
            <div style={{ background: C.gold, color: C.dark, padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>Active Community</div>
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
              <button onClick={() => { setActiveMod(0); setActiveSlide(0); setView("course"); }} style={{ background: C.gold, color: C.dark, border: "none", padding: "10px 20px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>Enter Course →</button>
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
