import express, { Request, Response } from "express";
import db from "./database";
import OrderHandler from "./handlers/orderHandler";
import productHandler from "./handlers/productHandler";
import userHandler from "./handlers/userHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { userAuthentication, adminAuthentication } from "./handlers/userHandler";
import nodemailer from "nodemailer";
import 'dotenv/config'

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

app.get("/dashboard", adminAuthentication, async (req:Request, res:Response)=>
{
  res.render('dashboard')
});

app.get("*", (req:Request, res:Response)=>
{
  res.send({'error': 404})
});

app.post("/contact", async (req:Request, res:Response)=>
{
  try{

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASS;
  
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: adminEmail,
        pass: adminPassword,
      },
      tls: {
        rejectUnauthorized: false
    }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Kirollos Ashraf" <kirollos.ashraf.sedky@gmail.com>', // sender address
      to: adminEmail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    res.send({result: "success"})
  }
  catch(e){
    console.log(e)
    res.send({result: "error"})
  }
});