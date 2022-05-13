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
        // connectionString: "postgres://enwgzyiejsampf:002467ea52f56140efd46956d7d26faebb0ae1e2a25b92a33436200a9aa2a161@ec2-52-200-215-149.compute-1.amazonaws.com:5432/d3ei6nki5vft8l",
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
}
const db = new Pool(connection);
console.log(db)

export default db;