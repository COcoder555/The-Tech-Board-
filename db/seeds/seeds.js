const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const postData = require('./postData')
const userData = require('./userData');
const commentData =require('./commentData');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log(User)

  await User.bulkCreate(userData);
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();



//      {
//     individualHooks: true,
//     returning: true,
//   }
  