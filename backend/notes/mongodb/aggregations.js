

// 1. Mongodb Aggregaton Pipeline
/* 
  MongoDb framework for data aggregation

  The main idea is that we basically define a pipeline
  that all documents from a certain collection go through
  where they are processed step by step in order to transform them into
  aggregated results.


  Example:
*/

// const stats = await User.aggregate([
//   {
//     $match: {
//       rating: {$gte: 1.5}
//     }
//   },
//   {
//     $group: {
//       _id: '$createdAt',
//       numUsers: { $sum: 1},
//       avgRating: {
//         $avg: '$rating'
//       },
//       avgBalance: {
//         $avg: '$balance'
//       },
//       minBalance: {
//         $min: '$balance'
//       },
//       maxBalance: {
//         $max: '$balance'
//       }
//     }
//   },
//   {
//     $sort: {
//         avgBalance: 1
//     }
//   },
//   {
//     $match: {
//       _id: {$ne: '2021-06-23T05:09:48.937Z'}
//     }
//   }
// ])