let favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"];

var pipeline = [
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: "USA"
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rating: "$tomatoes.viewer.rating",
      'num_favs': {
        $size: {
          $ifNull: [
            {
              $filter: {
                input: "$cast",
                as: "cast",
                cond: { $in: ["$$cast", favorites] }
              }
            },
            []
          ]
        }
      }
    }
  },
  { $sort: { num_favs: -1, rating: -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 }
]