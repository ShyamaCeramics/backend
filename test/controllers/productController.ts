import Product from '../models/product';

export const fetchAllProducts = async (req: any, res: any) => {
    const req_data = req.body;
    try {
        const category = req_data.category;
        let productsData = [];
        if (category && category.length > 0) {
            if (category != 'all') {
                productsData = await Product.findAll({
                    where: { category }
                });
            } else {
                productsData = await Product.findAll();
            }
        } else {
            productsData = await Product.findAll();
        }
        if (!productsData) {
            return res.status(203).json({ msg: 'Products not found' });
        }
        const response = {
            data: productsData
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(203).json({ msg: 'Products Not Found' });
    }
};

export const saveProductDetails = async (req: any, res: any) => {
    const { sku, name, size, height, dia, price, category, images } = req.body;
    try {
        if (size === '1_piece_set') {
            const h = height[0];
            const d = dia[0];
            await Product.create({
                sku, name, size, heigh: h, dia: d, price, category, images
            });
        } else if (size === '2_piece_set') {
            const h1 = height[0];
            const d1 = dia[0];
            await Product.create({
                sku, name, size, height: h1, dia: d1, price, category, images
            });
            const h2 = height[1];
            const d2 = dia[1];
            await Product.create({
                sku, name, size, height: h2, dia: d2, price, category, images
            });
        } else if (size === '3_piece_set') {
            const h1 = height[0];
            const d1 = dia[0];
            await Product.create({
                sku, name, size, height: h1, dia: d1, price, category, images
            });
            const h2 = height[1];
            const d2 = dia[1];
            await Product.create({
                sku, name, size, height: h2, dia: d2, price, category, images
            });
            const h3 = height[2];
            const d3 = dia[2];
            await Product.create({
                sku, name, size, height: h3, dia: d3, price, category, images
            });
        } else if (size === '4_piece_set') {
            const h1 = height[0];
            const d1 = dia[0];
            await Product.create({
                sku, name, size, height: h1, dia: d1, price, category, images
            });
            const h2 = height[1];
            const d2 = dia[1];
            await Product.create({
                sku, name, size, height: h2, dia: d2, price, category, images
            });
            const h3 = height[2];
            const d3 = dia[2];
            await Product.create({
                sku, name, size, height: h3, dia: d3, price, category, images
            });
            const h4 = height[3];
            const d4 = dia[3];
            await Product.create({
                sku, name, size, height: h4, dia: d4, price, category, images
            });
        } else if (size === '5_piece_set') {
            const h1 = height[0];
            const d1 = dia[0];
            await Product.create({
                sku, name, size, height: h1, dia: d1, price, category, images
            });
            const h2 = height[1];
            const d2 = dia[1];
            await Product.create({
                sku, name, size, height: h2, dia: d2, price, category, images
            });
            const h3 = height[2];
            const d3 = dia[2];
            await Product.create({
                sku, name, size, height: h3, dia: d3, price, category, images
            });
            const h4 = height[3];
            const d4 = dia[3];
            await Product.create({
                sku, name, size, height: h4, dia: d4, price, category, images
            });
            const h5 = height[4];
            const d5 = dia[4];
            await Product.create({
                sku, name, size, height: h5, dia: d5, price, category, images
            });
        }
        res.status(201).json({ msg: 'Product Saved Successfully !!' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(203).json({ msg: 'Internal Server Error' });
    }
};

