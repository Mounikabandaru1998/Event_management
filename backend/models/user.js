export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Event, { foreignKey: 'userId' });
  };

  return User;
};
