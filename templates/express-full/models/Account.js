module.exports = function (sequelize, DataTypes) {
    const Account = sequelize.define("Account", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,

        password: DataTypes.STRING,
        token: DataTypes.STRING
    }, {

        classMethods: {
            associate: function (models) { }
        }
    });

    return Account;
};
