// imdb.rating is at least 7
// genres does not contain "Crime" or "Horror"
// rated is either "PG" or "G"
// languages contains "English" and "Japanese"

let pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horor"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Japanese"] }
    }
  }
];
