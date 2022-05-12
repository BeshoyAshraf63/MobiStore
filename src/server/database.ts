import {Pool} from "pg";


const host = "127.0.0.1"; // localhost
const userName = "postgres";
const password = "1234";
const databaseName = "mobi_shop";

const db = new Pool({
    host:host,
    user:userName,
    password:password,
    database:databaseName
});

export default db;