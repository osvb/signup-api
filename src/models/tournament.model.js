/**
* Tournament model
* @module models/example
*/

/**
* Tournament model - create and export the database model for the example
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Tournament
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Tournament = sequelize.define('tournament', {
			name: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false
			},
			teamlimit: {
					type: DataTypes.INTEGER,
					unique: false,
					allowNull: false
			},
			startdate: {
					type: DataTypes.DATE,
					unique: false,
					allowNull: false
			},
			openreg: {
					type: DataTypes.DATE,
					unique: false,
					allowNull: false
			},
			place: {
					type: DataTypes.INTEGER,
					unique: false,
					allowNull: false
			},
			gender: {
					type: DataTypes.STRING,
					unique: false,
					allowNull: false
			},
			price: {
					type: DataTypes.INTEGER,
					unique: false,
					allowNull: true
			},
			info: {
					type: DataTypes.TEXT,
					unique: false,
					allowNull: true
			},
    });
    return Tournament;
}
