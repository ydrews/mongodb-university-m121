// Using the same $match stage from the previous lab, add a $project stage to only display the the title and film rating (title and rated fields).

let pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horor"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Japanese"] }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rated: "$imdb.rating"
    }
  }
];
