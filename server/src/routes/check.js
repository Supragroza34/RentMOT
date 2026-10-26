import Router from '@koa/router';
import { lookupPostcode } from '../sources/postcode.js';
import {getCrime} from '../sources/crime.js';
import { getFlood } from '../sources/flood.js';


export const checkRouter = new Router({ prefix: '/api'});


const unwrap = (result) =>{
    return result.status === 'fulfilled' ? result.value : {error: result.reason.message};
}


checkRouter.get('/check', async(ctx) =>{
    const {postcode} = ctx.query;
    if (!postcode){
        ctx.throw(400, 'Postcode is required');
    }

    const place = await lookupPostcode(postcode);
    if (!place) ctx.throw(404, 'Postcode not found');

    const [crime, flood] = await Promise.allSettled([getCrime(place), getFlood(place)]);
    ctx.body = {
        place,
        crime: unwrap(crime),
        flood: unwrap(flood)
    };
});