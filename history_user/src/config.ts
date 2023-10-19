import { Client } from "pg"
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'doni',
    port: Number(process.env.DATABASE_PORT),
})

export default client