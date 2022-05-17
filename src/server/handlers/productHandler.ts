import { Request, Response } from "express";
import express from "express";
import { Product } from "../classes/product";
import { ProductTable } from "../models/productModel";
import db from "../database";
import { userAuthentication,adminAuthentication } from "./userHandler";
import {fileUploadAddX, fileUploadUpdateX} from './uploadMiddleware';
import fs from 'fs';

const isDev = (process.env.NODE_ENV || "production") == "development";

const productHandler = (app:express.Application)=>{
    app.get("/",userAuthentication,indexHandler);
    app.get("/dashboard/products",adminAuthentication,dashboardHandler);
    app.get("/products/:productId",userAuthentication,showHandler);
    app.get("/dashboard/products/update/:productId", adminAuthentication,updatePageHandler);
    app.get("/dashboard/products/add",adminAuthentication,addPageHandler);
    app.post("/products/create",[adminAuthentication, fileUploadAddX],createHandler);
    app.put("/products/update",[adminAuthentication, fileUploadUpdateX],updateHandler);
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
            res.redirect('/not-found')
        }

    }
    catch(err)
    {
        console.log(err);
        res.send("error occured");
    }
};

const addPageHandler = async(req:Request,res:Response)=>{
    res.render('dashboard/product-add');
};

const updatePageHandler = async(req:Request,res:Response)=>{
    try
    {
        const prod_table = new ProductTable();
        const result = await prod_table.show(Number(req.params.productId));
        if(result){
            res.render('dashboard/product-update', {product: result});
        }else{
            res.redirect('/not-found')
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
        if(!req.file?.filename){
            res.send({result : "error"});
            return
        }
        const productName = req.body.addProductName;
        const productDescription = req.body.addProductDescription;
        const productPrice = Number(req.body.addProductPrice);
        const productCategory = "0";
        const productStatus = 1;
        let productImg:any = "";
        productImg = req.file?.filename;
        const prod:Product = new Product(productName,
            productDescription,
            productPrice,
            productCategory,
            productStatus,
            productImg);
        const prod_table = new ProductTable();
        const result = await prod_table.create(prod);
        res.send({result : "success"});
    }
    catch(err)
    {
        res.send({result : "error"});
    }
};

const updateHandler = async(req:Request,res:Response)=>{
    try
    {
        
        const productName = req.body.updateProductName;
        const productDescription = req.body.updateProductDescription;
        const productPrice = Number(req.body.updateProductPrice);
        const productCategory = "0";
        const productStatus = 1;
        const ID = Number(req.body.updateProductId);
        let productImg:string = "";

        const oldProd = new ProductTable();
        const oldProdData:any = await oldProd.show(ID);
        const oldImg:string = oldProdData.img;

        if(req.file?.filename){
            productImg = req.file?.filename;
        }else{
            productImg = oldImg;
        }

        const prod:Product = new Product(productName,
            productDescription,
            productPrice,
            productCategory,
            productStatus,
            productImg);
        const prod_table = new ProductTable();
        const result = await prod_table.update(ID,prod);

        if(req.file?.filename){
            fs.unlink(`./src/assets/imgs/products/${oldImg}`, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
            })
            if(!isDev){
                fs.unlink(`./dist/assets/imgs/products/${oldImg}`, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                })
            }
        }
        res.send({result : "success"});
    }
    catch(err)
    {
        console.log(err)
        res.send({result : "error"});
    }
};

const deleteHandler = async(req:Request,res:Response)=>{
    try
    {
        const ID = Number(req.body.id);
        const prod_table = new ProductTable();
        const oldProdData:any = await prod_table.show(ID);
        const deletedImg:string = oldProdData.img;

        await prod_table.delete(ID);

        fs.unlink(`./src/assets/imgs/products/${deletedImg}`, (err) => {
            if (err) {
              console.error(err)
              return
            }
        })
        if(!isDev){
            fs.unlink(`./dist/assets/imgs/products/${deletedImg}`, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
            })
        }

        res.send({result : "success"});
    }
    catch(err)
    {
        res.send({result : "error"});
    }
};

export default productHandler;