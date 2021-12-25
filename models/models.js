const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER , primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:'USER'},
    student_ID: {type: DataTypes.STRING},
    phone_number: {type: DataTypes.STRING}
    })

const District = sequelize.define('district', {
    id: {type: DataTypes.INTEGER , primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true}
})

const Content = sequelize.define('content', {
    id: {type: DataTypes.INTEGER , primaryKey:true, autoIncrement:true},
    adress: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING}
})


District.hasMany(Content)
Content.belongsTo(District)

Content.hasOne(User)
User.belongsTo(Content)

module.exports = {
    User,
    District,
    Content
}


