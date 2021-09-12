const db = require('../db')

class RoutController {
    async getRout(req, res) {
        const rout = await db.query('select * from rout order by name asc') // desc
        res.json(rout.rows)
    }
    async createRout(req, res) {
        const {date, name, quality, distant} = req.body
        const newRout = await db.query('insert into rout(date, name, quality, distant) values($1, $2, $3, $4) RETURNING *', [date, name, quality, distant])
        res.json(newRout.rows)
    }
    async deleteRout(req, res) {
        const id = req.params.id
        const rout = await db.query('delete from rout where id = $1', [id])
        res.json(rout.rows[0])
    }
}

module.exports = new RoutController()