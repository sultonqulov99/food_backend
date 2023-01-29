const pool = require("../config/db")

const GET = async(req, res) => {
    try {
        let orders = await pool.query(`SELECT * FROM orders`)
        orders = orders.rows
        let users = await pool.query(`SELECT * FROM users`)
        users = users.rows
        let foods = await pool.query(`SELECT * FROM foods`)
        foods = foods.rows
        const { userId, orderId, foodId } = req.query
    
    
        orders = orders.map(order => {
            order.user = users.find(user => user.user_id == order.user_id)
            order.food = foods.find(food => food.food_id == order.food_id)
    
            return order
        })
    
        res.json(
            orders.filter(el => {
                let user = userId ? el.user_id == userId : true
                let food = foodId ? el.food_id == foodId : true
                let order = orderId ? el.order_id == orderId : true
    
                delete el.user_id
                delete el.food_id
    
                return user && food && order
            })
        )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const POST = async (req, res) => {
try {
        const { userId, foodId, count } = await req.body
        let user_id = userId
        let food_id = foodId 
    
        let users = await pool.query(`SELECT * FROM users`)
        users = users.rows 
        users.map(el => el.user_id)
    
        let foods = await pool.query(`SELECT * FROM foods`)
        foods = foods.rows 
        foods.map(el => el.food_id)
    
        if (isNaN(+count) || count > 10 || count < 1) {
            res.status = 400
            return res.json({
                status: 400,
                message: "Invalid count!"
            })
        }
    
        let orders = await pool.query(`SELECT * FROM orders`)
        orders = orders.rows
        let order = orders.find(order => order.user_id == userId && order.food_id == foodId)
        if (order) {
            let count1 = +order.count + +count
            order_id = +order.order_id
            const addCount = await pool.query(`
                UPDATE orders SET user_id = $1, food_id = $2, count = $3 WHERE order_id = $4 RETURNING *
            `, 
            [
                user_id,
                food_id,
                count ? count1 : count,
                order_id
            ])

            res.status(201).json({
                status: 201,
                message: "The count update!",
                data: addCount.rows
            })

        } else {
            const order = await pool.query(`
                INSERT INTO orders (user_id, food_id, count) VALUES ($1, $2, $3) RETURNING *
            `, [ user_id, food_id, count ])
    
            return res.status(201).json({
                status: 201,
                message: "The order created!",
                data: order.rows
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    GET, POST
}