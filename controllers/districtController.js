const { District } = require("../models/models")

class districtController{
    async create(req,res){
        const {name} = req.body
        const district = await District.create({name})
        return res.json(district)
    }

    async getAllDistrict(req,res){
        const districts = await District.findAll()
        return res.json(districts)
    }
}


module.exports = new districtController()