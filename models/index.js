const User = require('./User');
const Post = require('./Post');
const Comment= require('./Comment');
const { hasMany } = require('./Comment');

User.hasMany(Post,{
    foreignKey:'userId'
});

Post.belongsTo(User,{
   foreignKey:'userId' 
});

Post.hasMany(Comment,{
    foreignKey:'postId'
});

Comment.belongsTo(Post,{
    foreignKey:'postId'
})

User.hasMany(Comment,{
    foreignKey:'userId'
});

Comment.belongsTo(User,{
   foreignKey:'userId' 
});




module.exports = { User , Post, Comment };

