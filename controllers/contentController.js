const {Content} = require('../models/models')
const {User} = require('../models/models')

class contentController{
    async create(req,res){
        const {content,adress} = req.body
        const {id} = req.params
        const pageContent = await Content.create({content,adress})
        const updateUser = await User.update({contentId:pageContent.id},{where:{id:id}})
        return res.json({pageContent})
    }

    async getAllContents(req,res){
        const allContents = await Content.findAll()
        return res.json(allContents)
    }

    async getOneContent(req,res){
        const {id} = req.params
        const oneContent = await Content.findOne(
        {
            where:{id},
            include: [
                {
                    model: User
                }
            ]
        })

        return res.json(oneContent)
    }

    async update(req,res){
        const {content,adress} = req.body
        const {id} = req.params
        const post = await Content.findOne({
            where:{id}
        })
        if(!post){
            return next(ApiError.internal('Пост не наиден!!!'))
        }
        post.adress = adress
        post.content = content
        post.save()

        return res.json(post)
    }

    async delete(req,res){
        const {id} = req.params
        await Content.destroy( {
            where:{id}
        })
    }
}


module.exports = new contentController()