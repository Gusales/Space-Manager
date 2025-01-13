import Sequelize from 'sequelize'

const { DATABASE, DATABASE_USER, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT } = process.env

export const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: "mysql",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  logging: false
});

export const User = sequelize.define("users", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  actype: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rm: {
    type: Sequelize.INTEGER(5),
    autoIncrement: false,
    allowNull: false
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  firstLoggin: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
});

export const Space = sequelize.define('spaces', {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export const Booking = sequelize.define('bookings', {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  starts_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  ends_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

User.hasMany(Booking, {
  foreignKey: 'user_id'
})

Space.hasMany(Booking, {
  foreignKey: 'space_id'
})

Booking.belongsTo(User, {
  constraint: true,
  foreignKey: 'user_id'
})

Booking.belongsTo(Space, {
  constraint: true,
  foreignKey: 'space_id'
})