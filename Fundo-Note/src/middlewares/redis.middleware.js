/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

export const redisCheck = async(req,res,next) => {
    const value = await client.get('getAllNotes');

    if(value !== null){
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.CREATED,
            data:JSON.parse(value),
            message: 'All the Notes Fetched Successfully From Redis'
        });
    }else{
        next();
    }
}