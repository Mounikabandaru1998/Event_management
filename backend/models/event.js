export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Event;
};
