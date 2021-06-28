

// 1. Mongodb Aggregaton Pipeline
/* 
  MongoDb framework for data aggregation

  The main idea is that we basically define a pipeline
  that all documents from a certain collection go through
  where they are processed step by step in order to transform them into
  aggregated results.


  Example:
*/

const stats = await User.aggregate([
  {
    $match: {
      rating: {$gte: 1.5}
    }
  },
  {
    $group: {
      _id: '$createdAt',
      numUsers: { $sum: 1},
      avgRating: {
        $avg: '$rating'
      },
      avgBalance: {
        $avg: '$balance'
      },
      minBalance: {
        $min: '$balance'
      },
      maxBalance: {
        $max: '$balance'
      }
    }
  },
  {
    $sort: {
        avgBalance: 1
    }
  },
  {
    $match: {
      _id: {$ne: '2021-06-23T05:09:48.937Z'}
    }
  }
])

const year = req.params.year * 1;
const plan = User.aggregate([
  { 
    // Unwind will basically deconstruct an array field from the info documents
    // and output one document for each element of the array
    $unwind: '$arrayProperty'
  },
  {
    $match: {
      arrayProperty: {
        $gte: 10000,
        $lte: year
      }
    }
  },
  {
    $group: {
      _id: { $someOperator: '$arrayProperty'},
      numSome: { $add: 1},
      somethings: {$push: '$name'} // will create a array of $numSome elements with value names of $arrayProps 
    }
  },
  {
    $addField: {
      something: '$_id' // We add a field $something with value from $_id
    }
  },
  {
    $project: {
      _id: 0  // remove $_id
    }
  },
  {
    $sort: {
      numSome: -1 // Sorting in decenting order
    }
  },
  {
    $limit: 6 // limit output with 6 documents
  }
])

// OUTPUT:  THE COUNT OF ARRAYPROPERTIES (IT'S DIVIDED AND GROUPED WITH OPERATOR)

