module.exports = function (sequelize, DataTypes) {
    const Note = sequelize.define("Note", {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,

        addedOn: DataTypes.DATE
    }, {

        classMethods: {
            associate: function (models) {
                models.Account.hasMany(Note, {foreignKey: 'userId'});
                Note.belongsTo(models.Account, {foreignKey: 'userId'});
            }
        }
    });

    return Note;
};
