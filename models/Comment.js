const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    body:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment_id:{
        type:datatypes.INTEGER,
        reference:{
            model: 'Post',
            key:'id',
        }
    },
    user_id:{
        type:datatypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'User',
            key: 'id',
        }
    }
},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment'
}

)

module.exports = Comment;