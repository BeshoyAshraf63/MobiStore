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
import paypal, { Payment, payment, PaymentResponse } from 'paypal-rest-sdk';

declare var process : {
  env: {
    NODE_ENV: string,
    PORT: string,
    PAYPAL_CLIENT_ID: string,
    PAYPAL_CLIENT_SECRET: string,
    ADMIN_EMAIL: string,
    ADMIN_PASS: string
  }
}

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

app.get("/cart", userAuthentication, async(req:Request, res:Response)=>
{
  res.render('cart')
});

// app.get("/checkout", userAuthentication, async(req:Request, res:Response)=>
// {
//   res.render('cart')
// });

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
  res.render('dashboard/dashboard')
});

app.post("/contact", async (req:Request, res:Response)=>
{
  try{

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const subject = req.body.subject;
    const msg = req.body.msg;

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


    let adminMsg = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender
      to: adminEmail, // receiver
      subject: subject,
      text: `
        name: ${name},
        email: ${email},
        phone: ${phone},
        subject: ${subject},
        msg: ${msg}
      `,
      html: `
        <h2>name</h2><p>${name}</P><hr>
        <h2>email</h2><p>${email}</P><hr>
        <h2>phone</h2><p>${phone}</P><hr>
        <h2>subject</h2><p>${subject}</P><hr>
        <h2>msg</h2><p>${msg}</P><hr>
      `
    });

    let userMsg = await transporter.sendMail({
      from: `"MobiStore" <${adminEmail}>`, // sender
      to: email, // receiver
      subject: subject,
      text: `Thanks for reching out to us, 
      we will reply to you in a few hours`,
      html: `<h3>Thanks for reching out to us, <br>we will reply to you in a few hours</h3>
      `
    });
    
    res.send({result: "success"})
  }
  catch(e){
    console.log(e)
    res.send({result: "error"})
  }
});

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

app.post('/checkout', (req: Request, res: Response) => {
  const order = req.body.order;
  console.log(order)
  let items:any = [];
  let totalPrice = 0;
  order.forEach((item:any) => {
    items.push({
          "name": item.name,
          "sku": item.name,
          "price": item.price,
          "currency": "USD",
          "quantity": item.qty
    })
    totalPrice += (item.price * item.qty);
  });

  const create_payment_json:any = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": req.protocol + '://' + req.get('host') + '/success',
        "cancel_url": req.protocol + '://' + req.get('host') + '/'
    },
    "transactions": [{
        "item_list": {
            "items": items
        },
        "amount": {
            "currency": "USD",
            "total": totalPrice
        },
        "description": "MobiStore Shop"
    }]
};

  paypal.payment.create(create_payment_json , function (error, payment:any) {
    if (error) {
        res.send({result: "error"})
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.send({result: "success", redirect: payment.links[i].href})
          }
        }
    }
  });

});

app.get('/success', (req:Request, res:Response) => {
  const payerId:any = { 'payer_id': req.query.PayerID };
  const paymentId:any = req.query.paymentId;
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
      if (error) {
        res.redirect('/error');
      } else {
          res.render('checkout-success');
      }
  });
});

app.get("/not-found", (req:Request, res:Response) => {
  res.render('error')
});

app.get("*", (req:Request, res:Response) => {
  res.render('error')
});