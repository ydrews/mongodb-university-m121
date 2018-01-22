/**
 * Which alliance from air_alliances flies the most routes with either
 * a Boeing 747 or an Airbus A380 (abbreviated 747 and 380 in air_routes)?
 */

let pipeline = [
  {
    $match: {
      $or: [{ airplane: /380/ }, { airplane: /747/ }]
    }
  },
  {
    $lookup: {
      from: 'air_alliances',
      localField: 'airline.name',
      foreignField: 'airlines',
      as: 'alliance'
    }
  },
  {
    $group: {
      _id: '$alliance.name',
      routes: { $sum: 1 }
    }
  },
  {
    $match: {
      _id: { $size: 1 }
    }
  },
  {
    $sort: {
      routes: -1
    }
  },
  {
    $limit: 1
  }
]