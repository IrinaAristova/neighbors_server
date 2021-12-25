const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError")
const {User} = require('../models/models')


const generateJwt =(id,name, email, role, student_ID,phone_number,contentId) =>{
    return jwt.sign(
        {id,name,email,role, student_ID,phone_number,contentId},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
        )
}



class UserController{

    async registration(req,res,next){
        const {name, email,password,role,student_ID,phone_number} = req.body
        if(!name || !email || !password || !student_ID || !phone_number){
            return next(ApiError.badRequest('Некоректные введенные данные!!'))
        }

        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('Такой пользоватль уже существует!!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email,password : hashPassword,role,student_ID,phone_number})
        const token = generateJwt(user.id,user.name,user.email,user.role,user.student_ID,user.phone_number, user.contentId)
        return res.json({token})
    }

    async login(req,res,next){
        const {email,password} = req.body
        const user = await User.findOne({ where:{email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден!!'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('указан неправильный пароль!!'))
        }
        
        const token = generateJwt(user.id,user.name,user.email,user.role,user.student_ID, user.phone_number,user.contentId)

        return res.json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.user.id,req.user.name,req.user.email,req.user.role,req.user.student_ID, req.user.phone_number,req.user.contentId)

        return res.json({token})
    }

    async deleteUser(req,res,next){
        const {id} = req.params
        await User.destroy( {
            where:{id}
        })
    }

    async updateUser (req,res,next){
        const {name,email,phone_number,student_ID} = req.body
        const {id} = req.params
        const user = await User.findOne({
            where:{id}
        })
        if(!user){
            return next(ApiError.internal('Пользователь не наиден!!!'))
        }
        const pretendentEmail = await User.findOne({
            where:{email}
        })
        if(pretendentEmail && email !== user.email){
            return next(ApiError.internal('Такои email уже зарегестрирован!!!'))
        }
        user.name = name
        user.email = email
        user.phone_number = phone_number
        user.student_ID = student_ID
        user.save()

        return res.json(user)
    }
}


module.exports = new UserController()