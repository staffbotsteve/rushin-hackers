// Creating our Survey table
module.exports = function(sequelize, DataTypes) {
  const Answer = sequelize.define("Answer", {
    text: {
      type: DataTypes.STRING(510),
      allowNull: false
    }
  });
  //   --------
  Answer.associate = function(models) {
    Answer.belongsToMany(models.Respondent, {
      through: "AnswerRespondents"
    });
    Answer.belongsToMany(models.Choice, {
      through: "AnswerChoices"
    });
  };
  return Answer;
};
