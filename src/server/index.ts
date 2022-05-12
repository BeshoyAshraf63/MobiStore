import express, { Request, Response } from "express";
import db from "./database";
import OrderHandler from "./handlers/orderHandler";
import productHandler from "./handlers/productHandler";
import userHandler from "./handlers/userHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { userAuthentication } from "./handlers/userHandler";

const app = express();
const port = process.env.PORT || 3050;
app.listen(port,()=>{console.log("Server is alive :D")});
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// set static folder
const isDev = (process.env.NODE_ENV || "production") == "development";


// set the view engine to ejs
app.set("view engine", "ejs");

if (isDev) {
  app.use(express.static("dev"));
  app.set("views", path.join(__dirname, "../views"));
} else {
  app.use(express.static("dist"));
  app.set("views", path.join(__dirname, "../src/views"));
}

app.get("/test",async function (req, res) {
    res.render('index')
});

// app.get("/", userAuthentication, async(req:Request, res:Response)=>
// {

//   res.render('index', {})
// });

app.get("/cart", userAuthentication, async(req:Request, res:Response)=>
{
  res.render('cart')
});

app.get("/auth", function (req:Request, res:Response) {
  const type = Number(req.cookies.type);
  if(type == 1 || type == 2)
  {
    res.redirect('/')
  }
  res.render("auth");
});

productHandler(app);
userHandler(app);
OrderHandler(app);