import { Client } from "pg"
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'doni',
    port: 5432,
})

export default client