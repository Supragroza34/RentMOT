import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import { bodyParser } from '@koa/bodyparser'
import {checkRouter} from './src/routes/check.js'

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) =>{
    try{
        await next()
    } catch (err){
        console.log(err)
        ctx.status = err.status || 500
        ctx.body = {error: err.expose ? err.message : 'Something went wrong'}

    }
});

//Middleware that logs request

app.use(async (ctx, next) =>{
    const start = Date.now()
    await next()
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} ${Date.now() - start}ms`)
})

app.use(cors());
app.use(bodyParser());

router.get('/api/health', (ctx) =>{
    ctx.body = {
        ok: true
    }
});
router.get("/favicon.ico", async(ctx) =>{
    ctx.status = 204;
});

router.get('/api/hello/:name', (ctx) =>{
    ctx.body = {
        message: `Hello ${ctx.params.name}`
    };
});

app.use(router.routes()).use(router.allowedMethods())
app.use(checkRouter.routes()).use(checkRouter.allowedMethods());

const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`Server on http://localhost:${port}`)
})