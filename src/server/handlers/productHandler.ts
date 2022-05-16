import { Request, Response } from "express";
import express from "express";
import { Product } from "../classes/product";
import { ProductTable } from "../models/productModel";
import db from "../database";
import { userAuthentication,adminAuthentication } from "./userHandler";

const productHandler = (app:express.Application)=>{
    app.get("/",userAuthentication,indexHandler);
    app.get("/dashboard/products",adminAuthentication,dashboardHandler);
    app.get("/products/:productId",showHandler);
    app.post("/products/create",adminAuthentication,createHandler);
    app.put("/products/update",adminAuthentication,updateHandler);
    app.delete("/products/delete",adminAuthentication,deleteHandler);
};

const indexHandler = async(req:Request,res:Response)=>{

    try
    {
        const product_table = new ProductTable();
        const result = await product_table.index();
        // call api 
        res.render('index', {products: result})
        // res.json(result).status(200);
    }
    catch(err)
    {
        console.log(err);
        throw new Error(`${err}`);
    }
};

const dashboardHandler = async(req:Request,res:Response)=>{

    try
    {
        const product_table = new ProductTable();
        const result = await product_table.index();
        res.render('dashboard/products', {products: result})
    }
    catch(err)
    {
        console.log(err);
        throw new Error(`${err}`);
    }
};

const showHandler = async(req:Request,res:Response)=>{
    try
    {
        const prod_table = new ProductTable();
        const result = await prod_table.show(Number(req.params.productId));
        if(result){
            res.render('product', {product: result});
        }else{
            res.redirect('not-found')
        }

    }
    catch(err)
    {
        console.log(err);
        res.send("error occured");
    }
};


const createHandler = async(req:Request,res:Response)=>{
    try
    {
        const productName = req.body.name;
        const productDescription = req.body.description;
        const productPrice = Number(req.body.price);
        const productCategory = req.body.category;
        const productStatus = Number(req.body.status);
        const productImg = req.body.img;
        const prod:Product = new Product(productName,
            productDescription,
            productPrice,
            productCategory,
            productStatus,
            productImg);
        const prod_table = new ProductTable();
        const result = await prod_table.create(prod);
        res.send("Successfully added").status(200);
        //res.json(result).status(200);
    }
    catch(err)
    {
        console.log(err);
        //throw new Error(`${err}`);
    }

};

const updateHandler = async(req:Request,res:Response)=>{
    try
    {
        const productName = req.body.name;
        const productDescription = req.body.description;
        const productPrice = Number(req.body.price);
        const productCategory = req.body.category;
        const productStatus = Number(req.body.status);
        const productImg = req.body.img;
        const ID = Number(req.body.id);
        const prod:Product = new Product(productName,
            productDescription,
            productPrice,
            productCategory,
            productStatus,
            productImg);
            

        const prod_table = new ProductTable();
        const result = await prod_table.update(ID,prod);
        res.send("updated successfully").status(200);
        //res.json(result).status(200);
    }
    catch(err)
    {
        console.log(err);
    }
};

const deleteHandler = async(req:Request,res:Response)=>{
    try
    {
        const ID = Number(req.body.id);
        const prod_table = new ProductTable();
        await prod_table.delete(ID);
        res.send("Delete successfully").status(200);
    }
    catch(err)
    {
        console.log(err);
    }
};

export default productHandler;