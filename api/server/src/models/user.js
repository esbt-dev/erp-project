function AddUserRole(User, payload) {
  let InsertArr = {
    userId: User._id,
    roleId: 1 // pass default role id

  }
  model.UserRole.create(InsertArr);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    store_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    store_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      afterCreate: (User, payload) => {
        AddUserRole(User, payload);
      }
    }
  });
  User.associate = function (models) {
    User.belongsToMany(models.Role, {
      hooks: true,
      through: 'user_roles',
      // foreignKey: 'userId',
    })
  };
  return User;
};
