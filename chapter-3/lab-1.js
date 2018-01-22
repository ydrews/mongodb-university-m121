// $group and Accumulators
// In the last lab, we calculated a normalized rating that required us to know what the minimum and
// maximum values for imdb.votes were. These values were found using the $group stage!

let pipeline = [
  {
    $match: {
      awards: /Won.\d*.[oO]scars?/
    },
  },
  {
    $group: {
      _id: null,
      highest_rating: { $max: '$imdb.rating' },
      lowest_rating: { $min: '$imdb.rating' },
      average_rating: { $avg: '$imdb.rating' },
      deviation: { $stdDevSamp: '$imdb.rating' }
    }
  }
]