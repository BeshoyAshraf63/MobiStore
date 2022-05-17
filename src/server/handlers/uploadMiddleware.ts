import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import multer from 'multer';
import path from "path";

const isDev = (process.env.NODE_ENV || "production") == "development";

let fileName:string;

const fileUploadAdd = (req:Request, res:Response, next:NextFunction) => {
   uploadToSrc.single('addProductImage')(req, res, next);
  if(!isDev){
     uploadToDist.single('addProductImage')(req, res, next);
  }
}

const fileUploadUpdate = (req:Request, res:Response, next:NextFunction) => {
   uploadToSrc.single('updateProductImage')(req, res, next);
  if(!isDev){
     uploadToDist.single('updateProductImage')(req, res, next);
  }
}

const uploadToSrc = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/assets/imgs/products/')
    },
    filename: function (req, file, cb) {
      fileName = "product-" + Date.now() + path.extname(file.originalname);
      cb(null, fileName)
    }
  })
});

const uploadToDist = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'dist/assets/imgs/products/')
    },
    filename: function (req, file, cb) {
      cb(null, fileName)
    }
  })
});

// export default {
//   fileUploadAdd, fileUploadUpdate
// };

export const fileUploadAddX = fileUploadAdd;
export const fileUploadUpdateX = fileUploadUpdate;