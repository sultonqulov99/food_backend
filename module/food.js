const pool = require('../config/db')
const GET = async(req,res)=>{
   try {
        let foods = await pool.query(`SELECT * FROM foods`)
        foods = foods.rows
        const {foodId} = req.query
        res.json(
            foods.filter(food => foodId ? food.food_id == foodId : true)
        )
   } catch (error) {
        res.status(500).json({ message: error.message })
   }
}

module.exports = {
    GET
}