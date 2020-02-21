'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function (models) {
    Role.belongsToMany(models.User, {
      hooks: true,
      through: 'user_roles',
      // foreignKey: 'roleId',
    })
  };
  return Role;
};
