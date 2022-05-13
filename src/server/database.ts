import {Pool} from "pg";
const isDev = (process.env.NODE_ENV || "production") == "development";

const host = "127.0.0.1"; // localhost
const userName = "postgres";
const password = "1234";
const databaseName = "mobi_shop";

let connection;
if(isDev){
    connection = {
        host:host,
        user:userName,
        password:password,
        database:databaseName
    }
}else{
    connection = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
}
const db = new Pool(connection);

export default db;