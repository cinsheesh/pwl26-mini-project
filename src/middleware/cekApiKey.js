import { AppError } from '../utils/AppError.js';

export function cekApiKey(req, res, next) {
    const kunci = req.headers['x-api-key'];

    if (kunci !== 'rahasia123') {
        return next(new AppError(401, 'API key tidak valid', 'UNAUTHORIZED'));
    }
    next();   
}