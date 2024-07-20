import { jwtDecode } from 'jwt-decode';
// const db = require('../models');
// const Users = db.users;
import User from '../models/user';

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

export const getUserDetails = async (req: any, res: any) => {
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
            }
            const response = {
                data: userData
            };
            res.status(200).json(response);
        } catch (error) {
            res.status(203).json({ msg: 'User Not Found' });
        }
    }
};

export const saveUserDetails = async (req: any, res: any) => {
    const { mobile, name, address } = req.body;

    try {
        await User.create({
            mobile,
            name,
            address,
            isAdmin: false
        });
        res.status(201).json({ msg: 'User Registered Successfully !!' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(203).json({ msg: 'Internal Server Error' });
    }
};

