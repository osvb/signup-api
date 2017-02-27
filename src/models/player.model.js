/**
* Player model
* @module models/player
*/

/**
* Player model - create and export the database model for the player
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Player
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Player = sequelize.define('player', {
        firstName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          unique: false,
          allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true
        },
        rankingPoints_2017: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2016: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2015: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2014: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2013: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2012: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2011: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2010: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2009: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2008: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        rankingPoints_2007: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0,
            allowNull: false
        },
        birthYear: {
          type: DataTypes.INTEGER,
          unique: false,
          allowNull: true
        },
        externalId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true
        }
    } // , { // For reference:
    //    classMethods: {
    //        associate(models) {
    //            // Create associations here
    //        }
    //    }
    // }
    );
    return Player;
}
