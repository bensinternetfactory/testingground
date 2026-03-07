export type TestimonialReview = {
  id: string;
  title: string;
  body: string;
  author: string;
  rating: 5;
  source: "Google";
};

const ALL_REVIEWS: TestimonialReview[] = [
  {
    id: "keith-ristow",
    title: "What an easy process this was",
    body: "What an easy process this was! I have been in business for over 30 years and this is one of the easiest and most informative financing processes I have been through. I'd like to thank the Tow Loans team for making this process easy and informative. Thank you very much.",
    author: "Keith Ristow",
    rating: 5,
    source: "Google",
  },
  {
    id: "glen-woodard",
    title: "They always treat me fair and always\u2026",
    body: "They always treat me fair and always communicate well. Tow Loans does great work.",
    author: "Glen Woodard",
    rating: 5,
    source: "Google",
  },
  {
    id: "diljot-k",
    title: "Tow Loans is awesome to work with",
    body: "Tow Loans is awesome to work with. Me and my husband are both returning clients. They went into detail regarding my lending options and offered me a great rate for my trucks and trailer. They are truly helpful and very responsive to any of our questions and concerns. Highly recommend working with Tow Loans.",
    author: "Diljot K",
    rating: 5,
    source: "Google",
  },
  {
    id: "maurice-alford",
    title: "Need a deal done ask for Tow Loans\u2026",
    body: "Need a deal done, ask for Tow Loans. Very quick, and I financed my second tow truck.",
    author: "Maurice Alford",
    rating: 5,
    source: "Google",
  },
  {
    id: "deborah-gentry",
    title: "Tow Loans financed the buyer of\u2026",
    body: "Tow Loans financed the buyer of our truck and did a great job. They saw things through until the end and finalized everything in 3 days.\n\nI would differently consider them to my financing of purchasing trucks and equipment",
    author: "Deborah Gentry",
    rating: 5,
    source: "Google",
  },
  {
    id: "rudy-montes",
    title: "Outstanding service from Tow Loans",
    body: "As a newbie in the truck-buying process for my towing business, Tow Loans was professional, patient, and clear at every step. They made the transaction smooth and gave me confidence throughout.",
    author: "Rudy Montes",
    rating: 5,
    source: "Google",
  },
  {
    id: "phantom-troop-transport-llc",
    title: "Tow Loans and the team went above\u2026",
    body: "Tow Loans and the team went above and beyond for me. They communicated clearly so I could understand every step, answered all my questions in a timely and professional manner, and helped me finance my equipment.",
    author: "Phantom Troop Transport LLC",
    rating: 5,
    source: "Google",
  },
  {
    id: "seattle-road-warrior",
    title: "Tow Loans was really helpful the whole time\u2026",
    body: "Tow Loans was really helpful the whole time and made it all go smoothly. I'll be back for my next truck too!",
    author: "Seattle Road Warrior",
    rating: 5,
    source: "Google",
  },
  {
    id: "stefan-dimoski",
    title: "Great service",
    body: "Tow Loans did great, was attentive and very professional, and handled everything in a timely manner. I'm very satisfied with the service I received and will definitely recommend my friends to work with Tow Loans.",
    author: "Stefan Dimoski",
    rating: 5,
    source: "Google",
  },
  {
    id: "mahesh-bandara",
    title: "Great working with Tow Loans",
    body: "Great working with Tow Loans. They did a good job and were available at all times to answer questions.",
    author: "Mahesh Bandara",
    rating: 5,
    source: "Google",
  },
  {
    id: "isaac",
    title: "Hands down Tow Loans was fantastic\u2026",
    body: "Hands down Tow Loans was fantastic and understands what it takes to get owner-operators going. I'll be doing all my business with Tow Loans for sure.",
    author: "Isaac",
    rating: 5,
    source: "Google",
  },
  {
    id: "dalton-weirich",
    title: "Tow Loans was very helpful and made the\u2026",
    body: "Tow Loans was very helpful and made the deal happen.",
    author: "Dalton Weirich",
    rating: 5,
    source: "Google",
  },
  {
    id: "james-lee",
    title: "Tow Loans was patient and dedicated\u2026",
    body: "Tow Loans was patient with me, very dedicated, and treated me better than family. Very satisfied.",
    author: "James Lee",
    rating: 5,
    source: "Google",
  },
  {
    id: "quality-crew",
    title: "Tow Loans",
    body: "We've worked with Tow Loans on multiple occasions for our business purchases, and they've consistently gone above and beyond. They're knowledgeable, responsive, and genuinely invested in helping us find the best financing options to support our company's growth.\nHighly recommend working with Tow Loans if you're looking for a financing company that treats you like more than just a transaction.",
    author: "Quality Crew",
    rating: 5,
    source: "Google",
  },
  {
    id: "sam-rosenbaum",
    title: "Tow Loans is the Best!",
    body: "I've been working with Tow Loans for years now and they are hands down the best. Very knowledgeable, communicative, and easy to work with.",
    author: "Sam Rosenbaum",
    rating: 5,
    source: "Google",
  },
  {
    id: "reiselt",
    title: "Great company to work with",
    body: "Great company to work with, super easy and fast. Tow Loans was great and super helpful.",
    author: "Reiselt",
    rating: 5,
    source: "Google",
  },
  {
    id: "chad",
    title: "Tow Loans is the best financial partner\u2026",
    body: "Tow Loans is the best financial partner I have ever worked with. The paperwork is quick and they are great at what they do.",
    author: "Chad",
    rating: 5,
    source: "Google",
  },
  {
    id: "jacqueline-moore",
    title: "These Guys was awesome working\u2026",
    body: "These guys were awesome to work with and helped me get my first commercial trailer. Financing was fast, done in a couple of days, and I highly recommend Tow Loans.",
    author: "Jacqueline Moore",
    rating: 5,
    source: "Google",
  },
  {
    id: "joe-patsko",
    title: "Great Resource!",
    body: "I worked with Tow Loans this month to finance a used piece of equipment. They were an incredible resource and very professional. I will continue to use Tow Loans for all future financing opportunities.",
    author: "Joe Patsko",
    rating: 5,
    source: "Google",
  },
  {
    id: "john",
    title: "Tow Loans did an excellent job of walking\u2026",
    body: "Tow Loans did an excellent job walking us through our equipment loan. The entire process moved very quickly and smoothly.",
    author: "John",
    rating: 5,
    source: "Google",
  },
  {
    id: "rick-cooper",
    title: "Very easy to deal with",
    body: "Very easy to deal with. Tow Loans was upfront and honest, got me pre-approval, and once I found a machine the deal closed in 2 business days. The dealer I purchased from was surprised how smooth everything went. Will definitely do more business with Tow Loans.",
    author: "Rick Cooper",
    rating: 5,
    source: "Google",
  },
];

