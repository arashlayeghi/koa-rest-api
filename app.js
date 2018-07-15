const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const JWT = require('./jwt');
const ObjectID = require("mongodb").ObjectID;

const app = new Koa();
require("./mongo")(app);
const router = new Router();
const securedRouter = new Router();


app.use(BodyParser());
app.use(logger());
// app.use(JWT.errorHandler()).use(JWT.jwt());

// Apply JWT middleware to secured router only
securedRouter.use(JWT.errorHandler()).use(JWT.jwt());

router.post("/auth", async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    if (username === "user" && password === "pwd") {
        ctx.body = {
            token: JWT.issue({
                user: "user",
                role: "admin"
            })
        };
    } else {
        ctx.status = 401;
        ctx.body = {error: "Invalid login"}
    }
});

// router.post('/', async ctx => {
//   let name = ctx.request.body.name || "World";
//   ctx.body = {
//     message: `Hello ${name}!`
//   };
// });

// List all people
securedRouter.get("/people", async (ctx) => {
    ctx.body = await ctx.app.people.find().toArray();
});

// Get one
securedRouter.get("/people/:id", async (ctx) => {
    ctx.body = await ctx.app.people.findOne({"_id": ObjectID(ctx.params.id)});
});

// Create new person
securedRouter.post("/people", async (ctx) => {
    ctx.body = await ctx.app.people.insert(ctx.request.body);
});

// Update one
securedRouter.put("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.people.updateOne(documentQuery, {$set: valuesToUpdate});
});

// Delete one
securedRouter.delete("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    ctx.body = await ctx.app.people.deleteOne(documentQuery);
});

app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

app.listen(3000);
