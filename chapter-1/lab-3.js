// Using the Aggregation Framework, find a count of the number of movies that have a title composed of one word.
// To clarify, "Cinderella" and "3-25" should count, where as "Cast Away" would not.

let pipeline = [
  {
    $project: {
      _id: 0,
      title: 1,
      titleSplited: { $split: ["$title", " "] }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      titleLength: { $size: "$titleSplited" }
    }
  },
  {
    $match: {
      titleLength: 1
    }
  }
];