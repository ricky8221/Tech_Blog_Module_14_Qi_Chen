const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}

Post.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        body:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_id:{
            type:datatypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post'
    }
);

module.exports = Post;