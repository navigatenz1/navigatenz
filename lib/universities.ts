export interface UniversityInfo {
  name: string;
  abbr: string;
  city: string;
  color: string;
  students: string;
  ranking: string;
  livingCost: string;
  knownFor: string[];
  website: string;
  image: string;
}

export const universities: UniversityInfo[] = [
  {
    name: "University of Auckland",
    abbr: "UoA",
    city: "Auckland",
    color: "#00467F",
    students: "~45,000",
    ranking: "NZ #1, World Top 70",
    livingCost: "$350–450/week",
    knownFor: ["Engineering", "Medicine", "Law", "Commerce", "Research"],
    website: "https://www.auckland.ac.nz",
    image: "https://images.unsplash.com/photo-1595125990323-885cec5217ff?w=500&q=80",
  },
  {
    name: "University of Otago",
    abbr: "Otago",
    city: "Dunedin",
    color: "#002B5C",
    students: "~20,000",
    ranking: "NZ #2, World Top 220",
    livingCost: "$250–300/week",
    knownFor: ["Health Sciences", "Medicine", "Dentistry", "Sciences"],
    website: "https://www.otago.ac.nz",
    image: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=500&q=80",
  },
  {
    name: "Victoria University of Wellington",
    abbr: "Vic",
    city: "Wellington",
    color: "#115740",
    students: "~22,000",
    ranking: "NZ #3, World Top 250",
    livingCost: "$300–380/week",
    knownFor: ["Law", "Humanities", "Government", "Design"],
    website: "https://www.wgtn.ac.nz",
    image: "https://images.unsplash.com/photo-1589483232748-515c025575bc?w=500&q=80",
  },
  {
    name: "University of Canterbury",
    abbr: "UC",
    city: "Christchurch",
    color: "#C8102E",
    students: "~15,000",
    ranking: "World Top 260",
    livingCost: "$250–300/week",
    knownFor: ["Engineering", "Science", "IT", "Forestry"],
    website: "https://www.canterbury.ac.nz",
    image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=500&q=80",
  },
  {
    name: "University of Waikato",
    abbr: "Waikato",
    city: "Hamilton",
    color: "#D50032",
    students: "~12,000",
    ranking: "World Top 350",
    livingCost: "$220–280/week",
    knownFor: ["Management", "Māori Studies", "Science", "Education"],
    website: "https://www.waikato.ac.nz",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&q=80",
  },
  {
    name: "Massey University",
    abbr: "Massey",
    city: "Multiple campuses",
    color: "#003DA5",
    students: "~30,000",
    ranking: "NZ's largest distance provider",
    livingCost: "$220–280/week",
    knownFor: ["Agriculture", "Vet Science", "Distance Learning", "Design"],
    website: "https://www.massey.ac.nz",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&q=80",
  },
  {
    name: "AUT",
    abbr: "AUT",
    city: "Auckland",
    color: "#E31937",
    students: "~29,000",
    ranking: "Fastest growing NZ uni",
    livingCost: "$350–450/week",
    knownFor: ["Health Sciences", "Design", "Technology", "Business"],
    website: "https://www.aut.ac.nz",
    image: "https://images.unsplash.com/photo-1595125990323-885cec5217ff?w=500&q=80",
  },
  {
    name: "Lincoln University",
    abbr: "Lincoln",
    city: "Canterbury",
    color: "#006838",
    students: "~3,000",
    ranking: "Most specialised NZ uni",
    livingCost: "$220–260/week",
    knownFor: ["Agriculture", "Land Sciences", "Viticulture", "Environment"],
    website: "https://www.lincoln.ac.nz",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&q=80",
  },
];
