const pool = require('../config/db');
const GET = async(req,res)=>{
    try {
        let users = await pool.query(`SELECT * FROM users`)
        users = users.rows
        const {userId} = req.query
    
        res.json(
            users.filter(user => userId ? user.user_id == userId : true)
        )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const POST = async (req,res)=>{
    try {
        const {username, contact} = await req.body
        if(!username || username.length > 30){
            return res.status(400).json({
                status:400,
                massage:"Invalid username!"
            })
        }
        if(!contact || !(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/).test(contact)){
            return res.status(400).json({
                status:400,
                massage:"Invalid contact!"
            })
        }
        const users = await pool.query(`
            INSERT INTO users (username, contact) VALUES ($1,$2) RETURNING *
        `, [ username, contact ])
         
        res.status(200).json({
            status:201,
            massage:"The user created!",
            data: users.rows
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    GET,
    POST
}