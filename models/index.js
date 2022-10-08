const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey:'comment_id',
    onDelete: 'CADCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE',
});

module.exports = {
    Post,
    User,
    Comment,
};