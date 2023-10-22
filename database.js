import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getUsers() {
    const [rows] = await pool.query("select * from Uzivatel")

    return rows
}

export async function getUser(username, password) {
    const [row] = await pool.query(`
	select * from Uzivatel
	where Username = ?
	and 
	Password = ?
	`, [username, password])

    return row[0]
}

export async function getUserByID(id) {
    const [row] = await pool.query(`
	select * from Uzivatel
	where ID = ?
	`, [id])

    return row[0]
}

export async function register(username, password, repassword) {
    if (password != repassword) {
        return 'Repeat password has to be the same as password'
    }

    const [result] = await pool.query(`
	insert into Uzivatel(Username, Password)
	values(?,?)
	`, [username, password])

    const id = result.insertId

    return getUserByID(id)
}
