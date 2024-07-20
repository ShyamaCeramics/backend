import express from 'express';
import multer from 'multer';
import fs from "fs";
import { fetchAllProducts, saveProductDetails } from '../controllers/productController';

const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = __dirname + "/resources/static/assets/uploads/";
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
var uploadFile = multer({ storage: storage });

router.put('/fetch', fetchAllProducts);
router.post('/save', saveProductDetails);
router.post("/upload", uploadFile.single("file"), (req: any, res) => {
    return res.status(200).send(req.file.filename);
});

export default router;