/** Row 1: moves left-to-right, ~40s desktop */
export const ROW_1: TestimonialReview[] = [
  ALL_REVIEWS[0],  // Keith Ristow (long)
  ALL_REVIEWS[1],  // Glen Woodard (short)
  ALL_REVIEWS[3],  // Maurice Alford (short)
  ALL_REVIEWS[5],  // Rudy Montes (long)
  ALL_REVIEWS[7],  // Seattle Road Warrior (short)
  ALL_REVIEWS[9],  // Mahesh Bandara (short)
  ALL_REVIEWS[11], // Dalton Weirich (short)
  ALL_REVIEWS[13], // Quality Crew (long)
  ALL_REVIEWS[16], // Chad (short)
  ALL_REVIEWS[17], // Jacqueline Moore (long)
  ALL_REVIEWS[19], // John (short)
];

/** Row 2: moves right-to-left, ~48s desktop */
export const ROW_2: TestimonialReview[] = [
  ALL_REVIEWS[2],  // Diljot K (long)
  ALL_REVIEWS[4],  // Deborah Gentry (long)
  ALL_REVIEWS[6],  // Phantom Troop Transport LLC (long)
  ALL_REVIEWS[8],  // Stefan Dimoski (medium)
  ALL_REVIEWS[10], // Isaac (short)
  ALL_REVIEWS[12], // James Lee (short)
  ALL_REVIEWS[14], // Sam Rosenbaum (short)
  ALL_REVIEWS[15], // Reiselt (short)
  ALL_REVIEWS[18], // Joe Patsko (medium)
  ALL_REVIEWS[20], // Rick Cooper (long)
];
