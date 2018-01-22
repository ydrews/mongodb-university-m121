/**
 * Let's use our increasing knowledge of the Aggregation Framework to explore our movies collection in more detail.
 * We'd like to calculate how many movies every cast member has been in and get an average imdb.rating for each cast member.
 * What is the name, number of movies, and average rating (truncated to one decimal) for the cast member
 * that has been in the most number of movies with English as an available language?
 */

let pipeline = [
  {
    $match: {
      languages: 'English'
    }
  },
  {
    $unwind: '$cast'
  },
  {
    $group: {
      _id: '$cast',
      numFilms: { $sum: 1 },
      average: { $avg: '$imdb.rating' }
    }
  },
  {
    $sort: {
      numFilms: -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      average: {
        $divide: [
          {
            $trunc: {
              $multiply: ['$average', 10]
            }
          },
          10
        ]
      },
      numFilms: 1
    }
  }
]