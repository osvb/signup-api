
	/**
	* Signup model
	* @module models/signup
	*/

	/**
	* Signup model - create and export the database model for the example
	* including all assosiations and classmethods assiciated with this model.
	* @memberof  module:models/Signup
	* @param  {Object} sequelize description
	* @param  {Object} DataTypes description
	*/
	export default function (sequelize, DataTypes) {
    const Signup = sequelize.define('signup', {
		tournamentid: {
			type: DataTypes.INTEGER,
			unique: false,
			allowNull: false
		},
		spiller1id: {
			type: DataTypes.INTEGER,
			unique: false,
			allowNull: false
		},
		spiller2id: {
			type: DataTypes.INTEGER,
			unique: false,
			allowNull: false
		},
		paid: {
			type: DataTypes.INTEGER,
			unique: false,
			allowNull: true
		},
		date: {
			type: DataTypes.DATE,
			unique: false,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	    });
	    return Signup;
	}
