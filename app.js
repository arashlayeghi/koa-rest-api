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

// Apply JWT middleware to secured router only
securedRouter.use(JWT.errorHandler()).use(JWT.jwt());

router.post("/auth", async (ctx) => {
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;

  // This is just for demonstration! Username and password
  // must come from database and password musu be hashed
  if (username === "user" && password === "pwd") {
    ctx.body = {
      token: JWT.issue({
        user: "user",
        role: "admin"
      })
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      error: "Invalid login"
    }
  }
});

// List all people
securedRouter.get("/people", async (ctx) => {
  let people;
  try {
    people = await ctx.app.people.find().toArray();
  } catch (e) {
    ctx.body = "An error occured during getting all people: " + e;
    ctx.status = 401;
  }
  ctx.body = people;
  ctx.status = 200; // OK
});

// Get one
securedRouter.get("/people/:id", async (ctx) => {
  let person;
  try {
    person = await ctx.app.people.findOne({"_id": ObjectID(ctx.params.id)});
  } catch (e) {
      ctx.body = "An error occured during getting person with id: " + ctx.params.id + " with the error of: " + e;
      ctx.status = 401;
  }

  ctx.body = person;
  ctx.status = 200; // OK


});

// Create new person
securedRouter.post("/people", async (ctx) => {
  let person;
  try {
    person = await ctx.app.people.insert(ctx.request.body);
  } catch (e) {
    ctx.body = "An error occured during creating a new person: " + e;
    ctx.status = 401;
  }
  ctx.body = person;
  ctx.status = 201; // CREATED OK
});

// Update one
securedRouter.put("/people/:id", async (ctx) => {
  let updatedPerson;
  let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
  let valuesToUpdate = ctx.request.body;
  try {
    updatedPerson = await ctx.app.people.updateOne(documentQuery, {$set: valuesToUpdate});
  } catch (e) {
    ctx.body = "An error occured during updating a person with id: " + ctx.params.id +  " with error of:" + e;
    ctx.status = 401;
  }
  ctx.body = updatedPerson;
  ctx.status = 200; // OK
});

// Delete one
securedRouter.delete("/people/:id", async (ctx) => {
  let deletedPerson;
  let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
  try {
    deletedPerson = await ctx.app.people.deleteOne(documentQuery);
  } catch (e) {
    ctx.body = "An error occured during the deletion of a person with the id of: " + ctx.params.id + "with the error of:" + e;
    ctx.status = 401;
  }
  ctx.body = deletedPerson;
  ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

app.listen(3000);
