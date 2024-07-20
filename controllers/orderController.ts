import { jwtDecode } from 'jwt-decode';
import Order from '../models/order';
import User from '../models/user';
import Product from '../models/product';

const decodeAccessToken = (accessToken: any) => {
    try {
        let decodedToken = jwtDecode(accessToken);
        return decodedToken;
    } catch {
        return null;
    }
};

const extractMobileFromAccessToken = (accessToken: any) => {
    const decodedToken: any = decodeAccessToken(accessToken);
    return decodedToken?.phone_number || null;
};

export const getOrderDetails = async (req: any, res: any) => {
    if (req.headers && req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1];

        try {
            if (!accessToken) {
                return res.status(203).json({ msg: 'Access Token is required' });
            }
            let mobile = extractMobileFromAccessToken(accessToken);
            if (!mobile) {
                return res.status(400).json({ msg: 'Phone number is required' });
            }
            const userData = await User.findOne({ where: { mobile } });
            if (!userData) {
                return res.status(203).json({ msg: 'User not found' });
            } else {

                const isAdmin = userData.isAdmin;
                let ordersData = [];
                if (isAdmin) {
                    ordersData = await Order.findAll({
                        group: ["order_id"],
                        order: [
                            ['updatedAt', 'DESC']
                        ],
                    });
                } else {
                    const user_id = userData.id;
                    ordersData = await Order.findAll({
                        where: { user_id },
                        group: ["order_id"],
                        order: [
                            ['updatedAt', 'DESC']
                        ],
                    });
                }
                const response = {
                    data: ordersData,
                    user: userData
                };
                res.status(200).json({ data: response });
            }
        } catch (error) {
            res.status(203).json({ msg: 'Orders Not Found' });
        }
    } else {
        res.status(203).json({ msg: 'Orders Not Found' });
    }
};

export const getOrderProductsDetails = async (req: any, res: any) => {
    if (req.headers && req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1];

        try {
            if (!accessToken) {
                return res.status(203).json({ msg: 'Access Token is required' });
            }
            let mobile = extractMobileFromAccessToken(accessToken);
            if (!mobile) {
                return res.status(400).json({ msg: 'Phone number is required' });
            }

            const userData = await User.findOne({ where: { mobile } });
            if (!userData) {
                return res.status(203).json({ msg: 'User not found' });
            } else {
                const req_data = req.params.orderId;
                const ordersData = await Order.findAll({
                    where: { order_id: req_data },
                    attributes: ['product_id', 'quantity', 'description']
                });

                const productIds = ordersData.map((order: any) => order.product_id);

                const productsData = await Product.findAll({
                    where: {
                        id: productIds
                    }
                });

                const response = {
                    data: productsData.map((product: any) => {
                        const orderInfo = ordersData.find((order: any) => order.product_id === product.id);
                        return {
                            id: product.id,
                            sku: product.sku,
                            name: product.name,
                            size: product.size,
                            height: product.height,
                            dia: product.dia,
                            price: product.price,
                            category: product.category,
                            images: product.images,
                            createdAt: product.createdAt,
                            updatedAt: product.updatedAt,
                            description: orderInfo ? (orderInfo.description ? orderInfo.description : '') : '',
                            quantity: orderInfo ? orderInfo.quantity : 0,
                        };
                    })
                };
                res.status(200).json(response);
            }
        } catch (error) {
            res.status(203).json({ msg: 'Orders Not Found' });
        }
    } else {
        res.status(203).json({ msg: 'Orders Not Found' });
    }
};

export const updateOrderStatus = async (req: any, res: any) => {
    const req_body = req.body;
    if (req.headers && req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1];

        try {
            if (!accessToken) {
                return res.status(203).json({ msg: 'Access Token is required' });
            }
            let mobile = extractMobileFromAccessToken(accessToken);
            if (!mobile) {
                return res.status(400).json({ msg: 'Phone number is required' });
            }
            const userData = await User.findOne({ where: { mobile } });
            console.log('req_body,. ', req_body)
            if (userData) {
                if (userData.isAdmin) {
                    const resp = await Order.update(
                        { status: req_body.status },
                        {
                            where: {
                                order_id: req_body.order_id
                            }
                        },
                    );
                    res.status(200).json({ msg: 'Order status updated Successfully !!' });
                }
            } else {
                res.status(200).json({ msg: 'User details not found !!' });
            }
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(203).json({ msg: 'Internal Server Error' });
        }
    }
};

export const saveOrderDetails = async (req: any, res: any) => {
    const req_body = req.body;
    if (req.headers && req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1];

        try {
            if (!accessToken) {
                return res.status(203).json({ msg: 'Access Token is required' });
            }
            let mobile = extractMobileFromAccessToken(accessToken);
            if (!mobile) {
                return res.status(400).json({ msg: 'Phone number is required' });
            }
            const userData = await User.findOne({ where: { mobile } });
            if (userData) {
                const user_id = userData.id;
                const latestOrder = await Order.findOne({
                    attributes: ["order_id"],
                    order: [["order_id", "DESC"]],
                });
                const new_order_id = Number(latestOrder.order_id) + 1;
                const ordersData = req_body && req_body.map((it: any) => {
                    return {
                        user_id,
                        product_id: it.id,
                        status: 'created',
                        quantity: it.quantity,
                        order_id: new_order_id,
                        description: it.desc
                    }
                });
                await Order.bulkCreate(ordersData, { returning: true })
                res.status(200).json({ msg: 'Order Created Successfully !!' });
            } else {
                res.status(200).json({ msg: 'User details not found !!' });
            }
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(203).json({ msg: 'Internal Server Error' });
        }
    }
};

